import React from 'react';
import { Pencil, Eye, Upload, Sparkles, Settings } from 'lucide-react';

export default function ArtistDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0c1d] to-[#1b1b2f] text-white font-sans">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
        <h1 className="text-xl font-semibold">ARTIST DASHBOARD</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src="https://via.placeholder.com/32"
              alt="User"
              className="rounded-full w-8 h-8"
            />
            <div className="absolute top-full mt-1 right-0 w-28 bg-[#2d2d44] text-sm rounded shadow hidden group-hover:block">
              <div className="px-3 py-2 hover:bg-gray-700">Scout</div>
              <div className="px-3 py-2 hover:bg-gray-700">Settings</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-16 flex flex-col items-center py-8 space-y-6 bg-[#11111b] border-r border-gray-800">
          <div className="w-6 h-6 bg-cyan-400 rounded" />
          <div className="w-6 h-6 border border-cyan-400 rounded" />
          <div className="w-6 h-6 border border-cyan-400 rounded" />
          <div className="w-6 h-6 border border-cyan-400 rounded" />
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 grid grid-cols-2 gap-6 p-8">
          {/* Edit Profile */}
          <div className="bg-[#2a2a3c] rounded-lg p-6 border border-cyan-500">
            <div className="flex items-center space-x-3 mb-2">
              <Pencil className="text-pink-400" />
              <h2 className="text-lg font-bold">EDIT MY PROFILE</h2>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Edit your bio, genres, media, and more using the universal profile schema.
            </p>
            <button className="bg-cyan-600 px-4 py-2 rounded hover:bg-cyan-700 text-sm">
              EDIT PROFILE
            </button>
          </div>

          {/* View My Profile */}
          <div className="bg-[#2a2a3c] rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-2">
              <Eye className="text-cyan-400" />
              <h2 className="text-lg font-bold">VIEW MY PROFILE</h2>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              See how others view your musical identity.
            </p>
            <button className="bg-cyan-600 px-4 py-2 rounded hover:bg-cyan-700 text-sm">
              VIEW PAGE
            </button>
          </div>

          {/* AI Matchmaking */}
          <div className="bg-[#2a2a3c] rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-2">
              <Sparkles className="text-purple-400" />
              <h2 className="text-lg font-bold">AI MATCHMAKING</h2>
            </div>
            <p className="text-sm text-gray-300">Find ideal collaborators</p>
          </div>

          {/* Upload Magazine */}
          <div className="bg-[#2a2a3c] rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-2">
              <Upload className="text-gray-400" />
              <h2 className="text-lg font-bold">UPLOAD MAGAZINE</h2>
            </div>
            <p className="text-sm text-gray-300">ADMIN: Upload New Article</p>
          </div>

          {/* Milestones */}
          <div className="col-span-2 mt-4">
            <h3 className="text-gray-400 mb-2">ARTIST MILESTONES</h3>
            <div className="bg-[#2a2a3c] p-4 rounded-lg">
              <p>Your journey: <span className="text-white">Bedroom Artist – Stage Star</span></p>
              <div className="w-full bg-gray-700 h-2 rounded mt-2">
                <div className="bg-cyan-500 h-2 rounded" style={{ width: '60%' }}></div>
              </div>
              <p className="text-sm text-gray-400 mt-1">Profiling complete: 60%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
