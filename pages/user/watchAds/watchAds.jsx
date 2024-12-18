import React, { useContext } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { DarkModeContext } from "../../../src/components/common/darkmodeContext/DarkModeContext";
import Link from "next/link";
import { common } from "../../../src/helper/Common";
import DataTable from "react-data-table-component";
import styles from "./watch.module.css";

export const customTableStyles = {
  rows: {
    style: {
      minHeight: "55px",
    },
  },
  headCells: {
    style: {
      backgroundColor: "#181D3CF0",
      color: "white",
      fontWeight: "bold",
      fontSize: "14px",
      cursor: "pointer",
    },
    // Customizing the sorting arrow
    sortOrder: {
      ascending: {
        fontSize: "16px",
        color: "#fff",
      },
      descending: {
        fontSize: "16px",
        color: "#fff",
      },
    },
  },
  cells: {
    style: {
      fontSize: "14px",
      padding: "8px",
    },
  },
};

const watchAds = () => {
  const { darkMoreMainSection } = useContext(DarkModeContext);

  const geUserWatchads = () => {
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

  const data = [
    {
      id: 1,
      image: "image 1",
      productName: "vfhvfb",
      mrp: "200000",
      description: "hdbfhv",
      preview: "fvnfbhgnb",
    },
    {
      id: 2,
      image: "image 1",
      productName: "vfhvfb",
      mrp: "200000",
      description: "hdbfhv",
      preview: "fvnfbhgnb",
    },
  ];

  const columns = [
    { name: "Sr No.", selector: (row) => row.id, sortable: true },
    { name: "Image", selector: (row) => row.image, sortable: true },
    {
      name: "Product Name",
      selector: (row) => row.productName,
      sortable: true,
    },
    {
      name: "Mrp",
      selector: (row) => row.mrp,
      sortable: true,
    },
    { name: "Description", selector: (row) => row.description, sortable: true },
    { name: "Preview", selector: (row) => row.preview, sortable: true },
  ];

  return (
    <div className="user_pages_container">
      <div
        className={`${
          darkMoreMainSection
            ? `${styles.darkmode_watchadd_container_section}`
            : `${styles.watchadd_container_section}`
        }`}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/dashboard" passHref>
              <a className="text-decoration-none">/Home</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-white">/Watching</Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white">
            watch ads
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className="col-sm-12 mt-4">
          <div
            className={`card ${styles.watch_ads}`}
            style={{
              flex: 2,
              padding: "20px",
              height: "auto",
            }}
          >
            <DataTable
              columns={columns}
              data={data}
              pagination
              highlightOnHover
              responsive
              customStyles={customTableStyles}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default watchAds;
