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

  return (
    <li
      onClick={onOpenTodo}
      data-date={dataDate}
      className={`calendar__day ${checkDate(dataDate) && 'calendar__day_event'}
               ${item.isHoliday === 1 && 'calendar__day_holiday'} ${
        item.isHoliday === 2 && 'calendar__day_inactive'
      }`}
      key={index}>
      {item.day}
    </li>
  );
};

export default Day;
