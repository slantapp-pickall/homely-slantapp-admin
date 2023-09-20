import React, { useLayoutEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import SubsDashboard from "../pages/panel/subscription/Index";
import SubsSubscriptions from "../pages/panel/subscription/Subscriptions";
import SubsSubscriptionDetails from "../pages/panel/subscription/SubscriptionDetails";
import SubsTickets from "../pages/panel/subscription/Tickets";
import SubsTicketDetails from "../pages/panel/subscription/TicketDetails";
import SubsSupport from "../pages/panel/subscription/Support";
import SubsProperty from "../pages/pre-built/properties/PropertyDetails";
import SubsProperties from "../pages/pre-built/properties/PropertyCard";
import SubCars from "../pages/pre-built/cars/ProductCard";
import SubsUser from "../pages/panel/subscription/User";
import SubsProfileLayout from "../pages/panel/subscription/ProfileLayout";
import SubsProfile from "../pages/panel/subscription/Profile";
import SubsProfileActivity from "../pages/panel/subscription/ProfileActivity";
import SubsProfileBilling from "../pages/panel/subscription/ProfileBilling";
import SubsProfileNotify from "../pages/panel/subscription/ProfileNotify";
import SubsProfileSetting from "../pages/panel/subscription/ProfileSetting";
import SubsPricing from "../pages/panel/subscription/Pricing";
import SubsPayments from "../pages/panel/subscription/Payments";
import SubsInvoices from "../pages/panel/subscription/Invoices";
import SubsInvoiceDetails from "../pages/panel/subscription/InvoiceDetails";
import SubsFaqs from "../pages/panel/subscription/Faqs";
import SubsDownloads from "../pages/panel/subscription/Downloads";
import SubsContact from "../pages/panel/subscription/Contact";

import LayoutSubscription from "../layout/Index-subscription";
import LayoutNoSidebar from "../layout/Index-nosidebar";
import Homepage from "../pages/Homepage";
import Success from "../pages/auth/Success";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Error404Modern from "../pages/error/404-modern";
import Error404Classic from "../pages/error/404-classic";
import Error504Modern from "../pages/error/504-modern";
import Error504Classic from "../pages/error/504-classic";
import InvoicePrint from "../pages/panel/subscription/InvoicePrint";
import SubsInvoicePrint from "../pages/panel/subscription/InvoicePrint";
import { ProductContextProvider } from "../pages/pre-built/properties/PropertyContext";
import { CarContextProvider } from "../pages/pre-built/cars/ProductContext";


const Pages = () => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <Routes>
      <Route path={`${process.env.PUBLIC_URL}`} element={<LayoutSubscription />}>
        <Route index element={<Homepage />}></Route>
        <Route path="shortcuts" element={<SubsDashboard />}></Route>
        <Route path="subscriptions" element={<SubsSubscriptions />}></Route>
        <Route path="subscription-details/:subscriptionId" element={<SubsSubscriptionDetails />}></Route>
        <Route path="tickets" element={<SubsTickets />}></Route>
        <Route path="ticket-details/:ticketId" element={<SubsTicketDetails />}></Route>
        <Route path="support" element={<SubsSupport />}></Route>
        <Route element={<CarContextProvider />}>
          <Route path="cars" element={<SubCars />}></Route>
        </Route>
        <Route element={<ProductContextProvider />}>
          <Route path="properties" element={<SubsProperties />}></Route>
          <Route path="property-details/:productId" element={<SubsProperty />}></Route>
        </Route>
        <Route path="users" element={<SubsUser />}></Route>
        <Route element={<SubsProfileLayout />}>
          <Route path="profile" element={<SubsProfile />}></Route>
          <Route path="profile-billing" element={<SubsProfileBilling />}></Route>
          <Route path="profile-notify" element={<SubsProfileNotify />}></Route>
          <Route path="profile-setting" element={<SubsProfileSetting />}></Route>
        </Route>
        <Route path="profile-activity" element={<SubsProfileActivity />}></Route>
        <Route path="pricing" element={<SubsPricing />}></Route>
        <Route path="payments" element={<SubsPayments />}></Route>
        <Route path="histories" element={<SubsInvoices />}></Route>
        <Route path="invoice-details/:invoiceId" element={<SubsInvoiceDetails />}></Route>
        <Route path="invoice-print/:invoiceId" element={<InvoicePrint />}></Route>
        <Route path="faqs" element={<SubsFaqs />}></Route>
        <Route path="downloads" element={<SubsDownloads />}></Route>
        <Route path="contact" element={<SubsContact />}></Route>
      </Route>
      <Route path={`${process.env.PUBLIC_URL}`} element={<LayoutNoSidebar />}>
        <Route path="auth-success" element={<Success />}></Route>
        <Route path="auth-reset" element={<ForgotPassword />}></Route>
        <Route path="auth-register" element={<Register />}></Route>
        <Route path="auth-login" element={<Login />}></Route>

        <Route path="errors">
          <Route path="404-modern" element={<Error404Modern />}></Route>
          <Route path="404-classic" element={<Error404Classic />}></Route>
          <Route path="504-modern" element={<Error504Modern />}></Route>
          <Route path="504-classic" element={<Error504Classic />}></Route>
        </Route>
        <Route path="*" element={<Error404Modern />}></Route>
        <Route path="subscription/invoice-print/:invoiceId" element={<SubsInvoicePrint />}></Route>
        <Route path="invoice-print/:invoiceId" element={<InvoicePrint />}></Route>
      </Route>
    </Routes>
  );
};
export default Pages;
