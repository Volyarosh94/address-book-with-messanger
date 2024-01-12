import { ReactNode, ReactElement } from "react";
import SvgIcon from "@mui/material/SvgIcon";
import PersonIcon from "@mui/icons-material/Person";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import CallIcon from "@mui/icons-material/Call";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import TransitEnterexitIcon from "@mui/icons-material/TransitEnterexit";
import { ProfilePicture } from "../Components/ProfilePicture";
import { useLocation, useNavigate } from "react-router-dom";

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

interface Person {
  name: string;
  picture: string;
  status: string;
  statusHoursAgo: number;
  mobilePhone: string;
  workPhone: string;
}

export const ContactInfo = () => {
  const { state } = useLocation();
  const { name, picture, status, statusHoursAgo, mobilePhone, workPhone } = (
    state as { person: Person }
  ).person;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full px-2.5 pt-1.5 bg-white h-screen">
      <div className="flex mb-3 cursor-pointer" onClick={() => navigate(-1)}>
        <TransitEnterexitIcon
          sx={{ transform: "rotate(45deg)" }}
          fontSize="large"
        />
      </div>
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
            <a className="link" href={`tel:${mobilePhone}`}>
              Call mobile
            </a>
            <span>{mobilePhone}</span>
          </div>
        </InfoItem>
        <InfoItem icon={<CallIcon fontSize="small" />}>
          <div className="flex flex-col">
            <a className="link" href={`tel:${workPhone}`}>
              Call work
            </a>
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
      </ul>
    </div>
  );
};
