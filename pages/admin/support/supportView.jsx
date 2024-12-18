import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { common } from "../../../src/helper/Common";

export const AlertMessage = ({ message }) => {
  if (!message) return null;

  const alertClass = "alert-success";

  return (
    <div className={`alert ${alertClass}`} role="alert">
      {message}
    </div>
  );
};

const Breadcrumb = ({ links, current }) => (
  <nav aria-label="breadcrumb">
    <ol className="breadcrumb">
      {links.map((link, idx) => (
        <li key={idx} className="breadcrumb-item">
          <a href={link.href}>{link.label}</a>
        </li>
      ))}
      <li className="breadcrumb-item active" aria-current="page">
        {current}
      </li>
    </ol>
  </nav>
);

const SupportView = () => {
  const [reply, setReply] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id, message: queryMessage } = router.query;

  useEffect(() => {
    if (queryMessage) {
      setMessage(decodeURIComponent(queryMessage));
    }
  }, [queryMessage]);

  const handleChange = (e) => setReply(e.target.value);

  const handleReplySubmit = (e) => {
    e.preventDefault();

    if (!id) {
      AlertMsg("Transaction ID not provided.");
      console.error("Transaction ID missing from query.");
      return;
    }

    setLoading(true);

    common.getAPI(
      {
        method: "POST",
        url: "support/updateSupport",
        data: {
          reply,
          id,
          approvedDate: new Date().toISOString(),
          replyStatus: 1,
        },
      },
      (resp) => {
        setLoading(false); // Stop loading spinner if needed
        if (resp.status === "success") {
          console.log("Response: ", resp);
          // You don't need to set a success message in the `message` state
          // You can either show a success alert or just redirect
          router.push("/admin/support/approvedSupport");
        } else if (resp.status === "error") {
          AlertMsg(
            "error",
            "Oops!",
            resp.message || "Failed to update the support request."
          );
        }
      }
    );
  };

  return (
    <div className="container-fluid">
      {/* Header Section */}
      <header className="row pt-2 pb-2">
        <div className="col-sm-9">
          <h4 className="page-title">Support</h4>
          <Breadcrumb
            links={[
              { href: "/admin/dashboard", label: "Home" },
              { href: "/admin/support", label: "Support" },
            ]}
            current="View"
          />
        </div>
      </header>

      {/* Message Detail Section */}
      <section>
        <h6 className="text-uppercase">Message Detail</h6>
        <hr />
        <AlertMessage message={message} /> {/* Display message here */}
      </section>

      {/* Reply Form Section */}
      <section className="row">
        <div className="col-md-4">
          <form onSubmit={handleReplySubmit}>
            <div className="form-group">
              <label
                htmlFor="reply"
                style={{ textTransform: "uppercase", marginBottom: "10px" }}
              >
                Reply
              </label>
              <textarea
                style={{ background: "#f7f7f7" }}
                id="reply"
                name="reply"
                className="form-control"
                value={reply}
                onChange={handleChange}
                required
                aria-label="Reply text area"
              />
            </div>
            <button
              type="submit"
              className="btn btn-success mt-3"
              style={{
                padding: "7px 20px",
                textTransform: "uppercase",
                fontSize: "15px",
              }}
            >
              Reply
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SupportView;
