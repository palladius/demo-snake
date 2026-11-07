# Changelog

## [1.4.0] - 2026-11-07

### Added
- **Veo 3.1 Animated Portrait Support**: Hovering or selecting a profile card plays the character's Veo 3.1 animation (`assets/avatars/<id>.mp4`).
- **Always Black & White Guest (`guest`)**: Anonymous/Guest avatar is always rendered in crisp monochrome (`grayscale(100%)`).
- **Robot `<tt>` Typography for UAT Bot (`<Saga/>`)**: Styled `saga` with `<tt class="robot-tt">&lt;Saga/&gt;</tt>` monospace terminal font and a dashed cyan circuit border.

## [1.3.1] - 2026-11-07

### Changed
- **2-Row × 4-Column "Who's playing?" Grid Layout**: Top row has the 4 Carlessos (`Riccardo`, `Kate`, `Ale`, `Seby`); bottom row has `Nonna` on the left, an empty spacer slot, and `Guest` + `Saga` (UAT Bot) on the right.

## [1.3.0] - 2026-11-07

### Added
- **Saga di Gemini (`saga`) — Dedicated Antigravity UAT Bot Profile (7th Hero)**: Added [`assets/avatars/saga.png`](assets/avatars/saga.png) (AI Robot wearing the golden Gemini Gold Saint helmet from *Saint Seiya / I Cavalieri dello Zodiaco*) as the last profile in `<puffin-login>`, reserved exclusively for automated UAT tests.

## [1.2.0] - 2026-11-07

### Added
- **Riccardo Admin Controls in Hall of Fame (`👑 Admin: Riccardo`)**: When logged in as `riccardo`, the Hall of Fame displays direct links to **Pantheon Cloud Console Firestore** (`🔥 Pantheon Firestore (scores) ↗` + per-document `🔥 Foglia ↗`) and a red **`🗑️ Cancella`** button on every row to delete bogus scores from Firestore (`DELETE /v1/scores/:id`).

## [1.1.1] - 2026-11-07

### Changed
- **Modal-Only Hall of Fame & Bottom `Record: [Icon] Name, Score` Chip**: Moved the Hall of Fame into a centered `<dialog id="hof-dialog">` modal that opens only on Game Over or when clicking the bottom `🏆 Record:` chip / `🏆 Hall of Fame` button.
- **Bigger, Cuter Top-Right `<puffin-login>` Badge**: Enlarged avatar (`44px`) and player name (`1.02rem`) in the top-right login pill.

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
