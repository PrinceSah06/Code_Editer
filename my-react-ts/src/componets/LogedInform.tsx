import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type formfield = {
  password: string;
  email: string;
};

type error = {
  email?: string;
  password?: string;
  general?: string;
};

const LoginForm = () => {
  const [formData, setFormData] = useState<formfield>({
    email: "",
    password: "",
  });
  const [errorObj, setErrorObj] = useState<error>({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handelChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const callAPi = async () => {
    try {
      console.log("Calling API for login");
      const res = await api.post('/login', formData);
      console.log("API response:", res.data);
      const { token } = res.data;
      login(token);
      navigate('/');
    } catch (err: any) {
      console.error("Login failed:", err);
      setErrorObj({
        general: err.response?.data?.message || "Invalid email or password. Please try again."
      });
    }
  };

  const handelChangeSubmit = (e: any) => {
    e.preventDefault();
    setErrorObj({}); // reset error object
    const { email, password } = formData;

    if (email.trim().length === 0) {
      return setErrorObj(prev => ({ ...prev, email: 'Email is required' }));
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      return setErrorObj(prev => ({ ...prev, email: 'Invalid email address' }));
    }

    if (password.trim().length === 0) {
      return setErrorObj(prev => ({ ...prev, password: 'Password is required' }));
    } else if (password.length < 5) {
      return setErrorObj(prev => ({ ...prev, password: 'Password must be at least 5 characters long' }));
    }

    callAPi();
  };

  return (
    <div className="w-full">
      <form onSubmit={handelChangeSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-350 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="text"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handelChange}
            className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all
              ${
                errorObj.email
                  ? "border-red-500/70 focus:ring-red-500/35"
                  : "border-slate-800 focus:ring-indigo-500/35"
              }
            `}
          />
          {errorObj.email && (
            <p className="text-xs text-red-400 mt-1">{errorObj.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-slate-350 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handelChange}
            className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all
              ${
                errorObj.password
                  ? "border-red-500/70 focus:ring-red-500/35"
                  : "border-slate-800 focus:ring-indigo-500/35"
              }
            `}
          />
          {errorObj.password && (
            <p className="text-xs text-red-400 mt-1">{errorObj.password}</p>
          )}
        </div>

        {/* General Errors */}
        {errorObj.general && (
          <p className="text-sm font-medium text-red-400 bg-red-950/20 border border-red-900/30 px-3 py-2 rounded-lg">
            {errorObj.general}
          </p>
        )}

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40"
        >
          Sign In
        </button>
      </form>

      <p className="text-center text-sm text-slate-400 mt-8">
        Don't have an account?{" "}
        <span 
          onClick={() => navigate('/signup')} 
          className="text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer hover:underline transition-colors"
        >
          Create one now
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
