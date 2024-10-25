import { useState, useEffect } from "react";
import { createClient } from "contentful";

export const useContentful = (contentType) => {
  const [mappedData, setMappedData] = useState({});
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cmsapi] = useState([]);

  useEffect(() => {
    const dataMap = cmsapi.reduce((acc, entry) => {
      acc[entry.fields.slug] = entry;
      return acc;
    }, {});
    setMappedData(dataMap);
  }, [cmsapi]);

  useEffect(() => {
    const fetchData = async () => {
      const client = createClient({
        space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
        accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
      });
      
      try {
        const response = await client.getEntries({
          content_type: contentType,
        });
        setData(response.items);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [contentType]);

  const aboutMeData = mappedData["about-me"];
  const projectsExperienceSkillsData = mappedData["projects-expierience-skills"];
  const home = mappedData["home"];

  return { data, loading, error, aboutMeData, projectsExperienceSkillsData, home };
};