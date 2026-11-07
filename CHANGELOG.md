# Changelog

## [1.1.0] - 2026-11-07

### Added
- **Difficulty Selector (`🐣 Facile` [Default], `🙂 Medio`, `🔥 Difficile`)**: Default set to `🐣 Facile` (`285ms` tick); lightened `🙂 Medio` to `220ms` (42% gentler for kids than the old `155ms`).
- **`1 - 2 - 3 - VIA!` Start Countdown & Safe Left Spawn**: Added visual + audio `1 -> 2 -> 3 -> VIA! 🚀` countdown with pre-steering arrow and 15-cell runway so kids never die immediately when starting a game.
- **Keyboard Restart (`Enter` & `Space`)**: Added `Enter`, `NumpadEnter`, and `Space` keyboard restart on Game Over.

## [1.0.1] - 2026-11-05

### Changed
- Added prominent clickable live link **[https://palladius.github.io/demo-snake/](https://palladius.github.io/demo-snake/)**, Hall of Fame link, and Cloud Run Vetrina `/` link to [`README.md`](README.md) and GitHub repo `homepage`.

## [1.0.0] - 2026-11-04

### Added
- Initial public GitHub Pages release of **Puffin Snake** (`palladius/demo-snake`) at `https://palladius.github.io/demo-snake/`.
- Integrated zero-plaintext salted SHA-256 WebCrypto authentication (`secretHash`) + Cloud Run / Cloud Firestore (`ror-goldie` / `puffin-login`) Hall of Fame sync.
- Added FIFO directional input queue (`dirQueue`) for rapid multi-key turns (`UP`/`LEFT` without dropping inputs) and Game-Over-only Hall of Fame reveal.
