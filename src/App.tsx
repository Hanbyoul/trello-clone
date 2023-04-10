import { DragDropContext } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { onDragEnd } from "./\butils";
import { toDoState } from "./atoms";
import Board, { IForm } from "./components/Board";
import DeleteCard from "./components/DeleteCard";

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
    setToDos((allBoard) => {
      if (
        Object.keys(allBoard).some((item) => item === toDo) !== true &&
        toDo.trim() !== ""
      ) {
        return { ...allBoard, [toDo]: [] };
      }
      return allBoard;
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
          />
        </Form>
        <DeleteCard />
      </Heder>
      <Wrapper>
        <BoardList>
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />
          ))}
        </BoardList>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  max-width: 800px;
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
  grid-template-columns: repeat(3, 1fr);
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
