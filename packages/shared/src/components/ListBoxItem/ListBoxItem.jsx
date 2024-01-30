import React, { isValidElement } from "react";
import PropTypes from "prop-types";
import { ListBoxItem as AriaListBoxItem, Text } from "react-aria-components";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon as iconFA } from "@fortawesome/fontawesome-svg-core/import.macro";

const ListBoxItemImage = ({ image }) => {
	if (image === undefined) return null;

	if (typeof image === "string" && image.length > 0) {
		return <Image src={image} />;
	}
	if (isValidElement(image)) {
		return image;
	}

	return (
		<ImagePlaceholder>
			<Icon
				icon={iconFA({
					name: "pen-ruler",
					style: "solid",
				})}
			/>
		</ImagePlaceholder>
	);
};

const ListBoxItem = ({
	children,
	description,
	name,
	image,
	icon,
	...props
}) => (
	<ListItem {...props} textValue={name}>
		{children ||
			(({ isSelected, isDisabled }) => (
				<>
					{icon}
					<ListBoxItemImage image={image} />
					<ListItemLabelWrapper>
						<ListItemLabel slot="label">{name}</ListItemLabel>
						<ListItemDescription slot="description">
							{description}
						</ListItemDescription>
					</ListItemLabelWrapper>
					{isSelected && !isDisabled && (
						<SelectedIcon
							icon={iconFA({
								name: "check",
								style: "solid",
							})}
						/>
					)}
					{isDisabled && (
						<DisabledIcon
							icon={iconFA({
								name: "lock",
								style: "solid",
							})}
						/>
					)}
				</>
			))}
	</ListItem>
);

const ListItemLabel = styled(Text)`
	font-size: var(--fs-body-m);
	line-height: var(--lh-body-m);
	color: var(--black);
`;
const ListItemDescription = styled(Text)`
	font-size: var(--fs-body-s);
	line-height: var(--lh-body-s);
	color: var(--neutral500);
`;
const ListItem = styled(AriaListBoxItem)`
	padding: 0.5rem 0.75rem;
	cursor: pointer;
	display: flex;
	align-items: center;
	column-gap: 0.75rem;

	&[data-hovered] {
		background-color: var(--neutral50);
	}
	&[data-selected] {
		${ListItemLabel} {
			color: var(--primary);
			font-weight: var(--fw-semibold);
		}
	}
	&[data-disabled] {
		opacity: 0.5;
	}
`;
const ListItemLabelWrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;
const Image = styled.img`
	width: 2.5rem;
	height: 2.5rem;
	border-radius: var(--r-s);
`;
const Icon = styled(FontAwesomeIcon)`
	width: 1.25rem;
	height: 1.25rem;
`;
const ImagePlaceholder = styled.div`
	width: 2.5rem;
	height: 2.5rem;
	border-radius: var(--r-s);
	background-color: var(--neutral100);
	display: flex;
	align-items: center;
	justify-content: center;

	& > ${Icon} {
		width: 1rem;
		height: 1rem;
		color: var(--neutral500);
	}
`;

const SelectedIcon = styled(Icon)`
	color: var(--primary);
`;
const DisabledIcon = styled(Icon)`
	color: var(--neutral500);
`;

ListBoxItem.propTypes = {
	children: PropTypes.node,
	description: PropTypes.string,
	name: PropTypes.string,
	image: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	icon: PropTypes.element,
};

export default ListBoxItem;
