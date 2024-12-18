// Kyc.jsx
import React, { useState, useRef, useContext } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import { DarkModeContext } from "../../../src/components/common/darkmodeContext/DarkModeContext";
import Link from "next/link";
import { FaWallet, FaBitcoin, FaIdCard, FaUserTie } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import { IoMdCloudUpload } from "react-icons/io";
import { common } from "../../../src/helper/Common";
import validator from "validator";
import { AlertMsg } from "../../../src/helper/helper";
import { updateUserProfileACT } from "../../../src/redux/actions/authAction";
import styles from "./myaccount.module.css";

const Kyc = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("kycForm");
  const [selectedDocument, setSelectedDocument] = useState("passport");
  const [files, setFiles] = useState([]);
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [accountType, setAccountType] = useState("");
  const { darkMoreMainSection } = useContext(DarkModeContext);
  const formRef = useRef(null);

  const [upiId, setUpiId] = useState("");
  const [upiMethod, setUpiMethod] = useState("");

  const handleOpenModal = () => {
    setActiveTab("walletAddress");
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const handleDocumentChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedDocument(selectedValue);
    console.log("Selected Document:", selectedValue);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const isAccountHolderNameEmpty = validator.isEmpty(accountHolderName, {
      ignore_whitespace: true,
    });
    const isAccountNumberEmpty = validator.isEmpty(accountNumber, {
      ignore_whitespace: true,
    });
    const isIfscEmpty = validator.isEmpty(ifsc, { ignore_whitespace: true });
    const isAccountTypeEmpty = validator.isEmpty(accountType, {
      ignore_whitespace: true,
    });

    if (
      isAccountHolderNameEmpty ||
      isAccountNumberEmpty ||
      isIfscEmpty ||
      isAccountTypeEmpty
    ) {
      AlertMsg("error", "Oops!", "All fields are required.");
      return false;
    } else {
      common.getAPI(
        {
          method: "POST",
          url: "user/updateProfile",
          data: {
            bankDetails: {
              account: accountNumber,
              IFSC: ifsc,
              bank: accountHolderName,
              accountType: accountType,
            },
          },
        },
        (resp) => {
          if (resp.status === "success") {
            const data = {
              accountHolderName,
              accountNumber,
              ifsc,
              accountType,
            };
            // Update user profile in Redux
            dispatch(updateUserProfileACT(data));
            profileUploadPopupCloseHandler();
          } else if (resp.status === "error") {
            AlertMsg(
              "error",
              "Oops!",
              resp.message || "Failed to update the profile."
            );
          }
        }
      );
    }
    setAccountNumber("");
    setIfsc("");
    setAccountHolderName("");
    setAccountType("");
  };

  const handlePaymentSubmit = (event) => {
    event.preventDefault();

    // Validation
    const isUpiIdEmpty = validator.isEmpty(upiId, { ignore_whitespace: true });
    const isMethodSelected = !upiMethod; // Check if a payment method is selected

    if (isUpiIdEmpty || isMethodSelected) {
      AlertMsg("error", "Oops!", "UPI ID and payment method are required.");
      return false;
    } else {
      // Construct the payload based on the selected payment method
      const payload = {
        cryptoAddress: "your_crypto_address_here",
        upi: {
          gPay: upiMethod === "gpay" ? upiId : "",
          phonePe: upiMethod === "phonepe" ? upiId : "",
          bharatPe: upiMethod === "bharatpe" ? upiId : "",
          payTM: upiMethod === "paytm" ? upiId : "",
          upiId: upiId,
        },
      };

      common.getAPI(
        {
          method: "POST",
          url: "user/updateProfile",
          data: payload,
        },
        (resp) => {
          if (resp.status === "success") {
            setUpiId("");
            setUpiMethod("");
          } else if (resp.status === "error") {
            AlertMsg(
              "error",
              "Oops!",
              resp.message || "Failed to update the profile."
            );
          }
        }
      );
    }
  };

  const handleDocumentSubmit = async (e) => {
    e.preventDefault();

    const panCardNumber = e.target.elements.formAddress.value.trim();
    if (files.length === 0) {
      AlertMsg("error", "Oops!", "Please upload an image.");
      return;
    }
    const panCardImage = files[0];
    const panCardData = {
      panCard: {
        panNo: panCardNumber,
        image: panCardImage.name,
      },
    };

    common.getAPI(
      {
        method: "POST",
        url: "user/updateProfile",
        data: panCardData,
      },
      (resp) => {
        if (resp.status === "success") {
          AlertMsg(
            "success",
            "Success!",
            "PAN card details updated successfully."
          );
          formRef.current.reset();
          setFiles([]);
          profileUploadPopupCloseHandler();
        } else if (resp.status === "error") {
          AlertMsg(
            "error",
            "Oops!",
            resp.message || "Failed to update PAN card details."
          );
        }
      }
    );
  };

  const handleIdentityProofSubmit = async (e) => {
    e.preventDefault();

    // Validation: At least two files should be uploaded
    if (files.length < 2) {
      AlertMsg("error", "Oops!", "Please upload at least two images.");
      return;
    }
    const proofNumber = e.target.elements.proofNumber.value.trim();

    const identityProofData = {
      identityProof: {
        proofType: selectedDocument,
        proofNumber: proofNumber,
        image1: files[0].name,
        image2: files[1].name,
      },
    };

    common.getAPI(
      {
        method: "POST",
        url: "user/updateProfile",
        data: identityProofData,
      },
      (resp) => {
        if (resp.status === "success") {
          AlertMsg(
            "success",
            "Success!",
            "Identity proof updated successfully."
          );
          setSelectedDocument("");
          setFiles([]);
          e.target.elements.proofNumber.value = "";
        } else if (resp.status === "error") {
          AlertMsg(
            "error",
            "Oops!",
            resp.message || "Failed to update identity proof."
          );
        }
      }
    );
  };

  const handleNomineeSubmit = async (e) => {
    e.preventDefault();

    const nomineeName = e.target.elements.formAddress.value.trim();
    const nomineeRelation = e.target.elements.formName.value.trim();
    const nomineeDOB = e.target.elements.formIDNumber.value.trim();

    // Validation
    const isNomineeNameEmpty = validator.isEmpty(nomineeName, {
      ignore_whitespace: true,
    });
    const isNomineeRelationEmpty = validator.isEmpty(nomineeRelation, {
      ignore_whitespace: true,
    });
    const isNomineeDOBEmpty = validator.isEmpty(nomineeDOB, {
      ignore_whitespace: true,
    });

    if (isNomineeNameEmpty || isNomineeRelationEmpty || isNomineeDOBEmpty) {
      AlertMsg("error", "Oops!", "All fields are required.");
      return false;
    } else {
      common.getAPI(
        {
          method: "POST",
          url: "user/updateProfile",
          data: {
            nominee: {
              name: nomineeName,
              relation: nomineeRelation,
              dob: nomineeDOB,
            },
          },
        },
        (resp) => {
          if (resp.status === "success") {
            const data = {
              nomineeName,
              nomineeRelation,
              nomineeDOB,
            };
            // Update user profile in Redux
            dispatch(updateUserProfileACT(data));

            // Optionally, close any modals or reset form
            profileUploadPopupCloseHandler(); // If you have this function for closing popups

            AlertMsg(
              "success",
              "Success!",
              "Nominee details updated successfully."
            );
          } else if (resp.status === "error") {
            AlertMsg(
              "error",
              "Oops!",
              resp.message || "Failed to update nominee details."
            );
          }
        }
      );
    }
    e.target.reset();
  };

  return (
    <div className="user_pages_container">
      <div
        className={`${
          darkMoreMainSection ? `${styles.dark_mode_kyc}` : `${styles.kyc_sec}`
        }`}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/dashboard" passHref>
              <a className="text-decoration-none">/Home</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-white">/My account</Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white">
            KYC
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="row">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className={`card ${styles.kyc_verified}`}>
                <div className="card-body">
                  <div className="text-center">
                    <div className="row justify-content-center">
                      <div className="col-lg-9">
                        <h4 className="mt-4 fw-semibold">KYC Verification</h4>
                        <p className="text-muted mt-3">
                          Complete the KYC verification process.
                        </p>
                        <div className="mt-4">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleOpenModal}
                          >
                            Click here for Verification
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="row justify-content-center mt-5 mb-2">
                      <div className="col-sm-7 col-8">
                        <img
                          src="/images/dashboard/verificationImg.png"
                          alt="Verification"
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
          <Modal.Header
            closeButton
            className={styles.modalHeader}
            style={{ border: "1px solid white" }}
          >
            <Modal.Title className={styles.customTitle}>
              KYC Verification
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.custom_modal_body}>
            <Tabs
              id="kyc-verification-tabs"
              activeKey={activeTab}
              onSelect={(tab) => setActiveTab(tab)}
              className={`mb-3 ${styles.custom_tabs}`}
            >
              {/* Tab 1: Wallet Address */}
              <Tab
                className={styles.title_tab}
                eventKey="walletAddress"
                title={
                  <span className={styles.tabTitle}>
                    <FaWallet className={styles.tabIcon} />
                    Wallet Address
                  </span>
                }
              >
                <Form onSubmit={handleSubmit} className={styles.customForm}>
                  <div className="row">
                    <div className="col-lg-12">
                      <Form.Group className="mb-4 mt-3" controlId="formAddress">
                        <Form.Label className={styles.form_laben}>
                          Account Holder Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className={styles.form_input}
                          value={accountHolderName}
                          onChange={(e) => setAccountHolderName(e.target.value)}
                          placeholder="Enter your Name"
                          required
                        />
                      </Form.Group>
                    </div>
                    <div className="col-lg-6">
                      <Form.Group className="mb-4" controlId="formName">
                        <Form.Label className={styles.form_laben}>
                          Account Number
                        </Form.Label>
                        <Form.Control
                          type="number"
                          className={styles.form_input}
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          placeholder="Enter Account Number"
                          required
                        />
                      </Form.Group>
                    </div>

                    <div className="col-lg-6">
                      <Form.Group className="mb-4" controlId="formIDNumber">
                        <Form.Label className={styles.form_laben}>
                          IFSC
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className={styles.form_input}
                          value={ifsc}
                          onChange={(e) => setIfsc(e.target.value)}
                          placeholder="Enter IFSC code"
                          required
                        />
                      </Form.Group>
                    </div>

                    <div className="col-lg-12">
                      <Form.Group className="mb-4" controlId="formIDNumber">
                        <Form.Label className={styles.form_laben}>
                          Account Type
                        </Form.Label>
                        <Form.Control
                          as="select" // Use Form.Control for styling
                          name="account"
                          className={styles.form_input}
                          value={accountType}
                          onChange={(e) => setAccountType(e.target.value)}
                          required
                        >
                          <option value="0">-- select Account Type --</option>
                          <option value="saving">Saving</option>
                          <option value="current">Current</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </div>

                  <div className={styles.buttonContainer}>
                    <Button
                      variant="primary"
                      type="submit"
                      className={`${styles.submitButton}`}
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </Tab>

              {/* Tab 2: Crypto Address */}

              <Tab
                eventKey="cryptoAddress"
                title={
                  <span className={styles.tabTitle}>
                    <FaBitcoin className={styles.tabIcon} />
                    Crypto Address
                  </span>
                }
              >
                <Form
                  onSubmit={handlePaymentSubmit}
                  className={styles.customForm}
                >
                  <div className="row">
                    <div className="col-lg-12">
                      <Form.Group className="mb-4 mt-3" controlId="formAddress">
                        <Form.Label className={styles.form_label}>
                          UPI Payment Options
                        </Form.Label>

                        <div
                          className={`d-flex justify-content-between ${styles.response_payment_icon}`}
                        >
                          <Form.Check
                            type="radio"
                            label={
                              <span>
                                <img
                                  src="/images/dashboard/gpay.png"
                                  alt="GPay"
                                  className={styles.payment_gpay_Icon}
                                />
                              </span>
                            }
                            name="upiMethod"
                            id="gpay"
                            value="gpay"
                            className={styles.payment_icon}
                            onChange={(e) => setUpiMethod(e.target.value)}
                            checked={upiMethod === "gpay"}
                          />

                          <Form.Check
                            type="radio"
                            label={
                              <span>
                                <img
                                  src="/images/dashboard/phonepe.png"
                                  alt="PhonePe"
                                  className={styles.paymentIcon}
                                />
                              </span>
                            }
                            name="upiMethod"
                            id="phonepe"
                            value="phonepe"
                            className={styles.payment_icon}
                            onChange={(e) => setUpiMethod(e.target.value)}
                            checked={upiMethod === "phonepe"}
                          />

                          <Form.Check
                            type="radio"
                            label={
                              <span>
                                <img
                                  src="/images/dashboard/bharatpe.png"
                                  alt="BharatPe"
                                  className={styles.bharat_pay_Icon}
                                />
                              </span>
                            }
                            name="upiMethod"
                            id="bharatpe"
                            value="bharatpe"
                            className={styles.payment_icon}
                            onChange={(e) => setUpiMethod(e.target.value)}
                            checked={upiMethod === "bharatpe"}
                          />

                          <Form.Check
                            type="radio"
                            label={
                              <span>
                                <img
                                  src="/images/dashboard/paytm.png"
                                  alt="PayTM"
                                  className={styles.payment_paytm_icon}
                                />
                              </span>
                            }
                            name="upiMethod"
                            id="paytm"
                            value="paytm"
                            className={styles.payment_icon}
                            onChange={(e) => setUpiMethod(e.target.value)}
                            checked={upiMethod === "paytm"}
                          />
                        </div>

                        <Form.Group className="mt-3">
                          <Form.Label className={styles.form_label}>
                            UPI ID
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your UPI ID (e.g., abc145@okicicic)"
                            required
                            className={styles.form_input}
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                          />
                        </Form.Group>
                      </Form.Group>
                    </div>
                  </div>

                  <div className={styles.buttonContainer}>
                    <Button
                      variant="primary"
                      type="submit"
                      className={styles.submitButton}
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </Tab>

              {/* Tab 3: PAN Card */}

              <Tab
                eventKey="panCard"
                title={
                  <span className={styles.tabTitle}>
                    <FaIdCard className={styles.tabIcon} />
                    PAN Card
                  </span>
                }
              >
                <form onSubmit={handleDocumentSubmit} ref={formRef}>
                  <div>
                    <div className="row">
                      <div className="col-lg-12">
                        <Form.Group
                          className="mb-4 mt-3"
                          controlId="formAddress"
                        >
                          <Form.Label className={styles.form_label}>
                            Pan Card Number
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className={styles.form_input}
                            placeholder="Enter Pan Card Number"
                            required
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <h5 className="mb-3">Choose Pan Card Image</h5>

                    {/* Custom file upload area */}
                    <div className={`${styles.custom_file_upload} mt-4`}>
                      <div
                        className={`${styles.upload_area} ${
                          files.length > 0 ? styles.hidden : ""
                        }`}
                      >
                        <label
                          htmlFor="file-upload"
                          className={styles.upload_label}
                        >
                          <IoMdCloudUpload className={styles.upload_icon} />
                          <span className={styles.upload_text}>
                            Drop files here or click to upload.
                          </span>
                          <input
                            id="file-upload"
                            name="file"
                            type="file"
                            multiple
                            className={styles.file_input}
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>

                      {/* Image preview section */}
                      {files.length > 0 && (
                        <div className={`mt-3 ${styles.imagePreviewContainer}`}>
                          {files.map((file, index) => (
                            <div className="border rounded mt-2" key={index}>
                              <div className="d-flex p-2">
                                <div className="flex-shrink-0 me-3">
                                  <div className="avatar-sm bg-light rounded">
                                    <img
                                      src={URL.createObjectURL(file)}
                                      alt={file.name}
                                      className={`img-fluid rounded d-block ${styles.previewImage}`}
                                    />
                                  </div>
                                </div>
                                <div className="flex-grow-1">
                                  <div className="pt-1">
                                    <h5 className="fs-14 mb-1" data-dz-name>
                                      {file.name}
                                    </h5>
                                    <p
                                      className="fs-13 text-muted mb-0"
                                      data-dz-size
                                    >
                                      {`${file.size} bytes`}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex-shrink-0 ms-3">
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-danger"
                                    onClick={() => {
                                      setFiles((prevFiles) =>
                                        prevFiles.filter((_, i) => i !== index)
                                      );
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className={styles.buttonContainer}>
                      <Button
                        variant="primary"
                        type="submit"
                        className={styles.submitButton}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </form>
              </Tab>

              {/* Tab 4: Other document */}
              <Tab
                eventKey="otherdocument"
                title={
                  <span className={styles.tabTitle}>
                    <TiDocumentText className={styles.tabIcon} />
                    Identity Proof
                  </span>
                }
              >
                <Form
                  onSubmit={handleIdentityProofSubmit}
                  className={styles.customForm}
                >
                  <div className="row">
                    <h5 className="mb-3">Choose Document Type</h5>
                    <div className={`d-flex gap-2 ${styles.inner_tabs}`}>
                      {/* Document type radio buttons */}
                      <div>
                        <input
                          type="radio"
                          className="btn-check"
                          id="aadhar-card"
                          name="choose-document"
                          value="Adhaar"
                          checked={selectedDocument === "Adhaar"}
                          onChange={handleDocumentChange}
                        />
                        <label
                          className={`btn btn-outline-info ${styles.inner_tabs_response}`}
                          htmlFor="aadhar-card"
                        >
                          Aadhaar Card
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          className="btn-check"
                          id="voter-id"
                          name="choose-document"
                          value="VoterID"
                          checked={selectedDocument === "VoterID"}
                          onChange={handleDocumentChange}
                        />
                        <label
                          className={`btn btn-outline-info ${styles.inner_tabs_response}`}
                          htmlFor="voter-id"
                        >
                          Voter ID
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          className="btn-check"
                          id="passport"
                          name="choose-document"
                          value="Passport"
                          checked={selectedDocument === "Passport"}
                          onChange={handleDocumentChange}
                        />
                        <label
                          className={`btn btn-outline-info ${styles.inner_tabs_response}`}
                          htmlFor="passport"
                        >
                          Passport
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          className="btn-check"
                          id="driving-license"
                          name="choose-document"
                          value="Driving License"
                          checked={selectedDocument === "Driving License"}
                          onChange={handleDocumentChange}
                        />
                        <label
                          className={`btn btn-outline-info ${styles.inner_tabs_response}`}
                          htmlFor="driving-license"
                        >
                          Driving License
                        </label>
                      </div>
                    </div>

                    {/* Proof number input field */}
                    <Form.Group className="mb-4 mt-3" controlId="proofNumber">
                      <Form.Label className={styles.form_label}>
                        Proof Number
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className={styles.form_input}
                        placeholder={`Enter ${selectedDocument} Number`}
                        required
                      />
                    </Form.Group>

                    {/* Custom file upload area */}
                    <div className={`${styles.custom_file_upload} mt-4`}>
                      <div
                        className={`${styles.upload_area} ${
                          files.length > 0 ? styles.hidden : ""
                        }`}
                      >
                        <label
                          htmlFor="file-upload"
                          className={styles.upload_label}
                        >
                          <IoMdCloudUpload className={styles.upload_icon} />
                          <span className={styles.upload_text}>
                            Drop files here or click to upload.
                          </span>
                          <input
                            id="file-upload"
                            name="file"
                            type="file"
                            multiple
                            className={styles.file_input}
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>

                      {/* Image preview section */}
                      {files.length > 0 && (
                        <div className={`mt-3 ${styles.imagePreviewContainer}`}>
                          {files.map((file, index) => (
                            <div className="border rounded mt-2" key={index}>
                              <div className="d-flex p-2">
                                <div className="flex-shrink-0 me-3">
                                  <div className="avatar-sm bg-light rounded">
                                    <img
                                      src={URL.createObjectURL(file)}
                                      alt={file.name}
                                      className={`img-fluid rounded d-block ${styles.previewImage}`}
                                    />
                                  </div>
                                </div>
                                <div className="flex-grow-1">
                                  <div className="pt-1">
                                    <h5 className="fs-14 mb-1" data-dz-name>
                                      {file.name}
                                    </h5>
                                    <p
                                      className="fs-13 text-muted mb-0"
                                      data-dz-size
                                    >
                                      {`${file.size} bytes`}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex-shrink-0 ms-3">
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-danger"
                                    onClick={() => {
                                      setFiles((prevFiles) =>
                                        prevFiles.filter((_, i) => i !== index)
                                      );
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={styles.buttonContainer}>
                    <Button
                      variant="primary"
                      type="submit"
                      className={`${styles.submitButton} ${styles.reponse_identity_submitButton}`}
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </Tab>

              {/* Tab 5: Nominee */}
              <Tab
                eventKey="nominee"
                title={
                  <span className={styles.tabTitle}>
                    <FaUserTie className={styles.tabIcon} />
                    Nominee
                  </span>
                }
              >
                <Form
                  onSubmit={handleNomineeSubmit}
                  className={styles.customForm}
                >
                  <div className="row">
                    <div className="col-lg-12">
                      <Form.Group className="mb-4 mt-3" controlId="formAddress">
                        <Form.Label className={styles.form_laben}>
                          Nominee Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className={styles.form_input}
                          placeholder="Enter Nominee Name"
                          required
                        />
                      </Form.Group>
                    </div>
                    <div className="col-lg-6">
                      <Form.Group className="mb-4" controlId="formName">
                        <Form.Label className={styles.form_laben}>
                          Relation
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className={styles.form_input}
                          placeholder="Enter Nominee Relation"
                          required
                        />
                      </Form.Group>
                    </div>

                    <div className="col-lg-6">
                      <Form.Group className="mb-4" controlId="formIDNumber">
                        <Form.Label className={styles.form_laben}>
                          DOB(Date Of Birth)
                        </Form.Label>
                        <Form.Control
                          type="date"
                          className={styles.form_input}
                          placeholder="Date of Birth"
                          required
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className={styles.buttonContainer}>
                    <Button
                      variant="primary"
                      type="submit"
                      className={styles.submitButton}
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </Tab>
            </Tabs>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Kyc;
