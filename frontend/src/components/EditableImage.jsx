import React, { useEffect, useState } from 'react';
import api, { resolveAsset } from '../api/axios';

/**
 * Renders an image whose source is controlled by the admin panel.
 * Every editable photo on the site uses this component with a unique `keyName`,
 * matching a SiteImage document in the backend. The admin can replace the photo
 * for that slot from /admin/images without touching any code.
 */
const EditableImage = ({ keyName, alt, className = '', fallback = 'https://placehold.co/1200x800/1a1f2e/f97316?text=IGNITRON' }) => {
  const [src, setSrc] = useState(fallback);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    api
      .get(`/images/${keyName}`)
      .then(({ data }) => {
        if (mounted) setSrc(resolveAsset(data.imageUrl));
      })
      .catch(() => {
        if (mounted) setSrc(fallback);
      })
      .finally(() => mounted && setLoaded(true));
    return () => { mounted = false; };
  }, [keyName]);

  return (
    <img
      src={src}
      alt={alt || keyName}
      loading="lazy"
      className={`${className} ${loaded ? '' : 'animate-pulse bg-gray-200'}`}
    />
  );
};

export default EditableImage;
