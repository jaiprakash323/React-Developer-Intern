import { useState, useEffect, useRef, useCallback } from 'react';
import { TIMER_STATUS } from '../utils/constants';
import { safeLocalStorageGet, safeLocalStorageSet } from '../utils/helpers';

export const useTimer = (initialTime = 10000) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [status, setStatus] = useState(TIMER_STATUS.IDLE);
  const [initialTimeValue, setInitialTimeValue] = useState(initialTime);
  
  const intervalRef = useRef(null);
  const lastUpdatedRef = useRef(Date.now());

  // Load saved timer state
  useEffect(() => {
    const savedState = safeLocalStorageGet('timer_state');
    if (savedState) {
      const { remaining, status: savedStatus, lastUpdated } = savedState;
      
      if (savedStatus === TIMER_STATUS.RUNNING) {
        const elapsed = Date.now() - lastUpdated;
        const newTimeLeft = Math.max(0, remaining - elapsed);
        setTimeLeft(newTimeLeft);
        
        if (newTimeLeft > 0) {
          setStatus(TIMER_STATUS.RUNNING);
          startTimer();
        } else {
          setStatus(TIMER_STATUS.COMPLETED);
        }
      } else {
        setTimeLeft(remaining);
        setStatus(savedStatus);
      }
    }
  }, []);

  // Save timer state to localStorage
  useEffect(() => {
    const timerState = {
      remaining: timeLeft,
      status,
      lastUpdated: Date.now()
    };
    safeLocalStorageSet('timer_state', timerState);
  }, [timeLeft, status]);

  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    if (status === TIMER_STATUS.RUNNING || timeLeft <= 0) return;
    
    clearTimerInterval();
    setStatus(TIMER_STATUS.RUNNING);
    lastUpdatedRef.current = Date.now();
    
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        const now = Date.now();
        const elapsed = now - lastUpdatedRef.current;
        lastUpdatedRef.current = now;
        
        const newTime = Math.max(0, prev - elapsed);
        
        if (newTime <= 0) {
          clearTimerInterval();
          setStatus(TIMER_STATUS.COMPLETED);
          return 0;
        }
        
        return newTime;
      });
    }, 10); // Update every 10ms for millisecond precision
  }, [status, timeLeft, clearTimerInterval]);

  const pauseTimer = useCallback(() => {
    if (status !== TIMER_STATUS.RUNNING) return;
    
    clearTimerInterval();
    setStatus(TIMER_STATUS.PAUSED);
  }, [status, clearTimerInterval]);

  const resumeTimer = useCallback(() => {
    if (status !== TIMER_STATUS.PAUSED) return;
    
    startTimer();
  }, [status, startTimer]);

  const resetTimer = useCallback(() => {
    clearTimerInterval();
    setTimeLeft(initialTimeValue);
    setStatus(TIMER_STATUS.IDLE);
  }, [initialTimeValue, clearTimerInterval]);

  const updateInitialTime = useCallback((newTime) => {
    if (status !== TIMER_STATUS.IDLE) return;
    
    const timeInMs = Math.max(0, newTime) * 1000;
    setInitialTimeValue(timeInMs);
    setTimeLeft(timeInMs);
  }, [status]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimerInterval();
  }, [clearTimerInterval]);

  return {
    timeLeft,
    status,
    initialTimeValue,
    isRunning: status === TIMER_STATUS.RUNNING,
    isPaused: status === TIMER_STATUS.PAUSED,
    isCompleted: status === TIMER_STATUS.COMPLETED,
    isIdle: status === TIMER_STATUS.IDLE,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    updateInitialTime,
    setTimeLeft,
    setStatus
  };
};