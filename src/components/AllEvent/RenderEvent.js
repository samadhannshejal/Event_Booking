import React, { useEffect, useState } from "react";
import { datas } from "../../constant/eventDB";
import CustomModal from "../Modal/Modal";
import "./Render.css";
export const RenderEvent = () => {
  const [pages, setPages] = useState(1);
  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    data: {},
    isBook: false,
  });
  //! fetch all event
  const fetch = () => {
    const data = JSON.parse(localStorage.getItem("event") || []);
    setEvents(data);
  };
  const handlePageChange = (page) => {
    setPages(page);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
        <h1>Event Booking System ..</h1>
      <div className="container">
        <div className="row">
          {events?.slice(pages * 6 - 6, pages * 6).map((event) => (
            <div className="col col-md-4 col-sm-6 " key={event.event_id} style={{minHeight:100}}>
              <div className="event-card">
                <h2>{event.event_name}</h2>
                <p>{event.time}</p>
                <p>{event.venue}</p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-primary"
                    onClick={() => setModal({ isOpen: true, data: event })}
                  >
                    View Details
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      setModal({ isOpen: true, data: event, isBook: true })
                    }
                  >
                    Book Ticket
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagonation */}
      <div className="pagination">
        {[...Array(Math.floor(events.length / 6))].map((_, idx) => (
          <span
            key={idx + 1}
            className={`pagination-button ${pages===idx+1 ? 'active' : ''}`}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </span>
        ))}
      </div>

      <CustomModal
        data={modal.data}
        modal={modal}
        setModal={setModal}
        isBook={modal.isBook}
      />
    </div>
  );
};
