import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { BoardKey, BoardType, IToDoState, toDoState } from "./atoms";
import Board, { IForm } from "./components/Board";
import DeleteCard from "./components/DeleteCard";
import { deepCopy, onDragEnd } from "./\butils";
import React from "react";

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setBoardType = useSetRecoilState<BoardKey>(BoardType);

  const selectBoard = () => {
    setBoardType((prev) => (prev = "board"));
  };
  const onValid = ({ toDo }: IForm) => {
    if (toDos.length >= 5) {
      alert("최대 5개의 Board만 생성 가능합니다.");
      setValue("toDo", "");
      return;
    }

    setToDos((allBoard) => {
      const CopyBoard: IToDoState[] = deepCopy(allBoard);
      if (
        CopyBoard.some((i) => Object.keys(i) + "" === toDo) === false &&
        toDo.trim() !== ""
      ) {
        CopyBoard.push({ [toDo]: [] });

        return CopyBoard;
      }

      return CopyBoard;
    });

    setValue("toDo", "");
  };

  return (
    <DragDropContext onDragEnd={(info) => onDragEnd(info, setToDos)}>
      <Heder>
        <Form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("toDo", { required: true })}
            type="text"
            placeholder="Add new Board"
            autoComplete="false"
          />
        </Form>
        <DeleteCard />
      </Heder>
      <Droppable droppableId="board" direction="horizontal" type="board">
        {(magic) => (
          <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
            <BoardList>
              {toDos.map((board, boardIndex) => (
                <Draggable
                  draggableId={Object.keys(board) + ""}
                  key={Object.keys(board) + ""}
                  index={boardIndex}
                >
                  {(magic) => (
                    <div ref={magic.innerRef} {...magic.draggableProps}>
                      <DragArea
                        {...magic.dragHandleProps}
                        onMouseDown={selectBoard}
                      ></DragArea>
                      <Board
                        key={Object.keys(board) + ""}
                        toDos={board}
                        boardId={Object.keys(board) + ""}
                        boardIndex={boardIndex}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {magic.placeholder}
            </BoardList>
          </Wrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Heder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5em;
  margin-left: 10em;
  padding-bottom: 100px;
`;
const BoardList = styled.div`
  display: grid;
  gap: 10px;
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
`;

const Form = styled.form`
  margin-left: 2em;
  input {
    width: 300px;
    height: 40px;
    text-align: center;
    outline: none;
    border: none;
    border-radius: 20px;
    padding: 0px 40px;
    font-size: 1.5em;
  }
`;

const DragArea = styled.div`
  /* background-color: red; */
  width: 80%;
  height: 50px;
  position: relative;
  bottom: -50px;
  z-index: 2;
`;
