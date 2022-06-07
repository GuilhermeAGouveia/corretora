import { FieldValues, UseFormRegister } from "react-hook-form";
import styled from "styled-components";

interface FilterInputRangeNumberProps {
  registerReactHookForm: UseFormRegister<FieldValues>;
  minValue: string;
  maxValue: string;
  name: string;
}

const FilterInputRangeNumber = ({
  name,
  registerReactHookForm,
  minValue,
  maxValue,
}: FilterInputRangeNumberProps) => {
  return (
    <FilterInputNumber>
      <input
        type="number"
        {...registerReactHookForm(name + "Min")}
        placeholder={minValue}
        min={0}
      />
      -
      <input
        type="number"
        {...registerReactHookForm(name + "Max")}
        placeholder={maxValue}
        min={0}
      />
    </FilterInputNumber>
  );
};
export default FilterInputRangeNumber;

const FilterInputNumber = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    border: 1px solid rgba(0, 0, 0, 0.4);
    width: 40%;
    height: 40px;
    border-radius: 4px;
    font-family: "Poppins", sans-serif;
    text-align: center;
  }
`;
