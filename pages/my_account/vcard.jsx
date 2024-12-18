import React from "react";
import { FaDownload } from "react-icons/fa6";
import styles from "./myaccount.module.css";

const vcard = () => {
  return (
    <div className="pages_container">
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
              <FaDownload className={styles.dowloade_btn} />
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
  );
};

export default vcard;
