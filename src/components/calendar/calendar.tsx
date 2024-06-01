import React, { useState } from 'react';
import './calendar.css';
import left from '../../assets/images/left-arrow.svg';
import right from '../../assets/images/right-arrow.svg';

import { weekDays } from '../../utils/constants';
import { months } from '../../utils/constants';

interface ICalendarProps {
  onOpen: () => void;
}

const Calendar: React.FC<ICalendarProps> = ({ onOpen }) => {
  const date = new Date();
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const [currentYear, setCurrentYear] = useState(date.getFullYear());

  const returnDate = () => {
    return `${months[currentMonth]} ${currentYear}`;
  };

  const getAllDaysInMonth = () => {
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let allDaysInMonthArray = [];
    for (let i = 1; i <= lastDayOfMonth; i++) {
      allDaysInMonthArray.push(i);
    }

    return allDaysInMonthArray;
  };

  const onNextButtonClick = () => {
    let newMonth = (currentMonth + 1) % 12;
    let newYear = currentYear;
    if (newMonth === 0) {
      newYear++;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const onPrevButtonClick = () => {
    let newMonth = (currentMonth - 1 + 12) % 12;
    let newYear = currentYear;
    if (currentMonth === 0) {
      newYear--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  return (
    <section className="calendar">
      <div className="calendar__header">
        <h1 className="calendar__title">{returnDate()}</h1>
        <div className="calendar__button-container">
          <button onClick={onPrevButtonClick} className="calendar__button">
            <img
              src={left as unknown as string}
              alt="left arrow"
              className="calendar__prev"
            />
          </button>
          <button onClick={onNextButtonClick} className="calendar__button">
            <img
              src={right as unknown as string}
              alt="right arrow"
              className="calendar__next"
            />
          </button>
        </div>
      </div>

      <div className="calendar__main">
        <ul className="calendar__weekdays">
          {weekDays.map((weekDay, index) => (
            <li className="calendar__weekday" key={index}>
              {weekDay}
            </li>
          ))}
        </ul>

        <ul className="calendar__days">
          {getAllDaysInMonth().map((day, index) => (
            <li
              onClick={onOpen}
              className="calendar__day calendar__day_event"
              key={index}>
              {day}
            </li>
          ))}
        </ul>
      </div>

      <p className="calendar__week-deals">
        Желаете посмотреть планы на неделю?{' '}
        <span className="calendar__see-more">Посмореть</span>
      </p>
    </section>
  );
};

export default Calendar;
