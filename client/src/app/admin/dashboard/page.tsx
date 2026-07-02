'use client';

import { 
  Users, 
  Clock, 
  ClipboardCheck, 
  CheckCircle2, 
  AlertTriangle,
  Download,
  ArrowUpRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardBody } from '@/src/components/ui/Card';
import { studentsData, activityLogs } from '@/src/lib/mockData';

export default function DashboardPage() {

  const activeStudentsCount = studentsData.filter(s => s.status === 'ACTIVE').length;
  
  const totalHoursLogged = studentsData.reduce((sum, student) => {
    return sum + (student.required - student.remaining);
  }, 0);

  const pendingLogsCount = activityLogs.filter(log => log.status === 'Active').length;
  const completedStudentsCount = studentsData.filter(s => s.status === 'COMPLETED').length;
  const completionRate = studentsData.length > 0 
    ? Math.round((completedStudentsCount / studentsData.length) * 100) 
    : 0;

  const recentActionableLogs = activityLogs
    .filter(log => log.status === 'Active' || log.status === 'Flagged')
    .slice(0, 3);

  const flaggedLogs = activityLogs.filter(log => log.status === 'Flagged');

  const logsPerDate = activityLogs.reduce((acc, log) => {
    const shortDate = log.date.split(',')[0]; 
    
    if (!acc[shortDate]) {
      acc[shortDate] = 0;
    }
    acc[shortDate] += 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(logsPerDate)
    .map(([date, count]) => ({
      name: date, 
      'Logs Submitted': count
    }))
    .reverse();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Stats Row*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardBody className="p-6">
            <div className="flex justify-between items-start mb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Students</p>
              <div className="p-2 bg-blue-100 dark:bg-blue-500/10 rounded-lg">
                <Users size={18} className="text-blue-600 dark:text-blue-500" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{activeStudentsCount}</h3>
            <p className="text-xs text-green-600 dark:text-green-500 flex items-center gap-1">
              <ArrowUpRight size={14} /> Tracking active programs
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <div className="flex justify-between items-start mb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Hours Logged</p>
              <div className="p-2 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
                <Clock size={18} className="text-gray-600 dark:text-gray-300" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{totalHoursLogged.toLocaleString()}</h3>
            <p className="text-xs text-green-600 dark:text-green-500 flex items-center gap-1">
              <ArrowUpRight size={14} /> Across all students
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <div className="flex justify-between items-start mb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Verifications</p>
              <div className="p-2 bg-red-100 dark:bg-red-500/10 rounded-lg border border-red-200 dark:border-red-500/20">
                <ClipboardCheck size={18} className="text-red-600 dark:text-red-500" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{pendingLogsCount}</h3>
            <p className="text-xs text-red-600 dark:text-red-500 flex items-center gap-1">
              {pendingLogsCount > 0 ? '! Requires attention' : 'All caught up'}
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <div className="flex justify-between items-start mb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completion Rate</p>
              <div className="p-2 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
                <CheckCircle2 size={18} className="text-gray-600 dark:text-gray-300" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{completionRate}%</h3>
            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full transition-all duration-500" 
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/*Middle Row: Data Table*/}
      <Card>
        <CardBody className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Logs Awaiting Verification</h2>
            <button className="px-4 py-2 rounded-lg text-sm font-medium text-green-600 dark:text-green-500 border border-green-200 dark:border-green-500/30 hover:bg-green-50 dark:hover:bg-green-500/10 transition-colors cursor-pointer">
              Verify Selected
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                  <th className="font-medium w-10 text-center pb-3"></th>
                  <th className="pb-3 font-medium">STUDENT NAME</th>
                  <th className="pb-3 font-medium">DATE & TIME</th>
                  <th className="pb-3 font-medium">DURATION</th>
                  <th className="pb-3 font-medium">STATUS</th>
                  <th className="pb-3 font-medium text-right pr-4">ACTIONS</th>
                </tr>
              </thead>
              <tfoot className="divide-y divide-gray-200 dark:divide-gray-800/50">
                {recentActionableLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                    <td className="py-4 text-center">
                      <input type="checkbox" className="rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] text-blue-600 dark:text-blue-500 focus:ring-blue-500 cursor-pointer" />
                    </td>
                    <td className="py-4 text-gray-900 dark:text-white font-medium">{log.name}</td>
                    <td className="py-4 text-gray-600 dark:text-gray-400">
                      {log.date}, {log.timeIn} - {log.timeOut !== '--:--' ? log.timeOut : 'Present'}
                    </td>
                    <td className="py-4 text-gray-600 dark:text-gray-400">{log.duration}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                        log.status === 'Verified' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-500 dark:border-blue-500/20' : 
                        log.status === 'Flagged' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-500 dark:border-red-500/20' : 
                        'bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-500 dark:border-green-500/20'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          log.status === 'Verified' ? 'bg-blue-500' : 
                          log.status === 'Flagged' ? 'bg-red-500' : 
                          'bg-green-500'
                        }`}></div> 
                        {log.status === 'Active' ? 'Pending' : log.status}
                      </span>
                    </td>
                    <td className="py-4 text-right pr-4">
                      <button className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 font-medium cursor-pointer">
                        {log.status === 'Verified' ? 'View' : 'Review'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tfoot>
            </table>
          </div>
        </CardBody>
      </Card>

      {/*Bottom Row: Chart & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Real Production Chart Component */}
        <Card className="lg:col-span-2">
          <CardBody className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">Activity Trends (Last 7 Days)</h2>
              <button className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 cursor-pointer">
                Export Report <Download size={14} />
              </button>
            </div>
            
            {/* Recharts Container */}
            <div className="flex-1 min-h-[220px] w-full text-xs mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  {/* Note: Recharts SVG props like stroke="#1f2937" don't accept Tailwind classes directly. 
                      You can use standard CSS variables here if your project is configured for them. */}
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-gray-800" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="currentColor"
                    className="text-gray-500 dark:text-gray-400" 
                    tickLine={false} 
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis 
                    stroke="currentColor" 
                    className="text-gray-500 dark:text-gray-400"
                    tickLine={false} 
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--tooltip-bg, #111827)',
                      borderColor: 'var(--tooltip-border, #1f2937)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    itemStyle={{ color: '#3b82f6' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Logs Submitted"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#chartGradient)"
                    activeDot={{ r: 6, fill: '#3b82f6', stroke: 'currentColor', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        {/* Flagged Logs Alerts */}
        <Card>
          <CardBody className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <AlertTriangle size={18} className="text-red-600 dark:text-red-500" /> Flagged Logs
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 dark:bg-white text-red-700 dark:text-red-600">
                {flaggedLogs.length} New
              </span>
            </div>

            <div className="space-y-6 flex-1">
              {flaggedLogs.slice(0, 2).map((log, index) => (
                <div key={log.id} className={index !== 0 ? "pt-5 border-t border-gray-200 dark:border-gray-800/50" : ""}>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Attention Required</h4>
                    <span className="text-xs text-gray-500">{log.date}</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                    Log entry on {log.day} requires manual review. Duration: {log.duration}.
                  </p>
                  <div className="flex items-center gap-2 inline-flex bg-gray-100 dark:bg-[#1a1a1a] rounded-md px-2 py-1.5 border border-gray-200 dark:border-gray-800">
                    <div className="w-4 h-4 rounded-full bg-red-200 dark:bg-red-900/50 flex items-center justify-center text-[8px] text-red-700 dark:text-red-400 border border-red-300 dark:border-red-900">
                      {log.initials}
                    </div>
                    <span className="text-xs text-gray-700 dark:text-gray-300">{log.name} • {log.studentId}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 border-t border-gray-200 dark:border-gray-800 text-sm font-medium text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors cursor-pointer">
              View All Alerts
            </button>
          </CardBody>
        </Card>

      </div>
    </div>
  );
}