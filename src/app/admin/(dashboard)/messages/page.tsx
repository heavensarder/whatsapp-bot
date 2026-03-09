'use client';

import { useEffect, useState } from 'react';
import Toast from '@/components/Toast';

interface Contact {
  id: number;
  name: string;
  phoneNumber: string;
  tag: string | null;
}

interface SendResult {
  contactId: number;
  status: string;
  error?: string;
}

export default function MessagesPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<SendResult[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/contacts');
      const data = await res.json();
      setContacts(data);
    } catch {
      console.error('Failed to fetch contacts');
    }
  };

  const toggleContact = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedIds.length === filteredContacts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredContacts.map((c) => c.id));
    }
  };

  const handleSend = async () => {
    if (selectedIds.length === 0) {
      setToast({ message: 'Please select at least one contact', type: 'error' });
      return;
    }
    if (!message.trim()) {
      setToast({ message: 'Please enter a message', type: 'error' });
      return;
    }

    setSending(true);
    setResults([]);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactIds: selectedIds, message: message.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setResults(data.results);
        const sent = data.results.filter((r: SendResult) => r.status === 'sent').length;
        const failed = data.results.filter((r: SendResult) => r.status === 'failed').length;
        setToast({
          message: `${sent} sent, ${failed} failed`,
          type: failed === 0 ? 'success' : 'error',
        });
        setMessage('');
        setSelectedIds([]);
      } else {
        setToast({ message: data.error || 'Failed to send', type: 'error' });
      }
    } catch {
      setToast({ message: 'Failed to send messages', type: 'error' });
    } finally {
      setSending(false);
    }
  };

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phoneNumber.includes(search)
  );

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Send Message</h1>
          <p>Send WhatsApp messages to your contacts</p>
        </div>
      </div>

      <div className="page-content">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Contact Selection */}
          <div className="data-table-wrapper">
            <div className="data-table-header">
              <h3>Select Contacts ({selectedIds.length} selected)</h3>
              <button className="btn btn-secondary btn-sm" onClick={selectAll}>
                {selectedIds.length === filteredContacts.length && filteredContacts.length > 0 ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
              <div className="search-bar">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="contact-select-list" style={{ maxHeight: '400px' }}>
              {filteredContacts.length === 0 ? (
                <div className="empty-state" style={{ padding: '40px 20px' }}>
                  <h3>No contacts found</h3>
                  <p>Add contacts from the Contacts page</p>
                </div>
              ) : (
                filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`contact-select-item ${selectedIds.includes(contact.id) ? 'selected' : ''}`}
                    onClick={() => toggleContact(contact.id)}
                  >
                    <div className={`contact-checkbox ${selectedIds.includes(contact.id) ? 'checked' : ''}`}>
                      {selectedIds.includes(contact.id) && (
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                    </div>
                    <div className="contact-info">
                      <h4>{contact.name}</h4>
                      <span>{contact.phoneNumber}</span>
                    </div>
                    {contact.tag && <span className="tag-badge" style={{ marginLeft: 'auto' }}>{contact.tag}</span>}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Message Composer */}
          <div>
            <div className="data-table-wrapper">
              <div className="data-table-header">
                <h3>Compose Message</h3>
              </div>
              <div style={{ padding: '24px' }}>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    className="form-textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    style={{ minHeight: '180px' }}
                  />
                  <div style={{ textAlign: 'right', fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
                    {message.length} characters
                  </div>
                </div>

                <button
                  className="btn btn-primary btn-full"
                  onClick={handleSend}
                  disabled={sending || selectedIds.length === 0 || !message.trim()}
                  style={{ marginTop: '8px' }}
                >
                  {sending ? (
                    <>
                      <span className="spinner" style={{ width: '16px', height: '16px' }} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                      Send to {selectedIds.length} contact{selectedIds.length !== 1 ? 's' : ''}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div className="data-table-wrapper" style={{ marginTop: '20px' }}>
                <div className="data-table-header">
                  <h3>Send Results</h3>
                </div>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Contact</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r) => {
                      const contact = contacts.find((c) => c.id === r.contactId);
                      return (
                        <tr key={r.contactId}>
                          <td>{contact?.name || `ID: ${r.contactId}`}</td>
                          <td>
                            <span className={`status-badge ${r.status}`}>
                              <span className="status-dot" />
                              {r.status}
                            </span>
                            {r.error && (
                              <div style={{ fontSize: '12px', color: 'var(--accent-red)', marginTop: '4px' }}>
                                {r.error}
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
