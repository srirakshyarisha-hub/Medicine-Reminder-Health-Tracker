const medicineForm = document.getElementById("medicineForm");
const medicineTable = document.getElementById("medicineTable");

let medicines = [];

medicineForm.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("name").value;
    const dosage = document.getElementById("dosage").value;
    const time = document.getElementById("time").value;
    const category = document.getElementById("category").value;

    medicines.push({
        name,
        dosage,
        time,
        category
    });

    displayMedicines();

    medicineForm.reset();
});

function displayMedicines(){

    medicineTable.innerHTML = "";

    medicines.forEach(medicine => {

        medicineTable.innerHTML += `
        <tr>
            <td>${medicine.name}</td>
            <td>${medicine.dosage}</td>
            <td>${medicine.time}</td>
            <td>${medicine.category}</td>
            <td>Pending</td>
        </tr>
        `;
    });

    document.getElementById("totalMedicines").innerText =
    medicines.length;

    document.getElementById("pendingMedicines").innerText =
    medicines.length;

    document.getElementById("takenMedicines").innerText = 0;
}

document.getElementById("darkModeBtn")
.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
