// pages/library.tsx
'use client';
import React from 'react';
import { useLibrary } from '@/context/LibraryContext';

export default function LibraryPage() {
  const { library } = useLibrary();

  return (
    <div className="flex flex-wrap gap-4">
      {library.map((reference) => (
        <div key={reference._id} className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{reference.Title}</h2>
            <p>{reference.Abstract}</p>
            <div className="card-actions justify-end">
              <a href={reference.URL} className="btn btn-primary">More</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
