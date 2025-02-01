# Thinkify - Idea Analysis Platform

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Backend Architecture](#backend-architecture)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [Frontend Integration](#frontend-integration)
8. [Deployment](#deployment)
9. [Next Steps](#next-steps)

---

## Project Overview

**Thinkify** is an idea analysis and brainstorming platform designed to help users generate, refine, and validate their business and project ideas. The platform provides a structured framework to analyze ideas in-depth, including competitive analysis, suggestions for improvement, and actionable implementation steps. Additionally, the platform allows users to receive notifications and set alarms for reviewing their ideas, enhancing engagement and idea progression.

---

## Features
- **Idea Submission & Analysis**: Users can submit ideas, and the AI analyzes them with structured responses, including title, category, target audience, objective, suggestions, market analysis, implementation steps, and a summary.
- **Idea Notifications**: Notifications are sent to users for feedback or updates related to their ideas.
- **Set Alarm for Idea Review**: Users can set alarms to review and update their ideas.
- **Badges & Titles**: Users earn badges and titles for contributing and participating in the community.
- **Top Idea Highlights**: Highlight the top-rated or trending ideas within the platform.
- **Realtime Notifications**: Receive live updates for new ideas or responses.

---

## Technologies Used
- **Frontend**: React.js, HTML, CSS, JavaScript
- **Backend**: Appwrite, Node.js, TypeScript
- **Database**: Appwrite Database (NoSQL)
- **Hosting**: Appwrite Cloud or Self-hosted Appwrite
- **Realtime Notifications**: Appwrite Realtime API
- **Model**: LLaMA2, Mistral, and Deepseek-R1 for Idea Analysis

---

## Backend Architecture
The backend is built with **Appwrite** to handle user management, idea submission, notifications, alarms, badges, and other essential services.

### Appwrite Setup
- **Databases**: Appwrite is used to store user data, ideas, badges, notifications, and alarms.
- **Collections**: Each collection stores different aspects of the system, such as user details, ideas, notifications, and alarms.

#### Key Collections:
1. **Users**: Stores user details like `user_id`, `email`, `username`, etc.
2. **Ideas**: Stores the ideas submitted by users, including `title`, `description`, `category`, `target_audience`, etc.
3. **Badges**: Contains information about badges earned by users.
4. **Notifications**: Stores notifications for users.
5. **Alarms**: Stores alarms set by users for reviewing ideas.

---

## Database Schema

### Users Collection (`users`)
| Field        | Type    | Description                 |
|--------------|---------|-----------------------------|
| `account_id` | String  | Unique ID                   |
| `fullname`   | String  | Full name of user           |
| `email`      | String  | Email                       |
| `avatar`     | String  | Avatar                      |

### Ideas Collection (`ideas`)
| Field          | Type    | Description                 |
|----------------|---------|-----------------------------|
| `idea_id`      | String  | Unique idea ID              |
| `user_id`      | String  | Associated user ID          |
| `title`        | String  | Idea title                  |
| `description`  | String  | Idea description            |
| `category`     | String  | Idea category               |
| `target_audience` | String | Target audience         |
| `objective`    | String  | Idea objective              |
| `created_at`   | DateTime| Timestamp                   |

### Badges Collection (`badges`)
| Field        | Type    | Description               |
|--------------|---------|---------------------------|
| `badge_id`   | String  | Unique badge ID           |
| `badge_name` | String  | Name of the badge         |
| `description`| String  | Description of the badge  |

### Notifications Collection (`notifications`)
| Field          | Type    | Description                 |
|----------------|---------|-----------------------------|
| `notification_id` | String  | Unique notification ID    |
| `user_id`      | String  | Associated user ID          |
| `message`      | String  | Notification message        |
| `is_read`      | Boolean | Read status                 |
| `created_at`   | DateTime| Timestamp                   |

### Alarms Collection (`alarms`)
| Field        | Type    | Description                 |
|--------------|---------|-----------------------------|
| `alarm_id`   | String  | Unique alarm ID             |
| `user_id`    | String  | Associated user ID          |
| `idea_id`    | String  | Associated idea ID          |
| `alarm_time` | DateTime| Alarm time                  |

---

## API Endpoints

### 1️⃣ User Routes
- **POST** `/create_user`: Create a new user.
- **GET** `/get_user/:user_id`: Fetch user details.

### 2️⃣ Idea Routes
- **POST** `/create_idea`: Submit a new idea.
- **GET** `/get_ideas`: Fetch all ideas.
- **GET** `/get_idea/:idea_id`: Fetch a specific idea.

### 3️⃣ Notification Routes
- **POST** `/send_notification`: Send a notification to a user.
- **GET** `/get_notifications/:user_id`: Fetch all notifications for a user.

### 4️⃣ Alarm Routes
- **POST** `/set_alarm`: Set an alarm for an idea.
- **GET** `/get_alarms/:user_id`: Fetch all alarms for a user.

---

## Frontend Integration

The frontend communicates with the backend using **RESTful API calls** to fetch and submit data for users, ideas, alarms, and notifications.

### Example API Call (Frontend)
```javascript
// Fetch all ideas
async function loadIdeas() {
    const response = await fetch("http://localhost:3000/get_ideas");
    const ideas = await response.json();
    console.log(ideas);
}
```

---

## Deployment
1. **Backend Deployment**:
   - Host **Appwrite** on Appwrite Cloud or self-host it using Docker.
   - Set up appropriate environment variables like the `APPWRITE_ENDPOINT` and `APPWRITE_PROJECT_ID`.

2. **Frontend Deployment**:
   - Host the React frontend on platforms like **Vercel**, **Netlify**, or **AWS S3**.
   - Connect the frontend with the backend API using **fetch** or **Axios**.

---

## Next Steps
1. **Integrate Realtime Features**: Use Appwrite's Realtime API to notify users when their idea receives feedback.
2. **Scaling**: Prepare for scaling by optimizing database queries and implementing caching strategies.

---

### Contributors
- [Vrajesh Sharma](https://github.com/Vrajesh-Sharma) - AI Lead and Full Stack Developer
- [Prince Rathod](https://github.com/Prince-695) - Team Lead and Full Stack Developer
- [Vatsal Patel](https://github.com/Vatsal-Patel-09) - UI/UX developer 