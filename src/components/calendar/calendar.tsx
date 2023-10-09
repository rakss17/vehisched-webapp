import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";

const localizer = momentLocalizer(moment);

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
type CalendarScheduleProps = {
  schedulesData: any[];
};

const CalendarSchedule: React.FC<CalendarScheduleProps> = ({
  schedulesData,
}) => {
  const [markedDates, setMarkedDates] = useState<Date[]>([]);

  const markDates = () => {
    const dates = schedulesData.map((schedule) => {
      const date = new Date(schedule.travel_date);
      const time = schedule.travel_time;
      const [hours, minutes] = time.split(":");
      date.setHours(Number(hours));
      date.setMinutes(Number(minutes));
      return date;
    });
    setMarkedDates(dates);
  };

  useEffect(() => {
    markDates();
  }, [schedulesData]);

  const events: Event[] = markedDates.map((date, index) => ({
    title: `Trip ${schedulesData[index].tripticket_id}`,
    start: date,
    end: date,
  }));

  return (
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
};
export default CalendarSchedule;
