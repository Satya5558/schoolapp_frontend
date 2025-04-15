import React from "react";
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
import Footer from "./Footer/Footer";

const LayoutComponent = function ({ children }) {
  return (
    <div className="main-wrapper">
      {/* Header */}
      <Header />
      {/* Sidebar */}
      <SideBar />
      {children}
      <Footer />
      {/* /Page Wrapper */}
    </div>
  );
};

export default LayoutComponent;
