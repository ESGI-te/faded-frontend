import { useForm } from 'react-hook-form';
import { searchEstablishmentsFormSchema as schema } from './SearchEstablishmentsForm.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import InputSearchPlaces from 'shared/src/components/InputSearchPlaces';
import InputSearchServiceOrProvider from '@components/InputSearchServiceOrProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useEffect } from 'react';

const SearchEstablishmentsForm = ({ onSubmit, defaultValues }) => {
    const intl = useIntl();
    const { control, handleSubmit, watch } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: {
            serviceCategories: '' || defaultValues?.serviceCategories,
            address: '' || defaultValues?.address,
        },
    });

    useEffect(() => {
        const subscription = watch(() => {
            handleSubmit(onSubmit)();
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    return (
        <Form>
            <InputSearchServiceOrProvider
                placeholder={intl.formatMessage({ defaultMessage: 'Que cherchez-vous ?' })}
                control={control}
                startIcon={<Icon icon={icon({ name: 'magnifying-glass', style: 'solid' })} />}
                name="serviceCategories"
            />
            <InputSearchPlaces
                placeholder={intl.formatMessage({ defaultMessage: 'Où' })}
                control={control}
                defaultValue={defaultValues?.address}
                startIcon={<Icon icon={icon({ name: 'location-dot', style: 'solid' })} />}
                name="address"
            />
        </Form>
    );
};

const Form = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: row;
        column-gap: 1rem;
        align-items: center;
        max-width: 800px;
    }
`;
const Icon = styled(FontAwesomeIcon)`
    width: 0.875rem;
    height: 0.875rem;
    color: var(--primary500);
`;

SearchEstablishmentsForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    defaultValues: PropTypes.shape({
        serviceCategories: PropTypes.string,
        address: PropTypes.string,
        radius: PropTypes.number,
    }),
};

SearchEstablishmentsForm.defaultProps = {
    onSubmit: () => {},
    isLoading: false,
};

export default SearchEstablishmentsForm;
