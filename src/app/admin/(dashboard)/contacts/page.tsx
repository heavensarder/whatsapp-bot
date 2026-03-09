'use client';

import { useEffect, useState, useCallback } from 'react';
import Toast from '@/components/Toast';
import Papa from 'papaparse';

interface Contact {
  id: number;
  name: string;
  phoneNumber: string;
  tag: string | null;
  createdAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editContact, setEditContact] = useState<Contact | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formTag, setFormTag] = useState('');

  const fetchContacts = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      const res = await fetch(`/api/contacts?${params}`);
      const data = await res.json();
      setContacts(data);
    } catch {
      console.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const openAddModal = () => {
    setEditContact(null);
    setFormName('');
    setFormPhone('');
    setFormTag('');
    setShowModal(true);
  };

  const openEditModal = (contact: Contact) => {
    setEditContact(contact);
    setFormName(contact.name);
    setFormPhone(contact.phoneNumber);
    setFormTag(contact.tag || '');
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editContact ? `/api/contacts/${editContact.id}` : '/api/contacts';
      const method = editContact ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formName, phoneNumber: formPhone, tag: formTag }),
      });

      const data = await res.json();

      if (!res.ok) {
        setToast({ message: data.error, type: 'error' });
        return;
      }

      setToast({ message: editContact ? 'Contact updated!' : 'Contact added!', type: 'success' });
      setShowModal(false);
      fetchContacts();
    } catch {
      setToast({ message: 'Operation failed', type: 'error' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    try {
      await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
      setToast({ message: 'Contact deleted', type: 'success' });
      fetchContacts();
    } catch {
      setToast({ message: 'Delete failed', type: 'error' });
    }
  };

  const handleCSVImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const csvData = results.data as Record<string, string>[];
        const contacts = csvData.map((row) => ({
          name: row.name || row.Name || '',
          phoneNumber: row.phone_number || row.phoneNumber || row.phone || row.Phone || '',
          tag: row.tag || row.Tag || '',
        }));

        try {
          const res = await fetch('/api/contacts/import', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contacts }),
          });

          const data = await res.json();

          if (res.ok) {
            setToast({ message: `Imported ${data.imported} contacts (${data.skipped} skipped)`, type: 'success' });
            fetchContacts();
          } else {
            setToast({ message: data.error, type: 'error' });
          }
        } catch {
          setToast({ message: 'Import failed', type: 'error' });
        }
      },
    });

    e.target.value = '';
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Contacts</h1>
          <p>Manage your WhatsApp contacts</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            Import CSV
            <input type="file" accept=".csv" onChange={handleCSVImport} style={{ display: 'none' }} />
          </label>
          <button className="btn btn-primary btn-sm" onClick={openAddModal}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Contact
          </button>
        </div>
      </div>

      <div className="page-content">
        <div style={{ marginBottom: '20px' }}>
          <div className="search-bar" style={{ maxWidth: '400px' }}>
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

        <div className="data-table-wrapper">
          <div className="data-table-header">
            <h3>All Contacts ({contacts.length})</h3>
          </div>

          {loading ? (
            <div className="loading-center"><div className="spinner" /></div>
          ) : contacts.length === 0 ? (
            <div className="empty-state">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              <h3>No contacts yet</h3>
              <p>Add contacts manually or import from a CSV file</p>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Tag</th>
                  <th>Added</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td style={{ fontWeight: 500 }}>{contact.name}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{contact.phoneNumber}</td>
                    <td>
                      {contact.tag && <span className="tag-badge">{contact.tag}</span>}
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                      {new Date(contact.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-secondary btn-sm" onClick={() => openEditModal(contact)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(contact.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editContact ? 'Edit Contact' : 'Add Contact'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input className="form-input" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input className="form-input" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} placeholder="+1234567890" required />
              </div>
              <div className="form-group">
                <label>Tag (Optional)</label>
                <input className="form-input" value={formTag} onChange={(e) => setFormTag(e.target.value)} placeholder="e.g., VIP, Customer" />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editContact ? 'Update' : 'Add Contact'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
