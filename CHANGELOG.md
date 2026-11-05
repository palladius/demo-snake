# Changelog

## [1.0.1] - 2026-11-05

### Changed
- Added prominent clickable live link **[https://palladius.github.io/demo-snake/](https://palladius.github.io/demo-snake/)**, Hall of Fame link, and Cloud Run Vetrina `/` link to [`README.md`](README.md) and GitHub repo `homepage`.

## [1.0.0] - 2026-11-04

### Added
- Initial public GitHub Pages release of **Puffin Snake** (`palladius/demo-snake`) at `https://palladius.github.io/demo-snake/`.
- Integrated zero-plaintext salted SHA-256 WebCrypto authentication (`secretHash`) + Cloud Run / Cloud Firestore (`ror-goldie` / `puffin-login`) Hall of Fame sync.
- Added FIFO directional input queue (`dirQueue`) for rapid multi-key turns (`UP`/`LEFT` without dropping inputs) and Game-Over-only Hall of Fame reveal.
