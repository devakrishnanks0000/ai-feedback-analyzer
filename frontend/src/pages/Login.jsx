import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/signin", form);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/feedback");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 flex items-center justify-center p-6 relative overflow-hidden">

      <div className="absolute w-80 h-80 bg-pink-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-blue-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-lg text-white transition-all duration-500 hover:shadow-indigo-500/30">

        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-500/20 border border-red-400 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-indigo-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-indigo-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-indigo-700 font-semibold rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-md disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-white/70">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-300 hover:text-white hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;