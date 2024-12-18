import React from "react";

const PinBox = () => {
  // Static data for the table
  const pinData = [
    {
      name: "John Doe",
      username: "johndoe",
      pin: "1234",
      useIn: "Admin",
      pinType: "One-Time",
      useFor: "Login",
      dateTime: "2024-11-22 10:30:00",
    },
    {
      name: "Jane Smith",
      username: "janesmith",
      pin: "5678",
      useIn: "User",
      pinType: "Permanent",
      useFor: "Password Reset",
      dateTime: "2024-11-21 14:15:00",
    },
    {
      name: "Michael Brown",
      username: "michaelb",
      pin: "9876",
      useIn: "Admin",
      pinType: "One-Time",
      useFor: "Account Recovery",
      dateTime: "2024-11-20 16:45:00",
    },
    // Add more static data rows here as needed
  ];

  return (
    <div className="pu_container">
            <div className="pu_datatable_wrapper">
    <div className="container-fluid">
      <div className="row pt-2 pb-2">
        <div className="col-sm-9">
          <h4 className="page-title">Pin Box</h4>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="http://localhost/hellotrade_main/admin/dashboard">
                Home
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Pin</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Pin Box
            </li>
          </ol>
        </div>
        <div className="col-sm-3"></div>
      </div>
      <h6 className="text-uppercase">Pin Box</h6>
      <hr />
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <form action="#" method="get" className="d-flex flex-wrap">
            <div className="form-group m-1 col-12 col-md-2">
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                className="form-control"
              />
            </div>
            <div className="form-group m-1 col-12 col-md-2">
              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                className="form-control"
              />
            </div>
            <div className="form-group m-1 col-12 col-md-2">
              <select name="use_status" className="form-control">
                <option value="">Select Type</option>
                <option value="0">Unused</option>
                <option value="1">Used</option>
              </select>
            </div>
            <div className="form-group m-1 col-12 col-md-2">
              <select name="limit" className="form-control">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
              </select>
            </div>
            <div className="form-group m-1 col-12 col-md-2 d-flex" >
              <button
                type="submit"
                name="submit"
                className="btn btn-primary btn-sm w-100"
                style={{marginRight:"5px"}}
              >
                Filter
              </button>
              <a href="#" className="btn btn-secondary btn-sm w-100 ml-1">
                Reset
              </a>
            </div>
          </form>

          <div className="table-responsive mt-4">
            <table className="table table-striped table-hover text-center">
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Pin</th>
                  <th>Use In</th>
                  <th>Pin Type</th>
                  <th>Use For</th>
                  <th>Date &amp; Time</th>
                </tr>
              </thead>
              <tbody>
                {/* Loop through static data */}
                {pinData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.username}</td>
                    <td>{item.pin}</td>
                    <td>{item.useIn}</td>
                    <td>{item.pinType}</td>
                    <td>{item.useFor}</td>
                    <td>{item.dateTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  );
};

export default PinBox;
