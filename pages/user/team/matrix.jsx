import React, { useState, useEffect, useContext } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { DarkModeContext } from "../../../src/components/common/darkmodeContext/DarkModeContext";
import Link from "next/link";
import { common } from "../../../src/helper/Common";
import Tree from "react-d3-tree";
import styles from "./team.module.css";

const matrix = () => {
  const { darkMoreMainSection } = useContext(DarkModeContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: "",
  });

  const geUseratrix = () => {
    common.getAPI(
      {
        method: "POST",
        url: "user/getProfile",
        data: {},
      },
      (resp) => {
        console.log("===============", resp);
      }
    );
  };

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const treeData = [
    {
      name: "companyname (Active)",
      attributes: {
        Description: "This is the root",
      },
      children: [
        {
          name: "Null",
          attributes: {
            Description: "This is the first child",
          },
          children: [
            {
              name: "Null",
              attributes: {
                Description: "This is a sub child",
              },
              children: [
                {
                  name: "Null",
                  attributes: {
                    Description: "This is a sub child",
                  },
                },
                {
                  name: "Null",
                  attributes: {
                    Description: "This is a sub child",
                  },
                },
              ],
            },
            {
              name: "Null",
              attributes: {
                Description: "This is a sub child",
              },
              children: [
                {
                  name: "Null",
                  attributes: {
                    Description: "This is a sub child",
                  },
                },
                {
                  name: "Null",
                  attributes: {
                    Description: "This is a sub child",
                  },
                },
              ],
            },
          ],
        },
        {
          name: "Null",
          attributes: {
            Description: "This is the second child",
          },
          children: [
            {
              name: "Null",
              attributes: {
                Description: "This is a sub child",
              },
              children: [
                {
                  name: "Null",
                  attributes: {
                    Description: "This is a sub child",
                  },
                },
                {
                  name: "Null",
                  attributes: {
                    Description: "This is a sub child",
                  },
                },
              ],
            },
            {
              name: "Null",
              attributes: {
                Description: "This is a sub child",
              },
              children: [
                {
                  name: "Null",
                  attributes: {
                    Description: "This is a sub child",
                  },
                },
                {
                  name: "Null",
                  attributes: {
                    Description: "This is a sub child",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  // Custom rendering for tree nodes
  const renderCustomNode = ({ nodeDatum }) => (
    <g>
      <circle
        r="20"
        fill="#87CEEB"
        onMouseEnter={(e) => handleMouseEnter(e, nodeDatum)}
        onMouseLeave={handleMouseLeave}
      />
      <text
        fill="white"
        strokeWidth="1.5"
        x="25"
        dy=".33em"
        fontSize="14"
        textAnchor="start"
      >
        {nodeDatum.name}
      </text>
    </g>
  );

  const tooltipData = [
    {
      Name: "companyname",
      SponsorId: 123456,
      TotalMember: "L:0 R:0",
      Kit: 0,
      TotalGreenUnit: "L:0 R:0",
      TotalRedUnit: "L:0 R:0",
      TotalDirectGreen: "L:0 R:0",
      TotalDirectRed: "L:0 R:0",
      Time: "2024-07-01 17:28:00",
    },
  ];

  const handleMouseEnter = (e, nodeDatum) => {
    if (nodeDatum.name === "companyname (Active)") {
      const { clientX, clientY } = e;

      setTooltip({
        visible: true,
        x: clientX + 10,
        y: clientY + 10,
        content: (
          <div
            style={{
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            {tooltipData.map((data, index) => (
              <>
                <div key={index}>
                  <p>
                    <strong>Name:</strong> {data.Name}
                  </p>
                  <p>
                    <strong>Sponsor ID:</strong> {data.SponsorId}
                  </p>
                  <p>
                    <strong>Total Members:</strong> {data.TotalMember}
                  </p>
                  <p>
                    <strong>Kit:</strong> {data.Kit}
                  </p>
                  <p>
                    <strong>Total Green Unit:</strong> {data.TotalGreenUnit}
                  </p>
                  <p>
                    <strong>Total Red Unit:</strong> {data.TotalRedUnit}
                  </p>
                  <p>
                    <strong>Total Direct Green:</strong> {data.TotalDirectGreen}
                  </p>
                  <p>
                    <strong>Total Direct Red:</strong> {data.TotalDirectRed}
                  </p>
                  <p>
                    <strong>Time:</strong> {data.Time}
                  </p>
                </div>
              </>
            ))}
          </div>
        ),
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0, content: "" });
  };

  // Adjust tree translate based on window width
  const getTreeTranslate = () => {
    if (windowWidth <= 480) {
      return { x: 300, y: 100 };
    } else if (windowWidth <= 768) {
      return { x: 600, y: 120 };
    }
    return { x: 730, y: 120 };
  };
  return (
    <div className="user_pages_container">
      <div
        className={`${
          darkMoreMainSection
            ? `${styles.darkmode_container_section}`
            : `${styles.container_section}`
        }`}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/dashboard" passHref>
              <a className="text-decoration-none">/Home</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-white">/Team</Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white">
            Right Team
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="row">
          <div className="row">
            <div className={`col-xl-5`}>
              <div className={`card ${styles.tree_card}`}>
                <div className={`card-body ${styles.team_section}`}>
                  <div className="dt-responsive table-responsive">
                    <h4 className="text-white">Left Team</h4>
                    <table
                      id="base-style"
                      className="table table-striped table-bordered nowrap"
                    >
                      <thead>
                        <tr>
                          <th>Member</th>
                          <th>BV</th>
                          <th>Green Unit</th>
                          <th>Green Direct</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className={`col-xl-5`}>
              <div className={`card ${styles.tree_card}`}>
                <div className={`card-body  ${styles.team_section}`}>
                  <div className="dt-responsive table-responsive">
                    <h4 className="text-white">Right Team</h4>
                    <table
                      id="base-style"
                      className="table table-striped table-bordered nowrap"
                    >
                      <thead>
                        <tr>
                          <th>Member</th>
                          <th>BV</th>
                          <th>Green Unit</th>
                          <th>Green Direct</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 mt-5">
              <div className={`card ${styles.tree_card}`}>
                <div
                  className={`card-body d-flex flex-column flex-md-row ${styles.tree_team_section}`}
                >
                  <form
                    className={`card col-md-4 direct_team_tree ${styles.team_inner_section}`}
                  >
                    <div className={`card-header card-no-border pb-0`}>
                      <h3 className="card-title mb-0 text-white">Filter</h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter Name"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <select className="form-control btn-square">
                              <option value="0">Select</option>
                              <option value="1">Whole Team</option>
                              <option value="2">Right Team</option>
                              <option value="3">Left Team</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <button className="btn btn-danger">Filter</button>
                        <button className="btn btn-primary">Reset</button>
                      </div>
                    </div>
                  </form>
                  <div style={{ width: "100%", height: "700px" }}>
                    <Tree
                      data={treeData}
                      renderCustomNodeElement={renderCustomNode}
                      orientation="vertical"
                      translate={getTreeTranslate()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Tooltip */}
      {tooltip.visible && (
        <div
          style={{
            position: "absolute",
            top: tooltip.y,
            left: tooltip.x,
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            pointerEvents: "none",
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default matrix;
