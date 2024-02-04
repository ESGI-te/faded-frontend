import React, { useState } from "react";
import { FileTrigger, Button } from "react-aria-components";
import styled from "styled-components";
import Label from "../Label";
import PropTypes from "prop-types";
import Cluster from "../Cluster";
import IconButton from "../IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import placeholderIllustration from "../../assets/images/placeholder-img.png";

const ImageUploader = ({
	label,
	isOptional,
	isRequired,
	tooltip,
	description,
	onSelect,
	value,
	...props
}) => {
	let [files, setFiles] = useState(value ? [value] : null);

	const handleFileSelect = (selectedFiles) => {
		const fileReaders = [];
		let base64Files = [];

		Array.from(selectedFiles).forEach((file) => {
			const reader = new FileReader();

			reader.onloadend = () => {
				base64Files.push(reader.result);

				if (base64Files.length === selectedFiles.length) {
					setFiles(base64Files);
					onSelect?.(base64Files);
				}
			};

			fileReaders.push(reader);
			reader.readAsDataURL(file);
		});
	};

	const handleClearFiles = () => {
		setFiles(null);
		onSelect?.(null);
	};

	return (
		<InputWrapper>
			<Label
				isOptional={isOptional}
				isRequired={isRequired}
				tooltip={tooltip}
				description={description}
			>
				{label}
			</Label>
			<FileTriggerWrapper>
				<ImagePreview
					src={files?.[0] || placeholderIllustration}
					alt="preview"
				/>
				<Cluster gap="0.5rem">
					<FileTrigger onSelect={handleFileSelect} {...props}>
						<ActionButton
							icon={<ActionIcon icon={icon({ name: "pen", style: "solid" })} />}
						/>
					</FileTrigger>
					<ActionButton
						onPress={handleClearFiles}
						icon={<ActionIcon icon={icon({ name: "trash", style: "solid" })} />}
					/>
				</Cluster>
			</FileTriggerWrapper>
		</InputWrapper>
	);
};

const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 0.5rem;
`;
const ImagePreview = styled.img`
	width: 160px;
	height: 160px;
	border-radius: var(--r-s);
	object-fit: cover;
`;
const FileTriggerWrapper = styled.div`
	display: flex;
	column-gap: 1rem;

	${({ theme }) => theme.mediaQueries.desktopAndUp} {
		flex-direction: column;
		row-gap: 1rem;
		align-items: center;
	}
`;
const ActionButton = styled(IconButton)`
	border-radius: var(--r-full);
	background: transparent;
	border: solid var(--neutral300) 1px;
`;
const ActionIcon = styled(FontAwesomeIcon)`
	color: var(--black);
	width: 1rem;
	height: 1rem;
`;

ImageUploader.propTypes = {
	label: PropTypes.string,
	isOptional: PropTypes.bool,
	isRequired: PropTypes.bool,
	tooltip: PropTypes.string,
	description: PropTypes.string,
	onSelect: PropTypes.func,
};

export default ImageUploader;
