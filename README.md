# CarePulse Frontend

React + Vite frontend for the existing PHC Express API.

## Run locally

1. Install Node.js (LTS recommended).
2. Open this folder in VS Code.
3. Copy `.env.example` to `.env`.
4. Set `VITE_API_URL` to your deployed API base URL, ending in `/api/v1`.
5. Run:

```bash
npm install
npm run dev
```

Open the local URL Vite prints (normally http://localhost:3000).

## Existing API integration

- `POST /auth/login`
- `GET /patients?page=&limit=&name=`
- `POST /patients`
- `GET /patients/:id`
- `PATCH /patients/:id`
- `DELETE /patients/:id`
- `GET /patients/:id/export`
- `GET /auth/users`
- `PATCH /auth/users/:id` (doctor only)
- `DELETE /auth/users/:id` (doctor only)

The frontend sends `Authorization: Bearer <token>` and uses the backend's existing JWT response.
Patient visit dates are sent as `dateOfVisits` (array), matching the Mongoose model.

## Important backend security note

The backend README confirms public registration currently accepts a `role`, including `doctor`.
Hiding the registration screen in this frontend does NOT secure that endpoint. Before production,
change the backend so public registration cannot create doctor accounts and preferably make staff
creation doctor-only. Also configure `FRONTEND_URL` on Render to the exact deployed frontend origin.
Do not put MongoDB, Redis, or JWT signing secrets in this frontend `.env`.

## Login background

The login page uses a locally-created CSS hospital-inspired background so the app works without
depending on an external image. Replace the `.login-scene` background in `src/styles.css` with
your preferred hospital photograph whenever you are ready.
