import React, { useState, useEffect } from 'react';
import { Send, MessageCircle, Mail, Phone, MapPin, Zap } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  const FloatingParticle = ({ delay, duration, size }) => (
    <div 
      className={`absolute bg-purple-500/20 rounded-full animate-pulse`}
      style={{
        width: size,
        height: size,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900/20 relative overflow-hidden">
      {/* Animated background particles */}
      {[...Array(20)].map((_, i) => (
        <FloatingParticle 
          key={i} 
          delay={i * 0.5} 
          duration={3 + Math.random() * 2} 
          size={`${4 + Math.random() * 8}px`}
        />
      ))}
      
      {/* Mouse follower gradient */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.1), transparent 40%)`
        }}
      />

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-6 py-2 mb-6">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">GET IN TOUCH</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-6">
            CONTACT
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Ready to bring your story to life? Let's create something extraordinary together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="relative">
            <div className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 relative overflow-hidden">
              {/* Form glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-3xl" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <MessageCircle className="w-6 h-6 text-purple-400" />
                  <h2 className="text-2xl font-bold text-white">Send Message</h2>
                </div>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400">We'll get back to you soon.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative group">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/5 border border-gray-700 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-all duration-300 group-hover:border-gray-600"
                          placeholder="Your Name"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 rounded-xl transition-all duration-300 pointer-events-none" />
                      </div>
                      
                      <div className="relative group">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/5 border border-gray-700 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-all duration-300 group-hover:border-gray-600"
                          placeholder="Your Email"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 rounded-xl transition-all duration-300 pointer-events-none" />
                      </div>
                    </div>

                    <div className="relative group">
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/5 border border-gray-700 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-all duration-300 group-hover:border-gray-600"
                        placeholder="Subject"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 rounded-xl transition-all duration-300 pointer-events-none" />
                    </div>

                    <div className="relative group">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full bg-white/5 border border-gray-700 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-all duration-300 resize-none group-hover:border-gray-600"
                        placeholder="Tell us about your project..."
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 rounded-xl transition-all duration-300 pointer-events-none" />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 relative overflow-hidden group hover:border-purple-500/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Email Us</h3>
                    <p className="text-gray-400">hello@taleshouse.com</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  Drop us a line anytime. We love hearing about new projects and creative collaborations.
                </p>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 relative overflow-hidden group hover:border-purple-500/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Call Us</h3>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  Prefer to talk? Give us a call during business hours and let's discuss your vision.
                </p>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 relative overflow-hidden group hover:border-purple-500/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Visit Us</h3>
                    <p className="text-gray-400">Creative District, Digital City</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  Come by our studio space where stories come to life. We'd love to show you around.
                </p>
              </div>
            </div>

            {/* Social links */}
            <div className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-white mb-6">Follow Our Journey</h3>
                <div className="flex gap-4">
                  <button className="w-12 h-12 bg-purple-500/20 hover:bg-purple-500/30 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <span className="text-purple-400 font-bold">IG</span>
                  </button>
                  <button className="w-12 h-12 bg-purple-500/20 hover:bg-purple-500/30 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <span className="text-purple-400 font-bold">TT</span>
                  </button>
                  <button className="w-12 h-12 bg-purple-500/20 hover:bg-purple-500/30 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <span className="text-purple-400 font-bold">YT</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;