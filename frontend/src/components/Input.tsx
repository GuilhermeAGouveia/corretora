import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import styled, {css} from "styled-components";
import colors from "../styles/colors";
import InputMask, {Props as InputMaskProps} from "react-input-mask";

export type InputProps = InputMaskProps | React.InputHTMLAttributes<HTMLInputElement> & {
    mask?: string | Array<(string | RegExp)>
};

const InputComponent = ({
                            placeholder,
                            name,
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

    useEffect(() => console.log(inputProps.mask), [])

    // @ts-ignore
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
            {inputProps.mask ? (
                    <InputWithMask
                        mask={inputProps.mask}
                        // O erro abaixo é um bug do typescript, o componente InputMask foi definido com as props incorretas, de modo que a propriedade maskChar não existe
                        //@ts-ignore:next-line
                        maskChar={null}
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
                    />
                )
                :
                (
                    <InputWithoutMask
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
                    />)
            }

        </InputContainer>
    );
};

export default InputComponent;

const inputCSS = css`
  position: relative;
  height: 95%;
  width: 100%;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  border: none;
  background: none;
  color: rgba(0, 0, 0, 0.8);
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
