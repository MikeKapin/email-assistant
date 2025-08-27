import React, { useState } from 'react';
import Head from 'next/head';
import { Mail, Send, Copy, CheckCircle, Sparkles, MessageCircle, User, Clock } from 'lucide-react';

export default function EmailAssistant() {
  const [rawThoughts, setRawThoughts] = useState('');
  const [tone, setTone] = useState('professional');
  const [replyingTo, setReplyingTo] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showReplySection, setShowReplySection] = useState(false);

  const tones = [
    { value: 'professional', label: 'Professional', desc: 'Clear, formal, business-appropriate' },
    { value: 'warm', label: 'Warm', desc: 'Friendly, personable, approachable' },
    { value: 'concise', label: 'Concise', desc: 'Brief, direct, to-the-point' },
    { value: 'formal', label: 'Formal', desc: 'Official, structured, traditional' },
    { value: 'casual', label: 'Casual', desc: 'Relaxed, conversational, informal' },
    { value: 'persuasive', label: 'Persuasive', desc: 'Compelling, convincing, influential' }
  ];

  const generateEmail = async () => {
    if (!rawThoughts.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          thoughts: rawThoughts,
          tone: tone,
          replyContext: replyingTo
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate email');
      }

      const data = await response.json();
      setGeneratedEmail(data.email);
    } catch (error) {
      console.error('Error generating email:', error);
      alert('Error generating email. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <>
      <Head>
        <title>Email Assistant - Transform Your Thoughts Into Polished Emails</title>
        <meta name="description" content="AI-powered email writing assistant that transforms your thoughts into professional, polished emails" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✉️</text></svg>" />
        <style jsx global>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          .min-h-screen { min-height: 100vh; }
          .bg-gradient-to-br { background: linear-gradient(to bottom right, #f8fafc, #dbeafe, #e0e7ff); }
          .bg-white\\/80 { background: rgba(255, 255, 255, 0.8); }
          .backdrop-blur-sm { backdrop-filter: blur(4px); }
          .border-b { border-bottom: 1px solid; }
          .border-slate-200\\/50 { border-color: rgba(226, 232, 240, 0.5); }
          .sticky { position: sticky; }
          .top-0 { top: 0; }
          .z-10 { z-index: 10; }
          .max-w-6xl { max-width: 72rem; }
          .mx-auto { margin-left: auto; margin-right: auto; }
          .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
          .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
          .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
          .flex { display: flex; }
          .items-center { align-items: center; }
          .justify-between { justify-content: space-between; }
          .gap-3 { gap: 0.75rem; }
          .gap-8 { gap: 2rem; }
          .p-2 { padding: 0.5rem; }
          .p-4 { padding: 1rem; }
          .p-6 { padding: 1.5rem; }
          .p-12 { padding: 3rem; }
          .bg-gradient-to-r { background: linear-gradient(to right, var(--tw-gradient-stops)); }
          .from-blue-500 { --tw-gradient-from: #3b82f6; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(59, 130, 246, 0)); }
          .to-indigo-600 { --tw-gradient-to: #4f46e5; }
          .from-blue-600 { --tw-gradient-from: #2563eb; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(37, 99, 235, 0)); }
          .rounded-xl { border-radius: 0.75rem; }
          .rounded-2xl { border-radius: 1rem; }
          .rounded-lg { border-radius: 0.5rem; }
          .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
          .shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
          .w-6 { width: 1.5rem; }
          .h-6 { width: 1.5rem; height: 1.5rem; }
          .w-5 { width: 1.25rem; }
          .h-5 { width: 1.25rem; height: 1.25rem; }
          .w-4 { width: 1rem; }
          .h-4 { width: 1rem; height: 1rem; }
          .text-white { color: white; }
          .text-2xl { font-size: 1.5rem; line-height: 2rem; }
          .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
          .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
          .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
          .font-bold { font-weight: 700; }
          .font-semibold { font-weight: 600; }
          .font-medium { font-weight: 500; }
          .bg-clip-text { background-clip: text; }
          .text-transparent { color: transparent; }
          .from-slate-800 { --tw-gradient-from: #1e293b; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(30, 41, 59, 0)); }
          .to-slate-600 { --tw-gradient-to: #475569; }
          .text-slate-500 { color: #64748b; }
          .text-slate-800 { color: #1e293b; }
          .text-slate-700 { color: #334155; }
          .text-slate-400 { color: #94a3b8; }
          .text-slate-600 { color: #475569; }
          .text-blue-600 { color: #2563eb; }
          .text-indigo-600 { color: #4f46e5; }
          .text-green-600 { color: #16a34a; }
          .grid { display: grid; }
          .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
          .space-y-6 > * + * { margin-top: 1.5rem; }
          .space-y-2 > * + * { margin-top: 0.5rem; }
          .bg-white\\/70 { background: rgba(255, 255, 255, 0.7); }
          .border { border-width: 1px; }
          .border-white\\/50 { border-color: rgba(255, 255, 255, 0.5); }
          .border-slate-200 { border-color: #e2e8f0; }
          .border-blue-500 { border-color: #3b82f6; }
          .border-2 { border-width: 2px; }
          .bg-blue-100 { background-color: #dbeafe; }
          .bg-indigo-100 { background-color: #e0e7ff; }
          .bg-slate-100 { background-color: #f1f5f9; }
          .bg-green-100 { background-color: #dcfce7; }
          .bg-slate-200 { background-color: #e2e8f0; }
          .bg-blue-50 { background-color: #eff6ff; }
          .mb-6 { margin-bottom: 1.5rem; }
          .mb-4 { margin-bottom: 1rem; }
          .mb-3 { margin-bottom: 0.75rem; }
          .mb-2 { margin-bottom: 0.5rem; }
          .mt-1 { margin-top: 0.25rem; }
          .mt-6 { margin-top: 1.5rem; }
          .w-full { width: 100%; }
          .h-32 { height: 8rem; }
          .h-24 { height: 6rem; }
          .h-16 { height: 4rem; }
          .focus\\:ring-2:focus { box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); }
          .focus\\:ring-blue-500:focus { box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); }
          .focus\\:border-transparent:focus { border-color: transparent; }
          .resize-none { resize: none; }
          .placeholder-slate-400::placeholder { color: #94a3b8; }
          .bg-white\\/80 { background: rgba(255, 255, 255, 0.8); }
          .hover\\:border-slate-300:hover { border-color: #cbd5e1; }
          .hover\\:shadow-sm:hover { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
          .transform { transform: translateX(var(--tw-translate-x, 0)) translateY(var(--tw-translate-y, 0)) rotate(var(--tw-rotate, 0)) skewX(var(--tw-skew-x, 0)) skewY(var(--tw-skew-y, 0)) scaleX(var(--tw-scale-x, 1)) scaleY(var(--tw-scale-y, 1)); }
          .scale-105 { --tw-scale-x: 1.05; --tw-scale-y: 1.05; }
          .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
          .duration-200 { transition-duration: 200ms; }
          .duration-300 { transition-duration: 300ms; }
          .text-left { text-align: left; }
          .hover\\:text-blue-800:hover { color: #1e40af; }
          .transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
          .animate-in { animation: animate-in 0.2s ease-out; }
          .slide-in-from-top-2 { animation: slide-in-from-top-2 0.2s ease-out; }
          @keyframes animate-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes slide-in-from-top-2 { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
          .hover\\:shadow-xl:hover { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
          .hover\\:-translate-y-0\\.5:hover { --tw-translate-y: -0.125rem; }
          .disabled\\:opacity-50:disabled { opacity: 0.5; }
          .disabled\\:cursor-not-allowed:disabled { cursor: not-allowed; }
          .disabled\\:transform-none:disabled { transform: none; }
          .justify-center { justify-content: center; }
          .animate-spin { animation: spin 1s linear infinite; }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          .border-white\\/30 { border-color: rgba(255, 255, 255, 0.3); }
          .border-t-white { border-top-color: white; }
          .rounded-full { border-radius: 9999px; }
          .gap-2 { gap: 0.5rem; }
          .hover\\:bg-slate-200:hover { background-color: #e2e8f0; }
          .fade-in-50 { animation: fade-in-50 0.5s ease-out; }
          @keyframes fade-in-50 { from { opacity: 0; } to { opacity: 1; } }
          .duration-500 { transition-duration: 500ms; }
          .whitespace-pre-wrap { white-space: pre-wrap; }
          .font-sans { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          .leading-relaxed { line-height: 1.625; }
          .from-slate-50 { --tw-gradient-from: #f8fafc; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(248, 250, 252, 0)); }
          .to-slate-100 { --tw-gradient-to: #f1f5f9; }
          .border-dashed { border-style: dashed; }
          .border-slate-300 { border-color: #cbd5e1; }
          .text-center { text-align: center; }
          .from-blue-50 { --tw-gradient-from: #eff6ff; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(239, 246, 255, 0)); }
          .to-indigo-50 { --tw-gradient-to: #eef2ff; }
          .border-blue-100 { border-color: #dbeafe; }
          @media (min-width: 640px) {
            .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
          @media (min-width: 1024px) {
            .lg\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .lg\\:sticky { position: sticky; }
            .lg\\:top-24 { top: 6rem; }
            .lg\\:h-fit { height: fit-content; }
          }
        `}</style>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Email Assistant
                </h1>
                <p className="text-slate-500 text-sm">Transform your thoughts into polished emails</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-800">What do you want to say?</h2>
                </div>
                
                <textarea
                  value={rawThoughts}
                  onChange={(e) => setRawThoughts(e.target.value)}
                  placeholder="Just write your thoughts here... e.g., 'Need to follow up on the project timeline, want to check if they need any help, make sure they know I'm available'"
                  className="w-full h-32 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-700 placeholder-slate-400 bg-white/80"
                />
              </div>

              {/* Tone Selection */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-800">Choose your tone</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tones.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTone(t.value)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        tone === t.value
                          ? 'border-blue-500 bg-blue-50 shadow-md transform scale-105'
                          : 'border-slate-200 bg-white/80 hover:border-slate-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="font-semibold text-slate-800">{t.label}</div>
                      <div className="text-sm text-slate-500 mt-1">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Reply Context */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      <User className="w-5 h-5 text-slate-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-800">Replying to an email?</h2>
                  </div>
                  <button
                    onClick={() => setShowReplySection(!showReplySection)}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    {showReplySection ? 'Hide' : 'Add context'}
                  </button>
                </div>
                
                {showReplySection && (
                  <div className="animate-in slide-in-from-top-2 duration-300">
                    <textarea
                      value={replyingTo}
                      onChange={(e) => setReplyingTo(e.target.value)}
                      placeholder="Paste the email you're replying to here (optional)..."
                      className="w-full h-24 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-700 placeholder-slate-400 bg-white/80"
                    />
                  </div>
                )}
              </div>

              {/* Generate Button */}
              <button
                onClick={generateEmail}
                disabled={!rawThoughts.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Crafting your email...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Generate Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Output Section */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Mail className="w-5 h-5 text-green-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-800">Your polished email</h2>
                  </div>
                  
                  {generatedEmail && (
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {generatedEmail ? (
                  <div className="bg-white rounded-xl border border-slate-200 p-6 animate-in fade-in-50 duration-500">
                    <pre className="whitespace-pre-wrap text-slate-700 font-sans leading-relaxed">
                      {generatedEmail}
                    </pre>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border-2 border-dashed border-slate-300 p-12 text-center">
                    <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Clock className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-500 text-lg mb-2">Ready when you are</p>
                    <p className="text-slate-400">Your generated email will appear here</p>
                  </div>
                )}
              </div>

              {/* Quick Tips */}
              <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Pro Tips
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Be specific about what you want to communicate</li>
                  <li>• Include context like deadlines or next steps</li>
                  <li>• Choose the tone that matches your relationship</li>
                  <li>• Review and personalize before sending</li>
                  <li>• Bookmark this page on all your devices</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}