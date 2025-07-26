# RahulAI Portfolio

An AI-powered portfolio website showcasing Rahul Bedjavalge's professional journey as a Machine Learning Engineer and AI/ML Researcher based in Berlin, Germany.

🌐 **Live Site**: [https://www.rahulai.com/](https://www.rahulai.com/)

## ✨ Features

- **Interactive AI Assistant**: Chat with RahulAI to learn about Rahul's skills, projects, and experience
- **Professional Portfolio**: Comprehensive showcase of ML engineering expertise
- **Modern Design**: Responsive, mobile-first design with beautiful gradients and animations
- **Real-time Chat**: Powered by OpenRouter API with multiple AI model fallbacks
- **CV Download**: Direct download of professional CV
- **Contact Information**: Easy access to professional contact details

## 🚀 Tech Stack

- **Framework**: Next.js 15.3.2 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom animations
- **AI Integration**: OpenRouter API with multiple model support
- **Deployment**: Vercel with custom domain
- **Icons**: Lucide React
- **Markdown**: React Markdown with syntax highlighting

## 🏃‍♂️ Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/rahulbedjavalge/portfolio.git
cd portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.local.example .env.local
# Add your OpenRouter API key to .env.local
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🔧 Configuration

### Environment Variables
- `OPENROUTER_API_KEY`: Your OpenRouter API key for AI functionality
- `NEXT_PUBLIC_SITE_URL`: Your site URL (https://www.rahulai.com)

### AI Models
The application uses multiple AI models with automatic fallback:
- DeepSeek R1
- Mistral Small
- Moonshot AI Kimi
- Meta Llama 3.1 (fallback)

## 📁 Project Structure

```
├── app/
│   ├── api/          # API routes (chat, rate-limiting)
│   ├── components/   # React components
│   ├── about/        # About page
│   ├── contact/      # Contact page
│   └── globals.css   # Global styles
├── data/             # Personal data and training data
├── lib/              # Utility functions and configurations
├── public/           # Static assets
└── types/            # TypeScript type definitions
```

## 🌟 Key Components

- **ChatBox**: Interactive AI chat interface with question shuffling
- **Sidebar**: Navigation with mobile responsiveness
- **About Page**: Professional background and experience
- **Contact Page**: Contact information and availability

## 🚀 Deployment

The site is deployed on Vercel with automatic deployments from the main branch.

**Live URL**: [https://www.rahulai.com/](https://www.rahulai.com/)

### Deploy Your Own

1. Fork this repository
2. Deploy to Vercel
3. Add environment variables in Vercel dashboard
4. Configure custom domain (optional)

## 🤖 About RahulAI

RahulAI is an intelligent assistant trained on Rahul Bedjavalge's professional data, including:
- Machine Learning engineering experience at iMouse Solution
- Master's degree in AI from IU International University
- Computer vision and YOLO expertise
- Technical skills in Python, TensorFlow, PyTorch
- Project portfolio and certifications

## 📱 Contact

- **Email**: rahulbedjavalge@yahoo.com
- **Phone**: +49 155 6037 5039
- **LinkedIn**: [rahul-bedjavalge](https://www.linkedin.com/in/rahul-bedjavalge/)
- **GitHub**: [rahulbedjavalge](https://github.com/rahulbedjavalge)
- **Location**: Berlin, Germany

## 📄 License

This project is personal portfolio of Rahul Bedjavalge. All rights reserved.
