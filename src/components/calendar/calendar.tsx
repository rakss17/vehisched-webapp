import React from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";

const localizer = momentLocalizer(moment);

const events: Event[] = [
  {
    title: "Trip 1",
    start: new Date(2023, 6, 10, 10, 0),
    end: new Date(2023, 6, 10, 11, 0),
  },
  {
    title: "Trip 2",
    start: new Date(2023, 6, 17, 10, 0),
    end: new Date(2023, 6, 17, 11, 0),
  },
];
const eventStyleGetter = (event: Event) => {
  const backgroundColor = "#060e57";
  const textColor = "white";

  return {
    style: {
      backgroundColor,
      color: textColor,
    },
  };
};

const CalendarSchedule: React.FC = () => (
  <div className="calendar-container-main">
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      eventPropGetter={eventStyleGetter}
    />
  </div>
);

export default CalendarSchedule;
