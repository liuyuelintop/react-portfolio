// hooks/useCV.js
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
    abortController.current.abort(); // 取消前次请求
    abortController.current = new AbortController();

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const url = await getLatestCV(abortController.current.signal);
      setState({ cvUrl: url, isLoading: false, error: null });
    } catch (error) {
      if (error.name !== "AbortError") {
        setState((prev) => ({
          cvUrl: prev.cvUrl, // 保留上次成功值
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
