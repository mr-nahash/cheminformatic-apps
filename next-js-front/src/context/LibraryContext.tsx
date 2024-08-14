// context/LibraryContext.tsx
'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Reference } from '@/types';
import { getSavedLibrary, saveReference, removeReference } from '@/utilis/localStorage';

interface LibraryContextType {
  library: Reference[];
  toggleSave: (reference: Reference) => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [library, setLibrary] = useState<Reference[]>([]);

  useEffect(() => {
    setLibrary(getSavedLibrary());
  }, []);

  const toggleSave = (reference: Reference) => {
    const isSaved = library.find(item => item._id === reference._id);
    if (isSaved) {
      removeReference(reference._id);
      setLibrary(library.filter(item => item._id !== reference._id));
      console.log('LibraryProvider initialized');

    } else {
      saveReference(reference);
      setLibrary([...library, reference]);
    }
  };

  return (
    <LibraryContext.Provider value={{ library, toggleSave }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};

