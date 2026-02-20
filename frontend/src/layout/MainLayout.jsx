import { Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  const admin = localStorage.getItem("admin");

  const isLoggedIn = user || admin;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white relative overflow-hidden">

      <div className="absolute w-80 h-80 bg-pink-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-blue-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      {isLoggedIn && (
        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={handleLogout}
            className="
              px-5 py-2
              rounded-xl
              bg-white/10
              backdrop-blur-xl
              border border-white/20
              shadow-lg
              hover:bg-white/20
              transition-all duration-300
              hover:scale-105
              font-medium
            "
          >
            Logout
          </button>
        </div>
      )}

      <div className="relative z-10 p-6">
        <Outlet />
      </div>

    </div>
  );
};

export default MainLayout;