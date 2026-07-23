'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface VehicleInventoryResultsProps {
  /** Changes when URL query changes — triggers a brief opacity transition. */
  queryKey: string;
  children: React.ReactNode;
}

function VehicleInventoryResults({ queryKey, children }: VehicleInventoryResultsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      key={queryKey}
      initial={prefersReducedMotion ? false : { opacity: 0.72 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.18, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export { VehicleInventoryResults };
