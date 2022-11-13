import { setLocale } from "yup";

setLocale({
  mixed: {
    required: ({ label }) => `${label} is required.`,
  },
  string: {
    email: ({ label }) => `${label} is not valid.`,
    min: ({ label, min }) => `${label} must contain at least ${min} characters.`,
    max: ({ label, max }) => `${label} must contain at most ${max} characters.`,
    url: ({ label }) => `${label} is not valid.`,
  },
  number: {
    max: ({ label, max }) => `${label} must be less or equal to ${max}.`,
    min: ({ label, min }) => `${label} must be greater or equal to ${min}.`,
    positive: ({ label }) => `${label} must be a positive number.`,
    negative: ({ label }) => `${label} must be a negative number.`,
  },
});

export const urlRegex =
  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
export const phoneRegex = /^(\(?\+?0?\d{2}\)?)?(\s?-?\d){8,9}\d$/;
export const hasUpperRegex = /[A-Z]/;
export const hasLowerRegex = /[a-z]/;
export const hasDigitRegex = /[0-9]/;
