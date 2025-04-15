import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";

import FeatherIcon from "feather-icons-react";
import $ from "jquery";
import { jwtDecode } from "jwt-decode";
import Scrollbars from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
// import { LogoImg, LogoSmallImg } from "../_components/imagepath";

const Sidebar = (props) => {
  const token = useSelector((state: RootState) => state?.userReducer?.token);
  let decodedToken = null;

  const [isSideMenu, setSideMenu] = useState<string>("");
  const [isSideMenuLevel, setSideMenuLevel] = useState("");
  const [isSideMenuLevel2, setSideMenuLevel2] = useState("");

  const toggleSidebar = (value) => {
    //console.log(value);
    setSideMenu(value);
  };
  const toggleSidebar1 = (value) => {
    //console.log(value);
    setSideMenuLevel(value);
  };
  const toggleSidebar2 = (value) => {
    //console.log(value);
    setSideMenuLevel2(value);
  };

  if (token) {
    decodedToken = jwtDecode(token);
  }
  useEffect(() => {
    function handleMouseOver(e) {
      e.stopPropagation();
      if (
        document.body.classList.contains("mini-sidebar") &&
        document.querySelector("#toggle_btn").offsetParent !== null
      ) {
        var targ = e.target.closest(".sidebar");
        if (targ) {
          document.body.classList.add("expand-menu");
          document
            .querySelectorAll(".subdrop + ul")
            .forEach((ul) => (ul.style.display = "block"));
        } else {
          document.body.classList.remove("expand-menu");
          document
            .querySelectorAll(".subdrop + ul")
            .forEach((ul) => (ul.style.display = "none"));
        }
        return false;
      }
    }

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  useEffect(() => {
    $(document).on("change", ".sidebar-type-four input", function () {
      if ($(this).is(":checked")) {
        $(".sidebar").addClass("sidebar-eight");
        $(".sidebar-menu").addClass("sidebar-menu-eight");
        $(".menu-title").addClass("menu-title-eight");
        $(".header").addClass("header-eight");
        $(".header-left-two").addClass("header-left-eight");
        $(".user-menu").addClass("user-menu-eight");
        $(".dropdown-toggle").addClass("dropdown-toggle-eight");
        $(".white-logo").addClass("show-logo");
        $(
          ".header-one .header-left-one .logo:not(.logo-small), .header-five .header-left-five .logo:not(.logo-small)"
        ).addClass("hide-logo");
        $(".header-two .header-left-two .logo:not(.logo-small)").removeClass(
          "hide-logo"
        );
        $(".header-two .header-left-two .dark-logo").removeClass("show-logo");
      } else {
        $(".sidebar").removeClass("sidebar-eight");
        $(".sidebar-menu").removeClass("sidebar-menu-eight");
        $(".menu-title").removeClass("menu-title-eight");
        $(".header").removeClass("header-eight");
        $(".header-left-two").removeClass("header-left-eight");
        $(".user-menu").removeClass("user-menu-eight");
        $(".dropdown-toggle").removeClass("dropdown-toggle-eight");
        $(".white-logo").removeClass("show-logo");
        $(
          ".header-one .header-left-one .logo:not(.logo-small), .header-five .header-left-five .logo:not(.logo-small)"
        ).removeClass("hide-logo");
      }
    });
  }, []);

  let pathName = props.location.pathname;

  return (
    <>
      <div className="sidebar" id="sidebar">
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMin={0}
          autoHeightMax="95vh"
          thumbMinSize={30}
          universal={false}
          hideTracksWhenNotNeeded={true}
        >
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              {/* Main Menu */}
              <ul>
                <li className="menu-title">
                  <span>Main Menu</span>
                </li>

                {decodedToken &&
                  decodedToken?.roles?.includes("ROLE_ADMIN") && (
                    <li
                      className={`${
                        "/admin-dashboard" === pathName
                          ? "active submenu"
                          : "submenu"
                      }`}
                    >
                      <Link
                        to="#"
                        className={isSideMenu == "index" ? "subdrop" : ""}
                        onClick={() =>
                          toggleSidebar(isSideMenu == "index" ? "" : "index")
                        }
                      >
                        <FeatherIcon icon="grid" /> <span>Schools</span>{" "}
                        <span className="menu-arrow"></span>
                      </Link>
                      {isSideMenu == "index" ? (
                        <ul
                          style={{
                            display: isSideMenu == "index" ? "block" : "none",
                          }}
                        >
                          <li>
                            <Link
                              to="/schools"
                              className={`${
                                "/schools" === pathName ? "active" : ""
                              }`}
                            >
                              Schools
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                  )}

                {decodedToken &&
                  decodedToken?.roles?.includes("ROLE_SCHOOL_ADMIN") && (
                    <li
                      className={`${
                        "/students" === pathName ? "active submenu" : "submenu"
                      }`}
                    >
                      <Link
                        to="#"
                        className={isSideMenu == "Students" ? "subdrop" : ""}
                        onClick={() =>
                          toggleSidebar(
                            isSideMenu == "Students" ? "" : "Students"
                          )
                        }
                      >
                        <i className="fas fa-graduation-cap" />{" "}
                        <span> Students</span> <span className="menu-arrow" />
                      </Link>
                      {isSideMenu == "Students" ? (
                        <ul
                          style={{
                            display:
                              isSideMenu == "Students" ? "block" : "none",
                          }}
                        >
                          <li>
                            <Link
                              to="/students"
                              className={`${
                                "/students" === pathName ? "active" : ""
                              }`}
                            >
                              Students
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                  )}
              </ul>
              {/* /Main Menu*/}{" "}
            </div>
          </div>
        </Scrollbars>
      </div>
    </>
  );
};
export default withRouter(Sidebar);
