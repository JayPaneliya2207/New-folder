import React, { useContext } from "react";
import { useRouter } from "next/router";
import { DarkModeContext } from "../../common/darkmodeContext/DarkModeContext";
import styles from "./Footer.module.css";

const Footer = () => {
  const { darkMoreMainSection } = useContext(DarkModeContext);
  const router = useRouter();
  const { pathname } = router;
  const isUserRoute =
    pathname.startsWith("/") && !pathname.startsWith("/admin");

  return (
    <footer className="footer">
      <p
        className={`footer__copy ${
          isUserRoute
            ? darkMoreMainSection
              ? styles.darkmode_user_footer_section
              : styles.user_footer_section
            : styles.footer_section
        }`}
      >
        Copyright &#169; 2024 The Winners Academy
      </p>
    </footer>
  );
};

export default Footer;
