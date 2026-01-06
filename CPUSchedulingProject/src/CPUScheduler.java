import java.util.ArrayList;
import java.util.Scanner;

class Process {
    String pid;
    int arrivalTime;
    int burstTime;
    int priority;
    int waitingTime;
    int turnaroundTime;

    Process(String pid, int arrivalTime, int burstTime, int priority) {
        this.pid = pid;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.priority = priority;
    }
}

public class CPUScheduler {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        ArrayList<Process> processes = new ArrayList<>();

        System.out.print("Enter number of processes: ");
        int n = sc.nextInt();

        for (int i = 0; i < n; i++) {
            System.out.println("\nEnter details of Process " + (i + 1));
            System.out.print("Process ID: ");
            String pid = sc.next();
            System.out.print("Arrival Time: ");
            int at = sc.nextInt();
            System.out.print("Burst Time: ");
            int bt = sc.nextInt();
            System.out.print("Priority: ");
            int pr = sc.nextInt();

            processes.add(new Process(pid, at, bt, pr));
        }

        // Priority Scheduling (Higher priority number executes first)
        processes.sort((p1, p2) -> p2.priority - p1.priority);

        int currentTime = 0;
        int totalWaitingTime = 0;
        int totalTurnaroundTime = 0;

        System.out.println("\nPID\tAT\tBT\tPR\tWT\tTAT");

        for (Process p : processes) {

            if (currentTime < p.arrivalTime) {
                currentTime = p.arrivalTime;
            }

            p.waitingTime = currentTime - p.arrivalTime;
            p.turnaroundTime = p.waitingTime + p.burstTime;

            currentTime += p.burstTime;

            totalWaitingTime += p.waitingTime;
            totalTurnaroundTime += p.turnaroundTime;

            System.out.println(
                p.pid + "\t" +
                p.arrivalTime + "\t" +
                p.burstTime + "\t" +
                p.priority + "\t" +
                p.waitingTime + "\t" +
                p.turnaroundTime
            );
        }

        System.out.println("\nAverage Waiting Time = " +
                (float) totalWaitingTime / n);
        System.out.println("Average Turnaround Time = " +
                (float) totalTurnaroundTime / n);

        sc.close();
    }
}


