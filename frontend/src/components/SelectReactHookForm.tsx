import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues
} from "react-hook-form";
import Select from "react-select";
import styled, { CSSProperties } from "styled-components";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectReactHookFormProps {
  options: SelectOption[];
  name: string;
  value?: string;
  controlReactHookForm: Control<FieldValues, any>;
  style?: CSSProperties;
  placeholder?: string;
}

const SelectReactHookForm = ({
  controlReactHookForm,
  value,
  options,
  name,
  placeholder,
  style
}: SelectReactHookFormProps) => (
  <SelectReactHookFormContainer style={style}>
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
          placeholder={placeholder}
          onChange={(val) => onChange(val?.value)}
        />
      )}
    />
  </SelectReactHookFormContainer>
);

export default SelectReactHookForm;

const SelectReactHookFormContainer = styled.div`
  position: relative;
  width: 100%;
`;
