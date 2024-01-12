import { ReactNode } from "react";

interface Props {
  backgroundUrl: string;
  size: number;
  children: ReactNode;
}

export const ProfilePicture = ({ backgroundUrl, size, children }: Props) => {
  return (
    <div
      className="flex justify-center items-center bg-cover"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        width: size,
        height: size,
        WebkitBorderRadius: size,
        MozBorderRadius: size,
        borderRadius: size,
      }}
    >
      {children}
    </div>
  );
};
