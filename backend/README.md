# NSHCDA Opportunities Portal Backend

Backend API for the Nasarawa State Human Capital Development Agency (NSHCDA) Opportunities Portal.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cloudinary
- Multer

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Create a `.env` file using `.env.example`

Start the development server

```bash
npm run dev
```

---

## Environment Variables

```
PORT=
MONGO_URI=
JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

EMAIL_USER=
EMAIL_PASS=
```

---

## Folder Structure

```
src/
│
├── config/
├── constants/
├── controllers/
├── helpers/
├── middleware/
├── models/
├── routes/
├── seed/
├── services/
├── utils/
├── validators/
│
├── app.js
└── server.js
```

---

## Features

- User Authentication
- Employment Profile Registration
- Opportunities Management
- Job Applications
- Dashboard Analytics
- Media Management
- Cloudinary Image Uploads
- Email Notifications (Coming Soon)

---

## Author

Developed for the Nasarawa State Human Capital Development Agency (NSHCDA).