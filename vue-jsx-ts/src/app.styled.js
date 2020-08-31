import styled from "vue-styled-components";

const StyledTitle = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: blue;
`;

const StyledCheckbox = styled.label`
  display: flex;
  flex: 1;
  align-items: center;
  cursor: pointer;

  p {
    flex: 1;
    margin: 0;
  }

  input[type="checkbox"] {
    position: absolute;
    z-index: -1;
    visibility: hidden;
  }

  .control__checkbox-handle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: 2px solid black;
    color: white;

    svg {
      display: none;
    }
  }

  :checked ~ .control__checkbox-handle {
    background-color: black;

    svg {
      display: block;
    }
  }
`;

export { StyledTitle, StyledCheckbox };
