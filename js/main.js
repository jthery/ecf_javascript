// on récupère l'api sur le  lien http://api-students.popschool-lens.fr/api/promotions

// 3ieme
// afin de stocker les données JSON, nous devons déclarer un tableau vide;
var listPromo = [];

// 2ieme
// déclaration de ma variable, lié à mon ID dans le html
var myDiv = document.querySelector('#myDiv');

// 5ieme
// déclaration de mes variables, lié aux ID du html (form,input,button)
var addPromo = document.querySelector('#addPromo');
var btnAdd = document.querySelector('#btnAdd');

// 7 ième A : déclaration de l' ID du selecteur
var selectPromo = document.querySelector('#selectPromo');

// <-------------------
var btnchangePromo = document.querySelector('#btnchangePromo');
var btndeletePromo = document.querySelector('#btndeletePromo');
// ------------------

function getpromotion() {
// 1er
fetch("http://api-students.popschool-lens.fr/api/promotions")
    // api récupéré par la "response" pour être transformer en JSON
    .then(response => response.json())
    //  on récupère le JSON avec le .then pour en suite le mettre dans la promo
    .then(function (promo) {
        // console.log(promo); permet simplement de récupérer l'intégralité de L'API, alors que ce qui nous intéresse n'est que le tableau HYDRA:MEMBER
        console.log(promo);
        // console.log(promo['hydra:member']);
        listPromo = promo['hydra:member'];
        // console.log(listPromo);
        selectPromo.innerHTML = '';
        myDiv.innerHTML = '';
        // 4ieme
        // on va consulter avec forEach le tableau listPromo, et déclarer une fonction promotion afin de l'afficher sur notre site web
        listPromo.forEach(function (promotion) {
            myDiv.innerHTML += promotion.id + '.' + promotion.name + '<br>';
            // 7ième D : On ajoute l'ID du selecteur, afin que quand on appuie sur le boutton addPromo, puisse ajouter en même temps la promotion dans le selecteur
            selectPromo.innerHTML += '<option value="' + promotion.id +'">' + promotion.name + '</option>';
        });
    });
}
getpromotion();

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



btndeletePromo.addEventListener('click', function () {
    let selectPromo = document.querySelector('#selectPromo')
    console.log(selectPromo.value);
    // Je demande confirmation à l'utilisateur avant suppression 
    if (confirm("Supprimer la promo :" + selectPromo.value + " ?")) {
        // Utilsatar confirme la suppression
        supprPromo(selectPromo.value);
    }
})

function supprPromo(idPromo){
    fetch("http://api-students.popschool-lens.fr/api/promotions/" + idPromo,{
        method: 'DELETE'
    })
    .then(function(response){
        getpromotion();
    })
}

btnchangePromo.addEventListener('click', function() {
    let selectPromo = document.querySelector('#selectPromo')
    console.log(selectPromo.value);
    // Je demande confirmation à l'utilisateur avant changement
    if (confirm("Changer la promo :" + selectPromo.value + " ?")) {
        // Utilsateur confirme le changement
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
    .then(function(response){
        getpromotion();
    })
}
