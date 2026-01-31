import React, { useState } from 'react';
import { Check, Trash2, Edit2, Save, X } from 'lucide-react';
import { PRIORITY_COLORS } from '../../utils/constants';

const TodoItem = ({ task, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editPriority, setEditPriority] = useState(task.priority);
  
  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(task.id, { text: editText.trim(), priority: editPriority });
      setIsEditing(false);
    }
  };
  
  const handleCancel = () => {
    setEditText(task.text);
    setEditPriority(task.priority);
    setIsEditing(false);
  };
  
  const priorityColorClass = PRIORITY_COLORS[task.priority] || 'bg-gray-100 text-gray-800';
  
  return (
    <div className={`flex items-center gap-3 p-4 border rounded-lg transition-all hover:shadow-sm ${
      task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
    }`}>
      <button
        onClick={() => onToggle(task.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          task.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 hover:border-primary-500'
        }`}
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {task.completed && <Check className="w-4 h-4 text-white" />}
      </button>
      
      {isEditing ? (
        <>
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="input-field flex-1"
              autoFocus
            />
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              className="input-field w-32"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              aria-label="Save changes"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Cancel editing"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <p className={`text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {task.text}
              </p>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${priorityColorClass}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
            </div>
            {task.createdAt && (
              <p className="text-sm text-gray-500 mt-1">
                Added {new Date(task.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              aria-label="Edit task"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Delete task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;