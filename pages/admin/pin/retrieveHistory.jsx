import React, { useState } from "react";

const RetrieveHistory = () => {
  const [filters, setFilters] = useState({ remark: "", tx_type: "" });
  const [loading, setLoading] = useState(false);

  // Static data for demonstration
  const historyData = [
    {
      userId: "U123",
      name: "John Doe",
      pins: 10,
      date: "2024-11-20",
    },
    {
      userId: "U124",
      name: "Jane Smith",
      pins: 5,
      date: "2024-11-18",
    },
    {
      userId: "U125",
      name: "Mike Johnson",
      pins: 8,
      date: "2024-11-15",
    },
  ];

  // Handle filter change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    // Filter logic can be added here if needed
  };

  // Handle reset
  const handleReset = () => {
    setFilters({ remark: "", tx_type: "" });
  };
  const filteredData = historyData.filter(
    (item) =>
      (!filters.remark || item.name.includes(filters.remark)) &&
      (!filters.tx_type || item.tx_type === filters.tx_type)
  );
  
  return (
    
    <div className="pu_container">
            <div className="pu_datatable_wrapper">
    <div className="container-fluid p-4">
      <div className="row mb-4">
        <div className="col-md-9">
          <h4 className="page-title text-primary">Retrieved History</h4>
          <ol className="breadcrumb bg-light p-2 rounded">
            <li className="breadcrumb-item">
              <a
                href="http://localhost/hellotrade_main/admin/dashboard"
                className="text-decoration-none text-secondary"
              >
                Home
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="#" className="text-decoration-none text-secondary">
                Pin
              </a>
            </li>
            <li
              className="breadcrumb-item active text-dark"
              aria-current="page"
            >
              Pin History
            </li>
          </ol>
        </div>
      </div>

      <h6 className="text-uppercase text-secondary">Pin Retrieved History</h6>
      <hr />
      <div className="row">
        <div className="col-12">
          <form
            onSubmit={handleFilterSubmit}
            className="d-flex align-items-center gap-2 mb-3 flex-wrap"
            style={{ flexDirection: "row", flexWrap: "nowrap" }}
          >
            <input
              type="text"
              placeholder="Remark"
              name="remark"
              value={filters.remark}
              onChange={handleInputChange}
              className="form-control me-2"
              style={{ flex: "1" }}
            />
            <select
              name="tx_type"
              value={filters.tx_type}
              onChange={handleInputChange}
              className="form-control me-2"
              style={{ flex: "1" }}
            >
              <option value="">Select Credit/Debit</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              style={{ flexShrink: 0 }}
            >
              Filter
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-secondary btn-sm"
              style={{ flexShrink: 0 }}
            >
              Reset
            </button>
          </form>

          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Sr</th>
                  <th>Retrieve User ID</th>
                  <th>Retrieve Name</th>
                  <th>No of Pins</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : historyData.length > 0 ? (
                  historyData.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.userId}</td>
                      <td>{item.name}</td>
                      <td>{item.pins}</td>
                      <td>{new Date(item.date).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No Data Available
                    </td>
                  </tr>
                )}
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

export default RetrieveHistory;
