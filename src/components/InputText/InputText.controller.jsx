import { useController } from 'react-hook-form';
import { default as Input } from '.';

export const InputTextController = (props) => {
    const { control, name, onChange, onBlur, ...rest } = props;
    const { field, fieldState } = useController({
        name,
        control,
    });

    return (
        <Input
            onChange={(value) => {
                const forwardedValue = !value ? '' : value;
                onChange && onChange(forwardedValue);
                field.onChange(forwardedValue);
            }}
            onBlur={(...v) => {
                onBlur && onBlur(...v);
                field.onBlur(...v);
            }}
            value={field.value}
            name={field.name}
            inputState={fieldState.error ? 'errors' : fieldState}
            errorMessage={fieldState.error?.message}
            {...rest}
        />
    );
};
