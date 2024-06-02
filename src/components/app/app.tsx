import { useState } from 'react';
import './app.css';

import Calendar from '../calendar/calendar';
import Modal from '../modal/modal';
import TodoList from '../todo-list/todo-list';

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenModal = (e: React.MouseEvent<HTMLLIElement>) => {
    const dataDate = e.currentTarget.getAttribute('data-date');
    setSelectedDate(dataDate || '');
    console.log(dataDate);
    setIsOpenModal(true);
  };

  return (
    <div className="app">
      <Calendar onOpen={handleOpenModal} />
      {isOpenModal && (
        <Modal onClose={handleCloseModal}>
          <TodoList selectedDate={selectedDate} />
        </Modal>
      )}
    </div>
  );
}

export default App;
