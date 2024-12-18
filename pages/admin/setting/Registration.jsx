import React, { useState } from "react";
import styles from "./Registration.module.css";

const Registration = () => {
  const [settings, setSettings] = useState([
    {
      id: 1,
      name: "Max Mobile Per Users",
      type: "text",
      slug: "mobile_users",
      value: "",
    },
    {
      id: 2,
      name: "Max Email Per Users",
      type: "text",
      slug: "email_users",
      value: "",
    },
    {
      id: 3,
      name: "Country Code",
      type: "checkbox",
      slug: "country_code",
      value: true,
    },
    {
      id: 4,
      name: "UserName Generation Prefix",
      type: "text",
      slug: "user_gen_prefix",
      value: "",
    },
    {
      id: 5,
      name: "Max Pan Per Users",
      type: "text",
      slug: "pan_users",
      value: "",
    },
    {
      id: 6,
      name: "Inactive Sponsor",
      type: "checkbox",
      slug: "only_inactive_sponsor",
      value: false,
    },
  ]);

  const handleInputChange = (slug, newValue) => {
    setSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.slug === slug ? { ...setting, value: newValue } : setting
      )
    );
  };

  return (
    <div className={styles.container}>
      <nav>
        <ol className={`breadcrumb ${styles.breadcrumb}`}>
          <li className="breadcrumb-item">
            <a href="https://thewinnersacademy.in/admin/dashboard">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="https://thewinnersacademy.in/admin/settings">Settings</a>
          </li>
          <li className="breadcrumb-item active">Registration</li>
        </ol>
      </nav>

      <div className="row">
        <div className={`col-md-12 card ${styles.card}`}>
          <div className="table-responsive">
            <table className={`table table-bordered ${styles.table}`}>
              <thead>
                <tr>
                  <th>S No.</th>
                  <th>Setting Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {settings.map((setting, index) => (
                  <tr key={setting.id}>
                    <td>{index + 1}.</td>
                    <td>{setting.name}</td>
                    <td>
                      {setting.type === "text" ? (
                        <input
                          className={`form-control ${styles.input}`}
                          type="text"
                          value={setting.value}
                          onChange={(e) =>
                            handleInputChange(setting.slug, e.target.value)
                          }
                        />
                      ) : (
                        <label className={styles.switch}>
                          <input
                            type="checkbox"
                            checked={setting.value}
                            onChange={() =>
                              handleInputChange(setting.slug, !setting.value)
                            }
                          />
                          <span className={styles.slider}></span>
                          <small className={styles.textMuted}>
                            {setting.value ? "On" : "Off"}
                          </small>
                        </label>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
