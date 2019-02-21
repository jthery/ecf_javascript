// on récupère l'api sur le  lien http://api-students.popschool-lens.fr/api/promotions
// we get the API on the link http://api-students.popschool-lens.fr/api/promotions


// 3ieme
// afin de stocker les données JSON, nous devons déclarer un tableau vide;
// in order to store the JSON data, we must declare an empty array;
var listPromo = [];

// 2ieme
// déclaration de ma variable, lié à mon ID dans le html
// declaration of my variable, linked to my ID in the html
var myDiv = document.querySelector('#myDiv');

// 5ieme
// déclaration de mes variables, lié aux ID du html (form,input,button)
// declaration of my variables, linked to the html IDs (form, input, button)
var addPromo = document.querySelector('#addPromo');
var btnAdd = document.querySelector('#btnAdd');

// 7 ième A : déclaration de l' ID du selecteur
// 7 th A: declaration of the selector ID
var selectPromo = document.querySelector('#selectPromo');

// <-------------------
var btnchangePromo = document.querySelector('#btnchangePromo');
var btndeletePromo = document.querySelector('#btndeletePromo');
// ------------------

function getpromotion() {
    // 1er on récupère l'api avec le lien, pas besoin d'indiquer de méthode, celle par défaut et "GET"
    // 1st we get the API with the link, no need to indicate method, the default one and "GET"
    fetch("http://api-students.popschool-lens.fr/api/promotions")
        // api récupéré par la "response" pour être transformer en JSON
        // API retrieved by the "response" to be transformed into JSON
        .then(response => response.json())
        //  on récupère le JSON avec le .then pour en suite le mettre dans la promo
        // we get the JSON with the .then and then put it in the promo
        .then(function (promo) {
            // console.log(promo); permet simplement de récupérer l'intégralité de L'API, alors que ce qui nous intéresse n'est que le tableau HYDRA:MEMBER
            // console.log (promo); simply allows to recover the entirety of the API, while what interests us is only the table HYDRA: MEMBER
            // console.log(promo);
            // console.log(promo['hydra:member']);
            listPromo = promo['hydra:member'];
            // console.log(listPromo);
            selectPromo.innerHTML = '';
            myDiv.innerHTML = '';
            // 4ieme
            // on va consulter avec forEach le tableau listPromo, et déclarer une fonction promotion afin de l'afficher sur notre site web
            // 4th
            // we will consult with forEach the table listPromo, and declare a promotion function to display it on our website
            listPromo.forEach(function (promotion) {
                myDiv.innerHTML += promotion.id + '.' + promotion.name + '<br>';
                // 7ième D : On ajoute l'ID du selecteur, afin que quand on appuie sur le boutton addPromo, puisse ajouter en même temps la promotion dans le selecteur
                // 7th D: We add the ID of the selector, so that when we press the button addPromo, can add at the same time the promotion in the selector
                selectPromo.innerHTML += '<option value="' + promotion.id +'">' + promotion.name + '</option>';
            });
        });
}
getpromotion();

// AJOUTER LA PROMOTION
// ADD PROMOTION
// 6ième <<<<<< 
btnAdd.addEventListener('click', createPromo)

function createPromo() {
    fetch("http://api-students.popschool-lens.fr/api/promotions", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                name: addPromo.value
            })
        })
        .then(response => response.json())
        .then(promo => {
            // console.log(promo.name + "créé")
            getpromotion();
        })
    // .catch()
}

// DELETE LA PROMOTION

btndeletePromo.addEventListener('click', function () {
    let selectPromo = document.querySelector('#selectPromo')
    console.log(selectPromo.value);
    // Je demande confirmation à l'utilisateur avant suppression 
    // I request confirmation from the user before deletion
    if (confirm("Supprimer la promo :" + selectPromo.value + " ?")) {
        // Utilisateur confirme la suppression
        // User confirms deletion
        supprPromo(selectPromo.value);
    }
})

function supprPromo(idPromo) {
    fetch("http://api-students.popschool-lens.fr/api/promotions/" + idPromo, {
            method: 'DELETE'
        })
        .then(function (response) {
            getpromotion();
        })
}

// CHANGER LA PROMOTION

btnchangePromo.addEventListener('click', function () {
    let selectPromo = document.querySelector('#selectPromo')
    console.log(selectPromo.value);
    // Je demande confirmation à l'utilisateur avant changement
    // I request confirmation from the user before change
    if (confirm("Changer la promo :" + selectPromo.value + " ?")) {
        // Utilsateur confirme le changement
        // User confirms the change
        modifyPromo(selectPromo.value);
    }
})

function modifyPromo(idPromo) {
    fetch("http://api-students.popschool-lens.fr/api/promotions/" + idPromo, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({
                name: addPromo.value
            })
        })
        .then(function (response) {
            getpromotion();
        })
}

// ajouter étudiant
// ADD STUDENT

// déclaration de ma liste d'étudiant
// statement of my student list
var listStudent = document.querySelector("#listStudent");

// déclaration de mon selecteur, et ajout d'une fonction.
// declare my selector, and add a function.
document.querySelector("#selectPromo").addEventListener("change", loadPromo);

function loadPromo(event) {
    // on va récupère l'api promotion pour le mettre dans le selecteur
    // we'll get the promotion API to put it in the selector
    fetch("http://api-students.popschool-lens.fr/api/promotions/" + selectPromo.value)
        .then(r => r.json())
        .then(
            promo => {
                // console.log(promo)
                //  on parcours les promotions, pour obtenir les étudiants avec un "forEach"
                // we run promotions, to get students with a "forEach"
                promo.students.forEach(
                    studentURL => {
                        // get the API, and add the url of the students
                    fetch("http://api-students.popschool-lens.fr" + studentURL)
                        .then(r => r.json())
                        .then(student => {
                            // on créer une liste
                            // create a list
                            var li = document.createElement("li");
                            // on ajoute la liste dans l'UL qui est égale à la variable "listStudent"
                            // add the list in the UL which is equal to the variable "listStudent"
                            listStudent.appendChild(li)
                            // on affiche le prénom et nom
                            // we display the first and last name
                            li.innerHTML = student.firstname + " " + student.lastname;
                        })
                })
        });
}

