import { useController } from 'react-hook-form';
import { default as Input } from '.';

export const InputSearchController = (props) => {
    const { control, name, onChange, onBlur, onSelect, ...rest } = props;
    const { field, fieldState } = useController({
        name,
        control,
    });

    return (
        <Input
            onChange={(value) => {
                const forwardedValue = !value ? '' : value;
                onChange && onChange(forwardedValue);
            }}
            onSelect={(value) => {
                const forwardedValue = !value ? '' : value;
                const selectedValue = onSelect ? onSelect(forwardedValue) : null;
                field.onChange(selectedValue ?? forwardedValue);
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
