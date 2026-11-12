# CarePulse – Primary Healthcare Management System

CarePulse is a web-based healthcare management system designed to help Primary Healthcare Centres (PHCs) and hospitals manage patient records and streamline healthcare operations.

The project aims to improve the way healthcare facilities store, access and manage patient information by providing a centralized digital platform.

**CarePulse is currently under active development.** The deployed version is an early working version, and additional features, improvements and security enhancements are planned.

## Live Demo

**Frontend:** [CarePulse Live Demo](https://carepulse-clinic-gamma.vercel.app/)

**Backend API:** Hosted separately on Render.

**Backend Repository:** [View Backend Source Code](https://github.com/Harfies/phc-backend)

> The Vercel link provides access to the frontend application. The backend is a separate Express.js API hosted on Render and developed by me.

## Demo Login Credentials

You can use the following dedicated demo account to explore the application:

| Field | Demo details |
|---|---|
| Email | `doctor@test.com` |
| Password | `Password@123` |
| Role | `Doctor` |

**Important:** These credentials should belong to a dedicated test account, not a personal administrator account. Do not use real patient information or production credentials for public demonstrations.

## Data Disclaimer

**All patient records, staff information and other sample data currently displayed in the application are fictional test data.**

They are provided strictly for demonstration and testing purposes. No real patient medical records or personally identifiable health information should be entered into the public demo.

## Project Architecture

CarePulse uses a separate frontend and backend architecture.

| Component | Technology | Hosting |
|---|---|---|
| Frontend | React, Vite, JavaScript | Vercel |
| Backend | Node.js, Express.js | Render |
| Database | MongoDB Atlas | MongoDB Atlas |
| API Documentation | Swagger | Render |

The frontend communicates with the backend through REST API endpoints and uses JWT-based authentication for protected requests.

## Features Currently Implemented

The current implementation includes:

- User authentication and login.
- Role-based access to protected application areas.
- Dashboard interface.
- Patient registration and management.
- Patient records viewing and editing.
- Patient search and pagination.
- Patient record PDF export.
- Backend API integration.
- JWT authentication.
- Responsive application interface.

Some features and permissions are still being refined as development progresses.

## Backend API Integration

The frontend currently integrates with the following API endpoints:

### Authentication
- `POST /auth/login`

### Patient Management
- `GET /patients?page=&limit=&name=`
- `POST /patients`
- `GET /patients/:id`
- `PATCH /patients/:id`
- `DELETE /patients/:id`
- `GET /patients/:id/export`

### User Management
- `GET /auth/users`
- `PATCH /auth/users/:id`
- `DELETE /auth/users/:id`

The frontend sends authentication tokens using:

```http
Authorization: Bearer <token>
```

Patient visit dates are submitted using `dateOfVisits` as an array, matching the backend Mongoose model.

For API documentation, visit the deployed backend's Swagger documentation:

[Backend API Documentation](https://phc-backend-v9mb.onrender.com/api-docs/
)

## Technology Stack

**Frontend**
- React
- Vite
- JavaScript
- React Router
- Axios
- Lucide React

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Joi validation
- Swagger / OpenAPI
- Helmet and other security middleware

## Installation and Local Development

### Prerequisites

- Node.js (LTS recommended).
- Git.
- VS Code or another code editor.

### Setup

1. Clone the frontend repository:

```bash
git clone YOUR_FRONTEND_GITHUB_REPOSITORY
```

2. Navigate into the project directory:

```bash
cd carepulse-frontend
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file using `.env.example`.

5. Configure the backend API URL:

```env
VITE_API_URL=YOUR_RENDER_API_BASE_URL
```

The API base URL should end in `/api/v1`.

6. Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:3000`).

## Planned Improvements and Roadmap

CarePulse is still a work in progress. The following features and improvements are planned:

- Enhanced hospital administrator dashboard.
- Complete doctor and nurse profile management.
- Unique staff identification numbers and staff ID cards.
- Secure staff invitation and registration workflows.
- Improved patient registration with separate first, middle and last names.
- Unique patient identification numbers and patient ID cards.
- Multiple next-of-kin records per patient.
- Historical recording of patient vitals, including blood pressure, weight and height.
- Improved patient medical history and visit tracking.
- Expanded audit logging and administrative activity monitoring.
- Stronger hospital-level data isolation to support multiple healthcare facilities.
- Additional security, testing and performance improvements.
- Further UI/UX improvements and frontend/backend integration.

These features will be implemented progressively.

## Development Status

<PRIVATE_STATUS_PLACEHOLDER>

CarePulse is an ongoing personal software development project. The current deployment is intended for demonstration and testing, not production healthcare operations.

The backend and frontend are developed as separate projects, with the backend source code maintained in its own GitHub repository.

## Developer

**Afeez Akinsola**

Computer Science Graduate | Backend Development | Full-Stack Development

- GitHub: [Harfies](https://github.com/Harfies)

---

*CarePulse – Building a better digital foundation for primary healthcare management.*