import React from "react";
import { getMonthName } from "../utils/dateUtils";

export default function CalendarHeader({ month, year, onPrev, onNext }) {
  return (
    <div className="header">
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          data-testid="prev-month-btn"
          aria-label="Previous month"
          className="nav-btn"
          onClick={onPrev}
        >
          &lt;
        </button>
        <div
          data-testid="month-year-display"
          className="month-year"
        >
          {getMonthName(month)} {year}
        </div>
        <button
          data-testid="next-month-btn"
          aria-label="Next month"
          className="nav-btn"
          onClick={onNext}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
