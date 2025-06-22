import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";

const LayoutComponent = function ({ children }: { children: React.ReactNode }) {
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
