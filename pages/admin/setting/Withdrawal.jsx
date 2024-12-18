/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import styles from "./Withdrawal.module.css";

const Withdrawal = () => {
  const settings = [
    { id: 1, name: "Minimum Withdrawal Limit 10", value: "" },
    {
      id: 2,
      name: "Withdrawal days",
      days: [
        "Sunday",
        "Saturday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
    },
    { id: 3, name: "Withdrawal Start-time", value: "" },
    { id: 4, name: "Withdrawal End-time", value: "" },
    { id: 5, name: "Withdrawal with OTP", isSwitch: true },
    { id: 6, name: "Maximum Withdrawal Limit", value: "" },
    { id: 7, name: "Minimum Withdrawal Limit 50", value: "" },
  ];

  return (
    <div className={`${styles.container} container-fluid`}>
      <nav className={styles.breadcrumbNav}>
        <ol className={styles.breadcrumb}>
          <li className={styles.breadcrumbItem}>
            <a href="/admin/dashboard" className={styles.breadcrumbLink}>
              Home
            </a>
          </li>
          <li className={styles.breadcrumbItem}>
            <a href="/admin/settings" className={styles.breadcrumbLink}>
              Settings
            </a>
          </li>
          <li className={`${styles.breadcrumbItem} ${styles.breadcrumbActive}`}>
            <span>Withdrawal</span>
          </li>
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
                    <td>{index + 1}</td>
                    <td>{setting.name}</td>
                    <td>
                      {setting.value && (
                        <input
                          type="text"
                          className={`form-control ${styles.input}`}
                          defaultValue={setting.value}
                        />
                      )}
                      {setting.days && (
                        <div className={styles.checkboxGroup}>
                          {setting.days.map((day) => (
                            <div key={day} className={styles.checkbox}>
                              <input
                                type="checkbox"
                                id={`wd_days_${day}`}
                                defaultChecked
                              />
                              <label htmlFor={`wd_days_${day}`}>{day}</label>
                            </div>
                          ))}
                        </div>
                      )}
                      {setting.isSwitch && (
                        <div className={styles.switch}>
                          <input type="checkbox" id={`switch_${setting.id}`} />
                          <label htmlFor={`switch_${setting.id}`}></label>
                        </div>
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

export default Withdrawal;
