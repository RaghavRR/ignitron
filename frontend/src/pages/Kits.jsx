import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import SectionHeader from '../components/SectionHeader';
import { getPublicKits } from '../api/kits';

// IMPORTANT:
// kits.jpeg should be inside:
// src/images/kits.jpeg
import defaultKitImage from '../images/kits.jpeg';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getBackendBaseUrl = () => {
  return API_BASE_URL.replace(/\/api\/?$/, '');
};

// Convert different image formats into a usable browser URL
const getKitImageUrl = (image) => {
  if (!image || typeof image !== 'string') {
    return defaultKitImage;
  }

  const value = image.trim();

  if (!value) {
    return defaultKitImage;
  }

  // Base64 / uploaded image
  if (value.startsWith('data:image/')) {
    return value;
  }

  // External image
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  // Backend uploaded image
  if (value.startsWith('/uploads/')) {
    return `${getBackendBaseUrl()}${value}`;
  }

  // Frontend public path
  if (value.startsWith('/')) {
    return value;
  }

  return defaultKitImage;
};

const Kits = () => {
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchKits = async () => {
      try {
        setError('');

        const result = await getPublicKits();

        setKits(result?.data || []);
      } catch (err) {
        console.error('Failed to fetch kits:', err);

        setError(
          err.message || 'Failed to load STEM kits'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchKits();
  }, []);

  return (
    <>
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="bg-white section">
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* LEFT */}
          <div className="min-w-0">
            <p className="eyebrow mb-2">
              DIY STEM Kits
            </p>

            <h1 className="heading-lg mb-5 break-words">
              Structured, Hands-On Learning Solutions.
            </h1>

            <p className="text-gray-600 text-base sm:text-lg leading-7 sm:leading-8 mb-8 max-w-2xl">
              Our kits are more than products — they're a
              complete learning pathway for experimentation,
              building and real project development.
            </p>

            <a
              href="#available-kits"
              className="btn-primary inline-flex"
            >
              Explore Kits
            </a>
          </div>

          {/* RIGHT - DEFAULT IMAGE */}
          <div className="w-full min-w-0">
            <img
              src={defaultKitImage}
              alt="IGNITRON STEM Kits"
              className="
                w-full
                aspect-[4/3]
                sm:aspect-[16/10]
                lg:aspect-[4/3]
                object-cover
                rounded-2xl
                shadow-lg
              "
            />
          </div>

        </div>
      </section>

      {/* =====================================================
          DYNAMIC KITS
      ====================================================== */}
      <section
        id="available-kits"
        className="section bg-ignitron-light"
      >
        <div className="container-max">

          <SectionHeader
            title="Explore Our STEM Kits"
            subtitle="Choose from our hands-on learning kits designed for real-world experimentation."
          />

          {/* LOADING */}
          {loading && (
            <div className="text-center py-16">
              <p className="text-gray-500">
                Loading kits...
              </p>
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="text-center py-16">
              <p className="text-red-500">
                {error}
              </p>
            </div>
          )}

          {/* EMPTY */}
          {!loading &&
            !error &&
            kits.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">
                  Our STEM kits are coming soon.
                </p>
              </div>
            )}

          {/* KITS */}
          {!loading &&
            !error &&
            kits.length > 0 && (
              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  xl:grid-cols-3
                  gap-5
                  sm:gap-6
                  lg:gap-8
                "
              >
                {kits.map((kit) => {
                  const imageUrl =
                    getKitImageUrl(kit.image);

                  return (
                    <article
                      key={kit._id}
                      className="
                        min-w-0
                        bg-white
                        rounded-2xl
                        overflow-hidden
                        shadow-sm
                        hover:shadow-lg
                        transition-shadow
                        flex
                        flex-col
                      "
                    >
                      {/* IMAGE */}
                      <Link
                        to={`/kits/${kit.slug}`}
                        className="block overflow-hidden"
                      >
                        <img
                          src={imageUrl}
                          alt={kit.name || 'STEM Kit'}
                          className="
                            w-full
                            aspect-[4/3]
                            object-cover
                          "
                          onError={(event) => {
                            if (
                              event.currentTarget.src !==
                              defaultKitImage
                            ) {
                              event.currentTarget.src =
                                defaultKitImage;
                            }
                          }}
                        />
                      </Link>

                      {/* CONTENT */}
                      <div
                        className="
                          p-5
                          sm:p-6
                          flex
                          flex-col
                          flex-1
                        "
                      >
                        <p className="text-sm text-ignitron-orange font-semibold mb-2">
                          {kit.category || 'STEM'}
                        </p>

                        <h3
                          className="
                            font-bold
                            text-xl
                            mb-2
                            break-words
                          "
                        >
                          {kit.name}
                        </h3>

                        <p
                          className="
                            text-gray-600
                            mb-5
                            line-clamp-3
                            break-words
                          "
                        >
                          {kit.shortDescription}
                        </p>

                        {/* PRICE + BUTTON */}
                        <div
                          className="
                            mt-auto
                            flex
                            flex-col
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                            gap-4
                          "
                        >
                          <span className="font-bold text-xl">
                            ₹
                            {Number(
                              kit.price || 0
                            ).toLocaleString('en-IN')}
                          </span>

                          <Link
                            to={`/kits/${kit.slug}`}
                            className="
                              btn-primary
                              inline-flex
                              justify-center
                              text-center
                              w-full
                              sm:w-auto
                            "
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

        </div>
      </section>

      {/* =====================================================
          INFORMATION
      ====================================================== */}
      <section className="section bg-white">
        <div
          className="
            container-max
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
            lg:gap-8
          "
        >
          <div className="card p-6 sm:p-8">
            <h3 className="font-bold text-xl mb-4">
              What's Included
            </h3>

            <ul className="text-gray-600 space-y-2 list-disc list-inside">
              <li>
                Complete component inventory
              </li>

              <li>
                Step-by-step project guides
              </li>

              <li>
                Access to the IGNITRON Project Library
              </li>

              <li>
                Sample project videos and support material
              </li>
            </ul>
          </div>

          <div className="card p-6 sm:p-8">
            <h3 className="font-bold text-xl mb-4">
              Skills Developed
            </h3>

            <ul className="text-gray-600 space-y-2 list-disc list-inside">
              <li>
                Circuit design and electronics fundamentals
              </li>

              <li>
                Programming and logical thinking
              </li>

              <li>
                Sensor and actuator integration
              </li>

              <li>
                Problem-solving through real builds
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Kits;