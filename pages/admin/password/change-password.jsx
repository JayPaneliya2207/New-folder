/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState } from "react";
import styles from "./ChangePassword.module.css";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.new_password !== formData.confirm_password) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }

    // Add your API call or submission logic here
    setSuccess("Password changed successfully!");
    setError("");
    setFormData({
      old_password: "",
      new_password: "",
      confirm_password: "",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.pageTitle}>Change Password</h4>
      </div>
      <div className={styles.formWrapper}>
        <div className={styles.card}>
          <h5 className={styles.cardTitle}>Update Your Password</h5>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="old_password" className={styles.labels}>
                Old Password
              </label>
              <input
                type="password"
                name="old_password"
                id="old_password"
                value={formData.old_password}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter Old Password"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="new_password" className={styles.labels}>
                New Password
              </label>
              <input
                type="password"
                name="new_password"
                id="new_password"
                value={formData.new_password}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter New Password"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirm_password" className={styles.labels}>
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                className={styles.input}
                placeholder="Confirm New Password"
                required
              />
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
            {success && <div className={styles.successMessage}>{success}</div>}
            <button type="submit" className={styles.submitButton}>
              Set Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
