import React from "react";
import Styles from "./myaccount.module.css";

const WelcomeLetter = () => {
  return (
    <>
      <div className="pages_container">
        <div className="row">
          <div className="col-md-6 col-xl-12">
            <div className="card user-card">
              <div className="card-body">
                <div className={Styles.user_cover_bg}>
                  <img
                    src="/images/dashboard/welcome.jpg"
                    alt="image"
                    className={Styles.user_cover_img_fluid}
                  />
                  <div className={Styles.user_cover_welcome_letter}>
                    <h2>Welcome Letter</h2>
                  </div>
                  <div className={Styles.cover_data}>
                    <div className="d-inline-flex align-items-center">
                      <i className="ph-duotone ph-star text-warning me-1"></i>
                      4.5{" "}
                      <small className="text-white text-opacity-50">/ 5</small>
                    </div>
                  </div>
                </div>
                <div
                  className={`${Styles.chat_avtar} ${Styles.card_user_image}`}
                >
                  <img
                    src="/images/dashboard/welcome_avatar.jpg"
                    alt="user-image"
                    className="img-thumbnail rounded-circle"
                  />
                  <i className={`${Styles.chat_badge} bg-success`}></i>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  <div className="flex-grow-1">
                    <h6 className="mb-1">companyname</h6>
                    <p className="text-muted text-sm mb-0">
                      DM on
                      <a href="#" className="text-primary">
                        company
                      </a>
                    </p>
                    <p>1234567890</p>
                  </div>
                  <div className="flex-shrink-0">
                    <button className="btn btn-primary btn-sm">Message</button>
                    <a
                      href=""
                      className="btn btn-outline-info btn-sm ms-2"
                      title="Print Form"
                    >
                      <i className="fa fa-print"></i>
                    </a>
                  </div>
                </div>
                <div className="row g-3 my-3 mx-5">
                  <div className="col-10">
                    <h5 className="mb-3">Dear Mam/Sir</h5>
                    <p className="f-15">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. Lorem Ipsum is simply
                      dummy text of the printing and typesetting industry. Lorem
                      Ipsum has been the industry's standard dummy text ever
                      since the 1500s, when an unknown printer took a galley of
                      type and scrambled it to make a type specimen book. It has
                      survived not only five centuries, but also the leap into
                      electronic typesetting, remaining essentially unchanged
                    </p>
                  </div>
                </div>
                <div className={`${Styles.saprator} my-3`}></div>
                <div className="text-center">
                  <span
                    className={`${Styles.badge} bg-light-secondary border rounded-pill bg-transparent f-18 me-1 mt-1`}
                  >
                    <a href="#">Email: user@company.com</a>
                  </span>
                  <span
                    className={`${Styles.badge} bg-light-secondary text-black border rounded-pill bg-transparent f-18 me-1 mt-1`}
                  >
                    Purchase Date: 2024-07-01 11:58:00
                  </span>
                  <span
                    className={`${Styles.badge} bg-light-secondary text-black border rounded-pill bg-transparent f-18 me-1 mt-1`}
                  >
                    Purchase Amount: 0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeLetter;
