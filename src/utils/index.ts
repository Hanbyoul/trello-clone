import { DropResult } from "react-beautiful-dnd";
import { SetterOrUpdater } from "recoil";
import { BoardKey, BoardType, IToDoState } from "../atoms";

export const deepCopy = (obj: any) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const copy: any = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    const value = obj[key];
    copy[key] = deepCopy(value);
  }

  return copy;
};
export const onDragEnd = (
  info: DropResult,
  setToDos: SetterOrUpdater<IToDoState[]>
) => {
  const { destination, source, type } = info;

  if (!destination) return;
  //   console.table(info);

  if (type === "board") {
    if (destination.droppableId === "board") {
      setToDos((allBoard) => {
        const CopyBoard: IToDoState[] = deepCopy(allBoard);
        const TargetBoard = CopyBoard[source.index];
        CopyBoard.splice(source.index, 1);
        CopyBoard.splice(destination.index, 0, TargetBoard);
        return CopyBoard;
      });
    } else if (destination.droppableId === "Delete") {
      setToDos((allBoard) => {
        const CopyBoard = deepCopy(allBoard);
        CopyBoard.splice(source.index, 1);
        return CopyBoard;
      });
    }
  }

  if (type === "card") {
    if (destination.droppableId === "Delete") {
      setToDos((allBoard) => {
        const CopyBoard: IToDoState[] = deepCopy(allBoard);
        const BoardIndex = CopyBoard.findIndex(
          (i) => Object.keys(i) + "" === source.droppableId
        );
        const board = CopyBoard[BoardIndex];
        board[source.droppableId].splice(source.index, 1);

        return CopyBoard;
      });
    } else if (destination?.droppableId === source.droppableId) {
      setToDos((allBoard) => {
        const CopyBoard: IToDoState[] = deepCopy(allBoard);
        const BoardIndex = CopyBoard.findIndex(
          (i) => Object.keys(i) + "" === source.droppableId
        );
        const sourceCard =
          CopyBoard[BoardIndex][source.droppableId][source.index];
        CopyBoard[BoardIndex][source.droppableId].splice(source.index, 1);
        CopyBoard[BoardIndex][source.droppableId].splice(
          destination.index,
          0,
          sourceCard
        );
        return CopyBoard;
      });
    } else if (destination.droppableId !== source.droppableId) {
      setToDos((allBoard) => {
        const CopyBoard: IToDoState[] = deepCopy(allBoard);
        const sourceIndex = CopyBoard.findIndex(
          (i) => Object.keys(i) + "" === source.droppableId
        );
        const destinationIndex = CopyBoard.findIndex(
          (i) => Object.keys(i) + "" === destination.droppableId
        );

        const sourceBoard = CopyBoard[sourceIndex][source.droppableId];
        const toDo = { ...sourceBoard[source.index] };
        const destinationBoard =
          CopyBoard[destinationIndex][destination.droppableId];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, toDo);

        return CopyBoard;
      });
    }
  }
};
