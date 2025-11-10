'use client'

import { useEffect, useRef } from "react";

const useDebouncedCallback = (callback, delay) => {
  const timeoutRef = useRef(null);

  function debounced(...args) {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }
  
  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return debounced;
}

export default useDebouncedCallback;