# Discrete Math Theory Project

This codebase is a collection of C programs related to discrete mathematics concepts, specifically graph theory and combinatorics.

---

## 1. Binary Subset Sum Calculator (`a1`)

-   **File:** `a1/a1Source.c`
-   **Purpose:** This program calculates and lists all binary strings of a given length `n` that contain a specific number of ones `k`, and whose elements (interpreted as their 1-based index if the bit is 1) sum up to a target value `m`.
-   **Input:** The user provides the length of the binary string (`n`), the desired number of ones (`k`), and the target sum (`m`).
-   **Output:** The program prints the binary strings that meet the criteria to a file named "output.txt" and also displays the total count of such strings.

---

## 2. Adjacency Matrices (`a2`)

-   **File:** `a2/a2.c`
-   **Purpose:** This program reads graph data from a file ("test.txt"), constructs an adjacency list representation of the graph, and then prints this representation. The code for graph creation and manipulation is noted as being taken from GeeksforGeeks.
-   **Input:**
    -   A file named `test.txt`. The first line of `test.txt` is expected to contain the number of vertices, the number of edges, and another integer (the purpose of the third integer `k` in `a2.c`'s main function is not fully utilized in the provided snippet, though it's read from the file).
    -   Subsequent lines in `test.txt` define the edges of the graph, with each pair of numbers representing an edge.
-   **Output:** The program prints the adjacency list of each vertex to the console.
-   **Helper File:** `a2/test.txt` provides sample input for the adjacency matrix program.

---

## 3. Graph Property Checker (`a3`)

-   **File:** `a3/a3.c`
-   **Purpose:** This program checks if a graph, defined by user input, contains certain properties for a k-subset of its vertices. Specifically, it checks for:
    -   Dominating Set
    -   Independent Set
    -   Clique
    -   Vertex Cover
-   **Input:** The user provides the number of vertices (`n`), the number of edges (`m`), the size of the subset to check (`k`), and then the pairs of vertices for each edge.
-   **Output:** For each of the properties (Dominating Set, Independent Set, Clique, Vertex Cover), the program prints whether such a set of size `k` exists in the graph. It does this by generating all k-subsets and testing each one.
