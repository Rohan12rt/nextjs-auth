'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function LoginPage() {

  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisable, setButtonDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    // ✅ check empty fields before API call
    if (!user.email || !user.password) {
      toast.error("All fields are required ❌");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);

      toast.success("Login successful 🎉");
      console.log('Login successfully', response.data);

      // ✅ clear form
      setUser({ email: "", password: "" });

      // ✅ redirect after short delay
      setTimeout(() => {
        router.push('/profile');
      }, 1500);

    } catch (error: any) {
      console.error("SignUp Failed", error);
      toast.error(error.response?.data?.message || "Signup failed ❌");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email && user.password) {
      setButtonDisable(false)
    } else {
      setButtonDisable(true)
    }
  }, [user])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {loading ? "Processing..." : "Login Account"}
        </h1>

        {/* Username */}
        

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Button */}
        <button
          onClick={onSignup}
          disabled={buttonDisable || loading}
          className={`w-full py-2 rounded-lg font-semibold text-white transition-colors 
            ${buttonDisable || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Login..." : buttonDisable ? "Please fill the form" : "Login"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Create an account?{" "}
          <span
            onClick={() => router.push('/signup')}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  )
}
