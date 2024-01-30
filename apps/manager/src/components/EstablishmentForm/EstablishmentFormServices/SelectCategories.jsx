import PropTypes from 'prop-types';
import ComboBox from 'shared/src/components/ComboBox';
import useServiceCategoriesQuery from 'shared/src/queries/serviceCategory/useServiceCategoriesQuery.hook';
import ListBoxItem from 'shared/src/components/ListBoxItem';

const InputCategories = ({ onSelectionChange }) => {
    const categories = useServiceCategoriesQuery();

    return (
        <ComboBox
            onSelectionChange={onSelectionChange}
            isLoading={categories.isFetching}
            defaultItems={categories?.data?.data}
        >
            {(item) => <ListBoxItem {...item} />}
        </ComboBox>
    );
};

InputCategories.propTypes = {
    onSelectionChange: PropTypes.func,
};

InputCategories.defaultProps = {
    onSelectionChange: () => {},
};

export default InputCategories;
