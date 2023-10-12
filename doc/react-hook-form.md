# react-hook-form
Chaque formulaire doit avoir son propre dossier et être suffixé par `Form` (ex: `LoginForm`).
Un composant de formulaire comprend plusieurs éléments :

- un schéma de validation
- un composant de formulaire
- une mutation si non réutilisable dans l'application (facultative)

## Schéma de validation avec yup
Un schéma de validation représente les règles qui régissent un formulaire: maximum 20 caractères sur un input, uniquement un number sur un input, la valeur de cette input doit respecter la forme d'un url ou encore une regex personnalisée complexe.

La librairie `yup` permet de réaliser un schéma de manière simple et intuitive.

Documentation: https://github.com/jquense/yup

Créer un fichier `MyForm.schema.js` : 

```js
// /components/LoginForm/LoginForm.schema.js

import * as yup from 'yup';

export const loginFormSchema = yup.object({
    email: yup.string().email('A custom error message if you want').required(),
    password: yup.string().min(6).required('A custom error message if you want'),
});
```

## useForm hook

Le hook `useForm` est fourni par la librairie `react-hook-form`. C'est un custom hook qui permet de gérer facilement les formulaires. Il prend un objet comme argument optionnel. L'exemple de la documentation montre toutes ses propriétés ainsi que leurs valeurs par défaut.

Documentation: https://react-hook-form.com/docs/useform

```jsx
...
import { Controller, useForm } from 'react-hook-form';
import { loginFormSchema } from './LoginForm.schema';
import { yupResolver } from '@hookform/resolvers/yup';

const LoginForm = () => {
    const { control, handleSubmit, formState } = useForm({
        mode: 'onChange',
        resolver: yupResolver(loginFormSchema), // Here we tell react-hook-form to use our validation schema created with yup or any validation library
        defaultValues: {
            email: '',
            password: '',
        }, // You can set default values or not
    });
    const { isDirty, isValid } = formState; // The state of the form

    const onSubmit = (data) => {
        // Do something
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="email"
                render={({ field, fieldState: { error } }) => (
                    <Label>
                        Email
                        <input {...field} type="text" />
                    </Label>
                )}
            />
            <Controller
                control={control}
                name="password"
                render={({ field, fieldState: { error } }) => (
                    <Label>
                        Mot de passe
                        <input {...field} type="password" />
                    </Label>
                )}
            />
            <button disabled={!isDirty || !isValid} type="submit">
                Se connecter
            </button>
        </Form>
    );
};
...
export default LoginForm;
```

`handleSubmit` est une méthode qui ne se déclenche que si le formulaire est valide et donc respecte le schéma de validation. On peut récupérer les données submit en callback de cette fonction, ainsi il est possible de les récupérer dans notre méthode custom `onSubmit`

## Controller

Cette bibliothèque englobe les composants non contrôlés et les entrées HTML natives. Cependant, il est difficile d'éviter de travailler avec des composants contrôlés externes tels que React-Select, AntD et MUI. Pour simplifier cela, la librairie fournit un composant wrapper, `Controller`, pour rationaliser le processus d'intégration tout en laissant la liberté d'utiliser un enregistrement personnalisé.

Voici un exemple :

```jsx
 <Controller
    control={control}
    // the name prop should match the name specified in defaultValues if those are settled
    name="email"
    // render your input
    render={({ field, fieldState: { error } }) => (
        <Label> 
            Email
            <input {...field} type="text" />
        </Label>
    )}
/>
```