'use client';

import { 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { Card, CardBody } from '@/src/components/ui/Card';

// Dummy data for the schedule view
const trainingStats = {
  completed: 120,
  required: 300,
  thisWeek: 24,
};

const weeklySchedule = [
  { id: 1, day: 'Monday', date: 'Oct 23', time: '08:00 AM - 05:00 PM', duration: '8 hrs', status: 'Completed' },
  { id: 2, day: 'Tuesday', date: 'Oct 24', time: '08:00 AM - 05:00 PM', duration: '8 hrs', status: 'Completed' },
  { id: 3, day: 'Wednesday', date: 'Oct 25', time: '08:00 AM - 05:00 PM', duration: '8 hrs', status: 'Active' },
  { id: 4, day: 'Thursday', date: 'Oct 26', time: '08:00 AM - 05:00 PM', duration: '8 hrs', status: 'Upcoming' },
  { id: 5, day: 'Friday', date: 'Oct 27', time: '08:00 AM - 05:00 PM', duration: '8 hrs', status: 'Upcoming' },
];

export default function SchedulePage() {
  const completionPercentage = Math.round((trainingStats.completed / trainingStats.required) * 100);
  const remainingHours = trainingStats.required - trainingStats.completed;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* --- Page Header --- */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-1">Training Schedule</h1>
        <p className="text-sm text-muted-foreground">Manage and view your assigned OJT hours.</p>
      </div>

      {/* --- Top Stats Row --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Hours Completion Progress (Spans 2 columns) */}
        <Card className="lg:col-span-2">
          <CardBody className="p-8 h-full flex flex-col justify-center">
            <h2 className="text-base font-semibold text-foreground mb-4">Hours Completion</h2>
            
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-bold text-blue-600">{trainingStats.completed}</span>
              <span className="text-sm font-medium text-muted-foreground">/ {trainingStats.required} hrs required</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-slate-100 dark:bg-gray-800 rounded-full mb-3 overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs font-semibold text-muted-foreground">
              <span>{completionPercentage}% Completed</span>
              <span>{remainingHours} hrs remaining</span>
            </div>
          </CardBody>
        </Card>

        {/* This Week Stats (Spans 1 column) */}
        <Card>
          <CardBody className="p-8 h-full flex flex-col justify-center">
            <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-2">This Week</p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-bold text-foreground">{trainingStats.thisWeek}</span>
              <span className="text-sm text-muted-foreground">hrs</span>
            </div>
            
            <hr className="border-border mb-4" />
            
            <p className="text-sm text-blue-500 flex items-center gap-2 font-medium">
              <TrendingUp size={16} />
              On track to meet weekly quota
            </p>
          </CardBody>
        </Card>
      </div>

      {/* --- Weekly Assignment Table --- */}
      <Card>
        <CardBody className="p-0 sm:p-0">
          
          {/* Table Header & Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border-b border-border gap-4">
            <h2 className="text-lg font-semibold text-foreground">Weekly Assignment</h2>
            
            {/* Week Navigation */}
            <div className="flex items-center gap-2">
              <button className="p-2 border border-border rounded-md hover:bg-row-hover text-foreground transition-colors cursor-pointer">
                <ChevronLeft size={16} />
              </button>
              <button className="px-4 py-2 border border-border rounded-md text-sm font-medium text-foreground hover:bg-row-hover transition-colors cursor-pointer">
                Current Week
              </button>
              <button className="p-2 border border-border rounded-md hover:bg-row-hover text-foreground transition-colors cursor-pointer">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50 dark:bg-[#0a0a0a]/50">
                <tr className="text-muted-foreground text-xs uppercase font-bold tracking-wider">
                  <th className="px-6 py-4">DAY</th>
                  <th className="px-6 py-4">TIME</th>
                  <th className="px-6 py-4">DURATION</th>
                  <th className="px-6 py-4">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {weeklySchedule.map((row) => (
                  <tr key={row.id} className="hover:bg-row-hover transition-colors">
                    
                    {/* Day & Date */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-foreground font-medium">{row.day}</div>
                      <div className="text-muted-foreground text-xs mt-0.5">{row.date}</div>
                    </td>
                    
                    {/* Time */}
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                      {row.time}
                    </td>
                    
                    {/* Duration */}
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                      {row.duration}
                    </td>
                    
                    {/* Status Badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-semibold border ${
                        row.status === 'Completed' 
                          ? 'bg-slate-100 dark:bg-slate-800 text-foreground border-border'
                          : row.status === 'Active'
                          ? 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                          : 'bg-transparent text-muted-foreground border-border'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </CardBody>
      </Card>

    </div>
  );
}