import React, { useEffect, useState, useContext } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { DarkModeContext } from "../../../src/components/common/darkmodeContext/DarkModeContext";
import Link from "next/link";
import { common } from "../../../src/helper/Common";
import styles from "./fund.module.css";

const FundResultHistory = () => {
  const [getTransactionRequestList, setGetTransactionRequestList] = useState(
    []
  );
  const { darkMoreMainSection } = useContext(DarkModeContext);
  const [filters, setFilters] = useState({
    pageSize: "20",
    status: "0",
    startDate: "",
    endDate: "",
  });

  const getFundRequestList = (appliedFilters = {}) => {
    common.getAPI(
      {
        method: "POST",
        url: "transaction/getFundTransactionsByUser",
        data: appliedFilters,
      },
      (resp) => {
        if (resp.data && resp.data.length > 0) {
          setGetTransactionRequestList(resp.data);
        } else {
          setGetTransactionRequestList([]);
        }
      }
    );
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApplyFilter = (e) => {
    e.preventDefault();

    const appliedFilters = {
      ...filters,
      status: Number(filters.status),
    };

    getFundRequestList(appliedFilters);
  };

  const handleResetFilter = () => {
    const resetFilters = {
      pageSize: "20",
      status: "0",
      startDate: "",
      endDate: "",
    };
    setFilters(resetFilters);
    getFundRequestList(resetFilters);
  };

  useEffect(() => {
    getFundRequestList();
  }, []);

  const filteredTransactions = getTransactionRequestList
    .filter((transaction) => {
      const matchesStatus =
        filters.status === "0" || transaction.status === Number(filters.status);

      const matchesStartDate = filters.startDate
        ? new Date(transaction.createdAt) >= new Date(filters.startDate)
        : true;

      const matchesEndDate = filters.endDate
        ? new Date(transaction.createdAt) <= new Date(filters.endDate)
        : true;

      return matchesStatus && matchesStartDate && matchesEndDate;
    })
    .slice(0, Number(filters.pageSize));

  return (
    <div className="user_pages_container">
      <div
        className={`${
          darkMoreMainSection
            ? `${styles.darkmode_fund_request_history_section}`
            : `${styles.fund_request_history_section}`
        }`}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/dashboard" passHref>
              <a className="text-decoration-none">/Home</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-white">/fund</Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white">
            Fund Request History
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className="row">
          <div className="col-xl-12">
            <form
              className={`${styles.addfuns_result_walet}`}
              onSubmit={handleApplyFilter}
            >
              <div className="card-header card-no-border pb-0">
                <h3 className="card-title mb-0">Filter</h3>
              </div>
              <div className={styles.result_border}></div>
              <div className={`card-body ${styles.card_body}`}>
                <div className="row">
                  <div className="col-md-2">
                    <div className="mb-3">
                      <select
                        name="pageSize"
                        className="form-control btn-square"
                        value={filters.pageSize}
                        onChange={handleFilterChange}
                      >
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="mb-3">
                      <select
                        name="status"
                        className="form-control btn-square"
                        value={filters.status}
                        onChange={handleFilterChange}
                      >
                        <option value="0">Pending</option>
                        <option value="1">Approved</option>
                        <option value="2">Rejected</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-2">
                    <div className="mb-3">
                      <input
                        name="startDate"
                        className="form-control"
                        type="date"
                        value={filters.startDate}
                        onChange={handleFilterChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-2">
                    <div className="mb-3">
                      <input
                        name="endDate"
                        className="form-control"
                        type="date"
                        value={filters.endDate}
                        onChange={handleFilterChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer text-end">
                <button
                  className={`btn btn-danger ${styles.request_history_btn}`}
                  type="button"
                  onClick={handleResetFilter}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-xl-12">
            <div className={`card ${styles.addfuns_walet}`}>
              <div className="card-body">
                <div className="dt-responsive table-responsive">
                  <table
                    id="base-style"
                    className="table table-striped table-bordered nowrap"
                  >
                    <thead>
                      <tr>
                        <th>Sr No.</th>
                        <th>Amount($)</th>
                        <th>Method</th>
                        <th>Type</th>
                        <th>UTR Number</th>
                        <th>Payment Slip</th>
                        <th>Status</th>
                        <th>Reason</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="text-center">
                            No transactions match your filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredTransactions.map((transaction, index) => (
                          <tr key={transaction._id}>
                            <td>{index + 1}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.method}</td>
                            <td>{transaction.txType}</td>
                            <td>{transaction.txNumber}</td>
                            <td>
                              <img
                                src={`${process.env.API_URL}${transaction.paymentSlip}`}
                                alt="Payment Slip"
                                style={{ width: "50px", height: "50px" }}
                              />
                            </td>
                            <td>
                              {transaction.status === 0
                                ? "Pending"
                                : transaction.status === 1
                                ? "Approved"
                                : "Rejected"}
                            </td>
                            <td>{transaction.reason || "-"}</td>
                            <td>
                              {new Date(
                                transaction.createdAt
                              ).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundResultHistory;
