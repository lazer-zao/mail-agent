# Mail Agent

Browser-based multi-account email client.

## Current version
**UI: v0.0.18**

The interface has a top account switcher, left folder navigation, one large message-reading area, and a background image selector. The selected image is shown on the page background and faintly beneath the reading pane.

## Structure
- `app/index.html` — browser UI
- `server/server.mjs` — Node.js backend scaffold
- `docs/STATUS.md` — implementation status and next steps
- `.env.example` — environment variable template

## Run the UI
Open `app/index.html` in Chrome or Edge.

## Run the backend scaffold
Requires Node.js 20+:
1. Copy `.env.example` to `.env`.
2. Set a strong `SESSION_SECRET`.
3. Add provider OAuth credentials after registering callback URLs.
4. Run `npm install`.
5. Run `npm start`.
6. Check `http://localhost:8787/api/status`.

## Security
Never commit `.env` or put OAuth secrets and refresh tokens in browser HTML. Use HTTPS and encrypted server-side token storage before real mailbox connections.

## Current limitation
This is not yet a production-ready email client. OAuth callback token exchange, encrypted token persistence, Gmail/Yandex mailbox synchronization, sending, folder operations, and attachments remain to be implemented and tested. The UI currently uses demonstration messages.
