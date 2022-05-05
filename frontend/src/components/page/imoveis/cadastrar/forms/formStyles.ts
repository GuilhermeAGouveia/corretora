import styled from "styled-components";
import colors from "../../../../../styles/colors";

export const Form = styled.form`
  position: relative;
  width: 100%;
  height: 100%;
`;
export const SectionInputContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;
export const SectionLabel = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 500;
`;
export const SectionInputContent = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;

  & > * {
    margin: 10px;
  }

  @media (max-width: 768px) {
    & > * {
      margin: 10px 0;
    }

    justify-content: center;
  }
`;
export const ButtonSubmit = styled.button`
  position: relative;
  width: 100%;
  height: 50px;
  background-color: ${colors.secondary};
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 5px;
  transition: 0.3s;
`;
export const LineDivision = styled.div`
  position: relative;
  width: 100%;
  margin: 0 10px;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
`;
