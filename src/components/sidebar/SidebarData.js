import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSignOutAlt,
  faCog,
  faChartArea,
} from "@fortawesome/free-solid-svg-icons";

export const SidebarData = [
  {
    title: "Home",
    icon: <FontAwesomeIcon icon={faHome} />,
    link: "/dashboard",
  },
  {
    title: "Analytics",
    icon: <FontAwesomeIcon icon={faChartArea} />,
    link: "/analytics",
  },
  {
    title: "Settings",
    icon: <FontAwesomeIcon icon={faCog} />,
    link: "/settings",
  },
  {
    title: "Logout",
    icon: <FontAwesomeIcon icon={faSignOutAlt} />,
    link: "/logout",
  },
];
