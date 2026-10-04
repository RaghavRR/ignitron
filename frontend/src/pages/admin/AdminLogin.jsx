import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShield,
  FiCheckCircle,
} from 'react-icons/fi';

import { useAuth } from '../../context/AuthContext';

// IMPORTANT:
// Agar exact filename logo.png hai to ye rakho.
// Agar logo.jpg/jpeg hai to extension change kar dena.
import logo from '../../images/logo.png';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      await login(email.trim(), password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Invalid email or password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        h-screen
        w-full
        overflow-hidden
        bg-ignitron-navy
        flex
        items-center
        justify-center
        p-3
        sm:p-4
        relative
      "
    >
      {/* Background decoration */}
      <div
        className="
          absolute
          -top-32
          -right-32
          w-80
          h-80
          rounded-full
          bg-ignitron-orange/10
          blur-3xl
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          -bottom-32
          -left-32
          w-80
          h-80
          rounded-full
          bg-blue-500/10
          blur-3xl
          pointer-events-none
        "
      />

      {/* Login Card */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-5xl
          h-full
          max-h-[680px]
          bg-white
          rounded-2xl
          sm:rounded-3xl
          overflow-hidden
          shadow-2xl
          grid
          grid-cols-1
          lg:grid-cols-2
        "
      >
        {/* =========================================
            LEFT BRAND SECTION
        ========================================== */}
        <div
          className="
            hidden
            lg:flex
            bg-ignitron-navy
            text-white
            p-10
            xl:p-12
            flex-col
            justify-between
            relative
            overflow-hidden
          "
        >
          {/* Decorative circles */}
          <div
            className="
              absolute
              -top-24
              -right-24
              w-64
              h-64
              rounded-full
              border
              border-white/10
            "
          />

          <div
            className="
              absolute
              -bottom-32
              -left-20
              w-72
              h-72
              rounded-full
              border
              border-ignitron-orange/20
            "
          />

          {/* Logo */}
          <div className="relative z-10">
            <img
              src={logo}
              alt="IGNITRON"
              className="
                w-20
                h-20
                object-contain
                rounded-xl
                mb-5
                bg-white
                p-1
              "
            />

            <p className="text-3xl font-extrabold tracking-tight">
              IGNITRON
            </p>

            <p className="text-gray-400 mt-1 text-sm">
              Innovation • Education • Technology
            </p>
          </div>

          {/* Main text */}
          <div className="relative z-10">
            <p className="text-sm font-semibold text-ignitron-orange mb-3">
              ADMIN PANEL
            </p>

            <h2
              className="
                text-3xl
                xl:text-4xl
                font-extrabold
                leading-tight
                mb-4
              "
            >
              Manage your
              <span className="text-ignitron-orange">
                {' '}STEM ecosystem.
              </span>
            </h2>

            <p className="text-gray-400 leading-6 max-w-md text-sm">
              Manage STEM kits, projects, resources,
              gallery, testimonials and website
              content from one place.
            </p>
          </div>

          {/* Features */}
          <div className="relative z-10 space-y-2">
            {[
              'Manage STEM Kits',
              'Update Website Content',
              'Track Enquiries & Leads',
            ].map((item) => (
              <div
                key={item}
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-gray-300
                "
              >
                <FiCheckCircle
                  className="text-ignitron-orange"
                  size={16}
                />

                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================
            RIGHT LOGIN SECTION
        ========================================== */}
        <div
          className="
            flex
            flex-col
            justify-center
            p-6
            sm:p-8
            md:p-10
            lg:p-12
            overflow-y-auto
          "
        >
          {/* Mobile Logo */}
          <div className="lg:hidden mb-6 flex items-center gap-3">
            <img
              src={logo}
              alt="IGNITRON"
              className="
                w-12
                h-12
                object-contain
                rounded-lg
              "
            />

            <div>
              <p className="font-extrabold text-xl text-ignitron-navy">
                IGNITRON
              </p>

              <p className="text-xs text-gray-500">
                Admin Panel
              </p>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <p
              className="
                text-xs
                sm:text-sm
                font-bold
                text-ignitron-orange
                mb-1
              "
            >
              ADMIN ACCESS
            </p>

            <h1
              className="
                text-2xl
                sm:text-3xl
                font-extrabold
                text-ignitron-navy
              "
            >
              Welcome back
            </h1>

            <p className="text-gray-500 mt-1 text-sm">
              Sign in to manage your IGNITRON website.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              className="
                mb-5
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-sm
                text-red-600
              "
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="admin-email"
                className="
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  mb-2
                "
              >
                Email Address
              </label>

              <div className="relative">
                <FiMail
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                  size={18}
                />

                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@ignitron.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className="
                    w-full
                    h-12
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    pl-11
                    pr-4
                    outline-none
                    transition
                    focus:bg-white
                    focus:border-ignitron-orange
                    focus:ring-4
                    focus:ring-ignitron-orange/10
                  "
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-5">
              <label
                htmlFor="admin-password"
                className="
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  mb-2
                "
              >
                Password
              </label>

              <div className="relative">
                <FiLock
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                  size={18}
                />

                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  className="
                    w-full
                    h-12
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    pl-11
                    pr-12
                    outline-none
                    transition
                    focus:bg-white
                    focus:border-ignitron-orange
                    focus:ring-4
                    focus:ring-ignitron-orange/10
                  "
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    w-9
                    h-9
                    rounded-lg
                    flex
                    items-center
                    justify-center
                    text-gray-400
                    hover:text-gray-700
                    hover:bg-gray-100
                  "
                >
                  {showPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                h-12
                rounded-xl
                bg-ignitron-orange
                text-white
                font-bold
                flex
                items-center
                justify-center
                gap-2
                shadow-lg
                shadow-orange-500/20
                hover:brightness-95
                transition
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loading ? (
                <>
                  <span
                    className="
                      w-5
                      h-5
                      rounded-full
                      border-2
                      border-white/30
                      border-t-white
                      animate-spin
                    "
                  />

                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <FiArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Security */}
          <div
            className="
              mt-6
              pt-5
              border-t
              border-gray-100
              flex
              items-start
              gap-2
            "
          >
            <FiShield
              className="text-green-600 mt-0.5 shrink-0"
              size={16}
            />

            <p className="text-[11px] leading-5 text-gray-400">
              Secure administrator access. Only
              authorized IGNITRON users can access
              this panel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;