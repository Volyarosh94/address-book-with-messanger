import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import { Contact } from "../../pages/Contacts";
import { ProfilePicture } from "../ProfilePicture";
import { CustomCheckbox } from "../Checkbox";
import { useMediaQuery } from "usehooks-ts";

interface Props {
  person: Contact;
  checkListShow: boolean;
  checkedContacts: Contact[];
  setCheckedContacts: Dispatch<SetStateAction<Contact[]>>;
  selectedContact: Contact | null;
  setSelectedContact: Dispatch<SetStateAction<Contact | null>>;
}

export const ContactItem = ({
  person,
  checkListShow,
  checkedContacts,
  setCheckedContacts,
  selectedContact,
  setSelectedContact,
}: Props) => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width: 799px)");

  const handleSelect = (person: Contact) => {
    if (isMobile && !checkListShow) {
      navigate("/contact-info", { state: { person } });
      return;
    }
    if (checkListShow) {
      !isChecked
        ? setCheckedContacts((prev) => [...prev, person])
        : setCheckedContacts((prev) =>
            prev.filter((contact) => contact !== person)
          );
    } else {
      setSelectedContact(person);
    }
  };

  useEffect(() => {
    const isChecked = checkedContacts.includes(person);
    setIsChecked(isChecked);
  }, [checkedContacts, person]);

  return (
    <motion.div
      layout
      className={`
          flex items-center p-2 pl-3 gap-x-4 h-12 w-full hover:bg-dark-gray cursor-default
          ${
            (isChecked || selectedContact === person) &&
            "bg-sky-blue hover:bg-light-blue"
          }
        `}
      onClick={() => handleSelect(person)}
    >
      {checkListShow && (
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center"
        >
          <CustomCheckbox isChecked={isChecked} />
        </motion.div>
      )}
      <motion.div
        layout
        className="flex items-center gap-x-[5px]"
        transition={{ duration: 0.1 }}
      >
        <ProfilePicture backgroundUrl={person.picture} size={34}>
          <PersonIcon />
        </ProfilePicture>
        <div>{person.name}</div>
      </motion.div>
    </motion.div>
  );
};
