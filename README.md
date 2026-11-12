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
