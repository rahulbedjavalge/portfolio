import ChatBox from './components/ChatBox'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to RahulAI
        </h1>
        <p className="text-center text-lg mb-8 text-gray-600">
          Hello! I'm Rahul Bedjavalge's AI assistant. Feel free to ask me about his skills, projects, or interests.
        </p>
        <ChatBox />
      </div>
    </main>
  )
}
