import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/authService";
import CyberBackground from "../components/CyberBackground";
import AudioToggle from "../components/AudioToggle";
import { useTranslation } from "react-i18next";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashboardContent from "../components/Dashboard/DashboardContent";

type User = {
  id: number;
  username: string;
  email: string;
};

function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const profile = await getProfile();
        setUser(profile);
      } catch {
        localStorage.removeItem("token");

        navigate("/login");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");

    navigate("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-medium">{t("common.loading")}</p>
      </div>
    );
  }

  return (
    <CyberBackground>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div
          className="
  relative
  w-175
  max-w-2xl
  text-center
  bg-[#050816]/85
  backdrop-blur-md
  border
  border-cyan-600/30
  rounded-2xl
  p-14
  shadow-[0_0_70px_rgba(0,245,255,0.08),0_0_90px_rgba(236,72,153,0.08)]
  animate-[slideUp_0.8s_ease-out_0.8s_forwards]
  opacity-0
  before:absolute
  before:inset-0
  before:rounded-2xl
  before:bg-linear-to-r
  before:from-cyan-400/5
  before:via-transparent
  before:to-fuchsia-500/5
  before:pointer-events-none
"
        >
          <AudioToggle />
          {user && (
            <DashboardHeader username={user.username} onLogout={handleLogout} />
          )}
        </div>
        <DashboardContent username={user?.username ?? ""} />
      </div>
    </CyberBackground>
  );
}

export default Home;
