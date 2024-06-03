import { FC } from 'react';
import deleteIcon from '../../assets/images/delete.svg';

interface ITodo {
  task: { id: number; todo: string; isDone: boolean; date: string };
  i: number;
  checkedItems: { [key: number]: boolean };
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const Todo: FC<ITodo> = ({ task, i, checkedItems, toggleTodo, deleteTodo }) => {
  return (
    <li
      key={task.id}
      className={
        task.isDone ? 'modal__deal modal__deal_strikethrough' : 'modal__deal'
      }>
      {`${i + 1}. ${task.todo}`}
      <div className="modal__checkbox-container">
        <input
          className="modal__checkbox"
          type="checkbox"
          checked={checkedItems[task.id]}
          onChange={() => toggleTodo(task.id)}
          id={`checkboxid-${task.id}`}
        />

        <label
          className="modal__label"
          htmlFor={`checkboxid-${task.id}`}></label>

        <img
          alt="delete"
          src={deleteIcon}
          className="modal__delete-deal"
          onClick={() => deleteTodo(task.id)}
        />
      </div>
    </li>
  );
};

export default Todo;
