import { createContext, useContext } from 'react';

interface IStore {
  todoList: {
    id: number;
    todo: string;
    isDone: boolean;
    date: string;
    weekNumber: number;
  }[];
  setTodoList: (
    value: {
      id: number;
      todo: string;
      isDone: boolean;
      date: string;
      weekNumber: number;
    }[],
  ) => void;
  checkedItems: { [key: number]: boolean };
  setCheckedItems: (value: { [key: number]: boolean }) => void;
  getWeekNumber: (dateString: string) => number;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

export const StoreContext = createContext<IStore>({} as IStore);

export const useStore = () => useContext(StoreContext);
