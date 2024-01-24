import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Button } from "../Button";
import { useMediaQuery } from "usehooks-ts";

interface Props {
  icon: ReactNode;
  text: string;
  moreSelectOpen: boolean;
  checkListShow?: boolean;
}

export const ToolBarButton = ({
  icon,
  text,
  moreSelectOpen,
  checkListShow,
}: Props) => {
  const isMobile = useMediaQuery("(max-width: 799px)");

  return (
    <>
      {text !== "Link" && (
        <motion.div
          layout
          className={`w-[68px] h-[52px] flex flex-col justify-center items-center hover:bg-dark-gray
            ${text === "Edit" || text === "Favorite" ? "customMd:hidden" : ""}`}
        >
          <Button>{icon}</Button>
          {moreSelectOpen && (
            <div className="text-xs absolute top-9">{text}</div>
          )}
        </motion.div>
      )}
      {isMobile && text === "Link" && (
        <motion.div
          layout
          className="w-[68px] h-[52px] relative flex flex-col justify-center items-center hover:bg-dark-gray"
        >
          <Button>{icon}</Button>
          {moreSelectOpen && (
            <div className="text-xs absolute top-9">{text}</div>
          )}
        </motion.div>
      )}
      {!checkListShow && !isMobile && text === "Link" && (
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-[68px] h-[52px] relative flex flex-col justify-center items-center hover:bg-dark-gray"
        >
          <Button>{icon}</Button>
          {moreSelectOpen && (
            <div className="text-xs absolute top-9">{text}</div>
          )}
        </motion.div>
      )}
    </>
  );
};
