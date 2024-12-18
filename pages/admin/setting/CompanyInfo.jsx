/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styles from "./CompanyInfo.module.css";

const CompanyInfo = () => {
  const [logo, setLogo] = useState(null);

  // Function to handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result); // Set the selected image
      };
      reader.readAsDataURL(file); // Read the file as data URL
    }
  };

  return (
    <div className="container-fluid py-4">
      <nav aria-label="breadcrumb">
        <ol className={`breadcrumb ${styles.breadcrumbContainer}`}>
          <li className="breadcrumb-item">
            <a href="">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="">Settings</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Company Info
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-12">
          <div className={`card ${styles.cardContainer}`}>
            <div className="card-body">
              <h5 className={styles.cardTitle}>Company Information</h5>
              <div className={`table-responsive ${styles.tableWrapper}`}>
                {" "}
                {/* Add the 'table-responsive' here */}
                <table className={`table ${styles.table}`}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Field</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 1, label: "Company Name", name: "company_name" },
                      { id: 2, label: "Base URL", name: "base_url" },
                      { id: 3, label: "Company Logo", isFile: true },
                      {
                        id: 4,
                        label: "Logo Height",
                        value: " ",
                        name: "logo_height",
                      },
                      {
                        id: 5,
                        label: "Logo Width",
                        value: " ",
                        name: "logo_width",
                      },
                      {
                        id: 6,
                        label: "Company Title",
                        value: " ",
                        name: "title",
                      },
                      {
                        id: 7,
                        label: "Company Address",
                        value: " ",
                        name: "company_address",
                      },
                      {
                        id: 8,
                        label: "Company Mobile",
                        value: " ",
                        name: "company_mobile",
                      },
                      {
                        id: 9,
                        label: "Company Currency",
                        value: " ",
                        name: "currency",
                      },
                      {
                        id: 10,
                        label: "Token Rate",
                        value: " ",
                        name: "token_rate",
                      },
                      {
                        id: 11,
                        label: "Company Founder Name",
                        value: " ",
                        name: "company_founder_name",
                      },
                      {
                        id: 12,
                        label: "Company Founder Designation",
                        value: " ",
                        name: "company_founder_designation",
                      },
                      {
                        id: 13,
                        label: "Company Facebook Link",
                        value: " ",
                        name: "company_facebook_link",
                      },
                      {
                        id: 14,
                        label: "Company Twitter Link",
                        value: " ",
                        name: "company_twitter_link",
                      },
                      {
                        id: 15,
                        label: "Company Youtube Link",
                        value: " ",
                        name: "company_youtube_link",
                      },
                      {
                        id: 16,
                        label: "Company LinkedIn Link",
                        value: " ",
                        name: "company_linkedin_link",
                      },
                    ].map((field) => (
                      <tr key={field.id}>
                        <td>{field.id}</td>
                        <td>{field.label}</td>
                        <td>
                          <form
                            action=""
                            method="post"
                            encType={
                              field.isFile ? "multipart/form-data" : undefined
                            }
                            style={{ display: "flex" }}
                          >
                            {field.isFile ? (
                              <div className={styles.formGroup}>
                                {logo && (
                                  <img
                                    src={logo} // Display the selected logo
                                    alt={field.label}
                                    className={styles.imageThumbnail}
                                  />
                                )}
                                <input
                                  type="file"
                                  className={styles.inputField}
                                  name="logo"
                                  id="logo"
                                  onChange={handleFileChange} // Handle file change
                                />
                              </div>
                            ) : (
                              <div className={styles.formGroup}>
                                <input
                                  type="text"
                                  className={styles.inputField}
                                  name={field.name}
                                  id={field.name}
                                />
                              </div>
                            )}
                            <button
                              type="submit"
                              className={styles.submitButton}
                            >
                              Submit
                            </button>
                          </form>
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

export default CompanyInfo;
