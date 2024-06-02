import React, { useState } from 'react';
import './app.css';

import Calendar from '../calendar/calendar';
import Modal from '../modal/modal';
import TodoList from '../todo-list/todo-list';
import ModalWeeks from '../modal-weeks/modal-weeks';

function App() {
  const [isOpenModalTodo, setIsOpenModalTodo] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isOpenModalWeeks, setIsOpenModalWeeks] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsOpenModalTodo(false);
    setIsOpenModalWeeks(false);
  };

  const handleOpenModalTodo = (e: React.MouseEvent<HTMLLIElement>) => {
    const dataDate = e.currentTarget.getAttribute('data-date');
    setSelectedDate(dataDate || '');
    setIsOpenModalTodo(true);
  };

  const handleOpenModalWeeks = () => {
    setIsOpenModalWeeks(true);
  };

  return (
    <div className="app">
      <Calendar
        onOpenWeekTasks={handleOpenModalWeeks}
        onOpenTodo={handleOpenModalTodo}
      />

      {isOpenModalTodo && (
        <Modal
          title={`Запланированные события на ${selectedDate}`}
          onClose={handleCloseModal}>
          <TodoList selectedDate={selectedDate} />
        </Modal>
      )}
      {isOpenModalWeeks && (
        <Modal title="Выберите неделю" onClose={handleCloseModal}>
          <ModalWeeks />
        </Modal>
      )}
    </div>
  );
}

export default App;
