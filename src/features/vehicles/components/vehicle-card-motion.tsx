'use client';

import * as React from 'react';
import { motion } from 'motion/react';

import { useMotionVariants } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface VehicleCardRevealProps {
  children: React.ReactNode;
  /** Stagger index when rendered inside `VehicleCardGrid`. */
  index?: number;
  className?: string;
}

/**
 * Client boundary for optional list entrance animation only.
 * Wrap server-rendered `VehicleCard` children — do not pass vehicle props here.
 */
function VehicleCardReveal({ children, index = 0, className }: VehicleCardRevealProps) {
  const item = useMotionVariants('fadeUp');

  return (
    <motion.div
      variants={item}
      custom={index}
      transition={{ delay: index * 0.05 }}
      className={cn('h-full', className)}
    >
      {children}
    </motion.div>
  );
}

interface VehicleCardGridProps {
  children: React.ReactNode;
  className?: string;
}

function VehicleCardGrid({ children, className }: VehicleCardGridProps) {
  const container = useMotionVariants('staggerContainer');

  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={container}
      className={cn(
        'grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6',
        className,
      )}
    >
      {children}
    </motion.ul>
  );
}

export { VehicleCardGrid, VehicleCardReveal };
