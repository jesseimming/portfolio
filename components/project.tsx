"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useContentful } from "@/lib/useContentful";

type ProjectProps = {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
};

export default function Project() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const { data: cmsapi, loading, error } = useContentful("cmsapi");
  const [projects, setProjects] = useState<ProjectProps[]>([]);

  useEffect(() => {
    if (cmsapi && cmsapi.length > 0) {
      
      const filteredProjects = cmsapi
        .filter((entry: any) => entry.fields.slug.startsWith("project")) 
        .map((entry: any) => ({
          title: entry.fields.title,
          description: entry.fields.longtext1,
          tags: entry.fields.text1.split(" "),
          imageUrl: `https:${entry.fields.thumbnail.fields.file.url}`,
        }));

      setProjects(filteredProjects);
    }
  }, [cmsapi]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading content</div>;
  if (!projects.length) return <div>No projects available</div>;

  return (
    <div ref={ref}>
      {projects.map((project, index) => (
        <motion.div
          key={project.title + index} 
          style={{
            scale: scaleProgress,
            opacity: opacityProgress,
          }}
          className="group mb-3 sm:mb-8 last:mb-0"
        >
          <section className="bg-gray-100 max-w-[42rem] border border-black/5 rounded-lg overflow-hidden sm:pr-8 relative sm:h-[20rem] hover:bg-gray-200 transition sm:group-even:pl-8 dark:text-white dark:bg-white/10 dark:hover:bg-white/20">
            <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem]">
              <h3 className="text-2xl font-semibold">{project.title}</h3>
              <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">
                {project.description}
              </p>
              <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto">
                {project.tags.map((tag, tagIndex) => (
                  <li
                    className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                    key={tagIndex}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <Image
              src={project.imageUrl}
              alt={`Image of ${project.title}`}
              quality={95}
              width={420}
              height={500}
              className="absolute hidden sm:block top-8 -right-40 w-[28.25rem] rounded-t-lg shadow-2xl
              transition 
              group-hover:scale-[1.04]
              group-hover:-translate-x-3
              group-hover:translate-y-3
              group-hover:-rotate-2
              group-even:group-hover:translate-x-3
              group-even:group-hover:translate-y-3
              group-even:group-hover:rotate-2
              group-even:right-[initial] group-even:-left-40"
            />
          </section>
        </motion.div>
      ))}
    </div>
  );
}
