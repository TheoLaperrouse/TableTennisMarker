# Table Tennis Marker

## Project Overview
Table Tennis Marker is a real-time application for managing table tennis matches. It consists of a backend API powered by Node.js, Express, and PostgreSQL, and a Vue.js frontend to display and interact with match data. The application supports live score updates using Socket.IO and stores match data in a PostgreSQL database.

## Features
- Manage multiple tables for table tennis matches.
- Real-time score updates via WebSocket (Socket.IO).
- Backend REST API for managing tables and players.
- Vue.js frontend for displaying scores and managing players.
- PostgreSQL database for persistent data storage.

## Technologies Used
- **Backend:** Node.js, Express, Socket.IO, Knex.js
- **Frontend:** Vue.js 3
- **Database:** PostgreSQL
- **Other Tools:** Docker for database containerization

## Installation

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd TableTennisMarker
   ```

2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Configure the database:
   - Copy the `.env.example` file to `.env` and update the database credentials.
   - Example `.env`:
     ```env
     DB_HOST=localhost
     DB_PORT=5432
     DB_USER=postgres
     DB_PASSWORD=yourpassword
     DB_NAME=tennis_tracker
     ```

4. Start the PostgreSQL database using Docker:
   ```bash
   docker-compose up -d
   ```

5. Run database migrations and seed database:
   ```bash
   npx knex migrate:latest
   npx knex seed:run
   ```

6. Start the backend server:
   ```bash
   npm run start
   ```

   The backend API will be available at [http://localhost:3000](http://localhost:3000).

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at [http://localhost:5173](http://localhost:5173).
