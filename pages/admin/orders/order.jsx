import React from "react";

const Order = () => {
  const orders = [...Array(10)].map((_, index) => ({
    userId: `WA${Math.floor(Math.random() * 10000000)}(User Name)`,
    invoiceId: `#${index + 1}`,
    amount: 10499,
    status: "Success",
    date: new Date().toLocaleString(),
  }));

  return (
    <div className="pages_container">
      <div className="pu_container">
        <div className="pu_datatable_wrapper">
          <header className="row pt-3 pb-3">
            <div className="col-sm-9">
              <h4 className="page-title">Orders</h4>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="https://thewinnersacademy.in/admin/dashboard">
                    Home
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Order</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  All
                </li>
              </ol>
            </div>
          </header>
          <h6 className="text-uppercase mb-3">Orders (116)</h6>
          <hr />
          <main>
            <div className="row">
              <form
                action="https://thewinnersacademy.in/admin/order"
                method="get"
                className="form-inline mb-3 d-flex flex-wrap align-items-center"
              >
                {["id", "username"].map((field, idx) => (
                  <div className="form-group m-1" key={idx}>
                    <input
                      type="text"
                      placeholder={`Enter ${field === "id" ? "Order ID" : "Username"}`}
                      name={field}
                      className="form-control"
                    />
                  </div>
                ))}
                <div className="form-group m-1">
                  <div className="input-daterange input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="From"
                      name="start_date"
                    />
                    <div className="input-group-prepend">
                      <span className="input-group-text">to</span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="End Date"
                      name="end_date"
                    />
                  </div>
                </div>
                <div className="form-group m-1">
                  <select name="limit" className="form-control">
                    {[10, 20, 50, 100, 200].map((limit) => (
                      <option key={limit} value={limit}>{limit}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group m-1">
                  <select className="form-control" name="payment_status">
                    <option value="">Select Payment Status</option>
                    <option value={0}>Pending</option>
                    <option value={1}>Success</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-sm btn-primary m-1">
                  Filter
                </button>
                <a
                  href="https://thewinnersacademy.in/admin/order"
                  className="btn btn-sm btn-secondary m-1"
                >
                  Reset
                </a>
              </form>
              <div className="table-responsive">
                <table className="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>S No.</th>
                      <th>Action</th>
                      <th>USERID(NAME)</th>
                      <th>Invoice ID</th>
                      <th>Order Amount (₹)</th>
                      <th>Payment Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <ActionButtons index={index} />
                        </td>
                        <td>{order.userId}</td>
                        <td>{order.invoiceId}</td>
                        <td>{order.amount}</td>
                        <td>{order.status}</td>
                        <td>{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination currentPage={1} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

const ActionButtons = ({ index }) => (
  <>
    <a
      className="btn btn-sm btn-info"
      href={`/admin/orders/orederView?id=${index + 1}`}
    >
      View
    </a>
    <a
      style={{ marginLeft: "10px" }}
      className="btn btn-sm btn-info ml-2"
      href={`/admin/orders/orderBill?id=${index + 1}`}
    >
      Print Bill
    </a>
  </>
);

const Pagination = ({ currentPage }) => (
  <nav className="text-center mt-4">
    <ul className="pagination justify-content-center">
      <li className={`page-item ${currentPage === 1 ? "active" : ""}`}>
        <span className="page-link">1</span>
      </li>
      <li className="page-item">
        <a className="page-link" href="localhost:3000/admin/order?page=2">
          2
        </a>
      </li>
      {/* Add more pagination links as needed */}
    </ul>
  </nav>
);

export default Order;
