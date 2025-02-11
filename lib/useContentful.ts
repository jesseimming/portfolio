import { useState, useEffect } from "react";
import { createClient, Entry } from "contentful";

type CmsEntry = {
  slug: string;
  [key: string]: any;
};

export const useContentful = (contentType: string) => {
  const [mappedData, setMappedData] = useState<{ [key: string]: CmsEntry }>({});
  const [data, setData] = useState<CmsEntry[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [cmsapi, setCmsapi] = useState<CmsEntry[]>([]);

  useEffect(() => {
    const dataMap = cmsapi.reduce((acc, entry) => {
      if (entry.fields.slug) {
        acc[entry.fields.slug] = entry;
      }
      return acc;
    }, {} as { [key: string]: CmsEntry });
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
        setData(response.items as CmsEntry[]);
        setCmsapi(response.items as CmsEntry[]);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [contentType]);

  return { data, loading, error, cmsapi, mappedData };
};