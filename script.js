const form = document.getElementById("medicineForm");
const tableBody = document.getElementById("medicineTableBody");

let medicines =
JSON.parse(localStorage.getItem("medicines")) || [];

displayMedicines();

form.addEventListener("submit", function(e){

    e.preventDefault();

    const medicine = {
        id: Date.now(),
        name: form.medicine_name.value,
        dosage: form.dosage.value,
        time: form.reminder_time.value,
        frequency: form.frequency.value,
        status: "Pending"
    };

    medicines.push(medicine);

    localStorage.setItem(
        "medicines",
        JSON.stringify(medicines)
    );

    displayMedicines();

    form.reset();
});

function displayMedicines(){

    tableBody.innerHTML = "";

    medicines.forEach((medicine)=>{

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${medicine.name}</td>
            <td>${medicine.dosage}</td>
            <td>${medicine.time}</td>

            <td class="${
                medicine.status === "Taken"
                ? "taken"
                : "pending"
            }">
                ${medicine.status}
            </td>

            <td>
                <button onclick="markTaken(${medicine.id})">
                    Taken
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteMedicine(${medicine.id})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function markTaken(id){

    medicines.forEach((medicine)=>{

        if(medicine.id === id){
            medicine.status = "Taken";
        }
    });

    localStorage.setItem(
        "medicines",
        JSON.stringify(medicines)
    );

    displayMedicines();
}

function deleteMedicine(id){

    medicines = medicines.filter(
        medicine => medicine.id !== id
    );

    localStorage.setItem(
        "medicines",
        JSON.stringify(medicines)
    );

    displayMedicines();
}

/* Browser Notification Reminder */

if ("Notification" in window) {

    Notification.requestPermission();

    setInterval(() => {

        const now = new Date();

        const currentTime =
            String(now.getHours()).padStart(2, "0")
            + ":" +
            String(now.getMinutes()).padStart(2, "0");

        medicines.forEach((medicine) => {

            if (
                medicine.time === currentTime &&
                medicine.status === "Pending"
            ) {

                new Notification(
                    "💊 Medicine Reminder",
                    {
                        body:
                        "Time to take " +
                        medicine.name
                    }
                );
            }

        });

    }, 60000);
}
