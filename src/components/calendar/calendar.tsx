import React, { useState, useEffect } from 'react';
import './calendar.css';
import left from '../../assets/images/left-arrow.svg';
import right from '../../assets/images/right-arrow.svg';

import { weekDays } from '../../utils/constants';
import { months } from '../../utils/constants';

interface ICalendarProps {
  onOpenTodo: (e: React.MouseEvent<HTMLLIElement>) => void;
  onOpenWeekTasks: () => void;
}

const Calendar: React.FC<ICalendarProps> = ({
  onOpenTodo,
  onOpenWeekTasks,
}) => {
  const date = new Date();
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const [currentYear, setCurrentYear] = useState(date.getFullYear());
  const [daysInMonth, setDaysInMonth] = useState<
    { day: number; isHoliday: number }[]
  >([]);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const days = await getAllDaysInMonth();
      setDaysInMonth(days);
      setDataLoaded(true);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentYear, currentMonth]);

  const returnDate = () => {
    return `${months[currentMonth]} ${currentYear}`;
  };

  const getAllDaysInMonth = async () => {
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const lastDateOfLastMonth = new Date(
      currentYear,
      currentMonth,
      0,
    ).getDate();

    if (firstDayOfMonth === 0) {
      firstDayOfMonth = 6; // Переназначаем воскресенье на 6 (вместо 0)
    } else {
      firstDayOfMonth--; // Коррекция нумерации остальных дней
    }

    let allDaysInMonthArray: {
      day: number;
      isHoliday: number;
    }[] = [];

    for (let i = firstDayOfMonth; i > 0; i--) {
      allDaysInMonthArray = [
        ...allDaysInMonthArray,
        { day: lastDateOfLastMonth - i + 1, isHoliday: 2 },
      ];
    }

    for (let i = 1; i <= lastDayOfMonth; i++) {
      try {
        const response = await fetch(
          `https://isdayoff.ru/api/getdata?year=${currentYear}&month=${
            currentMonth + 1
          }&day=${i}`,
        );
        if (response.ok) {
          const isHoliday = await response.json();
          allDaysInMonthArray = [
            ...allDaysInMonthArray,
            { day: i, isHoliday: isHoliday },
          ];
        } else {
          throw new Error('Fetch error');
        }
      } catch (error) {
        console.error('Error fetch:', error);
      }
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
    setDataLoaded(false);
  };

  const onPrevButtonClick = () => {
    let newMonth = (currentMonth - 1 + 12) % 12;
    let newYear = currentYear;
    if (currentMonth === 0) {
      newYear--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setDataLoaded(false);
  };

  return (
    <section className="calendar">
      <div className="calendar__header">
        {dataLoaded ? (
          <h1 className="calendar__title">{returnDate()}</h1>
        ) : (
          <span>загрузка</span>
        )}
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
          {daysInMonth.map((item, index) => (
            <li
              onClick={onOpenTodo}
              data-date={`${item.day}.${currentMonth}.${currentYear}`}
              className={`calendar__day calendar__day_event
               ${item.isHoliday === 1 && 'calendar__day_holiday'} ${
                item.isHoliday === 2 && 'calendar__day_inactive'
              }`}
              key={index}>
              {item.day}
            </li>
          ))}
        </ul>
      </div>

      <p className="calendar__week-deals">
        Желаете посмотреть планы на неделю?{' '}
        <span onClick={onOpenWeekTasks} className="calendar__see-more">
          Посмореть
        </span>
      </p>
    </section>
  );
};

export default Calendar;
