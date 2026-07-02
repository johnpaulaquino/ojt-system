'use client';

import { useState, useRef } from 'react';
import { 
  Building2, 
  Pencil, 
  GraduationCap,
  TrendingUp,
  CheckCircle2,
  UploadCloud,
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react';
import { Card, CardBody } from '@/src/components/ui/Card';
import { Modal } from '@/src/components/ui/Modal'; // <-- Import your new Modal

// Dummy data
const profileData = {
  name: "Alex Rivera",
  course: "BS Computer Science",
  studentId: "2024-00124-CS",
  email: "arivera.student@university.edu",
  contact: "+63 917 123 4567",
  academicYear: "3rd Year, 2nd Semester",
  training: { completed: 320, required: 500, status: "Active Placement", percentage: 64 },
  company: {
    name: "TechFlow Solutions Inc.", industry: "Software Development", role: "Junior Frontend Developer Intern",
    supervisor: "Maria Santos (Lead Developer)", supervisorEmail: "msantos@techflow.com",
    officeAddress: "Laguna Technopark, Biñan, Laguna", startDate: "January 15, 2026", schedule: "Mon-Fri, 9:00 AM - 6:00 PM"
  }
};

export default function UserProfilePage() {
  // --- Modal & Image Upload State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [modalStep, setModalStep] = useState<'upload' | 'confirm'>('upload');
  
  // This represents the user's currently saved profile picture
  const [savedAvatar, setSavedAvatar] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Drag & Drop Handlers ---
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) processFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    // Convert the file to a displayable URL for the preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const resetAndCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setPreviewUrl(null);
      setModalStep('upload');
    }, 200); // Wait for modal close animation
  };

  const handleSave = () => {
    if (previewUrl) {
      setSavedAvatar(previewUrl);
      resetAndCloseModal();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-white mb-8">User Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardBody className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              
              {/* Avatar Section */}
              <div className="relative shrink-0 group">
                <div className="w-32 h-32 rounded-lg border border-gray-700 overflow-hidden bg-[#1a1a1a] flex items-center justify-center relative">
                  {savedAvatar ? (
                    <img src={savedAvatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl text-gray-600 font-bold">
                      {profileData.name.charAt(0)}
                    </span>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ImageIcon size={24} className="text-white" />
                  </div>
                </div>
                {/* Floating Edit Button triggers the Modal */}
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="absolute -bottom-3 -right-3 bg-blue-600 p-2.5 rounded-full text-white hover:bg-blue-700 transition-colors shadow-lg cursor-pointer z-10"
                >
                  <Pencil size={14} />
                </button>
              </div>

              {/* Details Section */}
              <div className="flex-1 w-full">
                <h2 className="text-2xl font-bold text-white mb-1">{profileData.name}</h2>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-5">
                  <GraduationCap size={16} />
                  {profileData.course}
                </div>
                
                <hr className="border-gray-800 mb-5" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6">
                  <DetailItem label="STUDENT ID" value={profileData.studentId} />
                  <DetailItem label="EMAIL ADDRESS" value={profileData.email} />
                  <DetailItem label="CONTACT NUMBER" value={profileData.contact} />
                  <DetailItem label="ACADEMIC YEAR" value={profileData.academicYear} />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Training Status */}
        <Card>
          <CardBody className="p-8 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-6 text-white font-semibold">
              <TrendingUp size={18} className="text-gray-400" />
              Training Status
            </div>
            <div className="mb-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-blue-500">{profileData.training.completed}</span>
              <span className="text-sm text-gray-400 font-medium"> / {profileData.training.required} hrs</span>
            </div>
            <div className="w-full h-2.5 bg-gray-800 rounded-full mb-2 overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${profileData.training.percentage}%` }}></div>
            </div>
            <div className="text-right text-[11px] text-gray-400 mb-8 font-bold tracking-wider">
              {profileData.training.percentage}% Completed
            </div>
            <div className="mt-auto">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-green-500/10 text-green-500 border border-green-500/20">
                <CheckCircle2 size={14} />
                {profileData.training.status}
              </span>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Company Information */}
      <Card>
        <CardBody className="p-8">
          <div className="flex items-center gap-2 mb-5 text-white font-semibold">
            <Building2 size={18} className="text-gray-400" /> Company Information
          </div>
          <hr className="border-gray-800 mb-8" />
          <div className="flex flex-col md:flex-row gap-10">
            <div className="w-full md:w-64 shrink-0 flex flex-col items-center justify-center p-6 border border-gray-800 rounded-lg bg-[#0a0a0a]">
              <div className="w-16 h-16 bg-white rounded flex items-center justify-center mb-4">
                <div className="text-blue-600 font-black text-xl italic tracking-tighter">TF</div>
              </div>
              <h3 className="text-white font-bold text-center text-sm">{profileData.company.name}</h3>
              <p className="text-xs text-gray-500 text-center mt-1">{profileData.company.industry}</p>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <DetailItem label="ROLE" value={profileData.company.role} />
              <div>
                <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1">SUPERVISOR</p>
                <p className="text-sm text-gray-300 font-medium mb-0.5">{profileData.company.supervisor}</p>
                <p className="text-xs text-gray-500">{profileData.company.supervisorEmail}</p>
              </div>
              <div className="sm:col-span-2"><DetailItem label="OFFICE ADDRESS" value={profileData.company.officeAddress} /></div>
              <DetailItem label="START DATE" value={profileData.company.startDate} />
              <DetailItem label="SCHEDULE" value={profileData.company.schedule} />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* --- Image Upload Modal --- */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={resetAndCloseModal} 
        title={modalStep === 'upload' ? 'Update Profile Picture' : 'Confirm Update'}
      >
        {modalStep === 'upload' ? (
          <div className="space-y-6">
            {/* Hidden File Input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileSelect} 
              accept="image/png, image/jpeg, image/webp" 
              className="hidden" 
            />

            {previewUrl ? (
              // Image Preview Area
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full border-4 border-gray-800 overflow-hidden mb-6 relative group">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setPreviewUrl(null)}
                      className="text-white text-xs font-semibold px-3 py-1.5 bg-gray-900/80 rounded-full hover:bg-gray-900 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex gap-3 w-full">
                  <button 
                    onClick={() => setPreviewUrl(null)}
                    className="flex-1 py-2.5 rounded-lg border border-gray-700 text-white font-medium hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setModalStep('confirm')}
                    className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Continue
                  </button>
                </div>
              </div>
            ) : (
              // Drag and Drop Zone
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  isDragging 
                    ? 'border-blue-500 bg-blue-500/5' 
                    : 'border-gray-700 hover:border-gray-500 bg-[#0a0a0a]'
                }`}
              >
                <div className={`p-3 rounded-full mb-4 ${isDragging ? 'bg-blue-500/20 text-blue-500' : 'bg-gray-800 text-gray-400'}`}>
                  <UploadCloud size={32} />
                </div>
                <p className="text-white font-medium mb-1">Click or drag image here</p>
                <p className="text-xs text-gray-500 text-center">SVG, PNG, JPG or WEBP (Max 5MB)</p>
              </div>
            )}
          </div>
        ) : (
          // Confirmation Step
          <div className="space-y-6 text-center pt-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
              <AlertCircle size={24} className="text-yellow-500" />
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Apply Changes?</h4>
              <p className="text-sm text-gray-400">
                Are you sure you want to set this as your new profile picture? This will be visible to your coordinator and company supervisor.
              </p>
            </div>
            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => setModalStep('upload')}
                className="flex-1 py-2.5 rounded-lg border border-gray-700 text-white font-medium hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Back
              </button>
              <button 
                onClick={handleSave}
                className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Yes, Update Profile
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}

function DetailItem({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1">{label}</p>
      <p className="text-sm text-gray-300 font-medium">{value}</p>
    </div>
  );
}