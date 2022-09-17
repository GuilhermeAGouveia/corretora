import {Controller, ControllerRenderProps, FieldValues} from "react-hook-form";
import InputComponent, {InputProps} from "./Input";

type InputReactHookFormProps = InputProps & {
    control: any;
    name: string;
}

const InputReactHookForm = ({
                                control,
                                ...inputProps
                            }: InputReactHookFormProps) => {


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