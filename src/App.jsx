import React, { useState } from 'react';
import { 
  CheckSquare, 
  FileText, 
  BarChart3, 
  Clock, 
  Search,
  Menu,
  X,
  Home,
  Code,
  Palette
} from 'lucide-react';
import TodoApp from './components/Todo/TodoApp';
import UserForm from './components/Forms/UserForm';
import MultiProgressBar from './components/Progress/MultiProgressBar';
import CountdownTimer from './components/Timer/CountdownTimer';
import SearchList from './components/Search/SearchList';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('todo');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const components = [
    { id: 'todo', name: 'Todo App', icon: CheckSquare, component: TodoApp, color: 'bg-green-500' },
    { id: 'form', name: 'User Form', icon: FileText, component: UserForm, color: 'bg-blue-500' },
    { id: 'progress', name: 'Progress Bars', icon: BarChart3, component: MultiProgressBar, color: 'bg-purple-500' },
    { id: 'timer', name: 'Countdown Timer', icon: Clock, component: CountdownTimer, color: 'bg-red-500' },
    { id: 'search', name: 'Live Search', icon: Search, component: SearchList, color: 'bg-yellow-500' },
  ];
  
  const ActiveComponent = components.find(c => c.id === activeComponent)?.component;
  
  const handleNavClick = (componentId) => {
    setActiveComponent(componentId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-lg">
                <Code className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                  React - Frontend
                </h1>
              </div>
            </div>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Navigation */}
          <nav className={`lg:w-64 lg:block ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="card sticky top-28">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Components</h3>
                <p className="text-sm text-gray-600">Interactive demos showcasing React features</p>
              </div>
              
              <ul className="space-y-1.5">
                {components.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                          activeComponent === item.id
                            ? 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 border-l-4 border-primary-600 shadow-sm'
                            : 'text-gray-700 hover:bg-gray-50 hover:shadow-sm'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color} text-white`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <span className="font-medium block">{item.name}</span>
                          <span className="text-xs text-gray-500">
                            {activeComponent === item.id ? 'Active' : 'Click to view'}
                          </span>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Features Demonstrated
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>State Management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>LocalStorage Persistence</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Form Validation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Dynamic UI Updates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Real-time Search</span>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          
          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg">
                  {(() => {
                    const Icon = components.find(c => c.id === activeComponent)?.icon;
                    return Icon ? <Icon className="w-7 h-7 text-white" /> : null;
                  })()}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {components.find(c => c.id === activeComponent)?.name}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Interactive React component demonstration with real-time updates
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-800 font-medium">State Management</p>
                      <p className="text-2xl font-bold text-green-900">useReducer</p>
                    </div>
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <CheckSquare className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-800 font-medium">Data Persistence</p>
                      <p className="text-2xl font-bold text-blue-900">LocalStorage</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-800 font-medium">Real-time UI</p>
                      <p className="text-2xl font-bold text-purple-900">Dynamic</p>
                    </div>
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Active Component */}
            <div className="animate-fadeIn">
              {ActiveComponent && <ActiveComponent />}
            </div>
            
            {/* Footer */}
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-primary-600">5</p>
                    <p className="text-sm text-gray-600">Components</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">100%</p>
                    <p className="text-sm text-gray-600">Interactive</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">PWA</p>
                    <p className="text-sm text-gray-600">Ready</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">ES6+</p>
                    <p className="text-sm text-gray-600">Modern JS</p>
                  </div>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;