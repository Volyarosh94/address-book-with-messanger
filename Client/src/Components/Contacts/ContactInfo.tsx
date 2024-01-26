import { ReactNode, ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import SvgIcon from "@mui/material/SvgIcon";
import PersonIcon from "@mui/icons-material/Person";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import CallIcon from "@mui/icons-material/Call";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { Contact } from "../../pages/Contacts";
import { ProfilePicture } from "../ProfilePicture";
import { DialPad } from "../Dialpad/Dialpad";

const InfoItem = ({
  icon,
  children,
}: {
  icon: ReactElement<typeof SvgIcon>;
  children: ReactNode;
}) => {
  return (
    <li className="flex gap-x-2">
      {icon}
      {children}
    </li>
  );
};

export const ContactInfo = ({
  selectedContact,
}: {
  selectedContact: Contact;
}) => {
  const { name, picture, status, statusHoursAgo, mobilePhone, workPhone } =
    selectedContact;
  const [isDialOpen, setIsDialOpen] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState("");

  const isMobile = useMediaQuery("(max-width: 799px)");

  const handlePhoneClick = (phone: string) => {
    if (isMobile) return;
    setIsDialOpen(true);
    setSelectedPhone(phone);
  };

  const handleCallClick = (phone: string) => {
    // console.log("calling -", phone);
  };
  const handleHangUpClick = () => {
    // console.log("hang up");
  };

  return (
    <div className="hidden customMd:flex flex-col w-full h-full px-2.5 pt-1.5 box-shadow">
      <div className="flex flex-col">
        <h3 className="text-2xl font-medium">{name}</h3>
        <div className="flex pt-2.5 pl-[25px] gap-x-4 border-b-2 pb-2.5 border-[#CDCDCD]">
          <ProfilePicture backgroundUrl={picture} size={100}>
            <PersonIcon sx={{ width: "100%", height: "90%" }} />
          </ProfilePicture>
          <div className="flex flex-col w-60">
            <div className="text-sm">{status}</div>
            <div className="text-xs text-text-gray">
              {statusHoursAgo} hours ago
            </div>
          </div>
        </div>
      </div>
      <ul className="flex flex-col gap-y-[25px] py-[15px] px-[25px] text-[15px] leading-snug">
        <InfoItem icon={<ChatBubbleIcon fontSize="small" />}>Message</InfoItem>
        <InfoItem icon={<CallIcon fontSize="small" />}>
          <div className="flex flex-col">
            <Link
              className="link"
              to={`${isMobile ? `tel:${mobilePhone}` : ""}`}
              onClick={() => handlePhoneClick(mobilePhone)}
            >
              Call mobile
            </Link>
            <span>{mobilePhone}</span>
          </div>
        </InfoItem>
        <InfoItem icon={<CallIcon fontSize="small" />}>
          <div className="flex flex-col">
            <Link
              className="link"
              to={`${isMobile ? `tel:${workPhone}` : ""}`}
              onClick={() => handlePhoneClick(workPhone)}
            >
              Call work
            </Link>
            <span>{workPhone}</span>
          </div>
        </InfoItem>
        <InfoItem icon={<CallIcon fontSize="small" />}>
          Call using an app
        </InfoItem>
        <InfoItem icon={<VideoCallIcon fontSize="small" />}>
          Call using an app
        </InfoItem>
        <InfoItem icon={<MailOutlineIcon fontSize="small" />}>
          Email work
        </InfoItem>
        <InfoItem icon={<PlaceOutlinedIcon fontSize="small" />}>
          Map home
        </InfoItem>
        {isDialOpen && (
          <DialPad
            selectedPhone={selectedPhone}
            onCallClick={handleCallClick}
            onHangUpClick={handleHangUpClick}
          />
        )}
      </ul>
    </div>
  );
};
