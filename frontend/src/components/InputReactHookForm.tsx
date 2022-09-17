import {useEffect} from "react";
import {Controller, ControllerRenderProps, FieldValues} from "react-hook-form";
import InputComponent from "./Input";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    control: any;
    name: string;
}

const InputReactHookForm = ({
                                control,
                                ...inputProps
                            }: InputProps) => {

    useEffect(() => console.log(inputProps.placeholder), []);

    return (
        <Controller
            render={({
                         field: {onChange, ...rest},
                     }: {
                field: ControllerRenderProps<FieldValues>;
            }) => (
                <InputComponent
                    {...inputProps}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
            defaultValue={inputProps.defaultValue}
            name={inputProps.name}
            control={control}
        />
    );
};

export default InputReactHookForm;