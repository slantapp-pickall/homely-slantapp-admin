import React, { useEffect } from "react";
import {  Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar/SidebarSubscription";
import SidebarSupport from "./sidebar/SidebarSupport";
import Head from "./head/Head";
import Header from "./header/HeaderSubscription";
import Footer from "./footer/Footer";
import AppRoot from "./global/AppRoot";
import AppMain from "./global/AppMain";
import AppWrap from "./global/AppWrap";

const Layout = ({ title, variant, ...props }) => {
  const navigate = useNavigate()
  useEffect(() => {
    document.body.classList.add("has-aside");
    document.body.classList.remove("npc-apps", "apps-only");
    const auth = localStorage.getItem('accessToken');
    if (!auth) return navigate("/auth-login");
  }, []);
  return (
    <>
      <Head title={!title && "Loading"} />
      <AppRoot>
        <AppMain>
          <AppWrap>
            <Header fixed />
            <div className="nk-content">
              <div className="container wide-xl">
                <div className="nk-content-inner">
                  {variant === "support" ? <SidebarSupport /> : <Sidebar />}
                  <div className="nk-content-body">
                    <Outlet />
                    <Footer />
                  </div>
                </div>
              </div>
            </div>
          </AppWrap>
        </AppMain>
      </AppRoot>
    </>
  );
};
export default Layout;
