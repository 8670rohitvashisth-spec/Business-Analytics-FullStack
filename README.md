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

## Security Enhancements

### Security Issues Identified
- API endpoints were publicly accessible without authentication.
- Sensitive credentials were stored directly in configuration files.
- No request validation was implemented.
- Missing security headers.
- No rate limiting protection.
- Error responses exposed internal server details.

### Security Improvements Implemented

#### JWT Authentication & Authorization
- Added JWT token generation endpoint.
- Created authentication middleware to verify JWT tokens.
- Protected business API routes from unauthorized access.

#### Environment Variables
- Moved MongoDB connection string to `.env`.
- Added `JWT_SECRET` in `.env`.
- Prevented hardcoded secrets in source code.

#### Input Validation
- Added request validation using `express-validator`.
- Validated query parameters before processing requests.

#### Security Headers
- Implemented `Helmet.js` to secure HTTP headers.

#### Rate Limiting
- Added `express-rate-limit`.
- Limited excessive API requests to prevent abuse.

#### CORS Protection
- Restricted API access to approved frontend origins only.

#### Error Handling
- Replaced detailed error messages with generic responses.
- Prevented leakage of internal server information.

### Testing
- Generated JWT token using `/token`.
- Verified protected routes return `Access Denied` without a valid token.
- Confirmed authenticated requests work correctly with valid JWT tokens.

## Author
Rohit Vashisth