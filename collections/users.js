SimpleSchema.messages({
    required: "[label] est requis",
    "passwordMismatch": "Les mots de passes ne correspondent pas",
    maxNumber: "[label] ne peut excéder [max]",
    regEx: [
        {exp: SimpleSchema.RegEx.Email, msg: "[label] doit être une adresse mail valide"}
    ]
});