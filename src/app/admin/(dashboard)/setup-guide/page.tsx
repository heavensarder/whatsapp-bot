'use client';

import { useState } from 'react';

const steps = [
  {
    id: 1,
    title: 'Create a Meta Developer Account',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    content: (
      <>
        <p>To use the WhatsApp Business API, you need a Meta Developer account.</p>
        <div className="guide-substeps">
          <div className="guide-substep">
            <span className="substep-number">1</span>
            <div>
              <strong>Go to Meta for Developers</strong>
              <p>Visit <a href="https://developers.facebook.com/" target="_blank" rel="noopener noreferrer">developers.facebook.com</a> and log in with your Facebook account.</p>
            </div>
          </div>
          <div className="guide-substep">
            <span className="substep-number">2</span>
            <div>
              <strong>Register as a Developer</strong>
              <p>If you haven&apos;t already, click <strong>&quot;Get Started&quot;</strong> and follow the prompts to register your account as a developer account.</p>
            </div>
          </div>
          <div className="guide-substep">
            <span className="substep-number">3</span>
            <div>
              <strong>Verify your account</strong>
              <p>You may need to verify your email and phone number. Complete all verification steps to gain full access.</p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 2,
    title: 'Create a Meta App',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    content: (
      <>
        <p>Create a new app in the Meta Developer Dashboard to get your API credentials.</p>
        <div className="guide-substeps">
          <div className="guide-substep">
            <span className="substep-number">1</span>
            <div>
              <strong>Go to &quot;My Apps&quot;</strong>
              <p>Click <strong>&quot;My Apps&quot;</strong> in the top navigation bar, then click <strong>&quot;Create App&quot;</strong>.</p>
            </div>
          </div>
          <div className="guide-substep">
            <span className="substep-number">2</span>
            <div>
              <strong>Select App Type</strong>
              <p>Choose <strong>&quot;Business&quot;</strong> as the app type. This gives you access to the WhatsApp Business API.</p>
            </div>
          </div>
          <div className="guide-substep">
            <span className="substep-number">3</span>
            <div>
              <strong>Fill App Details</strong>
              <p>Enter your app name (e.g., &quot;My WhatsApp Bot&quot;), contact email, and optionally connect a Business Portfolio.</p>
            </div>
          </div>
          <div className="guide-substep">
            <span className="substep-number">4</span>
            <div>
              <strong>Add WhatsApp Product</strong>
              <p>After creating the app, you&apos;ll see the product list. Find <strong>&quot;WhatsApp&quot;</strong> and click <strong>&quot;Set Up&quot;</strong>.</p>
            </div>
          </div>
        </div>
        <div className="guide-field-box">
          <div className="guide-field-label">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 16, height: 16 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
            Where to find: Meta App ID
          </div>
          <p>Go to <strong>App Settings → Basic</strong>. Your <strong>App ID</strong> is displayed at the top of the page.</p>
        </div>
        <div className="guide-field-box">
          <div className="guide-field-label">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 16, height: 16 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
            Where to find: Meta App Secret
          </div>
          <p>Go to <strong>App Settings → Basic</strong>. Click <strong>&quot;Show&quot;</strong> next to <strong>App Secret</strong>. You may need to re-enter your password.</p>
        </div>
      </>
    ),
  },
  {
    id: 3,
    title: 'Get WhatsApp Business Account ID',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
      </svg>
    ),
    content: (
      <>
        <p>The WhatsApp Business Account ID links your app to your business WhatsApp account.</p>
        <div className="guide-substeps">
          <div className="guide-substep">
            <span className="substep-number">1</span>
            <div>
              <strong>Go to WhatsApp Manager</strong>
              <p>In your Meta Developer Dashboard, navigate to <strong>WhatsApp → Getting Started</strong> (or <strong>API Setup</strong>).</p>
            </div>
          </div>
          <div className="guide-substep">
            <span className="substep-number">2</span>
            <div>
              <strong>Find Your Business Account</strong>
              <p>Scroll down to see your linked WhatsApp Business Account. If none exists, you&apos;ll be prompted to create one.</p>
            </div>
          </div>
        </div>
        <div className="guide-field-box">
          <div className="guide-field-label">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 16, height: 16 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
            Where to find: WhatsApp Business Account ID
          </div>
          <p>Go to <strong>WhatsApp → API Setup</strong>. The <strong>WhatsApp Business Account ID</strong> is shown in the API configuration section. You can also find it at <strong>Business Settings → Accounts → WhatsApp Accounts</strong> on <a href="https://business.facebook.com/settings/" target="_blank" rel="noopener noreferrer">business.facebook.com</a>.</p>
        </div>
      </>
    ),
  },
  {
    id: 4,
    title: 'Get Phone Number ID',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    content: (
      <>
        <p>Each WhatsApp Business Account has one or more registered phone numbers. You need the Phone Number ID (not the number itself).</p>
        <div className="guide-substeps">
          <div className="guide-substep">
            <span className="substep-number">1</span>
            <div>
              <strong>Go to WhatsApp API Setup</strong>
              <p>In the Meta Developer Dashboard, go to <strong>WhatsApp → API Setup</strong>.</p>
            </div>
          </div>
          <div className="guide-substep">
            <span className="substep-number">2</span>
            <div>
              <strong>Select your phone number</strong>
              <p>Under <strong>&quot;From&quot;</strong> phone number dropdown, select the number you want to use for sending. A test number is provided by default for development.</p>
            </div>
          </div>
        </div>
        <div className="guide-field-box">
          <div className="guide-field-label">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 16, height: 16 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
            Where to find: Phone Number ID
          </div>
          <p>On the <strong>API Setup</strong> page, after selecting your &quot;From&quot; number, the <strong>Phone Number ID</strong> is displayed just below the dropdown. It&apos;s a numeric string like <code>110123456789012</code>.</p>
        </div>
      </>
    ),
  },
  {
    id: 5,
    title: 'Generate Access Token',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    content: (
      <>
        <p>The Access Token authenticates your API requests. You can use either a temporary or permanent token.</p>

        <div className="guide-alert info">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <div>
            <strong>Temporary vs Permanent Token</strong>
            <p>Meta provides a temporary token (valid 24 hours) on the API Setup page for testing. For production use, generate a permanent token.</p>
          </div>
        </div>

        <h4 style={{ marginTop: 20, marginBottom: 12, fontSize: 15 }}>Option A: Temporary Token (for testing)</h4>
        <div className="guide-substeps">
          <div className="guide-substep">
            <span className="substep-number">1</span>
            <div>
              <strong>Copy from API Setup</strong>
              <p>Go to <strong>WhatsApp → API Setup</strong>. The temporary access token is displayed in the <strong>&quot;Temporary access token&quot;</strong> section. Click to copy it.</p>
            </div>
          </div>
        </div>

        <h4 style={{ marginTop: 20, marginBottom: 12, fontSize: 15 }}>Option B: Permanent Token (for production)</h4>
        <div className="guide-substeps">
          <div className="guide-substep">
            <span className="substep-number">1</span>
            <div>
              <strong>Create a System User</strong>
              <p>Go to <a href="https://business.facebook.com/settings/system-users" target="_blank" rel="noopener noreferrer">Business Settings → System Users</a>. Click <strong>&quot;Add&quot;</strong> and create a new Admin system user.</p>
            </div>
          </div>
          <div className="guide-substep">
            <span className="substep-number">2</span>
            <div>
              <strong>Assign Assets</strong>
              <p>Click <strong>&quot;Add Assets&quot;</strong> on the system user. Select <strong>Apps → Your App</strong> and grant <strong>Full Control</strong>. Also assign your WhatsApp Business Account.</p>
            </div>
          </div>
          <div className="guide-substep">
            <span className="substep-number">3</span>
            <div>
              <strong>Generate Token</strong>
              <p>Click <strong>&quot;Generate New Token&quot;</strong>, select your app, and enable the permissions: <code>whatsapp_business_management</code> and <code>whatsapp_business_messaging</code>. Copy the generated token.</p>
            </div>
          </div>
        </div>
        <div className="guide-field-box">
          <div className="guide-field-label">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 16, height: 16 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
            Where to find: WhatsApp Access Token
          </div>
          <p>Either the temporary token from <strong>API Setup</strong> page, or the permanent token generated from your System User in <strong>Business Settings</strong>.</p>
        </div>
      </>
    ),
  },
  {
    id: 6,
    title: 'Configure Webhook',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    content: (
      <>
        <p>Webhooks let you receive real-time status updates (sent, delivered, read) for your messages.</p>
        <div className="guide-substeps">
          <div className="guide-substep">
            <span className="substep-number">1</span>
            <div>
              <strong>Go to WhatsApp Configuration</strong>
              <p>In Meta Developer Dashboard, go to <strong>WhatsApp → Configuration</strong>.</p>
            </div>
          </div>
          <div className="guide-substep">
            <span className="substep-number">2</span>
            <div>
              <strong>Set Callback URL</strong>
              <p>Enter your webhook URL: <code>https://your-domain.com/api/webhook</code></p>
              <p style={{ marginTop: 4, fontSize: 13, color: 'var(--text-muted)' }}>Note: The URL must be HTTPS and publicly accessible. Use ngrok for local development.</p>
            </div>
          </div>
          <div className="guide-substep">
            <span className="substep-number">3</span>
            <div>
              <strong>Enter Verify Token</strong>
              <p>Enter a custom string as your <strong>Verify Token</strong>. This can be anything you choose (e.g., <code>my-whatsapp-verify-token</code>). Make sure to enter the same token in this app&apos;s Settings page.</p>
            </div>
          </div>
          <div className="guide-substep">
            <span className="substep-number">4</span>
            <div>
              <strong>Subscribe to Events</strong>
              <p>After verification, subscribe to webhook fields: <strong>messages</strong> (for message status updates).</p>
            </div>
          </div>
        </div>
        <div className="guide-field-box">
          <div className="guide-field-label">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 16, height: 16 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
            Where to find: Webhook Verify Token
          </div>
          <p>This is a custom string <strong>you create yourself</strong>. Enter it both in Meta&apos;s webhook configuration and in this app&apos;s <strong>Settings → Webhook Verify Token</strong> field. They must match.</p>
        </div>
      </>
    ),
  },
  {
    id: 7,
    title: 'Enter Credentials in Settings',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    content: (
      <>
        <p>Now that you have all the credentials, enter them in this application.</p>
        <div className="guide-substeps">
          <div className="guide-substep">
            <span className="substep-number">1</span>
            <div>
              <strong>Go to Settings</strong>
              <p>Navigate to the <strong>Settings</strong> page in this dashboard using the sidebar.</p>
            </div>
          </div>
          <div className="guide-substep">
            <span className="substep-number">2</span>
            <div>
              <strong>Fill in all fields</strong>
              <p>Enter the following credentials you collected from the previous steps:</p>
            </div>
          </div>
        </div>

        <div className="guide-summary-table">
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Where to Get It</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Access Token</strong></td>
                <td>API Setup page (temp) or System User (permanent)</td>
              </tr>
              <tr>
                <td><strong>Phone Number ID</strong></td>
                <td>WhatsApp → API Setup → &quot;From&quot; phone number section</td>
              </tr>
              <tr>
                <td><strong>Business Account ID</strong></td>
                <td>WhatsApp → API Setup or Business Settings</td>
              </tr>
              <tr>
                <td><strong>Meta App ID</strong></td>
                <td>App Settings → Basic → App ID</td>
              </tr>
              <tr>
                <td><strong>Meta App Secret</strong></td>
                <td>App Settings → Basic → App Secret</td>
              </tr>
              <tr>
                <td><strong>Webhook Verify Token</strong></td>
                <td>Custom string you define yourself</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="guide-alert success">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <strong>You&apos;re all set!</strong>
            <p>After saving your settings, go to the <strong>Contacts</strong> page to add recipients, then use <strong>Send Message</strong> to start messaging your clients.</p>
          </div>
        </div>
      </>
    ),
  },
];

export default function SetupGuidePage() {
  const [openStep, setOpenStep] = useState<number>(1);

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Setup Guide</h1>
          <p>Step-by-step instructions to configure your WhatsApp Business API</p>
        </div>
      </div>

      <div className="page-content">
        <div className="guide-intro">
          <div className="guide-intro-icon">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <div>
            <h2>Before You Begin</h2>
            <p>You&apos;ll need a <strong>Facebook account</strong> and a <strong>Meta Business Portfolio</strong> (formerly Business Manager) to access the WhatsApp Business API. The entire setup process typically takes <strong>15–30 minutes</strong>.</p>
          </div>
        </div>

        <div className="guide-steps">
          {steps.map((step) => (
            <div key={step.id} className={`guide-step ${openStep === step.id ? 'open' : ''}`}>
              <button
                className="guide-step-header"
                onClick={() => setOpenStep(openStep === step.id ? 0 : step.id)}
              >
                <div className="guide-step-number">{step.id}</div>
                <div className="guide-step-icon">{step.icon}</div>
                <span className="guide-step-title">{step.title}</span>
                <svg
                  className="guide-step-chevron"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {openStep === step.id && (
                <div className="guide-step-content">
                  {step.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
