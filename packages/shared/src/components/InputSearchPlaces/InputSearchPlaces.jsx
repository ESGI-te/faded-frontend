import usePlacesAutocomplete from "use-places-autocomplete";
import PropTypes from "prop-types";
import Text from "../Text";
import { InputSearchController } from "../InputSearch";
import { useEffect, useState } from "react";

const loadGoogleMapsScript = (cb) => {
	const googleMapsScriptUrl = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places&callback=searchPlaces`;
	if (!document.querySelector(`script[src="${googleMapsScriptUrl}"]`)) {
		const script = document.createElement("script");
		script.src = googleMapsScriptUrl;
		script.async = true;
		script.defer = true;
		document.body.appendChild(script);
		script.onload = cb
	} else {cb()}
};

const InputSearchPlaces = ({ onChange, defaultValue, ...props }) => {
	const [scriptLoaded, setScriptLoaded] = useState(false);
	const {
		ready,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
		value,
	} = usePlacesAutocomplete({
		callbackName: "searchPlaces",
		requestOptions: {
			/* Define search scope here */
		},
		debounce: 300,
	});
	useEffect(() => {
		loadGoogleMapsScript(() => setScriptLoaded(true));
	}, []);

	useEffect(() => {
		if (!defaultValue) return;
		setValue(defaultValue, false);
	}, [defaultValue]);

	const handleSelect = ({ description }) => {
		// When the user selects a place, we can replace the keyword without request data from API
		// by setting the second parameter to "false"
		setValue(description, false);
		clearSuggestions();
		// Get latitude and longitude via utility functions
		// const coordinates = await getGeocode({ address: description }).then((results) => {
		//     const { lat, lng } = getLatLng(results[0]);
		//     console.log('📍 Coordinates: ', { lat, lng });
		// });
		return description;
	};

	const renderSuggestions = (suggestions, { listItem: ListItem, onSelect }) =>
		suggestions.map((suggestion) => {
			const {
				place_id,
				structured_formatting: { main_text, secondary_text },
			} = suggestion;

			return (
				<ListItem key={place_id} onClick={() => onSelect(suggestion)}>
					<Text fontWeight="--fw-semibold">{main_text}</Text>
					<Text color="--neutral500">{secondary_text}</Text>
				</ListItem>
			);
		});

	const handleChange = (value) => {
		onChange(value);
		setValue(value);
	};

	return (
		<InputSearchController
			{...props}
			value={value}
			onChange={handleChange}
			isLoading={status !== "OK"}
			results={data}
			isDisabled={!ready && scriptLoaded}
			renderItems={renderSuggestions}
			onSelect={handleSelect}
			onClickOutside={clearSuggestions}
			autoComplete="on"
		/>
	);
};

InputSearchPlaces.propTypes = {
	onChange: PropTypes.func.isRequired,
	defaultValue: PropTypes.string,
};

InputSearchPlaces.defaultProps = {
	onChange: () => {},
};

export default InputSearchPlaces;
