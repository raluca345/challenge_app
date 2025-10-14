# Monthly Challenges

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

---

## Introduction

**Monthly Challenges** is a web application designed to help users manage and track challenges. Users can add, update, delete, and filter challenges by month or completion status. The app is built with a React frontend and a Spring Boot backend, and it uses PostgreSQL for data persistence.

---

## Features

- Add new challenges and assign them to specific months.
- View all challenges grouped by month.
- Update or delete existing challenges.
- Mark challenges as completed or incomplete.
- Filter challenges by month or completion status.
- Responsive and user-friendly interface.

---

## Technologies Used

### Frontend
- React 19
- React Router DOM
- Bootstrap 5
- Axios
- Vite

### Backend
- Spring Boot 3.4.4
- PostgreSQL
- JPA (Java Persistence API)
- Lombok
- Maven

---

## Installation

### Prerequisites
- Node.js and npm installed
- Java 21 installed
- PostgreSQL database set up

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/challenge_app.git
   cd challenge_app
   ```

2. Set up the backend:
   - Navigate to the backend directory:
     ```bash
     cd challenge_app_backend
     ```
   - Update the `application.properties` file with your PostgreSQL credentials:
     ```properties
     spring.datasource.url=jdbc:postgresql://localhost:5432/your_database
     spring.datasource.username=your_username
     spring.datasource.password=your_password
     ```
   - Build and run the backend:
     ```bash
     mvn spring-boot:run
     ```

3. Set up the frontend:
   - Navigate to the frontend directory:
     ```bash
     cd ../challenge_app_frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

4. Open the app in your browser by visiting this link:
    `http://localhost:5173`

---

## Usage

1. Add new challenges by clicking the "Add Challenge" button.
2. View all challenges grouped by month on the "Challenges" page.
3. Update or delete challenges using the respective buttons.
4. Filter challenges by month or completion status using the dropdown menus.
