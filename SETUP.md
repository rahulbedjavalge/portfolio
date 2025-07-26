# RahulAI Portfolio Setup Instructions

## API Configuration

To get your portfolio working, you need to add your OpenRouter API key:

1. **Get an OpenRouter API Key:**
   - Go to [OpenRouter.ai](https://openrouter.ai/)
   - Sign up for a free account
   - Navigate to "Keys" in your dashboard
   - Create a new API key

2. **Add the API Key to your project:**
   - Open the `.env.local` file in your project root
   - Add your API key like this:
     ```
     OPENROUTER_API_KEY=sk-or-v1-your-actual-api-key-here
     ```

3. **Restart your development server:**
   ```bash
   npm run dev
   ```

## Features Added

✅ **API Error Handling:**
- Better error messages for missing API keys
- Rate limiting protection
- Invalid API key detection
- Graceful error handling with user-friendly messages

✅ **Fully Responsive Design:**
- **Mobile (320px+):** Optimized for small screens with touch-friendly buttons
- **Tablet (768px+):** Comfortable layout with proper spacing
- **Desktop (1024px+):** Full sidebar and optimal chat experience
- **Large screens (1280px+):** Enhanced typography and spacing

✅ **Responsive Features:**
- Mobile hamburger menu for sidebar navigation
- Collapsible input on small screens
- Responsive typography (text scales with screen size)
- Touch-optimized quick questions
- Proper viewport configuration
- Responsive chat bubbles and avatars

✅ **Enhanced UX:**
- Better loading states
- Improved visual hierarchy
- Mobile-first approach
- Smooth animations and transitions

## Model Configuration

The AI now uses `meta-llama/llama-3.1-8b-instruct:free` which is:
- ✅ Free to use
- ✅ Reliable and fast
- ✅ Good for conversational AI
- ✅ No rate limits for free tier

## Testing

Test the responsiveness by:
1. Resizing your browser window
2. Using browser dev tools to simulate mobile devices
3. Testing on actual mobile devices

The portfolio is now fully responsive and will work great on all devices!
