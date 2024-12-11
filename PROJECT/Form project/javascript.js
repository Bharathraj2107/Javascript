let STID=document.getElementById("stid");

let Name=document.getElementById("name");

let Age=document.getElementById("age");

let Phone=document.getElementById("phone");

let DOB=document.getElementById("dob");


let details=document.getElementById("details");
console.log("hi")
let selectedRow=null
function onSubmitForm(){
    // console.log(STID.value);
    // console.log(Name.value);
    // console.log(Age.value);
    // console.log(Phone.value);
    // console.log(DOB.value);
    let FormData=readFormData();
    if(selectedRow==null){
        insertNewRecord(FormData);
    }
    else{
        updateRecord(FormData);
    }
     
}
function readFormData(){
    let FormData={};
    FormData["stid"]=STID.value;
    FormData["name"]=Name.value;
    FormData["age"]=Age.value;
    FormData["phone"]=Phone.value;
    FormData["dob"]=DOB.value;
   

    STID.value="";
    Name.value="";  
    Age.value="";
    Phone.value="";
    DOB.value="";

    return FormData;
}
function insertNewRecord(newUser){
    let tbody=details.getElementsByTagName("tbody")[0];
    let newRow=tbody.insertRow();
    newRow.insertCell(0).innerHTML=newUser.stid;
    newRow.insertCell(1).innerHTML=newUser.name;
    newRow.insertCell(2).innerHTML=newUser.age;
    newRow.insertCell(3).innerHTML=newUser.phone;
    newRow.insertCell(4).innerHTML=newUser.dob;
    newRow.insertCell(5).innerHTML=`<button id='edit' onclick='editUser(this)'>Edit</button><button id='delete'onclick='deleteUser(this)'>Delete</button>`;
    // here this  inside the button is the current button which is clicked when the user click the edit button on the table cell
}
function editUser(element){
    selectedRow=element.parentElement.parentElement;
    STID.value=selectedRow.cells[0].innerHTML;//selectedRow.cells[0] is the first cell of the selected row
    Name.value=selectedRow.cells[1].innerHTML;
    Age.value=selectedRow.cells[2].innerHTML;
    Phone.value=selectedRow.cells[3].innerHTML;
    DOB.value=selectedRow.cells[4].innerHTML;
}
function updateRecord(updateRecord){
    selectedRow.cells[0].innerHTML=updateRecord.stid;
    selectedRow.cells[1].innerHTML=updateRecord.name;
    selectedRow.cells[2].innerHTML=updateRecord.age;
    selectedRow.cells[3].innerHTML=updateRecord.phone;
    selectedRow.cells[4].innerHTML=updateRecord.dob;
    
}
function deleteUser(element){
    if(confirm("Are you sure you want to delete this record?")){
        let row=element.parentElement.parentElement;
    details.deleteRow(row.rowIndex);//here rowIndex based on the index it will delete the data from the row which we select
    }else{
        alert("Delete operation cancelled");
    }    
}