import React, { useState } from "react";
import styles from "./EditProfile.module.css";
import validator from "validator";
import { AlertMsg } from "../../../src/helper/helper.js";
import { common } from "../../../src/helper/Common.js";
const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [userList, setUserList] = useState([]);
  const [password, setPassword] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [filteredUser, setFilteredUser] = useState();
  const [totalRows, setTotalRows] = useState(0);
  const [isEdit, setIsEdit] = useState(false); // For edit mode
  const [editId, setEditId] = useState(null); // For edit ID

  const addUserFormSubmit = (e) => {
    e.preventDefault();

    const emptyname = validator.isEmpty(name, { ignore_whitespace: true });
    const emptyemail = validator.isEmpty(email, { ignore_whitespace: true });
    const emptypassword = validator.isEmpty(password, {
      ignore_whitespace: true,
    });
    const isemail = validator.isEmail(email);
    const passlength = validator.isLength(password, { min: 5, max: 15 });

    if (emptyname || emptyemail || (emptypassword && !isEdit)) {
      AlertMsg("error", "Oops!", "Field can not be empty!");
      return false;
    } else if (!isemail) {
      AlertMsg("error", "Oops!", "Email is not valid!");
      return false;
    } else if ((!passlength && !isEdit) || (!passlength && password)) {
      AlertMsg(
        "error",
        "Oops!",
        "Password should be between 5 to 15 characters."
      );
      return false;
    } else {
      const data = {
        name: name,
        email: email,
        address: address,
        dob: dob,
        password: password,
      };
      if (isEdit === true) {
        data.id = editId;
        if (password === "") delete data.password;
      }
      // Make the API call to update the user
      setLoading(true);
      common.getAPI(
        {
          method: "POST",
          url: "admin/updateUser",
          data: data,
        },
        (resp) => {
          setLoading(false);
          if (resp.status === "success") {
            AlertMsg("success", "Success!", "User updated successfully.");
            setIsEdit(false);
            setEditId(null);
            // Clear the form after submission
            setName("");
            setEmail("");
            setDob("");
            setAddress("");
            setPassword("");
            // Fetch updated user list
            fetchUsers(1);
          }
        }
      );
    }
  };

  return (
    <div className={styles.pages_container}>
      <div className={styles.containerFluid}>
        <div className="row pt-2 pb-2">
          <div className="col-12 col-md-9">
            <h4 className={styles.pageTitle}>Edit Profile</h4>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="https://thewinnersacademy.in/admin/users">Users</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Edit Profile
              </li>
            </ol>
          </div>
        </div>
        <h6 className="text-uppercase">Edit Profile</h6>
        <hr />
        <div className="row">
          <div className="col-12 col-md-6">
            <div className={styles.cardBody}>
              <form onSubmit={addUserFormSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.lableSection}>Username</label>
                  <input
                    type="text"
                    defaultValue="thewinnersacademy"
                    className={styles.formControl}
                    disabled
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.lableSection}>Sponsor</label>
                  <input
                    type="text"
                    className={`${styles.formControl} no_space`}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.lableSection}>Gender</label>
                  <input
                    type="text"
                    className={`${styles.formControl} no_space`}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.lableSection}>Address</label>
                  <input
                    type="text"
                    className={`${styles.formControl} no_space`}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className={styles.cardBody}>
              <form onSubmit={addUserFormSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.lableSection}>Name</label>
                  <input
                    type="text"
                    name="name"
                    className={styles.formControl}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.lableSection}>Email</label>
                  <input
                    type="email"
                    name="email"
                    className={styles.formControl}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.lableSection}>
                    DOB (Date of Birth)
                  </label>
                  <input
                    type="date"
                    className={`${styles.formControl} no_space`}
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.lableSection}>
                    Set New Password
                  </label>
                  <input
                    type="password"
                    className={styles.formControl}
                    placeholder="Enter New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={`btn btn-primary ${styles.btnRemove}`}
              onClick={addUserFormSubmit} // Using onClick here
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
