"use client";
import React, { useEffect, useState } from 'react';
import { Reference } from '@/types';

const fetchReferences = async (): Promise<Reference[]> => {
  const res = await fetch('http://127.0.0.1:8000/api/references/');
  
  if (!res.ok) {
    throw new Error('Failed to fetch references');
  }

  const data = await res.json();
  return data;
};

const ToolCard = () => {
  const [references, setReferences] = useState<Reference[]>([]);
  const [savedReferences, setSavedReferences] = useState<Set<string>>(new Set());

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

  const toggleSave = (id: string) => {
    setSavedReferences((prev) => {
      const newSavedReferences = new Set(prev);
      if (newSavedReferences.has(id)) {
        newSavedReferences.delete(id);
      } else {
        newSavedReferences.add(id);
      }
      return newSavedReferences;
    });
  };

  return (
    <div className="flex flex-wrap gap-4">
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
                    {savedReferences.has(reference._id) ? 'Unsave' : 'Save'}
                  </span>
                  <input 
                    type="checkbox" 
                    checked={savedReferences.has(reference._id)}
                    onChange={() => toggleSave(reference._id)} 
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
