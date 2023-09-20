import React from "react";
import classNames from "classnames";
import SimpleBar from "simplebar-react";
import SubscriptionMenu from "../menu/SubscriptionMenu";

import { useTheme, useThemeUpdate } from "../provider/Theme";

const Sidebar = ({ className }) => {

  const theme = useTheme();
  const themeUpdate = useThemeUpdate();

  const classes = classNames({
    "nk-aside toggle-screen-lg": true,
    "content-active": theme.sidebarVisibility,
    "mobile-menu": theme.sidebarMobile,
    [`${className}`]: className,
  });

  return (
    <>
    <div className={classes}>
      <SimpleBar className="nk-sidebar-menu">
        <SubscriptionMenu />
      </SimpleBar>
    </div>
    {theme.sidebarVisibility && <div 
      onClick={themeUpdate.sidebarVisibility}
       className="toggle-overlay"></div>}
    </>
  );
};
export default Sidebar;
