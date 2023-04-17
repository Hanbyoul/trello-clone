import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { BoardKey, BoardType, IToDo, IToDoState, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";
import { deepCopy } from "../\butils";

interface IBoardPops {
  toDos: {
    [key: string]: IToDo[];
  };
  boardId: string;
  boardIndex: number;
}

export interface IAreaProps {
  draggingFromThisWith: boolean;
  isDraggingOver: boolean;
}

export interface IForm {
  toDo: string;
  boardChange: string;
}

const Board = ({ toDos, boardId, boardIndex }: IBoardPops) => {
  const setTodos = useSetRecoilState(toDoState);
  const setBoardType = useSetRecoilState<BoardKey>(BoardType);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const [boardDelete, setBoardDelete] = useState(false);
  const [boardRename, setBoardRename] = useState(false);

  const selectBoard = () => {
    setBoardType((prev) => (prev = "board"));
  };
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setTodos((allBoard) => {
      const CopyBoard: IToDoState[] = deepCopy(allBoard);
      const currentBoard = [...CopyBoard[boardIndex][boardId]];
      currentBoard.push(newToDo);
      CopyBoard[boardIndex][boardId] = currentBoard;

      return CopyBoard;
    });

    setValue("toDo", "");
  };

  const boardChange = ({ boardChange }: IForm) => {
    if (boardDelete) {
      setTodos((allBoard) => {
        const CopyBoard: IToDoState[] = deepCopy(allBoard);
        delete CopyBoard[boardIndex];
        return CopyBoard;
      });
    } else {
      setTodos((allBoard) => {
        const CopyBoard: IToDoState[] = deepCopy(allBoard);
        if (
          boardChange.trim() !== "" &&
          CopyBoard.some((i) => Object.keys(i) + "" === boardChange) === false
        ) {
          CopyBoard[boardIndex][boardChange] = CopyBoard[boardIndex][boardId];
          delete CopyBoard[boardIndex][boardId];
        }

        return CopyBoard;
      });
    }
  };

  return (
    <>
      <Wrapper>
        <Heder onMouseDown={selectBoard}>
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
        </Form>
        <Droppable droppableId={boardId} type="card">
          {(magic, info) => (
            <Area
              isDraggingOver={info.isDraggingOver}
              draggingFromThisWith={Boolean(info.draggingFromThisWith)}
              ref={magic.innerRef}
              {...magic.droppableProps}
            >
              {toDos[boardId].map((toDo, index) => (
                <DraggableCard
                  key={toDo.id}
                  toDoID={toDo.id}
                  index={index}
                  toDoText={toDo.text}
                  boardIndex={boardIndex}
                  boardId={boardId}
                />
              ))}
              {magic.placeholder}
            </Area>
          )}
        </Droppable>
      </Wrapper>
    </>
  );
};

export default React.memo(Board);
const Wrapper = styled.div`
  margin-top: 2em;
  width: 100%;
  padding-top: 20px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Heder = styled.div``;
//드래깅 영역 설정

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
      ? "#f5f6fa" // 도착지점 이펙트
      : props.draggingFromThisWith
      ? "#f1f2f6" //벗어난뒤 droppable 영역 색
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
