"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.scss";

interface InfoItemProps {
  label: string;
  value: string | number;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className={styles.infoItem}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value ? String(value) : 'N/A'}</p>
    </div>
  );
}

export default function Dashboard() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }

    const stored = localStorage.getItem("auth_user");
    if (stored) {
      try {
        const parsedUser = JSON.parse(stored);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user:", error);
        router.replace("/auth");
      }
    } else {
      router.replace("/auth");
    }
    setLoading(false);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  if (loading || !user || !user.dob) return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <div className={styles.avatarPlaceholder}></div>
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
      </div>
    </div>
  );

  return (
    <div className={`${styles.dashboard} ${darkMode ? styles.dark : ""}`}>
      <div className={styles.container}>
        {/* Theme Toggle */}
        <div className={styles.themeToggle} onClick={toggleDarkMode}>
          <div className={`${styles.toggleContainer} ${darkMode ? styles.dark : ""}`}>
            <div className={styles.toggleHandle}></div>
          </div>
        </div>

        {/* Profile Card */}
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.headerContent}>
              <div className={styles.avatar}>
                <img
                  src={user.picture.large}
                  alt="Profile"
                />
              </div>
              <h1 className={styles.name}>
                {user.name.title} {user.name.first} {user.name.last}
              </h1>
              <p className={styles.username}>{user.login.username}</p>
              <div className={styles.badges}>
                <span className={styles.badge}>{user.gender}</span>
                <span className={styles.badge}>{user.nat}</span>
                <span className={styles.badge}>Age {user.dob.age}</span>
              </div>
            </div>
          </div>

          {/* Quick Info Bar */}
          <div className={styles.quickInfo}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <p className={styles.label}>Email</p>
                <p className={styles.value}>{user.email}</p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.label}>Phone</p>
                <p className={styles.value}>{user.phone}</p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.label}>Cell</p>
                <p className={styles.value}>{user.cell}</p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.label}>Registered</p>
                <p className={styles.value}>
                  {new Date(user.registered.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className={styles.mainContent}>
            {/* Personal Info Card */}
            <div className={styles.card}>
              <h2 className={styles.cardHeader}>
                <span className={styles.icon}>👤</span>
                Personal Info
              </h2>
              <div className={styles.infoList}>
                <InfoItem label="Gender" value={user.gender} />
                <InfoItem 
                  label="Date of Birth" 
                  value={`${new Date(user.dob.date).toLocaleDateString()} (${user.dob.age} years)`} 
                />
                <InfoItem label="Nationality" value={user.nat} />
                <InfoItem label="ID" value={`${user.id.name || 'N/A'}: ${user.id.value || 'N/A'}`} />
              </div>
            </div>

            {/* Location Card */}
            <div className={styles.card}>
              <h2 className={styles.cardHeader}>
                <span className={styles.icon}>📍</span>
                Location
              </h2>
              <div className={styles.infoList}>
                <InfoItem label="Country" value={user.location.country} />
                <InfoItem label="State" value={user.location.state} />
                <InfoItem label="City" value={user.location.city} />
                <InfoItem 
                  label="Street" 
                  value={`${user.location.street.number} ${user.location.street.name}`} 
                />
                <InfoItem label="Postcode" value={user.location.postcode} />
                <InfoItem 
                  label="Coordinates" 
                  value={`${user.location.coordinates.latitude}, ${user.location.coordinates.longitude}`} 
                />
                <InfoItem 
                  label="Timezone" 
                  value={`${user.location.timezone.description} (UTC${user.location.timezone.offset})`} 
                />
              </div>
            </div>

            {/* Contact & Login Card */}
            <div className={styles.card}>
              <h2 className={styles.cardHeader}>
                <span className={styles.icon}>📞</span>
                Contact & Login
              </h2>
              <div className={styles.infoList}>
                <InfoItem label="Email" value={user.email} />
                <InfoItem label="Phone" value={user.phone} />
                <InfoItem label="Cell" value={user.cell} />
                <InfoItem label="Username" value={user.login.username} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <p>Account created {user.registered.age} years ago</p>
        </div>
      </div>
    </div>
  );
}