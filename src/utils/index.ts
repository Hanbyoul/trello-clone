import { DropResult } from "react-beautiful-dnd";
import { SetterOrUpdater } from "recoil";
import { IToDoState } from "../atoms";

// export const onDragEnd = (
//   info: DropResult,
//   setToDos: SetterOrUpdater<IToDoState>
// ) => {
//   const { destination, source, draggableId } = info;
//   console.table(info);

//   if (!destination) return;

//   if (destination.droppableId === "board") {
//     setToDos((allBoard) => {
//       const boardMap = new Map(Object.entries(allBoard));
//       console.log(boardMap);
//       const taskObj = Array.from(boardMap.keys())[source.index];
//       const taskObjValue = boardMap.get(taskObj);
//       console.log(taskObj);

//       boardMap.delete(taskObj);
//       const keysArray = Array.from(boardMap.keys());
//       keysArray.splice(destination.index, 0, taskObj);
//       console.log(keysArray);
//       const newBoardMap = new Map();
//       keysArray.forEach((key) => {
//         if (key === taskObj) {
//           newBoardMap.set(key, taskObjValue);
//         } else {
//           newBoardMap.set(key, boardMap.get(key));
//         }
//       });

//       const newBoard = Object.fromEntries(newBoardMap.entries());
//       console.log(newBoard);
//       return newBoard;
//     });
//     console.log(destination); // 종료
//     console.log(source); // 시작
//   } else if (destination.droppableId === "Delete") {
//     setToDos((allBoard) => {
//       const boardCopy = [...allBoard[source.droppableId]];
//       boardCopy.splice(source.index, 1);
//       return {
//         ...allBoard,
//         [source.droppableId]: boardCopy,
//       };
//     });
//   } else if (destination?.droppableId === source.droppableId) {
//     setToDos((allBoard) => {
//       const boardCopy = [...allBoard[source.droppableId]];
//       const taskObj = boardCopy[source.index];
//       console.table(taskObj);
//       boardCopy.splice(source.index, 1);
//       boardCopy.splice(destination?.index, 0, taskObj);
//       return {
//         ...allBoard,
//         [source.droppableId]: boardCopy,
//       };
//     });
//   } else if (destination.droppableId !== source.droppableId) {
//     setToDos((allBoard) => {
//       const sourceBoard = [...allBoard[source.droppableId]];
//       const taskObj = sourceBoard[source.index];
//       const targetBoard = [...allBoard[destination.droppableId]];
//       sourceBoard.splice(source.index, 1);
//       targetBoard.splice(destination?.index, 0, taskObj);
//       return {
//         ...allBoard,
//         [source.droppableId]: sourceBoard,
//         [destination.droppableId]: targetBoard,
//       };
//     });
//   }
// };
