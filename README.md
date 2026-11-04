# 🐍🐧 Puffin Snake (`palladius/demo-snake`)

Playable **Puffin Snake** hosted on **GitHub Pages** (`https://palladius.github.io/demo-snake/`) powered by **PuffinLogin** (`<puffin-login>` & `<puffin-leaderboard>`) and backed by **Google Cloud Firestore** (`ror-goldie` / database `puffin-login`).

## 🔐 How Login & Passwords Work on Public GitHub Pages (`*.github.io`)

1. **Zero Plaintext Secrets in Repo**:
   - [`src/puffin-login.js`](src/puffin-login.js) stores **ONLY** salted SHA-256 digests (`secretHash = SHA-256("puffin-salt-2026:<userId>:<secret>")`) computed via WebCrypto (`crypto.subtle.digest('SHA-256', ...)`). No plaintext family passwords or PINs exist anywhere in the public repository!
2. **Shared Cloud Run + Cloud Firestore Backend (`ror-goldie`)**:
   - When running on `*.github.io`, `<puffin-login>` and `<puffin-leaderboard>` automatically connect over HTTPS CORS to `https://puffin-login-932724269481.europe-west1.run.app/v1` (`GET/POST /v1/scores` & `POST /v1/auth/verify`), persisting all Top 10 Hall of Fame scores directly into **Cloud Firestore** (`projects/ror-goldie/databases/puffin-login/documents/scores`).
3. **FIFO Cursor Input Buffer (`dirQueue`) & End-of-Match Hall of Fame**:
   - Rapid multi-key turns (e.g., `UP` then `LEFT` within a single tick) are queued in a 3-slot FIFO buffer so no key press is ever dropped.
   - The Hall of Fame stays hidden during gameplay and reveals automatically on **Game Over**.
