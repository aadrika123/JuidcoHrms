"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

interface CalendarIndexProps {
  eventList: any[];
  setSelectedMonth: (value: string) => void;
  setSelectedDate: (value: string) => void;
}

const CalendarIndex: React.FC<CalendarIndexProps> = (props) => {
  const { eventList, setSelectedMonth } = props;
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={eventList}
      eventClick={(e) => {
        const selectedDate = e.event.start?.toLocaleDateString();
        if (selectedDate) {
          props.setSelectedDate(selectedDate);
        }
      }}
      headerToolbar={{
        right: "prev,next",
        left: "title",
      }}
      // height="400px"
      firstDay={1}
      rerenderDelay={1}
      aspectRatio={0.88}
      dayCellContent={(arg) => {
        return (
          <div
            style={{
              height: "0px",
              marginLeft: "-21px",
              paddingTop: "7px",
            }}
          >
            {" "}
            {/* Adjust the height as needed */}
            {arg.dayNumberText}
          </div>
        );
      }}
      datesSet={(arg) => {
        const currentStart = arg.view.currentStart;
        console.log(currentStart, "current date");
        if (currentStart instanceof Date) {
          const monthNumber = currentStart.getMonth() + 1;
          setSelectedMonth(monthNumber.toString() as any);
        }
        if (currentStart instanceof Date) {
          currentStart.setMonth(currentStart.getMonth() + 1);
          setSelectedMonth(currentStart.toISOString().slice(0, 7) as any);
        }
      }}
    />
  );
};

export default CalendarIndex;
