export function exportToCSV(data, filename) {
  if (!data || !data.length) return
  const headers = Object.keys(data[0])
  const csv = [headers.join(','), ...data.map((row) => headers.map((field) => JSON.stringify(row[field] ?? '')).join(','))].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
