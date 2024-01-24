import { createContext, useContext } from 'react';

export const EstablishmentBeingEditedContext = createContext(null);

export const useEstablishmentBeingEdited = () => {
    return useContext(EstablishmentBeingEditedContext);
};

const EstablishmentFormProvider = ({ establishment, children }) => {
    return (
        <EstablishmentBeingEditedContext.Provider value={establishment}>
            {children}
        </EstablishmentBeingEditedContext.Provider>
    );
};

export default EstablishmentFormProvider;
