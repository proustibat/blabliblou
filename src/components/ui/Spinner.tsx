import type {HTMLAttributes} from "react";

type SpinnerProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
  className?: string;
};

export const Spinner = ({ size = 24, className = '' }: SpinnerProps) => {
  return (
    <div
      className={`
                inline-block animate-spin
                border-4 border-slate-300 border-t-transparent
                rounded-full
                ${className}
            `}
      style={{ width: size, height: size }}
    />
  );
};
