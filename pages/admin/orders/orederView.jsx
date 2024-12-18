import React from "react";

const orederView = () => {
  return (
    <div className="pu_container">
      <div className="pu_datatable_wrapper">
        <div className="row pt-2 pb-2">
          <div className="col-sm-9">
            <h4 className="page-title">Order Details</h4>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="https://thewinnersacademy.in/admin/dashboard">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Order</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">All</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Order Detail
              </li>
            </ol>
          </div>
          <div className="col-sm-3"></div>
        </div>

        <h6 className="text-uppercase">Order Detail</h6>
        <hr />

        <div className="row">
          <div className="col-12 col-md-8">
            <div className="table-responsive">
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <th>User</th>
                    <td>:</td>
                    <td>WA4028635</td>
                  </tr>
                  <tr>
                    <th>Amount</th>
                    <td>:</td>
                    <td>10499</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td>:</td>
                    <td>2024-08-28 06:10:48</td>
                  </tr>
                  <tr>
                    <th>
                      <b>Shipping Address</b>
                    </th>
                    <td>:</td>
                    <td>
                      {/* Address should be displayed here */}
                      <p>Address details...</p>
                    </td>
                  </tr>
                  <tr>
                    <th>Order ID</th>
                    <td>:</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <th>Payment Status</th>
                    <td>:</td>
                    <td>Pending</td>
                  </tr>
                  <tr>
                    <th>Order Status</th>
                    <td>:</td>
                    <td>Success</td>
                  </tr>
                  <tr>
                    <th>Order BV</th>
                    <td>:</td>
                    <td>90</td>
                  </tr>
                </tbody>
              </table>

              <h6 className="text-uppercase">Order Products</h6>
              <hr />
              <table className="table">
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Product Code</th>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Qty</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Add product details here */}
                  <tr>
                    <td>1</td>
                    <td>XYZ123</td>
                    <td>Product Name</td>
                    <td>Example Product</td>
                    <td>2</td>
                    <td>Details</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <form action="" method="post">
              <div className="form-group">
                <label htmlFor="payment_status">Payment Status</label>
                <select
                  name="payment_status"
                  id="payment_status"
                  className="form-control"
                >
                  <option value={0} selected>
                    Pending
                  </option>
                  <option value={1}>Approve</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="order_status">Order Status</label>
                <select
                  name="order_status"
                  id="order_status"
                  className="form-control"
                >
                  <option value={0}>Pending</option>
                  <option value={3}>Accept</option>
                  <option value={4}>Dispatch</option>
                  <option value={1} selected>
                    Approve
                  </option>
                  <option value={2}>Reject</option>
                </select>
              </div>

              <div className="form-group" style={{ marginTop: "10px" }}>
                <button
                  type="submit"
                  name="approve_btn"
                  className="btn btn-success"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default orederView;
