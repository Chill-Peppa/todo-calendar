import React, { useState } from 'react';
import './modal-weeks.css';

const ModalWeeks = () => {
  const [startDate, setStartDate] = useState('2024-07-24');
  const [finishDate, setFinishDate] = useState('2024-07-24');

  //   function getDateWeek(date) {
  //     const currentDate =
  //         (typeof date === 'object') ? date : new Date();
  //     const januaryFirst =
  //         new Date(currentDate.getFullYear(), 0, 1);
  //     const daysToNextMonday =
  //         (januaryFirst.getDay() === 1) ? 0 :
  //         (7 - januaryFirst.getDay()) % 7;
  //     const nextMonday =
  //         new Date(currentDate.getFullYear(), 0,
  //         januaryFirst.getDate() + daysToNextMonday);

  //     return (currentDate < nextMonday) ? 52 :
  //     (currentDate > nextMonday ? Math.ceil(
  //     (currentDate - nextMonday) / (24 * 3600 * 1000) / 7) : 1);
  // }

  const currentDate = new Date();
  console.log(currentDate);
  //const weekNumber = getDateWeek(currentDate);

  //console.log("Week number of " + currentDate + " is : " + weekNumber);

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
