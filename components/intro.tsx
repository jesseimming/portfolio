"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useContentful } from "@/lib/useContentful";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

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

  const home = mappedData["home"];

  if (!cmsapi || cmsapi.length === 0) return <div>No content available</div>;

  if (!home) return <div>No content available for home</div>;

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]"
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
          >
            <Image
              src={`https:${home?.fields?.thumbnail?.fields?.file?.url}`}
              alt={home?.fields?.thumbnail?.fields?.title || 'Default Alt Text'}
              width="192"
              height="192"
              quality="95"
              priority={true}
              className="h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl hover:animate-bounce"            />

          </motion.div>

          <motion.span
            className="absolute bottom-0 right-0 text-4xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 125,
              delay: 0.1,
              duration: 0.7,
            }}
          >
            👋
          </motion.span>
        </div>
      </div>

      <motion.h1
        className="mb-10 mt-10 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="font-bold text-5xl">{home.fields.title}</span><div> I'm a{" "}
          <span className="font-bold text-2xl">{home.fields.text1}</span></div> with{" "}
        <span className="font-bold text-2xl">{home.fields.text2}</span> of experience. <div>I enjoy
          building <span className="italic text-2xl">sites & apps</span>.</div>
      </motion.h1>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <Link
          href="#contact"
          className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition mt-9"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          Contact me here{" "}
          <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition mt-9 " />
        </Link>

        <a
          className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 mt-9"
          href={home?.fields?.media?.fields?.file?.url}
          target="_blank"
          download
        >
          Download CV{" "}
          <HiDownload className="opacity-60 group-hover:translate-y-1 transition mt-9" />
        </a>

        <a
          className="bg-white p-4 text-gray-700 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60 mt-9"
          href="https://www.linkedin.com/in/jesse-imming-6b0776287/"
          target="_blank"
        >
          <BsLinkedin />
        </a>

        <a
          className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60 mt-9"
          href="https://github.com/jesseimming"
          target="_blank"
        >
          <FaGithubSquare />
        </a>
      </motion.div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .hover\\:animate-bounce:hover {
          animation: bounce 1s infinite;
        }
      `}</style>
    </section>
  );
}
