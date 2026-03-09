'use client';

import { useEffect, useState, useCallback } from 'react';

interface MessageLog {
  id: number;
  message: string;
  status: string;
  whatsappMessageId: string | null;
  createdAt: string;
  contact: {
    name: string;
    phoneNumber: string;
  };
}

export default function HistoryPage() {
  const [messages, setMessages] = useState<MessageLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: '20',
      });
      if (statusFilter) params.set('status', statusFilter);

      const res = await fetch(`/api/messages?${params}`);
      const data = await res.json();
      setMessages(data.messages);
      setTotalPages(data.totalPages);
      setTotal(data.total);
    } catch {
      console.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Message History</h1>
          <p>View all sent messages and their delivery status</p>
        </div>
      </div>

      <div className="page-content">
        <div className="filter-bar" style={{ marginBottom: '20px' }}>
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          >
            <option value="">All Status</option>
            <option value="sent">Sent</option>
            <option value="delivered">Delivered</option>
            <option value="read">Read</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
          </select>
          <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            {total} total messages
          </span>
        </div>

        <div className="data-table-wrapper">
          <div className="data-table-header">
            <h3>Message Logs</h3>
          </div>

          {loading ? (
            <div className="loading-center"><div className="spinner" /></div>
          ) : messages.length === 0 ? (
            <div className="empty-state">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3>No messages found</h3>
              <p>Messages you send will appear here</p>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Contact</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>WhatsApp ID</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg.id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{msg.contact.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {msg.contact.phoneNumber}
                      </div>
                    </td>
                    <td style={{ maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {msg.message}
                    </td>
                    <td>
                      <span className={`status-badge ${msg.status}`}>
                        <span className="status-dot" />
                        {msg.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                      {msg.whatsappMessageId ? msg.whatsappMessageId.substring(0, 16) + '...' : '—'}
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '13px', whiteSpace: 'nowrap' }}>
                      {new Date(msg.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    className={page === pageNum ? 'active' : ''}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 5 && <span style={{ color: 'var(--text-muted)' }}>...</span>}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
