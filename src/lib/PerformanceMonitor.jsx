/**
 * Performance monitoring component (tracking disabled).
 * Renders nothing; mount once at app root.
 */
import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Performance monitoring disabled - no external tracking
    return () => {};
  }, []);

  return null;
}
