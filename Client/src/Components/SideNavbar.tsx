import { ReactElement } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Avatar from "@mui/material/Avatar";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useAppSelector } from "./Redux/hooks";
import CustomizedDialogs from "./GroupMode";
import "dayschedule-widget/dist/dayschedule-popup.css";
import "dayschedule-widget/dist/dayschedule-widget.js";

interface IToolTip {
  children: ReactElement<any, any>;
  className?: string;
  placement:
    | "bottom"
    | "left"
    | "right"
    | "top"
    | "bottom-end"
    | "bottom-start"
    | "left-end"
    | "left-start"
    | "right-end"
    | "right-start"
    | "top-end"
    | "top-start"
    | undefined;
  title: string;
}

export default function SideNavbar() {
  const { user, loading, error } = useAppSelector((store) => store.user);

  const openScheduler = () => {
    daySchedule.initPopupWidget({
      url: "https://meet.dayschedule.com",
      color: {
        primary: "#080808",
        secondary: "#e0e0e0",
      },
    });
  };

  return (
    <div className="side-nav">
      <div>
        <Avatar src={user.pic} />
      </div>
      <div className="h-full flex flex-col justif-between">
        <div className="h-[40%] text-icon-gray">
          <LightTooltip title="Profile" placement="top">
            <AccountCircleOutlinedIcon />
          </LightTooltip>
          <LightTooltip placement="top" title="Chats">
            <Link to={"/"}>
              <ChatOutlinedIcon />
            </Link>
          </LightTooltip>
          <CustomizedDialogs />
          <LightTooltip placement="top" title="Contacts">
            <Link to={"/contacts"}>
              <AssignmentIndOutlinedIcon />
            </Link>
          </LightTooltip>
          <LightTooltip placement="top" title="Schedule a meeting">
            <CalendarMonthOutlinedIcon onClick={openScheduler} />
          </LightTooltip>
          <LightTooltip placement="top" title="Settings">
            <SettingsOutlinedIcon />
          </LightTooltip>
        </div>
        <div className="h-[10%] text-icon-gray">
          <LanguageOutlinedIcon />
          <LightTooltip placement="top" title="Dark/Light Mode">
            <DarkModeOutlinedIcon />
          </LightTooltip>
        </div>
      </div>
    </div>
  );
}

export const LightTooltip = styled(
  ({ children, className, title, ...props }: IToolTip) => (
    <div className="flex justify-center items-center">
      <Tooltip
        children={children}
        title={title}
        {...props}
        classes={{ popper: className }}
      />
    </div>
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "black",
    color: "white",
    fontSize: 13,
  },
}));
