/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState, useEffect, useCallback } from "react";
import { common } from "../../../src/helper/Common";

const ApprovedWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    username: "",
    name: "",
    limit: 10,
    page: 1,
  });
  const [totalPages, setTotalPages] = useState(1);

  const fetchWithdrawals = useCallback((filters) => {
    setLoading(true);
    common.getAPI(
      {
        method: "POST",
        url: "/withdrawal/getTransactions",
        data: { ...filters, status: 1 },
      },
      (resp) => {
        const formattedWithdrawals = formatWithdrawals(resp.data);
        setWithdrawals(formattedWithdrawals);
        setTotalPages(Math.ceil(resp.total / filters.limit));
        setLoading(false);
      }
    );
  }, []);

  const formatWithdrawals = (data) => {
    return data.map((item) => {
      const amount = item.amount || 0;
      const txCharge = parseFloat(item.txCharge || 0);
      const payableAmount = amount - (amount * txCharge) / 100;

      return {
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

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const handleInputChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters((prevFilters) => ({ ...prevFilters, page: 1 }));
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setFilters((prevFilters) => ({ ...prevFilters, page }));
    }
  };

  return (
    <div className="pages_container">
      <div className="container-fluid">
        <div className="row pt-2 pb-2">
          <div className="col-md-9">
            <h4 className="page-title">Approved Withdrawals</h4>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/admin/dashboard">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Withdrawals</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Approved
              </li>
            </ol>
          </div>
        </div>

        <h6 className="text-uppercase">Approved Withdrawals</h6>
        <hr />

        <form onSubmit={handleSubmit} className="row mb-3">
          <div className="col-lg-3 col-md-4 col-sm-12 mb-2">
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              className="form-control"
              value={filters.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-12 mb-2">
            <input
              type="text"
              placeholder="Enter Full Name"
              name="name"
              className="form-control"
              value={filters.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-lg-2 col-md-3 col-sm-12 mb-2">
            <select
              name="limit"
              className="form-control"
              value={filters.limit}
              onChange={handleInputChange}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
            </select>
          </div>
          <div className="col-lg-2 col-md-12 col-sm-12 mb-2 d-flex justify-content-evenly">
            <input
              type="submit"
              className="btn btn-primary btn-sm mr-2"
              value="Filter"
            />
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() =>
                setFilters({ username: "", name: "", limit: 10, page: 1 })
              }
            >
              Reset
            </button>
          </div>
        </form>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>S No.</th>
                <th>Tx User</th>
                <th>Amount</th>
                <th>Tx Charge</th>
                <th>Payable Amount</th>
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
                    {withdrawal.name}
                    {withdrawal.username && " "}
                    {withdrawal.username && (
                      <small>({withdrawal.username})</small>
                    )}
                    <br />
                  </td>
                  <td>{withdrawal.amount}</td>
                  <td>{withdrawal.txCharge}</td>
                  <td>{withdrawal.payableAmount}</td>
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
        <div className="pagination-container">
          <button
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page <= 1}
          >
            Prev
          </button>
          <span>
            Page {filters.page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(filters.page + 1)}
            disabled={filters.page >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovedWithdrawals;
