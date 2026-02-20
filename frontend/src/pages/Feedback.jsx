import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Feedback() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emotion, setEmotion] = useState("");

  // Check login
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setEmotion("");

    try {
      const res = await api.post("/feedback", {
        rating,
        comment,
        user_id: user.user_id,
      });

      setEmotion(res.data.predicted_emotion);
      setComment("");
      setRating(5);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 flex items-center justify-center p-6 relative overflow-hidden">

      {/* Glow blobs */}
      <div className="absolute w-80 h-80 bg-pink-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-blue-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-xl text-white transition-all duration-500 hover:shadow-indigo-500/30">

        <h2 className="text-3xl font-bold text-center mb-6">
          Submit Feedback
        </h2>

        {error && (
          <div className="bg-red-500/20 border border-red-400 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {emotion && (
          <div className="bg-green-500/20 border border-green-400 text-sm p-3 rounded-lg mb-4 text-center">
            Predicted Emotion: <span className="font-semibold">{emotion}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Rating */}
          <div>
            <label className="block text-sm mb-2 text-white/80">
              Rating
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-indigo-400"
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
              <option value={4}>⭐⭐⭐⭐ (4)</option>
              <option value={3}>⭐⭐⭐ (3)</option>
              <option value={2}>⭐⭐ (2)</option>
              <option value={1}>⭐ (1)</option>
            </select>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm mb-2 text-white/80">
              Your Feedback
            </label>
            <textarea
              rows="4"
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-indigo-400 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-indigo-700 font-semibold rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-md disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;