import React, { useState, useEffect, useContext } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { DarkModeContext } from "../../src/components/common/darkmodeContext/DarkModeContext";
import Link from "next/link";
import styles from "./userall.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const NewsAndEvents = () => {
  const [newsList, setNewsList] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState("news");
  const { darkMoreMainSection } = useContext(DarkModeContext);

  // Fetch news dynamically
  const fetchNews = () => {
    setTimeout(() => {
      const newNews = Array.from({ length: 10 }, (_, i) => ({
        id: (page - 1) * 10 + i + 1,
        title: `News Headline ${(page - 1) * 10 + i + 1}`,
        content: `This is a summary of the news item ${
          (page - 1) * 10 + i + 1
        }.`,
        posted: `${Math.ceil(Math.random() * 10)} days ago`,
      }));
      setNewsList((prev) => [...prev, ...newNews]);
      setPage((prev) => prev + 1);
      if (page === 5) setHasMore(false);
    }, 1500);
  };

  // Fetch events dynamically
  const fetchEvents = () => {
    setTimeout(() => {
      const newEvents = Array.from({ length: 10 }, (_, i) => ({
        id: (page - 1) * 10 + i + 1,
        title: `Event Title ${(page - 1) * 10 + i + 1}`,
        content: `Details of the event ${(page - 1) * 10 + i + 1}.`,
        posted: `${Math.ceil(Math.random() * 10)} days ago`,
      }));
      setEventsList((prev) => [...prev, ...newEvents]);
      setPage((prev) => prev + 1);
      if (page === 5) setHasMore(false);
    }, 1500);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Infinite Scroll Handler
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && hasMore) {
      activeTab === "news" ? fetchNews() : fetchEvents();
    }
  };

  return (
    <div className="user_pages_container">
      <div
        className={`${
          darkMoreMainSection
            ? `${styles.darkmode_news_containe_section}`
            : `${styles.news_containe_section}`
        }`}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/dashboard" passHref>
              <a className="text-decoration-none">/Home</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white">
            {activeTab === "news" ? "News" : "Events"}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="container my-5">
          <div className={styles.slice_section}>
            <button
              className={`${styles.news_btn} ${
                activeTab === "news" ? styles.activeButton : ""
              }`}
              onClick={() => setActiveTab("news")}
            >
              News
            </button>
            <button
              className={`${styles.Events_btn} ${
                activeTab === "events" ? styles.activeButton : ""
              }`}
              onClick={() => setActiveTab("events")}
            >
              Events
            </button>
          </div>
          <div className="row">
            {/* Sticky Section */}
            <div className="col-md-6">
              <div className={styles.stickySection}>
                <h3 className="text-white mb-4">
                  {activeTab === "news" ? "Latest News" : "Upcoming Events"}
                </h3>
                <div className="card mb-4">
                  <div className={styles.news_img}>
                    <img src="/images/dashboard/newsimgbg.jpg" alt="" />
                  </div>
                  <div className={`card-body ${styles.event_body}`}>
                    <h5 className="card-title">
                      {activeTab === "news"
                        ? "Today's Headline"
                        : "Featured Event"}
                    </h5>
                    <p className="card-text">
                      {activeTab === "news"
                        ? "Stay updated with the latest insights on recent happenings."
                        : "Get ready for exciting events happening near you."}
                    </p>
                    <p className="small">Posted 1 day ago</p>
                    <button className="btn btn-primary btn-sm">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Infinite Scroll Section */}
            <div
              className={`col-md-6 ${styles.infiniteScroll}`}
              onScroll={handleScroll}
            >
              {(activeTab === "news" ? newsList : eventsList).map((item) => (
                <div className="card mb-4" key={item.id}>
                  <div className={`card-body ${styles.inner_card_body}`}>
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.content}</p>
                    <p className="small">Posted {item.posted}</p>
                    <button className="btn btn-primary btn-sm">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
              {hasMore && (
                <p className={styles.new_load_more_btn}>Loading more...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsAndEvents;
