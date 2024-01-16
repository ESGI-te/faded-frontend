import useEstablishmentQuery from 'shared/src/queries/establishment/useEstablishmentQuery.hook';
import { createContext, useContext, useMemo, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

const EstablishmentContext = createContext({});
const EstablishmentAppointmentContext = createContext({});

const EstablishmentAppointmentProvider = () => {
    const { establishmentId } = useParams();
    const { data: establishment, isLoading } = useEstablishmentQuery(establishmentId);
    const noteCount = useMemo(() => establishment?.feedback.length, [establishment?.feedback]);
    const note = useMemo(() => {
        const sum = establishment?.feedback.reduce((acc, feedback) => acc + feedback.note, 0);
        return sum / noteCount;
    }, [establishment?.feedback, noteCount]);
    const formatedEstablishment = useMemo(
        () => ({ ...establishment, note, noteCount }),
        [establishment, note, noteCount],
    );
    const [selectedService, setSelectedService] = useState(undefined);

    return (
        <EstablishmentContext.Provider value={{ establishment: formatedEstablishment, isLoading }}>
            <EstablishmentAppointmentContext.Provider
                value={{ selectedService, onSelectService: setSelectedService }}
            >
                <Outlet />
            </EstablishmentAppointmentContext.Provider>
        </EstablishmentContext.Provider>
    );
};

export const useEstablishment = () => useContext(EstablishmentContext);
export const useEstablishmentAppointment = () => useContext(EstablishmentAppointmentContext);

export default EstablishmentAppointmentProvider;
