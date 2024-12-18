import React, { useContext } from "react";
import { FaDownload } from "react-icons/fa6";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { common } from "../../../src/helper/Common";
import { jsPDF } from "jspdf";
import { DarkModeContext } from "../../../src/components/common/darkmodeContext/DarkModeContext";
import Link from "next/link";
import styles from "./myaccount.module.css";

const vcard = () => {
  const { darkMoreMainSection } = useContext(DarkModeContext);

  const geUserCard = () => {
    common.getAPI(
      {
        method: "POST",
        url: "user/getProfile",
        data: {},
      },
      (resp) => {
        console.log("===============", resp);
      }
    );
  };

  const handleDownload = () => {
    const pdf = new jsPDF({
      format: "a4",
      unit: "mm",
    });

    // Adding content to the PDF
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("User Information - vCard", 10, 20);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(14);
    pdf.text("Username: 645237", 10, 40);
    pdf.text("Name: hbnfhvb", 10, 50);
    pdf.text("MobileNo: 6452374578", 10, 60);
    pdf.text("Joining Date: 10-10-2024", 10, 70);

    pdf.setFont("helvetica", "italic");
    pdf.text("Signature: _________________________", 10, 100);
    pdf.save("vcard.pdf");
  };

  return (
    <div className="user_pages_container">
      <div
        className={`${
          darkMoreMainSection
            ? `${styles.darkmode_vcard_sec}`
            : `${styles.vcard_sec}`
        }`}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/dashboard" passHref>
              <a className="text-decoration-none">/Home</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-white">/My account</Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white">
            vcard
          </Breadcrumb.Item>
        </Breadcrumb>
        <section>
          <div className="container">
            <div className={styles.profile_card_3}>
              <div className={styles.background_block}>
                <img
                  src="/images/dashboard/cover.jpg"
                  alt="Background Image"
                  className={styles.background}
                />
              </div>
              <div className={styles.profile_thumb_block}>
                <img
                  src="/images/dashboard/card.png"
                  alt="Profile Image"
                  className={styles.profile}
                />
              </div>
              <div className={styles.card_content}>
                <FaDownload
                  className={styles.dowloade_btn}
                  onClick={handleDownload}
                />
                <h2>JP</h2>
                <div className={styles.icon_block}>
                  <p>
                    Username: <span>645237</span>
                  </p>
                  <p>
                    Name: <span>hbnfhvb</span>
                  </p>
                  <p>
                    MobileNo: <span>6452374578</span>
                  </p>
                  <p>
                    Joining Date: <span>10-10-2024</span>
                  </p>
                </div>
                <div className={styles.Signature}>
                  <p>Signature</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default vcard;
