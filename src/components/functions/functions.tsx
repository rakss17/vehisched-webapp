import {
  differenceInMilliseconds,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  add,
  addMilliseconds,
  formatISO,
} from "date-fns";

export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const formatTime = (timeString: any) => {
  if (timeString) {
    if (timeString.split(":").length < 3 ? "hh:mm aa" : null) {
      return timeString;
    } else {
      const time = new Date(`1970-01-01T${timeString}`);
      return time.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
    }
  } else {
    return "";
  }
};

export const formatDate = (inputDate: any) => {
  if (inputDate) {
    const datePart = inputDate.split("-");
    return `${datePart[1]}/${datePart[2]}/${datePart[0]}`;
  } else {
    return "";
  }
};

export const formatDateTime = (dateTimeString: any) => {
  const dateTime = new Date(dateTimeString);
  return dateTime.toLocaleString([], {
    dateStyle: "short",
    timeStyle: "short",
  });
};

export const calculateDateGap = (dateTime1: any, dateTime2: any) => {
  const date1 = new Date(dateTime1);
  const date2 = new Date(dateTime2);

  return {
    milliseconds: differenceInMilliseconds(date2, date1),
    seconds: differenceInSeconds(date2, date1),
    minutes: differenceInMinutes(date2, date1),
    hours: differenceInHours(date2, date1),
    days: differenceInDays(date2, date1),
  };
};

export const addGapToDate = (
  baseDateTime: Date,
  gapInMilliseconds: number
): string => {
  const newDate = addMilliseconds(baseDateTime, gapInMilliseconds);
  return (
    formatISO(newDate, { representation: "date" }) +
    "T" +
    formatISO(newDate, { representation: "time" })
  );
};

export function splitDate(date: Date | null): string | null {
  if (!date) {
    return null;
  }

  // Array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Array of day names
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get the day name, month name, and year
  const dayName = dayNames[date.getDay()];
  const monthName = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const dayOfMonth = date.getDate();

  // Format the date as "Thu Mar 21 2024"
  const formattedDate = `${dayName} ${monthName} ${dayOfMonth} ${year}`;

  return formattedDate;
}

export function formatDateToYYYYMMDD(dateString: any) {
  // Parse the date string into a Date object
  const date = new Date(dateString);
  console.log("from function new date", date);

  // Convert the date to an ISO string
  date.setHours(date.getHours() + 8);
  const isoString = date.toISOString();
  console.log("from isostring", isoString);

  // Extract the date part from the ISO string
  const datePart = isoString.split("T")[0];
  console.log("from function datepart extract", datePart);

  // Return the formatted date
  return datePart;
}

export function convertTo12HourFormat(timeString: any) {
  // Split the time string into hours and minutes
  const [hours, minutes] = timeString.split(":");

  // Convert the hours to 12-hour format
  let formattedHours = parseInt(hours, 10);
  const period = formattedHours >= 12 ? "PM" : "AM";

  // Adjust the hours for 12-hour format
  if (formattedHours > 12) {
    formattedHours -= 12;
  } else if (formattedHours === 0) {
    formattedHours = 12;
  }

  // Return the formatted time string
  return `${formattedHours}:${minutes} ${period}`;
}

export function convertTo24HourFormat(timeString: any) {
  // Split the time string into hours, minutes, and period (AM/PM)
  const [time, period] = timeString.split(" ");
  const [hours, minutes] = time.split(":");

  // Convert hours to a number
  let formattedHours = parseInt(hours, 10);

  // Adjust hours based on AM/PM
  if (period.toLowerCase() === "pm" && formattedHours !== 12) {
    formattedHours += 12;
  } else if (period.toLowerCase() === "am" && formattedHours === 12) {
    formattedHours = 0;
  }

  // Return the formatted time string in 24-hour format
  return `${formattedHours.toString().padStart(2, "0")}:${minutes.padStart(
    2,
    "0"
  )}`;
}

export function removeLastZeroesOfTime(time: string) {
  if (time.endsWith(":00")) {
    return time.slice(0, -3);
  }

  return time;
}
