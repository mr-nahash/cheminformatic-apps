import React from 'react';
import { Reference } from '@/types';

const fetchReferences = async () => {
  const res = await fetch('http://127.0.0.1:8000/api/references/');
  
  if (!res.ok) {
    throw new Error('Failed to fetch references');
  }

  return res.json();
};

const ToolCard = async () => {
  const references = await fetchReferences();

  return (
      <div className="flex flex-wrap gap-4">
        {references.map((reference) => (
          <div key={reference._id} className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{reference.Title}</h2>
              <p>{reference._id}</p>
              <p>{reference.Abstract}</p>

              <div className="card-actions justify-end">
                <a href={reference.URL} className="btn btn-primary">Read More</a>
              </div>
            </div>
          </div>
        ))}
      </div>
  );
};

export default ToolCard;

