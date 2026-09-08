# SecureAuth Frontend

A React-based authentication client built with Vite. SecureAuth provides a complete browser experience for account registration, email verification, sign-in, password recovery, and protected user access.

## Highlights

- Register accounts with client-side password confirmation
- Verify email addresses from tokenized verification links
- Sign in with access and refresh tokens
- Automatically refresh expired access tokens and retry requests once
- Request and complete password resets through tokenized links
- Protect authenticated routes and redirect unauthenticated visitors
- Display the signed-in user's name, email, role, and ID on the dashboard
- Clear local session state safely on logout or failed token refresh

## 🔗 Backend

This project uses a Spring Boot backend.

👉 [View Backend Repository](https://github.com/sanojkushwaha/SecureAuth-Backend)


## Tech stack

- React 19
- Vite 8
- React Router 7
- Axios
- JavaScript (ES modules)
- Oxlint

## Prerequisites

- Node.js 18 or later
- npm
- A compatible authentication backend running locally or remotely

## Quick start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file:

   ```powershell
   Copy-Item .env.example .env
   ```

3. Set the API URL in `.env`:

   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:5180` in your browser.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server on port 5180. |
| `npm run build` | Creates an optimized production build in `dist/`. |
| `npm run preview` | Serves the production build locally. |
| `npm run lint` | Runs Oxlint checks. |

## Authentication workflow

1. A user registers at `/register`.
2. The user follows the verification link to `/verify-email?token=...`.
3. The user signs in at `/login` and receives access and refresh tokens.
4. Tokens are stored in browser local storage; the access token is sent as a Bearer token on API requests.
5. When an access token expires, the client calls `/auth/refresh`, stores the new token, and retries the original request once.
6. Authenticated users can view `/dashboard`; unauthenticated users are redirected to `/login`.

## Routes

| Route | Purpose |
| --- | --- |
| `/login` | Sign in to an existing account. |
| `/register` | Create a new account. |
| `/verify-email?token=...` | Verify an email address. |
| `/forgot-password` | Request a password-reset link. |
| `/reset-password?token=...` | Set a new password. |
| `/dashboard` | Protected user dashboard. |

## Backend API contract

The frontend expects the following endpoints beneath `VITE_API_BASE_URL`:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/auth/register` | Register a user. |
| `POST` | `/auth/login` | Authenticate and return access/refresh tokens. |
| `GET` | `/auth/verify-email?token=...` | Verify a user email. |
| `POST` | `/auth/forgot-password` | Start password recovery. |
| `POST` | `/auth/reset-password` | Reset the password with a token. |
| `POST` | `/auth/refresh` | Exchange a refresh token for a new access token. |
| `POST` | `/auth/logout` | End the authenticated session. |
| `GET` | `/user/me` | Retrieve the signed-in user profile. |

## Project structure

```text
src/
├── api/
│   ├── axiosConfig.js     # Axios client, Bearer token, and refresh handling
│   └── authService.js     # Authentication API calls
├── components/
│   ├── Alert.jsx          # Reusable status messages
│   └── ProtectedRoute.jsx # Route-access guard
├── context/
│   └── AuthContext.jsx    # Global authentication state
├── pages/                 # Login, registration, verification, recovery, dashboard
├── App.jsx                # Application routes
└── main.jsx               # React entry point
```

## Configuration notes

- Vite exposes only variables prefixed with `VITE_` to the browser.
- Restart `npm run dev` after changing `.env`.
- Configure CORS on the backend to allow the frontend origin, normally `http://localhost:5180` during development.
- Do not put private secrets in `.env` variables beginning with `VITE_`; browser-exposed variables are not secret.

## Production build

```bash
npm run build
```

Set `VITE_API_BASE_URL` to the production API URL before building, then deploy the generated `dist/` directory to a static host.
