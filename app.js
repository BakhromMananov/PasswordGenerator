
const lengthSlider = document.querySelector('.pass-length input'),
options = document.querySelectorAll('.option input'), 
passwordInput =document.querySelector('.input-box input'),
passIndicator=document.querySelector('.pass-indicator'),
copy = document.querySelector('.input-box span')
generateBtn= document.querySelector('.generate-btn');

let excludeDuplicate; 

const characters = {
    lowercase:"abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%|[](){}:;.,*+-#@<>~",
}

const generatePassword = () => {
    let staticPassword= "",
    randomPassword="", 
    passLength=lengthSlider.value;

    options.forEach(option => {
        if(option.checked !== "exc-duplicate" && option.id !=="spaces" ) {
            staticPassword +=characters[option.id]; 
        } else if (option.id === "spaces") {
            staticPassword += `${staticPassword} `;
        } else {
            excludeDuplicate = true; 
        }
    })

    for(let i=0; i< passLength; i++ ) {
        // get rand char from stat pass
         let randomChar =staticPassword[Math.floor(Math.random() * staticPassword.length)]; 
        if(excludeDuplicate) { // exclude if exdup is true
            !randomPassword.includes(randomChar) || randomChar == "" ? randomPassword += randomChar : i--;
        } else {
            randomPassword += randomChar
        }
    }
    passwordInput.value = randomPassword; 
    console.log(passwordInput.value)
}

const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong"; 
}

const updateSlider = () => {
   document.querySelector('.pass-length span').innerText= lengthSlider.value; 
   generatePassword(); 
   updatePassIndicator(); 
}

updateSlider(); 

const copyPass = async (res, rej) => {
    await navigator.clipboard.writeText(passwordInput.value);
    if (res) {
        console.log(navigator.clipboard.writeText(passwordInput.value))
    } else if (rej) {
        if(error) {
            console.log(error)
        }
    }
   
   
}

copy.addEventListener('click', copyPass);
lengthSlider.addEventListener('input', updateSlider);
generateBtn.addEventListener('click', generatePassword)


// https://www.youtube.com/watch?v=fD8gm-DhjXk&list=PLpwngcHZlPadhRwryAXw3mJWX5KH3T5L3