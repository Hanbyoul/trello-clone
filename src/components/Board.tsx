import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";

interface IBoardPops {
  toDos: IToDo[];
  boardId: string;
}

interface IAreaProps {
  draggingFromThisWith: boolean;
  isDraggingOver: boolean;
}

export interface IForm {
  toDo: string;
  boardChange: string;
}

const Board = ({ toDos, boardId }: IBoardPops) => {
  const setTodos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const [boardDelete, setBoardDelete] = useState(false);
  const [boardRename, setBoardRename] = useState(false);

  // const onValid = ({ toDo }: IForm) => {
  //   const newToDo = {
  //     id: Date.now(),
  //     text: toDo,
  //   };
  //   setTodos((allBoard) => {
  //     return { ...allBoard, [boardId]: [...allBoard[boardId], newToDo] };
  //   });
  //   setValue("toDo", "");
  // };

  // const boardChange = ({ boardChange }: IForm) => {
  //   if (boardDelete) {
  //     setTodos((allBoard) => {
  //       const CopyBoard = { ...allBoard };
  //       delete CopyBoard[boardId];
  //       return CopyBoard;
  //     });
  //   } else {
  //     setTodos((allBoard) => {
  //       const copies = { ...allBoard };
  //       if (
  //         boardChange.trim() !== "" &&
  //         Object.keys(copies).some((item) => item === boardChange) !== true
  //       ) {
  //         copies[boardChange] = allBoard[boardId];
  //         const { [boardId]: temp, ...rest } = copies;
  //         const newBoard = rest;
  //         return newBoard;
  //       }
  //       return allBoard;
  //     });
  //   }
  // };

  return (
    <>
      <Wrapper>
        {/* <Heder>
          <Form onSubmit={handleSubmit(boardChange)}>
            {boardRename ? (
              <input
                {...register("boardChange", {
                  required: true,
                })}
                type="text"
                placeholder="Renaming"
              />
            ) : (
              <Title>{boardId}</Title>
            )}
            <ItemBtn>
              <EditBtn onClick={() => setBoardRename(!boardRename)} />
              <ExitBtn onClick={() => setBoardDelete(!boardDelete)} />
            </ItemBtn>
          </Form>
        </Heder>
        <Form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("toDo")}
            type="text"
            placeholder={`Add task on ${boardId}`}
          />
        </Form> */}
        {/* <Droppable droppableId={boardId} type="card">
          {(magic, info) => (
            <Area
              isDraggingOver={info.isDraggingOver}
              draggingFromThisWith={Boolean(info.draggingFromThisWith)}
              ref={magic.innerRef}
              {...magic.droppableProps}
            >
              {toDos.map((toDo, index) => (
                <DraggableCard
                  key={toDo.id}
                  toDoID={toDo.id}
                  index={index}
                  toDoText={toDo.text}
                  boardId={boardId}
                />
              ))}
              {magic.placeholder}
            </Area>
          )}
        </Droppable> */}
      </Wrapper>
    </>
  );
};

export default Board;

const Wrapper = styled.div`
  margin-top: 2em;
  width: 100%;
  padding-top: 20px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Heder = styled.div``;

const Title = styled.span`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
  margin: 0 auto;
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#f5f6fa"
      : props.draggingFromThisWith
      ? "#f1f2f6"
      : props.theme.boardColor};
  transition: background-color 0.3s ease-in-out;
  flex-grow: 1;
  padding: 15px;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  position: relative;

  input {
    margin: 5px;
    width: 100%;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    outline: none;
    border: none;
  }
`;
const ItemBtn = styled.div`
  display: flex;
  align-items: center;
`;
const ExitBtn = styled.button`
  all: unset;
  border-radius: 20px;
  font-weight: 400;
  font-size: 14px;
  width: 15px;
  height: 15px;
  text-align: center;
  background-color: tomato;
  margin-right: 3px;
  &::after {
    content: "x";
    text-align: center;
    display: none;
  }
  &:hover::after {
    display: inline-block;
  }
`;

const EditBtn = styled.button`
  all: unset;
  border-radius: 20px;
  font-weight: 400;
  font-size: 15px;
  width: 15px;
  height: 15px;
  text-align: center;
  background-color: limegreen;
  margin-right: 3px;
  &::after {
    content: "=";
    text-align: center;
    display: none;
  }
  &:hover::after {
    display: inline-block;
  }
`;
