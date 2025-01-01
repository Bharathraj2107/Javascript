const myForm=document.getElementById('myForm');
const user=document.getElementById("name");
const email=document.getElementById("email");
const result=document.querySelector("#result");

let users=[];
//console.log(users)
//read users data
const URL="http://localhost:3000";

//Generate Random ID
const getRandomId=()=>{
    let randomId=Math.floor(Math.random()*1000);
    console.log(randomId);
    return randomId;
};
let editable=false;
let userId="";
//create user data
function createUser(user){
    let exactEmail=users.find(item=>item.email==user.email);
    if(exactEmail){
        alert("user is already registered ,Email exists.");
    }else{
        fetch(`${URL}/register`,{//here register is the body we are inserting it in the string type
            method:"POST",
            headers:{
                "content-Type":"application/json",
            },
            body:JSON.stringify(user)
        }).then(res=>{
            alert("user created successfully");
            setTimeout(()=>{
                window.location.reload();},3000);
            }).catch((error)=>{
                console.log(error.message);//if any error it will be present here
            });
    }
};
//Submit Form
myForm.addEventListener("submit",function(e){
    e.preventDefault();
    if(editable===false){//editable means all  the data will come in the field if not means we are inserting new data
        //create New User
        let id=String(getRandomId());
        const data={
            id,
            name:user.value,
            email:email.value,
        };
        console.table(data);
        createUser(data);
    }
    else{
        const data={
            name:user.value,
            email:email.value,
        };
        updateUser(data,userId)
    }
});
//GET ALL USERS
const getUsers= async ()=> {
    await fetch(`${URL}/register`)
    .then((out)=>out.json())
    .then((res)=>{
        //console.log(res)
        users.push(...res);
        printInTable(res);
    })
    .catch();
};
//self Invoke Function
(function(){
    getUsers();
})();

//printing in Table
    function printInTable(user){
        console.log("Printing",user);
        user.forEach((item) => {
            let tr=document.createElement("tr");
            let id=document.createElement("td");
            let name=document.createElement("td");
            let email=document.createElement("td");
            let action=document.createElement("td");

            id.textContent=item.id;
            name.textContent=item.name;
            email.textContent=item.email;
            action.innerHTML=`<button class="btn btn-outline-success" onclick="edit(this)">Edit</button>
            <button class="btn btn-outline-danger" onClick="deleteUser(${item.id})">Delete</button>`;
            
            tr.appendChild(id);
            tr.appendChild(name);
            tr.appendChild(email);
            tr.appendChild(action);

            result.appendChild(tr);
    });

}
//Edit User
function edit(e) {
    /* console.log("Edit", e);
    console.log("Edit", typeof e); */
  
    editable = true;
  
    let selUser = e.parentElement.parentElement;
    /* console.log(selUser);
    console.log(selUser.children[0].innerHTML); */
  
    userId = selUser.children[0].innerHTML; // Value taking from first child element of tr
    user.value = selUser.children[1].innerHTML;
    email.value = selUser.children[2].innerHTML;
  }

  //Update user
  const updateUser=async(data,id)=>{
     console.log("Update Data=",data);
     console.log("Update ID=",id);
     
    await fetch(`${URL}/register/${id}`,{//here register is the body we are inserting it in the string type
        method:"PUT",
        headers:{
            "content-Type":"application/json",
        },
        body:JSON.stringify(data)
    }).then(res=>{
        alert("user Updated successfully");
        setTimeout(()=>{
            window.location.reload();
        },3000);
        }).catch((error)=>{
            console.log(error.message);//if any error it will be present here
        });
  }

  // Delete User
function deleteUser(id) {
    console.log("Delete User Id = ", id);
  
   
    if (confirm(`Are you sure to delete user ID = ${id}`)) {
        fetch(`${URL}/register/${id}`, {
          method: "DELETE",
        }).then((res) =>{
            alert("User Deleted Successfully")
      setTimeout(()=>{
          window.location.reload();        
      },3000)
      }).catch((error) => {console.log(error.message);});
      }else{
          alert("User is not updated")
      }
  }