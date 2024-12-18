import styles from "./WithdrawalCards.module.css";
import "font-awesome/css/font-awesome.min.css";
import { ImCancelCircle } from "react-icons/im";
import { MdOutlinePending } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
const WithdrawalCards = () => {
  return (
    <div className={`${styles.row} container `}>
      <div className={`col-lg-4 col-md-6 col-sm-12 ${styles.cardWrapper}`}>
        <div className={`card ${styles.bgSuccess}`}>
          <div className="card-body text-center">
            <FaRegCircleCheck
              style={{ color: "white", width: "40px", height: "40px" }}
            />
            <h5 className="mt-2 text-white">Withdrawal</h5>
            <hr className={styles.borderLight} />
            <p className={`mb-0 ${styles.mb0}`}>Approved</p>
            <div className={styles.boldText}>0</div>
          </div>
        </div>
      </div>

      <div className={`col-lg-4 col-md-6 col-sm-12 ${styles.cardWrapper}`}>
        <div className={`card ${styles.bgSuccess2}`}>
          <div className="card-body text-center">
            <MdOutlinePending
              style={{ color: "white", width: "40px", height: "40px" }}
            />
            <h5 className="mt-2 text-white">Withdrawal</h5>
            <hr className={styles.borderLight} />
            <p className={`mb-0 ${styles.mb0}`}>Pending</p>
            <div className={styles.boldText}>0</div>
          </div>
        </div>
      </div>

      <div className={`col-lg-4 col-md-6 col-sm-12 ${styles.cardWrapper}`}>
        <div className={`card ${styles.bgSuccess3}`}>
          <div className="card-body text-center">
            <ImCancelCircle
              style={{ color: "white", width: "40px", height: "40px" }}
            />
            <h5 className="mt-2 text-white">Rejected</h5>
            <hr className={styles.borderLight} />
            <p className={`mb-0 ${styles.mb0}`}>Rejected</p>
            <div className={styles.boldText}>0</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalCards;
