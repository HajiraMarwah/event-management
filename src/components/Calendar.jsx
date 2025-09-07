import React, { useState, useMemo } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import EventModal from "./EventModal";
import { formatYYYYMMDD } from "../utils/dateUtils";

export default function Calendar() {
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [validationError, setValidationError] = useState("");

  const month = viewDate.getMonth();
  const year = viewDate.getFullYear();

  function goPrevMonth() {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }
  function goNextMonth() {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }

  const calendarGrid = useMemo(() => {
    const firstOfMonth = new Date(year, month, 1);
    const lastOfMonth = new Date(year, month + 1, 0);
    const firstWeekday = firstOfMonth.getDay();
    const daysInMonth = lastOfMonth.getDate();
    const cells = [];

    for (let i = 0; i < firstWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(year, month, d));
    }
    while (cells.length % 7 !== 0) cells.push(null);

    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) {
      weeks.push(cells.slice(i, i + 7));
    }
    return weeks;
  }, [month, year]);

  const eventsByDate = useMemo(() => {
    const map = {};
    for (const ev of events) {
      if (!map[ev.date]) map[ev.date] = [];
      map[ev.date].push(ev);
    }
    return map;
  }, [events]);

  const todayStr = formatYYYYMMDD(new Date());

  function openModal() {
    setTitleInput("");
    setDateInput("");
    setValidationError("");
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  function handleSaveEvent() {
    if (!titleInput.trim()) {
      setValidationError("Please enter event title");
      return;
    }
    if (!dateInput) {
      setValidationError("Please select event date");
      return;
    }

    const newEvent = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      title: titleInput.trim(),
      date: dateInput
    };
    setEvents((prev) => [...prev, newEvent]);
    setIsModalOpen(false);
  }

  function handleDeleteEvent(id) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div data-testid="calendar-container" className="calendar-wrap">
      <CalendarHeader
        month={month}
        year={year}
        onPrev={goPrevMonth}
        onNext={goNextMonth}
      />

      <div className="add-event-row">
        <button
          data-testid="add-event-btn"
          className="primary"
          onClick={openModal}
        >
          Add Event
        </button>
      </div>

      <CalendarGrid
        calendarGrid={calendarGrid}
        eventsByDate={eventsByDate}
        todayStr={todayStr}
        onDeleteEvent={handleDeleteEvent}
      />

      {isModalOpen && (
        <EventModal
          title={titleInput}
          date={dateInput}
          validationError={validationError}
          onTitleChange={(val) => {
            setTitleInput(val);
            setValidationError("");
          }}
          onDateChange={(val) => {
            setDateInput(val);
            setValidationError("");
          }}
          onClose={closeModal}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
}
