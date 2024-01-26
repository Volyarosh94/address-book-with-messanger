import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "usehooks-ts";
import LinkIcon from "@mui/icons-material/Link";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import ChecklistIcon from "@mui/icons-material/Checklist";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import { Contact } from "../../pages/Contacts";
import { Button } from "../Button";
import { ToolBarButton } from "./ToolBarButton";

interface Props {
  checkedContacts: Contact[];
  checkListShow: boolean;
  setCheckListShow: Dispatch<SetStateAction<boolean>>;
  setContactsList: Dispatch<SetStateAction<Contact[]>>;
  selectedContact: Contact | null;
  setSelectedContact: Dispatch<SetStateAction<Contact | null>>;
  setCheckedContacts: Dispatch<SetStateAction<Contact[]>>;
}

interface ButtonElement {
  text: string;
  icon: ReactNode;
  checkListShow?: boolean;
}

export const ToolBar = ({
  checkedContacts,
  checkListShow,
  setCheckListShow,
  setContactsList,
  selectedContact,
  setSelectedContact,
  setCheckedContacts,
}: Props) => {
  const arrOfButtonElements: ButtonElement[] = [
    { text: "Edit", icon: <EditIcon /> },
    { text: "Favorite", icon: <StarIcon /> },
    { text: "Link", icon: <LinkIcon />, checkListShow },
    { text: "Refresh", icon: <RefreshIcon /> },
    { text: "Add", icon: <AddIcon /> },
  ];

  const [moreSelectOpen, setMoreSelectOpen] = useState<boolean>(false);
  const [arrState, setArrState] = useState(arrOfButtonElements);
  const [secondArrState, setSecondArrState] = useState<ButtonElement[]>([]);

  const screenWidthRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 799px)");

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.screen.width;
      const blockWidth = screenWidthRef.current?.clientWidth;
      if (blockWidth && isMobile && screenWidth <= blockWidth + 70) {
        setSecondArrState((prev) => {
          return [arrState[0], ...prev];
        });
        setArrState((prev) => {
          const [, ...rest] = prev;
          return rest;
        });
      } else if (
        blockWidth &&
        isMobile &&
        screenWidth - (blockWidth + 70) > 68 &&
        arrState.length < 5
      ) {
        setArrState((prev) => {
          return [secondArrState[0], ...prev];
        });
        setSecondArrState((prev) => {
          const [, ...rest] = prev;
          return rest;
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [arrState]);

  const handleDeleteContacts = () => {
    setContactsList((prev) =>
      prev.filter((contact) => !checkedContacts.includes(contact))
    );
    setCheckListShow(false);
    setCheckedContacts([]);
  };

  const handleShowChecklist = () => {
    if (checkListShow) {
      setCheckListShow(false);
      setCheckedContacts([]);
      setSelectedContact(null);
      return;
    } else {
      setCheckListShow(true);
    }
  };
  if (isMobile && selectedContact) return <></>;

  return (
    <motion.div
      ref={screenWidthRef}
      layout
      layoutRoot
      layoutScroll
      className={`flex justify-end absolute customMd:w-80 ${
        moreSelectOpen ? "h-[52px]" : "h-12"
      } right-0 customMd:inset-auto`}
    >
      {arrState.map((element) => {
        return (
          <ToolBarButton
            key={element.text}
            text={element.text}
            icon={element.icon}
            moreSelectOpen={moreSelectOpen}
            checkListShow={checkListShow}
          />
        );
      })}
      {checkListShow && (
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`w-[68px] h-[52px] flex flex-col justify-center items-center ${
            checkedContacts.length ? "hover:bg-dark-gray" : ""
          }`}
          onClick={handleDeleteContacts}
        >
          <Button disabled={!checkedContacts.length}>
            <DeleteOutlineIcon
              sx={{ color: !checkedContacts.length ? "lightgray" : "" }}
            />
          </Button>
        </motion.div>
      )}
      <div
        className={`group w-[68px] h-[52px] flex flex-col justify-center items-center hover:bg-dark-gray ${
          checkListShow && "hover:bg-light-blue bg-sky-blue"
        }`}
      >
        <Button
          className={`${
            checkListShow && "group-hover:bg-light-blue bg-sky-blue"
          }`}
          onClick={handleShowChecklist}
        >
          <ChecklistIcon />
        </Button>
        {moreSelectOpen && (
          <div className="text-xs absolute top-9">Checklist</div>
        )}
      </div>
      <div className="w-8 h-[52px] flex flex-col justify-center items-center relative hover:bg-dark-gray">
        <Button
          className="w-full"
          onClick={() => setMoreSelectOpen(!moreSelectOpen)}
        >
          <MoreHorizIcon />
        </Button>
        <AnimatePresence>
          {moreSelectOpen && (
            <motion.div
              layout
              initial={{ opacity: 0, top: "20px" }}
              animate={{ opacity: 1, top: "52px" }}
              exit={{ opacity: 0, top: "20px" }}
              transition={{ duration: 0.1 }}
              className={`absolute right-0 w-[150px] flex bg-main-gray ${
                isMobile ? "flex-col-reverse" : "flex-col"
              }`}
            >
              {isMobile &&
                secondArrState.map((elem) =>
                  moreSelectOpen && elem.text === "Link" ? (
                    <div key={elem.text} className="selectItem">
                      {elem.text}
                    </div>
                  ) : (
                    <div key={elem.text} className="selectItem">
                      {elem.text}
                    </div>
                  )
                )}
              {!isMobile && (
                <>
                  <div className="selectItem">Edit</div>
                  <div className="selectItem">Favorite</div>
                  {checkListShow && <div className="selectItem">Link</div>}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
