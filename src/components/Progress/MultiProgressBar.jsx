import React, { useState, useEffect } from 'react';
import { Target, Plus, Trash2 } from 'lucide-react';
import { getProgressColor } from '../../utils/helpers';

const MultiProgressBar = () => {
  const [inputs, setInputs] = useState([0, 0, 0]);
  const [averageProgress, setAverageProgress] = useState(0);
  const [sumProgress, setSumProgress] = useState(0);
  
  // Calculate average and sum whenever inputs change
  useEffect(() => {
    const validInputs = inputs.filter(value => !isNaN(value));
    const sum = validInputs.reduce((acc, val) => acc + Number(val), 0);
    const avg = validInputs.length > 0 ? sum / validInputs.length : 0;
    
    setSumProgress(Math.min(sum, 100 * inputs.length));
    setAverageProgress(Math.min(avg, 100));
  }, [inputs]);
  
  const handleInputChange = (index, value) => {
    let numValue = parseInt(value, 10);
    
    // Handle empty string or invalid input
    if (value === '' || isNaN(numValue)) {
      numValue = 0;
    }
    
    // Clamp value between 0 and 100
    numValue = Math.max(0, Math.min(100, numValue));
    
    const newInputs = [...inputs];
    newInputs[index] = numValue;
    setInputs(newInputs);
  };
  
  const addInput = () => {
    setInputs([...inputs, 0]);
  };
  
  const removeInput = (index) => {
    if (inputs.length > 1) {
      const newInputs = inputs.filter((_, i) => i !== index);
      setInputs(newInputs);
    }
  };
  
  const resetAll = () => {
    setInputs(inputs.map(() => 0));
  };
  
  const fillColorClass = getProgressColor(averageProgress);
  
  return (
    <div className="card max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Target className="w-8 h-8 text-primary-600" />
          Multi-Input Progress Bar
        </h1>
        <p className="text-gray-600">Dynamic progress tracking with multiple inputs</p>
      </div>
      
      {/* Main Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-900">Main Progress Bar</h3>
          <div className="text-2xl font-bold text-primary-600">
            {averageProgress.toFixed(1)}%
          </div>
        </div>
        
        <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${fillColorClass}`}
            style={{ width: `${averageProgress}%` }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold text-white mix-blend-difference">
                {averageProgress.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Average of all inputs</span>
          <span>Total: {sumProgress.toFixed(1)} / {inputs.length * 100}</span>
        </div>
      </div>
      
      {/* Input Controls */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Individual Inputs</h3>
          <div className="flex gap-2">
            <button
              onClick={addInput}
              className="btn-secondary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Input
            </button>
            <button
              onClick={resetAll}
              className="btn-secondary"
            >
              Reset All
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {inputs.map((value, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    Input {index + 1}
                  </label>
                  <span className="text-sm font-medium text-gray-900">{value}%</span>
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="flex-1"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="w-20 input-field"
                  />
                </div>
                
                {/* Sub-bar */}
                <div className="mt-2 relative h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`absolute top-0 left-0 h-full rounded-full transition-all duration-300 ${getProgressColor(value)}`}
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
              </div>
              
              {inputs.length > 1 && (
                <button
                  onClick={() => removeInput(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Remove input"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Statistics */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Statistics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">{inputs.length}</p>
            <p className="text-sm text-gray-600">Total Inputs</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{averageProgress.toFixed(1)}%</p>
            <p className="text-sm text-gray-600">Average Progress</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{sumProgress.toFixed(1)}</p>
            <p className="text-sm text-gray-600">Total Sum</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {inputs.filter(v => v >= 70).length}
            </p>
            <p className="text-sm text-gray-600">High Progress (≥70%)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiProgressBar;