import React, { useEffect } from "react";
import { FaAngleRight } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Sidebar.module.css";

const SidebarMenu = ({ route, isOpen, isActive, onMenuToggle }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) {
      onMenuToggle(null); 
    }
  }, [isOpen, onMenuToggle]);

  return (
    <>
      <div className={`${styles.menu} ${isActive ? styles.active : ""}`} onClick={() => onMenuToggle(route.name)}>
        <div className={styles.menu_item}>
          <div className={styles.icon}>{route.icon}</div>
          {isOpen && <div className={styles.link_text}>{route.name}</div>}
        </div>
        {isOpen && (
          <div className={styles.arrow_icon} style={{ transform: isActive ? "rotate(90deg)" : "rotate(0deg)" }}>
            <FaAngleRight />
          </div>
        )}
      </div>
      {isActive && (
        <div className={styles.menu_container}>
          {route.subRoutes.map((subRoute, i) => {
            const isSubActive = router.pathname === subRoute.href;

            return (
              <div key={i} className={styles.submenu_item}>
                <Link href={subRoute.href} passHref>
                  <div className={`${styles.link} ${isSubActive ? styles.active : ""}`}>
                    <div className={styles.icon}>{subRoute.icon}</div>
                    <div className={styles.circle_icon}>{subRoute.circle_icon}</div>
                    {isOpen && <div className={styles.link_text}>{subRoute.name}</div>}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SidebarMenu;
