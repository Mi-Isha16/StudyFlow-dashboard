import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Flame, 
  ChevronDown, 
  AlertCircle, 
  Star, 
  BarChart2, 
  Timer, 
  Target,
  TrendingUp,
  Trophy,
  Square,
  CheckSquare,
  Menu,
  X,
  LayoutDashboard,
  Calendar,
  Settings,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

// --- Context/State Helpers ---
// In a real app, we'd use a Context Provider, but for this mini version 
// we'll lift state to the Dashboard or use a simple store.

// --- Sub-components ---

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
    className={cn("	bg-[var(--color-card-bg)] dark:bg-slate-900/60 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border 			border-[var(--color-card-border)] dark:border-slate-800 transition-all duration-300", className)}
  >
    {children}
  </motion.div>
);

const ProgressBar = ({ progress, color = "bg-primary", className }: { progress: number; color?: string; className?: string }) => (
  <div className={cn("w-full h-2 			bg-[var(--color-sidebar)] dark:bg-indigo-950 rounded-full overflow-hidden", className)}>
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 1.5, ease: "circOut" }}
      className={cn("h-full rounded-full", color)}
    />
  </div>
);

// --- Main Components ---

const DailyGoal = ({ onStart, isRunning, currentSession }: { onStart: () => void; isRunning: boolean; currentSession?: { subject: string, topics: string } }) => (
  <Card className="flex flex-col gap-4">
    <h3 className="text-lg font-bold 	text-[var(--color-text-main)] dark:text-white">Daily Goal</h3>
    <div className="space-y-3">
      <div className="flex items-center justify-between p-4 	bg-[var(--color-card-bg)] dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-900/30">
        <div>
          <p className="font-bold 	text-[var(--color-text-main)] dark:text-green-300">Math – 2 sessions</p>
          <p className="text-xs text-slate-500 dark:text-green-500/70 font-bold">Interests</p>
        </div>
        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white">
          <svg size="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
      </div>
      <div className="flex items-center justify-between p-4 	bg-[var(--color-card-bg)] dark:bg-pink-900/20 rounded-2xl border border-pink-200 dark:border-pink-900/30">
        <div>
          <p className="font-bold 	text-[var(--color-text-main)] dark:text-pink-300">Next: Physics</p>
          <p className="text-xs text-slate-500 dark:text-pink-500/70 font-bold">Thermodynamics</p>
        </div>
        <span className="text-primary font-bold">30 min</span>
      </div>
    </div>
    <button 
      onClick={onStart}
      className={cn(
        "w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all mt-2",
        isRunning ? "bg-red-500 text-white" : "bg-brand-gradient text-white hover:opacity-90"
      )}
    >
      {isRunning ? <Square size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
      {isRunning ? "Stop Session" : "Start Session"}
    </button>
  </Card>
);

const StudyStreak = () => (
  <Card className="flex flex-col gap-6">
    <h3 className="text-lg font-bold 	text-[var(--color-text-main)] dark:text-white">Study Streak</h3>
    <div className="	bg-[var(--color-card-bg)] dark:bg-orange-900/20 rounded-2xl p-4 flex items-center gap-4 border border-orange-200 dark:border-orange-900/30">
      <div className="p-3 bg-orange-50 dark:bg-orange-900/40 rounded-xl text-orange-600 dark:text-orange-400">
        <Flame size={24} fill="currentColor" />
      </div>
      <div>
        <p className="text-xs text-slate-500 dark:text-orange-500/70 font-bold">Current Streak:</p>
        <p className="text-xl font-bold text-orange-600 dark:text-orange-400">07 Days</p>
      </div>
    </div>
    <div className="	bg-[var(--color-card-bg)] dark:bg-cyan-900/20 rounded-2xl p-4 flex flex-col gap-1 border border-cyan-200 dark:border-cyan-900/30">
      <p className="text-xs text-slate-500 dark:text-cyan-500/70 font-bold">Best Streak:</p>
      <p className="text-xl font-bold text-cyan-600 dark:text-cyan-400">15 Days</p>
    </div>
  </Card>
);

const StudyTime = ({ todayHours, onOpenModal }: { todayHours: number; onOpenModal: () => void }) => {
  const plannedHours = 3;
  const progress = Math.min((todayHours / plannedHours) * 100, 100);
  
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold 	text-[var(--color-text-main)] dark:text-white">Study Time</h3>
        <button 
          onClick={onOpenModal}
          className="flex items-center gap-1 px-3 py-1 	bg-[var(--color-card-bg)] dark:bg-slate-800 rounded-lg text-sm font-bold 	text-[var(--color-text-main)] dark:text-white/70 border 			border-[var(--color-card-border)] dark:border-slate-700"
        >
          Daily <ChevronDown size={14} />
        </button>
      </div>
      <div className="space-y-4 py-2">
        <div className="flex justify-between items-end">
          <span className="text-sm text-slate-500 dark:text-white/60 font-bold">Planned time:</span>
          <span className="text-lg font-bold 	text-[var(--color-text-main)] dark:text-white">{plannedHours} hrs</span>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-sm text-slate-500 dark:text-white/60 font-bold">Today :</span>
          <motion.span 
            key={todayHours}
            initial={{ scale: 1.2, color: '#ec4899' }}
            animate={{ scale: 1, color: '#ec4899' }}
            className="text-lg font-bold"
          >
            {todayHours.toFixed(1)} hr
          </motion.span>
        </div>
      </div>
      <div className="mt-2">
        <ProgressBar progress={progress} color="bg-gradient-to-r from-pink-500 to-primary" className="h-4" />
        <p className="text-[10px] text-center mt-2 text-slate-500 dark:text-white/50 font-bold">{Math.round(progress)}% Completed</p>
      </div>
    </Card>
  );
};

const OverallProgress = () => {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(41.6), 500);
    return () => clearTimeout(timer);
  }, []);

  const data = [{ value: animatedValue }, { value: 100 - animatedValue }];
  const COLORS = ['#FF4D8D', '#FEE2E2'];

  const subjects = [
    { name: 'Maths', progress: 45, color: 'bg-pink-500' },
    { name: 'Physics', progress: 30, color: 'bg-pink-400' },
    { name: 'Biology', progress: 50, color: 'bg-pink-600' },
    { name: 'Chemistry', progress: 40, color: 'bg-orange-500' },
  ];

  return (
    <Card className="col-span-1 lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold 	text-[var(--color-text-main)] dark:text-white">Overall Study Progress</h3>
        <button className="px-4 py-1.5 bg-pink-50 dark:bg-pink-900/20 text-primary dark:text-pink-300 text-sm font-bold rounded-full flex items-center gap-1">
          More <span className="text-lg leading-none">›</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative h-48 flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={450}
                animationDuration={1500}
                animationBegin={200}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-2xl font-bold 	text-[var(--color-text-main)] dark:text-white"
            >
              41.6%
            </motion.span>
            <span className="text-[10px] text-slate-500 dark:text-white/50 font-bold uppercase tracking-wider">Overall Progress</span>
          </div>
        </div>

        <div className="space-y-4">
          {subjects.map((sub) => (
            <div key={sub.name} className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="	text-[var(--color-text-main)] dark:text-white/80">{sub.name}</span>
                <span className="text-slate-500 dark:text-white/50">{sub.progress}%</span>
              </div>
              <ProgressBar progress={sub.progress} color={sub.color} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 	bg-[var(--color-card-bg)] dark:bg-pink-900/10 rounded-2xl border border-pink-200 dark:border-pink-900/20">
        <p className="text-xs 	text-[var(--color-text-main)] dark:text-white/70 font-bold">Weekly Progress:</p>
        <p className="text-sm font-bold text-pink-500">-6.6% this week</p>
      </div>
    </Card>
  );
};

const UpcomingTasks = ({ onTaskToggle }: { onTaskToggle: (completed: boolean) => void }) => {
  const [tasks, setTasks] = useState([
    { id: 1, subject: 'Physics', topic: 'Thermodynamics', remaining: '1 session Remaining', color: 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-100 dark:border-cyan-900/30 text-cyan-700 dark:text-cyan-400', completed: false },
    { id: 2, subject: 'Chemistry', topic: 'Organic', remaining: '1 session', color: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/30 text-green-700 dark:text-green-400', completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const newState = !task.completed;
        onTaskToggle(newState);
        return { ...task, completed: newState };
      }
      return task;
    }));
  };

  return (
    <Card className="flex flex-col gap-6">
      <h3 className="text-lg font-bold 	text-[var(--color-text-main)] dark:text-white">Upcoming Tasks</h3>
      <div className="space-y-4">
        {tasks.map(task => (
          <div 
            key={task.id} 
            onClick={() => toggleTask(task.id)}
            className={cn(
              "p-4 rounded-2xl border relative overflow-hidden cursor-pointer transition-all",
              task.color,
              task.completed && "opacity-50 grayscale scale-[0.98]"
            )}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {task.completed ? <CheckSquare size={18} /> : <Square size={18} />}
              </div>
              <div>
                <p className={cn("font-bold 	text-[var(--color-text-main)] dark:text-white", task.completed && "line-through")}>{task.subject}</p>
                <p className="text-sm 	text-[var(--color-text-main)] dark:text-white/70 font-bold">• {task.topic}</p>
                <p className="text-[10px] text-slate-500 dark:text-white/50 mt-1 font-bold uppercase">{task.remaining}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const WeakSubjects = () => (
  <Card className="flex flex-col gap-4">
    <h3 className="text-lg font-bold 	text-[var(--color-text-main)] dark:text-white">Weak Subjects</h3>
    <div className="flex items-start gap-4 p-4 	bg-[var(--color-card-bg)] dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20">
      <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-2xl">
        <AlertCircle size={24} />
      </div>
      <div className="space-y-2 flex-1">
        <p className="font-bold 	text-[var(--color-text-main)] dark:text-white text-lg">Physics</p>
        <p className="text-sm 	text-[var(--color-text-main)] dark:text-white/70 leading-relaxed font-bold">• Needs more focus and consistency</p>
        <p className="text-sm 	text-[var(--color-text-main)] dark:text-white/70 font-bold">• Current progress = 30%</p>
        <div className="flex items-center gap-2 text-red-500 dark:text-red-400 pt-2">
          <TrendingUp size={16} className="rotate-180" />
          <span className="text-xs font-bold uppercase">Requires Improvement</span>
        </div>
      </div>
    </div>
  </Card>
);

const Achievements = () => (
  <Card className="flex flex-col items-center justify-center text-center gap-4">
    <h3 className="text-lg font-bold 	text-[var(--color-text-main)] dark:text-white self-start">Achievements</h3>
    <div className="py-4 space-y-4">
      <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/40 rounded-2xl flex items-center justify-center text-orange-500 dark:text-orange-400 mx-auto">
        <Trophy size={32} fill="currentColor" />
      </div>
      <div>
        <p className="font-bold 	text-[var(--color-text-main)] dark:text-white text-lg">First 15 Day Streak</p>
        <p className="text-xs text-slate-500 dark:text-white/50 font-bold">Unlocked Recently</p>
      </div>
      <div className="flex gap-1 justify-center">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} size={20} className="text-orange-400" fill="currentColor" />
        ))}
      </div>
    </div>
  </Card>
);

const InsightCard = ({ icon: Icon, label, value, subValue, color }: any) => (
  <Card className="flex items-center gap-4 p-5">
    <div className={cn("p-3 rounded-2xl", color)}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-xs text-slate-500 dark:text-white/50 font-bold uppercase tracking-wider">{label}</p>
      <motion.p 
        key={value}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-2xl font-bold 	text-[var(--color-text-main)] dark:text-white"
      >
        {value}
      </motion.p>
      <p className="text-[10px] text-slate-500 dark:text-white/40 font-bold mt-1 uppercase">{subValue}</p>
    </div>
  </Card>
);

export default function Dashboard({ 
  isDarkMode, 
  toggleDarkMode, 
  onNavigate,
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
}: any) {
  const [goalsAchieved, setGoalsAchieved] = useState(49);
  
  const handleTaskToggle = (completed: boolean) => {
    setGoalsAchieved(prev => completed ? prev + 1 : prev - 1);
  };

  return (
    <main className="flex-1 p-4 md:p-8 bg-transparent min-h-screen relative transition-colors duration-300">
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-6">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold 	text-[var(--color-text-main)] dark:text-white flex items-center gap-2 tracking-tight">
            Hello Isha <span className="animate-bounce">👋</span>
          </h2>
          <p className="	text-[var(--color-text-main)] dark:text-white/70 flex items-center gap-2 mt-2 text-sm md:text-base font-bold">
            <span className="text-primary"><Star size={18} fill="currentColor" /></span>
            Let's continue your progress today
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <AnimatePresence>
            {isTimerRunning && currentSession && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-4 	bg-[var(--color-card-bg)] dark:bg-indigo-900 px-6 py-3 rounded-2xl shadow-sm border border-pink-100 dark:border-indigo-800"
              >
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Studying</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{currentSession.subject}</span>
                </div>
                <div className="h-8 w-px bg-slate-100 dark:bg-indigo-800" />
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
            <div className="w-6 h-6 rounded-full 	bg-[var(--color-card-bg)]/20 flex items-center justify-center">
              {isTimerRunning ? <Square size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
            </div>
            {isTimerRunning ? "Stop Study" : "Start Study"}
          </button>
        </div>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Top Row */}
        <DailyGoal onStart={toggleTimer} isRunning={isTimerRunning} currentSession={currentSession || undefined} />
        <StudyStreak />
        <StudyTime todayHours={todayHours} onOpenModal={() => setIsModalOpen(true)} />

        {/* Middle Row */}
        <OverallProgress />
        <UpcomingTasks onTaskToggle={handleTaskToggle} />

        {/* Bottom Row - Weak Subjects and Achievements spanning full width in 2 columns */}
        <div className="col-span-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeakSubjects />
          <Achievements />
        </div>
        
        {/* Insights Section */}
        <div className="col-span-full mt-4">
          <h3 className="text-xl font-bold 	text-[var(--color-text-main)] dark:text-white mb-6">Study Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InsightCard 
              icon={BarChart2} 
              label="Total Sessions" 
              value="60" 
              subValue="+ 6% from last month" 
              color="bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400" 
            />
            <InsightCard 
              icon={Timer} 
              label="Total Hours" 
              value={totalHours.toFixed(1)} 
              subValue="This month" 
              color="bg-green-50 dark:bg-green-900/20 text-green-500 dark:text-green-400" 
            />
            <InsightCard 
              icon={Target} 
              label="Goals Achieved" 
              value={`${goalsAchieved}/60`} 
              subValue={`${((goalsAchieved / 60) * 100).toFixed(1)}% Completion Rate`} 
              color="bg-purple-50 dark:bg-purple-900/20 text-purple-500 dark:text-purple-400" 
            />
          </div>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={toggleDarkMode}
          className="w-14 h-14 rounded-full 	bg-[var(--color-card-bg)] dark:bg-slate-800 shadow-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-yellow-400 hover:scale-110 transition-all active:scale-95"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </main>
  );
}

