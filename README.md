# Task Management Web Application

A fullstack CRUD web app for managing tasks, built with React (frontend) and Node.js/Express/PostgreSQL (backend).

---

## Features
- User registration & authentication (JWT)
- Add, edit, delete, and view personal tasks
- Task status labels
- Form validation and error handling
- Responsive, modern UI (Tailwind CSS)
- Dockerized for easy local development

---

## Prerequisites
- Node.js (v18+)
- npm
- Docker (optional, for containerization)
- PostgreSQL (for backend)

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Talha-Zubair-Mayo/task-management.git
cd task-management
```

### 2. Backend Setup
```bash
cd backend
npm install
```
- Copy `.env.example` to `.env` and fill in your PostgreSQL credentials and JWT secret.
- Start the backend:
  ```bash
  npm run start:dev
  ```
- The backend API will run on http://localhost:5000/api

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
- Create a `.env` file in the `frontend` directory:
  ```env
  REACT_APP_API_URL=http://localhost:5000/api
  ```
- Start the frontend:
  ```bash
  npm start
  ```
- The React app will run on http://localhost:3000

### 4. Docker Compose (Fullstack: Frontend, Backend, PostgreSQL)
You can run the entire stack using Docker Compose:
```bash
docker-compose up --build
```
- This will build images and start all services: frontend, backend, and PostgreSQL.
- Access the app at:
  - Frontend: http://localhost:3000
  - Backend API: http://localhost:5000/api
  - PostgreSQL: localhost:5432 (see credentials in backend `.env`)

To stop all containers:
```bash
docker-compose down
```

**Note:**
- Make sure Docker Desktop is running before starting.
- Your database data will persist in the `pgdata` Docker volume.
- If you change dependencies or Dockerfiles, re-run with `--build`.

---

## Environment Variables

### Backend (`/backend/.env`)
```
NODE_ENV=development
PORT=5000
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your-db-host
DB_PORT=your-db-port
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h
API_PREFIX=/api
CORS_ORIGIN=http://your-front-end-url
```

### Frontend (`/frontend/.env`)
```
REACT_APP_API_URL=http://your-backend-url/api
```

After editing `.env` files, restart the servers for changes to take effect.


## Project Structure
```
Assessment/
├── backend/           # Node.js/Express backend
├── frontend/          # React frontend
├── docker-compose.yml # Orchestrates fullstack & DB
├── Dockerfile         # For frontend (see backend/ for its own Dockerfile)
├── README.md
```

---

## API Endpoints

### Auth
- `POST   /api/auth/register` — Register a new user
- `POST   /api/auth/login` — Log in and receive a JWT token

### Tasks (require authentication)
- `GET    /api/tasks` — List all tasks for the authenticated user
- `POST   /api/tasks` — Create a new task
- `GET    /api/tasks/:id` — Get a specific task by ID
- `PUT    /api/tasks/:id` — Update a task by ID
- `DELETE /api/tasks/:id` — Delete a task by ID

---

## License
MIT
