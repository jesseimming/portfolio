"use client";

import React, { useState, useEffect } from "react";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { useContentful } from "@/lib/useContentful"; 
import { useActiveSectionContext } from "@/context/active-section-context";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export default function Skills() {
  const { ref } = useSectionInView("Skills");
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

  const experienceSkills = mappedData["experience-skills"];
  const skillsData: string[] = experienceSkills?.fields?.text1?.split(" ") || [];

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>My skills</SectionHeading>
      <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
        {skillsData.map((skill: string, index: number) => (
          <motion.li
            className="bg-white borderBlack rounded-xl px-5 py-3 dark:bg-white/10 dark:text-white/80"
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}