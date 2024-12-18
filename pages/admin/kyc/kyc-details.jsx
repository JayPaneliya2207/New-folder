/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { common } from "../../../src/helper/Common.js";
import styles from "./KycDetail.module.css";

const KycDetail = () => {
  const [kycData, setKycData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reason, setReason] = useState("");
  const router = useRouter();
  const id = router.query.id;
  const [userId, setUserId] = useState(id);
  const [formData, setFormData] = useState({
    name: "",
    proofType: "",
    proofNumber: "",
    kycStatus: 1,
    activeDate: "",
    reason: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleApprove = () => {
    console.log("Approved:", formData);
  };

  const handleCancel = () => {
    console.log("Cancelled:", formData);
  };

  const fetchUsers = useCallback(
    (page = 1, searchTerm = "", listPerPage = 10) => {
      setLoading(true);
      common.getAPI(
        {
          method: "POST",
          url: "admin/getUsers",
          data: { page, listPerPage, searchTerm },
        },
        (resp) => {
          setKycData(resp.data);
          setLoading(false);
        }
      );
    },
    []
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const Breadcrumb = () => (
    <div className="row pt-2 pb-2">
      <div className="col-sm-9">
        <h4 className="page-title">KYC Details</h4>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/admin/dashboard">Home</a>
          </li>
          <li className="breadcrumb-item">KYC</li>
          <li className="breadcrumb-item active">KYC Detail</li>
        </ol>
      </div>
    </div>
  );

  const FormInput = ({ label, value, name, onChange }) => (
    <div className="form-group mb-3">
      <label className={styles.formLabel}>{label}</label>
      <input
        type="text"
        className={styles.formInput}
        name={name}
        value={value || ""}
        onChange={onChange}
      />
    </div>
  );

  const KycImageGallery = ({ images, status }) => (
    <div className={styles.kycGallery}>
      {images?.image1 && (
        <a href={images.image1} target="_blank" rel="noopener noreferrer">
          <img
            src={images.image1}
            className={styles.kycImage}
            alt="KYC Document 1"
          />
        </a>
      )}
      {images?.image2 && (
        <a href={images.image2} target="_blank" rel="noopener noreferrer">
          <img
            src={images.image2}
            className={styles.kycImage}
            alt="KYC Document 2"
          />
        </a>
      )}
      <h3
        className={status === 1 ? styles.statusApproved : styles.statusPending}
      >
        {status === 1 ? "KYC Approved" : "KYC Pending"}
      </h3>
    </div>
  );

  const SectionIdentity = ({
    title,
    data,
    onInputChange,
    onSubmit,
    reason,
    setReason,
    isNominee,
  }) => {
    console.log("userId userId userId", userId);

    return (
      <div>
        <h6 className={styles.kycTitle}>{title}</h6>
        <hr />
        <div className="row">
          <div className="col-md-8">
            {kycData &&
              kycData.map((data, index) => {
                {
                  console.log("=======", data, data._id);
                }
                return userId === data._id ? (
                  <>
                    <div className="form-group mb-3">
                      <label className="KycDetail_formLabel__BsYuF">User</label>
                      <input
                        type="text"
                        className="KycDetail_formInput__Wlu0W"
                        name="name"
                        value={data?.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="KycDetail_formLabel__BsYuF">
                        Select Service
                      </label>
                      <input
                        type="text"
                        className="KycDetail_formInput__Wlu0W"
                        name="proofType"
                        value={data?.identityProof?.proofType}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="KycDetail_formLabel__BsYuF">
                        Document No.
                      </label>
                      <input
                        type="text"
                        className="KycDetail_formInput__Wlu0W"
                        name="proofNumber"
                        value={data?.identityProof?.proofNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="KycDetail_formLabel__BsYuF">
                        Status
                      </label>
                      <input
                        type="text"
                        className="KycDetail_formInput__Wlu0W"
                        name="kycStatus"
                        value={data?.kycStatus}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="KycDetail_formLabel__BsYuF">Date</label>
                      <input
                        type="text"
                        className="KycDetail_formInput__Wlu0W"
                        name="activeDate"
                        value={data?.updatedAt}
                        onChange={handleChange}
                      />
                    </div>
                    <br />
                    <h6 className={styles.kycTitle}>Nominee Kyc Detail</h6>
                    <hr />

                    <div className="form-group mb-3">
                      <label className="KycDetail_formLabel__BsYuF">
                        Nominee Name
                      </label>
                      <input
                        type="text"
                        className="KycDetail_formInput__Wlu0W"
                        name="name"
                        value={data?.nominee?.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="KycDetail_formLabel__BsYuF">
                        Nominee D.O.B
                      </label>
                      <input
                        type="text"
                        className="KycDetail_formInput__Wlu0W"
                        name="name"
                        value={data?.nominee?.relation}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="KycDetail_formLabel__BsYuF">
                        Nominee Relation
                      </label>
                      <input
                        type="text"
                        className="KycDetail_formInput__Wlu0W"
                        name="name"
                        value={data?.nominee?.dob}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="KycDetail_formLabel__BsYuF">
                        Reason (for cancellation)
                      </label>
                      <textarea
                        name="reason"
                        className="form-control"
                        value={formData.reason}
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      className="d-flex"
                      style={{ gap: 10, margin: "10px 0px 30px" }}
                    >
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleApprove}
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : null;
              })}
          </div>

          <div className="col-md-4 text-center">
            <KycImageGallery
              images={data?.identityProof}
              status={data?.kycStatus}
            />
          </div>
        </div>
      </div>
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setKycData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();

    if (type === "approve") {
      const requiredFields = [
        "username",
        "proofType",
        "proofNumber",
        "kycStatus",
        "activeDate",
      ];

      const missingFields = requiredFields.filter(
        (field) => !kycData?.[field]?.trim()
      );

      if (missingFields.length > 0) {
        alert("Please fill all the required fields.");
        return;
      }
    }

    if (type === "cancel" && !reason.trim()) {
      alert("Cancellation requires a reason.");
      return;
    }

    const payload = {
      id: userId,
      name: kycData?.name,
      email: kycData?.email,
      password: kycData?.password,
      contactNumber: kycData?.contactNumber,
      city: kycData?.city,
      gender: kycData?.gender,
      dob: kycData?.dob,
      state: kycData?.state,
      my_rank: kycData?.my_rank,
      username: kycData?.username,
      walletId: kycData?.walletId,
      sponsor: kycData?.sponsor,
      country: kycData?.country,
      wallet_address: kycData?.wallet_address,
      address: kycData?.address,
      withdraw_status: kycData?.withdraw_status || 1,
      position: kycData?.position || 0,
      parent: kycData?.parent,
      img: kycData?.img,
      active_id: kycData?.active_id || 0,
      active_status: kycData?.active_status || 0,
      active_date: kycData?.active_date,
      role: kycData?.role || 2,
      profilePicture: kycData?.profilePicture,
      ip: kycData?.ip,
      source: kycData?.source,
      accessLevel: kycData?.accessLevel || [],
      resetPasswordToken: kycData?.resetPasswordToken,
      settings: kycData?.settings,
      validityDate: kycData?.validityDate,
      planName: kycData?.planName,
      bankDetails: kycData?.bankDetails,
      cryptoAddress: kycData?.cryptoAddress,
      upi: kycData?.upi,
      nominee: kycData?.nominee,
      panCard: kycData?.panCard,
      identityProof: kycData?.identityProof,
      payment: kycData?.payment,
      kycStatus: type === "approve" ? 1 : 2,
    };

    common.getAPI(
      {
        method: "POST",
        url: "admin/updateUser",
        data: payload,
      },
      (resp) => {
        if (resp.status === "success") {
          alert("KYC updated successfully!");
          setKycData((prevData) => ({
            ...prevData,
            ...resp.data,
          }));
          setReason("");
        } else {
          alert("Error updating KYC.");
        }
      }
    );
  };

  if (loading) return <LoadingIndicator />;

  return (
    <div className={styles.containerFluid}>
      <Breadcrumb />

      <SectionIdentity
        title="Identity KYC Detail"
        data={kycData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        reason={reason}
        setReason={setReason}
      />
    </div>
  );
};

const LoadingIndicator = () => <p>Loading...</p>;

export default KycDetail;
