import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Reference } from "../types";

async function fetchReferences(): Promise<Reference[]> {
  const res = await fetch('http://127.0.0.1:8000/api/references/');
  if (!res.ok) {
      throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function HomePage() {
  const references = await fetchReferences();

  return (
      <div>
          <h1>References</h1>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
              {references.map((reference) => (
                  <li key={reference._id} style={{ marginBottom: '20px' }}>
                      <a href={reference.URL} style={{ textDecoration: 'none', color: 'blue' }}>
                          <h2 style={{ margin: 0 }}>{reference.Title}</h2>
                      </a>
                      <p>{reference.Abstract}</p>
                  </li>
              ))}
          </ul>
      </div>
  );
}