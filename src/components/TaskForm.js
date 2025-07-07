// src/components/TaskForm.js
import React, { useState, useEffect } from 'react';

const TaskForm = ({ onAddTask, editingTask, onUpdateTask, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(5);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
      setPriority(editingTask.priority || 5);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      priority: parseInt(priority)
    };

    if (editingTask) {
      onUpdateTask(editingTask.id, taskData);
    } else {
      onAddTask(taskData);
    }

    setTitle('');
    setDescription('');
    setPriority(5);
    setError('');
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setPriority(5);
    setError('');
    onCancelEdit();
  };

  const getPriorityLabel = (priorityValue) => {
    if (priorityValue <= 2) return 'Very High';
    if (priorityValue <= 4) return 'High';
    if (priorityValue <= 6) return 'Medium';
    if (priorityValue <= 8) return 'Low';
    return 'Very Low';
  };

  const getPriorityColor = (priorityValue) => {
    if (priorityValue <= 2) return '#dc2626'; // Red
    if (priorityValue <= 4) return '#ea580c'; // Orange
    if (priorityValue <= 6) return '#d97706'; // Amber
    if (priorityValue <= 8) return '#65a30d'; // Lime
    return '#16a34a'; // Green
  };

  return (
    <div className="task-form-container">
      <h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
      
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError('');
            }}
            placeholder="Enter task title"
            className={error ? 'error' : ''}
            maxLength={100}
          />
          {error && <span className="error-message">{error}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (optional)"
            rows={3}
            maxLength={500}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <input
            id="priority"
            type="number"
            min="1"
            max="10"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            placeholder="Enter priority (1-10)"
            className="priority-input"
          />
          <div className="priority-help">
            <small>1 = Most Important, 10 = Least Important</small>
            <span 
              className="priority-preview"
              style={{ color: getPriorityColor(priority) }}
            >
              Current: {getPriorityLabel(priority)}
            </span>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
          {editingTask && (
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;