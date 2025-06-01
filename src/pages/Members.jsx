import React from 'react';
import { Instagram, Music } from 'lucide-react';

const Members = () => {
  const members = [
    {
      id: 1,
      name: "xxxxx",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      description: "xxxxxxxxxxxxxxxxxxxxx",
      instagram: "xxxxxxxxxxxxx",
      tiktok: "xxxxxxxxxxxx"
    },
    {
      id: 2,
      name: "xxxxxxxxxxxxx",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
      description: "xxxxxxxxxxxxx",
      instagram: "xxxxxxxxxxxxx",
      tiktok: "xxxxxxxxxxxxx"
    },
    {
      id: 3,
      name: "xxxxxxxxxxxxx",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      description: "xxxxxxxxxxxxx",
      instagram: "xxxxxxxxxxxxx",
      tiktok: "xxxxxxxxxxxxx"
    },
    {
      id: 4,
      name: "xxxxxxxxxxxxx",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      description: "xxxxxxxxxxxxx",
      instagram: "xxxxxxxxxxxxx",
      tiktok: "xxxxxxxxxxxxx"
    },
    {
      id: 5,
      name: "xxxxxxxxxxxxx",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      description: "xxxxxxxxxxxxx",
      instagram: "xxxxxxxxxxxxx",
      tiktok: "xxxxxxxxxxxxx"
    },
    {
      id: 6,
      name: "xxxxxxxxxxxxx",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      description: "xxxxxxxxxxxxx",
      instagram: "xxxxxxxxxxxxx",
      tiktok: "xxxxxxxxxxxxx"
    },
    {
      id: 7,
      name: "xxxxxxxxxxxxx",
      photo: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face",
      description: "xxxxxxxxxxxxx",
      instagram: "xxxxxxxxxxxxx",
      tiktok: "xxxxxxxxxxxxx"
    },
    {
      id: 8,
      name: "xxxxxxxxxxxxx",
      photo: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face",
      description: "xxxxxxxxxxxxx",
      instagram: "xxxxxxxxxxxxx",
      tiktok: "xxxxxxxxxxxxx"
    },
    {
      id: 9,
      name: "xxxxxxxxxxxxx",
      photo: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=face",
      description: "xxxxxxxxxxxxx",
      instagram: "xxxxxxxxxxxxx",
      tiktok: "xxxxxxxxxxxxx"
    },
    {
      id: 10,
      name: "xxxxxxxxxxxxx",
      photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=face",
      description: "xxxxxxxxxxxxx",
      instagram: "xxxxxxxxxxxxx",
      tiktok: "xxxxxxxxxxxxx"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-8 md:grid-cols-12 lg:grid-cols-16 h-full">
          {Array.from({ length: 200 }).map((_, i) => (
            <div key={i} className="border border-purple-900/30"></div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header with Logo */}
        <div className="text-center mb-16">
          <div className="w-48 h-48 mx-auto mb-8 flex items-center justify-center">
            <img 
              src="https://i.imgur.com/XkDQqzr.png" 
              alt="Tales House Logo" 
              className="max-w-full max-h-full object-contain opacity-90"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="text-white">TALES</span>{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              HOUSE
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-2">MEET THE STORYTELLERS</p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            The creative minds behind the stories that keep you awake at night. 
            Each member brings their unique vision to life in the Tales House universe.
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <div 
              key={member.id} 
              className="group relative bg-gradient-to-br from-gray-900/50 to-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 hover:border-purple-400/50 transition-all duration-300 hover:scale-105"
            >
              {/* Photo */}
              <div className="relative mb-6">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-purple-500/30 group-hover:border-purple-400/60 transition-colors duration-300">
                  <img 
                    src={member.photo} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-center mb-3 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                {member.name}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed mb-6 text-center">
                {member.description}
              </p>

              {/* Social Links */}
              <div className="flex justify-center space-x-4">
                <a 
                  href={`https://instagram.com/${member.instagram.replace('@', '')}`}
                  className="flex items-center space-x-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 border border-pink-500/30 hover:border-pink-400/50 rounded-lg px-3 py-2 text-sm transition-all duration-300 group/link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={16} className="text-pink-400 group-hover/link:text-pink-300" />
                  <span className="text-gray-300 group-hover/link:text-white text-xs">
                    {member.instagram}
                  </span>
                </a>
                <a 
                  href={`https://tiktok.com/${member.tiktok.replace('@', '')}`}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 border border-purple-500/30 hover:border-purple-400/50 rounded-lg px-3 py-2 text-sm transition-all duration-300 group/link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Music size={16} className="text-purple-400 group-hover/link:text-purple-300" />
                  <span className="text-gray-300 group-hover/link:text-white text-xs">
                    {member.tiktok}
                  </span>
                </a>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-purple-500/20">
          <p className="text-gray-400 text-sm">
            WHERE STORIES COME TO LIFE
          </p>
        </div>
      </div>
    </div>
  );
};

export default Members;