export default function StatCard({ label, value, variant, delay = 0 }) {
  return (
    <div
      className={`stat-card ${variant}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value ?? '—'}</div>
    </div>
  );
}