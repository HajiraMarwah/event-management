import React from "react";
import { formatYYYYMMDD } from "../utils/dateUtils";

export default function CalendarGrid({
  calendarGrid,
  eventsByDate,
  todayStr,
  onDeleteEvent
}) {
  return (
    <div className="grid" style={{ marginTop: 18 }}>
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((w) => (
        <div key={w} className="weekday">
          {w}
        </div>
      ))}

      {calendarGrid.map((week, wi) =>
        week.map((cell, ci) => {
          if (!cell) {
            return (
              <div key={`empty-${wi}-${ci}`} className="day-cell" />
            );
          }
          const dateStr = formatYYYYMMDD(cell);
          const dayEvents = eventsByDate[dateStr] || [];
          const isToday = dateStr === todayStr;

          return (
            <div
              key={dateStr}
              className={`day-cell ${isToday ? "today" : ""}`}
            >
              <div className="day-number">{cell.getDate()}</div>

              {dayEvents.map((ev) => (
                <div
                  key={ev.id}
                  data-testid="event-item"
                  className="event-item"
                >
                  <div
                    className="event-title"
                    title={ev.title}
                  >
                    {ev.title}
                  </div>
                  <button
                    data-testid="delete-event-btn"
                    className="event-delete"
                    onClick={() => onDeleteEvent(ev.id)}
                    aria-label={`Delete ${ev.title}`}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          );
        })
      )}
    </div>
  );
}
