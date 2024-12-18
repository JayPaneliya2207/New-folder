import React, { useState, useEffect } from "react";
import styles from "./style.module.css"; // Import the CSS module
import { common } from "../../../src/helper/Common.js";

const ContactUs = () => {
  const [contacts, setContacts] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch contacts from the API
  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoading(true);
      try {
        common.getAPI(
          {
            method: "POST",
            url: "/contactUs/getContacts",
            // data,
          },
          (response) => {
            console.log("responseresponse", response);
            if (response.status === "success") {
              setContacts(response); // Update contacts state
            } else {
              setError("Failed to fetch contacts: " + response.message);
            }
            setIsLoading(false);
          },
          (error) => {
            console.error("Error fetching contacts:", error);
            setError("An error occurred while fetching contacts.");
            setIsLoading(false);
          }
        );
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred.");
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className={styles.pagesContainer}>
      <div className="pu_datatable_wrapper">
        <div className="container-fluid">
          <div className="row pt-2 pb-2">
            <div className="col-sm-9">
              <h4 className={styles.pageTitle}>Contact</h4>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="https://thewinnersacademy.in/admin/dashboard">
                    home
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Contact</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Detail
                </li>
              </ol>
            </div>
            <div className="col-sm-3"></div>
          </div>
          <h6 className={styles.sectionTitle}>Contact Detail</h6>
          <hr />
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <br />
              <br />
              {isLoading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className={styles.errorMessage}>{error}</p>
              ) : (
                <div className={styles.tableResponsive}>
                  <table className={`${styles.table} ${styles.tableHover}`}>
                    <thead>
                      <tr>
                        <th>S No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Subject</th>
                        <th>Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.length > 0 ? (
                        contacts.map((contact, index) => (
                          <tr key={contact.id}>
                            <td>{index + 1}</td>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.mobile}</td>
                            <td>{contact.subject}</td>
                            <td>{contact.message}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className={styles.noDataMessage}>
                            No Contacts Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
