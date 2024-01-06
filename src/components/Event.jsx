import moment from 'moment';
import React from 'react';

const Event = ({ event }) => {
  return (
    <>
      <div key={event._id} style={{ color: "#fff" }}>
        <div className="title">
          <i className="fas fa-circle"></i>
          <h3 className="event-title">{event?.events[0]?.title}</h3>
        </div>
        <div className="time-wrapper">
          <div className="event-time">
            <span className="from-span">From:</span>
            <span className="event-time">
              {moment(new Date(event?.events[0]?.time)).format(
                "hh:mm a"
              )}
            </span>
          </div>
          <div className="event-time">
            <span className="from-span">To:</span>
            <span className="event-time">
              {moment(event?.events[1]?.time).format("hh:mm a")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
