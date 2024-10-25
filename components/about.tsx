"use client";

import React, { useState, useEffect } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { useContentful } from "@/lib/useContentful";

export default function About() {
  const { ref } = useSectionInView("About");
  const { data: cmsapi, loading, error } = useContentful("cmsapi");
  const [mappedData, setMappedData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    if (cmsapi && cmsapi.length > 0) {
      const dataMap = cmsapi.reduce((acc: any, entry: any) => {
        acc[entry.fields.slug] = entry;
        return acc;
      }, {});
      setMappedData(dataMap);
    }
  }, [cmsapi]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading content</div>;
  if (!cmsapi || cmsapi.length === 0) return <div>No content available</div>;

  const aboutme = mappedData["about-me"];

  // Add checks for undefined before accessing fields
  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      {aboutme && aboutme.fields ? (
        <>
          <p className="mb-3">
            {aboutme.fields.longtext1}
          </p>
          <p>
            {aboutme.fields.longtext2}
          </p>
        </>
      ) : (
        <p>No content available for About Me</p>
      )}
    </motion.section>
  );
}
