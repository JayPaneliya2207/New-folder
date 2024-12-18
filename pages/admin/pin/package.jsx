import React from "react";

const Package = () => {
  const data = [
    {
      id: 1,
      name: "Package",
      rate: 25,
      bv: 0,
      pv: 1,
      status: "Active",
    },
  ];

  return (
    <div className="pu_container">
      <div className="pu_datatable_wrapper">
        <div className="row pt-4 pb-2">
          <div className="col-sm-9">
            <h4 className="page-title">Packages</h4>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="http://localhost/hellotrade_main/admin/dashboard">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="http://localhost/hellotrade_main/admin/packages">
                  Packages
                </a>
              </li>
            </ol>
          </div>
          <div className="col-sm-3">
            {/* You can add a search or filter feature here */}
          </div>
        </div>

        <h6 className="text-uppercase font-weight-bold text-muted">
          Package Details
        </h6>
        <hr className="my-4" />

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Action</th>
                <th>Name</th>
                <th>Rate ($)</th>
                <th>BV</th>
                <th>PV</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((request, index) => (
                <tr key={request.id}>
                  <td>{index + 1}</td>
                  <td>
                    <a
                      className="btn btn-warning btn-sm"
                      href={`/admin/pin/pinView?id=${request.id}`}
                    >
                      <i className="fa fa-edit" /> Edit
                    </a>
                  </td>
                  <td>{request.name}</td>
                  <td>{request.rate}</td>
                  <td>{request.bv}</td>
                  <td>{request.pv}</td>
                  <td>
                    <span
                      className={`badge ${
                        request.status === "Active"
                          ? "badge-success"
                          : "badge-danger"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Package;
