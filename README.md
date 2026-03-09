# WhatsApp Business Messaging Application

A full-stack Next.js application for sending WhatsApp messages to your clients using the WhatsApp Business Cloud API.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Database:** MySQL
- **ORM:** Prisma 7
- **API:** WhatsApp Business Cloud API (Meta)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

Make sure MySQL is running with the following configuration:

| Setting  | Value          |
| -------- | -------------- |
| Database | `whatsapp bot` |
| User     | `root`         |
| Password | _(blank)_      |
| Host     | `localhost`    |
| Port     | `3306`         |

The `.env` file is pre-configured with these settings.

### 3. Run Database Migration

```bash
npx prisma migrate dev
```

### 4. Seed Default Admin

```bash
npx prisma db seed
```

### 5. Start Development Server

```bash
npm run dev
```

The application starts at **http://localhost:3000**

## Default Admin Login

| Field    | Value               |
| -------- | ------------------- |
| Email    | admin@mediasoft.com |
| Password | Mediasoft2026@#     |

## Pages

| Route              | Description                       |
| ------------------ | --------------------------------- |
| `/admin/login`     | Admin login page                  |
| `/admin/dashboard` | Overview with stats & recent msgs |
| `/admin/contacts`  | Contact management (CRUD + CSV)   |
| `/admin/messages`  | Send single or bulk messages      |
| `/admin/history`   | Message logs with status filters  |
| `/admin/settings`  | WhatsApp API configuration        |

## Configure WhatsApp API

1. Go to [Meta Developer Dashboard](https://developers.facebook.com/)
2. Create a Meta App with WhatsApp integration
3. Get your credentials from the WhatsApp Business API section
4. In the app, navigate to **Settings** and enter:
   - WhatsApp Business Phone Number ID
   - WhatsApp Business Account ID
   - Meta App ID & Secret
   - Permanent Access Token
   - Webhook Verify Token

## Sending Your First Message

1. **Login** at `/admin/login`
2. **Configure API** at `/admin/settings` with your WhatsApp credentials
3. **Add a contact** at `/admin/contacts`
4. **Send a message** at `/admin/messages`:
   - Select a contact
   - Type your message
   - Click Send

## Webhook Setup

Configure the webhook URL in Meta Developer Dashboard:

```
https://your-domain.com/api/webhook
```

The webhook handles:

- Message status updates (sent, delivered, read, failed)
- Automatic delivery status tracking

## Environment Variables

```env
DATABASE_URL="mysql://root:@localhost:3306/whatsapp%20bot"
JWT_SECRET="your-secret-key"
WHATSAPP_ACCESS_TOKEN=your_token
WHATSAPP_PHONE_NUMBER_ID=your_id
WHATSAPP_BUSINESS_ACCOUNT_ID=your_id
META_APP_ID=your_app_id
META_APP_SECRET=your_secret
WEBHOOK_VERIFY_TOKEN=your_verify_token
```

## Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── login/page.tsx
│   │   └── (dashboard)/
│   │       ├── layout.tsx         # Sidebar layout
│   │       ├── dashboard/page.tsx
│   │       ├── contacts/page.tsx
│   │       ├── messages/page.tsx
│   │       ├── history/page.tsx
│   │       └── settings/page.tsx
│   ├── api/
│   │   ├── auth/ (login, logout, me)
│   │   ├── contacts/ (CRUD + import)
│   │   ├── messages/ (send + history)
│   │   ├── settings/ (CRUD)
│   │   ├── dashboard/ (stats)
│   │   └── webhook/ (WhatsApp events)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Sidebar.tsx
│   └── Toast.tsx
├── lib/
│   ├── auth.ts        # JWT + bcrypt
│   ├── prisma.ts      # Prisma client
│   └── whatsapp.ts    # WhatsApp API
└── middleware.ts       # Auth protection
```
