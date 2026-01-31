// Task priorities
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

export const PRIORITY_COLORS = {
  [PRIORITY_LEVELS.LOW]: 'bg-green-100 text-green-800',
  [PRIORITY_LEVELS.MEDIUM]: 'bg-yellow-100 text-yellow-800',
  [PRIORITY_LEVELS.HIGH]: 'bg-red-100 text-red-800'
};

// Task filter options
export const FILTER_OPTIONS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};

// Sample names for search component
export const SAMPLE_NAMES = [
  "John Smith",
  "Jane Doe",
  "Robert Johnson",
  "Emily Davis",
  "Michael Brown",
  "Sarah Wilson",
  "David Taylor",
  "Jennifer Anderson",
  "William Martinez",
  "Jessica Thomas",
  "James Jackson",
  "Amanda White",
  "Christopher Harris",
  "Michelle Clark",
  "Daniel Lewis",
  "Ashley Robinson",
  "Matthew Walker",
  "Elizabeth Allen",
  "Joshua King",
  "Samantha Wright"
];

// Timer status
export const TIMER_STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  PAUSED: 'paused',
  COMPLETED: 'completed'
};