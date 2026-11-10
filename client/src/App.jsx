
import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Plus,
  Search,
  Trash2,
  CheckCircle2,
  Clock3,
  ListTodo,
  Circle,
  Bell,
  CalendarDays,
  Sparkles,
  TrendingUp,
  ClipboardList,
  Target,
} from 'lucide-react';

import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch tasks from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/tasks')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        return response.json();
      })
      .then((data) => setTasks(data))
      .catch((error) => console.error(error));
  }, []);

  // Add a new task
  const addTask = async (event) => {
    event.preventDefault();

    if (!title.trim()) return;

    try {
      const response = await fetch(
        'http://localhost:5000/api/tasks',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title.trim(),
            description: description.trim(),
            priority,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Could not create task');
      }

      const newTask = await response.json();

      setTasks((previousTasks) => [
        ...previousTasks,
        newTask,
      ]);

      setTitle('');
      setDescription('');
      setPriority('Medium');
    } catch (error) {
      console.error(error);
      alert('Could not create task. Please try again.');
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Could not delete task');
      }

      setTasks((previousTasks) =>
        previousTasks.filter((task) => task.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert('Could not delete task.');
    }
  };

  // Update task status
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Could not update task');
      }

      const updatedTask = await response.json();

      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error(error);
      alert('Could not update task.');
    }
  };

  // Dashboard statistics
  const completed = tasks.filter(
    (task) => task.status === 'Completed'
  ).length;

  const inProgress = tasks.filter(
    (task) => task.status === 'In Progress'
  ).length;

  const pending = tasks.filter(
    (task) => task.status === 'To Do'
  ).length;

  const completionRate =
    tasks.length === 0
      ? 0
      : Math.round((completed / tasks.length) * 100);

  // Search and filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === 'All' || task.status === filter;

    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="app">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="sidebar-brand">
          <div className="brand-icon">
            <CheckCircle2 size={23} />
          </div>
          <h2 className="logo">
            Task<span>Flow</span>
          </h2>
        </div>

        <div className="sidebar-label">WORKSPACE</div>

        <nav className="sidebar-nav">
          <div className="nav-item active">
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </div>

          <div className="nav-item">
            <ListTodo size={19} />
            <span>My Tasks</span>
            <span className="nav-count">{tasks.length}</span>
          </div>

          <div className="nav-item">
            <CalendarDays size={19} />
            <span>Overview</span>
          </div>
        </nav>

        <div className="sidebar-label sidebar-label-bottom">
          YOUR PRODUCTIVITY
        </div>

        <div className="sidebar-tip">
          <div className="tip-icon">
            <Sparkles size={19} />
          </div>
          <h3>Stay focused!</h3>
          <p>Small progress every day leads to big results.</p>
        </div>

        <div className="sidebar-bottom">
          <div className="profile-avatar">R</div>
          <div className="profile-details">
            <strong>My Workspace</strong>
            <span>Personal account</span>
          </div>
        </div>

      </aside>

      {/* Main Dashboard */}
      <main className="main-content">

        {/* Topbar */}
        <header className="topbar">

          <div className="topbar-heading">
            <p className="welcome">MONDAY WORKSPACE</p>
            <h1>Dashboard</h1>
          </div>

          <div className="topbar-actions">

            <div className="global-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search anything..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-shortcut">⌕</span>
            </div>

            <button
              type="button"
              className="notification-btn"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell size={19} />
              <span className="notification-dot"></span>
            </button>

            <div className="topbar-profile">R</div>

          </div>
        </header>

        {/* Welcome Banner */}
        <section className="intro">

          <div className="intro-content">
            <span className="intro-tag">
              <Sparkles size={14} /> YOUR PRODUCTIVITY SPACE
            </span>

            <h2>Make today count!</h2>

            <p>
              Stay organized, focus on what matters,
              and make progress one task at a time.
            </p>

            <div className="intro-progress">
              <div>
                <span>Overall completion</span>
                <strong>{completionRate}%</strong>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="intro-decoration">
            <div className="decoration-circle circle-one"></div>
            <div className="decoration-circle circle-two"></div>
            <div className="decoration-icon">
              <Target size={65} strokeWidth={1.2} />
            </div>
          </div>

        </section>

        {/* Statistics */}
        <section className="stats">

          <div className="stat-card">
            <div className="stat-top">
              <div className="stat-icon purple">
                <ClipboardList />
              </div>
              <span className="stat-label">ALL TASKS</span>
            </div>
            <h2>{tasks.length}</h2>
            <p>Total tasks in your workspace</p>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <div className="stat-icon orange">
                <Clock3 />
              </div>
              <span className="stat-label">IN PROGRESS</span>
            </div>
            <h2>{inProgress}</h2>
            <p>Tasks currently being worked on</p>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <div className="stat-icon green">
                <CheckCircle2 />
              </div>
              <span className="stat-label">COMPLETED</span>
            </div>
            <h2>{completed}</h2>
            <p>Tasks successfully completed</p>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <div className="stat-icon blue">
                <Circle />
              </div>
              <span className="stat-label">TO DO</span>
            </div>
            <h2>{pending}</h2>
            <p>Tasks waiting to be started</p>
          </div>

        </section>

        {/* Main Content Grid */}
        <section className="content-grid">

          {/* Task Management */}
          <div className="tasks-section">

            <div className="section-heading">
              <div>
                <span className="section-eyebrow">
                  TASK MANAGEMENT
                </span>
                <h2>My Tasks</h2>
                <p>Keep track of everything that matters.</p>
              </div>

              <div className="task-count">
                {tasks.length} tasks
              </div>
            </div>

            {/* Task Filters */}
            <div className="filters">
              {['All', 'To Do', 'In Progress', 'Completed'].map(
                (item) => (
                  <button
                    key={item}
                    className={
                      filter === item
                        ? 'filter active-filter'
                        : 'filter'
                    }
                    onClick={() => setFilter(item)}
                  >
                    {item}
                    {item === 'All' && (
                      <span>{tasks.length}</span>
                    )}
                  </button>
                )
              )}
            </div>

            {/* Task List */}
            <div className="task-list">

              {filteredTasks.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">
                    <ListTodo size={28} />
                  </div>
                  <h3>No tasks found</h3>
                  <p>
                    Try another search or create a new task.
                  </p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <div className="task-card" key={task.id}>

                    <div className="task-indicator"></div>

                    <div className="task-info">
                      <h3>{task.title}</h3>

                      <p>
                        {task.description ||
                          'No description added'}
                      </p>

                      <div className="task-tags">
                        <span
                          className={`priority ${task.priority.toLowerCase()}`}
                        >
                          {task.priority} Priority
                        </span>

                        <span
                          className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}
                        >
                          {task.status}
                        </span>
                      </div>
                    </div>

                    <div className="task-actions">

                      <select
                        value={task.status}
                        onChange={(e) =>
                          updateStatus(task.id, e.target.value)
                        }
                        aria-label={`Status for ${task.title}`}
                      >
                        <option>To Do</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                      </select>

                      <button
                        className="delete-btn"
                        onClick={() => deleteTask(task.id)}
                        aria-label={`Delete ${task.title}`}
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>
                  </div>
                ))
              )}

            </div>
          </div>

          {/* Add Task Panel */}
          <div className="add-section">

            <div className="add-heading-icon">
              <Plus size={21} />
            </div>

            <span className="section-eyebrow">
              QUICK ACTION
            </span>

            <h2>Create a task</h2>

            <p className="add-description">
              Add a new task to your workspace and keep moving forward.
            </p>

            <form onSubmit={addTask}>

              <label htmlFor="task-title">Task Title</label>

              <input
                id="task-title"
                type="text"
                placeholder="e.g. Complete project report"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <label htmlFor="task-description">Description</label>

              <textarea
                id="task-description"
                placeholder="Add some details about your task..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
              />

              <label htmlFor="task-priority">Priority Level</label>

              <select
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <button type="submit" className="add-btn">
                <Plus size={18} />
                Create Task
              </button>

            </form>

            <div className="form-note">
              <Sparkles size={15} />
              <span>Stay consistent. One task at a time.</span>
            </div>

          </div>

        </section>

        <footer className="dashboard-footer">
          <span>TaskFlow</span>
          <span>Organize your work. Simplify your day.</span>
        </footer>

      </main>
    </div>
  );
}

export default App;
