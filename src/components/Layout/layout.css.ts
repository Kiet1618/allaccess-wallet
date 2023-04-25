import styled from "styled-components";
export const StyledButton = styled.div`
    background: ${(props) => props.theme.color.primary}; // <-- access by dynamic key
    outline: none;
    box-shadow: none;
    border: none;
    padding: ${(props) => props.theme.color.secondary};
    border-radius: 5px;
    color: white;
    margin: 0 10px;
  `;