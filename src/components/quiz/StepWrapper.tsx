import { motion } from "framer-motion";
import { ReactNode } from "react";

export function StepWrapper({ children, exploTag }: { children: ReactNode; exploTag?: string }) {
  return (
    <motion.div
      id={exploTag?.replace("#", "")}
      data-explo={exploTag}
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
