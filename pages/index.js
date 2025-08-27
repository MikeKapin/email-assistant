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