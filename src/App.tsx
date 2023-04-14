import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
// import { onDragEnd } from "./\butils";
import { toDoState } from "./atoms";
import Board, { IForm } from "./components/Board";
import DeleteCard from "./components/DeleteCard";

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
    if (toDos.length >= 5) {
      alert("최대 5개의 Board만 생성 가능합니다.");
      setValue("toDo", "");
      return;
    }
    // setToDos((allBoard) => {
    //   if (
    //   allBoard.some((item) => item === toDo) !== true &&
    //     toDo.trim() !== ""
    //   ) {
    //     return { ...allBoard, [toDo]: [] };
    //   }
    //   return allBoard;
    // });
    setToDos((allBoard) => {
      if (
        allBoard.some(
          (board) =>
            (Object.keys(board)[0] === toDo) !== true && toDo.trim() !== ""
        )
      ) {
        const newBoard = [...allBoard];
        newBoard.push({ [toDo]: [] });

        return newBoard;
      }

      return allBoard;
    });

    setValue("toDo", "");
  };
  console.log(toDos[1]);
  console.log(toDos.map((board, index) => Object.keys(board)[index]));
  const onDragEnd = () => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Heder>
        <Form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("toDo", { required: true })}
            type="text"
            placeholder="Add new Board"
          />
        </Form>
        <DeleteCard />
      </Heder>
      <Droppable droppableId="board" direction="horizontal" type="board">
        {(magic) => (
          <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
            <BoardList>
              {toDos.map((board, index) => (
                <Draggable
                  draggableId={Object.keys(board)[index]}
                  key={Object.keys(board)[index]}
                  index={index}
                >
                  {(magic) => (
                    <div
                      ref={magic.innerRef}
                      {...magic.dragHandleProps}
                      {...magic.draggableProps}
                    >
                      <Board
                        key={Object.keys(board)[index]}
                        toDos={board[index]}
                        boardId={Object.keys(board)[index]}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
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
