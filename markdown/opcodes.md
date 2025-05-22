# APT Malware Analysis & Classification Project

## Project Overview

This repository details a project on Advanced Persistent Threat (APT) malware. It covers:

1.  Collection of diverse APT malicious payloads (executables, documents).
2.  OpCode extraction from executables using reverse engineering.
3.  OpCode preprocessing and classification (SVM, KNN, Decision Tree) for APT group identification.
4.  Implementation and comparison of a deep learning (CNN) detection method.
    The goal is to identify and differentiate malware from various APT groups based on OpCode characteristics.

## Repository Structure & Submissions

Organized by submission, each in its own directory.

**Submission 2: Malicious Payload Collection**

-   **Objective:** Gather APT malware (executables, documents) attributed to specific groups.
-   **Directory:** `Submission-2/`
-   **Contents:**
    -   `executable_malware/`: Executable samples (e.g., `APT_X_malware1.exe`).
    -   `other_malicious_payloads/`: Other payloads (e.g., `APT_Y_document.pdf`).
-   All payloads are labeled by APT group.

**Submission 3: OpCode Extraction**

-   **Objective:** Extract OpCodes from executables (Submission 2) using GHIDRA/IDA Pro.
-   **Directory:** `Submission-3/`
-   **Contents:**
    -   `raw_extracted_files/`: Raw OpCode files (e.g., `APT_X_malware1.opcode`).
    -   `scripts/`: Scripts for automated OpCode extraction.

**Submission 4: OpCode Pre-processing & Classical ML Classification**

-   **Objective:** Pre-process OpCodes; apply SVM, KNN (k=3,5), and Decision Tree classifiers using 1-Gram/2-Gram features for APT group identification. Evaluate performance.
-   **Directory:** `Submission-4/`
-   **Contents:**
    -   `preprocessing_scripts/`: OpCode pre-processing scripts.
    -   `classifier_scripts/`: ML classifier implementation and performance plotting scripts.
    -   `dataset/`: OpCode dataset for scripts.

**Submission 5: Deep Learning Classification & Comparison**

-   **Objective:** Implement the "Deep Android Malware Detection" CNN approach on OpCodes. Report and compare performance with Submission 4 classifiers.
-   **Directory:** `Submission-5/`
-   **Contents:**
    -   `scripts/`: Scripts for CNN implementation and comparative analysis.
-   Detailed technical report below and full report via CourseLink.

## General Information

-   **Navigation:** `cd Submission-X/` to access files for each stage.
-   **Tools:** GHIDRA, IDA Pro, Python, Scikit-learn, TensorFlow/Keras/PyTorch, Pandas, NumPy.
-   **Reports:** Refer to technical reports via CourseLink for detailed methodologies and results.

---

# Submission 5 Technical Report

## OpCode Classification: SVM, KNN, DT vs. CNN

**Abstract**
This report compares a Convolutional Neural Network (CNN) against previously developed SVM, KNN, and Decision Tree models (using 1-gram/2-gram OpCode encoding) for identifying APT groups.

**Literary Review**
McLaughlin et al.'s model used Opcode Embedding, Convolutional, and Classification Layers. We adapted it by:

1.  Replacing their one-hot embedding with our 1-gram/2-gram CountVectorizer encoding for consistency.
2.  Modifying their binary (malicious/benign) classification to multi-class for identifying specific APT groups.

**Method**

**Embedding Layer**
Consistent with Submission 4: 1-gram and 2-gram CountVectorizer for feature extraction.

**Convolutional Layers**
A single block comprising: Conv1D layer (ReLU activation) for feature learning, MaxPooling1D for summarizing responses, and Flatten to create a vector for classification. This aligns with the paper's 1-to-L layer design.

**Classification Layers**
Followed a Multi-Layer Perceptron (MLP) structure: a fully connected hidden layer and a fully connected output layer.

**2.1 Preprocessing & Feature Engineering**

1.  Cleaned dataset, extracted OpCode sequences and labels.
2.  Split data (train/test sets).
3.  Applied CountVectorizer for 1-gram/2-gram features.
4.  Standardized features using StandardScaler.

**2.2 Machine Learning Models (Baseline)**

-   Support Vector Machine (SVM)
-   K-Nearest Neighbors (KNN)
-   Decision Tree (DT)
    Each trained and evaluated on 1-gram and 2-gram features.

**2.3 CNN Implementation**

-   **Embedding:** Input tensors from 1-gram/2-gram features.
-   **Convolutional:** Single Conv1D -> MaxPooling1D -> Flatten.
-   **Classification:** Fully connected layers (ReLU, Softmax for multi-class).

**3. Evaluation Metrics**
Accuracy, Recall, Precision, F1 Score, Confusion Matrix.

**Results**
Performance measured by accuracy

Classification model = Accuracy \
1-Gram SVM = 0.42 \
1-Gram KNN = 0.65 \
1-Gram Decision Tree = 0.77 \
2-Gram SVM = 0.43 \
2-Gram KNN = 0.68 \
2-Gram Decision Tree = 0.81 \
1-Gram CNN = 0.59 \
2-Gram CNN = 0.69 \

CNN accuracy (1-gram: 0.59, 2-gram: 0.69) aligns with the paper's findings for classification tasks, though potentially limited by Google Colab hardware constraints. The 2-gram CNN performed well relative to other models, while the 1-gram CNN was less competitive.

**Conclusion**
While McLaughlin et al. highlight their architecture's potential, our adaptation for multi-class APT identification with N-gram embedding showed moderate improvement. The CNN (1-gram: 59%, 2-gram: 69% accuracy) did not significantly outperform the Decision Tree models (1-gram: 77%, 2-gram: 81%). This suggests that while effective for binary classification, its multi-class performance with our specific N-gram features may require further optimization in feature representation or network architecture.

**References**
N. McLaughlin et al., “Deep Android Malware Detection,” Proceedings of the Seventh ACM on Conference on Data and Application Security and Privacy - CODASPY ’17, 2017, doi: https://doi.org/10.1145/3029806.3029823.
