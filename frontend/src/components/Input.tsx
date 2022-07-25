import { motion } from "framer-motion";
import { useState } from "react";
import {
  Controller,
  ControllerRenderProps,
  FieldValues
} from "react-hook-form";
import styled from "styled-components";
import colors from "../styles/colors";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
}

const InputComponent = ({
  placeholder,
  name,
  control,
  defaultValue,
  type,
  ...inputProps
}: InputProps) => {
  const [isChanging, setIsChanging] = useState(false);
  const handleIsChanging = (event: FocusEvent, stateValue: boolean) => {
    if (
      event.target instanceof HTMLInputElement &&
      event.target.value.length > 0
    ) {
      setIsChanging(true);
      return;
    }

    setIsChanging(stateValue);
  };

  return (
    <InputContainer
      animate={{
        borderColor: isChanging ? `${colors.secondary}` : `rgba(0, 0, 0, 0.2)`,
      }}
    >
      <InputPlaceholder
        animate={
          isChanging
            ? {
                y: -21,
                scale: 0.9,
                color: `${colors.secondary}`,
              }
            : {
                y: 0,
                scale: 1,
                color: `rgba(0, 0, 0, 0.7)`,
              }
        }
      >
        {inputProps.required ? placeholder + " *" : placeholder}
      </InputPlaceholder>
      <Controller
        render={({
          field: { onChange, ...inputProps },
        }: {
          field: ControllerRenderProps<FieldValues>;
        }) => (
          <Input
            {...inputProps}
            value={undefined}
            type={type}
            placeholder={isChanging ? defaultValue?.toString() : ""} // mostra o placeholder se o input estiver em foco, senão não mostra nada.
            // Isso é necessário para que o placeholder do inpput e o placeholder component não entrem em conflito sem usar zIndex
            onFocus={(e: any) => handleIsChanging(e, true)}
            onBlur={(e: any) => {
              handleIsChanging(e, false);
            }}
            autoComplete="off"
            onChange={(e) => onChange(e.target.value)}
          />
        )}
        defaultValue={defaultValue}
        name={name}
        control={control}
      />
    </InputContainer>
  );
};

export default InputComponent;

const Input = styled.input`
  position: relative;
  height: 95%;
  width: 100%;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  border: none;
  background: none;
  color: rgba(0, 0, 0, 0.8);
`;

const InputContainer = styled(motion.div)`
  position: relative;
  height: 42px;
  width: 100%;
  max-width: 400px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 21px;
  padding: 0 10px;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  display: flex;
  background: none;
  justify-content: flex-start;
  align-items: center;
  font-weight: 500;
  margin: 10px auto;
`;

const InputPlaceholder = styled(motion.div)`
  position: absolute;
  background-color: white;
  padding: 0 5px;
  cursor: pointer;
`;
