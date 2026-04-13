import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Progress from './components/Progress';
import Schedule from './components/Schedule';
import { X, Play, Square, Menu, LayoutDashboard, TrendingUp, Calendar, Trophy, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Study Modal Component ---
const StudyModal = ({ isOpen, onClose, onStart }: { isOpen: boolean; onClose: () => void; onStart: (subject: string, topics: string) => void }) => {
  const [subject, setSubject] = useState('');
  const [topics, setTopics] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 rounded-3xl p-8 w-full max-w-md shadow-2xl border border-slate-100 dark:border-slate-800"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Start Study Session</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:text-white/40 dark:hover:text-white/60 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-white/70">What subject are you studying?</label>
            <input 
              type="text" 
              placeholder="e.g. Mathematics"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 dark:text-white font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-white/70">Which topics will you cover?</label>
            <textarea 
              placeholder="e.g. Calculus, Integration"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              rows={3}
              className="w-full px-4 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 dark:text-white font-medium resize-none"
            />
          </div>
          
          <button 
            onClick={() => {
              if (subject && topics) {
                onStart(subject, topics);
                setSubject('');
                setTopics('');
              }
            }}
            disabled={!subject || !topics}
            className="w-full py-4 bg-brand-gradient text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
          >
            Start Session Now
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Study Session State
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState<{ subject: string, topics: string } | null>(null);
  const [todayHours, setTodayHours] = useState(1.0);
  const [totalHours, setTotalHours] = useState(27.5);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startSession = (subject: string, topics: string) => {
    setCurrentSession({ subject, topics });
    setIsModalOpen(false);
    setIsTimerRunning(true);
    timerRef.current = setInterval(() => {
      setTimerSeconds(prev => prev + 1);
    }, 1000);
  };

  const toggleTimer = () => {
    if (isTimerRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      const addedHours = timerSeconds / 3600;
      setTodayHours(prev => prev + addedHours);
      setTotalHours(prev => prev + addedHours);
      setTimerSeconds(0);
      setIsTimerRunning(false);
      setCurrentSession(null);
    } else {
      setIsModalOpen(true);
    }
  };

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // CRITICAL: This effect pushes the 'dark' class to the very top of your site
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const sharedProps = {
    isDarkMode,
    toggleDarkMode,
    isTimerRunning,
    timerSeconds,
    currentSession,
    toggleTimer,
    formatTime,
    todayHours,
    totalHours,
    setTodayHours,
    setTotalHours,
    setIsModalOpen
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)] text-[var(--color-text-main)] transition-colors duration-300">
      <div className="flex min-h-screen">
        <Sidebar activePage={currentPage} onNavigate={setCurrentPage} />
        
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50">
            <h1 className="text-xl font-bold text-brand-gradient">StudyFlow</h1>
            <button 
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-white"
            >
              {isMobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {currentPage === 'Dashboard' ? (
            <Dashboard {...sharedProps} onNavigate={setCurrentPage} />
          ) : currentPage === 'Progress' ? (
            <Progress {...sharedProps} />
          ) : currentPage === 'Schedule' ? (
            <Schedule {...sharedProps} />
          ) : (
            <div className="flex-1 p-8 flex items-center justify-center text-slate-400">
              {currentPage} Page Coming Soon
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-950 z-[70] md:hidden shadow-2xl border-r border-slate-100 dark:border-slate-800"
            >
              <div className="p-8 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-brand-gradient tracking-tight">StudyFlow</h1>
                <button onClick={() => setIsMobileSidebarOpen(false)} className="text-slate-400">
                  <X size={24} />
                </button>
              </div>
              
              <nav className="px-4 space-y-2">
                {[
                  { icon: LayoutDashboard, label: 'Dashboard' },
                  { icon: TrendingUp, label: 'Progress' },
                  { icon: Calendar, label: 'Schedule' },
                  { icon: Trophy, label: 'Trophies' },
                  { icon: Settings, label: 'Settings' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setCurrentPage(item.label);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
                      currentPage === item.label 
                        ? "bg-primary/10 dark:bg-primary/20 text-primary font-bold" 
                        : "text-slate-900 dark:text-white/70 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={20} className={cn(currentPage === item.label ? "text-primary" : "text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors")} />
                      <span className="font-bold">{item.label}</span>
                    </div>
                  </button>
                ))}
              </nav>

              <div className="p-4 mt-auto border-t border-slate-100 dark:border-slate-800 absolute bottom-0 w-full">
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 flex items-center gap-3 border border-slate-200 dark:border-slate-800 mb-4">
                  <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-indigo-700 overflow-hidden border border-pink-200 dark:border-indigo-600">
                    <img 
                      src="https://picsum.photos/seed/student/100/100" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">Profile:</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">Isha.S</span>
                  </div>
                </div>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors">
                  <LogOut size={20} />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <StudyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onStart={startSession} 
      />
    </div>
  );
}



