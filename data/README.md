# Patient Data Folder — No Personal Identifiers

This folder stores **anonymous clinical journey data only**, keyed by a unique Patient ID.

## Privacy rules (strict)

**Never store in JSON files:**
- Name, phone, email, address
- MRN, national ID, insurance number
- Date of birth (use visit dates only)
- Free-text fields that may contain names (motivation, signatures)

**Allowed data:**
- `patientId` (e.g. `WIN-K4M8P2`)
- Visit vitals: weight, waist, BP, GLP-1 dose, adherence scores
- Visit-specific assessment fields (scales, checkboxes, clinical notes without names)
- Baseline metrics (numbers only)
- Milestone checkboxes
- Program dates (start/end)

## File layout

```
data/patients/
  WIN-EXAMPLE.json    ← schema example (safe to commit)
  WIN-K4M8P2.json     ← one file per patient ID (no PII inside)
```

## Workflow

1. In the app, enter or **Generate** a Patient Unique ID
2. Click **Load** — data auto-fills from browser + `data/patients/{id}.json` on GitHub Pages
3. Fill visits — data auto-saves locally by ID
4. Click **Export for GitHub** — downloads `{id}.json`
5. Place the file in `data/patients/` and commit to the repository

On GitHub Pages, the next **Load** for that ID will fetch the committed file and merge with local data.

## Commit example

```bash
git add data/patients/WIN-K4M8P2.json
git commit -m "Add anonymous journey data for WIN-K4M8P2"
git push
```
