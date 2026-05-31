import { useState, useEffect } from 'react';
import { authHdr, API } from '../adminUtils';

const Field = ({ label, value, body = false }) =>
  value ? (
    <div className="modal-field">
      <div className="modal-field-label">{label}</div>
      <div className={`modal-field-value${body ? ' body' : ''}`}>{value}</div>
    </div>
  ) : null;

export default function DetailModal({ visitorId, onClose }) {
  const [record, setRecord]   = useState(null);
  const [loading, setLoading] = useState(true);

  const BADGE = {
    hr: 'badge-hr', developer: 'badge-developer',
    visitor: 'badge-visitor', skipped: 'badge-skipped',
  };

  useEffect(() => {
    fetch(`${API}/admin/visitor/${visitorId}`, { headers: authHdr() })
      .then(r => r.json())
      .then(d => { setRecord(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [visitorId]);

  return (
    <div
      className="modal-overlay"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-box">
        <div className="modal-header">
          <div>
            <h3>Visitor Detail</h3>
            {record && (
              <span
                className={`badge ${BADGE[record.UserType] || 'badge-visitor'}`}
                style={{ marginTop: '0.4rem', display: 'inline-block' }}
              >
                {record.UserType}
              </span>
            )}
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {loading ? (
          <div className="admin-loading"><div className="spinner" /></div>
        ) : record ? (
          <>
            <Field label="ID"            value={record.ID} />
            <Field label="Name"          value={record.Name} />
            <Field label="Email"         value={record.Email} />
            <Field label="Company"       value={record.Company} />
            <Field label="Role"          value={record.Role} />
            <Field label="Timestamp"     value={record.Timestamp} />
            <Field label="IP"            value={record.IP} />
            <Field label="GitHub"        value={record.GitHub} />
            <Field label="LinkedIn"      value={record.LinkedIn} />
            <Field label="Model Used"    value={record.ModelUsed} />
            <Field label="Email Subject" value={record.Subject} />
            <Field label="Email Body"    value={record.Body} body />
          </>
        ) : (
          <div className="empty-state">Record not found.</div>
        )}
      </div>
    </div>
  );
}