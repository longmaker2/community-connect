# Community Connect

**Community Connect** is a platform designed to connect local businesses, artisans, and service providers with their immediate community. It allows users to discover services, book appointments, and communicate directly with service providers through a real-time chat interface.

## Table of Contents
- [Project Overview](#project-overview)
- [Core Features](#core-features)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Testing](#testing)
- [Agile Development](#agile-development)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
**Community Connect** provides a multi-tenant platform that enables real-time interactions, user profile management, and transaction processing. The platform is built to serve various types of users, including businesses, artisans, and consumers, within a defined community.

## Core Features
1. **User Authentication**  
   Login and registration for businesses, artisans, and consumers.
   
2. **Profile Management**  
   Users can manage profiles with detailed information, including services offered, availability, and pricing.
   
3. **Search and Discovery**  
   Advanced search filters based on service type, location, and availability.
   
4. **Booking System**  
   Calendar-based appointment booking for consumers to schedule services.
   
5. **Real-time Chat**  
   Integrated chat functionality for direct communication between consumers and service providers.
   
6. **Ratings and Reviews**  
   Users can rate and review services after use.

## Technologies Used

### Frontend
- **React**: Component-based frontend development.
- **TypeScript**: Type safety and better developer tooling.
- **Redux**: State management for the application.
- **Styled-Components**: Styling with component-level encapsulation.

### Backend (Recommended)
- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for managing data.

### Testing
- **Jest**: Unit and integration testing for both backend and frontend.
- **React Testing Library**: For testing React components.

## Installation and Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (for backend)
- Git (for version control)

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/longmaker2/community-connect.git
    ```
2. Install dependencies for both frontend and backend:
    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```
3. Set up environment variables:
   Create a `.env` file in the root of the backend directory with the following details:
    ```env
    MONGO_URI=your-mongodb-uri
    JWT_SECRET=your-secret-key
    ```
4. Run the application:
    ```bash
    # In the backend directory
    npm start
    
    # In the frontend directory
    npm start
    ```

## Usage
Once the server and frontend are up and running, users can:
- Register or log in to the platform as a business, artisan, or consumer.
- Create and manage profiles, including services and availability.
- Use the search functionality to find local services.
- Book appointments and interact with service providers via chat.
- Leave ratings and reviews after receiving services.

## Testing
To run unit and integration tests for both the frontend and backend, use the following command in each respective directory:

```bash
npm test
