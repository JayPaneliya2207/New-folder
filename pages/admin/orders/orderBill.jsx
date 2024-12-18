/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./OrderBill.module.css";

const OrderBill = () => {
  const printDiv = () => {
    const divToPrint = document.getElementById("DivIdToPrint");
    const newWin = window.open("", "Print-Window");
    newWin.document.open();
    newWin.document.write(
      '<html><body onload="window.print()">' +
        divToPrint.innerHTML +
        "</body></html>"
    );
    newWin.document.close();
    setTimeout(() => newWin.close(), 10);
  };

  return (
    <div className={styles.container}>
      <div className="pu_datatable_wrapper">
        <div className="pages">
          <div className="row">
            <div className="col-sm-12">
              <ol className={styles.breadcrumb}>
                <li className={styles["breadcrumb-item"]}>
                  <a href="https://thewinnersacademy.in/admin/dashboard">home</a>
                </li>
                <li className={styles["breadcrumb-item"]}>
                  <a href="#">Order</a>
                </li>
                <li className={styles["breadcrumb-item"]}>
                  <a href="#">Bill</a>
                </li>
                <li
                  className={`${styles["breadcrumb-item"]} ${styles.active}`}
                  aria-current="page"
                >
                  Order Bill
                </li>
              </ol>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <center>
                <a
                  href="#"
                  className={styles.btn}
                  onClick={printDiv}
                  title="Print Form"
                >
                  <i className="fa fa-print"></i>
                </a>
              </center>

              <div id="DivIdToPrint">
                <div className={styles["invoice-box"]}>
                  <table cellPadding="0" cellSpacing="0">
                    <tbody>
                      <tr className="top">
                        <td colSpan="6">
                          <table>
                            <tbody>
                              <tr>
                                <td className="title">
                                  <img
                                    src="https://thewinnersacademy.in/images/logo/TWA_(1)1.png"
                                    alt="The Winners Academy"
                                    style={{width:'100px'}}
                                  />
                                </td>
                                <td>
                                  Invoice #: 1
                                  <br />
                                  Bill Date: Aug 28, 2024
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>

                      <tr className="information">
                        <td colSpan="6">
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  <strong>The Winners Academy</strong>
                                  <br />
                                  Email: thewinnersacademyin@gmail.com
                                  <br />
                                  Mobile: +91**********
                                  <br />
                                  Website: https://thewinnersacademy.in/
                                </td>
                                <td>
                                  <strong>
                                    <b>Shipping Info</b>
                                  </strong>
                                  <br />
                                  Name: DEEPA PRASHANT PATANKAR
                                  <br />
                                  Mobile: +91 **********
                                  <br />
                                  Address: No. 1, Sector-10, Navi Mumbai,
                                  Maharashtra, India
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>

                      <tr className={styles.heading}>
                        <td>Payment Method</td>
                        <td>Cash</td>
                      </tr>

                      <tr className="details">
                        <td>Amount</td>
                        <td>₹200.00</td>
                      </tr>

                      <tr className={styles.heading}>
                        <td>Items</td>
                        <td>Price</td>
                      </tr>

                      <tr className={styles.item}>
                        <td>O-Level Coaching</td>
                        <td>₹200.00</td>
                      </tr>

                      <tr className={styles.total}>
                        <td></td>
                        <td>Total: ₹200.00</td>
                      </tr>
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

export default OrderBill;
