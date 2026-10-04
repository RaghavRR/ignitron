import React, { useState } from 'react';
import {
  NavLink,
  Outlet,
  useNavigate,
} from 'react-router-dom';

import {
  FiImage,
  FiGrid,
  FiFolder,
  FiMessageSquare,
  FiBookOpen,
  FiBarChart2,
  FiUsers,
  FiLogOut,
  FiPackage,
  FiMenu,
  FiX,
} from 'react-icons/fi';

import { useAuth } from '../../context/AuthContext';

const links = [
  {
    to: '/admin/dashboard',
    label: 'Dashboard',
    icon: <FiGrid />,
  },
  {
    to: '/admin/images',
    label: 'Site Photos',
    icon: <FiImage />,
  },
  {
    to: '/admin/projects',
    label: 'Projects',
    icon: <FiFolder />,
  },
  {
    to: '/admin/kits',
    label: 'STEM Kits',
    icon: <FiPackage />,
  },
  {
    to: '/admin/gallery',
    label: 'Gallery',
    icon: <FiImage />,
  },
  // {
  //   to: '/admin/testimonials',
  //   label: 'Testimonials',
  //   icon: <FiMessageSquare />,
  // },
  {
    to: '/admin/resources',
    label: 'Resources',
    icon: <FiBookOpen />,
  },
  {
    to: '/admin/impact',
    label: 'Impact Numbers',
    icon: <FiBarChart2 />,
  },
  {
    to: '/admin/leads',
    label: 'Leads',
    icon: <FiUsers />,
  },
];

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleNavClick = () => {
    // Close sidebar on mobile
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-ignitron-light overflow-x-hidden">

      {/* =====================================================
          MOBILE HEADER
      ====================================================== */}
      <header
        className="
          lg:hidden
          fixed
          top-0
          left-0
          right-0
          z-40
          h-16
          bg-ignitron-navy
          text-white
          flex
          items-center
          justify-between
          px-4
          shadow-md
        "
      >
        <div>
          <p className="font-extrabold text-lg leading-none">
            IGNITRON
          </p>

          <p className="text-[11px] text-gray-400 mt-1">
            Admin Panel
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setSidebarOpen(true)
          }
          className="
            w-10
            h-10
            rounded-lg
            flex
            items-center
            justify-center
            hover:bg-white/10
            transition
          "
          aria-label="Open menu"
        >
          <FiMenu size={23} />
        </button>
      </header>

      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() =>
            setSidebarOpen(false)
          }
          className="
            fixed
            inset-0
            bg-black/50
            z-40
            lg:hidden
            cursor-default
          "
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside
        className={`
          fixed
          top-0
          bottom-0
          left-0
          z-50
          w-64
          bg-ignitron-navy
          text-white
          flex
          flex-col
          transition-transform
          duration-300
          ease-in-out
          ${
            sidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          }
          lg:translate-x-0
        `}
      >

        {/* =================================================
            SIDEBAR HEADER
        ================================================== */}
        <div
          className="
            h-20
            px-6
            border-b
            border-white/10
            flex
            items-center
            justify-between
            shrink-0
          "
        >
          <div>
            <p className="font-extrabold text-lg">
              IGNITRON
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Admin Panel
            </p>
          </div>

          {/* Mobile close */}
          <button
            type="button"
            onClick={() =>
              setSidebarOpen(false)
            }
            className="
              lg:hidden
              w-9
              h-9
              rounded-lg
              flex
              items-center
              justify-center
              hover:bg-white/10
              transition
            "
            aria-label="Close menu"
          >
            <FiX size={21} />
          </button>
        </div>

        {/* =================================================
            NAVIGATION
        ================================================== */}
        <nav
          className="
            flex-1
            p-4
            space-y-1
            overflow-y-auto
          "
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-lg
                text-sm
                font-medium
                transition-colors
                ${
                  isActive
                    ? 'bg-ignitron-orange text-white'
                    : 'text-gray-300 hover:bg-white/10'
                }
                `
              }
            >
              <span className="text-lg shrink-0">
                {link.icon}
              </span>

              <span className="truncate">
                {link.label}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* =================================================
            USER / LOGOUT
        ================================================== */}
        <div
          className="
            p-4
            border-t
            border-white/10
            shrink-0
          "
        >
          <p
            className="
              text-xs
              text-gray-400
              mb-3
              truncate
            "
            title={admin?.email}
          >
            {admin?.email}
          </p>

          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-gray-300
              hover:text-white
              transition-colors
            "
          >
            <FiLogOut />

            <span>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <main
        className="
          min-h-screen
          lg:ml-64
          pt-16
          lg:pt-0
        "
      >
        <div
          className="
            p-4
            sm:p-6
            md:p-8
            lg:p-10
            min-w-0
          "
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;