'use client';

import { useEffect, useState } from 'react';
import Toast from '@/components/Toast';

interface Settings {
  whatsappPhoneNumberId: string;
  whatsappBusinessAccountId: string;
  metaAppId: string;
  metaAppSecret: string;
  permanentAccessToken: string;
  webhookVerifyToken: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    whatsappPhoneNumberId: '',
    whatsappBusinessAccountId: '',
    metaAppId: '',
    metaAppSecret: '',
    permanentAccessToken: '',
    webhookVerifyToken: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setSettings({
        whatsappPhoneNumberId: data.whatsappPhoneNumberId || '',
        whatsappBusinessAccountId: data.whatsappBusinessAccountId || '',
        metaAppId: data.metaAppId || '',
        metaAppSecret: data.metaAppSecret || '',
        permanentAccessToken: data.permanentAccessToken || '',
        webhookVerifyToken: data.webhookVerifyToken || '',
      });
    } catch {
      console.error('Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setToast({ message: 'Settings saved successfully!', type: 'success' });
      } else {
        setToast({ message: 'Failed to save settings', type: 'error' });
      }
    } catch {
      setToast({ message: 'Failed to save settings', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <div className="page-header">
          <div>
            <h1>Settings</h1>
            <p>Configure your WhatsApp Business API</p>
          </div>
        </div>
        <div className="page-content">
          <div className="loading-center"><div className="spinner" /></div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Configure your WhatsApp Business API credentials</p>
        </div>
      </div>

      <div className="page-content">
        <div className="data-table-wrapper">
          <div className="data-table-header">
            <h3>WhatsApp API Configuration</h3>
          </div>
          <div style={{ padding: '24px' }}>
            <form onSubmit={handleSubmit}>
              <div className="settings-grid">
                <div className="form-group">
                  <label>Phone Number ID</label>
                  <input
                    className="form-input"
                    value={settings.whatsappPhoneNumberId}
                    onChange={(e) => setSettings({ ...settings, whatsappPhoneNumberId: e.target.value })}
                    placeholder="Enter Phone Number ID"
                  />
                </div>
                <div className="form-group">
                  <label>Business Account ID</label>
                  <input
                    className="form-input"
                    value={settings.whatsappBusinessAccountId}
                    onChange={(e) => setSettings({ ...settings, whatsappBusinessAccountId: e.target.value })}
                    placeholder="Enter Business Account ID"
                  />
                </div>
                <div className="form-group">
                  <label>Meta App ID</label>
                  <input
                    className="form-input"
                    value={settings.metaAppId}
                    onChange={(e) => setSettings({ ...settings, metaAppId: e.target.value })}
                    placeholder="Enter Meta App ID"
                  />
                </div>
                <div className="form-group">
                  <label>Meta App Secret</label>
                  <input
                    className="form-input"
                    type="password"
                    value={settings.metaAppSecret}
                    onChange={(e) => setSettings({ ...settings, metaAppSecret: e.target.value })}
                    placeholder="Enter Meta App Secret"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Permanent Access Token</label>
                  <textarea
                    className="form-textarea"
                    value={settings.permanentAccessToken}
                    onChange={(e) => setSettings({ ...settings, permanentAccessToken: e.target.value })}
                    placeholder="Enter your permanent access token"
                    style={{ minHeight: '80px' }}
                  />
                </div>
                <div className="form-group full-width">
                  <label>Webhook Verify Token</label>
                  <input
                    className="form-input"
                    value={settings.webhookVerifyToken}
                    onChange={(e) => setSettings({ ...settings, webhookVerifyToken: e.target.value })}
                    placeholder="Enter Webhook Verify Token"
                  />
                </div>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? (
                    <>
                      <span className="spinner" style={{ width: '16px', height: '16px' }} />
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Save Settings
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="data-table-wrapper" style={{ marginTop: '24px' }}>
          <div className="data-table-header">
            <h3>Webhook URL</h3>
          </div>
          <div style={{ padding: '24px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>
              Use this URL to configure your WhatsApp webhook in the Meta Developer Dashboard:
            </p>
            <div style={{
              padding: '14px 18px',
              background: 'var(--bg-tertiary)',
              borderRadius: '10px',
              border: '1px solid var(--border-color)',
              fontFamily: 'monospace',
              fontSize: '14px',
              color: 'var(--accent-green)',
              wordBreak: 'break-all',
            }}>
              {typeof window !== 'undefined' ? window.location.origin : 'https://your-domain.com'}/api/webhook
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
