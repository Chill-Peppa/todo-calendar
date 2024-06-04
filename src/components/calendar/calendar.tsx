import React, { useState, useEffect } from 'react';
import './calendar.css';
import left from '../../assets/icons/left-arrow.svg';
import right from '../../assets/icons/right-arrow.svg';

import { weekDays } from '../../utils/constants';
import { months } from '../../utils/constants';
import Day from '../day/day';
import { holidayApi } from '../../utils/api';

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
  const [responseString, setResponseString] = useState<string>('');

  useEffect(() => {
    holidayApi.getHolidays(currentYear, currentMonth).then((res) => {
      setResponseString(res);
    });
    getAllDaysInMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentYear, currentMonth, responseString]);

  const returnDate = () => {
    return `${months[currentMonth]} ${currentYear}`;
  };

  const getAllDaysInMonth = () => {
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
      allDaysInMonthArray = [
        ...allDaysInMonthArray,
        { day: i, isHoliday: Number(responseString[i - 1]) },
      ];
    }
    setDaysInMonth(allDaysInMonthArray);
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

  const checkDate = (date: string) => {
    const savedTodoListString = localStorage.getItem('todoList');
    const savedTodoList = savedTodoListString
      ? JSON.parse(savedTodoListString)
      : [];

    return savedTodoList.some(
      (task: { id: number; todo: string; isDone: boolean; date: string }) =>
        task.date === date,
    );
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
          {daysInMonth.map((item, index) => (
            <Day
              item={item}
              key={index}
              index={index}
              onOpenTodo={onOpenTodo}
              currentMonth={currentMonth}
              currentYear={currentYear}
              checkDate={checkDate}
            />
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
