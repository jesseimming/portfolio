import { links } from "./data";

export type SectionName = (typeof links)[number]["name"];

export interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  slug: string;
}