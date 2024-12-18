import React, { useState } from "react";
import styles from "./DynamicPages.module.css";

const DynamicPages = () => {
  const [selectedPages, setSelectedPages] = useState([]);

  const pages = [
    { key: "term_condition", label: "TERM CONDITION" },
    { key: "privacy_policy", label: "PRIVACY POLICY" },
    { key: "about_us", label: "ABOUT US" },
    { key: "our_mission", label: "OUR MISSION" },
    { key: "our_vision", label: "OUR VISION" },
    { key: "legals", label: "LEGAL" },
    { key: "contact_detail", label: "CONTACT DETAIL" },
    { key: "bank_detail", label: "BANK DETAIL" },
    { key: "social_media", label: "SOCIAL MEDIA LINK" },
  ];

  const handleCheckboxChange = (key) => {
    setSelectedPages((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  return (
    <div className={styles.container}>
      {/* Breadcrumb Navigation */}
      <nav>
        <ol className={styles.breadcrumb}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Settings</a>
          </li>
          <li className={styles.active}>Dynamic Pages</li>
        </ol>
      </nav>

      {/* Dynamic Pages Table */}
      <div className={styles.card}>
        <h3 className={styles.title}>Dynamic Pages</h3>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S No.</th>
                <th>Setting Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>pages Type</td>
                <td className={styles.checkboxContainer}>
                  {pages.map((page) => (
                    <div key={page.key} className={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        id={page.key}
                        checked={selectedPages.includes(page.key)}
                        onChange={() => handleCheckboxChange(page.key)}
                      />
                      <label
                        htmlFor={page.key}
                        className={styles.checkboxLabel}
                      >
                        {page.label}
                      </label>
                    </div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DynamicPages;
