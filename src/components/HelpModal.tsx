import React, { useState } from 'react';
import { FAQS } from '../data/mockBuses';
import { HelpCircle, ChevronDown, ChevronUp, Phone, Mail, MessageSquare } from 'lucide-react';

export const HelpModal: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-fade-in space-y-8">
      
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Help & Customer Support</h1>
        <p className="text-xs text-slate-500 mt-1">Find answers to common questions regarding bookings, cancellations, and live tracking.</p>
      </div>

      {/* FAQs Accordion */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Frequently Asked Questions</h2>
        
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden transition-all">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm text-slate-800 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>
                {isOpen && (
                  <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Support Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">24/7 Helpline</h3>
          <p className="text-xs text-slate-500">Call our toll-free customer support line anytime.</p>
          <a href="tel:18005550199" className="text-xs font-bold text-blue-600 block hover:underline">1-800-555-0199</a>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Email Support</h3>
          <p className="text-xs text-slate-500">Send us your queries and get a reply within 2 hours.</p>
          <a href="mailto:support@busgo.com" className="text-xs font-bold text-blue-600 block hover:underline">support@busgo.com</a>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Live Chat</h3>
          <p className="text-xs text-slate-500">Chat with our virtual assistant for instant help.</p>
          <button
            onClick={() => alert('Live chat agent connected! How can we help you today?')}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors inline-block"
          >
            Start Chat
          </button>
        </div>
      </div>

    </div>
  );
};
