# panini_obesity

Chronic weight management clinical forms toolkit — HTML web app for GitHub Pages.

Open `index.html` or deploy to GitHub Pages from the repository root.

**Modules:** Initial Evaluation · Secondary Causes & Tests · Weight Trajectory Map · Psych/Behavioral Readiness · Dietary Recall · Obesity Dietary Contract · Physical Activity · Yoga & Asana Practice · Clinical Input Audit · 3-Year Winner Program (19 bi-monthly visits)

Every module includes **Print / PDF** support. Winner Program uses visit-wise auto-save with progress reports — no manual patient save required.

## Anonymous patient data (`data/`)

- **No names or phone numbers** are stored — only a unique Patient ID (e.g. `WIN-K4M8P2`)
- Enter or generate an ID in the app; data auto-fills on the next visit
- Export JSON from the Winner Program and commit to `data/patients/{id}.json` on GitHub
- GitHub Pages serves those files so **Load** merges repo data with local browser storage

See [`data/README.md`](data/README.md) for the privacy policy and workflow.

## Yoga module (`yoga/`)

**PranaDaily** — daily yoga routine generator with 150 practices, guided practice studio (timer + audio), favorites, and journey streak tracking. Open from the sidebar as **Yoga & Asana Practice** or directly at `yoga/index.html`.
