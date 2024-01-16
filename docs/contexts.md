# Les Contextes en React

Les contextes (Contexts) sont un mécanisme puissant en React qui permet de partager des données entre des composants sans avoir à passer explicitement les propriétés (props) à travers chaque niveau de l'arborescence des composants. Les contextes sont particulièrement utiles lorsque des données doivent être accessibles à de nombreux composants à différents niveaux de profondeur dans l'arborescence des composants.

## Création d'un Contexte

Pour créer un contexte, utilisez la méthode `createContext()` comme suit :

```jsx
import { createContext } from 'react';

const MyContext = createContext();
```

## Context Provider

Pour fournir des données via un contexte, utilisez un composant Provider associé à ce contexte. Le Provider enveloppe une partie de votre arborescence de composants et rend les données disponibles pour tous les composants enfants qui consomment ce contexte.

Voici un exemple :

```jsx 
import { createContext, useState } from 'react';

export const MyContext = createContext({});

const MyContextProvider = ({ children }) => {
    const [providedData, setProvidedData] = useState(null);

    return (
        <MyContext.Provider value={providedData}>
            {children}
        </MyContext.Provider>
    );
}

export default MyContextProvider;
```

On va le placer en tant que parent des composants qui doivent pouvoir accéder à la data provided, ainsi tous les composants enfants de ce context y auront accès. C'est à dire que non seulement les trois composants enfants présents dans l'exemple y auront accès mais également tous les composants enfants de ceux-ci et ainsi de suite :

```jsx 
import MyContextProvider from '@contexts/MyContextProvider';

const App = () => {
    return (
        <MyContextProvider>
            <Component1/>
            <Component2/>
            <Component3/>
        </MyContextProvider>
    );
}

export default App;
```

## Consommation d'un Contexte (Context Consumer)

Pour accéder aux données partagées via un contexte, utilisez le composant Consumer associé à ce contexte. Vous pouvez le faire dans n'importe quel composant enfant qui se trouve dans la portée du Provider du contexte.

```jsx
// Component1.jsx
import { MyContext } from '@contexts/MyContextProvider';
import { useContext } from 'react';

const Component1 = () => {
    const providedData = useContext(MyContext);

    return <p>{ providedData }</p>
}

export default Component1;
```

## La meilleure manière de gérer un context et de l'utiliser

Pour éviter des imports inutiles et répétitifs et garder une certaine cohérence, il est recommandé d'exporter un custom hook depuis le fichier du context. Celui-ci va encapsuler la logique de `useContext` :

```jsx
import { createContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
    const [providedData, setProvidedData] = useState(null);

    return (
        <MyContext.Provider value={providedData}> 
            {children}
        </MyContext.Provider>
    );
}

export default MyContextProvider;

export const useMyContext = useContext(MyContext);
```

Son utilisation :

```jsx
import { useMyContext } from '@contexts/MyContextProvider';

const Component1 = () => {
    const providedData = useMyContext(); // Note: on a évité l'import de useContext car celui-ci est géré par notre hook useMyContext

    return <p>{ providedData }</p>
}

export default Component1; 
```
