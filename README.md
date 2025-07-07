# Personal Task Tracker

## Description
A modern, responsive personal task management application built with React. This application allows users to create, edit, delete, and organize their daily tasks with a clean and intuitive interface. Features include task filtering, completion tracking, and persistent data storage.

## Features
- **Simple Authentication**: Username-based login system
- **Task Management**: Create, edit, delete, and toggle task completion
- **Task Filtering**: Filter tasks by All, Completed, or Pending status
- **Data Persistence**: Tasks are saved to localStorage and persist across sessions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Task counts update dynamically as you interact with tasks
- **Clean UI**: Modern, card-based interface with smooth animations
- **Accessibility**: Keyboard navigation and screen reader friendly

## 🛠 Setup Instructions
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/task-tracker.git
   cd task-tracker
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used
- **React.js** - Frontend framework
- **React Hooks** - State management (useState, useEffect)
- **CSS3** - Styling with modern features (Grid, Flexbox, Animations)
- **LocalStorage API** - Data persistence
- **ES6+** - Modern JavaScript features

## Project Structure
```
task-tracker/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login.js          # Authentication component
│   │   ├── TaskForm.js       # Task creation/editing form
│   │   ├── TaskItem.js       # Individual task display
│   │   ├── TaskList.js       # Task collection display
│   │   └── TaskFilter.js     # Task filtering controls
│   ├── utils/
│   │   └── localStorage.js   # Local storage utility functions
│   ├── styles/
│   │   └── App.css          # Main stylesheet
│   ├── App.js               # Main application component
│   └── index.js             # Application entry point
├── README.md
└── package.json
```

## Live Demo
[Insert your deployed application URL here]

## Screenshots
[Add screenshots of your application here]

## Usage
1. **Login**: Enter any username to access the application
2. **Add Tasks**: Use the form at the top to create new tasks with title and optional description
3. **Manage Tasks**: 
   - Click the checkbox to mark tasks as complete/incomplete
   - Use the edit button (✏️) to modify existing tasks
   - Use the delete button (🗑️) to remove tasks
4. **Filter Tasks**: Use the filter buttons to view All, Pending, or Completed tasks
5. **Logout**: Click the logout button to clear your session

## Key Features Implemented
- Simple login with username storage
- Task CRUD operations (Create, Read, Update, Delete)
- Task completion toggle
- Task filtering by status
- LocalStorage data persistence
- Responsive design for all screen sizes
- Form validation and error handling
- Confirmation dialogs for destructive actions
- Task creation timestamps
- Empty state handling
- Accessible UI with proper focus management

## Technical Implementation
- **Component Architecture**: Modular components with clear separation of concerns
- **State Management**: React hooks for local state, localStorage for persistence
- **Responsive Design**: CSS Grid and Flexbox for adaptive layouts
- **Error Handling**: Form validation and graceful error states
- **Performance**: Efficient re-renders with proper key usage and state updates

## Future Enhancements
- Task search functionality
- Task categories/tags
- Due dates and reminders
- Priority levels
- Dark mode toggle
- Task export/import
- Multiple user support
- Task sharing capabilities

## License
This project is created for educational purposes as part of an internship assignment.

## Contributing
This is an assignment project, but feedback and suggestions are welcome!

## Contact
[Your Name] - [Your Email]
Project Link: [https://github.com/yourusername/task-tracker](https://github.com/yourusername/task-tracker)