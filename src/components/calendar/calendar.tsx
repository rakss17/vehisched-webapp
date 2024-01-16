import React, { useState, useEffect, useRef } from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";

const localizer = momentLocalizer(moment);

interface MyEvent extends Event {
  status?: string;
}

type CalendarScheduleProps = {
  schedulesData: any[];
};



const CalendarSchedule: React.FC<CalendarScheduleProps> = ({
  schedulesData,
}) => {
  const [markedDates, setMarkedDates] = useState<Date[]>([]);
  const [startDates, setStartDates] = useState<Date[]>([]);
  const [endDates, setEndDates] = useState<Date[]>([]);
  const colors = ["#060e57", "#253093", "#1122BD", "#B67D06", "#E0A425", "#fdb316", "#656353", "#7D7A5B", "#979371", ]
  const eventColors = useRef<Map<number, string>>(new Map());

  const assignEventColors = () => {
    let lastColorIndex = 0;
    schedulesData.forEach((schedule, index) => {
      const nextColorIndex = (lastColorIndex + 1) % colors.length;
      eventColors.current.set(index, colors[nextColorIndex]);
      lastColorIndex = nextColorIndex;
    });
  };

  useEffect(() => {
    assignEventColors();
  }, [schedulesData]);

  const eventStyleGetter = (
    event: MyEvent,
    start: any,
    end: any,
    isSelected: boolean
  ) => {
    const eventIndex = events.findIndex(e => e.start === event.start && e.end === event.end);
    let backgroundColor = eventColors.current.get(eventIndex) || "#060e57";
    const textColor = "white";

    if (event && event.status) {
      if (
        event.status === "Driver Absence" ||
        event.status === "Ongoing Vehicle Maintenance"
      ) {
        backgroundColor = "red";
      }
    }

    return {
      style: {
        backgroundColor,
        color: textColor,
      },
    };
  };


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
    const requesterName = schedulesData[index]
      ? schedulesData[index].requester_full_name
      : "undefined";
    const status = schedulesData[index]
      ? schedulesData[index].status
      : "undefined";
    return {
      title: `${requesterName}`,
      start: startDate,
      end: endDates[index],
      status: status,
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
        onSelectEvent={(event: any) => {
           console.log(event)
        }}
      />
    </div>
  );
};
export default CalendarSchedule;
