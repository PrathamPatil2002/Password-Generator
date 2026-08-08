/* =========================
   GET HTML ELEMENTS
========================= */

const passwordInput =
    document.getElementById("password");

const lengthInput =
    document.getElementById("length");

const lengthValue =
    document.getElementById("lengthValue");

const uppercase =
    document.getElementById("uppercase");

const lowercase =
    document.getElementById("lowercase");

const numbers =
    document.getElementById("numbers");

const symbols =
    document.getElementById("symbols");

const generateBtn =
    document.getElementById("generateBtn");

const copyBtn =
    document.getElementById("copyBtn");

const showBtn =
    document.getElementById("showBtn");

const themeBtn =
    document.getElementById("themeBtn");

const message =
    document.getElementById("message");

const strengthText =
    document.getElementById("strengthText");

const strengthFill =
    document.getElementById("strengthFill");


/* =========================
   CHARACTER SETS
========================= */

const characters = {

    uppercase:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

    lowercase:
        "abcdefghijklmnopqrstuvwxyz",

    numbers:
        "0123456789",

    symbols:
        "!@#$%^&*()_+-=[]{}|;:,.<>?"

};


/* =========================
   UPDATE LENGTH
========================= */

lengthInput.addEventListener(
    "input",
    () => {

        lengthValue.textContent =
            lengthInput.value;

    }
);


/* =========================
   GENERATE PASSWORD
========================= */

function generatePassword() {

    const length =
        Number(lengthInput.value);

    let availableCharacters = "";

    let password = "";


    /* Add selected characters */

    if (uppercase.checked) {

        availableCharacters +=
            characters.uppercase;

    }


    if (lowercase.checked) {

        availableCharacters +=
            characters.lowercase;

    }


    if (numbers.checked) {

        availableCharacters +=
            characters.numbers;

    }


    if (symbols.checked) {

        availableCharacters +=
            characters.symbols;

    }


    /* Check if nothing is selected */

    if (
        availableCharacters.length === 0
    ) {

        passwordInput.value = "";

        message.textContent =
            "Please select at least one option.";

        message.style.color = "#dc2626";

        updateStrength("");

        return;

    }


    /* Generate password */

    for (
        let i = 0;
        i < length;
        i++
    ) {

        const randomIndex =
            Math.floor(
                Math.random() *
                availableCharacters.length
            );

        password +=
            availableCharacters[randomIndex];

    }


    /* Put password in input */

    passwordInput.value =
        password;


    /* Update strength */

    updateStrength(password);


    /* Show success message */

    message.textContent =
        "Password generated successfully.";

    message.style.color =
        "#16a34a";

}


/* Generate button */

generateBtn.addEventListener(
    "click",
    generatePassword
);


/* =========================
   LIVE STRENGTH CHECK
========================= */

passwordInput.addEventListener(
    "input",
    () => {

        updateStrength(
            passwordInput.value
        );

        message.textContent = "";

    }
);


/* =========================
   PASSWORD STRENGTH
========================= */

function updateStrength(password) {

    let score = 0;


    /* Empty password */

    if (!password) {

        strengthText.textContent =
            "-";

        strengthFill.style.width =
            "0%";

        strengthFill.style.background =
            "transparent";

        return;

    }


    /* Length */

    if (password.length >= 8) {

        score++;

    }


    if (password.length >= 12) {

        score++;

    }


    /* Uppercase */

    if (/[A-Z]/.test(password)) {

        score++;

    }


    /* Number */

    if (/[0-9]/.test(password)) {

        score++;

    }


    /* Symbol */

    if (
        /[^A-Za-z0-9]/.test(password)
    ) {

        score++;

    }


    /* Weak */

    if (score <= 2) {

        strengthText.textContent =
            "Weak";

        strengthText.style.color =
            "#dc2626";

        strengthFill.style.width =
            "30%";

        strengthFill.style.background =
            "#dc2626";

    }


    /* Medium */

    else if (score <= 4) {

        strengthText.textContent =
            "Medium";

        strengthText.style.color =
            "#f59e0b";

        strengthFill.style.width =
            "65%";

        strengthFill.style.background =
            "#f59e0b";

    }


    /* Strong */

    else {

        strengthText.textContent =
            "Strong";

        strengthText.style.color =
            "#16a34a";

        strengthFill.style.width =
            "100%";

        strengthFill.style.background =
            "#16a34a";

    }

}


/* =========================
   COPY PASSWORD
========================= */

copyBtn.addEventListener(
    "click",
    async () => {

        const password =
            passwordInput.value;


        if (!password) {

            message.textContent =
                "Generate or enter a password first.";

            message.style.color =
                "#dc2626";

            return;

        }


        try {

            await navigator.clipboard.writeText(
                password
            );


            message.textContent =
                "Password copied to clipboard!";

            message.style.color =
                "#16a34a";


            /* Change button temporarily */

            copyBtn.textContent =
                "Copied!";


            setTimeout(
                () => {

                    copyBtn.textContent =
                        "Copy";

                },
                1500
            );


        } catch (error) {

            message.textContent =
                "Unable to copy password.";

            message.style.color =
                "#dc2626";

        }

    }
);


/* =========================
   SHOW / HIDE PASSWORD
========================= */

showBtn.addEventListener(
    "click",
    () => {

        if (
            passwordInput.type ===
            "password"
        ) {

            passwordInput.type =
                "text";

            showBtn.textContent =
                 "🔓";

            showBtn.title =
                "Hide password";

        }

        else {

            passwordInput.type =
                "password";

            showBtn.textContent =
                "🔒";

            showBtn.title =
                "Show password";

        }

    }
);


/* =========================
   DARK / LIGHT MODE
========================= */

themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );


        const darkMode =
            document.body.classList.contains(
                "dark"
            );


        if (darkMode) {

            themeBtn.textContent =
                "☀️";

            themeBtn.title =
                "Switch to light mode";

        }

        else {

            themeBtn.textContent =
                "🌙";

            themeBtn.title =
                "Switch to dark mode";

        }

    }
);


/* =========================
   INITIAL PASSWORD
========================= */

generatePassword();