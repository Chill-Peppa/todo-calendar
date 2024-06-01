import { useState } from 'react';
import './app.css';

import Calendar from '../calendar/calendar';
import Modal from '../modal/modal';
import TodoList from '../todo-list-modal/todo-list';

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  return (
    <div className="app">
      <Calendar onOpen={handleOpenModal} />
      {isOpenModal && (
        <Modal onClose={handleCloseModal}>
          <TodoList />
        </Modal>
      )}
    </div>
  );
}

export default App;
