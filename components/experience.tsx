"use client";

import React, { useEffect, useState, useRef } from "react";
import SectionHeading from "./section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/context/theme-context";
import { useContentful } from "@/lib/useContentful";

// Type definition for ExperienceProps
type ExperienceProps = {
  title: string;
  description: string;
  date: string;
  location?: string;
};

export default function Experience() {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  // Fetch experiences data from Contentful
  const { data: cmsapi, loading, error } = useContentful("cmsapi");
  const [experiences, setExperiences] = useState<ExperienceProps[]>([]);

  useEffect(() => {
    if (cmsapi && cmsapi.length > 0) {
      const filteredExperiences = cmsapi
        .filter((entry: any) => entry.fields.slug.startsWith("experiences"))
        .map((entry: any) => ({
          title: entry.fields.title,
          description: entry.fields.text2,
          date: entry.fields.text3,
          location: entry.fields.location,
        }));
      setExperiences(filteredExperiences);
    }
  }, [cmsapi]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading content</div>;
  if (!experiences.length) return <div>No experiences available</div>;

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>My Experience</SectionHeading>
      <VerticalTimeline lineColor="">
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.title + index}
            style={{
              scale: scaleProgress,
              opacity: opacityProgress,
            }}
          >
            <VerticalTimelineElement
              contentStyle={{
                background:
                  theme === "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
                boxShadow: "none",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                textAlign: "left",
                padding: "1.3rem 2rem",
              }}
              contentArrowStyle={{
                borderRight:
                  theme === "light"
                    ? "0.4rem solid #9ca3af"
                    : "0.4rem solid rgba(255, 255, 255, 0.5)",
              }}
              date={experience.date}
              iconStyle={{
                background:
                  theme === "light" ? "white" : "rgba(255, 255, 255, 0.15)",
                fontSize: "1.5rem",
              }}
            >
              <h3 className="font-semibold capitalize">{experience.title}</h3>
              {experience.location && (
                <p className="font-normal">{experience.location}</p>
              )}
              <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75">
                {experience.description}
              </p>
            </VerticalTimelineElement>
          </motion.div>
        ))}
      </VerticalTimeline>
    </section>
  );
}
