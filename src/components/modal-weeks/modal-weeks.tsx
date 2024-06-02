import React from 'react';
import './modal-weeks.css';

const ModalWeeks = () => {
  return (
    <div className="modal-weeks">
      <div className="modal-week__inputs">
        <div className="modal-week__input-container">
          <label htmlFor="start">Начало:</label>
          <input type="date" id="start" name="trip-start" value="2018-07-22" />
        </div>
        <div className="modal-week__input-container">
          <label htmlFor="finish">Конец:</label>
          <input
            type="date"
            id="finish"
            name="trip-finish"
            value="2018-07-22"
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
