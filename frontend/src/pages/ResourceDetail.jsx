import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api, { resolveAsset } from '../api/axios';
import Loader from '../components/Loader';

const ResourceDetail = () => {
  const { slug } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/resources/${slug}`).then(({ data }) => setResource(data)).catch(() => setResource(null)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loader />;
  if (!resource) return <p className="text-center py-24 text-gray-500">Resource not found.</p>;

  return (
    <article className="section bg-white">
      <div className="container-max max-w-3xl mx-auto">
        <span className="eyebrow">{resource.category}</span>
        <h1 className="heading-lg mt-3 mb-6">{resource.title}</h1>
        {resource.coverImage && (
          <img src={resolveAsset(resource.coverImage)} alt={resource.title} className="rounded-2xl w-full h-[340px] object-cover mb-8 shadow-lg" />
        )}
        <div className="prose max-w-none text-gray-700 whitespace-pre-line leading-relaxed">{resource.content}</div>
        {resource.fileUrl && (
          <a href={resolveAsset(resource.fileUrl)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 inline-flex">
            Download Resource
          </a>
        )}
      </div>
    </article>
  );
};

export default ResourceDetail;
