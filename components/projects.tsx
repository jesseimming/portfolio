"use client";

import React, { useMemo } from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);

  const uniqueProjects = useMemo(() => {
    const uniqueSlugs = new Set();
    return projectsData.filter((project) => {
      if (!uniqueSlugs.has(project.slug)) {
        uniqueSlugs.add(project.slug);
        return true;
      }
      return false;
    });
  }, [projectsData]);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading>My projects</SectionHeading>
      <div>
        {uniqueProjects.length === 0 ? (
          <p>No projects available</p>
        ) : (
          uniqueProjects.map((project, index) => (
            <React.Fragment key={index}>
              <Project {...project} />
            </React.Fragment>
          ))
        )}
      </div>
    </section>
  );
}