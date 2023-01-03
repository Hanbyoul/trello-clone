import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
const DeleteCard = () => {
  return (
    <Wrapper>
      <Droppable droppableId="Delete">
        {(magic) => (
          <div ref={magic.innerRef} {...magic.droppableProps}>
            <Trash>
              <FontAwesomeIcon icon={faTrashCan} />
            </Trash>
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default DeleteCard;

const Wrapper = styled.div`
  position: absolute;
  top: 1em;
  right: 2em;
`;

const Trash = styled.div`
  width: 100px;
  height: 100px;
  svg {
    width: 100px;
    height: 100px;

    border-radius: 25px;
    color: red;
  }
`;
