import React, { useState } from 'react';
import './modal-weeks.css';

const ModalWeeks = () => {
  const [startDate, setStartDate] = useState('2024-07-24');
  const [finishDate, setFinishDate] = useState('2024-07-24');

  return (
    <div className="modal-weeks">
      <div className="modal-week__inputs">
        <div className="modal-week__input-container">
          <label htmlFor="start">Начало:</label>
          <input
            type="date"
            id="start"
            name="trip-start"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="modal-week__input-container">
          <label htmlFor="finish">Конец:</label>
          <input
            type="date"
            id="finish"
            name="trip-finish"
            value={finishDate}
            onChange={(e) => setFinishDate(e.target.value)}
          />
        </div>
      </div>
      <ul className="modal-weeks__todos">
        <li>123124234</li>
      </ul>
    </div>
  );
};

export default ModalWeeks;
