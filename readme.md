# Follow Service

A microservice responsible for managing user relationships (following and followers). Built with Node.js, Express, and MongoDB.

## Live Deployment

**Base URL:** [https://follow-service.vercel.app](https://follow-service.vercel.app)

> Note: The live deployment may require the same API endpoints as described below.

## Prerequisites

- **Node.js**: v14+ (Recommended v18+)
- **npm** or **yarn**
- **MongoDB**: A running instance or Cloud Atlas URI

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd follow_service
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory. You can copy the structure below:

   ```env
   PORT=4001
   DATABASE=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/follow-service

   In my case i have set this

   PORT=4001
DATABASE=mongodb+srv://ash2002:123456M@cluster0.xvrqgdg.mongodb.net/follow-service?appName=Cluster0

   ```

   **Required Variables:**
   - `PORT`: (Optional) Port number for the server. Defaults to `4001`.
   - `DATABASE`: (Required) Your MongoDB connection string.

4. **Run the server:**
   - **Development (with hot-reload):**
     ```bash
     npm run dev
     ```
   - **Production:**
     ```bash
     npm start
     ```

   The server will start at `http://localhost:4001` (or your specified port).

## API Endpoints & Testing

Base URL: `http://localhost:4001/api/v1`

### 1. Follow a User
Create a follow relationship between two users.

- **Endpoint**: `/follow`
- **Method**: `POST`
- **Body Parameters**:
  - `followerId` (string, required): ID of the user who is following.
  - `followingId` (string, required): ID of the user to be followed.

**Test with Curl:**
```bash
curl -X POST http://localhost:4001/api/v1/follow \
  -H "Content-Type: application/json" \
  -d '{
    "followerId": "REPLACE_WITH_FOLLOWER_ID",
    "followingId": "REPLACE_WITH_FOLLOWING_ID"
  }'
```

### 2. Unfollow a User
Remove a follow relationship.

- **Endpoint**: `/unfollow`
- **Method**: `POST`
- **Body Parameters**:
  - `followerId` (string, required): ID of the user who is unfollowing.
  - `followingId` (string, required): ID of the user being unfollowed.

**Test with Curl:**
```bash
curl -X POST http://localhost:4001/api/v1/unfollow \
  -H "Content-Type: application/json" \
  -d '{
    "followerId": "REPLACE_WITH_FOLLOWER_ID",
    "followingId": "REPLACE_WITH_FOLLOWING_ID"
  }'
```

### 3. Get Followers
Get a list of users who follow a specific user.

- **Endpoint**: `/followers/:userId`
- **Method**: `GET`
- **Path Parameters**:
  - `userId`: The ID of the user whose followers you want to fetch.

**Test with Curl:**
```bash
curl http://localhost:4001/api/v1/followers/REPLACE_WITH_USER_ID
```

### 4. Get Following
Get a list of users that a specific user is following.

- **Endpoint**: `/following/:userId`
- **Method**: `GET`
- **Path Parameters**:
  - `userId`: The ID of the user who is following others.

**Test with Curl:**
```bash
curl http://localhost:4001/api/v1/following/REPLACE_WITH_USER_ID
```

### 5. Health Check
Check if the service is running.

- **Endpoint**: `/` (Root of the server, not properly versioned in `/api/v1`)
- **Method**: `GET`

**Test with Curl:**
```bash
curl http://localhost:4001/
```

## Error Handling

The API returns standard HTTP status codes:
- `200`: Success
- `201`: Created (for Follow)
- `400`: Bad Request (Missing fields, self-follow, already following)
- `404`: Not Found (User not found, or no followers/following found)
- `500`: Internal Server Error

## Ports
- Default Port: `4001`
- Can be changed via `PORT` environment variable.
