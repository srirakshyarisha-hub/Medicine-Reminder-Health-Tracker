from flask import Flask, render_template, request
import sqlite3

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/add_medicine', methods=['POST'])
def add_medicine():
    medicine_name = request.form['medicine_name']
    dosage = request.form['dosage']
    reminder_time = request.form['reminder_time']

    conn = sqlite3.connect('health_tracker.db')
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO medicines
    (medicine_name, dosage, reminder_time)
    VALUES (?, ?, ?)
    """, (medicine_name, dosage, reminder_time))

    conn.commit()
    conn.close()

    return "Medicine Added Successfully"

if __name__ == '__main__':
    app.run(debug=True)
