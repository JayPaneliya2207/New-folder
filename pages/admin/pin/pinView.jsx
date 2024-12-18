import React from "react";

const pinView = () => {
  return (
    <div className="container-fluid">
      <div className="row pt-2 pb-2">
        <div className="col-sm-9">
          <h4 className="page-title">Edit Package</h4>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="http://localhost/hellotrade_main/admin/packages">
                Packages
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Package
            </li>
          </ol>
        </div>
        <div className="col-sm-3"></div>
      </div>
      <h6 className="text-uppercase">Edit Package</h6>
      <hr />
      <div className="row">
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div className="card card-body">
            <form action="" method="post">
              <div className="form-group">
                <label htmlFor="packageName">Package Name</label>
                <input
                  type="text"
                  defaultValue="Package"
                  name="pin_type"
                  id="packageName"
                  className="form-control"
                  placeholder=""
                  aria-describedby="packageHelp"
                />
              </div>
              <div className="form-group">
                <label htmlFor="packageRate">Package Rate</label>
                <input
                  type="text"
                  name="pin_rate"
                  id="packageRate"
                  defaultValue={25}
                  className="form-control"
                  placeholder=""
                  aria-describedby="rateHelp"
                />
              </div>
              <div className="form-group">
                <label htmlFor="bv">BV</label>
                <input
                  type="text"
                  name="business_volumn"
                  id="bv"
                  defaultValue={0}
                  className="form-control"
                  placeholder=""
                  aria-describedby="bvHelp"
                />
              </div>
              <div className="form-group">
                <label htmlFor="pv">PV</label>
                <input
                  type="text"
                  name="pin_value"
                  id="pv"
                  defaultValue={1}
                  className="form-control"
                  placeholder=""
                  aria-describedby="pvHelp"
                />
              </div>
              <button type="submit" className="btn btn-primary" name="edit_btn">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default pinView;
