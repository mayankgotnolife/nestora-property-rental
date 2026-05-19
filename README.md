# Nestora Property Rental

## Overview
Nestora is a full-stack property rental platform where tenants can browse listings, request bookings, review properties, and chat in real time with landlords/agents.  
It supports role-based access (tenant, landlord, agent, admin), property lifecycle management, booking workflows, and secure authentication.

## Architecture
- **Frontend (`client`)**: React + Vite single-page application
- **Backend (`server`)**: Express REST API with Socket.IO
- **Database**: MongoDB via Mongoose
- **Media**: Cloudinary image storage through Multer
- **Auth**: JWT-based authentication and role authorization middleware

Flow:
1. Client sends REST requests to `/api/*`.
2. Express routes invoke controllers and Mongoose models.
3. Protected routes validate JWT and user roles.
4. Socket.IO handles live messaging and unread updates.

## Tech Stack
### Frontend
- React 18
- Vite
- React Router DOM
- Axios
- Socket.IO Client
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- Socket.IO
- Multer + Cloudinary
- Helmet, CORS, Morgan

## Setup Instructions
### Prerequisites
- Node.js (v14+ supported, v18+ recommended)
- npm
- MongoDB (local or Atlas)
- Cloudinary account (for image upload)

### 1) Clone and install dependencies
```bash
cd server
npm install

cd ../client
npm install
```

### 2) Configure environment variables
Create: `server/.env`

```env
PORT=5000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NODE_ENV=development
```

Optional frontend env file:  
`client/.env`

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

### 3) Run the app
```bash
# terminal 1
cd server
npm run dev

# terminal 2
cd client
npm run dev
```

Open: `http://localhost:5173`

## API Explanation
Base URL: `http://localhost:5000/api`

### Authentication
- `POST /auth/register` — Register user
- `POST /auth/login` — Login and receive JWT
- `GET /auth/logout` — Logout
- `GET /auth/me` — Current user (protected)
- `PUT /auth/profile` — Update profile (protected)
- `PUT /auth/password` — Change password (protected)

### Users
- `GET /users/me` — Current profile (protected)
- `PUT /users/me` — Update own profile (protected)
- Admin routes:
  - `GET /users`
  - `POST /users`
  - `GET /users/:id`
  - `PUT /users/:id`
  - `DELETE /users/:id`

### Properties
- `GET /properties` — List/search properties
- `GET /properties/featured` — Featured properties
- `GET /properties/:id` — Property details
- `POST /properties` — Create property (landlord/agent)
- `PUT /properties/:id` — Update property (protected)
- `DELETE /properties/:id` — Delete property (protected)
- `GET /properties/my/properties` — Owner listings
- `POST /properties/:id/images` — Upload images

### Bookings
- `GET /bookings` — List bookings (protected)
- `GET /bookings/:id` — Booking detail (protected)
- `POST /bookings` — Create booking (tenant)
- `PUT /bookings/:id/cancel` — Cancel booking (tenant)
- `PUT /bookings/:id/status` — Approve/reject (landlord/admin)
- `GET /bookings/summary` — Booking summary (landlord/admin)

### Reviews
- `GET /reviews/property/:propertyId` — Public property reviews
- `GET /reviews/my` — My reviews (protected)
- `POST /reviews` — Create review (protected)
- `PUT /reviews/:id` — Update review (protected)
- `DELETE /reviews/:id` — Delete review (protected)
- `POST /reviews/:id/respond` — Reply to review (protected)
- Admin:
  - `GET /reviews`
  - `PUT /reviews/:id/approve`

### Messages
- `GET /messages/conversations` — Conversations
- `GET /messages/unread` — Unread count
- `GET /messages/:conversationId` — Conversation messages
- `POST /messages` — Send message
- `POST /messages/conversation` — Start conversation
- `DELETE /messages/:id` — Delete message

## Screenshots
No screenshots are currently committed.  
Use `docs/screenshots/` and update the links below when images are added.

| Screen | Preview |
|---|---|
| Home page | `docs/screenshots/home.png` |
| Property listing | `docs/screenshots/property-list.png` |
| Property detail | `docs/screenshots/property-detail.png` |
| Booking dashboard | `docs/screenshots/booking-dashboard.png` |
| Chat screen | `docs/screenshots/chat.png` |

## Folder Structure
```text
nestora-property-rental/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── booking/
│   │   │   ├── chat/
│   │   │   ├── common/
│   │   │   ├── property/
│   │   │   └── review/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── utils/
│   └── package.json
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   ├── server.js
│   └── package.json
├── docs/
│   └── screenshots/       # optional: UI screenshots for README
├── TODO.md
└── README.md
```

## Future Improvements
- Add automated tests (unit + integration + e2e)
- Add API documentation with Swagger/OpenAPI
- Add CI workflows for lint/build/test
- Add payment integration for online rent processing
- Add notification center (email/push/in-app)
- Add advanced analytics for landlords and admins
