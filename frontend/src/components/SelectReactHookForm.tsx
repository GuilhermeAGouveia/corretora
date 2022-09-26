import {
    Control,
    Controller,
    ControllerRenderProps,
    FieldValues
} from "react-hook-form";
import Select from "react-select";
import { FilterOptionOption } from "react-select/dist/declarations/src/filters";
import styled, { CSSProperties } from "styled-components";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectReactHookFormProps {
  options: SelectOption[];
  name: string;
  value?: string | string[];
  controlReactHookForm: Control<FieldValues, any>;
  style?: CSSProperties;
  placeholder?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  isOptionDisabled?: any;
  filterOption?: (
    option: FilterOptionOption<SelectOption>,
    inputValue: string
  ) => boolean;
  isMulti?: boolean;
}

const SelectReactHookForm = ({
  controlReactHookForm,
  value,
  options,
  name,
  placeholder,
  style,
  required,
  onChange: onChangeProp,
  isOptionDisabled,
  isMulti,
  filterOption,
}: SelectReactHookFormProps) => (
  <SelectReactHookFormContainer style={style}>
    <Controller
      control={controlReactHookForm}
      defaultValue={value}
      name={name}
      rules={{ required }}
      render={({
        field: { onChange, ...rest },
      }: {
        field: ControllerRenderProps<FieldValues>;
      }) => (
        <Select
          styles={{
            control: (provided) => ({
              ...provided,
              borderRadius: "21px",
              minheight: "42px",
            }),
          }}
          ref={rest.ref}
          isMulti={isMulti}
          defaultValue={options.find((option) => option.value === value)}
          options={options}
          placeholder={required ? `${placeholder} *` : placeholder}
          onChange={(val) => {
            if (val instanceof Array) {
              onChange(val.map((v) => v.value));
            } else {
              onChange(val?.value);
              onChangeProp && onChangeProp(val?.value || "");
            }
          }}
          filterOption={filterOption}
          isOptionDisabled={isOptionDisabled}
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
