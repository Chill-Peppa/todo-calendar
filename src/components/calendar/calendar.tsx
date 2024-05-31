import React, { useState } from 'react';
import styles from './calendar.module.css';
import left from '../../assets/images/left-arrow.svg';
import right from '../../assets/images/right-arrow.svg';

import { weekDays } from '../../utils/constants';
import { months } from '../../utils/constants';

const Calendar = () => {
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
    <section className={styles.calender}>
      <div className={styles.header}>
        <h1 className={styles.currentData}>{returnDate()}</h1>
        <div className={styles.arrowsContainer}>
          <button
            id="prev"
            onClick={onPrevButtonClick}
            className={styles.button}>
            <img
              src={left as unknown as string}
              alt="left arrow"
              className={styles.left}
            />
          </button>
          <button
            id="next"
            onClick={onNextButtonClick}
            className={styles.button}>
            <img
              src={right as unknown as string}
              alt="right arrow"
              className={styles.right}
            />
          </button>
        </div>
      </div>

      <div className={styles.main}>
        <ul className={styles.weekDays}>
          {weekDays.map((weekDay, index) => (
            <li className={styles.weekDay} key={index}>
              {weekDay}
            </li>
          ))}
        </ul>

        <ul className={styles.days}>
          {getAllDaysInMonth().map((day, index) => (
            <li className={styles.day} key={index}>
              {day}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Calendar;
