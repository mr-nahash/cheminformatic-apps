import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ToolCard from "../../components/AppListing/CardSSR";


export default async function HomePage() {
  
  return (
          <ToolCard></ToolCard>
  );
}