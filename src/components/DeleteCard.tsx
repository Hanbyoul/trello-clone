import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { IAreaProps } from "./Board";
import { useRecoilValue } from "recoil";
import { BoardKey, BoardType } from "../atoms";
const DeleteCard = () => {
  const boardType = useRecoilValue<BoardKey>(BoardType);

  return (
    <>
      <Droppable droppableId="Delete" type={boardType}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            draggingFromThisWith={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            <Trash>
              <FontAwesomeIcon icon={faTrashCan} />
            </Trash>
          </Area>
        )}
      </Droppable>
    </>
  );
};

export default DeleteCard;

const Trash = styled.div``;

const Area = styled.div<IAreaProps>`
  margin-left: 10em;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 80px;
    height: 80px;
    border-radius: 25px;

    color: ${(props) =>
      props.isDraggingOver
        ? "#e71111; transform: scale(1.5);" // 도착지점 이펙트
        : "#000000"};

    transition: 0.3s ease-in-out;
  }
`;
