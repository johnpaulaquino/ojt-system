'use client';

import { useState, useMemo, useEffect } from 'react';
import { 
  Download, 
  Calendar,
  Search, 
  Filter, 
  LogIn, 
  LogOut, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Card, CardBody } from '@/src/components/ui/Card';
import { activityLogs } from '@/src/lib/mockData';

export default function ActivityLogsPage() {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  const filteredLogs = useMemo(() => {
    return activityLogs.filter((log) => {
      const matchesStatus = 
        statusFilter === 'all' || 
        log.status.toLowerCase() === statusFilter.toLowerCase();
      
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        log.name?.toLowerCase().includes(searchLower) || 
        log.studentId?.toLowerCase().includes(searchLower);

      return matchesStatus && matchesSearch;
    });
  }, [searchQuery, statusFilter]);

 
  const totalItems = filteredLogs.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage)); 
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivityLogs = filteredLogs.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/*Page Header*/}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Activity Logs</h1>
          <p className="text-sm text-gray-400">
            Comprehensive tracking of student time-in and time-out records.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-100 text-gray-900 text-sm font-semibold rounded-lg transition-colors cursor-pointer">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Date Range */}
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Date Range
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-800 rounded-lg bg-[#0a0a0a] text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="Oct 01 - Oct 31, 2023"
            />
          </div>
        </div>

        {/* Student Name Search */}
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Student Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-800 rounded-lg bg-[#0a0a0a] text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="Search by name or ID"
            />
          </div>
        </div>

        {/* Status Filter & Action */}
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Status Filter
          </label>
          <div className="flex gap-2">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 block w-full py-2.5 px-3 border border-gray-800 rounded-lg bg-[#0a0a0a] text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors appearance-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="verified">Verified</option>
              <option value="active">Active</option>
              <option value="flagged">Flagged</option>
            </select>
            <button className="p-2.5 border border-gray-800 rounded-lg bg-[#0a0a0a] hover:bg-gray-800 text-gray-400 transition-colors cursor-pointer">
              <Filter size={18} />
            </button>
          </div>
        </div>
      </div>

      {/*Data Table Card*/}
      <Card>
        <CardBody className="p-0 sm:p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#111111] border-b border-gray-800">
                <tr className="text-gray-400 text-xs uppercase font-semibold tracking-wider">
                  <th className="px-6 py-4">DATE</th>
                  <th className="px-6 py-4">STUDENT DETAILS</th>
                  <th className="px-6 py-4">TIME IN</th>
                  <th className="px-6 py-4">TIME OUT</th>
                  <th className="px-6 py-4 text-center">DURATION</th>
                  <th className="px-6 py-4 text-center">STATUS</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-800/50">
                {currentActivityLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-800/20 transition-colors">
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-white font-medium">{log.date}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{log.day}</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-800 text-gray-300 flex items-center justify-center text-xs font-semibold shrink-0">
                          {log.initials}
                        </div>
                        <div>
                          <div className="text-white font-medium">{log.name}</div>
                          <div className="text-gray-500 text-xs mt-0.5">{log.studentId}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-gray-300 font-medium">
                        <LogIn size={14} className="text-blue-500" />
                        {log.timeIn}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-gray-300 font-medium">
                        <LogOut size={14} className="text-gray-500" />
                        {log.timeOut}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center font-medium">
                      <span className={log.isDurationAlert ? "text-red-500" : "text-gray-300"}>
                        {log.duration}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border ${
                          log.status === 'Verified'
                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                            : log.status === 'Active'
                            ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                            : 'bg-red-500/10 text-red-400 border-red-500/20'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
                
                {/*Fallback if no logs exist*/}
                {currentActivityLogs.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No activity logs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/*Pagination Footer*/}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-800 bg-[#111111]">
            <span className="text-sm text-gray-500">
              Showing {totalItems === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
            </span>
            <div className="flex items-center gap-1 text-sm font-medium">
              <button 
                onClick={handlePrevPage}
                disabled={currentPage === 1 || totalItems === 0}
                className="p-1 rounded text-gray-500 hover:text-white hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-500 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
              </button>
              
              <span className="px-3 text-gray-300">
                Page {currentPage} of {totalPages}
              </span>

              <button 
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalItems === 0}
                className="p-1 rounded text-gray-500 hover:text-white hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-500 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </CardBody>
      </Card>
      
    </div>
  );
}