import React, { useState, useEffect, useMemo, useContext } from "react";
import Link from "next/link";
import { MenuRoutes } from "./Menu";
import SidebarMenu from "./SidebarMenu";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logout, registerNewUser } from "../../../redux/actions/authAction";
import { DarkModeContext } from "../darkmodeContext/DarkModeContext";
import styles from "./Sidebar.module.css";

const Sidebar = ({ isOpen }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const { darkMode } = useContext(DarkModeContext);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const activeRoute = useMemo(() => {
    return MenuRoutes.find((route) =>
      route.subRoutes
        ? route.subRoutes.some((subRoute) => subRoute.href === router.pathname)
        : route.href === router.pathname
    );
  }, [router.pathname]);

  useEffect(() => {
    setActiveMenu(activeRoute ? activeRoute.name : null);
  }, [activeRoute]);

  const handleMenuToggle = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  return (
    <aside
      className={`${styles.page_sidebar} ${darkMode ? "darkmode_sidebar" : ""} ${
        isOpen || isHovered ? styles.open : styles.sidebar_close
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <section className={styles.routes}>
        {MenuRoutes.map((route, index) => {
          // Check if the route is "Logout" to handle it separately
          if (route.name === "Logout") {
            return (
              <div
                key={index}
                role="button"
                onClick={() => dispatch(logout())}
                className={`${styles.link} ${styles.logout}`}
              >
                <div className={styles.icon}>{route.icon}</div>
                {isOpen && <div className={styles.link_text}>{route.name}</div>}
              </div>
            );
          }

          // Check if the route is "Register" to handle it separately
          if (route.name === "Register New User") {
            return (
              <div
                key={index}
                role="button"
                onClick={() => dispatch(registerNewUser())}
                className={`${styles.link} ${styles.register}`}
              >
                <div className={styles.icon}>{route.icon}</div>
                {isOpen && <div className={styles.link_text}>{route.name}</div>}
              </div>
            );
          }

          if (route.subRoutes) {
            return (
              <SidebarMenu
                route={route}
                isOpen={isOpen || isHovered}
                isActive={activeMenu === route.name}
                onMenuToggle={handleMenuToggle}
                key={index}
              />
            );
          }

          return (
            <Link href={route.href} key={index} passHref>
              <div
                className={`${styles.link} ${
                  router.pathname === route.href ? styles.active : ""
                }`}
                role="button"
                aria-current={
                  router.pathname === route.href ? "page" : undefined
                }
              >
                <div className={styles.icon}>{route.icon}</div>
                {isOpen && <div className={styles.link_text}>{route.name}</div>}
              </div>
            </Link>
          );
        })}
      </section>
    </aside>
  );
};

export default Sidebar;
