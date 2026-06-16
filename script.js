document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("medicineForm");
    const tableBody = document.getElementById("tableBody");

    // Load data
    loadMedicines();

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            name: document.getElementById("name").value,
            dosage: document.getElementById("dosage").value,
            time: document.getElementById("time").value,
            frequency: document.getElementById("frequency").value
        };

        await fetch("/add_medicine", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        form.reset();
        loadMedicines();
    });

    async function loadMedicines() {
        const res = await fetch("/get_medicines");
        const data = await res.json();

        tableBody.innerHTML = "";

        data.forEach(med => {
            const row = `
                <tr>
                    <td>${med.name}</td>
                    <td>${med.dosage}</td>
                    <td>${med.time}</td>
                    <td>${med.frequency}</td>
                    <td>
                        <a href="/delete/${med.id}">Delete</a>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }

});
