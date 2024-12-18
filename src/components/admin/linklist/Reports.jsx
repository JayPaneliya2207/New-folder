import React from 'react'

const Reports = () => {
  return (
    <div className="row main-section-Report">
    <div className="col-12 col-lg-6">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span id="bv_title">Investment</span>
        </div>
        <div className="card-body">
          <div id="loader_section">
            <div id="loader_img_section">
              <div id="bvdata">
                <div className="table-responsive">
                  <table className="table table-sm">
                    <tbody>
                      <tr>
                        <td>
                          <a href="https://thewinnersacademy.in/admin/order">
                            Total
                          </a>
                        </td>
                        <td>₹&nbsp;1,217,884</td>
                      </tr>
                      <tr>
                        <td>
                          <a href="https://thewinnersacademy.in/admin/order">
                            Today
                          </a>
                        </td>
                        <td>₹&nbsp;0</td>
                      </tr>
                      <tr>
                        <td>
                          <a href="https://thewinnersacademy.in/admin/order">
                            Yesterday
                          </a>
                        </td>
                        <td>₹&nbsp;20,998</td>
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
  
    <div className="col-12 col-lg-6">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span id="bv_title">Income Report</span>
          <div className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <i className="icon-options" />
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <a className="dropdown-item" href="#" data-val="all">All</a>
              <a className="dropdown-item" href="#" data-val="today">Today</a>
              <a className="dropdown-item" href="#" data-val="24hour">24 Hours</a>
              <a className="dropdown-item" href="#" data-val="lastweek">Last Week</a>
              <a className="dropdown-item" href="#" data-val="lastmonth">Last Month</a>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div id="loader_section">
            <div id="loader_img_section">
              <div id="incomedata">
                <div className="table-responsive">
                  <table className="table table-sm">
                    <tbody>
                      <tr>
                        <td>Total Income</td>
                        <td>₹&nbsp;261,770</td>
                      </tr>
                      <tr>
                        <td>Direct Income</td>
                        <td>₹&nbsp;59,850</td>
                      </tr>
                      <tr>
                        <td>Matching Income</td>
                        <td>₹&nbsp;150,220</td>
                      </tr>
                      <tr>
                        <td>Rank Bonus</td>
                        <td>₹&nbsp;51,700</td>
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
  </div>
  
  )
}

export default Reports
