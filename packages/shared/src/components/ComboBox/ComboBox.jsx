import { useRef } from "react";
import PropTypes from "prop-types";
import {
	Button as AriaButton,
	ComboBox as AriaComboBox,
	Input as AriaInput,
	ListBox as AriaListBox,
} from "react-aria-components";
import Label from "../Label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon as iconFA } from "@fortawesome/fontawesome-svg-core/import.macro";
import styled, { css } from "styled-components";
import Spinner from "../Spinner";
import Dropdown from "../Dropdown";
import { FormattedMessage } from "react-intl";

const ComboBox = ({
	isOptional,
	isRequired,
	tooltip,
	description,
	label,
	children,
	icon,
	isValid,
	isLoading,
	onLoadMore,
	loadMoreEnabled,
	inputHasImage,
	...props
}) => {
	const triggerRef = useRef(null);

	return (
		<Combo menuTrigger="focus" {...props} $isValid={isValid} ref={triggerRef}>
			<Label
				isOptional={isOptional}
				isRequired={isRequired}
				tooltip={tooltip}
				description={description}
			>
				{label}
			</Label>
			<InputWrapper $hasImage={inputHasImage}>
				{icon}
				<Input />
				{isLoading ? (
					<Spinner color="--primary" size="0.75rem" />
				) : (
					<IconButton>
						<ChevronIcon
							icon={iconFA({ name: "chevron-down", style: "solid" })}
						/>
					</IconButton>
				)}
			</InputWrapper>
			<Dropdown
				shouldFlip={false}
				placement="bottom"
				offset={4}
				triggerRef={triggerRef}
			>
				<ListBox>{children}</ListBox>
				{loadMoreEnabled && (
					<FetchMoreButton onClick={onLoadMore}>
						<FormattedMessage defaultMessage="Charger plus" />
					</FetchMoreButton>
				)}
			</Dropdown>
		</Combo>
	);
};

const InputWrapper = styled.div`
	border-radius: var(--r-s);
	border: 1px solid var(--neutral200);
	background-color: var(--white);
	padding: 0.625rem 0.75rem;
	display: flex;
	align-items: center;
	column-gap: 0.5rem;
	height: 2.5rem;

	&:hover {
		border-color: var(--neutral300);
	}

	&:focus-within {
		outline: 0.125rem var(--primary50) solid;
	}

	${({ $hasImage }) =>
		$hasImage &&
		css`
			padding: 0.75rem;
			height: 4rem;
		`}
`;
const Combo = styled(AriaComboBox)`
	width: 100%;
	max-width: 320px;
	display: flex;
	flex-direction: column;
	row-gap: 0.5rem;

	&[data-disabled] > ${InputWrapper} {
		opacity: 0.5;
		cursor: not-allowed;
	}

	&[data-invalid] > ${InputWrapper} {
		border-color: var(--alert);

		&:focus-within {
			outline: 0.125rem var(--alert50) solid;
		}
	}

	${({ $isValid }) =>
		$isValid &&
		css`
			& > ${InputWrapper} {
				border-color: var(--success);

				&:focus-within {
					outline: 0.125rem var(--success50) solid;
				}
			}
		`}
`;
const ChevronIcon = styled(FontAwesomeIcon)`
	width: 0.75rem;
	height: 0.75rem;
	color: var(--neutral500);
`;

const IconButton = styled(AriaButton)`
	padding: 0;
	border: none;
	background: none;
	cursor: pointer;
`;
const Input = styled(AriaInput)`
	flex: 1;
	border: none;

	&[data-focused] {
		outline: none;
	}
`;
const ListBox = styled(AriaListBox)`
	display: flex;
	flex-direction: column;
`;
const FetchMoreButton = styled.button`
	border: none;
	background: none;
	color: var(--primary);
	font-size: var(--fs-body-m);
	line-height: var(--lh-body-m);
	font-weight: var(--fw-semibold);
	padding: 0.5rem 0.75rem;
	cursor: pointer;
`;

/* 
     cf. react-aria-components/ComboBox props
     (https://react-spectrum.adobe.com/react-spectrum/ComboBox.html#props)      
*/
ComboBox.propTypes = {
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	isOptional: PropTypes.bool,
	isRequired: PropTypes.bool,
	tooltip: PropTypes.string,
	description: PropTypes.string,
	children: PropTypes.func,
	icon: PropTypes.func,
	isValid: PropTypes.bool,
	isLoading: PropTypes.bool,
	onLoadMore: PropTypes.func,
	loadMoreEnabled: PropTypes.bool,
	inputHasImage: PropTypes.bool,
};

ComboBox.defaultProps = {
	isOptional: false,
	isRequired: false,
	isLoading: false,
	loadMoreEnabled: false,
	inputHasImage: false,
};

export default ComboBox;
