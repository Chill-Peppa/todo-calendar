import { FC } from 'react';
import './day.css';

interface IDay {
  item: { day: number; isHoliday: number };
  index: number;
  onOpenTodo: (e: React.MouseEvent<HTMLLIElement>) => void;
  currentMonth: number;
  currentYear: number;
  checkDate: (value: string) => boolean;
}

const Day: FC<IDay> = ({
  item,
  index,
  onOpenTodo,
  currentMonth,
  currentYear,
  checkDate,
}) => {
  const dataDate = `${currentYear}-${(currentMonth + 1)
    .toString()
    .padStart(2, '0')}-${item.day.toString().padStart(2, '0')}`;

  const isCurrentDay = (year: number, month: number, day: number) => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return year === currentYear && month === currentMonth && day === currentDay;
  };

  return (
    <li
      onClick={onOpenTodo}
      data-date={dataDate}
      className={`calendar__day ${checkDate(dataDate) && 'calendar__day_event'}
               ${item.isHoliday === 1 && 'calendar__day_holiday'} ${
        item.isHoliday === 2 && 'calendar__day_inactive'
      } ${
        isCurrentDay(currentYear, currentMonth, item.day) &&
        'calendar__day_current'
      }`}
      key={index}>
      {item.day}
    </li>
  );
};

export default Day;
