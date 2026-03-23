# Mini Compliance Tracker

A full-stack web application to manage compliance tasks across multiple clients.

Users can:
- View clients
- Manage compliance tasks
- Track overdue items
- Analyze workload via charts

## Tech Stack

Frontend:
- React (Vite)
- Tailwind CSS
- Recharts

Backend:
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (Neon DB)

## Features

- Multi-client dashboard
- Task creation and status updates
- Filtering and sorting
- Overdue task highlighting
- Analytics dashboard (status + category charts)

## Setup Instructions

### Backend

cd backend
npm install

Create .env:
DATABASE_URL=your_neon_url

npx prisma migrate dev
npx prisma db seed

npm run dev

---

### Frontend

cd frontend
npm install

Create .env:
VITE_API_BASE_URL=http://localhost:5000/api

npm run dev

## Tradeoffs

- Used simple REST APIs instead of GraphQL for faster implementation
- Focused on clean UI and usability over complex features
- No authentication added to keep scope aligned with assignment
- Used server-side filtering instead of client-side for scalability

## Future Improvements

- Adding authentication
- Role-based access
- Notifications for overdue tasks
- Client management (add/edit/delete)