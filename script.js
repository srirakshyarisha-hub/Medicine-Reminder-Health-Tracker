document.getElementById("medicineForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const dosage = document.getElementById("dosage").value;
    const time = document.getElementById("time").value;
    const category = document.getElementById("category").value;

    const table = document.getElementById("medicineTable");

    const row = `
        <tr>
            <td>${name}</td>
            <td>${dosage}</td>
            <td>${time}</td>
            <td>${category}</td>
            <td>Pending</td>
        </tr>
    `;

    table.innerHTML += row;

    document.getElementById("totalMedicines").innerText =
        table.rows.length;

    document.getElementById("pendingMedicines").innerText =
        table.rows.length;

    alert("Medicine Added Successfully!");

    this.reset();
});

document.getElementById("darkModeBtn").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});
