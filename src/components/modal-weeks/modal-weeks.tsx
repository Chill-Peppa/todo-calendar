import React, { useState, FC, useEffect } from 'react';
import './modal-weeks.css';
import { useStore } from '../../hooks/useStore';
import Todo from '../todo/todo';

const ModalWeeks: FC = () => {
  const store = useStore();

  const [startDate, setStartDate] = useState('');
  const [filteredTodoByWeek, setFilteredTodoByWeek] = useState<
    {
      id: number;
      todo: string;
      isDone: boolean;
      date: string;
      weekNumber: number;
    }[]
  >([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    filterTodoByWeek();
  };

  const filterTodoByWeek = () => {
    let weekNumber = store.getWeekNumber(startDate);

    const filteredTodoByWeekArray = store.todoList.filter(
      (todo) => todo.weekNumber === weekNumber,
    );
    setFilteredTodoByWeek(filteredTodoByWeekArray);
  };

  useEffect(() => {
    filterTodoByWeek();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.getWeekNumber, startDate]);

  return (
    <div className="modal-weeks">
      <div className="modal-week__inputs">
        <div className="modal-week__input-container">
          <label htmlFor="start">
            При выборе любого дня отобразится todo на эту неделю
          </label>
          <input
            type="date"
            id="start"
            name="trip-start"
            value={startDate}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <ul className="modal-weeks__todos">
        {filteredTodoByWeek.map((task, i) => (
          <Todo task={task} i={i} key={task.id} />
        ))}
      </ul>
    </div>
  );
};

export default ModalWeeks;
