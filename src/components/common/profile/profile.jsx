import { useEffect, useState, useContext } from "react";
import { connect, useDispatch } from "react-redux";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { compose } from "redux";
import { AlertMsg, getNameInitials } from "../../../helper/helper";
import { setPageHeading } from "../../../redux/actions/commonAction";
import Link from "next/link";
import { DarkModeContext } from "../darkmodeContext/DarkModeContext";
import styles from "./Profile.module.css";
import validator from "validator";
import { common } from "../../../helper/Common";
import svg from "../../../helper/svg";
import Popup from "../popup/Popup";
import PlanAlert from "../PlanAlert";
import { FaRegEdit } from "react-icons/fa";
import "../../../../node_modules/cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { updateUserProfileACT } from "../../../redux/actions/authAction";
import axios from "axios";
import { useRouter } from "next/router";

const Profile = (props) => {
  let dispatch = useDispatch();
  const router = useRouter();
  // const userData = useSelector((state) => state.userData);
  useEffect(() => {
    dispatch(
      setPageHeading({
        pageHeading: "PixaURL - Profile",
        title: "PixaURL - Profile",
      })
    );
  }, [dispatch]);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [address, setAddress] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [crop, setCrop] = useState("");
  const [profileUploadPopup, setProfileUploadPopup] = useState(false);
  const [currentPlan, setCurrentPlan] = useState({});
  const [getAllUserData, setGetAllUserData] = useState({});
  const [showAlertBar, setShowAlertBar] = useState(false);
  const { darkMoreMainSection } = useContext(DarkModeContext);

  useEffect(() => {
    setName(props.name || "");
    setPassword(props.password || "");
    setUsername(props.username || "");
    setGender(props.gender || "");
    setDob(props.dob || "");
    setSponsor(props.sponsor || "");
    setAddress(props.address || "");
    setImageURL(props.profile_img || "");
  }, [props]);
  const alertBarCloseHandler = () => {
    setShowAlertBar(false);
  };
  const getCurrentPlan = () => {
    common.getAPI(
      {
        method: "POST",
        url: "user/getCurrentPlan",
        data: {},
      },
      (resp) => {
        if (resp.status === "success") {
          if (resp.data?.adminPlanStatus) {
            if (resp.data.isPlan && !resp.data.isExpired) {
              setCurrentPlan(resp.data);
            }
            if (resp.data.isPlan && resp.data.isExpired) {
              setShowAlertBar(true);
            }
          }
        }
      }
    );
  };
  const getUserProfile = () => {
    common.getAPI(
      {
        method: "POST",
        url: "user/getProfile",
        data: {},
      },
      (resp) => {
        setGetAllUserData(resp.data);
      }
    );
  };

  useEffect(() => {
    getCurrentPlan();
    getUserProfile();
  }, []);

  const formatDOB = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formattedDob = formatDOB(dob);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emptyname = validator.isEmpty(name, { ignore_whitespace: true });
    const comparepass = validator.equals(password, confirmPassword);

    if (emptyname) {
      AlertMsg("error", "Oops!", "Field cannot be empty!");
      return false;
    } else if (!comparepass) {
      AlertMsg("error", "Oops!", "Password should match the confirm password.");
      return false;
    } else {
      const payload = {
        name: name,
        password: password,
        username: username,
        gender: gender,
        dob: formattedDob,
        sponsor: sponsor,
        address: address,
      };

      common.getAPI(
        {
          method: "POST",
          url: "user/updateProfile",
          data: payload,
        },
        (resp) => {
          if (resp.status === "success") {
            const data = {
              name: name,
              profile_img: resp.data.profilePicture,
            };
            dispatch(updateUserProfileACT(data));
            profileUploadPopupCloseHandler();
            getUserProfile();

            // Optional: Reset form fields
            setName("");
            setPassword("");
            setConfirmPassword("");
            setUsername("");
            setGender("");
            setDob("");
            setSponsor("");
            setAddress("");

            AlertMsg(
              "success",
              "Profile Updated",
              "Your profile has been updated successfully."
            );
          } else {
            AlertMsg(
              "error",
              "Update Failed",
              resp.message || "Profile update failed."
            );
          }
        }
      );
    }
  };

  const uploadProfileImage = (event) => {
    setProfileUploadPopup(false);
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setImageURL(url);
    if (file) {
      setProfileUploadPopup(!profileUploadPopup);
      if (url) {
        setTimeout(() => {
          const image = document.getElementById("cropper_image");
          const cropper = new Cropper(image, {
            aspectRatio: 1,
            viewMode: 1,
          });
          setCrop(cropper);
        }, 10);
      }
    }
  };

  const profileUploadPopupCloseHandler = (e) => {
    setProfileUploadPopup(false);
    if (crop) {
      crop.destroy();
    }
  };

  const uploadImageButton = () => {
    crop.getCroppedCanvas({ width: 500, height: 500 }).toBlob((blob) => {
      const crop_url = URL.createObjectURL(blob);
      setImageURL(crop_url);
      if (blob) {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("password", password);
        formData.append("profileImage", blob);
        common.getAPI(
          {
            method: "POST",
            url: "upload/updateProfile",
            isFormData: true,
            data: formData,
          },
          (resp) => {
            if (resp.status === "success") {
              const data = {
                name: name,
                profile_img: resp.data.profilePicture.file,
              };
              let options = {
                headers: {
                  "Content-Type": blob.type,
                },
              };

              axios
                .put(resp.signedurl, blob, options)
                .then(async (response) => {
                  console.log("File uploaded successfully:", response.status);
                })
                .catch((error) => {
                  console.error("Error uploading file:", error.message);
                });
              // dispatch(updateUserProfileACT(data));
              profileUploadPopupCloseHandler();
            }
          }
        );
      }
    });
  };

  return (
    <>
      <div className="user_pages_container">
        <div
          className={`${
            darkMoreMainSection
              ? "darkMoreMainSection"
              : `${styles.profile_sec}`
          }`}
        >
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/dashboard" passHref>
                <a className="text-decoration-none">/Home</a>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="text-white">
              /My account
            </Breadcrumb.Item>
            <Breadcrumb.Item active className="text-white">
              Profile
            </Breadcrumb.Item>
          </Breadcrumb>
          <PlanAlert show={showAlertBar} onClose={alertBarCloseHandler} />
          <div className={styles.profile_wrapper}>
            <div className={styles.profile_left}>
              <div className={styles.profile_info_box}>
                <div className={styles.profile_avatar}>
                  <span className={styles.profile_avatar_initials}>
                    {getNameInitials(name ? name : "Unknown")}
                  </span>
                  {imageURL ? <img src={imageURL} alt="" /> : null}
                  <div className={styles.profile_img_uploader}>
                    <input
                      type="file"
                      id="profile_image_upload"
                      onChange={(e) => uploadProfileImage(e)}
                      accept=".png,.jpg"
                    />
                    <label htmlFor="profile_image_upload">
                      {svg.icon_upload}
                    </label>
                  </div>
                  {/* <Tooltip title="Remove Profile Image" placement="top" arrow>
                                    <div className={styles.profile_image_remove}>
                                        {svg.popup_close}
                                    </div>
                                </Tooltip> */}
                </div>
                <h3>{name ? name : "Unknown"}</h3>
                <p>
                  Email : <span>{props.email}</span>
                </p>
                <p>
                  Registration Date :
                  <span>{common.dateFormatter(props.createdAt)}</span>
                </p>
              </div>
              {currentPlan?.planName ? (
                <div className="pu_plan_detail_wrapper">
                  <span className="pu_plan_tagline">Active Plan</span>
                  <div className="pu_plan_status">
                    <div className="pu_plan_icon">{svg.price_tag}</div>
                    <div className="pu_plan_detail">
                      <h5>{currentPlan.planName}</h5>
                      <p>
                        Expiry Date :
                        {common.dateFormatWithoutTime(currentPlan.validityDate)}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className={styles.profile_right}>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.profile_box}>
                  <div className={styles.profile_box_title}>
                    <h3>Basic Profile Details</h3>
                  </div>
                  <div className={styles.profile_box_body}>
                    <div className={styles.input_wrapper_list}>
                      <div className={styles.input_wrapper}>
                        <label>Your Name</label>
                        <input
                          type="text"
                          className={styles.profile_input}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className={styles.input_wrapper}>
                        <label>Your Email</label>
                        <input
                          type="text"
                          className={styles.profile_input}
                          defaultValue={props.email}
                          readOnly
                          disabled
                        />
                      </div>
                      {console.log(
                        "++++++++++++++++++++++",
                        getAllUserData.dob
                      )}
                      {/* <div className={styles.input_wrapper}>
                      <label>UserName</label>
                      <input
                        type="text"
                        className={styles.profile_input}
                        value={getAllUserData.username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div> */}
                      <div className={styles.input_wrapper}>
                        <label>Password</label>
                        <div className={styles.password_field}>
                          <input
                            type="password"
                            className={styles.profile_input}
                            value={getAllUserData.password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className={styles.input_wrapper}>
                        <label>Gender</label>
                        <select
                          name="gender"
                          className={styles.profile_input}
                          value={getAllUserData.gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="0">---Select Gender ----</option>
                          <option value="1">Male</option>
                          <option value="2">Female</option>
                        </select>
                      </div>
                      <div className={styles.input_wrapper}>
                        <label>DOB(Date Of Birth)</label>
                        <input
                          type="date"
                          className={styles.profile_input}
                          value={getAllUserData.dob}
                          onChange={(e) => setDob(e.target.value)}
                        />
                      </div>
                      <div className={styles.input_wrapper}>
                        <label>sponsor</label>
                        <input
                          type="text"
                          className={styles.profile_input}
                          value={getAllUserData.sponsor}
                          onChange={(e) => setSponsor(e.target.value)}
                        />
                      </div>
                      <div className={styles.input_wrapper}>
                        <label>Address</label>
                        <input
                          type="text"
                          className={styles.profile_input}
                          value={getAllUserData.address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.profile_box}>
                  <div className={styles.profile_box_title}>
                    <h3>Change Password</h3>
                  </div>
                  <div className={styles.profile_box_body}>
                    <div className="pu_input_wrapper_list">
                      <div className="pu_input_wrapper">
                        <label>Password</label>
                        <input
                          type="password"
                          className="pu_input"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="pu_input_wrapper">
                        <label>Confirm Password</label>
                        <input
                          type="password"
                          className="pu_input"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <button type="submit" className="pu_btn">
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Popup
        heading="Upload Profile"
        show={profileUploadPopup}
        onClose={profileUploadPopupCloseHandler}
      >
        <div className="pu_image_cropper">
          <img
            id="cropper_image"
            src={imageURL}
            alt=""
            style={{ width: "100%" }}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="pu_btn"
            onClick={() => uploadImageButton()}
          >
            Upload
          </button>
        </div>
      </Popup>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.userData,
  };
};
export default compose(connect(mapStateToProps, null))(Profile);
