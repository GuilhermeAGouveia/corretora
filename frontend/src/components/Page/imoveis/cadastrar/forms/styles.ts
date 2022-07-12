import { motion } from "framer-motion";
import styled from "styled-components";
import colors from "../../../../../styles/colors";

export const Form = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
  top: -100px;

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
  overflow: hidden;
  overflow-x: auto;
  & > * {
    margin: 15px auto;
  }
  
  padding: 10px;

  


`;
export const ButtonSubmit = styled.button`
  position: relative;
  width: 200px;
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
  overflow: hidden;
`;
export const FormContent = styled(motion.form)<any>`
  position: relative;
  width: calc(5 * 100%);
  display: flex;

`;

export const ActionsForm = styled.div`
  position: relative;
  width: 100%;
  height: 44px;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ReturnButton = styled.button`
  position: relative;
  width: 36px;
  height: 36px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  border: none;
`;

export const AreaShow = styled.div`
  position: relative;
  color: ${colors.primary};
  font-size: 16px;
  font-weight: bold;
`;

export const SubmitContainer = styled.div `
  position: relative;
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`