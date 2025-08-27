// pages/api/generate-email.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { thoughts, tone, replyContext } = req.body;

  if (!thoughts || !tone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const aiProvider = process.env.AI_PROVIDER || 'anthropic';
    console.log('AI Provider:', aiProvider);
    console.log('Environment variables available:', {
      AI_PROVIDER: !!process.env.AI_PROVIDER,
      ANTHROPIC_API_KEY: !!process.env.ANTHROPIC_API_KEY,
      OPENAI_API_KEY: !!process.env.OPENAI_API_KEY
    });
    
    let generatedEmail = '';

    if (aiProvider === 'openai') {
      generatedEmail = await generateWithOpenAI(thoughts, tone, replyContext);
    } else if (aiProvider === 'anthropic') {
      generatedEmail = await generateWithAnthropic(thoughts, tone, replyContext);
    } else if (aiProvider === 'cohere') {
      generatedEmail = await generateWithCohere(thoughts, tone, replyContext);
    } else {
      throw new Error('Invalid AI provider configured');
    }

    res.status(200).json({ email: generatedEmail });
  } catch (error) {
    console.error('API Error details:', error.message);
    console.error('Full error:', error);
    res.status(500).json({ 
      error: 'Failed to generate email',
      details: error.message 
    });
  }
}

async function generateWithOpenAI(thoughts, tone, replyContext) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const prompt = createPrompt(thoughts, tone, replyContext);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert email writer. Generate professional, well-structured emails based on the user\'s requirements. Always return just the email body without any additional commentary.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

async function generateWithAnthropic(thoughts, tone, replyContext) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('Anthropic API key not configured');
  }

  const prompt = createPrompt(thoughts, tone, replyContext);

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Anthropic API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.content[0].text.trim();
}

async function generateWithCohere(thoughts, tone, replyContext) {
  const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey) {
    throw new Error('Cohere API key not configured');
  }

  const prompt = createPrompt(thoughts, tone, replyContext);

  const response = await fetch('https://api.cohere.ai/v1/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'command',
      prompt: prompt,
      max_tokens: 500,
      temperature: 0.7,
      stop_sequences: ['\n\n---']
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Cohere API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.generations[0].text.trim();
}

function createPrompt(thoughts, tone, replyContext) {
  const toneDescriptions = {
    'professional': 'Clear, formal, business-appropriate',
    'warm': 'Friendly, personable, approachable',
    'concise': 'Brief, direct, to-the-point',
    'formal': 'Official, structured, traditional',
    'casual': 'Relaxed, conversational, informal',
    'persuasive': 'Compelling, convincing, influential'
  };

  const toneDesc = toneDescriptions[tone] || 'professional';
  
  let prompt = `Write an email with a ${tone} tone (${toneDesc}). 

What I want to communicate: ${thoughts}

${replyContext ? `Context - I'm replying to this email: ${replyContext}` : ''}

Please write a complete, well-structured email that:
1. Has an appropriate greeting
2. Clearly communicates my main points
3. Uses the ${tone} tone consistently
4. Includes a professional closing
5. Uses [Recipient] and [Your Name] as placeholders

Do not include a subject line. Just return the email body.`;

  return prompt;
}