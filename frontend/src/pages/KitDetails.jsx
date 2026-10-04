import React, {
  useEffect,
  useState,
} from 'react';

import {
  Link,
  useParams,
} from 'react-router-dom';

import { getKitBySlug } from '../api/kits';
import { createKitWhatsAppUrl } from '../utils/whatsapp';

import defaultKitImage from '../images/kits.jpeg';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getBackendBaseUrl = () => {
  return API_BASE_URL.replace(/\/api\/?$/, '');
};

// =====================================================
// IMAGE HELPER
// =====================================================

const getKitImageUrl = (image) => {
  if (
    !image ||
    typeof image !== 'string'
  ) {
    return defaultKitImage;
  }

  const value = image.trim();

  if (!value) {
    return defaultKitImage;
  }

  // External URL
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

  // Invalid image value
  return defaultKitImage;
};

// =====================================================
// YOUTUBE
// =====================================================

const getYoutubeEmbedUrl = (url) => {
  if (!url) return '';

  try {
    const parsed = new URL(
      url.trim()
    );

    // youtu.be/VIDEO_ID
    if (
      parsed.hostname.includes(
        'youtu.be'
      )
    ) {
      const videoId =
        parsed.pathname
          .split('/')
          .filter(Boolean)[0];

      return videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : '';
    }

    // youtube.com/watch?v=VIDEO_ID
    if (
      parsed.hostname.includes(
        'youtube.com'
      ) ||
      parsed.hostname.includes(
        'youtube-nocookie.com'
      )
    ) {
      const videoId =
        parsed.searchParams.get('v');

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      // Already embed URL
      if (
        parsed.pathname.startsWith(
          '/embed/'
        )
      ) {
        return url;
      }
    }

    return url;
  } catch {
    return '';
  }
};

// =====================================================
// COMPONENT
// =====================================================

const KitDetails = () => {
  const { slug } = useParams();

  const [kit, setKit] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  // ===================================================
  // FETCH KIT
  // ===================================================

  useEffect(() => {
    const fetchKit = async () => {
      try {
        setLoading(true);
        setError('');

        const result =
          await getKitBySlug(slug);

        if (
          !result?.success ||
          !result?.data
        ) {
          throw new Error(
            'The requested kit is not available.'
          );
        }

        setKit(result.data);
      } catch (err) {
        console.error(
          'Failed to fetch kit:',
          err
        );

        setError(
          err.message ||
            'Kit not found'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchKit();
  }, [slug]);

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <section className="section">
        <div className="container-max text-center py-10">
          <p className="text-gray-500">
            Loading kit...
          </p>
        </div>
      </section>
    );
  }

  // ===================================================
  // ERROR
  // ===================================================

  if (error || !kit) {
    return (
      <section className="section">
        <div className="container-max text-center py-10">

          <h1 className="text-2xl font-bold mb-4">
            Kit Not Found
          </h1>

          <p className="text-gray-500 mb-6">
            {error ||
              'The requested kit is not available.'}
          </p>

          <Link
            to="/kits"
            className="btn-primary inline-flex justify-center"
          >
            Back to Kits
          </Link>

        </div>
      </section>
    );
  }

  const imageUrl =
    getKitImageUrl(
      kit.image
    );

  const videoUrl =
    getYoutubeEmbedUrl(
      kit.videoUrl
    );

  const hasOriginalPrice =
    kit.originalPrice !== null &&
    kit.originalPrice !== undefined &&
    kit.originalPrice !== '' &&
    Number(kit.originalPrice) > 0;

  // ===================================================
  // UI
  // ===================================================

  return (
    <main className="overflow-x-hidden">

      {/* =================================================
          PRODUCT HERO
      ================================================== */}

      <section className="section bg-white">

        <div className="container-max">

          {/* BACK */}
          <Link
            to="/kits"
            className="
              inline-flex
              text-sm
              text-gray-500
              hover:text-black
              mb-6
            "
          >
            ← Back to Kits
          </Link>

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-8
              lg:gap-12
              items-start
            "
          >

            {/* =================================================
                IMAGE
            ================================================== */}

            <div className="w-full min-w-0">

              <div
                className="
                  w-full
                  overflow-hidden
                  rounded-2xl
                  shadow-lg
                  bg-gray-100
                "
              >

                <img
                  src={imageUrl}
                  alt={
                    kit.name ||
                    'STEM Kit'
                  }
                  className="
                    w-full
                    aspect-[4/3]
                    sm:aspect-[16/10]
                    lg:aspect-[4/3]
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

              </div>

            </div>

            {/* =================================================
                DETAILS
            ================================================== */}

            <div
              className="
                min-w-0
                lg:pt-4
              "
            >

              <p className="eyebrow mb-3">
                {kit.category ||
                  'DIY STEM KIT'}
              </p>

              <h1
                className="
                  heading-lg
                  mb-5
                  break-words
                "
              >
                {kit.name}
              </h1>

              <p
                className="
                  text-gray-600
                  text-base
                  sm:text-lg
                  leading-7
                  sm:leading-8
                  mb-6
                  break-words
                "
              >
                {kit.shortDescription}
              </p>

              {/* PRICE */}

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-3
                  sm:gap-4
                  mb-6
                "
              >

                <span
                  className="
                    text-3xl
                    sm:text-4xl
                    font-bold
                  "
                >
                  ₹
                  {Number(
                    kit.price || 0
                  ).toLocaleString(
                    'en-IN'
                  )}
                </span>

                {hasOriginalPrice && (
                  <span
                    className="
                      text-lg
                      sm:text-xl
                      text-gray-400
                      line-through
                    "
                  >
                    ₹
                    {Number(
                      kit.originalPrice
                    ).toLocaleString(
                      'en-IN'
                    )}
                  </span>
                )}

              </div>

              {/* STOCK */}

              {Number(kit.stock) > 0 ? (
                <p className="text-green-600 text-sm mb-5">
                  Available
                </p>
              ) : (
                <p className="text-red-500 text-sm mb-5">
                  Currently unavailable
                </p>
              )}

              {/* WHATSAPP */}

              <a
                href={createKitWhatsAppUrl(kit)}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  btn-primary
                  inline-flex
                  w-full
                  justify-center
                  text-center
                "
              >
                Buy / Enquire on WhatsApp
              </a>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          DESCRIPTION
      ================================================== */}

      <section className="section bg-ignitron-light">

        <div className="container-max">

          <div className="max-w-4xl">

            <h2 className="text-2xl sm:text-3xl font-bold mb-5">
              About This Kit
            </h2>

            <p
              className="
                text-gray-600
                leading-7
                sm:leading-8
                whitespace-pre-line
                break-words
              "
            >
              {kit.description}
            </p>

          </div>

        </div>

      </section>

      {/* =================================================
          FEATURES / INCLUDED / SKILLS
      ================================================== */}

      {(kit.features?.length > 0 ||
        kit.includedItems?.length > 0 ||
        kit.skills?.length > 0) && (

        <section className="section bg-white">

          <div
            className="
              container-max
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-5
              lg:gap-7
            "
          >

            {kit.features?.length > 0 && (
              <InfoBox
                title="Features"
                items={kit.features}
              />
            )}

            {kit.includedItems?.length > 0 && (
              <InfoBox
                title="What's Included"
                items={kit.includedItems}
              />
            )}

            {kit.skills?.length > 0 && (
              <InfoBox
                title="Skills Developed"
                items={kit.skills}
              />
            )}

          </div>

        </section>

      )}

      {/* =================================================
          EDUCATION
      ================================================== */}

      {(kit.ageGroup ||
        kit.classLevel) && (

        <section className="section bg-ignitron-light">

          <div className="container-max">

            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              Recommended For
            </h2>

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-5
                max-w-2xl
              "
            >

              {kit.ageGroup && (
                <div
                  className="
                    bg-white
                    rounded-xl
                    p-5
                    min-w-0
                  "
                >

                  <p className="text-sm text-gray-500 mb-1">
                    Age Group
                  </p>

                  <p className="font-semibold break-words">
                    {kit.ageGroup}
                  </p>

                </div>
              )}

              {kit.classLevel && (
                <div
                  className="
                    bg-white
                    rounded-xl
                    p-5
                    min-w-0
                  "
                >

                  <p className="text-sm text-gray-500 mb-1">
                    Class Level
                  </p>

                  <p className="font-semibold break-words">
                    {kit.classLevel}
                  </p>

                </div>
              )}

            </div>

          </div>

        </section>

      )}

      {/* =================================================
          VIDEO
      ================================================== */}

      {videoUrl && (

        <section className="section bg-white">

          <div className="container-max">

            <h2 className="text-2xl sm:text-3xl font-bold mb-7">
              See It In Action
            </h2>

            <div
              className="
                w-full
                max-w-4xl
                aspect-video
                rounded-2xl
                overflow-hidden
                shadow-lg
              "
            >

              <iframe
                src={videoUrl}
                title={`${kit.name} video`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

            </div>

          </div>

        </section>

      )}

    </main>
  );
};

// =====================================================
// INFO BOX
// =====================================================

const InfoBox = ({
  title,
  items,
}) => {
  return (
    <div
      className="
        card
        p-6
        sm:p-7
        min-w-0
      "
    >

      <h3 className="font-bold text-xl mb-5">
        {title}
      </h3>

      <ul className="space-y-3">

        {items.map(
          (item, index) => (
            <li
              key={`${item}-${index}`}
              className="
                flex
                gap-3
                text-gray-600
                min-w-0
              "
            >

              <span className="text-black font-bold shrink-0">
                ✓
              </span>

              <span
                className="
                  break-words
                  min-w-0
                "
              >
                {item}
              </span>

            </li>
          )
        )}

      </ul>

    </div>
  );
};

export default KitDetails;