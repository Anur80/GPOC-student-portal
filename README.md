# GPOC Scholarship Portal — Frontend Prototype

A responsive React frontend prototype for presenting the GPOC scholarship management portal to a client.

## Pages
Dashboard · Students · Applications · Academic Records · Tuition Fees & Payments · Reports · Announcements · Users & Roles · Settings

## Working prototype features
- All page navigation and responsive sidebar
- Persistent localStorage data
- Add, edit, search, and delete student records
- Search/filter applications and approve, reject, or mark for review
- Add academic results and update result status
- Record, search, update, and export tuition fee payments only
- Create, edit, publish/unpublish, and delete announcements
- Add/edit users and change active status
- Summary report downloads as CSV
- Settings and notification toggles
- Reset sample data
- Empty states, toast feedback, modal forms, and CSV export

## Start locally
Install Node.js (LTS), unzip the project, open the project folder in a terminal, then run:

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually http://localhost:5173).

To create a production frontend build:
```bash
npm run build
```

## Important prototype limitation
Records are stored in the current browser's localStorage. They persist after refresh on that browser/device, but are not shared with other users or devices. This prototype does not provide secure authentication, a shared database, real payment processing, email delivery, or server-side permissions. Those are required before production use.

GPOC provides tuition-fee support only; this portal does not offer or track accommodation or other non-tuition expenses. Previously saved non-tuition payment records are excluded when the portal loads.
# GPOC-student-portal
# GPOC-student-portal
