import React from "react";
import Styles from "./myaccount.module.css";

const edit_profile = () => {
  return (
    <div className="pages_container">
      <div className="container-xl px-4 mt-4">
        <div className="row">
          <div className="col-xl-4">
            <div className={`${Styles.card} p-10 mb-xl-0`}>
              <div className={Styles.card_header}>Profile Picture</div>
              <div className="card-body text-center">
                <img
                  className={`${Styles.img_account_profile} ${Styles.rounded_circle} mb-2`}
                  src="http://bootdey.com/img/Content/avatar/avatar1.png"
                  alt=""
                />

                <div className="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 5 MB
                </div>
                <button className="btn btn-primary mb-5" type="button">
                  Upload new image
                </button>
              </div>
            </div>
            <div className={`card-body ${Styles.chane_password}`}>
              <h3>Changed Password</h3>
              <div className="col-md-6">
                <label className="small mb-1" for="inputFirstName">
                  Old Password
                </label>
                <input
                  className={Styles.form_control}
                  id="inputFirstName"
                  type="text"
                  placeholder="Enter your Old Password"
                />
              </div>
              <div className="col-md-6">
                <label className="small mb-1" for="inputLastName">
                  New Password
                </label>
                <input
                  className={Styles.form_control}
                  id="inputLastName"
                  type="text"
                  placeholder="Enter your New Password"
                />
              </div>
              <div className="col-md-6">
                <label className="small mb-1" for="inputLastName">
                  Confirm Password
                </label>
                <input
                  className={Styles.form_control}
                  id="inputLastName"
                  type="text"
                  placeholder="Enter your Confirm Password"
                />
                <button className="btn btn-success">Save</button>
                <button className="btn btn-danger">Cancel</button>
              </div>
            </div>
          </div>
          <div className={`col-xl-8 ${Styles.edit_profile_section}`}>
            <div className="card mb-4">
              <div className={Styles.card_header}>Edit Profile</div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label className="small mb-1" for="inputUsername">
                      Username
                    </label>
                    <input
                      className={Styles.form_control}
                      id="inputUsername"
                      type="text"
                      placeholder="Enter your username"
                      value="username"
                    />
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputFirstName">
                        First name
                      </label>
                      <input
                        className={Styles.form_control}
                        id="inputFirstName"
                        type="text"
                        placeholder="Enter your first name"
                        value="Valerie"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputLastName">
                        Last name
                      </label>
                      <input
                        className={Styles.form_control}
                        id="inputLastName"
                        type="text"
                        placeholder="Enter your last name"
                        value="Luna"
                      />
                    </div>
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputOrgName">
                        Organization name
                      </label>
                      <input
                        className={Styles.form_control}
                        id="inputOrgName"
                        type="text"
                        placeholder="Enter your organization name"
                        value="Start Bootstrap"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputLocation">
                        Location
                      </label>
                      <input
                        className={Styles.form_control}
                        id="inputLocation"
                        type="text"
                        placeholder="Enter your location"
                        value="San Francisco, CA"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1" for="inputEmailAddress">
                      Email address
                    </label>
                    <input
                      className={Styles.form_control}
                      id="inputEmailAddress"
                      type="email"
                      placeholder="Enter your email address"
                      value="name@example.com"
                    />
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputPhone">
                        Phone number
                      </label>
                      <input
                        className={Styles.form_control}
                        id="inputPhone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value="555-123-4567"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputBirthday">
                        Birthday
                      </label>
                      <input
                        className={Styles.form_control}
                        id="inputBirthday"
                        type="text"
                        name="birthday"
                        placeholder="Enter your birthday"
                        value="06/10/1988"
                      />
                    </div>
                  </div>
                  <button className="btn btn-primary" type="button">
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default edit_profile;
