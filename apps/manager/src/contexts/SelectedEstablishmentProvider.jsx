import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import { USER_ROLES } from 'shared/src/utils/constants';
import { createContext, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const SelectedEstablishmentContext = createContext({});

const SelectedEstablishmentProvider = () => {
    const { data: user } = useUserQuery();
    const isBarber = user && user.roles.includes(USER_ROLES.BARBER);
    const defaultEstablishment = isBarber && user.barber.establishment.id;
    const [establishment, setEstablishment] = useState(defaultEstablishment);

    useEffect(() => {
        if (!isBarber && !establishment) return;
        setEstablishment(defaultEstablishment);
    }, [isBarber, defaultEstablishment]);

    return (
        <SelectedEstablishmentContext.Provider
            value={{ establishment, onSelectEstablishment: setEstablishment }}
        >
            <Outlet />
        </SelectedEstablishmentContext.Provider>
    );
};

export const useSelectedEstablishment = () => useContext(SelectedEstablishmentContext);

export default SelectedEstablishmentProvider;
