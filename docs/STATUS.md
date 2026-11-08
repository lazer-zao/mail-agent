# Development status

## Delivered
- v0.0.17: initial Node.js backend scaffold and OAuth route placeholders.
- v0.0.18: latest browser UI, hidden horizontal scrollbar, background image selector, faint image beneath the reading pane.

## Remaining work
1. Serve UI and API from one HTTPS origin.
2. Complete Google OAuth code exchange and secure refresh-token storage.
3. Complete Yandex OAuth and verify the supported mailbox access method/scopes.
4. Implement inbox/message listing and message detail retrieval.
5. Implement send/reply/forward, folders, read/unread, archive, spam, trash, and attachments.
6. Add database-backed account storage, encryption, session/CSRF protections, rate limits, and tests.
7. Add production deployment instructions.

## Current limitation
The current HTML uses demonstration content. OAuth callback handlers validate state but return HTTP 501; this is a scaffold, not a live-mail integration.
