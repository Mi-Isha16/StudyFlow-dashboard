import React, { useState } from 'react';
import { 
  Play, 
  Square, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  Calendar as CalendarIcon,
  TrendingUp,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
    className={cn("bg-white dark:bg-slate-900/60 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800 transition-all duration-300", className)}
  >
    {children}
  </motion.div>
);

const ProgressBar = ({ progress, color = "bg-primary", className }: { progress: number; color?: string; className?: string }) => (
  <div className={cn("w-full h-2 bg-slate-100 dark:bg-indigo-950 rounded-full overflow-hidden", className)}>
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 1.5, ease: "circOut" }}
      className={cn("h-full rounded-full", color)}
    />
  </div>
);

export default function Schedule({ 
  isDarkMode, 
  toggleDarkMode,
  isTimerRunning,
  timerSeconds,
  currentSession,
  toggleTimer,
  formatTime
}: any) {
  const [selectedDay, setSelectedDay] = useState(4);

  const days = [
    { id: 1, label: 'S', date: '01' },
    { id: 2, label: 'M', date: '02' },
    { id: 3, label: 'Tu', date: '03' },
    { id: 4, label: 'W', date: '04', active: true },
    { id: 5, label: 'Th', date: '05' },
    { id: 6, label: 'F', date: '06' },
    { id: 7, label: 'S', date: '07' },
  ];

  const calendarDays = Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    status: i % 3 === 0 ? 'completed' : i % 5 === 0 ? 'pending' : 'none'
  }));

  return (
    <main className="flex-1 p-4 md:p-8 bg-transparent min-h-screen relative transition-colors duration-300">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-brand-gradient tracking-tight">Study Schedule</h2>
          <p className="text-slate-500 dark:text-white/60 font-medium">Plan your learning journey</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <AnimatePresence>
            {isTimerRunning && currentSession && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-4 bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl shadow-sm border border-pink-100 dark:border-slate-800"
              >
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Studying</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{currentSession.subject}</span>
                </div>
                <div className="h-8 w-px bg-slate-100 dark:bg-slate-800" />
                <div className="text-xl font-mono font-bold text-primary">
                  {formatTime(timerSeconds)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            onClick={toggleTimer}
            className={cn(
              "px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95",
              isTimerRunning 
                ? "bg-red-500 text-white shadow-red-500/20" 
                : "bg-brand-gradient text-white shadow-primary/20 hover:scale-105"
            )}
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              {isTimerRunning ? <Square size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
            </div>
            {isTimerRunning ? "Stop Study" : "Start Study"}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Today's Plan */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Today's Plan</h3>
            <span className="text-sm text-slate-500 font-bold">Date: 13/02/26</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-900/20">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                  <CheckCircle2 size={16} />
                </div>
                <span className="font-bold text-slate-800 dark:text-green-400">Math – Interests</span>
              </div>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-bold rounded-full uppercase">Completed</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-pink-50 dark:bg-pink-900/10 rounded-2xl border border-pink-100 dark:border-pink-900/20">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-white">
                  <Play size={14} fill="currentColor" />
                </div>
                <span className="font-bold text-slate-800 dark:text-pink-400">Physics – Thermodynamics</span>
              </div>
              <button className="px-4 py-1.5 bg-pink-500 text-white text-[10px] font-bold rounded-full uppercase hover:scale-105 transition-transform">Start</button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500">
                  <Clock size={14} />
                </div>
                <span className="font-bold text-slate-500 dark:text-slate-400">Chemistry – Organic</span>
              </div>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-[10px] font-bold rounded-full uppercase">Upcoming</span>
            </div>
          </div>
        </Card>

        {/* Exam Readiness */}
        <Card>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Exam Readiness</h3>
          <div className="relative mb-8">
            <ProgressBar progress={41.6} color="bg-brand-gradient" className="h-4" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">41.6%</span>
            </div>
          </div>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500 font-medium">Current Stage:</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">64th Day</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500 font-medium">Exam Deadline:</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">228 Days</span>
            </div>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl border border-yellow-100 dark:border-yellow-900/20 flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-yellow-800 dark:text-yellow-500">Buffer Days:</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-yellow-800 dark:text-yellow-500">6 days behind</span>
              <AlertTriangle size={16} className="text-yellow-500" />
            </div>
          </div>
          <div className="p-3 bg-pink-50 dark:bg-pink-900/10 rounded-xl text-center">
            <p className="text-[10px] text-pink-600 dark:text-pink-400 font-medium">You need to catch up to stay on track for your exam</p>
          </div>
        </Card>
      </div>

      {/* Weekly Schedule */}
      <Card className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-8">Weekly Schedule</h3>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Calendar Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
              <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
                <ChevronLeft size={16} />
              </button>
              <div className="flex-1 flex gap-2">
                <select className="flex-1 bg-transparent text-xs font-bold focus:outline-none">
                  <option>February</option>
                </select>
                <select className="flex-1 bg-transparent text-xs font-bold focus:outline-none">
                  <option>2026</option>
                </select>
              </div>
              <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar scrollbar-visible">
              {days.map((day) => (
                <button 
                  key={day.id}
                  onClick={() => setSelectedDay(day.id)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-2xl border transition-all",
                    selectedDay === day.id 
                      ? "bg-brand-gradient text-white border-transparent shadow-lg shadow-primary/20" 
                      : "bg-white dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary/30"
                  )}
                >
                  <span className="text-sm font-bold">{day.label}</span>
                  <span className="text-lg font-bold">{day.date}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Day Details */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-sm font-bold text-slate-500">Day: 55</span>
              <span className="text-sm font-bold text-slate-500">Date: 04 / 02 / 2026</span>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Topics Planned:</h4>
              <div className="space-y-3">
                {[
                  { subject: 'English', topic: 'Prepositions', sessions: '1 session', color: 'bg-blue-500' },
                  { subject: 'Maths', topic: 'Algebra', sessions: '2 sessions', color: 'bg-red-500' },
                  { subject: 'Physics', topic: 'Dispersion', sessions: '2 sessions', color: 'bg-purple-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-2 h-2 rounded-full", item.color)} />
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.subject}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">• {item.topic}</span>
                    </div>
                    <span className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded-full uppercase">{item.sessions}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-green-50 dark:bg-green-900/10 rounded-3xl border border-green-100 dark:border-green-900/20">
                <h5 className="text-xs font-bold text-green-700 dark:text-green-400 uppercase mb-4 flex items-center gap-2">
                  <CheckCircle2 size={14} /> Topics Completed:
                </h5>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">English</span>
                    <CheckCircle2 size={16} className="text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Maths</span>
                    <CheckCircle2 size={16} className="text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Physics</span>
                    <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-[8px] font-bold rounded-full">1/2 Done</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-yellow-50 dark:bg-yellow-900/10 rounded-3xl border border-yellow-100 dark:border-yellow-900/20">
                <h5 className="text-xs font-bold text-yellow-700 dark:text-yellow-400 uppercase mb-4">Topics Left:</h5>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Physics • 1 session</span>
                  <div className="w-2 h-2 rounded-full bg-pink-500" />
                </div>
              </div>
            </div>

            <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/20 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500 text-white rounded-2xl">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-blue-400 font-bold uppercase">Time Taken:</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">2 Hours</p>
                </div>
              </div>
              <div className="flex-1 min-w-[200px] space-y-2">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-slate-500 dark:text-blue-400 uppercase">Progress</span>
                  <span className="text-blue-600 dark:text-blue-400">66%</span>
                </div>
                <ProgressBar progress={66} color="bg-blue-500" className="h-3" />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Overview */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Monthly Overview</h3>
            <div className="flex items-center gap-6">
              <button className="text-slate-400 hover:text-primary transition-colors"><ChevronLeft size={20} /></button>
              <span className="text-sm font-bold text-slate-900 dark:text-white">January 2026</span>
              <button className="text-slate-400 hover:text-primary transition-colors"><ChevronRight size={20} /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-8">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-[10px] font-bold text-slate-400 uppercase py-2">{day}</div>
            ))}
            {Array.from({ length: 3 }).map((_, i) => <div key={`empty-${i}`} />)}
            {calendarDays.map((d) => (
              <div 
                key={d.day} 
                className={cn(
                  "aspect-square flex items-center justify-center rounded-xl text-sm font-bold border transition-all cursor-pointer hover:scale-105",
                  d.status === 'completed' ? "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/30 text-green-700 dark:text-green-400" :
                  d.status === 'pending' ? "bg-pink-50 dark:bg-pink-900/20 border-pink-100 dark:border-pink-900/30 text-pink-700 dark:text-pink-400" :
                  "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500"
                )}
              >
                {d.day}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30" />
              <span className="text-[10px] font-bold text-slate-500 uppercase">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-pink-50 dark:bg-pink-900/20 border border-pink-100 dark:border-pink-900/30" />
              <span className="text-[10px] font-bold text-slate-500 uppercase">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800" />
              <span className="text-[10px] font-bold text-slate-500 uppercase">No Task</span>
            </div>
          </div>
        </Card>

        {/* Right Column Stats */}
        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <TrendingUp size={20} className="text-blue-500" />
              <div className="text-right">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Completion Rate</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">62.96%</p>
              </div>
            </div>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-blue-200 dark:bg-blue-800/50" />
              </div>
            </div>
            <div className="p-3 bg-pink-50 dark:bg-pink-900/10 rounded-2xl border border-pink-100 dark:border-pink-900/20 text-center">
              <p className="text-[10px] text-pink-600 dark:text-pink-400 font-bold">Needs Improvement</p>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6">Temporal Consistency</h3>
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">Weekday Completion</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Completed:</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">14/22 Days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 font-medium">Percentage:</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">64%</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">Weekend Completion</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Completed:</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">3/5 Days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 font-medium">Percentage:</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">60%</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl border border-yellow-100 dark:border-yellow-900/20 text-center">
                <p className="text-[10px] text-yellow-600 dark:text-yellow-400 font-bold">Consistency is dropping by 4%</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={toggleDarkMode}
          className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 shadow-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-yellow-400 hover:scale-110 transition-all active:scale-95"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </main>
  );
}
