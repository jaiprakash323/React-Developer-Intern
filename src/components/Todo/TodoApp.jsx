import React, { useReducer } from 'react';
import { Plus, Filter } from 'lucide-react';
import { PRIORITY_LEVELS, FILTER_OPTIONS } from '../../utils/constants';
import { usePersistedReducer } from '../../hooks/usePersistedReducer';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import FilterControls from './FilterControls';
import TodoStats from './TodoStats';

// Reducer actions
const ACTIONS = {
  ADD_TASK: 'ADD_TASK',
  TOGGLE_TASK: 'TOGGLE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  SET_FILTER: 'SET_FILTER',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED'
};

// Reducer function
const todoReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, {
          id: Date.now().toString(),
          text: action.payload.text,
          completed: false,
          priority: action.payload.priority || PRIORITY_LEVELS.MEDIUM,
          createdAt: new Date().toISOString()
        }]
      };
    
    case ACTIONS.TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        )
      };
    
    case ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    
    case ACTIONS.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates }
            : task
        )
      };
    
    case ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    
    case ACTIONS.CLEAR_COMPLETED:
      return {
        ...state,
        tasks: state.tasks.filter(task => !task.completed)
      };
    
    default:
      return state;
  }
};

const initialState = {
  tasks: [],
  filter: FILTER_OPTIONS.ALL
};

const TodoApp = () => {
  const [state, dispatch] = usePersistedReducer(todoReducer, initialState, 'todo_state');
  
  const { tasks, filter } = state;
  
  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case FILTER_OPTIONS.ACTIVE:
        return !task.completed;
      case FILTER_OPTIONS.COMPLETED:
        return task.completed;
      default:
        return true;
    }
  });
  
  const addTask = (text, priority) => {
    if (text.trim()) {
      dispatch({ type: ACTIONS.ADD_TASK, payload: { text, priority } });
    }
  };
  
  const toggleTask = (id) => {
    dispatch({ type: ACTIONS.TOGGLE_TASK, payload: id });
  };
  
  const deleteTask = (id) => {
    dispatch({ type: ACTIONS.DELETE_TASK, payload: id });
  };
  
  const updateTask = (id, updates) => {
    dispatch({ type: ACTIONS.UPDATE_TASK, payload: { id, updates } });
  };
  
  const setFilter = (filterType) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: filterType });
  };
  
  const clearCompleted = () => {
    dispatch({ type: ACTIONS.CLEAR_COMPLETED });
  };
  
  return (
    <div className="card max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Filter className="w-8 h-8 text-primary-600" />
          Enhanced Todo App
        </h1>
        <p className="text-gray-600">Manage your tasks with priorities and filters</p>
      </div>
      
      <TodoForm onAddTask={addTask} />
      
      <TodoStats tasks={tasks} />
      
      <FilterControls 
        currentFilter={filter}
        onFilterChange={setFilter}
        onClearCompleted={clearCompleted}
        hasCompletedTasks={tasks.some(task => task.completed)}
      />
      
      {filteredTasks.length > 0 ? (
        <div className="space-y-3 mt-6">
          {filteredTasks.map(task => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {filter === FILTER_OPTIONS.ALL 
              ? "No tasks yet" 
              : filter === FILTER_OPTIONS.ACTIVE
                ? "No active tasks"
                : "No completed tasks"
            }
          </h3>
          <p className="text-gray-600">
            {filter === FILTER_OPTIONS.ALL 
              ? "Add your first task above to get started!"
              : "Try changing your filter or add new tasks"
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default TodoApp;