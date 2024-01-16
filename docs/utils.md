# Où est-ce que je range le reste du code ?

## Les constantes

Les constantes doivent être placées dans le dossier `/utils/constants`. Elles doivent êtres impérativement réutilisables. Leur but étant de pouvoir les utiliser partout dans l'application sans se préoccuper de leur valeur car celle-ci ne peut-être modifiée qu'à cet endroit.
Toujours en majuscule et en snake-case.

Exemple:

```js
// utils/constants.js

export const USER_ROLES = {
    USER: 'user',
    PROVIDER: 'provider',
    ADMIN: 'admin'
};

const SOME_CONSTANT = 'I am a constant';
```

On les utilise ensuite de cette manière :

```jsx
import { USER_ROLES } from 'shared/src/utils/constants';

const MyComponent = ({ user }) => {
    if(!user.roles.includes(USER_ROLES.PROVIDER)) {
        return <p>Unauthorized</p>
    }

    return (
        <h2>Welcome back { user.username } !</h2>
    )
}
```

## Les helpers

Toutes les fonctions helpers sont à ajouter dans le fichier `/utils/helpers.js` :

```js
export const addition = (num1, num2) => {
    return num1 + num 2;
}
```