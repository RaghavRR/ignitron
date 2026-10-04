import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

import {
  FiImage,
  FiFolder,
  FiUsers,
  FiMessageSquare,
  FiPackage,
  FiArrowRight,
  FiPlus,
  FiExternalLink,
  FiRefreshCw,
  FiBarChart2,
  FiSettings,
} from 'react-icons/fi';

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    images: 0,
    projects: 0,
    leads: 0,
    kits: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      const results = await Promise.allSettled([
        api.get('/images'),
        api.get('/projects/admin/all'),
        api.get('/leads'),
        api.get('/kits/admin/all'),
      ]);

      const [
        images,
        projects,
        leads,
        kits,
      ] = results;

      setCounts({
        images:
          images.status === 'fulfilled'
            ? Array.isArray(images.value.data)
              ? images.value.data.length
              : images.value.data?.data?.length || 0
            : 0,

        projects:
          projects.status === 'fulfilled'
            ? Array.isArray(projects.value.data)
              ? projects.value.data.length
              : projects.value.data?.data?.length || 0
            : 0,

        leads:
          leads.status === 'fulfilled'
            ? Array.isArray(leads.value.data)
              ? leads.value.data.length
              : leads.value.data?.data?.length || 0
            : 0,

        kits:
          kits.status === 'fulfilled'
            ? Array.isArray(kits.value.data)
              ? kits.value.data.length
              : kits.value.data?.data?.length || 0
            : 0,
      });

      const failedRequests = results.filter(
        (result) => result.status === 'rejected'
      );

      if (failedRequests.length === results.length) {
        setError('Unable to load dashboard data.');
      }
    } catch (err) {
      console.error('Dashboard error:', err);
      setError('Unable to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const cards = [
    {
      label: 'Editable Photos',
      value: counts.images,
      icon: <FiImage />,
      to: '/admin/images',
      description: 'Website images',
      iconBg: 'bg-orange-50',
      iconColor: 'text-ignitron-orange',
    },
    {
      label: 'Projects',
      value: counts.projects,
      icon: <FiFolder />,
      to: '/admin/projects',
      description: 'Published projects',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      label: 'STEM Kits',
      value: counts.kits,
      icon: <FiPackage />,
      to: '/admin/kits',
      description: 'Products & learning kits',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      label: 'Leads',
      value: counts.leads,
      icon: <FiUsers />,
      to: '/admin/leads',
      description: 'Customer enquiries',
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
    },
  ];

  const quickActions = [
    {
      title: 'Add New Kit',
      description: 'Add a STEM kit to your store',
      icon: <FiPackage />,
      to: '/admin/kits/new',
    },
    {
      title: 'Add Project',
      description: 'Create a new project',
      icon: <FiFolder />,
      to: '/admin/projects/new',
    },
    {
      title: 'Add Resource',
      description: 'Publish a learning resource',
      icon: <FiPlus />,
      to: '/admin/resources/new',
    },
    {
      title: 'View Website',
      description: 'Open public website',
      icon: <FiExternalLink />,
      to: '/',
      external: true,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-8">

        <div>
          <p className="text-sm font-semibold text-ignitron-orange mb-1">
            ADMIN PANEL
          </p>

          <h1
            className="
              text-2xl
              sm:text-3xl
              font-extrabold
              text-ignitron-navy
            "
          >
            Dashboard
          </h1>

          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Manage and monitor your IGNITRON website from one place.
          </p>
        </div>

        <button
          onClick={fetchDashboardData}
          disabled={loading}
          className="
            self-start
            md:self-auto
            inline-flex
            items-center
            justify-center
            gap-2
            px-4
            py-2.5
            rounded-xl
            bg-white
            border
            border-gray-200
            text-sm
            font-semibold
            text-gray-700
            hover:border-gray-300
            hover:shadow-sm
            transition
            disabled:opacity-60
          "
        >
          <FiRefreshCw
            className={loading ? 'animate-spin' : ''}
          />

          Refresh
        </button>

      </div>

      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && (
        <div
          className="
            mb-6
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





      {/* =====================================================
          STAT CARDS
      ====================================================== */}

      <div className="mb-10">

        <div className="flex items-center justify-between mb-5">

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-ignitron-navy">
              Website Overview
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Current content and activity
            </p>
          </div>

          <FiBarChart2
            className="text-gray-400"
            size={21}
          />

        </div>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-5
            gap-4
          "
        >
          {cards.map((card) => (
            <Link
              key={card.label}
              to={card.to}
              className="
                group
                bg-white
                rounded-2xl
                p-5
                border
                border-gray-100
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-0.5
                transition-all
              "
            >

              <div className="flex items-start justify-between">

                <div
                  className={`
                    w-11
                    h-11
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    text-xl
                    ${card.iconBg}
                    ${card.iconColor}
                  `}
                >
                  {card.icon}
                </div>

                <FiArrowRight
                  className="
                    text-gray-300
                    group-hover:text-ignitron-orange
                    group-hover:translate-x-1
                    transition-all
                  "
                />

              </div>

              <div className="mt-5">

                <p
                  className="
                    text-3xl
                    font-extrabold
                    text-ignitron-navy
                  "
                >
                  {loading ? (
                    <span
                      className="
                        inline-block
                        w-10
                        h-8
                        bg-gray-100
                        rounded
                        animate-pulse
                      "
                    />
                  ) : (
                    card.value
                  )}
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  {card.label}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {card.description}
                </p>

              </div>

            </Link>
          ))}
        </div>

      </div>

      {/* =====================================================
          QUICK ACTIONS
      ====================================================== */}

      <div>

        <div className="mb-5">

          <h2 className="text-lg sm:text-xl font-bold text-ignitron-navy">
            Quick Actions
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Quickly create or access important sections.
          </p>

        </div>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-4
          "
        >
          {quickActions.map((action) => {

            const content = (
              <>
                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-gray-50
                    text-ignitron-navy
                    flex
                    items-center
                    justify-center
                    text-xl
                    group-hover:bg-orange-50
                    group-hover:text-ignitron-orange
                    transition
                  "
                >
                  {action.icon}
                </div>

                <div className="flex-1 min-w-0">

                  <p className="font-semibold text-gray-800">
                    {action.title}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {action.description}
                  </p>

                </div>

                <FiArrowRight
                  className="
                    text-gray-300
                    group-hover:text-ignitron-orange
                    group-hover:translate-x-1
                    transition-all
                    shrink-0
                  "
                />
              </>
            );

            if (action.external) {
              return (
                <a
                  key={action.title}
                  href={action.to}
                  className="
                    group
                    bg-white
                    rounded-2xl
                    p-5
                    border
                    border-gray-100
                    flex
                    items-center
                    gap-4
                    hover:shadow-md
                    hover:border-gray-200
                    transition-all
                  "
                >
                  {content}
                </a>
              );
            }

            return (
              <Link
                key={action.title}
                to={action.to}
                className="
                  group
                  bg-white
                  rounded-2xl
                  p-5
                  border
                  border-gray-100
                  flex
                  items-center
                  gap-4
                  hover:shadow-md
                  hover:border-gray-200
                  transition-all
                "
              >
                {content}
              </Link>
            );
          })}
        </div>

      </div>

      {/* =====================================================
          FOOTER INFO
      ====================================================== */}

      <div
        className="
          mt-10
          pt-6
          border-t
          border-gray-200
          flex
          flex-col
          sm:flex-row
          items-start
          sm:items-center
          justify-between
          gap-3
        "
      >

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FiSettings />
          <span>
            IGNITRON Admin Management System
          </span>
        </div>

        <Link
          to="/"
          className="
            text-sm
            font-semibold
            text-ignitron-orange
            hover:underline
          "
        >
          Visit Website →
        </Link>

      </div>

    </div>
  );
};

export default AdminDashboard;