
import { useEffect, useState } from "react";

const EMPTY_OPTIONS = {};

const useFetch = (url, options = EMPTY_OPTIONS) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    let isActive = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          ...options,
          signal,
        });

        if (!response.ok) {
          throw new Error(
            `Request failed: ${response.status}`
          );
        }

        const result = await response.json();

        if (isActive && !signal.aborted) {
          setData(result);
        }
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }

        if (isActive) {
          setError(err.message);
        }
      } finally {
        if (isActive && !signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [url, options]);

  return { data, loading, error };
};

export default useFetch;
