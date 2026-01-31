import React from 'react';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';

const TodoStats = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-700 font-medium">Total Tasks</p>
            <p className="text-2xl font-bold text-blue-900">{totalTasks}</p>
          </div>
          <AlertCircle className="w-8 h-8 text-blue-600" />
        </div>
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-green-700 font-medium">Completed</p>
            <p className="text-2xl font-bold text-green-900">{completedTasks}</p>
          </div>
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-yellow-700 font-medium">Progress</p>
            <p className="text-2xl font-bold text-yellow-900">{completionPercentage}%</p>
          </div>
          <Circle className="w-8 h-8 text-yellow-600" />
        </div>
        <div className="mt-2 w-full bg-yellow-200 rounded-full h-2">
          <div 
            className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TodoStats;