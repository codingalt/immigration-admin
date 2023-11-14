import React, { useState, useEffect } from 'react';
import Event from './Event';
import '../style/Calender.css';
import '@fortawesome/fontawesome-free/css/all.css';

import SideNavbar from './SideNavbar';

const Calendar = () => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const [today, setToday] = useState(new Date());
  const [activeDay, setActiveDay] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [eventsArr, setEventsArr] = useState([]);

  useEffect(() => {
    initCalendar();
    getEvents();
  }, []);

  const prevMonth = () => {
    setMonth((prevMonth) => (prevMonth - 1 + 12) % 12);
    if (month === 0) {
      setYear((prevYear) => prevYear - 1);
    }
    initCalendar();
  };

  const nextMonth = () => {
    setMonth((prevMonth) => (prevMonth + 1) % 12);
    if (month === 11) {
      setYear((prevYear) => prevYear + 1);
    }
    initCalendar();
  };

  const initCalendar = () => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    const dateElement = document.querySelector(".date");
    dateElement.innerHTML = months[month] + " " + year;

    let days = "";

    for (let x = day; x > 0; x--) {
      days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDate; i++) {
      let event = false;
      eventsArr.forEach((eventObj) => {
        if (eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year) {
          event = true;
        }
      });
      if (
        i === today.getDate() &&
        year === today.getFullYear() &&
        month === today.getMonth()
      ) {
        setActiveDay(i);
        getActiveDay(i);
        updateEvents(i);
        if (event) {
          days += `<div class="day today active event">${i}</div>`;
        } else {
          days += `<div class="day today active">${i}</div>`;
        }
      } else {
        if (event) {
          days += `<div class="day event">${i}</div>`;
        } else {
          days += `<div class="day">${i}</div>`;
        }
      }
    }

    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="day next-date">${j}</div>`;
    }

    const daysContainer = document.querySelector(".days");
    daysContainer.innerHTML = days;
    addListner();
  };

  const addListner = () => {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
      day.addEventListener("click", (e) => {
        getActiveDay(e.target.innerHTML);
        updateEvents(Number(e.target.innerHTML));
        setActiveDay(Number(e.target.innerHTML));
        days.forEach((day) => {
          day.classList.remove("active");
        });
        if (e.target.classList.contains("prev-date")) {
          prevMonth();
          setTimeout(() => {
            const days = document.querySelectorAll(".day");
            days.forEach((day) => {
              if (!day.classList.contains("prev-date") && day.innerHTML === e.target.innerHTML) {
                day.classList.add("active");
              }
            });
          }, 100);
        } else if (e.target.classList.contains("next-date")) {
          nextMonth();
          setTimeout(() => {
            const days = document.querySelectorAll(".day");
            days.forEach((day) => {
              if (!day.classList.contains("next-date") && day.innerHTML === e.target.innerHTML) {
                day.classList.add("active");
              }
            });
          }, 100);
        } else {
          day.classList.add("active");
        }
      });
    });
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [eventsArr]);

  const handleDocumentClick = (e) => {
    const addEventBtn = document.querySelector(".add-event");
    const addEventWrapper = document.querySelector(".add-event-wrapper");
    if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
      addEventWrapper.classList.remove("active");
    }
  };

  const getActiveDay = (date) => {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];
    const eventDay = document.querySelector(".event-day");
    const eventDate = document.querySelector(".event-date");
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year;
  };

  const updateEvents = (date) => {
    let events = "";
    eventsArr.forEach((event) => {
      if (date === event.day && month + 1 === event.month && year === event.year) {
        event.events.forEach((event) => {
          events += `<div class="event">
              <div class="title">
                <i class="fas fa-circle"></i>
                <h3 class="event-title">${event.title}</h3>
              </div>
              <div class="event-time">
                <span class="event-time">${event.time}</span>
              </div>
          </div>`;
        });
      }
    });
    const eventsContainer = document.querySelector(".events");
    if (events === "") {
      events = `<div class="no-event">
              <h3>No Events</h3>
          </div>`;
    }
    eventsContainer.innerHTML = events;
    saveEvents();
  };
  
  const goToToday = () => {
    setToday(new Date());
    setMonth(today.getMonth());
    setYear(today.getFullYear());
    initCalendar();
  };

  const handleDateInputChange = (e) => {
    const dateInput = document.querySelector(".date-input");
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length === 2) {
      dateInput.value += "/";
    }
    if (dateInput.value.length > 7) {
      dateInput.value = dateInput.value.slice(0, 7);
    }
    if (e.inputType === "deleteContentBackward") {
      if (dateInput.value.length === 3) {
        dateInput.value = dateInput.value.slice(0, 2);
      }
    }
  };

  const gotoDate = () => {
    const dateInput = document.querySelector(".date-input");
    const dateArr = dateInput.value.split("/");
    if (dateArr.length === 2) {
      if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
        setMonth(dateArr[0] - 1);
        setYear(dateArr[1]);
        initCalendar();
        return;
      }
    }
    alert("Invalid Date");
  };

  const addEvent = () => {
    const addEventWrapper = document.querySelector(".add-event-wrapper");
    addEventWrapper.classList.toggle("active");
  };

  const addEventSubmit = () => {
    const eventNameInput = document.querySelector(".event-name");
    const eventTimeFromInput = document.querySelector(".event-time-from");
    const eventTimeToInput = document.querySelector(".event-time-to");
  
    const eventName = eventNameInput.value;
    const eventTimeFrom = eventTimeFromInput.value;
    const eventTimeTo = eventTimeToInput.value;
  
    if (eventName.trim() === "" || eventTimeFrom.trim() === "" || eventTimeTo.trim() === "") {
      alert("Please fill in all event details.");
      return;
    }
  
    const eventObj = {
      day: activeDay,
      month: month + 1,
      year: year,
      events: [{ title: eventName, time: eventTimeFrom }, { title: eventName, time: eventTimeTo }],
    };
  
    const updatedEventsArr = [...eventsArr, eventObj];
    setEventsArr(updatedEventsArr);
    saveEvents();
  
    eventNameInput.value = "";
    eventTimeFromInput.value = "";
    eventTimeToInput.value = "";
  
    addEvent();
  };
  

  const saveEvents = () => {
    localStorage.setItem("events", JSON.stringify(eventsArr));
  };

  const getEvents = () => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEventsArr(JSON.parse(storedEvents));
    }
  };

  return (
    <div className='Main-container-calender'>
      <SideNavbar />
      <div className="container-calender">
        <div className="left">
          <div className="calendar">
            <div className="month">
              <i className="fas fa-angle-left prev" onClick={prevMonth}></i>
              <div className="date">{months[month]} {year}</div>
              <i className="fas fa-angle-right next" onClick={nextMonth}></i>
            </div>
            <div className="weekdays">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div className="days"></div>
            <div className="goto-today">
              <div className="goto">
                <input
                  type="text"
                  placeholder="mm/yyyy"
                  className="date-input"
                  onChange={handleDateInputChange}
                />
                <button className="goto-btn" onClick={gotoDate}>Go</button>
              </div>
              <button className="today-btn" onClick={goToToday}>Today</button>
            </div>
          </div>
        </div>
        <div className='Border-line'>
          <div className="right">
            <div className="today-date">
              <div className="event-day"></div>
              <div className="event-date"></div>
            </div>
            <div className="events">
              {eventsArr.map((eventObj, index) => (
                <div key={index}>
                  <Event event={eventObj} />
                </div>
              ))}
            </div>
            <button className="add-event" onClick={addEvent}>
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <div className="add-event-wrapper">
          <div className="add-event-header">
            <div className="title">Add Event</div>
            <i className="fas fa-times close" onClick={addEvent}></i>
          </div>
          <div className="add-event-body">
            <div className="add-event-input">
              <input type="text" placeholder="Event Name" className="event-name" />
            </div>
            <div className="add-event-input">
              <input type="text" placeholder="Event Time From" className="event-time-from" />
            </div>
            <div className="add-event-input">
              <input type="text" placeholder="Event Time To" className="event-time-to" />
            </div>
          </div>
          <div className="add-event-footer">
            <button className="add-event-btn" onClick={addEventSubmit}>Add Event</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
