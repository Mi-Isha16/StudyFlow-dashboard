import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Calendar, 
  Trophy, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: TrendingUp, label: 'Progress' },
  { icon: Calendar, label: 'Schedule' },
  { icon: Trophy, label: 'Trophies' },
  { icon: Settings, label: 'Settings' },
];

export default function Sidebar({ activePage, onNavigate }: { activePage: string; onNavigate: (page: string) => void }) {
  return (
    <aside className="hidden md:flex w-64 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex-col h-screen sticky top-0 transition-colors duration-300">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-brand-gradient tracking-tight">StudyFlow</h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onNavigate(item.label)}
            className={cn(
              "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
              activePage === item.label
                ? "bg-primary/10 dark:bg-primary/20 text-primary font-bold" 
                : "text-slate-900 dark:text-white/70 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon size={20} className={cn(activePage === item.label ? "text-primary" : "text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors")} />
              <span className="font-bold">{item.label}</span>
            </div>
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-100 dark:border-slate-800">
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-4 flex items-center gap-3 border border-slate-200 dark:border-slate-800 mb-4">
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
    </aside>
  );
}
