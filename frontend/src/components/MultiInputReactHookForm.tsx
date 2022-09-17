import {useEffect} from "react";
import {Controller, ControllerRenderProps, FieldValues} from "react-hook-form";
import InputComponent from "./Input";
import MultiInput from "./MultiInput";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    control: any;
    name: string;
}

const InputReactHookForm = ({
                                control,
                                ...inputProps
                            }: InputProps) => {


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