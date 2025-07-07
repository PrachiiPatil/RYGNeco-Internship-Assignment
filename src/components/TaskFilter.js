// src/components/TaskFilter.js
import React from 'react';

const TaskFilter = ({ currentFilter, onFilterChange, taskCounts, searchTerm, onSearchChange }) => {
  const getFilterIcon = (filterKey) => {
    switch (filterKey) {
      case 'all':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14,2 14,8 20,8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10,9 9,9 8,9"></polyline>
          </svg>
        );
      case 'pending':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12,6 12,12 16,14"></polyline>
          </svg>
        );
      case 'completed':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 11l3 3 8-8"></path>
            <path d="M21 12c0 4.97-4.03 9-9 9-4.97 0-9-4.03-9-9 0-4.97 4.03-9 9-9 1.67 0 3.22.46 4.56 1.26"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  const filters = [
    { key: 'all', label: 'All', count: taskCounts.all },
    { key: 'pending', label: 'Pending', count: taskCounts.pending },
    { key: 'completed', label: 'Completed', count: taskCounts.completed }
  ];

  const clearSearch = () => {
    onSearchChange('');
  };

  return (
    <div className="task-filter-container">
      <div className="filter-row">
        <div className="filter-buttons">
          {filters.map(filter => (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`filter-btn ${currentFilter === filter.key ? 'active' : ''}`}
            >
              <span className="filter-icon">
                {getFilterIcon(filter.key)}
              </span>
              <span className="filter-label">{filter.label}</span>
              <span className="filter-count">({filter.count})</span>
            </button>
          ))}
        </div>
        
        <div className="search-container">
          <div className="search-input-wrapper">
            <svg 
              className="search-icon" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button 
                onClick={clearSearch}
                className="search-clear-btn"
                title="Clear search"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>      
    </div>
  );
};

export default TaskFilter;