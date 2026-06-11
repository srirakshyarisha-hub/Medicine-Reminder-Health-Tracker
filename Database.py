import sqlite3

conn = sqlite3.connect('health_tracker.db')
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS medicines(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    medicine_name TEXT,
    dosage TEXT,
    reminder_time TEXT
)
""")

conn.commit()
conn.close()

print("Database Created Successfully")
