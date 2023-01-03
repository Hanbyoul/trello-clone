import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
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

  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setTodos((allBoard) => {
      return { ...allBoard, [boardId]: [...allBoard[boardId], newToDo] };
    });
    setValue("toDo", "");
  };

  const boardChange = ({ boardChange }: IForm) => {
    if (boardDelete) {
      setTodos((allBoard) => {
        const CopyBoard = { ...allBoard };
        delete CopyBoard[boardId];
        return CopyBoard;
      });
    } else {
      setTodos((allBoard) => {
        const copies = { ...allBoard };
        if (
          boardChange.trim() !== "" &&
          Object.keys(copies).some((item) => item === boardChange) !== true
        ) {
          copies[boardChange] = allBoard[boardId];
          const { [boardId]: temp, ...rest } = copies;
          const newBoard = rest;
          return newBoard;
        }
        return allBoard;
      });
    }
  };

  return (
    <Wrapper>
      <Heder>
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
            <button onClick={() => setBoardRename(!boardRename)}>RE</button>
            <button onClick={() => setBoardDelete(!boardDelete)}>X</button>
          </ItemBtn>
        </Form>
      </Heder>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo")}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
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
      </Droppable>
    </Wrapper>
  );
};

export default Board;

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Heder = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.span`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
  margin-right: 2em;
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
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
  input {
    width: 50%;
    height: 30px;
    border-radius: 15px;
    outline: none;
    border: none;
    padding-left: 20px;
  }
`;
const ItemBtn = styled.div`
  position: absolute;
  right: 10px;
  top: 0px;
  padding-left: 10px;
  display: flex;
`;
