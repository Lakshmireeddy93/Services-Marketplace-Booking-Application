# Services Marketplace Booking Application

## Project Overview

The Services Marketplace Booking Application is a full-stack MERN web application developed to simplify the process of discovering and booking home services online. The application allows users to browse a variety of services, view detailed information about each service, and securely book appointments after authentication.

The project follows a client-server architecture, where the React frontend communicates with the Node.js and Express backend through REST APIs. MongoDB is used to store user, service, and booking data, while JWT-based authentication ensures secure access to protected features.

The application is designed with a user-friendly workflow. Visitors can explore available services without logging in. When a user decides to book a service, they are redirected to the login or registration page if they are not authenticated. After successful login, they can complete the booking process and later view their booking history.

This project demonstrates the implementation of authentication, RESTful API development, database integration, protected routes, CRUD operations, and responsive frontend design using the MERN stack.

---

## Project Workflow

1. User opens the application.
2. User browses the available services.
3. User selects a service to view detailed information.
4. User clicks **Book Now**.
5. If the user is not logged in, they are redirected to the Login/Register page.
6. After successful authentication, the booking request is submitted.
7. Booking details are stored in MongoDB.
8. The user can view all previous bookings from the Booking History page.

---

## Project Objectives

- Provide an easy platform for booking home services.
- Implement secure user authentication using JWT.
- Store and manage booking information using MongoDB.
- Build RESTful APIs with Express.js.
- Develop a responsive and user-friendly interface using React.
- Demonstrate full-stack development using the MERN stack.

---

## System Architecture

Frontend (React.js)
⬇️
REST API (Express.js & Node.js)
⬇️
MongoDB Database
