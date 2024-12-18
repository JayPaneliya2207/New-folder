/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { common } from "../../../src/helper/Common";
import styles from "./view.module.css";

const View = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [viewList, setViewList] = useState([]);

  const viewQuery = router.query.id;
  console.log("routerrouterrouter", router.query.id);

  const getFundRequestList = (appliedFilters = {}) => {
    common.getAPI(
      {
        method: "POST",
        url: "transaction/getAllFundTransactions",
        data: appliedFilters,
      },
      (resp) => {
        if (resp.data && resp.data.length > 0) {
          setViewList(resp.data); // Assuming API returns only one user's data
        } else {
          setViewList([]);
        }
      }
    );
  };
  useEffect(() => {
    getFundRequestList();
  }, []);
  console.log("setViewList".viewList);

  const handleAction = (status) => {
    if (viewList.length === 0) {
      console.error("No transactions available.");
      return;
    }

    // Use the viewQuery to match the correct transaction
    const transaction = viewList.find((data) => data._id === viewQuery);
    if (!transaction) {
      console.error("Transaction ID not found.");
      return;
    }

    const transactionId = transaction._id;

    setLoading(true);

    common
      .getAPI(
        {
          method: "POST",
          url: "transaction/updateFundTransaction",
          data: {
            id: transactionId,
            status,
          },
        },
        (resp) => {
          setLoading(false);
          if (resp.success) {
            alert(
              status === 1
                ? "Transaction approved successfully."
                : "Transaction canceled successfully."
            );
            // Refresh the transaction list
            getFundRequestList();
          }
        }
      )
      .catch((err) => {
        setLoading(false);
        console.error(err);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <div className={styles.pages_container}>
      <div className="container-fluid">
        <div className="row pt-2 pb-2">
          <div className="col-sm-9">
            <h4 className={styles.page_title}>Fund Request Details</h4>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/admin/dashboard">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Fund Request</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Pending</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Fund Request Detail
              </li>
            </ol>
          </div>
        </div>
        <h6 className="text-uppercase">Fund Request Detail</h6>
        <hr />
        <div className="row">
          <div className="col-md-8">
            <div className="table-responsive">
              <table className="table table-hover">
                <tbody>
                  {viewList.length > 0 ? (
                    viewList.map((data, index) => (
                      <>
                        {viewQuery === data._id ? (
                          <React.Fragment key={index}>
                            <tr>
                              <th>User</th>
                              <td>:</td>
                              <td>{data.uCode?.name}</td>
                            </tr>
                            <tr>
                              <th>Amount</th>
                              <td>:</td>
                              <td>{data.amount}</td>
                            </tr>
                            <tr>
                              <th>Method</th>
                              <td>:</td>
                              <td>{data.method}</td>
                            </tr>
                            <tr>
                              <th>Type</th>
                              <td>:</td>
                              <td>{data.txType}</td>
                            </tr>
                            <tr>
                              <th>UTR Number</th>
                              <td>:</td>
                              <td>{data.txNumber}</td>
                            </tr>
                            <tr>
                              <th>Payment Slip</th>
                              <td>:</td>
                              <td>
                                <a
                                  href={data.paymentSlip}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <img
                                    src={data.paymentSlip}
                                    alt="Payment Slip"
                                    style={{ height: 50, width: 50 }}
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <th>Status</th>
                              <td>:</td>
                              <td>
                                <span
                                  className="badge badge-danger"
                                  style={{ backgroundColor: "orangered" }}
                                >
                                  {data.status}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <th>Date</th>
                              <td>:</td>
                              <td>{data.createdAt}</td>
                            </tr>
                          </React.Fragment>
                        ) : (
                          ""
                        )}
                      </>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No data found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-4">
            <form>
              <div className={styles.form_group}>
                <label htmlFor="reason">
                  Reason (Optional for Cancellation)
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  className="form-control"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
              <div className={styles.form_groups}>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => handleAction(1)}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Approve"}
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleAction(2)}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Cancel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
