import { defineMessages } from "react-intl";

export const FORM_VALIDATION_MESSAGE = defineMessages({
	invalid: { defaultMessage: "Ce champ est incorrect" },
	required: { defaultMessage: "Ce champ est requis" },
	minLength: {
		defaultMessage: "Ce champ doit contenir au moins {min} caractères",
	},
	maxLength: {
		defaultMessage: "Ce champ doit contenir moins de {max} caractères",
	},
	valuesDontMatch: { defaultMessage: "Les deux champs doivent correspondre" },
	differentValue: {
		defaultMessage: "Ce champ doit être différent",
	},
	isEmail: { defaultMessage: "Ce champ doit être une adresse e-mail valide" },
	noSpecialCharacters: {
		defaultMessage:
			"Ce champ ne doit contenir que des lettres, des chiffres ou des tirets",
	},
	isUrl: { defaultMessage: "Ce champ doit contenir une url valide" },
	isPhone: {
		defaultMessage: "Ce champ doit être un numéro de téléphone valide",
	},
	acceptedMimes: {
		defaultMessage: "Le fichier doit être de type: {acceptedMimes}",
	},
	imgMaxSize: {
		defaultMessage: "Le fichier doit peser moins de {max} Mo",
	},
	imgMinDimensions: {
		defaultMessage:
			"L'image doit avoir une dimension minimale de {minWidth}x{minHeight}",
	},
	isNumber: { defaultMessage: "Ce champ doit être un chiffre ou un nombre" },
	min: { defaultMessage: "La valeur de ce champ doit être supérieur à {min}" },
});
