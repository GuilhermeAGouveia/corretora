import {motion} from "framer-motion";
import styled from "styled-components";
import colors from "../../../../../styles/colors";

export const Form = styled.div`
  position: relative;

  width: 100%;
  height: auto;
  top: -100px;
  overflow-y: visible;
  overflow: hidden;

`;

export const SectionInputContent = styled.div`
  position: relative;
  width: 100%;
  overflow-x: auto;
  overflow-y: visible;
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
  overflow-x: hidden;
  
`;
export const FormContent = styled(motion.form)<any>`
  position: relative;
  width: calc(5 * 100%);
  display: flex;
  overflow: hidden;
  height: auto;
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

export const SubmitContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`