nav_buttons_blue = document.getElementsByClassName("nav-buttons-blue");
colorFromCSS = getComputedStyle(document.documentElement).getPropertyValue("--dark_blue")
for(let i = 0; i < nav_buttons_blue.length; i++)
    nav_buttons_blue[i].style.backgroundColor = colorFromCSS;

navButtonRight = document.createElement("div")
navButtonRight.innerHTML = `<i class="fa-solid fa-angle-right"></i>`
navButtonRight.classList.add("navButton")
navButtonRight.classList.add("show")
navButtonRight.classList.add("right")
document.body.appendChild(navButtonRight)

navButtonLeft = document.createElement("div")
navButtonLeft.innerHTML = `<i class="fa-solid fa-angle-left"></i>`
navButtonLeft.classList.add("navButton")
navButtonLeft.classList.add("left")
document.body.appendChild(navButtonLeft)

containerPage = document.getElementById("container")
header = document.getElementById("header")

indexPages = 0

function slidePagesToRight() {
    indexPages++;
    if(indexPages == 4) {
        navButtonRight.classList.remove("show")
        navButtonLeft.classList.add("show")
        return
    }
    else 
    {
        navButtonRight.classList.add("show")
        navButtonLeft.classList.add("show")
    }
    
}
function slidePagesToLeft() {
    indexPages--;
    if(indexPages == 0) {
        navButtonLeft.classList.remove("show")
        navButtonRight.classList.add("show")
        return
    }
    else {
        navButtonLeft.classList.add("show")
        navButtonRight.classList.add("show")
    }
    
}

navButtonRight.addEventListener("click", () => {
    slidePagesToRight()
    console.log(indexPages)
    containerPage.style.right = `calc(${indexPages} * 100vw)`
})
navButtonLeft.addEventListener("click", () => { 
    slidePagesToLeft()
    console.log(indexPages)
    containerPage.style.right = `calc(${indexPages} * 100vw)`
})

navButtons = document.getElementsByClassName("nav-buttons")
for(let i = 0; i < navButtons.length; i++)
    navButtons[i].addEventListener("click", () => {
        indexPages = i;
        if(indexPages == 0) indexPages = 4;
        else
            indexPages = indexPages - 1;
        
        if(indexPages > 4)
            indexPages -= 4;
        console.log(indexPages)
        if(indexPages == 0) {
            navButtonLeft.classList.remove("show")
            navButtonRight.classList.add("show")
        }
        else if(indexPages == 4) {
            navButtonRight.classList.remove("show")
            navButtonLeft.classList.add("show")
        }
        else {
            navButtonLeft.classList.add("show")
            navButtonRight.classList.add("show")
        }
        containerPage.style.right = `calc(${indexPages} * 100vw)`
});

let addLetterTimer;
text1Tag = document.getElementById("text1")
text1 = text1Tag.innerText;
console.log(text1)
text1Tag.innerText = "";
indexText1 = 0
spaceCounter1 = 0

addLetterTimer = setInterval(() => {
    showLetter(text1)
}, 10)

function showLetter(t1) {
    if(indexText1 < t1.length) {
        if(t1[indexText1] == " ")
        {
            spaceCounter1++
            if(spaceCounter1 % 5 == 0)
                text1Tag.innerText += "\n"
        }
        text1Tag.innerText += t1[indexText1]
        indexText1++
    }
    if(indexText1 == t1.length) {
        clearInterval(addLetterTimer)
        indexText1 = 0
    }
}

const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");

const errorFirstName = document.getElementById("errorFirstName");
const errorLastName = document.getElementById("errorLastName");
const errorEmail = document.getElementById("errorEmail");

function validateFirstName() {
    const regex = /^[A-ZĂÂÎȘȚ][a-zăâîșț]*$/;
    const firstName = firstNameInput.value;

    if (firstName === "") {
        errorFirstName.textContent = "";
        errorFirstName.classList.remove("show");
    } else if (!regex.test(firstName)) {
        errorFirstName.textContent = "Prenumele trebuie să înceapă cu literă mare.";
        errorFirstName.classList.add("show");
    } else {
        errorFirstName.textContent = "";
        errorFirstName.classList.remove("show");
    }
}

function validateLastName() {
    const regex = /^[A-ZĂÂÎȘȚ][a-zăâîșț]*$/;
    const lastName = lastNameInput.value;

    if (lastName === "") {
        errorLastName.textContent = "";
        errorLastName.classList.remove("show");
    } else if (!regex.test(lastName)) {
        errorLastName.textContent = "Numele de familie trebuie să înceapă cu literă mare.";
        errorLastName.classList.add("show");
    } else {
        errorLastName.textContent = "";
        errorLastName.classList.remove("show");
    }
}

function validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = emailInput.value;

    if (email === "") {
        errorEmail.textContent = "";
        errorEmail.classList.remove("show");
    } else if (!regex.test(email)) {
        errorEmail.textContent = "Introduceți un e-mail valid.";
        errorEmail.classList.add("show");
    } else {
        errorEmail.textContent = "";
        errorEmail.classList.remove("show");
    }
}

firstNameInput.addEventListener("input", validateFirstName);
lastNameInput.addEventListener("input", validateLastName);
emailInput.addEventListener("input", validateEmail);

const form = document.getElementById("myForm");

function saveToLocalStorage() {
    const formData = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
}

function restoreFromLocalStorage() {
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData) {
        firstNameInput.value = savedData.firstName || "";
        lastNameInput.value = savedData.lastName || "";
        emailInput.value = savedData.email || "";
    }
}

function clearLocalStorage() {
    localStorage.removeItem("formData");
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearLocalStorage(); 
    alert("Formular trimis cu succes și datele au fost șterse din LocalStorage!");
});

[firstNameInput, lastNameInput, emailInput].forEach((input) => {
    input.addEventListener("input", saveToLocalStorage);
});

window.addEventListener("DOMContentLoaded", restoreFromLocalStorage);

emailjs.init('SMZR39GBQ_ALxljaV');

 function sendEmail(event) {
     event.preventDefault();

     validateFirstName();
     validateLastName();
     validateEmail();

     if (errorFirstName.textContent || errorLastName.textContent || errorEmail.textContent) {
         alert("Completați corect toate câmpurile înainte de trimitere!");
         return;
     }

     emailjs.sendForm('service_o543g4g', 'template_l3oh45o', form)
         .then(function () {
             alert('Mesajul a fost trimis cu succes!');
             form.reset();
             clearLocalStorage();
         }, function (error) {
             alert('A apărut o eroare la trimitere: ' + JSON.stringify(error));
         });
}

 form.addEventListener("submit", sendEmail);

window.onload = function() {
    const loggedInUser = localStorage.getItem("loggedInUser");
  
    if (loggedInUser) {
      document.getElementById("loginForm").style.display = "none"; 
      document.getElementById("errorMessage").style.display = "none";  
  
      const welcomeText = document.getElementById("welcomeText");
      welcomeText.innerHTML = `Welcome ${loggedInUser}!`;  
  
      document.getElementById("welcomeMessage").style.display = "block";  
      document.getElementById("logoutButton").style.display = "inline";  
    } else {
      document.getElementById("loginForm").style.display = "block";
    }
  };
  
  document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();  
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    fetch("users.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Nu s-a putut încărca fișierul JSON.");
        }
        return response.json();
      })
      .then((users) => {
        const user = users.find(
          (user) => user.username === username && user.password === password
        );
  
        if (user) {
          document.getElementById("loginForm").style.display = "none";  
          document.getElementById("errorMessage").style.display = "none"; 
  
          const welcomeText = document.getElementById("welcomeText");
          welcomeText.innerHTML = `Welcome ${user.username}!`; 
  
          document.getElementById("welcomeMessage").style.display = "block";  
          document.getElementById("logoutButton").style.display = "inline";  
          localStorage.setItem("loggedInUser", user.username);
        } else {
          document.getElementById("errorMessage").style.display = "block";
        }
      })
      .catch((error) => {
        console.error("Eroare:", error);
      });
  });
  
document.getElementById("logoutButton").addEventListener("click", function() {
    localStorage.removeItem("loggedInUser");
  
    document.getElementById("welcomeMessage").style.display = "none";
  
    document.getElementById("loginForm").style.display = "block";

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
});
  

const loginTitle = document.getElementById("loginTitle");

function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function changeStyles() {
    loginTitle.style.color = getRandomColor();
}

setInterval(changeStyles, 500);