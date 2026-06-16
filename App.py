from flask import Flask, render_template, request, redirect, jsonify
import sqlite3

app = Flask(__name__)

# ---------- DATABASE ----------
def init_db():
    conn = sqlite3.connect("medicines.db")
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS medicines (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            dosage TEXT,
            time TEXT,
            frequency TEXT,
            status TEXT DEFAULT 'Pending'
        )
    """)

    conn.commit()
    conn.close()

init_db()

# ---------- HOME ----------
@app.route('/')
def home():
    return render_template('index.html')

# ---------- ADD MEDICINE ----------
@app.route('/add_medicine', methods=['POST'])
def add_medicine():
    data = request.json

    conn = sqlite3.connect("medicines.db")
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO medicines (name, dosage, time, frequency)
        VALUES (?, ?, ?, ?)
    """, (data['name'], data['dosage'], data['time'], data['frequency']))

    conn.commit()
    conn.close()

    return jsonify({"message": "Medicine added successfully"})

# ---------- GET MEDICINES ----------
@app.route('/get_medicines')
def get_medicines():
    conn = sqlite3.connect("medicines.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM medicines")
    rows = cursor.fetchall()

    conn.close()

    medicines = []
    for r in rows:
        medicines.append({
            "id": r[0],
            "name": r[1],
            "dosage": r[2],
            "time": r[3],
            "frequency": r[4],
            "status": r[5]
        })

    return jsonify(medicines)

# ---------- DELETE ----------
@app.route('/delete/<int:id>')
def delete(id):
    conn = sqlite3.connect("medicines.db")
    cursor = conn.cursor()

    cursor.execute("DELETE FROM medicines WHERE id=?", (id,))
    conn.commit()
    conn.close()

    return redirect('/')

# ---------- RUN ----------
if __name__ == '__main__':
    app.run(debug=True)
