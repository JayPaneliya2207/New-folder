/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import Link from "next/link";
import styles from "./GeneralSetting.module.css";

const settingsData = [
  { id: 1, name: "Registration" },
  { id: 2, name: "Investment" },
  { id: 3, name: "Withdrawal" },
  { id: 4, name: "Fund" },
  { id: 5, name: "Profile" },
  { id: 6, name: "Dynamicpages" },
  { id: 7, name: "ReInvestment" },
  { id: 8, name: "Account" },
  { id: 9, name: "ComingSoon" },
  { id: 10, name: "Payment Method" },
  { id: 11, name: "Payment Accept Method" },
  { id: 12, name: "Company Info" },
];

const GeneralSetting = () => {
  return (
    <div className={styles.containerFluid}>
      <div className="row pt-3 bg-default">
        <div className="col-sm-10">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/admin/dashboard">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Settings
            </li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className={`card shadow-sm ${styles.card}`}>
            <div className={styles.cardTableInner}>
              {/* Make table responsive on mobile */}
              <div className="table-responsive">
                <table
                  className={`table table-striped table-hover ${styles.table}`}
                >
                  <thead>
                    <tr>
                      <th>S No.</th>
                      <th>Setting Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {settingsData.map((setting) => (
                      <tr key={setting.id}>
                        <td>{setting.id}</td>
                        <td>{setting.name}</td>
                        <td>
                          <Link
                            href={`/admin/setting/set?title=${setting.name}`}
                            className={`btn btn-info btn-sm ${styles.btnInfo}`}
                          >
                            <span className={styles.editButtonSpan}>
                              <i className="fa fa-edit" />{" "}
                              <span className={styles.editButtonText}>
                                Edit
                              </span>
                            </span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSetting;
