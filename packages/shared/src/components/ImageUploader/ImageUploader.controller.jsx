import { useController } from "react-hook-form";
import { default as ImageUploader } from ".";

export const ImageUploaderController = (props) => {
	const { control, name, onSelect, onBlur, onInputChange, ...rest } = props;
	const { field, fieldState } = useController({
		name,
		control,
	});

	return (
		<ImageUploader
			onSelect={(value) => {
				onSelect && onSelect(value);
				field.onChange(value);
			}}
			onBlur={(...v) => {
				onBlur && onBlur(...v);
				field.onBlur(...v);
			}}
			value={field.value}
			name={field.name}
			isInvalid={Object.keys(fieldState.error || {}).length > 0}
			errorMessage={fieldState.error?.message}
			{...rest}
		/>
	);
};
