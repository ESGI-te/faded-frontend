# Les custom hooks 

Les custom hooks doivent être placés dans le dossier `/hooks`.
Toujours préfixer par `use`.

Exemple:

```jsx
export const useCustomHook = (someData) => {
    
    const transformData = (data) => {
        // Do some transformation
    }
    const transformedData = transformData(data);

    return transformedData;
}
```