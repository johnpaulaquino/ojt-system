'use client';

import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardBody } from '@/src/components/ui/Card';
import { studentsData } from '@/src/lib/mockData';


export default function StudentListPage() {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = studentsData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudents = studentsData.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/*Page Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-white">Registered Students</h1>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-800 rounded-lg bg-[#0a0a0a] text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="Search by name or school..."
            />
          </div>

          {/* Filter Dropdown */}
          <select className="bg-[#0a0a0a] border border-gray-800 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-2 px-3 appearance-none cursor-pointer">
            <option value="all">All Types</option>
            <option value="ojt">OJT</option>
            <option value="spes">SPES</option>
            <option value="immersion">Work Immersion</option>
          </select>
        </div>
      </div>

      {/* --- Data Table Card --- */}
      <Card>
        <CardBody className="p-0 sm:p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#111111] border-b border-gray-800">
                <tr className="text-gray-400 text-xs uppercase font-semibold tracking-wider">
                  <th className="px-6 py-4">STUDENT NAME</th>
                  <th className="px-6 py-4">TYPE</th>
                  <th className="px-6 py-4">SCHOOL / INSTITUTION</th>
                  <th className="px-6 py-4 text-center">REQUIRED HRS</th>
                  <th className="px-6 py-4 text-center">REMAINING HRS</th>
                  <th className="px-6 py-4 text-center">STATUS</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-800/50">
                {currentStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-800/20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1a1a2e] text-blue-200 border border-blue-900/50 flex items-center justify-center text-xs font-semibold shrink-0">
                          {student.initials}
                        </div>
                        <span className="text-white font-medium">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{student.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{student.school}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-center">{student.required}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-center">{student.remaining}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border ${
                          student.status === 'ACTIVE'
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            : student.status === 'COMPLETED'
                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                            : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/*Pagination Footer*/}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-800 bg-[#111111]">
            <span className="text-sm text-gray-500">
              Showing {Math.min(startIndex + 1, totalItems)} to {Math.min(endIndex, totalItems)} of {totalItems} students
            </span>
            <div className="flex items-center gap-1 text-sm font-medium">
              <button 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="p-1 rounded text-gray-500 hover:text-white hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-500 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
              </button>
              
              <span className="px-3 text-gray-300">
                Page {currentPage} of {totalPages}
              </span>

              <button 
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
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