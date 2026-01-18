# Record Management CRUD App:

This repository contains both the client-side and server-side code for a **Student Record Management** application. The application allows you to **view existing student records, add new students, and view detailed student information**. It is developed using **React JS** for the frontend and **Node JS** for the backend.

This application is mainly focused to understand the features offered by **Tanstack Query** https://tanstack.com/query/latest

## Prerequisites:

- **Node.js** installed on your system.
- **PostgreSQL** database installed and running.

## Technologies Used:

### Client :

- **React JS** – Frontend library.
- **TanStack Query (React Query)** – Server state management, caching, and data refetching.
- **TanStack Form** - Handle form state management.
- **Zustand** – State management.
- **Tailwind CSS** – Utility-first CSS framework.

### Server:

- **Express JS** – Backend framework.
- **CORS** – To handle Cross-Origin Resource Sharing.
- **pg** – PostgreSQL client for Node.js.

### Database:

- **PostgreSQL** – Relational database for storing student records.

## Setup Instructions:

1. Clone the repository:
   ```bash
   https://github.com/VengadeshRaj/record-management-app-tanstack-eco-system.git    
2. Install client dependencies:
    `cd client`
    `npm install`
3. Install server dependencies:: run 
    `cd ../server`
    `npm i`
4. Setup the database:
    Run the PostgreSQL scripts to create tables and load some sample records.
    Path to scripts: server/docs/db_scripts.md
5. Update database credentials: Modify the configuration in the server to match your local PostgreSQL setup.
6. Start the server:
    `cd sever`
    `npm run start`
7. Start the client:
    `cd client`
     `npm run start`
8. Access the application: Open your browser and navigate to http://localhost:3000
