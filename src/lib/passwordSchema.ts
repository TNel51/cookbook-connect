import PasswordValidator from "password-validator";

export const passwordSchema = new PasswordValidator();
passwordSchema
    .is().min(8, "At Least 8 Characters") // Minimum length 8
    .is()
    .max(100, "At Most 100 Characters") // Maximum length 100
    .has()
    .uppercase(undefined, "Uppercase Letter") // Must have uppercase letters
    .has()
    .lowercase(undefined, "Lowercase Letter") // Must have lowercase letters
    .has()
    .digits(2, "Two Digits") // Must have at least 2 digits
    .has()
    .not()
    .spaces(undefined, "No Spaces"); // Should not have spaces
