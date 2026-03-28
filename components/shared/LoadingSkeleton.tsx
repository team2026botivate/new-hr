'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
  isLoading?: boolean;
  minDelay?: number;
}

/**
 * Universal Skeleton Wrapper with Anti-Flicker Logic
 * Ensures a minimum loading state to prevent UI flashing
 */
export default function LoadingSkeleton({
  children,
  fallback,
  isLoading = false,
  minDelay = 1200, // 1.2s minimum as per UI.md
}: LoadingSkeletonProps) {
  const [showContent, setShowContent] = useState(false);
  const [isDelaying, setIsDelaying] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isLoading) {
      setShowContent(false);
      setIsDelaying(true);
      timer = setTimeout(() => {
        setIsDelaying(false);
      }, minDelay);
    } else {
      // If loading is done, but we're still in the minimum delay period
      if (!isDelaying) {
        setShowContent(true);
      } else {
        timer = setTimeout(() => {
          setIsDelaying(false);
          setShowContent(true);
        }, minDelay);
      }
    }

    return () => clearTimeout(timer);
  }, [isLoading, minDelay, isDelaying]);

  if (!showContent) {
    return <div className="animate-in fade-in duration-300">{fallback}</div>;
  }

  return <div className="animate-in fade-in duration-500">{children}</div>;
}

/**
 * Shimmering list item skeleton
 */
export function SkeletonItem({ className }: { className?: string }) {
  return (
    <div className={cn("bg-[--surface-alt] rounded-xl overflow-hidden relative", className)}>
       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
    </div>
  );
}
