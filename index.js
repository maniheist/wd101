

let userForm=document.getElementById("mani-form");

const retrieveEntries=()=>{
    let entries=localStorage.getItem("user-entries");

    if(entries){
        entries=JSON.parse(entries);
    }else{
        entries=[]
    }
    return entries;
}
let userEntries=retrieveEntries();

const displayEntries=()=>{
    const entries=retrieveEntries(); 

    const tableEntries=entries.map((entry)=>{
        const nameCell=`<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailCell=`<td class='border px-4 py-2'>${entry.email}</td>`;
        const passwordCell=`<td class='border px-4 py-2'>${entry.password}</td>`;
        const dobCell=`<td class='border px-4 py-2'>${entry.dob}</td>`;
        const acceptTermsCell=`<td class='border px-4 py-2'>${entry.acceptedTermsAndConditions}</td>`;

        const row=`<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row
    }).join("\n")

    const table=`<table class="table-auto w-full"><tr>
    <th class="px-4 py-2">Name</th>
    <th class="px-4 py-2">Email</th>
    <th class="px-4 py-2">Password</th>
    <th class="px-4 py-2">Dob</th>
    <th class="px-4 py-2">Accepted terms?</th>
    </tr>${tableEntries} </table>`;

    let details=document.getElementById("user-entries");
    details.innerHTML=table;
}
const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    

    const acceptedTermsAndConditions = document.getElementById("terms").checked;

     var dobInput = document.getElementById("dob");
        var dob1 = new Date(dobInput.value);
        var minDate = new Date(dobInput.min);
        var maxDate = new Date(dobInput.max);
        var age = calculateAge(dob1);

        if (age < 18 || age > 55) {
          return; // Do not store in local storage
        }
    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTermsAndConditions
    };

    // Push the new entry into userEntries array
    userEntries.push(entry);

    // Save the updated userEntries array to local storage
    localStorage.setItem("user-entries", JSON.stringify(userEntries));

    // Display the updated entries immediately
    displayEntries();
};

// Attach the event listener
userForm.addEventListener("submit", saveUserForm);

// Display entries when the page loads
displayEntries();
