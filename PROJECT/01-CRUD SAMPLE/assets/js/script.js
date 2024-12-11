let fullName=document.getElementById("fullname");
let empCode=document.getElementById("empCode");
let salary=document.getElementById("salary");
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
    // console.log(tbody)
    // console.log( typeof tbody)
    // console.log(tbody[0])
    // console.log( typeof tbody[0])
    // console.log(tbody.length)
    // console.log( typeof tbody.length)
    newRow.insertCell(0).innerHTML=newUser.fullName;
    newRow.insertCell(1).innerHTML=newUser.empCode;
    newRow.insertCell(2).innerHTML=newUser.salary;
    newRow.insertCell(3).innerHTML=newUser.city;
    newRow.insertCell(4).innerHTML=
    `<button type='button' onclick='editUser(this)'>Edit</button>
    <button type='button' onclick='deleteUser(this)'>Delete</button>`;
}

//Edit User
function editUser(element){
    // console.log(element)
    selectedRow=element.parentElement.parentElement;
    fullName.value = selectedRow.cells[0].innerHTML;
    empCode.value = selectedRow.cells[1].innerHTML;
    salary.value = selectedRow.cells[2].innerHTML;
    city.value = selectedRow.cells[3].innerHTML;
    // console.log(selectedRow);

    
}
//Read a data from the form field
function readFormData(){
    let formData={} ;//key :value=>property
     formData.fullName=fullName.value;
     
     formData["empCode"]=empCode.value;
     formData["salary"]=salary.value;
     formData["city"]=city.value;
    //we want to clear  the data
     fullName.value="";
     empCode.value="";
     salary.value="";
     city.value="";

     return formData;
    
}
function updateRecord(updateRecord){
    selectedRow.cells[0].innerHTML=updateRecord.fullName;
    selectedRow.cells[1].innerHTML=updateRecord.empCode;
    selectedRow.cells[2].innerHTML=updateRecord.salary;
    selectedRow.cells[3].innerHTML=updateRecord.city;   
};
function deleteUser(element){
    if(confirm("Are you sure want to delete this record?")){
        let row=element.parentElement.parentElement;
    table.deleteRow(row.rowIndex);
    }else{
        alert("Delete operation failed");
    }

}