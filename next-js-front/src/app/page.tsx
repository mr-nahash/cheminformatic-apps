import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ToolCard from "@/components/AppListing/ToolCard";
import Hero from "@/components/Hero";


export default async function HomePage() {
  
  return (
    <div>
        <Hero></Hero>
        <ToolCard></ToolCard>
    </div>
          
  );
}