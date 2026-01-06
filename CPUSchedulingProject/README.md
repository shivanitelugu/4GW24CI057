# CPU Scheduling Simulation Using Priority Queue in Java

## 📌 Project Overview
This project is a simulation of **CPU Priority Scheduling** implemented using **Java**.  
It demonstrates how an Operating System schedules processes based on their priority.

The project integrates concepts from:
- **Operating Systems**
- **Data Structures**
- **Java (OOPS)**

This single project is designed to be submitted for all three subjects.

---

## 🎯 Objectives
- To simulate CPU scheduling using the **Priority Scheduling Algorithm**
- To calculate **Waiting Time** and **Turnaround Time**
- To implement OS and DSA concepts using **Java**

---

## 🛠 Technologies Used
- **Programming Language:** Java
- **IDE:** Eclipse IDE
- **Data Structures:** ArrayList (Priority Queue behavior)
- **Version Control:** Git & GitHub

---

## 🧠 Concepts Covered

### 🔹 Operating System Concepts
- CPU Scheduling
- Priority Scheduling (Non-Preemptive)
- Process Management
- Waiting Time & Turnaround Time

### 🔹 Data Structures Concepts
- ArrayList
- Sorting based on priority
- Priority Queue logic

### 🔹 Java / OOPS Concepts
- Classes and Objects
- Constructors
- Encapsulation
- Collections Framework
- Scanner for input

---

## ⚙ How the Project Works
1. User enters the number of processes.
2. For each process, the user provides:
   - Process ID
   - Arrival Time
   - Burst Time
   - Priority
3. Processes are sorted based on priority.
4. CPU executes processes in priority order.
5. Waiting Time and Turnaround Time are calculated.
6. Average Waiting Time and Turnaround Time are displayed.

---

## 📥 Sample Input
3
P1 0 5 2
P2 1 3 4
P3 2 4 1

---

## 📤 Sample Output
PID AT BT PR WT TAT
P2 1 3 4 0 3
P1 0 5 2 3 8
P3 2 4 1 6 10

Average Waiting Time = 3.0
Average Turnaround Time = 7.0

<img width="376" height="297" alt="image" src="https://github.com/user-attachments/assets/0e075bb7-a218-4395-9721-e4ec3e4ff369" />
---

## 🚀 How to Run the Project
1. Open the project in **Eclipse IDE**
2. Navigate to `CPUScheduler.java`
3. Right-click → **Run As → Java Application**
4. Enter input in the console

---

## 📂 Project Structure

CPUSchedulingProject
└── src
└── CPUScheduler.java
---

## ✅ Advantages
- Simple and easy to understand
- Clear demonstration of OS scheduling
- Combines multiple subjects into one project

---

## ⚠ Limitations
- Non-preemptive scheduling only
- Console-based (no GUI)

---

## 🔮 Future Enhancements
- Add Round Robin Scheduling
- Add Preemptive Priority Scheduling
- Implement GUI using JavaFX
- Store process data in files

---

## 📌 Conclusion
This project successfully demonstrates CPU Priority Scheduling using Java and Data Structures.  
It helps in understanding how Operating Systems manage process execution efficiently.

---

## 👨‍🎓 Author
**T SHIVANI**  
Computer Science Student  
