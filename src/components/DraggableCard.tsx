import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import { IForm } from "./Board";

interface IDraggableCardProps {
  toDoID: number;
  toDoText: string;
  index: number;
  boardId: string;
}

const DraggableCard = ({
  toDoID,
  toDoText,
  index,
  boardId,
}: IDraggableCardProps) => {
  const setTodo = useSetRecoilState(toDoState);
  const { register, handleSubmit } = useForm<IForm>();
  const [deleted, setDeleted] = useState(false);
  const [rename, setRename] = useState(false);

  const Valid = ({ toDo }: IForm) => {
    if (deleted) {
      setTodo((allBoard) => {
        const deleteItem = [...allBoard[boardId]];
        deleteItem.splice(index, 1);
        return { ...allBoard, [boardId]: deleteItem };
      });
    } else {
      setTodo((allBoard) => {
        const renameItem = [...allBoard[boardId]];
        const newToDo = {
          id: Date.now(),
          text: toDo,
        };
        if (newToDo.text !== "" || null) {
          renameItem.splice(index, 1, newToDo);
        }
        return { ...allBoard, [boardId]: renameItem };
      });
    }
  };

  return (
    <Draggable draggableId={toDoID + ""} index={index}>
      {(magic, info) => (
        <Card
          isDragging={info.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          <Form onSubmit={handleSubmit(Valid)}>
            {rename ? (
              <Item
                type="text"
                {...register("toDo", {
                  required: true,
                })}
              />
            ) : (
              <span>{toDoText}</span>
            )}
            <ItemBtn>
              <button onClick={() => setRename(!rename)}>Re</button>
              <button onClick={() => setDeleted(!deleted)}>X</button>
            </ItemBtn>
          </Form>
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);

const Card = styled.div<{ isDragging: boolean }>`
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.isDragging ? "#70a1ff" : props.theme.cardColor};
  margin-bottom: 5px;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 10px 15px rgba(0,0,0,0.5)" : "none"};
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
`;

const ItemBtn = styled.div`
  display: flex;
  button {
    margin-right: 3px;
    width: 30px;
    border-radius: 15px;
    border: none;
    background-color: ${(props) => props.theme.boardColor};
  }
`;

const Item = styled.input`
  border: none;
  background-color: unset;
  outline: none;
`;
