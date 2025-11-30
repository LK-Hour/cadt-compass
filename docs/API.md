# CADT Compass API Documentation

**Base URL:** `http://localhost:4000` (Development)  
**Production URL:** TBD

---

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

### Register

Create a new user account.

**Endpoint:** `POST /api/auth/register`

**Request Body:**

```json
{
  "email": "student@cadt.edu.kh",
  "password": "password123",
  "name": "Kimhour",
  "studentId": "ST001" // Optional
}
```

**Response:** `201 Created`

```json
{
  "user": {
    "id": "uuid",
    "email": "student@cadt.edu.kh",
    "name": "Kimhour",
    "studentId": "ST001",
    "role": "STUDENT",
    "createdAt": "2025-11-25T07:00:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login

Authenticate with existing credentials.

**Endpoint:** `POST /api/auth/login`

**Request Body:**

```json
{
  "email": "student@cadt.edu.kh",
  "password": "password123"
}
```

**Response:** `200 OK`

```json
{
  "user": {
    "id": "uuid",
    "email": "student@cadt.edu.kh",
    "name": "Kimhour",
    "role": "STUDENT"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Get Current User

Get the authenticated user's profile.

**Endpoint:** `GET /api/auth/me`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "email": "student@cadt.edu.kh",
  "name": "Kimhour",
  "studentId": "ST001",
  "role": "STUDENT",
  "createdAt": "2025-11-25T07:00:00Z"
}
```

### Update Profile

Update the authenticated user's profile.

**Endpoint:** `PUT /api/auth/me`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "name": "Jane Doe"
}
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "email": "student@cadt.edu.kh",
  "name": "Jane Doe",
  "studentId": "ST001",
  "role": "STUDENT"
}
```

### Logout

**Endpoint:** `POST /api/auth/logout`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

```json
{
  "message": "Logged out successfully"
}
```

---

## Buildings

### Get All Buildings

**Endpoint:** `GET /api/buildings`

**Response:** `200 OK`

```json
[
  {
    "id": "uuid",
    "code": "A",
    "name": "A Building",
    "description": "Main academic building",
    "latitude": 11.5564,
    "longitude": 104.9282,
    "floors": 3,
    "imageUrl": null,
    "createdAt": "2025-11-25T07:00:00Z"
  }
]
```

### Get Building by ID

**Endpoint:** `GET /api/buildings/:id`

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "code": "A",
  "name": "A Building",
  "description": "Main academic building",
  "latitude": 11.5564,
  "longitude": 104.9282,
  "floors": 3,
  "rooms": [
    {
      "code": "A101",
      "name": "Study Room A101",
      "floor": 1,
      "capacity": 6,
      "type": "STUDY_ROOM"
    }
  ]
}
```

### Get Rooms in Building

**Endpoint:** `GET /api/buildings/:id/rooms`

**Response:** `200 OK`

```json
[
  {
    "id": "uuid",
    "code": "A101",
    "name": "Study Room A101",
    "buildingId": "uuid",
    "floor": 1,
    "capacity": 6,
    "type": "STUDY_ROOM",
    "facilities": {
      "whiteboard": true,
      "projector": false,
      "ac": true
    }
  }
]
```

---

## Rooms

### Get All Rooms

**Endpoint:** `GET /api/rooms`

**Query Parameters:**

- `buildingId` (optional) - Filter by building
- `floor` (optional) - Filter by floor
- `type` (optional) - Filter by room type

**Response:** `200 OK`

```json
[
  {
    "id": "uuid",
    "code": "A101",
    "name": "Study Room A101",
    "building": {
      "code": "A",
      "name": "A Building"
    },
    "floor": 1,
    "capacity": 6,
    "type": "STUDY_ROOM"
  }
]
```

### Get Room by ID

**Endpoint:** `GET /api/rooms/:id`

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "code": "A101",
  "name": "Study Room A101",
  "buildingId": "uuid",
  "building": {
    "code": "A",
    "name": "A Building"
  },
  "floor": 1,
  "capacity": 6,
  "type": "STUDY_ROOM",
  "facilities": {
    "whiteboard": true,
    "projector": false,
    "ac": true
  }
}
```

---

## Points of Interest (POIs)

### Get All POIs

**Endpoint:** `GET /api/pois`

**Query Parameters:**

- `type` (optional) - Filter by POI type (LIBRARY, CAFETERIA, RECYCLING, etc.)

**Response:** `200 OK`

```json
[
  {
    "id": "uuid",
    "name": "Main Library",
    "type": "LIBRARY",
    "latitude": 11.5565,
    "longitude": 104.9283,
    "floor": 1,
    "description": "CADT Main Library - Books, computers, and study spaces",
    "icon": "library"
  }
]
```

---

## Room Availability

### Get All Room Availability

**Endpoint:** `GET /api/availability`

**Query Parameters:**

- `buildingId` (optional) - Filter by building
- `floor` (optional) - Filter by floor
- `type` (optional) - Filter by room type
- `available` (optional) - Filter by availability (true/false)

**Response:** `200 OK`

```json
{
  "rooms": [
    {
      "roomId": "uuid",
      "name": "Study Room A101",
      "building": "A Building",
      "floor": 1,
      "capacity": 6,
      "type": "STUDY_ROOM",
      "available": true,
      "currentBooking": null,
      "nextBooking": {
        "startTime": "2025-11-25T16:00:00Z",
        "endTime": "2025-11-25T18:00:00Z"
      }
    },
    {
      "roomId": "uuid",
      "name": "Computer Lab B203",
      "building": "B Building",
      "floor": 2,
      "capacity": 30,
      "type": "COMPUTER_LAB",
      "available": false,
      "currentBooking": {
        "user": "CS101 - Intro to Programming",
        "startTime": "2025-11-25T14:00:00Z",
        "endTime": "2025-11-25T15:30:00Z"
      },
      "nextBooking": null
    }
  ],
  "lastUpdated": "2025-11-25T14:23:15Z"
}
```

### Get Specific Room Availability

**Endpoint:** `GET /api/availability/:roomId`

**Response:** `200 OK`

```json
{
  "roomId": "uuid",
  "name": "Study Room A101",
  "building": "A Building",
  "floor": 1,
  "capacity": 6,
  "type": "STUDY_ROOM",
  "available": false,
  "currentBooking": {
    "user": "Kimhour",
    "startTime": "2025-11-25T14:00:00Z",
    "endTime": "2025-11-25T15:30:00Z",
    "purpose": "Group Study"
  },
  "nextAvailable": "2025-11-25T15:30:00Z"
}
```

---

## Events

### Get All Events

**Endpoint:** `GET /api/events`

**Query Parameters:**

- `type` (optional) - Filter by event type
- `startDate` (optional) - Filter events after this date (ISO 8601)
- `endDate` (optional) - Filter events before this date (ISO 8601)
- `organizer` (optional) - Filter by organizer
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 20) - Items per page

**Response:** `200 OK`

```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Welcome to CADT 2025",
      "description": "Orientation for new students",
      "type": "OFFICIAL",
      "startTime": "2025-11-26T09:00:00Z",
      "endTime": "2025-11-26T12:00:00Z",
      "location": "A201",
      "organizer": "CADT Official",
      "imageUrl": null,
      "registrationRequired": true,
      "maxParticipants": 100
    }
  ],
  "total": 3,
  "page": 1,
  "limit": 20,
  "totalPages": 1
}
```

### Get Event by ID

**Endpoint:** `GET /api/events/:id`

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "title": "Welcome to CADT 2025",
  "description": "Orientation for new students",
  "type": "OFFICIAL",
  "startTime": "2025-11-26T09:00:00Z",
  "endTime": "2025-11-26T12:00:00Z",
  "location": "A201",
  "organizer": "CADT Official",
  "registrationRequired": true,
  "maxParticipants": 100,
  "registrations": []
}
```

### Create Event

**Endpoint:** `POST /api/events`

**Headers:** `Authorization: Bearer <token>` (Admin/Staff only)

**Request Body:**

```json
{
  "title": "Web Development Workshop",
  "description": "Learn Next.js and React",
  "type": "WORKSHOP",
  "startTime": "2025-12-01T14:00:00Z",
  "endTime": "2025-12-01T16:00:00Z",
  "location": "B203",
  "organizer": "Tech Club",
  "registrationRequired": true,
  "maxParticipants": 30
}
```

**Response:** `201 Created`

```json
{
  "id": "uuid",
  "title": "Web Development Workshop",
  "type": "WORKSHOP",
  "startTime": "2025-12-01T14:00:00Z",
  "endTime": "2025-12-01T16:00:00Z",
  "location": "B203"
}
```

### Update Event

**Endpoint:** `PUT /api/events/:id`

**Headers:** `Authorization: Bearer <token>` (Admin only)

### Delete Event

**Endpoint:** `DELETE /api/events/:id`

**Headers:** `Authorization: Bearer <token>` (Admin only)

**Response:** `204 No Content`

---

## Feedback

### Submit Feedback

**Endpoint:** `POST /api/feedback`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "type": "MAP_ERROR",
  "subject": "Building A location is incorrect",
  "description": "The GPS coordinates for Building A seem off by about 50 meters",
  "location": "A Building"
}
```

**Response:** `201 Created`

```json
{
  "id": "uuid",
  "type": "MAP_ERROR",
  "subject": "Building A location is incorrect",
  "status": "PENDING",
  "createdAt": "2025-11-25T14:30:00Z"
}
```

### Get All Feedback (Admin)

**Endpoint:** `GET /api/feedback`

**Headers:** `Authorization: Bearer <token>` (Admin only)

**Query Parameters:**

- `status` (optional) - Filter by status
- `type` (optional) - Filter by type

**Response:** `200 OK`

```json
[
  {
    "id": "uuid",
    "user": {
      "name": "Kimhour",
      "email": "student@cadt.edu.kh"
    },
    "type": "MAP_ERROR",
    "subject": "Building A location is incorrect",
    "description": "The GPS coordinates for Building A seem off",
    "status": "PENDING",
    "location": "A Building",
    "createdAt": "2025-11-25T14:30:00Z"
  }
]
```

### Update Feedback Status (Admin)

**Endpoint:** `PUT /api/feedback/:id/status`

**Headers:** `Authorization: Bearer <token>` (Admin only)

**Request Body:**

```json
{
  "status": "RESOLVED"
}
```

**Response:** `200 OK`

---

## Error Responses

All error responses follow this format:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

### Common Error Codes

- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

> **Note:** Rate limiting will be implemented in production

- **Authentication endpoints:** 5 requests per minute
- **Other endpoints:** 100 requests per minute

---

## WebSocket Events (Future)

> **Note:** Real-time updates via Socket.io (Phase 2 feature)

### Room Availability Updates

**Event:** `room:availability`

**Payload:**

```json
{
  "roomId": "uuid",
  "available": false,
  "currentBooking": {
    "endTime": "2025-11-25T15:30:00Z"
  }
}
```

---

**Last Updated:** November 25, 2025  
**Version:** 1.0.0
