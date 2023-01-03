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
      </Heder>
      <Wrapper>
        <DeleteCard />
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  gap: 10px;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
`;
const Heder = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5em;
`;
const Form = styled.form`
  input {
    width: 400px;
    height: 40px;
    outline: none;
    border: none;
    border-radius: 20px;
    padding: 0px 40px;
    font-size: 1.5em;
  }
`;
