import { DateRangePicker } from "react-date-range";
import React, { useState } from "react";
import { SchedulePickerProps } from "../../interfaces/interfaces";
import { addDays } from "date-fns";

const SchedulePicker: React.FC<SchedulePickerProps> = ({}) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  return (
    <>
      <DateRangePicker
        onChange={(item: any) => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={state}
        direction="horizontal"
      />
      ;
    </>
  );
};

export default SchedulePicker;
