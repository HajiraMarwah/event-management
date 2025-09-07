import React from "react";

export default function EventModal({
  title,
  date,
  validationError,
  onTitleChange,
  onDateChange,
  onClose,
  onSave
}) {
  return (
    <div
      data-testid="event-modal"
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          data-testid="close-modal-btn"
          className="close-x"
          onClick={onClose}
        >
          ×
        </button>
        <h3>Add Event</h3>

        {validationError && (
          <div
            data-testid="validation-error"
            className="validation-error"
          >
            {validationError}
          </div>
        )}

        <div className="form-row">
          <label>Event Title</label>
          <input
            data-testid="event-title-input"
            value={title}
            onChange={(e) => {
              onTitleChange(e.target.value);
            }}
            placeholder="Event title"
            type="text"
          />
        </div>

        <div className="form-row">
          <label>Event Date (YYYY-MM-DD)</label>
          <input
            data-testid="event-date-input"
            value={date}
            onChange={(e) => {
              onDateChange(e.target.value);
            }}
            placeholder="YYYY-MM-DD"
            type="date"
          />
        </div>

        <div className="modal-actions">
          <button className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            data-testid="save-event-btn"
            className="primary"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
