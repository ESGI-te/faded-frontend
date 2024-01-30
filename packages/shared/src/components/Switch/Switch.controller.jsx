import { useController } from "react-hook-form";
import { default as Switch } from ".";

export const SwitchController = (props) => {
	const { control, name, onChange, onBlur, ...rest } = props;
	const { field, fieldState } = useController({
		name,
		control,
	});

	return (
		<Switch
			onChange={(isChecked) => {
				onChange && onChange(isChecked);
				field.onChange(isChecked);
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
