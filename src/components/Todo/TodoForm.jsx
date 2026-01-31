import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { PRIORITY_LEVELS, PRIORITY_COLORS } from '../../utils/constants';

const TodoForm = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState(PRIORITY_LEVELS.MEDIUM);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (taskText.trim()) {
      onAddTask(taskText.trim(), priority);
      setTaskText('');
      setPriority(PRIORITY_LEVELS.MEDIUM);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="What needs to be done?"
          className="input-field flex-1"
          required
        />
        
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="input-field w-32"
        >
          <option value={PRIORITY_LEVELS.LOW}>Low Priority</option>
          <option value={PRIORITY_LEVELS.MEDIUM}>Medium Priority</option>
          <option value={PRIORITY_LEVELS.HIGH}>High Priority</option>
        </select>
        
        <button
          type="submit"
          className="btn-primary flex items-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>
      
      <div className="flex gap-4 mt-3 text-sm">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-600">Low</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-gray-600">Medium</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-gray-600">High</span>
        </div>
      </div>
    </form>
  );
};

export default TodoForm;