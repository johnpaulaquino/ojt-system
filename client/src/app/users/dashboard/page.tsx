'use client';

import { 
  Clock, 
  Target, 
  CheckCircle2, 
  History,
  AlertCircle
} from 'lucide-react';
import { Card, CardBody } from '@/src/components/ui/Card';

const studentData = {
  totalHours: 142.5,
  requiredHours: 300,
  completionPercentage: 47,
  verifiedLogs: 24,
  pendingReview: 2,
};

const recentActivity = [
  { id: 1, date: 'Oct 24, 2023', timeIn: '08:05 AM', timeOut: '05:15 PM', duration: '8h 10m', status: 'VERIFIED' },
  { id: 2, date: 'Oct 23, 2023', timeIn: '07:55 AM', timeOut: '05:00 PM', duration: '8h 05m', status: 'VERIFIED' },
  { id: 3, date: 'Oct 20, 2023', timeIn: '08:15 AM', timeOut: '04:30 PM', duration: '7h 15m', status: 'PENDING' },
  { id: 4, date: 'Oct 19, 2023', timeIn: '08:00 AM', timeOut: '05:00 PM', duration: '8h 00m', status: 'VERIFIED' },
  { id: 5, date: 'Oct 18, 2023', timeIn: '08:30 AM', timeOut: '05:30 PM', duration: '8h 00m', status: 'VERIFIED' },
];

export default function StudentDashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/*Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-sm text-gray-400">Overview of your training hours and recent activity.</p>
        </div>
        
        {/* Total Hours Rendered Display */}
        <div className="text-right">
          <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1">Total Hours Rendered</p>
          <div className="flex items-baseline gap-1 justify-end">
            <span className="text-4xl font-bold text-blue-500">{studentData.totalHours}</span>
            <span className="text-lg font-medium text-gray-500">/{studentData.requiredHours}</span>
          </div>
        </div>
      </div>

      {/*Top Grid Area*/}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Action Card */}
        <Card className="lg:col-span-2">
          <CardBody className="p-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-lg font-semibold text-white">Current Status</h2>
                <p className="text-sm text-gray-400">Manage your shift actively.</p>
              </div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-gray-900 text-xs font-bold">
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                Not Timed In
              </span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center pb-6">
              <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-6">
                <Clock size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-400 text-sm max-w-xs mb-8">
                You are not currently logged in for a shift.<br/>Time in to start tracking hours.
              </p>
              
              <div className="flex items-center gap-4">
                <button className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer">
                  Time In
                </button>
                <button className="px-8 py-2.5 bg-white hover:bg-gray-100 text-gray-900 text-sm font-semibold rounded-lg transition-colors cursor-pointer">
                  Time Out
                </button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Stats Column */}
        <div className="space-y-6">
          
          {/*Target Completion */}
          <Card>
            <CardBody className="p-6">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                <Target size={20} className="text-blue-500" />
              </div>
              <p className="text-xs font-bold text-gray-500 tracking-wider uppercase mb-1">Target Completion</p>
              <h3 className="text-3xl font-bold text-white mb-4">{studentData.completionPercentage}%</h3>
              
              {/* Progress Bar */}
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                  style={{ width: `${studentData.completionPercentage}%` }}
                ></div>
              </div>
            </CardBody>
          </Card>

          {/*Verified Logs */}
          <Card>
            <CardBody className="p-6">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                <CheckCircle2 size={20} className="text-gray-400" />
              </div>
              <p className="text-xs font-bold text-gray-500 tracking-wider uppercase mb-1">Verified Logs</p>
              <h3 className="text-3xl font-bold text-white mb-2">{studentData.verifiedLogs} Logs</h3>
              <p className="text-xs text-red-400 flex items-center gap-1.5 font-medium">
                <AlertCircle size={14} />
                {studentData.pendingReview} Pending Review
              </p>
            </CardBody>
          </Card>
          
        </div>
      </div>

      {/*Recent Activity Table*/}
      <Card>
        <CardBody className="p-0 sm:p-0">
          <div className="flex justify-between items-center p-6 border-b border-gray-800">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <History size={18} className="text-gray-400" /> Recent Activity
            </h2>
            <button className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors cursor-pointer">
              View All Logs
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0a0a0a]/50">
                <tr className="text-gray-500 text-xs uppercase font-bold tracking-wider">
                  <th className="px-6 py-4">DATE</th>
                  <th className="px-6 py-4">TIME IN</th>
                  <th className="px-6 py-4">TIME OUT</th>
                  <th className="px-6 py-4">DURATION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {recentActivity.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-800/20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
                      {log.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {log.timeIn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {log.timeOut}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 font-medium">{log.duration}</span>
                        <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase border ${
                          log.status === 'VERIFIED' 
                            ? 'bg-green-500/10 text-green-500 border-green-500/20'
                            : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                        }`}>
                          {log.status}
                        </span>
                      </div>
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