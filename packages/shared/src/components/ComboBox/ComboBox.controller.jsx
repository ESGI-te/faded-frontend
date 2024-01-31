import { useController } from "react-hook-form";
import { default as ComboBox } from ".";

export const ComboBoxController = (props) => {
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
		<ComboBox
			onInputChange={(value) => {
				const forwardedValue = !value ? "" : value;
				onInputChange && onInputChange(forwardedValue);
			}}
			onSelectionChange={(value) => {
				if (!value) return;
				onSelectionChange && onSelectionChange(value);
				field.onChange(value);
			}}
			onBlur={(...v) => {
				onBlur && onBlur(...v);
				field.onBlur(...v);
			}}
			defaultSelectedKey={field.value}
			value={field.value}
			name={field.name}
			isInvalid={Object.keys(fieldState.error || {}).length > 0}
			errorMessage={fieldState.error?.message}
			{...rest}
		/>
	);
};
