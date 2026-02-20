import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 flex items-center justify-center p-6 relative overflow-hidden">
      
      <div className="absolute w-80 h-80 bg-pink-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-blue-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-12 w-full max-w-lg text-center text-white transition-all duration-500 hover:shadow-indigo-500/30">
        
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          AI Feedback Analyzer
        </h1>

        <p className="text-white/70 text-lg mb-8 leading-relaxed">
          Analyze user feedback with intelligent emotion detection.
          Built with React, Flask & Tailwind.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-md"
          >
            Login
          </Link>

          <Link to="/admin-login"
          className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-md"
          >
            Admin
          </Link>

          <Link
            to="/signup"
            className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-md"
          >
            Sign Up
          </Link>

        </div>

        
      </div>
    </div>
  );
}

export default Home;