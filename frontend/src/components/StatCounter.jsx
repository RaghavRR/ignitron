import React, { useEffect, useRef, useState } from 'react';

const StatCounter = ({ value, suffix = '+', label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const start = performance.now();
          const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            setCount(Math.floor(progress * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-extrabold text-white">
        {count}
        <span className="text-ignitron-orange">{suffix}</span>
      </p>
      <p className="text-gray-300 mt-2 font-medium">{label}</p>
    </div>
  );
};

export default StatCounter;
