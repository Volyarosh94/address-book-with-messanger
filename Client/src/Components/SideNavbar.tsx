import Avatar from "@mui/material/Avatar";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import styled from "@emotion/styled";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CustomizedDialogs from "./GroupMode";
import { useAppSelector } from "./Redux/hooks";
import { Link } from "react-router-dom";
import { ReactElement } from "react";

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

  return (
    <div className="side-nav">
      <div>
        <Avatar src={user.pic} />
      </div>
      <div className="icons-wrapper">
        <div className="mid-icon">
          <LightTooltip title="Profile" placement="top">
            <AccountCircleOutlinedIcon />
          </LightTooltip>
          <LightTooltip placement="top" title="Chats">
            <Link to={"/"}>
              <ChatOutlinedIcon />
            </Link>
          </LightTooltip>
          <LightTooltip placement="top" title="Groups">
            <CustomizedDialogs />
          </LightTooltip>
          <LightTooltip placement="top" title="Contacts">
            <Link to={"/contacts"}>
              <AssignmentIndOutlinedIcon />
            </Link>
          </LightTooltip>
          <LightTooltip placement="top" title="Settings">
            <SettingsOutlinedIcon />
          </LightTooltip>
        </div>
        <div className="bottom-icon">
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
    <Tooltip
      children={children}
      title={title}
      {...props}
      classes={{ popper: className }}
    />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "black",
    color: "white",
    fontSize: 13,
  },
}));
