import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useRouteGuard = ({
	shouldBlockNavigation,
	onOpenModal,
	onCloseModal,
}) => {
	const navigate = useNavigate();
	const [confirmedNavigation, setConfirmedNavigation] = useState(false);
	const [nextLocation, setNextLocation] = useState(null);

	const handleBlockedNavigation = (location) => {
		if (!confirmedNavigation && shouldBlockNavigation) {
			onOpenModal();
			setNextLocation(location);
			return false;
		}
		return true;
	};

	const handleConfirmNavigation = () => {
		onCloseModal();
		setConfirmedNavigation(true);
		if (!nextLocation) return;
		navigate(nextLocation.pathname);
	};

	useEffect(() => {
		if (!confirmedNavigation || !nextLocation) return;
		navigate(nextLocation.pathname);
	}, [confirmedNavigation, nextLocation, navigate]);

	return {
		handleConfirmNavigation,
		handleBlockedNavigation,
	};
};

export default useRouteGuard;
