# Courses Platform

This project includes a Gatsby.js frontend and an Express.js backend that handle course enrollment functionality. Users can browse courses, enroll in them, and view their enrolled courses.
The whole project is Dockerized.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Running the Application](#running-the-application)
5. [Project Structure](#project-structure)
6. [API Endpoints](#api-endpoints)
7. [Testing](#testing)

## Project Overview

This project features a Gatsby.js frontend where users can view and enroll in courses. The Express.js backend handles user creation, course enrollment, and fetching enrolled courses.

## Technologies Used

- **Frontend**: Gatsby.js, React, Emotion CSS, Typescript
- **Backend**: Node.js, Express.js, Mongoose, Typescript
- **Database**: MongoDB
- **Testing**: Mocha, Chai, Sinon

## Installation

To get started, clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/plusacumen/fullstack-assessment.git
cd assessment
docker-compose up --build
```

## Running the Application

The above docker command will start the application.

The frontend will be available at http://localhost:8000 and the backend will be running on http://localhost:4000.

## Project Structure

```lua
assessment/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── enrollmentController.ts
│   │   ├── models/
│   │   │   └── course.ts
│   │   │   └── lmsAccount.ts
│   │   │   └── Signup.ts
│   │   │   └── user.ts
│   │   ├── services/
│   │   │   └── enrollmentService.ts
│   │   │   └── lmsService.ts
│   │   ├── utils/
│   │   │   └── database.ts
│   │   ├── app.ts
│   │   ├── db.ts
│   │   ├── seed.ts
│   │   └── server.ts
│   │   ├── test/
│   │   │   └── enrollmentController.spec.ts
│   │   │   └── enrollmentService.spec.ts
│   │   │   └── lmsService.spec.ts
│   │   │   └── testApp.ts
│   │   │   └── testHelper.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── CourseCard.tsx
│   │   │   └── Filters.tsx
│   │   │   └── Hero.tsx
│   │   │   └── Layout.tsx
│   │   │   └── SearchBar.tsx
│   │   ├── images/
│   │   │   └── hero.jpg
│   │   │   └── icon.png
│   │   ├── pages/
│   │   │   └── 404.tsx
│   │   │   └── dashboard.tsx
│   │   │   └── index.tsx
│   │   └── gatsby-types.d.ts
│   ├── gatsby-config.js
│   ├── gatsby-node.js
│   ├── package.json
│   └── tsconfig.json
├── package.json
└── README.md
```

## API Endpoints

### POST `/api/v1/enroll`

Enroll a user in a course.

Request Body:

```json
{
  "data": {
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "course_id": "course-id",
    "course_name": "Course Name",
    "provider": "Provider",
    "external_id": "external-id"
  }
}
```

Response:

- 200 OK: Enrollment successful
- 500 Internal Server Error: An error occurred

### GET `/api/v1/enrolled-courses`

Fetch enrolled courses for a user.

Query Parameters:

- `email` (string): The user's email

## Testing

```bash
npm test
```

This will run all the tests using Mocha, Chai, and Sinon.
