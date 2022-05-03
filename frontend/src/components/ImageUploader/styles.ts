import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  height: 250px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: 768px) {
    display: block;
    height: auto;
  }
`;
