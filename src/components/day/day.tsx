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
  return (
    <li
      onClick={onOpenTodo}
      data-date={`${String(item.day).padStart(2, '0')}.${String(
        currentMonth + 1,
      ).padStart(2, '0')}.${currentYear}`}
      className={`calendar__day ${
        checkDate(
          `${String(item.day).padStart(2, '0')}.${String(
            currentMonth + 1,
          ).padStart(2, '0')}.${currentYear}`,
        ) && 'calendar__day_event'
      }
               ${item.isHoliday === 1 && 'calendar__day_holiday'} ${
        item.isHoliday === 2 && 'calendar__day_inactive'
      }`}
      key={index}>
      {item.day}
    </li>
  );
};

export default Day;
