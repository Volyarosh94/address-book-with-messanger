import { ReactNode } from "react";

interface Props {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export const Button = ({ onClick, children, className, disabled }: Props) => {
  return (
    <button
      className={`flex h-full w-12 justify-center items-center ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
