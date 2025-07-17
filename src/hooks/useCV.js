import { useCallback, useEffect, useRef, useState } from "react";
import { getLatestCV } from "../utils/api";

export function useCV() {
  const abortController = useRef(new AbortController());
  const [state, setState] = useState({
    cvUrl: "#",
    isLoading: true,
    error: null,
  });

  const fetchCV = useCallback(async () => {
    abortController.current.abort();
    abortController.current = new AbortController();

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      let url;
      if (import.meta.env.PROD) {
        url = await getLatestCV(abortController.current.signal);
      } else {
        // In dev, return a mock or skip fetching
        url = "/#"; // or just "#"
      }
      setState({ cvUrl: url, isLoading: false, error: null });
    } catch (error) {
      if (error.name !== "AbortError") {
        setState((prev) => ({
          cvUrl: prev.cvUrl,
          isLoading: false,
          error: error.message,
        }));
      }
    }
  }, []);

  useEffect(() => {
    fetchCV();
    return () => abortController.current.abort();
  }, [fetchCV]);

  return {
    ...state,
    retry: fetchCV,
  };
}