"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FiSun, FiMoon } from "react-icons/fi";
import styles from "./page.module.scss";
import '../globals.css';

const schema = z.object({
  phone: z
    .string()
    .min(1, "phone number is required")
    .regex(/^09\d{9}$/, "phone number has to be like this: (09101921283)"),
  username: z
    .string()
    .min(1, "username is required")
    .min(3, "username has to be 3 character"),
  password: z
    .string()
    .min(1, "password is required")
    .min(4, "password has to be 4 character")
    .max(20, "password has to be 20 character"),
});

type FormData = z.infer<typeof schema>;

export default function AuthForm() {
  const { setUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // تنظیم تم اولیه پس از mount شدن کامپوننت
  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  // ذخیره تم در localStorage هنگام تغییر
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("theme", darkMode ? "dark" : "light");
      document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    }
  }, [darkMode, isMounted]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError("");

    try {
      // شبیه سازی تاخیر شبکه
      await new Promise(resolve => setTimeout(resolve, 1000));

      // اعتبارسنجی سمت کلاینت
      if (data.username !== "purplebear192" || data.password !== "ppppp") {
        setError("نام کاربری یا رمز عبور اشتباه است");
        return;
      }

      // ساخت شیء کاربر
      const user = {
        gender: "male",
        name: {
          title: "Mr",
          first: "Francis",
          last: "Parker"
        },
        location: {
          street: {
            number: 3598,
            name: "Pockrus Page Rd"
          },
          city: "El Monte",
          state: "Montana",
          country: "United States",
          postcode: 53647,
          coordinates: {
            latitude: "-22.6175",
            longitude: "-124.4116"
          },
          timezone: {
            offset: "+1:00",
            description: "Brussels, Copenhagen, Madrid, Paris"
          }
        },
        email: "francis.parker@example.com",
        login: {
          uuid: "5a75a487-0df2-4f44-bba0-143f6bc8529f",
          username: "purplebear192",
          password: "ppppp"
        },
        dob: {
          date: "1959-05-26T03:49:08.302Z",
          age: 66
        },
        registered: {
          date: "2006-01-19T12:16:41.589Z",
          age: 19
        },
        phone: "(577) 631-5981",
        cell: "(340) 746-3645",
        id: {
          name: "SSN",
          value: "182-73-5914"
        },
        picture: {
          large: "https://randomuser.me/api/portraits/men/99.jpg",
          medium: "https://randomuser.me/api/portraits/med/men/99.jpg",
          thumbnail: "https://randomuser.me/api/portraits/thumb/men/99.jpg"
        },
        nat: "US"
      };

      // ذخیره کاربر در localStorage و context
      localStorage.setItem("auth_user", JSON.stringify(user));
      setUser(user);
      
      // هدایت به صفحه داشبورد
      router.push("/dashboard");
    } catch (err) {
      setError("خطایی در ارتباط با سرور رخ داده است");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null; // یا اسکلتون لودینگ
  }

  return (
    <div className={`${styles.authContainer} ${darkMode ? styles.darkMode : ""}`}>
      <button 
        className={styles.themeToggle} 
        onClick={toggleDarkMode}
        aria-label={darkMode ? "تغییر به تم روشن" : "تغییر به تم تاریک"}
      >
        {darkMode ? <FiSun /> : <FiMoon style={{color: 'black'}} />}
      </button>

      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h1 className={styles.authTitle}>Login</h1>
          <p className={styles.authSubtitle}>Please Enter Your Username & Password</p>
        </div>

        <div className={styles.authBody}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={styles.inputGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="09101921283"
                dir="ltr"
                autoComplete="tel"
                disabled={isLoading}
              />
              {errors.phone && (
                <span className={styles.errorText}>
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="username">username</label>
              <input
                id="username"
                type="text"
                {...register("username")}
                placeholder="Your User Name"
                autoComplete="username"
                disabled={isLoading}
              />
              {errors.username && (
                <span className={styles.errorText}>
                  {errors.username.message}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                {...register("password")}
                placeholder="Enter Your Password"
                autoComplete="current-password"
                disabled={isLoading}
              />
              {errors.password && (
                <span className={styles.errorText}>
                  {errors.password.message}
                </span>
              )}
            </div>

            {error && (
              <div className={styles.errorText} style={{ marginTop: '1rem', justifyContent: 'center' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? 'Entering...' : 'Enter'}
            </button>
          </form>

          <div className={styles.authFooter}>
            You Dont Have Acount?{' '}
            <a href="/register" tabIndex={isLoading ? -1 : 0}>
              SignUp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}