// utils/localStorage.ts
import { Reference } from '@/types';

const LIBRARY_KEY = 'userLibrary';

export const getSavedLibrary = (): Reference[] => {
  const savedLibrary = localStorage.getItem(LIBRARY_KEY);
  return savedLibrary ? JSON.parse(savedLibrary) : [];
};

export const saveReference = (reference: Reference) => {
  const currentLibrary = getSavedLibrary();
  const updatedLibrary = [...currentLibrary, reference];
  localStorage.setItem(LIBRARY_KEY, JSON.stringify(updatedLibrary));
};

export const removeReference = (id: string) => {
  const currentLibrary = getSavedLibrary();
  const updatedLibrary = currentLibrary.filter(ref => ref._id !== id);
  localStorage.setItem(LIBRARY_KEY, JSON.stringify(updatedLibrary));
};
