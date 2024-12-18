import React, { useState } from "react";
import Switch from "react-switch"; // Import react-switch

const PaymentAcceptMethod = () => {
  // Array of settings with default values
  const [settings, setSettings] = useState([
    { id: 1, name: "BANK", value: true },
  ]);

  // Handle toggle for each setting
  const handleToggle = (id) => {
    setSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.id === id ? { ...setting, value: !setting.value } : setting
      )
    );
  };

  return (
    <div className="container-fluid">
      <br />
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="https://thewinnersacademy.in/admin/dashboard">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="https://thewinnersacademy.in/admin/settings">Settings</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Payment Request Method</a>
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-12 card card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>S No.</th>
                  <th>Setting Name</th>
                  <th>Value</th>
                  <th>Edit</th>
                </tr>
                {settings.map((setting, index) => (
                  <tr key={setting.id}>
                    <td>{index + 1}.</td>
                    <td>{setting.name}</td>
                    <td>
                      <div className="mt-3">
                        <Switch
                          checked={setting.value}
                          onChange={() => handleToggle(setting.id)}
                          offColor="#ccc"
                          onColor="#008cff"
                          uncheckedIcon={false}
                          checkedIcon={false}
                          height={20}
                          width={40}
                        />
                      </div>
                      <small>
                        On Enable value = "1", On Disable value = "0"
                      </small>
                    </td>
                    <td>
                      <a
                        href={`/admin/setting/Edit_request?id=${setting.id}`}
                        className="btn btn-info btn-sm"
                      >
                        <i className="fa fa-edit" />
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentAcceptMethod;
