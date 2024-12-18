import React, { useState, useEffect } from "react";
import styles from "./EditAccount.module.css";
import { useRouter } from "next/router";
import { common } from "../../../src/helper/Common.js";

const EditAccount = ({ id }) => {
  const router = useRouter();
  const { query } = router;

  const [selectedAccountType, setSelectedAccountType] = useState("");
  const [accountDetails, setAccountDetails] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newAccount, setNewAccount] = useState({
    bankName: "",
    ifsc: "",
    accountNumber: "",
    holderName: "",
    accountType: "",
    branch: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch user data
  const fetchUsers = async (userId) => {
    setLoading(true);
    // setError("");
    try {
      const resp = await common.getAPI({
        method: "POST",
        url: "admin/getUser",
        data: { id: userId },
      });

      if (resp.status === "success") {
        setAccountDetails(resp.data || []);
      } else {
        throw new Error(resp.message);
      }
    } catch (error) {
      setError("Error fetching user data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query?.id) {
      fetchUsers(query.id);
    }
  }, [query.id]);

  const handleAccountTypeChange = (e) => {
    setSelectedAccountType(e.target.value);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewAccount((prev) => ({ ...prev, [id]: value }));
  };

  const resetForm = () => {
    setNewAccount({
      bankName: "",
      ifsc: "",
      accountNumber: "",
      holderName: "",
      accountType: "",
      branch: "",
    });
    setSelectedAccountType("");
    setEditMode(false);
    setEditIndex(null);
  };
  // Save accounts to local storage
  const saveAccountsToLocalStorage = (accounts) => {
    localStorage.setItem("accountDetails", JSON.stringify(accounts));
  };

  // Load accounts from local storage
  const loadAccountsFromLocalStorage = () => {
    const accounts = localStorage.getItem("accountDetails");
    return accounts ? JSON.parse(accounts) : [];
  };

  // In your useEffect, load accounts from local storage
  useEffect(() => {
    if (query?.id) {
      fetchUsers(query.id);
    }
    // Load from local storage on component mount
    const storedAccounts = loadAccountsFromLocalStorage();
    if (storedAccounts.length > 0) {
      setAccountDetails(storedAccounts);
    }
  }, [query.id]);

  const addOrUpdateAccount = async (e) => {
    e.preventDefault();

    if (selectedAccountType === "bank" && newAccount.accountNumber) {
      const updatedDetails = editMode
        ? accountDetails.map((acc, index) =>
            index === editIndex ? newAccount : acc
          )
        : [...accountDetails, newAccount];

      setAccountDetails(updatedDetails);
      saveAccountsToLocalStorage(updatedDetails);
      await addUserFormSubmit(newAccount, editMode);
      resetForm();
    }
  };

  const handleAccountSelect = (index) => {
    const accountToEdit = accountDetails[index];
    setNewAccount(accountToEdit);
    setEditMode(true);
    setEditIndex(index);
    setSelectedAccountType("bank");
  };

  const addUserFormSubmit = async (accountData, isUpdate) => {
    setLoading(true);
    setError("");

    const bankDetailsPayload = {
      bankDetails: {
        IFSC: accountData.ifsc || "",
        account: accountData.accountNumber || "",
        accountType: accountData.accountType || "",
        holderName: accountData.holderName || "",
        branch: accountData.branch || "",
      },
    };

    try {
      const resp = await common.getAPI({
        method: "POST",
        url: isUpdate ? "admin/updateUser" : "admin/addUser",
        data: { ...bankDetailsPayload, id: query.id },
      });

      if (resp.status !== "success") {
        throw new Error(resp.message);
      }
      fetchUsers(query.id);
    } catch (error) {
      setError("Error submitting account: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeAccount = (index) => {
    const updatedAccounts = accountDetails.filter((_, i) => i !== index);
    setAccountDetails(updatedAccounts);
  };

  return (
    <div className={styles.pagesContainer}>
      <div className="container-fluid">
        <h6 className="text-uppercase">Edit Account</h6>
        <hr />
        {/* {loading && <div>Loading...</div>}
        {error && <div className="alert alert-danger">{error}</div>} */}
        <div className="row">
          <div className="col-md-6">
            <div className={`card ${styles.cardBody}`}>
              <form onSubmit={addOrUpdateAccount}>
                <div className={styles.formGroup}>
                  <label
                    htmlFor="account_type"
                    style={{ textTransform: "uppercase" }}
                  >
                    Select Type
                  </label>
                  <select
                    name="account_type"
                    className={styles.formControl}
                    id="account_type"
                    value={selectedAccountType}
                    onChange={handleAccountTypeChange}
                  >
                    <option value="">Select Type</option>
                    <option value="bank">Bank</option>
                  </select>
                </div>
                {selectedAccountType === "bank" && (
                  <div id="add_account_sec">
                    {[
                      "bankName",
                      "ifsc",
                      "accountNumber",
                      "holderName",
                      "accountType",
                      "branch",
                    ].map((field) => (
                      <div className={styles.formGroup} key={field}>
                        <label htmlFor={field}>
                          {field.replace(/([A-Z])/g, " $1").trim()}
                        </label>
                        <input
                          type="text"
                          className={styles.formControl}
                          id={field}
                          value={newAccount[field]}
                          onChange={handleInputChange}
                          placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <button type="submit" className="btn btn-primary">
                  {editMode ? "Update Account" : "Add Account"}
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <table className={`table table-bordered ${styles.table}`}>
              <thead>
                <tr>
                  <th>Bank</th>
                  <th>Branch</th>
                  <th>IFSC</th>
                  <th>Account Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {accountDetails.map((account, index) => (
                  <tr key={index}>
                    <td>{account.bankName}</td>
                    <td>{account.branch}</td>
                    <td>{account.ifsc}</td>
                    <td>{account.accountNumber}</td>
                    <td style={{ display: "flex", gap: "5px" }}>
                      <button
                        onClick={() => handleAccountSelect(index)}
                        className="btn btn-sm btn-info"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removeAccount(index)}
                        className="btn btn-sm btn-danger"
                      >
                        Remove
                      </button>
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

export default EditAccount;
