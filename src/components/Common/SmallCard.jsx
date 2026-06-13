export default function SmallCard({ title, value, description, icon }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-glass">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{title}</p>
          <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
        </div>
        <div className="text-4xl text-blue-400">{icon}</div>
      </div>
      {description && <p className="mt-3 text-sm text-slate-400">{description}</p>}
    </div>
  )
}
