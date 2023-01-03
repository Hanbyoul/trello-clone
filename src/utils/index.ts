import { DropResult } from "react-beautiful-dnd";
import { SetterOrUpdater } from "recoil";
import { IToDoState } from "../atoms";

export const onDragEnd = (
  info: DropResult,
  setToDos: SetterOrUpdater<IToDoState>
) => {
  const { destination, source } = info;
  console.table(info);
  if (!destination) return;
  if (destination.droppableId === "Delete") {
    setToDos((allBoard) => {
      const boardCopy = [...allBoard[source.droppableId]];
      boardCopy.splice(source.index, 1);
      return {
        ...allBoard,
        [source.droppableId]: boardCopy,
      };
    });
  } else if (destination?.droppableId === source.droppableId) {
    setToDos((allBoard) => {
      const boardCopy = [...allBoard[source.droppableId]];
      const taskObj = boardCopy[source.index];
      console.table(taskObj);
      boardCopy.splice(source.index, 1);
      boardCopy.splice(destination?.index, 0, taskObj);
      return {
        ...allBoard,
        [source.droppableId]: boardCopy,
      };
    });
  } else if (destination.droppableId !== source.droppableId) {
    setToDos((allBoard) => {
      const sourceBoard = [...allBoard[source.droppableId]];
      const taskObj = sourceBoard[source.index];
      const targetBoard = [...allBoard[destination.droppableId]];
      sourceBoard.splice(source.index, 1);
      targetBoard.splice(destination?.index, 0, taskObj);
      return {
        ...allBoard,
        [source.droppableId]: sourceBoard,
        [destination.droppableId]: targetBoard,
      };
    });
  }
};
