import { cn } from "../lib/utils";
import React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

export const Spinner = ({ size = 24, className, ...props }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn("animate-spin", className)}
      fill="none"
      viewBox="0 0 24 24"
      height={size}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};
