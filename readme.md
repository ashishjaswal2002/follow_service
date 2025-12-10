# Follow Service

Microservice for managing user follows. Built with Node.js, Express, and MongoDB.

## Features

- Follow users
- Unfollow users
- Get list of followers for a user
- Get list of users a user is following
- Health check endpoint

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: v14 or higher (v18+ recommended)
- **npm** or **yarn**
- **MongoDB**: You need a running MongoDB instance or a connection string to a cloud MongoDB (e.g., MongoDB Atlas).

## Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd follow_service
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

## Configuration

Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=4001
DATABASE=<your_mongodb_connection_string>
```

- `PORT`: The port on which the server will run (default is 4001).
- `DATABASE`: Your MongoDB connection string.

## Running Locally

To run the application in development mode (with hot-reloading):

```bash
npm run dev
```

To run the application in production mode:

```bash
npm start
```

The server will start on `http://localhost:4001` (or the port you specified).

## API Endpoints

Base URL: `http://localhost:4001/api/v1`

### Follow a User
- **URL**: `/follow`
- **Method**: `POST`
- **Body**:
    ```json
    {
        "followerId": "user_id_here",
        "followingId": "target_user_id_here"
    }
    ```

### Unfollow a User
- **URL**: `/unfollow`
- **Method**: `POST`
- **Body**:
    ```json
    {
        "followerId": "user_id_here",
        "followingId": "target_user_id_here"
    }
    ```

### Get Followers
- **URL**: `/followers/:userId`
- **Method**: `GET`

### Get Following
- **URL**: `/following/:userId`
- **Method**: `GET`

## Health Check

- **URL**: `/`
- **Method**: `GET`
- **Response**:
    ```json
    {
        "status": "success",
        "message": "Follow Service is running",
        "host": "..."
    }
    ```

## Links

- [Live Deployment](#)
https://follow-service.vercel.app


you have to create a .env file in the root directory and add the following environment variables:

PORT=4001
DATABASE=mongodb+srv://ash2002:123456M@cluster0.xvrqgdg.mongodb.net/follow-service?appName=Cluster0
