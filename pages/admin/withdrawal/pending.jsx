/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState, useEffect } from "react";
import { common } from "../../../src/helper/Common";
import styles from "./withdrawal.module.css";
import { useRouter } from "next/router";

const PendingWithdrawals = () => {
  const router = useRouter();
  const [withdrawals, setWithdrawals] = useState([]);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const viewQuery = router.query?.id;

  // Handle "Select All" checkbox
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      const allRowIds = withdrawals.map((withdrawal) => withdrawal.id);
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  };

  // Handle row checkbox selection
  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Helper function within the same file
  const formatWithdrawals = (data) => {
    return data.map((item) => {
      const amount = item.amount || 0;
      const txCharge = parseFloat(item.txCharge || 0);
      const payableAmount = amount - (amount * txCharge) / 100;
      return {
        id: item._id,
        id: item._id,
        username: item.uCode?.username,
        name: item.uCode?.name,
        email: item.uCode?.email,
        type: item.txType,
        amount: amount,
        status: item.status === 0 ? "Pending" : "Approved",
        date: new Date(item.createdAt).toLocaleDateString(),
        txCharge: txCharge.toFixed(2),
        payableAmount: payableAmount.toFixed(2),
      };
    });
  };

  const fetchWithdrawals = (filters = {}) => {
    common.getAPI(
      {
        method: "POST",
        url: "/withdrawal/getTransactions",
        data: { ...filters },
      },
      (resp) => {
        console.log("API Response::::::::::::::", resp.data);
        // Filter only status === 0 (Pending)
        const pendingData = resp.data.filter((item) => item.status === 0);
        const formattedWithdrawals = formatWithdrawals(pendingData);
        setWithdrawals(formattedWithdrawals);
        setTotalWithdrawals(pendingData.length); // Update total count for pagination
      }
    );
  };

  useEffect(() => {
    fetchWithdrawals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  // Handle form submission for filtering
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchWithdrawals({ username, fullName });
  };

  const handlePaginationClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleAction = (status) => {
    if (!currentWithdrawal) {
      alert("No withdrawal selected.");
      return;
    }

    const payload = {
      id: currentWithdrawal.id,
      status: status,
    };

    const response = common.getAPI({
      method: "POST",
      url: "/withdrawal/updateTransactions",
      data: payload,
    });
    console.log("API Response:", response);
    if (response && response.status === "success") {
      alert(
        status === 1
          ? "Withdrawal approved successfully!"
          : "Withdrawal canceled successfully!"
      );
      fetchWithdrawals();
      // fetchWithdrawals();
      // if (status === 1) {
      //   router.push("/approved");
      // }

      // if (status === 2) {
      //   router.push("/canceled");
      // }
    }
  };

  const currentWithdrawal = withdrawals.find(
    (withdrawal) => withdrawal.id === viewQuery
  );

  return (
    <div className="pages_container">
      <div className="container-fluid">
        <div className="row pt-2 pb-2">
          <div className="col-sm-9">
            <h4 className="page-title">Pending Withdrawals</h4>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/admin/dashboard">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Withdrawals</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Pending
              </li>
            </ol>
          </div>
          <div className="col-sm-3"></div>
        </div>

        <h6 className="text-uppercase">Pending Withdrawals</h6>
        <hr />
        <form onSubmit={handleFilterSubmit} className="form-inline row">
          <div className="col-12 col-md-2 mb-2">
            <div className="form-group w-100">
              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                className="form-control w-100"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="col-12 col-md-2 mb-2">
            <div className="form-group w-100">
              <input
                type="text"
                placeholder="Enter Full Name"
                name="name"
                className="form-control w-100"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          <div className="col-12 col-md-1 mb-2">
            <div className="form-group w-100">
              <select
                name="limit"
                className="form-control w-100"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
              </select>
            </div>
          </div>

          <div className="col-12 col-md-1 mb-2">
            <input
              type="submit"
              className="btn btn-sm btn-primary w-100"
              value="Filter"
            />
          </div>

          <div className="col-12 col-md-1 mb-2">
            <a
              href="/admin/withdrawal/pending"
              className="btn btn-sm btn-secondary w-100"
            >
              Reset
            </a>
          </div>
        </form>
        <div className={`${styles.withdrawalButton}`}>
          <div>
            <button
              className={`btn btn-sm btn-success ${styles.ButtonApprove}`}
              onClick={() => handleAction(1)} // 1 => Approve
            >
              Approve all
            </button>

            <button
              className={`btn btn-sm btn-danger ${styles.ButtonReject}`}
              onClick={() => handleAction(2)} // 2 => Reject
            >
              Reject All
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>S No.</th>
                <th>
                  <input
                    type="checkbox"
                    id="selectAll"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Tx user</th>
                <th>Action</th>
                <th>Amount</th>
                <th>Tx Charge</th>
                <th>Payable Amount</th>
                <th>Tx Record</th>
                <th>Account Details</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((withdrawal, index) => (
                <tr key={withdrawal.id}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(withdrawal.id)}
                      onChange={() => handleRowSelect(withdrawal.id)}
                    />
                  </td>
                  <td>
                    {withdrawal.name}
                    {withdrawal.username && " "}
                    {withdrawal.username && (
                      <small>({withdrawal.username})</small>
                    )}
                    <br />
                  </td>

                  <td>
                    <a
                      className="btn btn-info btn-sm"
                      href={`/admin/withdrawal/viewWithdrawal?id=${withdrawal.id}`}
                    >
                      View
                    </a>
                  </td>
                  <td>{withdrawal.amount}</td>
                  <td>{withdrawal.txCharge}</td>
                  <td>{withdrawal.payableAmount}</td>
                  <td>{withdrawal.TxRecord}</td>
                  <td>{withdrawal.accountDetails}</td>
                  <td>
                    <span
                      className={`badge badge-sm ${
                        withdrawal.status === "Pending"
                          ? "badge-warning"
                          : "badge-success"
                      }`}
                      style={{
                        background:
                          withdrawal.status === "Pending"
                            ? "#fb6340"
                            : "#28a745",
                      }}
                    >
                      {withdrawal.status}
                    </span>
                  </td>
                  <td>{withdrawal.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagging text-center">
          <nav>
            <ul className="pagination justify-content-center">
              {Number.isFinite(totalWithdrawals) &&
              totalWithdrawals > 0 &&
              limit > 0
                ? [...Array(Math.ceil(totalWithdrawals / limit))].map(
                    (_, index) => (
                      <li
                        key={index + 1}
                        className={`page-item ${
                        page === index + 1 ? "active" : ""
                        }`}
                      >
                        <span
                          className="page-link"
                          onClick={() => handlePaginationClick(index + 1)}
                        >
                          {index + 1}
                        </span>
                      </li>
                    )
                  )
                : null}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PendingWithdrawals;
