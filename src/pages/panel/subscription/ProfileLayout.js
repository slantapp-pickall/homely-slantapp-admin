import React from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Block, BlockBetween, BlockHead, BlockHeadContent, BlockTitle, BlockDes, Col, Icon, Row } from "../../../components/Component";
import { Link, Outlet } from "react-router-dom";

const navData = [
  {
    link:'/profile',
    text:'Personal'
  },
  {
    link:'/profile-setting',
    text:'Settings'
  },
  {
    link:'/profile-notify',
    text:'Notifications'
  },
]

const Profile = () => {
  return (
    <React.Fragment>
      <Head title="Profile"></Head>
      <Content>
        <BlockHead size="md">
          <div className="nk-block-head-sub"><span>Account Setting</span></div>
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h2" className="fw-normal">My Profile</BlockTitle>
              <BlockDes>
                <p>You have full control to manage your own account setting. <span className="text-primary"><Icon name="info" /></span></p>
              </BlockDes>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <ul className="nk-nav nav nav-tabs">
          {navData.map((item,index) =>
            <li key={index}
              className={`nav-item ${
                window.location.pathname === `${process.env.PUBLIC_URL}${item.link}`
                  ? "active current-page"
                  : ""
              } `}
            >
              <Link
                to={`${process.env.PUBLIC_URL}${item.link}`}
                className={`nav-link
                  ${window.location.pathname === `${process.env.PUBLIC_URL}${item.link}` ? "active" : ""}
                `}
              >
                <span>{item.text}</span>
              </Link>
            </li>
          )}
        </ul>
        
        <Outlet />

      </Content>
    </React.Fragment>
  );
};

export default Profile;
