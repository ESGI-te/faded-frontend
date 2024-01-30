import { useController } from "react-hook-form";
import { default as InputTime } from ".";

export const InputTimeController = (props) => {
	const { control, name, onChange, onBlur, ...rest } = props;
	const { field, fieldState } = useController({
		name,
		control,
	});

	return (
		<InputTime
			onChange={(value) => {
				const forwardedValue = !value ? null : value;
				onChange && onChange(forwardedValue);
				field.onChange(forwardedValue);
			}}
			onBlur={(...v) => {
				onBlur && onBlur(...v);
				field.onBlur(...v);
			}}
			value={field.value}
			name={field.name}
			errorMessage={fieldState.error?.message}
			{...rest}
		/>
	);
};
