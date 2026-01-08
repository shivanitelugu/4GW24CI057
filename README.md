# CPU Scheduling Simulation Using Java and Data Structures

## 📌 Project Title
CPU Priority Scheduling Using Java with Data Structures

---

## 📖 Project Description
This project simulates **Non-Preemptive Priority CPU Scheduling** using **Java**.  
It demonstrates how an Operating System schedules processes based on priority while using multiple **Data Structures** to manage process execution.

The project is designed to cover concepts from:
- **Operating Systems**
- **Data Structures**
- **Java Programming**

---

## 🎯 Objectives
- To simulate CPU Priority Scheduling
- To calculate Waiting Time and Turnaround Time
- To demonstrate practical usage of Data Structures
- To integrate OS, DSA, and Java concepts in one project

---

## 🛠 Technologies Used
- **Language:** Java
- **IDE:** Eclipse IDE
- **Version Control:** Git & GitHub

---

## 🧠 Concepts Covered

### 🔹 Operating System Concepts
- CPU Scheduling
- Priority Scheduling (Non-Preemptive)
- Ready Queue
- Process Execution
- Waiting Time
- Turnaround Time

### 🔹 Data Structures Used
- **LinkedList** – Stores all processes initially
- **Queue** – Represents the Ready Queue
- **PriorityQueue** – Schedules processes based on priority
- **Stack** – Stores completed processes in LIFO order

### 🔹 Java / OOPS Concepts
- Classes and Objects
- Constructors
- Encapsulation
- Collections Framework
- Scanner for user input

---

## ⚙ How the Project Works
1. User enters the number of processes.
2. Process details are stored in a **LinkedList**.
3. Processes are moved to a **Queue (Ready Queue)** when they arrive.
4. CPU selects processes from a **Priority Queue** based on priority.
5. After execution, processes are stored in a **Stack**.
6. Waiting Time and Turnaround Time are calculated.
7. Average Waiting Time and Average Turnaround Time are displayed.

---

## 📥 Sample Input

Enter number of processes: 2
Process ID: P1
Arrival Time: 0
Burst Time: 5
Priority: 2

Process ID: P2
Arrival Time: 1
Burst Time: 3
Priority: 4

---

## 📤 Sample Output

PID AT BT PR WT TAT
P1 0 5 2 0 5
P2 1 3 4 4 7

Average Waiting Time = 2.0
Average Turnaround Time = 6.0

Completed Processes (Stack - LIFO):
P2
P1

---

## ▶ How to Run the Project
1. Open the project in **Eclipse IDE**
2. Navigate to `src → cpuscheduling → CPUScheduler.java`
3. Right-click → **Run As → Java Application**
4. Enter input in the console

---

## ✅ Advantages
- Clear demonstration of CPU Scheduling
- Strong use of Data Structures
- Easy to understand logic
- Suitable for academic submission

---

## ⚠ Limitations
- Console-based application
- Supports only non-preemptive scheduling

---

## 🔮 Future Enhancements
- Add Round Robin Scheduling
- Add Preemptive Priority Scheduling
- Implement GUI using JavaFX
- Store process data using files or database

---

## 📌 Conclusion
This project successfully demonstrates **CPU Priority Scheduling** using **Java and Data Structures**.  
It integrates **Operating Systems, Data Structures, and Java** into a single practical implementation.

---

## 👩‍🎓
**Shivani Telugu**  
CSE(AIML) Student




