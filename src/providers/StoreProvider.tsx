import React, { FC, useState } from 'react';
import { StoreContext } from '../hooks/useStore';

interface IStoreProvider {
  children: React.ReactNode;
}
export const StoreProvider: FC<IStoreProvider> = ({ children }) => {
  const [todoList, setTodoList] = useState<
    {
      id: number;
      todo: string;
      isDone: boolean;
      date: string;
      weekNumber: number;
    }[]
  >([]);

  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {},
  );

  const getWeekNumber = (dateString: string): number => {
    const date = new Date(dateString);
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (Number(date) - Number(firstDayOfYear)) / 86400000; //86400000 миллисекунд равны одному дню
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const deleteTodo = (id: number) => {
    const updatedTodo = todoList.filter((item) => item.id !== id);
    setTodoList(updatedTodo);
    localStorage.setItem('todoList', JSON.stringify(updatedTodo));
  };

  const toggleTodo = (id: number) => {
    const updatedTodo = todoList.map((item) =>
      item.id === id ? { ...item, isDone: !item.isDone } : item,
    );
    setTodoList(updatedTodo);
    localStorage.setItem('todoList', JSON.stringify(updatedTodo));

    const updatedCheckedItems = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(updatedCheckedItems);
    localStorage.setItem('checkedItems', JSON.stringify(updatedCheckedItems));
  };

  return (
    <StoreContext.Provider
      value={{
        todoList,
        setTodoList,
        getWeekNumber,
        deleteTodo,
        toggleTodo,
        checkedItems,
        setCheckedItems,
      }}>
      {children}
    </StoreContext.Provider>
  );
};
