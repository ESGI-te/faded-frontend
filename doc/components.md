# Dumb vs Smart Components en React

Les composants React peuvent être classés en deux catégories : les composants simples (dumb) et les composants intelligents (smart). Comprendre la différence entre ces deux types de composants est essentiel pour écrire des applications React maintenables et évolutives.

## Composants Simples (Dumb Components)

Les composants simples, également appelés composants de présentation ou composants sans état, sont responsables de l'affichage de l'interface utilisateur en fonction des propriétés (props) qu'ils reçoivent. Ils n'ont pas d'état interne ni de logique. Ce sont simplement des fonctions qui prennent des props en entrée et renvoient du JSX.

Voici un exemple de composant simple :

```jsx 
// Button.jsx
    const Button = ({
        children, 
        variant,
        ...props
    }) => {
        return (
            <button {...props}>{ children }</button>
        )
    }

    export default Button
```

## Composants Intelligents (Smart Components)

D'autre part, les composants intelligents, également appelés composants de conteneur ou composants avec état, ont un rôle plus complexe dans votre application. Ils gèrent les données et la logique de votre application, prennent des décisions et gèrent les changements d'état.

Les composants intelligents contiennent souvent et enveloppent plusieurs composants non intelligents, formant la structure et le comportement de votre application. Ils sont responsables de l'appel aux API, de la gestion de l'état de l'application et du contrôle du flux de données entre différentes parties de votre application.

```jsx 
// SmartComponent.jsx
...
const SmartComponent = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        handleFetchUser();
    }, [])

    const handleFetchUser = async () => {
        try {
            const response = await fetch('https://my-api/some-ressource');
            const userData = await response.json();
            setUser(userData);
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <Button onClick={handleFetch}>Refresh user</Button>
        { user ? (
            <div>
                <p>{ user.username }</p>
                <p>{ user.email }</p>
            </div>
        ) : <p>Is loading...</p>}
    )
}

export default SmartComponent
```

## Atomic design

Pour résumer, c’est une méthodologie de création d’interfaces graphiques qui s’articule autour de cinq composants : Atomes, Molécules, Organismes, Templates et Pages.

### Atomes

Les atomes vont constituer les briques élémentaires de l’application, il faut qu’ils soient les plus génériques possible, et réutilisés un maximum dans toute l’application :

- Un style par défaut
- Simples (Pas de logique)
- Hautement réutilisables
- Pas de marges, que du padding (Les marges doivent être appliquées par le composant parent)
- “props spreading” autorisé, pour laisser un contrôle maximal au parent

Voici un exemple :

```jsx 
// InputText.jsx

const InputText = ({
    label,
    id,
    ...props
}) =>  (
    <InputWrapper>
        <label htmlFor={id}>{ label }</label>
        <input {...props} id={id} type="text"/>
    </InputWrapper>
)

export default InputText
```

### Molecules

Les molécules sont composées de plusieurs atomes.

- Plutôt réutilisables
- Peuvent contenir de la logique simple, ou faire passer celle du parent (que l’on voit juste après)

Voici un exemple : 

```jsx 

// ProfileForm.jsx

import InputText from '@components/InputText';
import Button from '@components/Button';

const ProfileForm = ({
    onSubmit,
    user,
    ...props
}) =>  {
    return ( 
        <form onSubmit={onSubmit}>
            <InputText name="username" value={user?.username}/>
            <InputText name="email" value={user?.email}/>
            <Button type="submit">Submit</Button>
        </form>
    )
}

export default ProfileForm
```

### Organismes

Les organismes.

- Beaucoup moins réutilisables
- Peuvent contenir une logique plus complexe (Validateurs, parsers, fetchs, etc…)

Voici un exemple :


```jsx 
// Profile.jsx

import ProfileForm from '@components/ProfileForm';

const Profile = ({
    onSubmit,
    user,
    ...props
}) =>  {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(false);
   
    useEffect(() => {
        if(user) return
        handleFetchUser()
    }, [])

    const handleFetchUser = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('https://my-api/some-ressource');
            const userData = await response.json();
            setUser(userData);
            setIsLoading(false);
        } catch(error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    const handleUpdateUser = async (data) => {
        try {
            setIsLoading(true);
            const response = await fetch('https://my-api/some-ressource', { 
                method: 'PATCH', 
                body: data 
            });
            const userData = await response.json();
            setUser(userData);
            setIsLoading(false)
        } catch(error) {
            console.error(error);
            setIsLoading(false)
        }
    }

    if(isLoading || !user) return <p>Is loading...</p>
    
    return ( 
        <ProfileForm onSubmit={handleUpdateUser} user={user}/>
    )
}

export default Profile
```

### Templates

Il faut voir les templates comme des “aides” pour afficher les autres composants. Le plus simple peut être simplement un composant “WithPadding” qui ne fait qu’ajouter un padding autour du composant.

- Hautement réutilisables
- Peu, voir pas du tout de logique
- Permet de placer, ou d’espacer des composants entre eux

Voici un exemple d'un composant qui gère le flex column:

```jsx
// Stack.jsx

// This component use only styled-components
const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};
`
export default Stack
```

### Pages

Ce type de composant peut avoir plusieurs rôles :

- Gérer le layout
- Récupérer les données, passer des méthodes

Voici un exemple :

```jsx
// ProfilePage.jsx

const ProfilePage = () =>  {
       
    return ( 
        <div>
            <h2>Profile page</h2>
            <Profile/>
        </div>
    )
}

export default ProfilePage
```