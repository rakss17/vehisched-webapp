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
