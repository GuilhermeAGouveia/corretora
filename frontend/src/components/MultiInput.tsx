import InputComponent, {InputProps} from "./Input";
import styled from "styled-components";
import {useState} from "react";

type MultiInputProps = InputProps & {
    onChange?: (event: any) => void;
}

const MultiInputComponent = ({
                                 ...inputProps
                             }: MultiInputProps) => {


    const [values, setValues] = useState<string[]>([]);
    const [nInputs, setNInputs] = useState(1);

    const handleAddInput = (num: number) => {
        if (num < 1) return;
        setNInputs(num);
    }

    const handleOnChange = (inputIndex: number, value: string) => {
        setValues((prevValues) => {
            let newValues = [...prevValues];
            newValues[inputIndex] = value;
            return newValues;
        });

        inputProps.onChange && inputProps.onChange(values);
    }

    return (
        <MultiInput>
            <AddInputButton type={"button"} desactive={nInputs == 1} onClick={() => handleAddInput(nInputs - 1)}>-</AddInputButton>
            <InputsContainer>
                {Array.from(Array(nInputs).keys()).map((i) => (
                    <InputComponent
                        {...inputProps}
                        key={"InputFromMultiInput" + i}
                        placeholder={inputProps.placeholder + " " + (i + 1)}
                        onChange={(e) => handleOnChange(i, e.target.value)}
                    />
                ))}
            </InputsContainer>
            <AddInputButton type={"button"} onClick={() => handleAddInput(nInputs + 1)}>+</AddInputButton>

        </MultiInput>);
};

const MultiInput = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
`;

const InputsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const AddInputButton = styled.button<{
    desactive?: boolean;
}>`
  position: relative;
  background-color: #fff;
  border: 1px solid ${props => props.desactive ? "#ddd" : "#ccc"};
  border-radius: 4px;
  color: ${props => props.desactive ? "#ccc" : "#333"};
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  height: 42px;
  width: 42px;
  margin: 10px;
`;

export default MultiInputComponent;