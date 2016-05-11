SimpleSchema.messages({
    required: "[label] est un champ requis",
    "passwordMismatch": "Les mots de passes ne correspondent pas",
    maxNumber: "[label] ne peut excéder [max]",
    regEx: [
        {msg: "[label] ne correspond pas à ce qui est attendu"},
        {exp: SimpleSchema.RegEx.Email, msg: "[label] doit être une adresse mail valide"}
    ],
    alreadyExist: "[label] existe déjà"
});

SimpleSchema.RegEx.Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
