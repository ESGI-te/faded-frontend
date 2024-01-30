import { useBlocker } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Button from "../Button";
import Text from "../Text";
import styled from "styled-components";
import Modal from "../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import Stack from "../Stack";

const UnsavedFormModal = ({ shouldBlockNavigation }) => {
	let blocker = useBlocker(shouldBlockNavigation);

	return (
		<>
			<Modal
				isOpen={blocker.state === "blocked"}
				onOpenChange={() => blocker.reset()}
				size="small"
			>
				<ModalInner>
					<IconWrapper>
						<FontAwesomeIcon
							icon={icon({ name: "triangle-exclamation", style: "solid" })}
						/>
					</IconWrapper>
					<Stack gap="0.25rem" align="center">
						<Text variant="headingS" fontWeight="--fw-bold">
							<FormattedMessage defaultMessage="Êtes-vous sûr de vouloir quitter sans enregistrer ?" />
						</Text>
						<Text variant="bodyM" color="--neutral500" textAlign="center">
							<FormattedMessage defaultMessage="Les modifications apportées seront perdues." />
						</Text>
					</Stack>
					<ActionWrapper>
						<Button onPress={() => blocker.proceed?.()}>
							<FormattedMessage defaultMessage="Quitter quand même" />
						</Button>
						<CancelButton variant="ghost" onPress={() => blocker.reset?.()}>
							<FormattedMessage defaultMessage="Annuler" />
						</CancelButton>
					</ActionWrapper>
				</ModalInner>
			</Modal>
		</>
	);
};

const ModalInner = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	row-gap: 1.5rem;
	width: 100%;
`;
const ActionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 0.5rem;
	align-items: stretch;
	width: 100%;

	& > :last-child {
		align-self: center;
	}
`;
const CancelButton = styled(Button)`
	color: var(--neutral500);
	padding: 0;
`;
const IconWrapper = styled.div`
	width: 3rem;
	height: 3rem;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--warning50);
	border-radius: var(--r-m);
	color: var(--warning500);
`;

export default UnsavedFormModal;
