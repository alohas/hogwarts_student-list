const template = document.querySelector("#myTemp").content;
const link = "https://petlatkea.dk/2019/students1991.json";
const parent = document.querySelector("ul.fulllist");
const modal = document.querySelector(".bg-modal");
const xbtn = document.querySelector("#close");
const dropdown = document.querySelector("#flist > select");
let studentData = [];
let filteredData = [];
document.querySelector("#reverse").disabled = true;

window.addEventListener("DOMContentLoaded", init(link));

function init(link) {
  fetch(link)
    .then(e => e.json())
    .then(data => {
      showData(data);
      studentData = data;
      filteredData = data;
    });
}
function showData(students) {
  parent.innerHTML = "";
  students.forEach(student => {
    let clone = template.cloneNode(true);
    //console.log(student.fullname);

    clone.querySelector("h3").textContent = student.fullname;
    clone.querySelector("h4").textContent = student.house;
    clone.querySelector("li").classList.add(student.house);
    clone.querySelector("li").setAttribute("id", student.fullname);
    //clone.querySelector("li").addEventListener("click", openModal(student.fullname));

    parent.appendChild(clone);
  });
}

document.addEventListener("click", function(e) {
  //console.log(e.target);
  if (e.target.nodeName == "LI") {
    const id = e.target.getAttribute("id");
    console.log(id);
    popModal(id);
  }
});

function popModal(idName) {
  modal.classList.remove("hide");
  //console.log(idName);
  console.log(studentData);
  let filteredStudent = studentData.filter(
    studentObject => studentObject.fullname === idName
  )[0];
  //console.log(filteredStudent);
  document.querySelector(".modal-name").textContent = filteredStudent.fullname;
  document.querySelector(".modal-house").textContent = filteredStudent.house;
}

xbtn.addEventListener("click", closeModal);

function closeModal() {
  modal.classList.add("hide");
}

dropdown.addEventListener("change", function() {
  //console.log(dropdown.value);
  if (dropdown.value == "All") {
    showData(studentData);
  } else {
    filteredData = studentData.filter(
      studentObject => studentObject.house === dropdown.value
    );
    //console.log(filteredData);
    showData(filteredData);
    document.querySelector("#reverse").disabled = true;
  }
});

document.querySelector("#fname").addEventListener("click", sortByF);
document.querySelector("#lname").addEventListener("click", sortByL);
document.querySelector("#reverse").addEventListener("click", reverseArray);

function sortByF() {
  filteredData = filteredData.sort(function(a, b) {
    return a.fullname.localeCompare(b.fullname);
  });
  //console.log(filteredData);
  showData(filteredData);
  document.querySelector("#reverse").disabled = false;
}

function sortByL() {
  filteredData = filteredData.sort(function(a, b) {
    let lastNameA = a.fullname.split(" ")[1];
    //console.log(lastNameA);
    let lastNameB = b.fullname.split(" ")[1];
    return lastNameA.localeCompare(lastNameB);
  });
  //console.log(filteredData);
  showData(filteredData);
  document.querySelector("#reverse").disabled = false;
}

function reverseArray() {
  filteredData = filteredData.reverse();
  showData(filteredData);
}

//event listener for "DOMContentLoaded" to start init function

//function init starts fetch function by parsin the link to JSON

//Fetch function that gets the data from a JSON

//function that displays full list of students

//adding an event listener to every name for Modal

//function that opens modal and fethes data for specific student

//function for "X" button to close the modal

//adding event listeners for sorting buttons

//function for sorting by first name
//if first name, then sort by alphabetical order

//fucntion for sorting by last name
//if last name, then sort by alphabetical order

//adding an event listener for dropdown list to chose house
//filter student by house name or all
// if house == house, do nothing, else add class list add "hide"
