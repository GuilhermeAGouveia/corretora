import styled from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.ul`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 20px;
  overflow: auto;

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #444;
    background: ${colors.white};
    width: 250px;
    height: 250px;
    margin: 0 10px;
  }
`;

export const Preview = styled.div<any>`
  position: relative;
  width: 250px;
  height: 250px;
  border-radius: 5px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  background: transparent;
  border: 0;
  color: #de3b3b;
  font-size: 0.9em;
  font-weight: bold;
  transition: color 0.2s;
  &:hover {
    color: #fe3b3b;
  }
`;
