# Business Analytics Dashboard

## Project Overview
A full-stack Business Analytics Dashboard built using:

- React.js
- Node.js
- Express.js
- MongoDB
- Recharts

## Features
- KPI Cards
- Search Functionality
- Rating Distribution Chart
- Website Coverage Analysis
- Top Rated Business Indicator
- Responsive Dashboard UI

## Setup

Backend:
npm install
npm start

Frontend:
npm install
npm run dev

## Code Quality

### Proper Folder Structure
The project follows a full-stack architecture with separate frontend and backend folders. Models, routes, APIs, and UI components are organized into dedicated directories for better maintainability and scalability.

### Error Handling
Backend APIs use try-catch blocks to handle server errors and return appropriate HTTP responses. Frontend API calls use error handling to prevent application crashes and log issues.

### Validation
The application validates missing or invalid values such as Phone and Website fields before processing data. Null and "N/A" values are handled safely in filters and KPI calculations.

### Clean & Readable Code
Meaningful variable names, reusable logic, organized components, and clear code structure improve readability and make the application easier to maintain and extend.

# Security Enhancements

## Issues Identified

1. API endpoints were publicly accessible.
2. Sensitive credentials could be exposed if hardcoded.
3. User input was not validated.
4. No rate limiting was configured.
5. Missing security headers.
6. Error responses could expose internal details.

## Changes Implemented

### JWT Authentication
- Added JWT-based authentication middleware.
- Protected `/api/businesses` endpoint.

### Environment Variables
- Moved secrets and database credentials to `.env`.
- Added `.env` to `.gitignore`.

### Input Validation
- Added request validation using `express-validator`.

### Security Headers
- Implemented Helmet middleware.

### Rate Limiting
- Added `express-rate-limit` to prevent abuse.

### CORS Configuration
- Configured CORS for controlled cross-origin access.

### Error Handling
- Replaced detailed server errors with generic responses.

## Author
Rohit Vashisth