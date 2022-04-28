import {
    Control,
    Controller,
    ControllerRenderProps,
    FieldValues
} from "react-hook-form";
import Select from "react-select";
import styled from "styled-components";

interface SelectReactHookFormProps {
  options: {
    label: string;
    value: string;
  }[];
  name: string;
  value: string;
  controlReactHookForm: Control<FieldValues, any>;
}

const SelectReactHookForm = ({
  controlReactHookForm,
  value,
  options,
  name,
}: SelectReactHookFormProps) => (
  <FilterInput>
    <Controller
      control={controlReactHookForm}
      defaultValue={value}
      name={name}
      render={({
        field: { onChange, ...rest },
      }: {
        field: ControllerRenderProps<FieldValues>;
      }) => (
        <Select
          ref={rest.ref}
          defaultValue={options.find((option) => option.value === value)}
          options={options}
          onChange={(val) => onChange(val?.value)}
        />
      )}
    />
  </FilterInput>
);

export default SelectReactHookForm;

const FilterInput = styled.div`
  position: relative;
  width: 100%;
`;
