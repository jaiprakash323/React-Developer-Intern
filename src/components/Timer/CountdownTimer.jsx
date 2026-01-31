import React, { useState } from 'react';
import { Play, Pause, RefreshCw, StopCircle, AlertCircle } from 'lucide-react';
import { useTimer } from '../../hooks/useTimer';
import { formatTime } from '../../utils/helpers';
import { TIMER_STATUS } from '../../utils/constants';

const CountdownTimer = () => {
  const [inputSeconds, setInputSeconds] = useState('10');
  
  const {
    timeLeft,
    status,
    isRunning,
    isPaused,
    isCompleted,
    isIdle,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    updateInitialTime
  } = useTimer(10000); // Default 10 seconds
  
  const handleSetTime = () => {
    const seconds = parseInt(inputSeconds, 10);
    if (!isNaN(seconds) && seconds > 0) {
      updateInitialTime(seconds);
    }
  };
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Only allow positive integers
    if (value === '' || (/^\d+$/.test(value) && parseInt(value, 10) <= 3600)) {
      setInputSeconds(value);
    }
  };
  
  const getStatusColor = () => {
    switch (status) {
      case TIMER_STATUS.RUNNING:
        return 'text-green-600 bg-green-50';
      case TIMER_STATUS.PAUSED:
        return 'text-yellow-600 bg-yellow-50';
      case TIMER_STATUS.COMPLETED:
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };
  
  const getStatusIcon = () => {
    switch (status) {
      case TIMER_STATUS.RUNNING:
        return <Play className="w-5 h-5" />;
      case TIMER_STATUS.PAUSED:
        return <Pause className="w-5 h-5" />;
      case TIMER_STATUS.COMPLETED:
        return <StopCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };
  
  return (
    <div className="card max-w-md mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <AlertCircle className="w-8 h-8 text-primary-600" />
          Advanced Countdown Timer
        </h1>
        <p className="text-gray-600">Precision timer with persistence</p>
      </div>
      
      {/* Timer Configuration */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Timer Configuration</h3>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={inputSeconds}
            onChange={handleInputChange}
            placeholder="Set timer in seconds"
            disabled={isRunning || isPaused}
            className="input-field flex-1 disabled:opacity-50"
          />
          <button
            onClick={handleSetTime}
            disabled={isRunning || isPaused}
            className="btn-primary disabled:opacity-50"
          >
            Set Time
          </button>
        </div>
        
        <p className="mt-2 text-sm text-gray-600">
          {isRunning || isPaused 
            ? "Timer is active. Reset to change time." 
            : "Enter seconds (1-3600) and click Set Time"
          }
        </p>
      </div>
      
      {/* Timer Display */}
      <div className="mb-8 text-center">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-4 ${getStatusColor()}`}>
          {getStatusIcon()}
          <span className="font-medium capitalize">{status}</span>
        </div>
        
        <div className="text-6xl md:text-7xl font-bold text-gray-900 font-mono mb-2">
          {formatTime(timeLeft)}
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div 
            className="bg-primary-600 h-4 rounded-full transition-all duration-300"
            style={{ 
              width: `${Math.max(0, (timeLeft / 10000) * 100)}%`,
              backgroundColor: timeLeft < 4000 ? '#ef4444' : '#3b82f6' // Red when < 4 seconds
            }}
          ></div>
        </div>
        
        <p className="text-sm text-gray-600">
          {isCompleted ? "Time's up!" : "Time remaining"}
        </p>
      </div>
      
      {/* Timer Controls */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {isIdle && (
            <button
              onClick={startTimer}
              className="btn-primary flex items-center gap-2 px-6"
            >
              <Play className="w-4 h-4" />
              Start
            </button>
          )}
          
          {isRunning && (
            <button
              onClick={pauseTimer}
              className="btn-primary flex items-center gap-2 px-6"
            >
              <Pause className="w-4 h-4" />
              Pause
            </button>
          )}
          
          {isPaused && (
            <button
              onClick={resumeTimer}
              className="btn-primary flex items-center gap-2 px-6"
            >
              <Play className="w-4 h-4" />
              Resume
            </button>
          )}
          
          {(isRunning || isPaused || isCompleted) && (
            <button
              onClick={resetTimer}
              className="btn-secondary flex items-center gap-2 px-6"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          )}
        </div>
      </div>
      
      {/* Timer Status Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Timer Information</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Initial Time:</span>
            <span className="font-medium">{formatTime(10000)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time Remaining:</span>
            <span className="font-medium">{formatTime(timeLeft)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Progress:</span>
            <span className="font-medium">
              {Math.round(100 - (timeLeft / 10000) * 100)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Persistence:</span>
            <span className="font-medium text-green-600">Active</span>
          </div>
        </div>
        
        {isCompleted && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Time's up! Timer completed.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;