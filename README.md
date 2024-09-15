# Event Management System

This project is an Event Management System that allows users to create, read, update, and delete events. Users can also view a list of events with pagination, sorting, and filtering functionalities. The project is built with a tech stack that includes Node.js for the backend and React.js for the frontend, using TypeScript for both.

## Features

1. *CRUD Operations for Events*:
    - Create, read, update, and delete events.
    - Each event includes the following fields:
        - Name: Title of the event.
        - Description: Detailed information about the event.
        - Multiple Images: Upload images using multipart/form-data. (pending)
        - Start Date and End Date.
        - Total Guests (Optional): Maximum number of guests allowed.
    - Events are associated with a specific user. Only the creator can update or delete their events.

2. *Event Listing*:
    - Pagination for efficient handling of large datasets.
    - Sorting by criteria such as name or date.
    - Basic Filtering by event name, start date, and end date.
    - Advanced Filtering (Bonus): Filtering by event category. (pending)
    - Search functionality to find events based on keywords.

3. *Input Validation*:
    - Client-Side Validation: Ensures proper input validation on the client side.
    - Server-Side Validation: Prevents invalid data from being processed or stored.

4. *Login page*
    - where user will be authenticated and then he/she can see crud


## Pending Feature

    - due to ETA of 3 hour i have fulfill most requirement but some are not done yet 


    - file-upload : i had use multer for file upload but some error are occured while adding file so currently i had not done 
    - filter : filter on front-end side is pending


## Tech Stack

### Backend
- *Framework*: Node.js
- *Language*: TypeScript
- *Database*: MySQL, managed with Sequelize
- *Image Upload*: Handled via multipart/form-data and multar
- *Authentication*: bcryptjs (for hashing passwords) ,jsonwebtoken (for generating JWTs)
- *Validation*: express-validator (for input validation)

### Frontend
- *Framework*: React.js
- *Language*: TypeScript
- *Styling*: CSS

### Additional Tools
- *Database Migrations*: Sequelize (for MySQL)
- *Error Handling and Logging*: Basic error handling mechanisms and logging throughout the application.

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MySQL database set up
- Git

### Backend Setup

1. Clone the repository:
    bash
    git clone <repository-url>
    cd event-management-backend
    

2. Install dependencies:
    bash
    npm install
    

3. Create a .env file in the root directory and add the necessary environment variables:
    env
    DB_NAME=<dbname>
    DB_USER=<dbusername>
    DB_PASSWORD=<dbpassword>
    DB_HOST=<dbhost>
    PORT=<nodeserverport>
    JWT_SECRET=<your-jwt-secret>
    

4. Run database migrations:
    bash
    npm run migrate
    

5. Start the backend server:
    bash
    npm run start
    

### Frontend Setup

1. Navigate to the frontend directory:
    bash
    cd event-management-frontend
    

2. Install dependencies:
    bash
    npm install
    

3. Create a .env file in the root directory of the frontend and add necessary environment variables:
    env
    REACT_APP_API_URL=<backend-api-url>
    

4. Start the frontend application:
    bash
    npm start
    

## Usage

- Access the frontend application in your browser at http://localhost:3000.
- Use the interface to create, view, update, and delete events.
- Pagination, sorting, filtering, and search features are available in the event listing.
    

## Project Structure

- event-management-backend/: Contains the Node.js backend.
- event-management-frontend/: Contains the React.js frontend.
- README.md: Project documentation.

## Contact

For any inquiries or issues, please contact [virajfaldu672002@gmail.com].