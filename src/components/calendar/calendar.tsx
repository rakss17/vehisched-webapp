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
  const [startDates, setStartDates] = useState<Date[]>([]);
  const [endDates, setEndDates] = useState<Date[]>([]);

  const markDates = () => {
    const startDates = schedulesData.map((schedule) => {
      const startDate = new Date(schedule.travel_date);
      const startTime = schedule.travel_time;
      const [startHours, startMinutes] = startTime.split(":");
      startDate.setHours(Number(startHours));
      startDate.setMinutes(Number(startMinutes));
      return startDate;
    });

    const endDates = schedulesData.map((schedule) => {
      const endDate = new Date(schedule.return_date);
      const endTime = schedule.return_time;
      const [endHours, endMinutes] = endTime.split(":");
      endDate.setHours(Number(endHours));
      endDate.setMinutes(Number(endMinutes));
      return endDate;
    });

    setStartDates(startDates);
    setEndDates(endDates);
  };

  useEffect(() => {
    markDates();
  }, [schedulesData]);

  const events: Event[] = startDates.map((startDate, index) => {
    const tripId = schedulesData[index]
      ? schedulesData[index].trip_id
      : "undefined";
    return {
      title: `Trip ${tripId}`,
      start: startDate,
      end: endDates[index],
    };
  });

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
