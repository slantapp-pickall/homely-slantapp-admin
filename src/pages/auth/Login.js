import React, { useState } from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard
} from "../../components/Component";
import { Form, Spinner, Alert, CloseButton } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");

  const onFormSubmit = async (formData) => {
    try {
      setLoading(true);
      const data = {
        email: formData.name,
        password: formData.passcode
      };
      const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      };
      const response = await (await fetch("https://homely-h0gx.onrender.com/v1/authentication/login/admin", options)).json();
      if (response.success === false) {
        setTimeout(() => {
          setError("Cannot login with credentials");
          setLoading(false);
        }, 1000);
      }
      localStorage.setItem("accessToken", response.token);
      toast.success("Login successful");
      setTimeout(() => {
        window.history.pushState(
          `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
          "auth-login",
          `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
        );
        window.location.reload();
      }, 1000);
    } catch (e) {
      setTimeout(() => {
        setError("Cannot login with credentials");
        setLoading(false);
      }, 1000);
    }
  };

  const { register, handleSubmit, formState: { errors } } = useForm();

  return <>
    <Head title="Login" />
    <Block className="nk-block-middle nk-auth-body  wide-xs">
      <div className="brand-logo pb-4 text-center">
        <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
          <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
          <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
        </Link>
      </div>

      <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
        <BlockHead>
          <BlockContent>
            <BlockTitle tag="h4">Sign-In</BlockTitle>
            <BlockDes>
              <p>Access Homely using your email and passcode.</p>
            </BlockDes>
          </BlockContent>
        </BlockHead>
        {errorVal && (
          <div className="mb-3">
            <Alert color="danger" className="alert-icon">
              <Icon name="alert-circle" /> Unable to login with credentials{" "}
            </Alert>
          </div>
        )}
        <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
          <div className="form-group">
            <div className="form-label-group">
              <label className="form-label" htmlFor="default-01">
                Email or Username
              </label>
            </div>
            <div className="form-control-wrap">
              <input
                type="text"
                id="default-01"
                {...register("name", { required: "This field is required" })}
                placeholder="Enter your email address or username"
                className="form-control-lg form-control" />
              {errors.name && <span className="invalid">{errors.name.message}</span>}
            </div>
          </div>
          <div className="form-group">
            <div className="form-label-group">
              <label className="form-label" htmlFor="password">
                Passcode
              </label>
            </div>
            <div className="form-control-wrap">
              <a
                href="#password"
                onClick={(ev) => {
                  ev.preventDefault();
                  setPassState(!passState);
                }}
                className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
              >
                <Icon name="eye" className="passcode-icon icon-show"></Icon>

                <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
              </a>
              <input
                type={passState ? "text" : "password"}
                id="password"
                {...register("passcode", { required: "This field is required" })}
                placeholder="Enter your passcode"
                className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`} />
              {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
            </div>
          </div>
          <div className="form-group">
            <Button size="lg" className="btn-block" type="submit" color="primary">
              {loading ? <Spinner size="sm" color="light" /> : "Sign in"}
            </Button>
          </div>
        </Form>

      </PreviewCard>
    </Block>
    <ToastContainer/>
    <AuthFooter />
  </>;
};
export default Login;
