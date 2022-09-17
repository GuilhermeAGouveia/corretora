import {useEffect} from "react";
import {Controller, ControllerRenderProps, FieldValues} from "react-hook-form";
import InputComponent, {InputProps} from "./Input";
import MultiInput from "./MultiInput";

type MultiInputReactHookFormProps = InputProps & {
    control: any;
    name: string;
}

const InputReactHookForm = ({
                                control,
                                ...inputProps
                            }: MultiInputReactHookFormProps) => {


    return (
        <Controller
            render={({
                         field: {onChange, ...rest},
                     }: {
                field: ControllerRenderProps<FieldValues>;
            }) => (
                <MultiInput
                    {...inputProps}
                    onChange={onChange}
                />
            )}
            defaultValue={inputProps.defaultValue}
            name={inputProps.name}
            control={control}
        />
    );
};

export default InputReactHookForm;