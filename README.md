Appointment Booking System

This is a full-stack appointment booking system that allows users to:

View available time slots for appointments.

Book an appointment.
View their booked appointments.
Cancel an appointment.
Admins can:

Add new date and time slots.
View all slots (available and booked).
Delete slots.
Features

User Features

View Available Slots: Users can see all available time slots for appointments.
Book an Appointment: Users can book an appointment by selecting an available slot.
View Booked Appointments: Users can view all their booked appointments.
Cancel an Appointment: Users can cancel their booked appointments.

Admin Features

Add Slots: Admins can add new date and time slots for appointments.
View All Slots: Admins can view all slots (both available and booked).
Delete Slots: Admins can delete slots if needed.
Tools and Technologies Used

Backend

Node.js: Runtime environment for the server.
Express.js: Web framework for building the REST API.
MongoDB: Database to store appointments and slots.
Mongoose: ODM (Object Data Modeling) library for MongoDB.
Dotenv: To manage environment variables.

Frontend

React: Frontend library for building the user interface.
Axios: For making HTTP requests to the backend.
Other Tools

Postman: For testing API endpoints.
Git: For version control.
Steps to Set Up and Run the Project Locally

Prerequisites

Node.js: Install Node.js from nodejs.org.
MongoDB: Install MongoDB from mongodb.com.
Git: Install Git from git-scm.com.

Step 1: Clone the Repository

Clone the project repository to your local machine:

bash
Copy
git clone https://github.com/MatheeshaDias0926/appointment-booking-system.git
cd appointment-booking-system

Step 2: Set Up the Backend

Navigate to the backend directory:
bash
Copy
cd backend
Install dependencies:
bash
Copy
npm install
Create a .env file in the backend directory and add your MongoDB connection URI:
env
Copy
MONGO_URI=mongodb://localhost:27017/appointment-booking
PORT=5000
Start the backend server:
bash
Copy
npm start
The server will run on http://localhost:5000.

Step 3: Set Up the Frontend

Navigate to the frontend directory:
bash
Copy
cd ../frontend
Install dependencies:
bash
Copy
npm install
Start the React development server:
bash
Copy
npm start
The frontend will run on http://localhost:3000.

Step 4: Seed the Database(if want)

To populate the database with sample slots, run the seed script:

Navigate to the backend directory:
bash
Copy
cd ../backend
Run the seed script:
bash
Copy
node seed.js

Step 5: Test the Application

User Interface:
Open http://localhost:3000 in your browser.
Use the frontend to view available slots, book appointments, and manage your bookings.

Admin Interface:
Open http://localhost:3000/admin in your browser.
Use the admin panel to add, view, and delete slots.

API Testing:

Use Postman to test the backend API endpoints:
GET /api/slots: Get all available slots.
POST /api/appointments: Book an appointment.
GET /api/appointments: Get all booked appointments.
DELETE /api/appointments/:id: Cancel an appointment.
POST /admin/slots: Add a new slot (admin only).
GET /admin/slots: Get all slots (admin only).
DELETE /admin/slots/:id: Delete a slot (admin only).

Project Structure

Backend

backend/
├── config/
│ └── db.js # Database connection setup
├── controllers/
│ ├── appointmentController.js # Appointment-related logic
│ └── slotController.js # Slot-related logic
├── models/
│ ├── Appointment.js # Appointment model
│ └── Slot.js # Slot model
├── routes/
│ ├── api.js # User-facing routes
│ └── adminRoutes.js # Admin-facing routes
├── seed.js # Database seeding script
├── server.js # Entry point for the backend
└── .env # Environment variables

frontend/
├── public/
│ └── index.html # HTML template
├── src/
│ ├── components/
│ │ ├── AddSlotForm.js # Form to add new slots (admin)
│ │ └── SlotList.js # List of slots (admin)
│ ├── App.js # Main application component
│ ├── index.js # Entry point for the frontend
│ └── styles.css # Global styles
└── package.json # Frontend dependencies

For any questions or feedback, please contact:

email: matheeshadias@gmail.com
GitHub: MatheeshaDias0926
