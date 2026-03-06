import { useState } from 'react';
import { MessageCircle, X, Send, Image as ImageIcon, Upload, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: 'Hi! I\'m your Nestora AI assistant. I can help you find the perfect property, answer questions about rentals, or analyze images of spaces. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { id: Date.now(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (demo mode - no API key needed)
    setTimeout(() => {
      const responses = [
        "I'd be happy to help you find your dream rental! Could you tell me more about what you're looking for? Consider factors like location, budget, number of bedrooms, and any specific amenities you need.",
        "Great question! When choosing a rental property, I recommend considering: 1) Proximity to work/school, 2) Neighborhood safety, 3) Public transportation access, 4) Included utilities, and 5) Lease terms.",
        "That's a wonderful property! This looks like a well-maintained space with good natural lighting. The layout appears spacious. Would you like me to help you schedule a viewing?",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: randomResponse
      }]);
      setIsLoading(false);
    }, 1500);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAnalyzeImage = async () => {
    if (!selectedImage || !input.trim() || isLoading) return;

    const userMessage = { id: Date.now(), role: 'user', content: `[Analyzing image: ${input}]` };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate image analysis response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: `I've analyzed the image you provided. This appears to be a well-lit space with modern furnishings. Here are my observations:\n\n- **Natural Lighting:** Excellent windows providing good daylight\n- **Furniture:** Contemporary style, appears well-maintained\n- **Space:** Good room layout, seems spacious\n- **Amenities:** Based on what I can see, this could be a quality rental\n\nWould you like more details or help with anything else?`
      }]);
      setIsLoading(false);
      setSelectedImage(null);
      setImagePreview(null);
      setInput('');
    }, 2000);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-110 transition-all duration-300"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs text-white/80">Powered by Gemini</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === 'chat'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <MessageCircle className="w-4 h-4 inline mr-2" />
              Chat
            </button>
            <button
              onClick={() => setActiveTab('analyze')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === 'analyze'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <ImageIcon className="w-4 h-4 inline mr-2" />
              Analyze Image
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <ReactMarkdown className="text-sm prose prose-sm dark:prose-invert">
                      {msg.content}
                    </ReactMarkdown>
                  ) : (
                    <p className="text-sm">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-2xl">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            {activeTab === 'analyze' && (
              <div className="mb-3">
                {imagePreview ? (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <button
                      onClick={() => { setSelectedImage(null); setImagePreview(null); }}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl cursor-pointer hover:border-orange-500 transition-colors">
                    <Upload className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-500">Upload image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (activeTab === 'chat' ? handleSend() : handleAnalyzeImage())}
                placeholder={activeTab === 'chat' ? 'Ask me anything...' : 'Describe what to analyze...'}
                className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 border-0 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
              <button
                onClick={activeTab === 'chat' ? handleSend : handleAnalyzeImage}
                disabled={isLoading || (!input.trim() && activeTab === 'analyze')}
                className="p-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
