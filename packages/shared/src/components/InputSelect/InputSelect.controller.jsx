import { useController } from "react-hook-form";
import { default as InputSelect } from ".";

export const InputSelectController = (props) => {
	const {
		control,
		name,
		onChange,
		onBlur,
		onInputChange,
		onSelectionChange,
		...rest
	} = props;
	const { field, fieldState } = useController({
		name,
		control,
	});

	return (
		<InputSelect
			onSelectionChange={(value) => {
				onSelectionChange && onSelectionChange(value);
				field.onChange(value);
			}}
			onBlur={(...v) => {
				onBlur && onBlur(...v);
				field.onBlur(...v);
			}}
			value={field.value}
			defaultSelectedKey={field.value}
			name={field.name}
			isInvalid={Object.keys(fieldState.error || {}).length > 0}
			errorMessage={fieldState.error?.message}
			{...rest}
		/>
	);
};
