import usePlacesAutocomplete from 'use-places-autocomplete';
import PropTypes from 'prop-types';
import Text from '@components/Text';
import { InputSearchController } from '@components/InputSearch/InputSearch.controller';

const InputSearchPlaces = ({ onChange, ...props }) => {
    const {
        ready,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        callbackName: 'YOUR_CALLBACK_NAME',
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300,
    });

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
            onChange={handleChange}
            isLoading={status !== 'OK'}
            results={data}
            isDisabled={!ready}
            renderItems={renderSuggestions}
            onSelect={handleSelect}
            onClickOutside={clearSuggestions}
        />
    );
};

InputSearchPlaces.propTypes = {
    onChange: PropTypes.func.isRequired,
};

InputSearchPlaces.defaultProps = {
    onChange: () => {},
};

export default InputSearchPlaces;
