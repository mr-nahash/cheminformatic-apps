'use client';
import React, { useEffect, useState } from 'react';
import { Reference } from '@/types';
import { useLibrary } from '@/context/LibraryContext';
import Link from 'next/link';

const fetchReferences = async (): Promise<Reference[]> => {
  const res = await fetch('http://127.0.0.1:8000/api/pubmed_index/');
  
  if (!res.ok) {
    throw new Error('Failed to fetch references');
  }

  const data = await res.json();
  return data;
};

const ToolCard = () => {
  const { library, toggleSave } = useLibrary();
  const [references, setReferences] = useState<Reference[]>([]);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

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

  const toggleExpand = (id: string) => {
    setExpandedCardId(prevId => (prevId === id ? null : id));
  };

  return (
    <div className="flex flex-wrap gap-1 justify-center ">
      {references.map((reference: Reference) => {
        const isExpanded = expandedCardId === reference._id;

        return (
          <div 
            key={reference._id} 
            className={`card bg-base-100 w-96 shadow-xl transition-all duration-300 ${
              isExpanded ? 'fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-3/4' : 'relative'
            }`}
            style={isExpanded ? { height: 'auto', zIndex: 50 } : { height: 'auto', zIndex: 1 }}
          >
            <div className="card-body">
              <h2 className="card-title">{reference.title}</h2>
              <p>
                {isExpanded ? reference.abstract : `${reference.abstract.substring(0, 100)}...`}
              </p>
              <button
                className="btn btn-link"
                onClick={() => toggleExpand(reference._id)}
              >
                {isExpanded ? 'Show Less' : 'Read More'}
              </button>
              <div className="card-actions justify-end">
                <Link href={reference.doi} className="btn btn-primary">Visit paper</Link>
                <Link href={reference.tool_url} className="btn btn-primary">See tool</Link>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text">
                      {library.find(item => item._id === reference._id) ? 'safed' : 'safe?'}
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
        );
      })}
    </div>
  );
};

export default ToolCard;
