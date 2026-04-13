import React, { useState } from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  Clock,
  Calendar,
  Target,
  BarChart2,
  Edit3,
  Play,
  Plus,
  Sun,
  Moon,
  Square
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  LineChart, 
  Line 
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
    className={cn("bg-[var(--color-card-bg)] dark:bg-slate-900/60 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-[var(--color-card-border)] dark:border-slate-800 transition-all duration-300", className)}
  >
    {children}
  </motion.div>
);

const ProgressBar = ({ progress, color = "bg-primary", className, label, onClick, isActive }: { progress: number; color?: string; className?: string; label?: string; onClick?: () => void; isActive?: boolean; key?: string }) => (
  <div 
    className={cn(
      "space-y-1.5 w-full p-2 rounded-xl transition-all cursor-pointer",
      isActive ? "bg-primary/5 dark:bg-primary/10 ring-1 ring-primary/20" : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
    )}
    onClick={onClick}
  >
    {label && (
      <div className="flex justify-between text-xs font-bold">
        <span className="text-[var(--color-text-main)] dark:text-white/80">{label}</span>
        <span className="text-slate-500 dark:text-white/50">{progress}%</span>
      </div>
    )}
    <div className={cn("w-full h-2 bg-slate-100 dark:bg-indigo-950 rounded-full overflow-hidden", className)}>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className={cn("h-full rounded-full", color)}
      />
    </div>
  </div>
);

const CircularProgress = ({ value, label, size = 120, strokeWidth = 12, color = "#E22285" }: { value: number; label: string; size?: number; strokeWidth?: number; color?: string }) => {
  const data = [{ value }, { value: 100 - value }];
  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={size / 2 - strokeWidth}
            outerRadius={size / 2}
            paddingAngle={0}
            dataKey="value"
            startAngle={90}
            endAngle={450}
            stroke="none"
            animationBegin={0}
            animationDuration={1500}
            animationEasing="ease-out"
          >
            <Cell fill={color} />
            <Cell fill="rgba(0,0,0,0.05)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl font-bold text-[var(--color-text-main)] dark:text-white"
        >
          {value}%
        </motion.span>
        <span className="text-[8px] text-slate-500 dark:text-white/50 font-bold uppercase tracking-wider">{label}</span>
      </div>
    </div>
  );
};

export default function Progress({ 
  isDarkMode, 
  toggleDarkMode,
  isTimerRunning,
  timerSeconds,
  currentSession,
  toggleTimer,
  formatTime,
  setIsModalOpen
}: any) {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [analysisType, setAnalysisType] = useState('Weekly');

  const subjectData: Record<string, any> = {
    'Maths': {
      progress: 45,
      color: 'bg-pink-500',
      numTopics: 15,
      covered: 6,
      current: 'Interests',
      planned: 50,
      topics: [
        { name: 'Rational Numbers', completed: true },
        { name: 'Exponents and Powers', completed: true },
        { name: 'Factorization', completed: true },
        { name: 'Proportions', completed: false },
        { name: 'Linear Equations', completed: false },
        { name: 'Quadrilaterals', completed: false },
        { name: 'Data Handling', completed: false },
      ]
    },
    'Physics': {
      progress: 30,
      color: 'bg-pink-400',
      numTopics: 12,
      covered: 4,
      current: 'Thermodynamics',
      planned: 40,
      topics: [
        { name: 'Motion', completed: true },
        { name: 'Force and Pressure', completed: true },
        { name: 'Sound', completed: false },
        { name: 'Light', completed: false },
        { name: 'Electricity', completed: false },
        { name: 'Stars and Solar System', completed: false },
      ]
    },
    'Biology': {
      progress: 50,
      color: 'bg-pink-600',
      numTopics: 10,
      covered: 5,
      current: 'Genetics',
      planned: 55,
      topics: [
        { name: 'Crop Production', completed: true },
        { name: 'Microorganisms', completed: true },
        { name: 'Conservation', completed: true },
        { name: 'Cell Structure', completed: false },
        { name: 'Reproduction', completed: false },
      ]
    },
    'Chemistry': {
      progress: 40,
      color: 'bg-orange-500',
      numTopics: 14,
      covered: 5,
      current: 'Organic',
      planned: 45,
      topics: [
        { name: 'Synthetic Fibres', completed: true },
        { name: 'Metals and Non-Metals', completed: true },
        { name: 'Coal and Petroleum', completed: false },
        { name: 'Combustion', completed: false },
        { name: 'Pollution', completed: false },
      ]
    },
    'History': {
      progress: 65,
      color: 'bg-blue-500',
      numTopics: 18,
      covered: 12,
      current: 'Colonialism',
      planned: 70,
      topics: [
        { name: 'Modern Period', completed: true },
        { name: 'East India Company', completed: true },
        { name: 'Ruling the Countryside', completed: true },
        { name: 'Tribal Societies', completed: true },
        { name: '1857 Revolt', completed: false },
      ]
    },
    'English': {
      progress: 80,
      color: 'bg-green-500',
      numTopics: 20,
      covered: 16,
      current: 'Literature',
      planned: 85,
      topics: [
        { name: 'Tenses', completed: true },
        { name: 'Active/Passive', completed: true },
        { name: 'Direct/Indirect', completed: true },
        { name: 'Prepositions', completed: true },
        { name: 'Reading Comprehension', completed: false },
      ]
    },
    'Economics': {
      progress: 25,
      color: 'bg-purple-500',
      numTopics: 8,
      covered: 2,
      current: 'Macroeconomics',
      planned: 35,
      topics: [
        { name: 'Basic Concepts', completed: true },
        { name: 'Sectors of Economy', completed: true },
        { name: 'Money and Credit', completed: false },
        { name: 'Globalization', completed: false },
      ]
    }
  };

  const subjects = Object.keys(subjectData).map(name => ({
    name,
    ...subjectData[name]
  }));

  const selectedData = selectedSubjectId ? subjectData[selectedSubjectId] : null;

  const barData = [
    { name: 'Rational Numbers', days: 17 },
    { name: 'Exponents', days: 11 },
    { name: 'Factorization', days: 9 },
    { name: 'Profit & Loss', days: 19 },
    { name: 'Sets', days: 5 },
    { name: 'Algebra', days: 14 },
  ];

  const weeklyData = [
    { name: 'Mon', hours: 4.8 },
    { name: 'Tue', hours: 2.1 },
    { name: 'Wed', hours: 4.2 },
    { name: 'Thu', hours: 4.3 },
    { name: 'Fri', hours: 4.6 },
    { name: 'Sat', hours: 3.2 },
    { name: 'Sun', hours: 3.5 },
  ];

  const monthlyData = [
    { name: 'Week 1', hours: 25 },
    { name: 'Week 2', hours: 28 },
    { name: 'Week 3', hours: 22 },
    { name: 'Week 4', hours: 30 },
  ];

  return (
    <main className="flex-1 p-4 md:p-8 bg-transparent min-h-screen transition-colors duration-300 relative">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-brand-gradient tracking-tight">Progress Overview</h2>
          <p className="text-slate-500 dark:text-white/60 font-medium">Track your learning journey</p>
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
        {/* Subjects List */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[var(--color-text-main)] dark:text-white">Subjects</h3>
            <button className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-primary transition-colors">
              <Plus size={20} />
            </button>
          </div>
          <div className="space-y-4 max-h-[250px] overflow-y-auto pr-4 custom-scrollbar scrollbar-visible">
            {subjects.map((sub) => (
              <ProgressBar 
                key={sub.name} 
                progress={sub.progress} 
                color={sub.color} 
                label={sub.name} 
                isActive={selectedSubjectId === sub.name}
                onClick={() => setSelectedSubjectId(selectedSubjectId === sub.name ? null : sub.name)}
              />
            ))}
          </div>
        </Card>

        {/* Today Progress */}
        <Card>
          <h3 className="text-lg font-bold text-[var(--color-text-main)] dark:text-white mb-2">Today Progress</h3>
          <p className="text-xs text-slate-500 mb-4">Day: 64</p>
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-900/30">
              <span className="text-sm font-bold text-green-700 dark:text-green-400">Math – 2 sessions</span>
              <CheckCircle2 size={18} className="text-green-500" />
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
              <div>
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">Physics- 2 sessions</p>
                <p className="text-[10px] text-blue-500/70">Completed: 0/2</p>
              </div>
              <div className="w-4 h-4 rounded-full border-2 border-blue-400 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xs font-bold text-slate-500 mb-2">Today's progress:</p>
            <CircularProgress value={33} label="Done" size={100} />
          </div>
        </Card>
      </div>

      <AnimatePresence mode="wait">
        {selectedData ? (
          <motion.div
            key="subject-detail"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Selected Subject Detail */}
            <Card className="mb-6 overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h3 className="text-xl font-bold text-[var(--color-text-main)] dark:text-white">
                  Selected Subject: <span className="text-brand-gradient">{selectedSubjectId}</span>
                </h3>
                <button className="px-4 py-2 bg-pink-50 dark:bg-pink-900/20 text-primary font-bold rounded-xl text-sm flex items-center gap-2 hover:bg-pink-100 transition-colors">
                  <Edit3 size={16} /> Edit Topic
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 font-medium">Number Of Topics:</span>
                    <span className="text-sm font-bold text-[var(--color-text-main)] dark:text-white">{selectedData.numTopics}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 font-medium">Topics Covered So Far:</span>
                    <span className="text-sm font-bold text-[var(--color-text-main)] dark:text-white">{selectedData.covered}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 font-medium">Topics Left:</span>
                    <span className="text-sm font-bold text-[var(--color-text-main)] dark:text-white">{selectedData.numTopics - selectedData.covered}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 font-medium">Current Topic:</span>
                    <span className="text-sm font-bold text-[var(--color-text-main)] dark:text-white">{selectedData.current}</span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="text-center mb-2">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Average Pace:</p>
                    <p className="text-[10px] text-slate-400">(No of Days/ topic)</p>
                    <p className="text-xl font-bold text-[var(--color-text-main)] dark:text-white">10</p>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <CircularProgress value={selectedData.progress} label="Syllabus" size={120} strokeWidth={14} />
                </div>

                <div className="space-y-6 flex flex-col justify-center">
                  <div className="bg-pink-50/50 dark:bg-pink-900/5 p-4 rounded-2xl border border-pink-100 dark:border-pink-900/20">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-[10px] font-bold mb-1">
                          <span className="text-slate-500">Planned progress</span>
                          <span className="text-primary">{selectedData.planned}%</span>
                        </div>
                        <ProgressBar progress={selectedData.planned} color="bg-primary" className="h-1.5" />
                        <p className="text-[8px] text-slate-400 mt-1">Expected progress by Day 64</p>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] font-bold mb-1">
                          <span className="text-slate-500">Actual Progress</span>
                          <span className="text-purple-500">{selectedData.progress}%</span>
                        </div>
                        <ProgressBar progress={selectedData.progress} color="bg-purple-500" className="h-1.5" />
                        <p className="text-[8px] text-slate-400 mt-1">Current syllabus completion</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl border border-yellow-100 dark:border-yellow-900/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-600">
                      <AlertTriangle size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-yellow-800 dark:text-yellow-500">Progress Gap</p>
                      <p className="text-[10px] text-yellow-600/70">Behind schedule</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-yellow-600">-{selectedData.planned - selectedData.progress}%</span>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/20 flex items-center gap-3">
                  <Lightbulb size={20} className="text-blue-500" />
                  <p className="text-xs font-medium text-blue-800 dark:text-blue-400">
                    <span className="font-bold">Recommendation:</span> Increase the study pace by 9 days/topic to catch up
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
                <div>
                  <h4 className="text-lg font-bold text-[var(--color-text-main)] dark:text-white mb-6">Topics :</h4>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar scrollbar-visible">
                    {selectedData.topics.map((topic: any) => (
                      <div key={topic.name} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-all cursor-pointer group">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">{topic.name}</span>
                        <div className={cn(
                          "w-5 h-5 rounded-md flex items-center justify-center border transition-colors",
                          topic.completed ? "bg-green-500 border-green-500 text-white" : "border-slate-300 dark:border-slate-600"
                        )}>
                          {topic.completed && <CheckCircle2 size={14} />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-bold text-[var(--color-text-main)] dark:text-white">Days Per Topic:</h4>
                    <div className="flex gap-2">
                      <button className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors">
                        <ChevronLeft size={16} />
                      </button>
                      <button className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 8, fill: '#94a3b8' }}
                          interval={0}
                        />
                        <YAxis hide />
                        <Tooltip 
                          cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar 
                          dataKey="days" 
                          fill="#F472B6" 
                          radius={[6, 6, 0, 0]} 
                          barSize={30}
                          animationBegin={0}
                          animationDuration={1500}
                          animationEasing="ease-out"
                          label={{ position: 'top', fontSize: 10, fontWeight: 'bold', fill: '#64748b' }}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Study Time Distribution */}
      <Card>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-[var(--color-text-main)] dark:text-white">Study Time Distribution</h3>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-full">
            {['Weekly', 'Monthly'].map((type) => (
              <button
                key={type}
                onClick={() => setAnalysisType(type)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-bold transition-all",
                  analysisType === type 
                    ? "bg-white dark:bg-slate-700 text-primary shadow-sm" 
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-end">
          <div className="lg:col-span-2 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analysisType === 'Weekly' ? weeklyData : monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#3B82F6" 
                  strokeWidth={3} 
                  dot={{ r: 6, fill: '#F87171', strokeWidth: 0 }} 
                  activeDot={{ r: 8 }}
                  animationBegin={0}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 font-medium">Period:</span>
                <span className="text-sm font-bold text-[var(--color-text-main)] dark:text-white">
                  {analysisType === 'Weekly' ? '1/2/26-7/2/26' : 'February 2026'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 font-medium">Total:</span>
                <span className="text-sm font-bold text-[var(--color-text-main)] dark:text-white">
                  {analysisType === 'Weekly' ? '30 hr' : '105 hr'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 font-medium">Most:</span>
                <span className="text-sm font-bold text-[var(--color-text-main)] dark:text-white">Chemistry</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 font-medium">Least:</span>
                <span className="text-sm font-bold text-[var(--color-text-main)] dark:text-white">Physics</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 font-medium">Change:</span>
                <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-bold text-sm">
                  {analysisType === 'Weekly' ? '6.6%' : '12.4%'} <TrendingUp size={14} className={cn(analysisType === 'Weekly' ? "rotate-180 text-red-500" : "text-green-500")} />
                </div>
              </div>
            </div>

            <div className="p-6 bg-yellow-50 dark:bg-yellow-900/10 rounded-3xl border border-yellow-100 dark:border-yellow-900/20">
              <p className="text-xs text-slate-500 font-bold uppercase mb-4">Note:</p>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Physics</h4>
              <p className="text-sm text-slate-500 font-medium">Needs more focus</p>
            </div>
          </div>
        </div>
      </Card>
      {/* Dark Mode Toggle */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={toggleDarkMode}
          className="w-14 h-14 rounded-full bg-[var(--color-card-bg)] dark:bg-slate-800 shadow-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-yellow-400 hover:scale-110 transition-all active:scale-95"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </main>
  );
}
