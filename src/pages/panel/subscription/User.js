import React, { useEffect, useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  RSelect
} from "../../../components/Component";
import {
  Card,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
  Modal,
  ModalHeader,
  ModalBody, ModalFooter
} from "reactstrap";
import teamData from "./data/team";
import { findUpper } from "../../../utils/Utils";

export const teamRole = [
  { value: "Member", label: "Member" },
  { value: "Subscriber", label: "Subscriber" },
  { value: "Admin", label: "Admin" },
  { value: "Super Admin", label: "Super Admin" }
];
const token = localStorage.getItem("accessToken");

const Users = () => {
  const [modalForm, setModalForm] = useState(false);
  const [usersData, setUsersData] = useState([]);

  const toggleForm = () => setModalForm(!modalForm);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const id = productId;
        const response = await fetch(`https://homely-h0gx.onrender.com/v1/user`, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          // Handle error if the response is not okay
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Check if the product exists and has images
        if (data.success === true) {
          setUsersData(data.data);
        }
      } catch (error) {
        // Handle any errors here
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Head title="Users"></Head>
      <Content>
        <BlockHead size="lg">
          <div className="nk-block-head-sub"><span>Users</span></div>
          <BlockBetween className="g-4" size="md">
            <BlockHeadContent>
              <BlockTitle tag="h2" className="fw-normal">Manage Users</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <ul className="nk-block-tools gx-3">
                <li>
                  <Button color="primary" onClick={toggleForm}>
                    <Icon name="plus"></Icon>
                    <span>Add User</span>
                  </Button>
                </li>
              </ul>

              <Modal isOpen={modalForm} toggle={toggleForm}>
                <ModalHeader
                  toggle={toggleForm}
                  close={
                    <button className="close" onClick={toggleForm}>
                      <Icon name="cross" />
                    </button>
                  }
                >
                  User Info
                </ModalHeader>
                <ModalBody>
                  <form>
                    <div className="form-group">
                      <label className="form-label" htmlFor="full-name">
                        Full Name
                      </label>
                      <div className="form-control-wrap">
                        <input type="text" className="form-control" id="full-name" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                      <div className="form-control-wrap">
                        <input type="text" className="form-control" id="email" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone-no">
                        Phone No
                      </label>
                      <div className="form-control-wrap">
                        <input type="number" className="form-control" id="phone-no" defaultValue="0880" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Communication</label>
                      <ul className="custom-control-group g-3 align-center">
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="form-control custom-control-input"
                              id="fv-com-email"
                              name="com"
                              value="email"
                            />
                            <label className="custom-control-label" htmlFor="fv-com-email">
                              Email
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="form-control custom-control-input"
                              id="fv-com-sms"
                              name="com"
                              value="sms"
                            />
                            <label className="custom-control-label" htmlFor="fv-com-sms">
                              SMS
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="fv-com-phone"
                              name="com"
                              value="phone"
                            />
                            <label className="custom-control-label" htmlFor="fv-com-phone">
                              {" "}
                              Phone{" "}
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="amount">
                        Amount
                      </label>
                      <div className="form-control-wrap">
                        <input type="text" className="form-control" id="amount" />
                      </div>
                    </div>
                    <div className="form-group">
                      <Button color="primary" type="submit" onClick={(ev) => ev.preventDefault()} size="lg">
                        Save Information
                      </Button>
                    </div>
                  </form>
                </ModalBody>
                <ModalFooter className="bg-light">
                  <span className="sub-text">Modal Footer Text</span>
                </ModalFooter>
              </Modal>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Card className="card-bordered">
            <table className="table table-member">
              <thead className="tb-member-head table-light">
              <tr className="tb-member-item">
                <th className="tb-member-info">
                  <span className="overline-title">User</span>
                </th>
                <th className="tb-member-type tb-col-sm">
                  <span className="overline-title">Permission</span>
                </th>
                <th className="tb-member-action">
                  <span className="overline-title">Action</span>
                </th>
              </tr>
              </thead>
              <tbody className="tb-member-body">
              {usersData.map((item, index) => {
                return (
                  <tr key={index} className="tb-member-item">
                    <td className="tb-member-info">
                      <div className="user-card">
                        <div className={`user-avatar bg-purple`}>
                          {item.image ? <img src={item.image} alt="" /> : <span>{findUpper(item.name)}</span>}
                        </div>
                        <div className="user-info">
                          <span className="lead-text">{item.name}</span>
                          <span className="sub-text">{item.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="tb-member-type tb-col-sm">
                      <span>{item.isAdmin}</span>
                    </td>
                    <td className="tb-member-action">
                      <div className="d-none d-md-inline">
                        <a href="#" className="link link-sm"><span>View</span></a>
                        <a href="#" className="link link-sm link-danger"><span>Block</span></a>
                      </div>
                      <UncontrolledDropdown className="d-md-none">
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                          <Icon name="more-v"></Icon>
                        </DropdownToggle>
                        <DropdownMenu size="xs" end>
                          <ul className="link-list-plain no-bdr">
                            <li className="active"><a className="link link-sm" href="#">View</a></li>
                            <li><a className="link link-sm link-danger" href="#">Block</a></li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          </Card>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default Users;