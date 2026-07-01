import { Info, UserPlus } from 'lucide-react';
import { Card, CardBody } from '@/src/components/ui/Card';

export default function CreateUser() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Register New Student</h1>
        <p className="text-sm text-gray-400">
          Create a new student profile to begin tracking their required training hours. Ensure all institutional details are accurate.
        </p>
      </div>

      <form>
        <Card className="mb-6">
          <CardBody className="p-8">
            
            {/*Personal Information*/}
            <div className="mb-10">
              <h2 className="text-base font-semibold text-white mb-5">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/*Student ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Student ID *</label>
                  <input
                    type="text"
                    className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg py-2.5 px-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                    placeholder="e.g., 231-1234"
                  />
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg py-2.5 px-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                    placeholder="Juan Dela Cruz"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                  <input
                    type="email"
                    className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg py-2.5 px-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                    placeholder="juan.delacruz@school.edu"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Contact Number</label>
                  <input
                    type="tel"
                    className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg py-2.5 px-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                    placeholder="+63 900 000 0000"
                  />
                </div>
              </div>
            </div>

            {/*Academic & Training Details Section */}
            <div className="mb-10">
              <h2 className="text-base font-semibold text-white mb-5">Academic & Training Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Academic Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Academic Year *</label>
                  <input
                    type="text"
                    className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg py-2.5 px-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                    placeholder="e.g., 2025-2026"
                  />
                </div>

                {/*Program Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Program Type *</label>
                  <select className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg py-2.5 px-3 text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm appearance-none cursor-pointer">
                    <option value="">Select program type</option>
                    <option value="degree">OJT</option>
                    <option value="degree">Work Immersion</option>
                    <option value="diploma">SPES</option>
                  </select>
                </div>

                {/*Program / Course */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Program / Course *</label>
                  <input
                    type="text"
                    className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg py-2.5 px-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                    placeholder="e.g., BSCS"
                  />
                </div>

                {/*Strand */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Strand (if applicable)</label>
                  <select className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg py-2.5 px-3 text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm appearance-none cursor-pointer">
                    <option value="">Select program type</option>
                    <option value="tvl">ABM</option>
                    <option value="stem">STEM</option>
                    <option value="stem">HUMSS</option>
                    <option value="stem">GAS</option>
                    <option value="tvl">TVL</option>
                  </select>
                </div>

                {/* Institution */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Institution / School Name *</label>
                  <input
                    type="text"
                    className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg py-2.5 px-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                    placeholder="University Name"
                  />
                </div>

                {/* Total Required Hours */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Total Required Hours *</label>
                  <div className="relative">
                    <input
                      type="number"
                      className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg py-2.5 pl-3 pr-10 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                      placeholder="e.g., 300"
                    />
                    <span className="absolute right-3 top-2.5 text-sm text-gray-600 pointer-events-none">hrs</span>
                  </div>
                </div>

              </div>
            </div>

            {/*Action Buttons*/}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-800/50">
              <button 
                type="button" 
                className="cursor-pointer px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-transparent border border-gray-700 hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <UserPlus size={16} />
                Register Student
              </button>
            </div>
          </CardBody>
        </Card>
      </form>

      {/*Important Note Banner*/}
      <div className="bg-[#111111] border border-gray-800 rounded-xl p-5 flex gap-4">
        <div className="shrink-0 pt-0.5">
          <Info className="text-blue-500" size={20} />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-1">Important Note</h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            Once registered, an automatic email will not be sent immediately. The student's initial credentials will be generated and displayed on the success screen for manual distribution by the coordinator.
          </p>
        </div>
      </div>
      
    </div>
  );
}