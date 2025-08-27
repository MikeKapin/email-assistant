# Email Assistant

AI-powered email writing assistant that transforms your thoughts into professional, polished emails. Works seamlessly across all your devices.

## Features

- ✨ Transform rough thoughts into polished professional emails
- 🎯 Multiple tone options (Professional, Warm, Concise, Formal, Casual, Persuasive)
- 💬 Reply context support for email threads
- 📱 Responsive design - works on desktop, tablet, and mobile
- 🔒 Secure API key handling via environment variables
- 🚀 Multiple AI provider support (OpenAI, Anthropic, Cohere)
- ⚡ Fast deployment on Vercel

## Quick Start

### 1. Clone or Download
```bash
git clone <your-repo-url>
cd email-assistant
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API key:
```env
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=your_claude_api_key_here
```

### 4. Run Locally
```bash
npm run dev
```

Visit `http://localhost:3000` to see your app running!

## Deployment on Vercel

### Method 1: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project" and import your GitHub repo
4. Vercel will auto-detect it's a Next.js app
5. Add environment variables in Vercel dashboard:
   - `AI_PROVIDER`: `anthropic`
   - `ANTHROPIC_API_KEY`: `your_claude_api_key_here`
6. Click "Deploy"

### Method 2: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

## AI Provider Setup

### Anthropic Claude (Recommended)
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Create a new API key
3. Set environment variables:
   ```env
   AI_PROVIDER=anthropic
   ANTHROPIC_API_KEY=sk-ant-api-your-key-here
   ```

### Anthropic (Claude)
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Create API key
3. Set environment variables:
   ```env
   AI_PROVIDER=anthropic
   ANTHROPIC_API_KEY=your-key-here
   ```

### Cohere
1. Go to [Cohere Dashboard](https://dashboard.cohere.ai/)
2. Create API key
3. Set environment variables:
   ```env
   AI_PROVIDER=cohere
   COHERE_API_KEY=your-key-here
   ```

## Usage

1. **Enter your thoughts**: Type what you want to communicate in plain language
2. **Choose tone**: Select from 6 different professional tones
3. **Add context** (optional): Paste the email you're replying to for better context
4. **Generate**: Click generate and get your polished email
5. **Copy & use**: Copy the generated email and personalize as needed

## Project Structure

```
email-assistant/
├── pages/
│   ├── api/
│   │   └── generate-email.js    # API endpoint for AI generation
│   └── index.js                 # Main React component
├── package.json                 # Dependencies and scripts
├── next.config.js              # Next.js configuration
├── vercel.json                 # Vercel deployment config
├── .env.example               # Environment variable template
└── README.md                  # This file
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `AI_PROVIDER` | Yes | Which AI to use: `openai`, `anthropic`, or `cohere` |
| `OPENAI_API_KEY` | If using OpenAI | Your OpenAI API key |
| `ANTHROPIC_API_KEY` | If using Claude | Your Anthropic API key |
| `COHERE_API_KEY` | If using Cohere | Your Cohere API key |

## Cost Estimation

- **OpenAI GPT-4**: ~$0.002 per email
- **Anthropic Claude**: ~$0.001 per email  
- **Cohere**: ~$0.0005 per email

## Mobile Features

- 📱 Add to Home Screen (PWA-like experience)
- 🖱️ Touch-optimized interface
- 📶 Works offline after first visit (cached resources)
- 🔄 Responsive design adapts to any screen size

## Customization

### Adding New Tones
Edit the `tones` array in `pages/index.js`:
```javascript
const tones = [
  { value: 'your-tone', label: 'Your Tone', desc: 'Description here' },
  // ... existing tones
];
```

### Styling Changes
The app uses Tailwind CSS loaded from CDN. Modify classes in the React components to change the appearance.

## Troubleshooting

### Common Issues

**"Error generating email"**
- Check your API key is correctly set
- Verify the AI provider is spelled correctly
- Check Vercel environment variables are saved

**Local development not working**
- Make sure `.env.local` exists (not `.env.example`)
- Run `npm install` to install dependencies
- Check Node.js version (requires 14+)

**Deployment failed**
- Check all required environment variables are set in Vercel
- Verify build runs locally with `npm run build`
- Check Vercel function logs for specific errors

### Getting Help

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Visit [Vercel deployment docs](https://vercel.com/docs)
3. Check API provider documentation for key setup

## License

MIT License - feel free to use this for personal or commercial projects.

---

Built with ❤️ by LARK Labs