let fullName=document.getElementById("fullname");
let empCode=document.getElementById("empCode");
let Salary=document.getElementById("salary");
let city=document.getElementById("city");
let span=document.getElementById("fullNameValidationError");
let table=document.getElementById("employeeList");

function validateFullName(){
    let isValid=true
    if(fullName.value===""){
        isValid=false
        span.classList.remove("hide");
    }
    else{
        isValid=true
        if(!span.classList.contains("hide")){
            span.classList.add("hide");
     }
    }
    return isValid;
}
let selectedRow=null
function onSubmitForm(){
    if(validateFullName()){
       let formdata=readFormData();
       if(selectedRow===null){
        insertNewRecord(formdata);
       }else{
        updateRecord(formdata);
       }
    }
  
}
function insertNewRecord(newUser){
    let tbody=table.getElementsByTagName("tbody")[0];
    let newRow=tbody.insertRow();
    console.log(tbody)
    console.log( typeof tbody)
    console.log(tbody[0])
    console.log( typeof tbody[0])
    console.log(tbody.length)
    console.log( typeof tbody.length)
    newRow.insertCell(0).innerHTML="FullName";
    newRow.insertCell(1).innerHTML="empCode";
    newRow.insertCell(2).innerHTML="salary";
    newRow.insertCell(3).innerHTML="city";
    newRow.insertCell(4).innerHTML=
    `<button type='button' onclick='editUser(this)'>Edit</button>
    <button type='button' onclick='deleteUser()'>Delete</button>`;
}

//Edit User
function editUser(element){
    console.log(element)
    selectedRow=element.parentElement.parentElement;
    console.log(selectedRow);

    
}
//Read a data from the form field
function readFormData(){
    let formData={} ;//key :value=>property
     formData.fullName=fullName.value;
     
     formData["empCode"]=empCode.value;
     formData["salary"]=salary.value;
     formData["city"]=city.value;

     fullName.value="";
     empCode.value="";
     salary.value="";
     city.value="";

     return formData;
    
}