var listStudent = [];

var btnAddStudent = document.querySelector('#btnAddStudent');
var btnchangeStudent = document.querySelector('#btnchangeStudent');
var btndeleteStudent = document.querySelector('#btndeleteStudent');
var addStudent = document.querySelector('#addStudent');
var selectStudent = document.querySelector('#selectStudent');
var myDivStudent = document.querySelector('#myDivStudent');




fetch("http://api-students.popschool-lens.fr/api/students")
    .then(response => response.json())
    .then(function() {
        console.log(student)
    })
