
import React from 'react';
import { Sparkles, MessageSquare, Send, X, Bot } from 'lucide-react';
import { getStylistAdvice } from '../services/geminiService';

const FashionStylist: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [chatHistory, setChatHistory] = React.useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Hello, darling! I am your Dellyz Empire Stylist. Looking for the perfect outfit for a gala, a casual day out, or perhaps some jewelry advice? Tell me what you're looking for." }
  ]);
  const [isLoading, setIsLoading] = React.useState(false);
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userText = message;
    setMessage('');
    setChatHistory(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    const botResponse = await getStylistAdvice(userText);
    setChatHistory(prev => [...prev, { role: 'bot', text: botResponse }]);
    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-white text-stone-900 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center space-x-2 border border-stone-200 group"
      >
        <Sparkles size={24} className="text-amber-500 group-hover:rotate-12 transition-transform" />
        <span className="font-bold text-xs uppercase tracking-widest hidden sm:inline">AI Stylist</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-[90vw] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 bg-stone-900 text-white rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-amber-500 p-1.5 rounded-full">
                <Bot size={20} className="text-stone-900" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm tracking-tight">Dellyz Stylist</h3>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest">Personal Fashion Consultant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-stone-300 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.map((chat, idx) => (
              <div key={idx} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  chat.role === 'user' 
                    ? 'bg-stone-900 text-white rounded-tr-none' 
                    : 'bg-stone-100 text-stone-800 rounded-tl-none border border-stone-200 shadow-sm'
                }`}>
                  {chat.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-stone-100 px-4 py-3 rounded-2xl rounded-tl-none animate-pulse text-xs text-stone-400">
                  Stylist is thinking...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-stone-100 flex items-center space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask for style advice..."
              className="flex-1 bg-stone-50 border border-stone-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-stone-900 text-white p-2 rounded-full hover:bg-stone-800 disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default FashionStylist;
