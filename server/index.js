require('dotenv').config()
const express = require('express')
const http = require('http')
const cors = require('cors')
const nodemailer = require('nodemailer')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 4000

// simple in-memory store: email -> { code, expiresAt }
const otps = new Map()

// configure nodemailer transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

app.post('/api/request-otp', async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ message: 'Email is required' })
  const code = generateCode()
  const expiresAt = Date.now() + 5 * 60 * 1000 // 5 minutes
  otps.set(email, { code, expiresAt })

  // send email
  const mailOptions = {
    from: `${process.env.FROM_NAME || 'App'} <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${code}. It expires in 5 minutes.`,
    html: `<p>Your OTP code is <strong>${code}</strong>. It expires in 5 minutes.</p>`,
  }

  try {
    await transporter.sendMail(mailOptions)
    // notify connected sockets in room
    io.to(email).emit('otp_sent')
    return res.json({ sent: true })
  } catch (err) {
    console.error('Error sending mail', err)
    return res.status(500).json({ message: 'Failed to send email' })
  }
})

app.post('/api/verify-otp', (req, res) => {
  const { email, code } = req.body
  if (!email || !code) return res.status(400).json({ message: 'Email and code required' })
  const record = otps.get(email)
  if (!record) return res.json({ verified: false })
  if (Date.now() > record.expiresAt) {
    otps.delete(email)
    return res.status(400).json({ message: 'OTP expired' })
  }
  if (record.code !== String(code)) return res.json({ verified: false })
  otps.delete(email)
  io.to(email).emit('otp_verified')
  return res.json({ verified: true })
})

io.on('connection', (socket) => {
  socket.on('join', ({ email }) => {
    if (!email) return
    socket.join(email)
  })
})

server.listen(PORT, () => {
  console.log(`OTP server running on port ${PORT}`)
})
