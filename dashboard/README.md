<img width="1533" height="885" alt="Screenshot 2025-06-04 191802" src="https://github.com/user-attachments/assets/bcb38e76-8f55-4fa6-8331-b31029c856f3" />
 🧠 Risky Ticket Detection Dashboard

A role-based, machine learning-powered project risk detection dashboard developed during a professional engagement with **Cocolevio LLC**. This solution identifies and visualizes potentially risky or delayed tasks with high accuracy, aiding in project health monitoring and decision-making.

---

## 📌 Project Highlights

- 🎯 **91% Accuracy** in predicting risky project tasks using a Random Forest model.
- 🖥️ **Role-sensitive dashboard** for Project Managers, Program Managers, and Portfolio Managers.
- 📈 Comprehensive **EDA and data preprocessing pipeline** before model training.
- ⚙️ Built using **React.js** and **Tailwind CSS** (Frontend), **Flask** (Backend), and **PostgreSQL** (Database).
- 📊 Real-time insights with exportable summaries and interactive visualizations.

---

## 🛠️ Technology Stack

| Layer       | Technologies                          |
|-------------|----------------------------------------|
| Frontend    | React.js, Tailwind CSS                 |
| Backend     | Flask (Python)                         |
| Machine Learning | Random Forest (scikit-learn)     |
| Database    | PostgreSQL                             |
| Data Analysis | Pandas, NumPy, Matplotlib, Seaborn  |

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js and npm (for frontend)
- Python 3.8+ and pip (for backend)
- PostgreSQL (for local database setup)

### ⚙️ Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # On Windows
# source venv/bin/activate     # On Linux/macOS

pip install -r requirements.txt
python app.py
```

### 🌐 Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🧠 Model Overview

- **Type**: Binary Classification (`Risky` / `Not Risky`)
- **Algorithm**: Random Forest Classifier (tuned via grid search)
- **Evaluation Metric**: Accuracy = **91%**
- **Features**: Task status, due date delta, number of updates/comments, reassignment count, etc.

---

## 📂 Repository Structure

```
risky-ticket-detection/
├── backend/               # Flask API and ML model
├── frontend/              # React.js dashboard
├── data/                  # Sample data
├── .gitignore
└── README.md
```

---

## 👥 Authors

- **Ansh Khanna**
- **Lakshay Mittal**

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🔗 Acknowledgements

- **Cocolevio LLC** – for professional guidance and the project opportunity.
- Open-source tools including React, Flask, scikit-learn, and PostgreSQL.

