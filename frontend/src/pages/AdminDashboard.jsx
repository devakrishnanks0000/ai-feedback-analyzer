import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { motion } from "framer-motion";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total_users: 0,
    total_feedback: 0,
  });

  const [emotionData, setEmotionData] = useState({});
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchSummary();
    fetchFeedbacks();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await api.get("/admin/summary");

      setStats({
        total_users: res.data.total_users,
        total_feedback: res.data.total_feedback,
      });

      setEmotionData(res.data.emotion_distribution || {});
    } catch (err) {
      console.error("Summary error:", err);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Dashboard error:", err);
    }
  };

  const chartData = {
    labels: Object.keys(emotionData),
    datasets: [
      {
        label: "Emotions",
        data: Object.values(emotionData),
        backgroundColor: [
          "rgba(34,197,94,0.85)",
          "rgba(59,130,246,0.85)",
          "rgba(239,68,68,0.85)",
          "rgba(234,179,8,0.85)",
          "rgba(168,85,247,0.85)",
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 relative overflow-hidden text-white p-6">
      
      <div className="absolute w-80 h-80 bg-pink-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-blue-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-white/70 mt-2">
            Monitor platform activity and emotion insights
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl"
          >
            <p className="text-white/70 text-sm">Total Users</p>
            <p className="text-3xl font-bold mt-2">
              {stats.total_users}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl"
          >
            <p className="text-white/70 text-sm">Total Feedback</p>
            <p className="text-3xl font-bold mt-2">
              {stats.total_feedback}
            </p>
          </motion.div>

        </div>

        {/* Chart + Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Emotion Chart */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl"
          >
            <h2 className="text-xl font-semibold mb-4">
              Emotion Distribution
            </h2>

            <div className="max-w-xs mx-auto">
              {Object.keys(emotionData).length > 0 ? (
                <Pie data={chartData} />
              ) : (
                <p className="text-white/60 text-sm text-center">
                  No emotion data yet
                </p>
              )}
            </div>
          </motion.div>

          {/* Feedback Table */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl overflow-x-auto"
          >
            <h2 className="text-xl font-semibold mb-4">
              Recent Feedback
            </h2>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/20 text-white/70 text-sm">
                  <th className="p-3">User</th>
                  <th className="p-3">Comment</th>
                  <th className="p-3">Emotion</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>

              <tbody>
                {feedbacks.length > 0 ? (
                  feedbacks.map((fb, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-white/10 hover:bg-white/5 transition"
                    >
                      <td className="p-3">{fb.user_name}</td>
                      <td className="p-3">{fb.comment}</td>
                      <td className="p-3 capitalize">{fb.emotion}</td>
                      <td className="p-3">{fb.rating}</td>
                      <td className="p-3">{fb.submitted_at}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center text-white/60 py-6"
                    >
                      No feedback available yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </motion.div>

        </div>

      </div>
    </div>
  );
}