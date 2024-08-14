// pages/toolcard.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { Reference } from '@/types';
import { useLibrary } from '@/context/LibraryContext';

const fetchReferences = async (): Promise<Reference[]> => {
  const res = await fetch('http://127.0.0.1:8000/api/references/');
  
  if (!res.ok) {
    throw new Error('Failed to fetch references');
  }

  const data = await res.json();
  return data;
};

const ToolCard = () => {
  const { library, toggleSave } = useLibrary();
  const [references, setReferences] = useState<Reference[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReferences();
        setReferences(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap gap-1 justify-center ">
      {references.map((reference: Reference) => (
        <div key={reference._id} className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{reference.Title}</h2>
            <p>{reference.Abstract}</p>
            <div className="card-actions justify-end">
              <a href={reference.URL} className="btn btn-primary">More</a>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">
                    {library.find(item => item._id === reference._id) ? 'Unsave' : 'Save'}
                  </span>
                  <input 
                    type="checkbox" 
                    checked={!!library.find(item => item._id === reference._id)}
                    onChange={() => toggleSave(reference)} 
                    className="checkbox checkbox-secondary" 
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToolCard;
