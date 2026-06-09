+------------------+
|      USER        |
+------------------+
| User_ID (PK)     |
| Name             |
| Email            |
| Password         |
| Phone            |
+------------------+
          |
          | 1
          |
          | M
+------------------+
|    MEDICINE      |
+------------------+
| Medicine_ID (PK) |
| User_ID (FK)     |
| Medicine_Name    |
| Dosage           |
| Frequency        |
+------------------+
          |
          | 1
          |
          | M
+------------------+
|    REMINDER      |
+------------------+
| Reminder_ID(PK)  |
| Medicine_ID(FK)  |
| Reminder_Time    |
| Reminder_Date    |
| Status           |
+------------------+

+------------------+
|  HEALTH_RECORD   |
+------------------+
| Record_ID (PK)   |
| User_ID (FK)     |
| Weight           |
| Blood_Pressure   |
| Heart_Rate       |
| Record_Date      |
+------------------+
          ^
          |
          | M
          |
          | 1
+------------------+
|      USER        |
+------------------+
