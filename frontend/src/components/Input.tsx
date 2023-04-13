import { motion } from "framer-motion";
import { useRef, useState } from "react";
import InputMask, { Props as InputMaskProps } from "react-input-mask";
import styled, { css } from "styled-components";
import colors from "../styles/colors";

export type InputProps = (InputMaskProps | React.InputHTMLAttributes<HTMLInputElement>) & {
    mask?: string | Array<(string | RegExp)>;
    metricType?: string;
};

const InputComponent = ({
                            placeholder,
                            name,
                            defaultValue,
                            type,
                            metricType,
                            ...inputProps
                        }: InputProps) => {

    const [isChanging, setIsChanging] = useState(false);
    const [typeInput, setTypeInput] = useState(type);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const setInputRef = (element: HTMLInputElement | null) => {
        if (!inputRef.current) {
            inputRef.current = element;
        }
    }

    const handleShowPassword = () =>
        setTypeInput(typeInput === "password" ? "text" : "password");

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
            onClick={(e: any) => {
                handleIsChanging(e, true)
                inputRef?.current?.focus();
            }}

        >
            <InputPlaceholder
                style={{
                    width: isChanging ? "auto" : "100%",
                    height: isChanging ? "auto" : "100%",
                }}
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
            {inputProps.mask ? (
                    <InputWithMask
                        mask={inputProps.mask}
                        // O erro abaixo é um bug do typescript, o componente InputMask foi definido com as props incorretas, de modo que a propriedade maskChar não existe
                        //@ts-ignore:next-line
                        maskChar={null}
                        {...inputProps}
                        inputRef={el => setInputRef(el)}

                        value={undefined}
                        type={typeInput}
                        placeholder={isChanging ? defaultValue?.toString() : ""} // mostra o placeholder se o input estiver em foco, senão não mostra nada.
                        // Isso é necessário para que o placeholder do inpput e o placeholder component não entrem em conflito sem usar zIndex
                        onFocus={(e: any) => handleIsChanging(e, true)}
                        onBlur={(e: any) => {
                            handleIsChanging(e, false);
                        }}
                        autoComplete="off"
                    />
                )
                :
                (
                    <InputWithoutMask
                        {...inputProps}
                        ref={setInputRef}
                        value={undefined}
                        type={typeInput}
                        inputMode={type === "number" ? "numeric" : "text"}
                        placeholder={isChanging ? defaultValue?.toString() : ""} // mostra o placeholder se o input estiver em foco, senão não mostra nada.
                        // Isso é necessário para que o placeholder do inpput e o placeholder component não entrem em conflito sem usar zIndex
                        onBlur={(e: any) => {
                            handleIsChanging(e, false);
                        }}
                        onFocus={(e: any) => handleIsChanging(e, true)}
                        autoComplete="off"
                        
                    />)
            }
            {type === "password" && (
                <ShowPasswordButton onClick={handleShowPassword} type={"button"}>
                    {typeInput === "password" ? "Mostrar" : "Esconder"}
                </ShowPasswordButton>
            )}

            {metricType && (
                <MetricType>
                    {metricType}
                </MetricType>
            )}

        </InputContainer>
    );
};

export default InputComponent;

const inputCSS = css`
  position: relative;
  height: 95%;
  width: 100%;
  margin: 0 10px;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  border: none;
  background: none;
  color: rgba(0, 0, 0, 0.8);
  :invalid {
    border: none;
    }
`;

const InputWithMask = styled(InputMask)`
  ${inputCSS}
`;

const InputWithoutMask = styled.input`
  ${inputCSS}
`;

const InputContainer = styled(motion.div)`
  position: relative;
  height: 42px;
  width: 100%;
  max-width: 400px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 21px;
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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  cursor: pointer;
  padding: 0 10px;
  border-radius: 21px;
  z-index: 1;
`;

const ShowPasswordButton = styled.button`
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  font-weight: 500;
`;

const MetricType = styled.div`
    position: absolute;
    right: 10px;
    background: none;
    border: none;
    font-family: "Montserrat", sans-serif;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
    font-weight: 500;
`;