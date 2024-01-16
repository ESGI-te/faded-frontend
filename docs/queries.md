# react-query

## Query keys

Chaque query doit être identifiée par une `queryKey` pour permettre des altérations de la ressource dans le cache. De cette manière il sera notamment possible d'invalider le cache d'une ressource à l'aide cette `queryKey`, ce qui déclenchera le refetch de la ressource.

Chaque ressource ou entité doit avoir son dossier distinct dans le dossier `/queries` (`/queries/user`, `/queries/barbershop`...)

Chaque ressource ou entité doit avoir dans son dossier une queryKey factory :

```js
const barbershopKeys = {
    all: () => [{ entity: 'barbershop' }],
    allLists: () => [{ ...barbershopKeys.all()[0], scope: 'list' }],
    allDetails: () => [{ ...barbershopKeys.all()[0], scope: 'detail' }],
    detailById: (barbershopId) => [
        { ...barbershopKeys.allDetails()[0], barbershopId },
    ],
};

export default barbershopKeys;
```

Ces keys seront ensuite utilisées dans les queries et mutations que nous allons voir par la suite

## Queries (GET)

Les queries sont a utiliser pour récupérer de la donnée et correspondent aux requêtes de type `GET`.

On utilise un custom hook qui exporte notre query (le hook `useQuery`). Celle-ci prend plusieurs paramètres : 
- `queryFn` qui est une fonction qui se charge de faire la requête (précédemment déclarée dans `api.js`)
- `queryKey` qui est un identifiant unique qui permet d'identifier la ressource afin d'effectuer des actions sur son cache
- `enabled` qui est necessaire si la query prend un ou plusieurs paramètres afin de déclencher la query et donc la requête uniquement ci les paramètres sont évalués à `true`

Documentation: https://tanstack.com/query/v3/docs/react/guides/queries

Voici un exemple :

Sans paramètre
```jsx
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/api/api';
import userKeys from './userKeys';

const queryFn = async () => {
    const data = await getUser();

    return data;
};

const useUserQuery = () => {
    return useQuery({
        queryKey: userKeys.detail(),
        queryFn,
    });
};

export default useUserQuery;
```

Avec paramètre
```jsx
import { useQuery } from '@tanstack/react-query';
import { getBarbershop } from '@/api/api';
import barbershopKeys from './barbershopKeys';

const queryFn = async ({ queryKey: [{ barbershopId }] }) => {
    const data = await getBarbershop(barbershopId);

    return data;
};

const useBarbershopQuery = (barbershopId) => {
    return useQuery({
        queryKey: barbershopKeys.detail(barbershopId),
        queryFn,
    });
};

export default useBarbershopQuery;
```

Voici comment on l'utilise :

```jsx
import { useBarberShopQuery } = from '@queries/barbershop/useBarbershopQuery';

const MyComponent = () => {
    /* 
        `barbershop` object contains a few very important state 
        (cf: https://tanstack.com/query/v3/docs/react/guides/queries)
    */ 
    const barbershop = useBarbershopQuery();
    
    if(barbershop.isLoading) return <p>Is Loading...</p>

    return (
        <div>
            <h2>{ barbershop.data.name }</h2>
            <h2>{ barbershop.data.address }</h2>
        </div>
    )
}
```

## Mutations (POST, PATCH, PUT, DELETE)

Les mutations sont à utiliser pour des requêtes de type `POST`, `PATCH`, `PUT` et `DELETE`.

On utilise un custom hook qui exporte notre mutation (le hook `useMutation`). Celle-ci prend plusieurs paramètres : 
- `mutationFn` qui est une fonction qui se charge de faire la requête (précédemment déclarée dans `api.js`)
- Un objet qui contient des options comme des hooks, en voici quelques un :
- `onSuccess` qui est une fonction appelée si la mutation s'est déroulée avec succès
- `onError` qui est une fonction appelée si la mutation a échouée
- `onSettled` qui est une fonction appelée si la mutation a réussie ou échouée

Documentation: https://tanstack.com/query/v3/docs/react/guides/mutations

Voici un exemple :

```jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBarbershop } from '@api/api';
import barbershop from './barbershop';

const mutationFn = async ({ barbershopId, barbershop }) => {
    const data = await updateBarbershop({ barbershopId, barbershop });
    return data;
};

const useUpdateBarbershopMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        onSuccess: (data, { barbershopId }) =>
            queryClient.invalidateQueries({
                queryKey: barbershop.detail(barbershopId),
            }),
    });
};

export default useUpdateBarbershopMutation;

```

Voici comment on l'utilise :

```jsx
import { useBarberShopQuery } = from '@queries/barbershop/useBarbershopQuery';
import { useUpdateBarberShopMutation } = from '@queries/barbershop/useUpdateBarberShopMutation';

const MyComponent = ({ barbershopId }) => {
    /* 
        `barbershop` object contains a few very important state 
        (cf: https://tanstack.com/query/v3/docs/react/guides/mutations)
    */ 
    const barbershop = useBarbershopQuery();
    const updateBarbershop = useUpdateBarbershopMutation();

    const handleUpdateBarbershop = () => {
        const newData = {
            name: 'New barbershop name',
            address: 'New barbershop address'
        };
        updateBarbershop.mutate({ barbershopId, barbershop: newData }, {
            onSuccess: () => {
                // Do something if needed
            },
            onError: () => {
                // Do something if needed
            }
        })
    }
    
    if(barbershop.isLoading) return <p>Is Loading...</p>

    return (
        <div>
            <h2>{ barbershop.data.name }</h2>
            <h2>{ barbershop.data.address }</h2>
            <button onClick={handleUpdateBarbershop}>Update barbershop</button>
        </div>
    )
}
```