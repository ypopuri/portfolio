
import React from "react";

type BorderBeamProps = {
  duration?: number;
  size?: number;
};

export const BorderBeam = ({ duration = 8, size = 100 }: BorderBeamProps) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: `linear-gradient(90deg, var(--color-primary), var(--color-primary-mild), var(--color-primary-light))`,
        backgroundSize: `${size}%`,
        animation: `moveBeam ${duration}s linear infinite`,
      }}
    />
  );
};
