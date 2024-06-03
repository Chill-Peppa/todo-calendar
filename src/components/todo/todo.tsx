import { FC } from 'react';
import deleteIcon from '../../assets/icons/delete.svg';
import { useStore } from '../../hooks/useStore';

interface ITodo {
  task: { id: number; todo: string; isDone: boolean; date: string };
  i: number;
}

const Todo: FC<ITodo> = ({ task, i }) => {
  const store = useStore();

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
          checked={store.checkedItems[task.id]}
          onChange={() => store.toggleTodo(task.id)}
          id={`checkboxid-${task.id}`}
        />

        <label
          className="modal__label"
          htmlFor={`checkboxid-${task.id}`}></label>

        <img
          alt="delete"
          src={deleteIcon}
          className="modal__delete-deal"
          onClick={() => store.deleteTodo(task.id)}
        />
      </div>
    </li>
  );
};

export default Todo;
