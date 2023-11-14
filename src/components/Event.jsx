import React from 'react';

const Event = ({ event }) => {
  return (
    <div className="event">
      <div className="title">
        <i className="fas fa-circle"></i>
        <h3 className="event-title">{event.title}</h3>
      </div>
      <div className="event-time">
        <span className="event-time">{event.time}</span>
      </div>
    </div>
  );
};

export default Event;
