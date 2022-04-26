import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import colors from "../styles/colors";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: any;
}

const Input = ({ placeholder, name, register, ...inputProps }: InputProps) => {
  const [isChanging, setIsChanging] = useState(false);
  const handleIsChanging = (event: FocusEvent, stateValue: boolean) => {
    if (
      event.target instanceof HTMLInputElement &&
      event.target.value.length > 0
    ) {
      setIsChanging(true);
      console.log(event.target.value);
      return ;
    }

    setIsChanging(stateValue);
  };
  return (
    <LoginFormInputContainer
      animate={{
        borderColor: isChanging ? `${colors.secondary}` : `rgba(0, 0, 0, 0.2)`,
      }}
    >
      <LoginFormInputPlaceholder
        animate={{
          y: isChanging ? -21 : 0,
          scale: isChanging ? 0.9 : 1,
          color: isChanging ? `${colors.secondary}` : `rgba(0, 0, 0, 0.7)`,
        }}
      >
        {placeholder}
      </LoginFormInputPlaceholder>
      <LoginFormInput
        {...inputProps}
        {...register(name)}
        onFocus={(e: any) => handleIsChanging(e, true)}
        onBlur={(e: any) => {
          handleIsChanging(e, false);
        }}
      />
    </LoginFormInputContainer>
  );
};

export default Input;

const LoginFormInput = styled.input`
  position: relative;
  height: 95%;
  width: 100%;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  border: none;
  background: none;
  color: rgba(0, 0, 0, 0.8);
`;

const LoginFormInputContainer = styled(motion.div)`
  position: relative;
  height: 42px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 21px;
  padding: 0 10px;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  display: flex;
  background: none;
  justify-content: flex-start;
  align-items: center;
  margin: 10px;
  font-weight: 500;
`;

const LoginFormInputPlaceholder = styled(motion.div)`
  position: absolute;
  background-color: white;
  padding: 0 5px;
  z-index: 1;
`;
