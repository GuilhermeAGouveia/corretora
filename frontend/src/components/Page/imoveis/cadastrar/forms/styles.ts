import { motion } from "framer-motion";
import styled from "styled-components";
import colors from "../../../../../styles/colors";

export const Form = styled.form`
  position: relative;
  width: 100%;
  height: 100%;
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
  width: 100%;
  height: 100%;
  
  overflow-x: auto;
  & > * {
    margin: 10px auto;
  }
  
  padding: 10px;

  


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

export const FormHeader = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  background-color: #0d1720;
`;
export const FormContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
export const FormContent = styled(motion.div)<any>`
  position: relative;
  width: calc(4 * 100%);
  height: 100%;
  display: flex;

  & div:nth-child(2) {
    background-color: blue;
  }

`;

export const ActionsForm = styled.div`
  position: relative;
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
`;
export const ReturnButton = styled.button`
  position: relative;
  width: 31px;
  height: 31px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  border: none;
`;

export const AreaShow = styled.div`
  position: relative;
  color: ${colors.primary};
  font-size: 14px;
`;
