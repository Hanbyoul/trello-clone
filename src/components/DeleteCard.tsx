import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
const DeleteCard = () => {
  return (
    <>
      <Droppable droppableId="Delete">
        {(magic) => (
          <div ref={magic.innerRef} {...magic.droppableProps}>
            <Trash>
              <FontAwesomeIcon icon={faTrashCan} />
            </Trash>
          </div>
        )}
      </Droppable>
    </>
  );
};

export default DeleteCard;

const Trash = styled.div`
  margin-left: 2em;
  svg {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    color: red;
  }
`;
