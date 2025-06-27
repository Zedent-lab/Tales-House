import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StarBackground from '../components/StarBackground';

const VotingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [votes, setVotes] = useState({});
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/vote' } });
    }
  }, [user, navigate]);

  const candidates = [
    { 
      id: 'aurora', 
      name: 'Aurora Nightwhisper', 
      title: 'Enchantress of Dreams',
      description: 'Weaves moonlit tales that dance between reality and fantasy.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face',
      gradient: 'from-purple-400 via-pink-400 to-purple-600'
    },
    { 
      id: 'cosmos', 
      name: 'Cosmos Starweaver', 
      title: 'Guardian of Celestial Lore',
      description: 'Chronicles the mysteries of distant worlds and cosmic adventures.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      gradient: 'from-blue-400 via-purple-400 to-indigo-600'
    },
    { 
      id: 'phoenix', 
      name: 'Phoenix Emberheart', 
      title: 'Keeper of Flame Legends',
      description: 'Forges epic sagas of rebirth and transformation, igniting passion through fiery narratives.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c95cee11?w=300&h=300&fit=crop&crop=face',
      gradient: 'from-red-400 via-orange-400 to-yellow-500'
    },
    { 
      id: 'luna', 
      name: 'Luna Shadowmere', 
      title: 'Mistress of Dark Tales',
      description: 'Conjures haunting stories from the depths of shadows, where beauty meets the mysterious unknown.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      gradient: 'from-gray-400 via-purple-500 to-gray-700'
    },
    { 
      id: 'sage', 
      name: 'Sage Willowwind', 
      title: 'Voice of Ancient Wisdom',
      description: 'Preserves timeless wisdom through stories that connect generations across the flowing river of time.',
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=300&fit=crop&crop=face',
      gradient: 'from-green-400 via-teal-400 to-blue-500'
    }
  ];

  const handleVote = async () => {
    if (!selectedCandidate || hasVoted || isVoting) return;

    setIsVoting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    setVotes(prev => ({
      ...prev,
      [selectedCandidate]: (prev[selectedCandidate] || 0) + 1
    }));

    setHasVoted(true);
    setIsVoting(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Updated background color to pitch black */}
      <StarBackground />
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-light mb-6 bg-gradient-to-r from-pink-300 via-purple-400 to-indigo-400 bg-clip-text text-transparent leading-tight">
            TALE HOUSE
            <span className="block text-4xl mt-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              STORYTELLER CROWN
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-4 leading-relaxed">
            Cast your vote for the sovereign of stories and help crown the next storyteller.
          </p>
        </div>

        {!hasVoted ? (
          <div className="space-y-12">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
              {candidates.map(candidate => (
                <div
                  key={candidate.id}
                  onClick={() => setSelectedCandidate(candidate.id)}
                  className={`p-8 rounded-3xl cursor-pointer transition-all ${
                    selectedCandidate === candidate.id
                      ? `bg-gradient-to-br ${candidate.gradient} shadow-lg`
                      : 'bg-gray-800/40 border border-gray-700/50'
                  }`}
                >
                  <img 
                    src={candidate.image} 
                    alt={candidate.name}
                    className="w-24 h-24 mx-auto rounded-full mb-4"
                  />
                  <h3 className="text-2xl font-bold mb-2">{candidate.name}</h3>
                  <p className="text-purple-300 font-medium mb-3">{candidate.title}</p>
                  <p className="text-gray-300 text-sm">{candidate.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={handleVote}
                disabled={!selectedCandidate || isVoting}
                className="px-12 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-2xl font-bold text-lg disabled:opacity-50 transition-all"
              >
                {isVoting ? 'Casting Your Vote...' : 'Bestow the Crown'}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-4xl font-light mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Thank you for voting!
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              You voted for <span className="font-bold text-purple-300">{candidates.find(c => c.id === selectedCandidate)?.name}</span>. 
              Your vote has been recorded. Stay tuned for the results!
            </p>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
              {candidates.map(candidate => (
                <div
                  key={candidate.id}
                  className="p-8 rounded-3xl bg-gray-800/40 border border-gray-700/50"
                >
                  <h3 className="text-2xl font-bold mb-2">{candidate.name}</h3>
                  <p className="text-purple-300 font-medium mb-3">{candidate.title}</p>
                  <p className="text-gray-300 text-sm">Votes: {votes[candidate.id] || 0}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VotingPage;