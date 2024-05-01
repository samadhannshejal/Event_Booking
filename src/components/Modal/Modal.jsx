import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./Modal.css";
const CustomModal = ({ modal, setModal, data, isBook }) => {
  const [value, setValue] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBook = () => {
    const events = JSON.parse(localStorage.getItem("event")) || [];
    const index = events.findIndex((event) => event.event_id === data.event_id);

    if (value > data.total_tickets) {
      setErrorMessage("Entered ticket count exceeds available tickets.");
      return;
    }
    if (index !== -1) {
      events[index].total_tickets -= value;
      localStorage.setItem("event", JSON.stringify(events));
      setModal({ isOpen: false });
    }
  };
  return (
    <>
      <Modal show={modal?.isOpen}>
        <div className="container">
          <div className="d-flex justify-content-between">
            <div style={{ fontSize: 30 }}>{data?.event_name}</div>
            <div
              onClick={() => setModal({ isOpen: false })}
              className="close-icon"
            >
              &times;
            </div>
          </div>
          <hr />
          <div className="event-details">
            <h4 className="detail-item">
              <span>Venue:</span> {data?.venue}
            </h4>
            <h4 className="detail-item">
              <span>Date:</span> {data?.date}
            </h4>
            <h4 className="detail-item">
              <span>Time:</span> {data?.time}
            </h4>
            <h4 className="detail-item">
              <span>Total Tickets:</span> {data?.total_tickets}
            </h4>
            <hr />
            <div className="booking-section">
              {isBook && (
                <div className="d-flex justify-content-between">
                  <input
                    type="number"
                    placeholder="Enter ticket counts"
                    value={value}
                    onChange={handleChange}
                    min="1"
                    className="ticket-input"
                  />
                  <button
                    className="btn btn-success book-button"
                    onClick={handleBook}
                  >
                    Book
                  </button>
                </div>
              )}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CustomModal;
