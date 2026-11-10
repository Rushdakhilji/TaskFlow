# TaskFlow – Full-Stack Task Management Application

TaskFlow is a full-stack task management application designed to help users organize their daily activities, manage priorities, track task progress, and stay productive through a clean and intuitive dashboard.

## Features

- **Create Tasks:** Add new tasks with titles, descriptions, and priorities.
- **View Tasks:** Display all tasks in an organized dashboard.
- **Update Tasks:** Change task status as work progresses.
- **Delete Tasks:** Remove tasks that are no longer needed.
- **Search Tasks:** Find tasks using the search functionality.
- **Filter Tasks:** View tasks according to their status.
- **Dashboard Statistics:** Track pending, in-progress, and completed tasks.
- **Persistent Storage:** Task data is stored in a JSON file through the backend, so tasks remain available after refreshing the application.

## Technologies Used

### Frontend
- React.js
- Vite
- JavaScript
- CSS
- Lucide React

### Backend
- Node.js
- Express.js
- REST API
- CORS

### Data Storage
- JSON file-based storage

## Project Structure

```text
TaskFlow/
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
│
├── server/
│   ├── server.js
│   ├── tasks.json
│   └── package.json
│
└── .gitignore
```

## Installation and Setup

### Prerequisites
- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Rushdakhilji/TaskFlow.git
```

### 2. Navigate to the Project

```bash
cd TaskFlow
```

### 3. Set Up the Backend

```bash
cd server
npm install
node server.js
```

The backend runs at:

`http://localhost:5000`

### 4. Set Up the Frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL displayed by Vite, usually:

`http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Retrieve all tasks |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Learning Outcomes

Through this project, I gained practical experience with:

- Building a React frontend.
- Developing REST APIs using Express.js.
- Connecting frontend and backend applications.
- Performing CRUD operations.
- Handling asynchronous API requests.
- Managing application state using React Hooks.
- Implementing persistent data storage.
- Using Git and GitHub for version control.

## Future Improvements

- User authentication and authorization.
- Database integration using MongoDB.
- Due dates and deadline reminders.
- Improved task analytics.
- User-specific task management.

## Author

**Rushdakhilji**

GitHub: [Rushdakhilji](https://github.com/Rushdakhilji)

---

*TaskFlow – Organize your work. Track your progress. Stay productive.*