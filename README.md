# Placement Management System

A full-stack web application designed to simplify and manage the college placement process. The system provides a centralized platform for placement officers and students to manage student information, companies, placement drives, applications, and placement results.

---

## 📌 Project Overview

The **Placement Management System** is a CRUD-based full-stack web application developed to digitize and streamline the placement activities of a college.

The system allows placement officers to manage student records, company information, placement drives, applications, and placement results through a centralized dashboard. Students can view available placement opportunities, apply for eligible drives, and track their application and placement status.

The application follows a three-tier architecture:

```text
┌─────────────────────────────┐
│         Frontend            │
│   HTML5 + CSS3 + JavaScript │
│       Bootstrap 5           │
└──────────────┬──────────────┘
               │ REST API
               ▼
┌─────────────────────────────┐
│          Backend            │
│        Java + Spring Boot   │
│     Spring Web + JPA       │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│          Database           │
│            MySQL            │
└─────────────────────────────┘
```

---

## 🎯 Objectives

The main objectives of the Placement Management System are:

* To digitize the college placement management process.
* To maintain centralized student and company records.
* To manage placement drives efficiently.
* To allow students to apply for placement opportunities.
* To track student applications and placement results.
* To reduce manual paperwork and data duplication.
* To provide a user-friendly and responsive interface.
* To implement CRUD operations using REST APIs.
* To provide reliable data validation and error handling.

---

## ✨ Features

### 👨‍💼 Admin / Placement Officer

* Admin dashboard
* Student management
* Company management
* Placement drive management
* Application management
* Placement result management
* Search and filter functionality
* View placement statistics
* Add, update, view, and delete records
* Monitor student applications
* Manage placement status

### 👨‍🎓 Student

* Student dashboard
* View profile
* View available companies
* View placement drives
* Check eligibility
* Apply for placement drives
* Track application status
* View placement result
* Search and filter placement opportunities

### ⚙️ System Features

* Responsive design
* RESTful APIs
* CRUD operations
* Form validation
* Server-side validation
* Exception handling
* MySQL database integration
* Search and filtering
* Dashboard statistics
* API testing using Postman
* Git/GitHub version control

---

## 🛠️ Technology Stack

### Frontend

| Technology  | Purpose                   |
| ----------- | ------------------------- |
| HTML5       | Web page structure        |
| CSS3        | Styling                   |
| JavaScript  | Client-side functionality |
| Bootstrap 5 | Responsive UI             |
| Fetch API   | REST API communication    |

### Backend

| Technology      | Purpose               |
| --------------- | --------------------- |
| Java            | Backend programming   |
| Spring Boot     | Backend framework     |
| Spring Web      | REST API development  |
| Spring Data JPA | Database interaction  |
| Hibernate       | ORM                   |
| Bean Validation | Input validation      |
| Maven           | Dependency management |

### Database

| Technology | Purpose             |
| ---------- | ------------------- |
| MySQL      | Relational database |

### Development Tools

| Tool                              | Purpose             |
| --------------------------------- | ------------------- |
| IntelliJ IDEA / Eclipse / VS Code | Development         |
| MySQL Workbench                   | Database management |
| Postman                           | API testing         |
| Git                               | Version control     |
| GitHub                            | Source code hosting |

---

## 🏗️ System Architecture

The application uses a three-layer architecture.

```text
                    USER
                     │
                     ▼
        ┌────────────────────────┐
        │       FRONTEND         │
        │ HTML / CSS / JS /      │
        │ Bootstrap              │
        └───────────┬────────────┘
                    │
                 HTTP/REST
                    │
                    ▼
        ┌────────────────────────┐
        │       CONTROLLER       │
        │     Spring REST API    │
        └───────────┬────────────┘
                    │
                    ▼
        ┌────────────────────────┐
        │        SERVICE         │
        │    Business Logic      │
        └───────────┬────────────┘
                    │
                    ▼
        ┌────────────────────────┐
        │       REPOSITORY       │
        │     Spring Data JPA    │
        └───────────┬────────────┘
                    │
                    ▼
        ┌────────────────────────┐
        │         MYSQL          │
        │       Database         │
        └────────────────────────┘
```

---

## 📦 Main Modules

### 1. Student Management

The student module maintains student information such as:

* Student ID
* Name
* Email
* Phone
* Department
* Course
* Graduation year
* CGPA
* Skills
* Resume

CRUD operations:

```text
CREATE  → Add Student
READ    → View Student
UPDATE  → Update Student
DELETE  → Delete Student
```

---

### 2. Company Management

The company module stores information about companies participating in campus placements.

Information includes:

* Company name
* Company email
* Industry
* Location
* Website
* Job role
* Salary package
* Job description

---

### 3. Placement Drive Management

Placement officers can create and manage placement drives.

Information includes:

* Company
* Job role
* Drive date
* Application deadline
* Eligibility criteria
* Required CGPA
* Required skills
* Job location
* Package

---

### 4. Application Management

The application module manages student applications.

Application information includes:

* Student
* Placement drive
* Application date
* Application status

Example statuses:

```text
APPLIED
SHORTLISTED
INTERVIEW
SELECTED
REJECTED
```

---

### 5. Placement Result Management

The placement result module records final placement information.

Information includes:

* Student
* Company
* Job role
* Package
* Placement date
* Result/status

---

## 🗄️ Database Design

The major entities of the system are:

```text
Student
   │
   │
   ├─────────────── Application
   │                     │
   │                     │
   │                Placement Drive
   │                     │
   │                     │
   │                  Company
   │
   └─────────────── Placement Result
```

### Main Entities

```text
STUDENT
COMPANY
PLACEMENT_DRIVE
APPLICATION
PLACEMENT_RESULT
```

### Relationship Overview

* A student can apply to multiple placement drives.
* A placement drive belongs to a company.
* A company can conduct multiple placement drives.
* An application connects a student with a placement drive.
* A student can have placement result information.

---

## 🔗 REST API

The backend provides RESTful APIs for managing the system.

### Student APIs

```http
GET     /api/students
GET     /api/students/{id}
POST    /api/students
PUT     /api/students/{id}
DELETE  /api/students/{id}
```

### Company APIs

```http
GET     /api/companies
GET     /api/companies/{id}
POST    /api/companies
PUT     /api/companies/{id}
DELETE  /api/companies/{id}
```

### Placement Drive APIs

```http
GET     /api/placement-drives
GET     /api/placement-drives/{id}
POST    /api/placement-drives
PUT     /api/placement-drives/{id}
DELETE  /api/placement-drives/{id}
```

### Application APIs

```http
GET     /api/applications
GET     /api/applications/{id}
POST    /api/applications
PUT     /api/applications/{id}
DELETE  /api/applications/{id}
```

### Placement Result APIs

```http
GET     /api/placement-results
GET     /api/placement-results/{id}
POST    /api/placement-results
PUT     /api/placement-results/{id}
DELETE  /api/placement-results/{id}
```

> API paths may be adjusted according to the final backend implementation.

---

## 📁 Project Structure

Recommended project structure:

```text
placement-management-system/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/example/placement/
│   │   │   │       ├── controller/
│   │   │   │       ├── service/
│   │   │   │       ├── repository/
│   │   │   │       ├── entity/
│   │   │   │       ├── dto/
│   │   │   │       ├── exception/
│   │   │   │       └── PlacementManagementApplication.java
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   │
│   │   └── test/
│   │
│   └── pom.xml
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── students.html
│   ├── companies.html
│   ├── placement-drives.html
│   ├── applications.html
│   ├── results.html
│   │
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       ├── api.js
│       ├── students.js
│       ├── companies.js
│       ├── drives.js
│       ├── applications.js
│       └── results.js
│
├── database/
│   ├── schema.sql
│   └── sample-data.sql
│
├── documentation/
│   ├── 01_Project_Overview.md
│   ├── 02_Problem_Statement.md
│   ├── 03_Objectives.md
│   ├── 04_Scope.md
│   ├── 05_Features.md
│   ├── 06_System_Requirements.md
│   ├── 07_Technology_Stack.md
│   ├── 08_System_Architecture.md
│   ├── 09_Modules.md
│   ├── 10_Database_Design.md
│   ├── 11_ER_Diagram.md
│   ├── 12_Database_Schema.md
│   ├── 13_API_Documentation.md
│   ├── 14_Frontend_Documentation.md
│   ├── 15_Backend_Documentation.md
│   ├── 16_User_Roles.md
│   ├── 17_Testing.md
│   ├── 18_Test_Cases.md
│   ├── 19_Screenshots.md
│   ├── 20_Installation_and_Setup.md
│   ├── 21_User_Manual.md
│   ├── 22_GitHub_Guide.md
│   ├── 23_Future_Enhancements.md
│   ├── 24_Limitations.md
│   └── 25_Conclusion.md
│
├── README.md
└── .gitignore
```

---

## 💻 System Requirements

### Hardware

* Processor: Intel Core i3 or above
* RAM: Minimum 4 GB
* Storage: Minimum 5 GB free space
* Internet connection for downloading dependencies

### Software

* Java JDK 17 or later
* Maven
* MySQL 8.x
* MySQL Workbench
* Web browser
* Postman
* Git
* IDE such as IntelliJ IDEA, Eclipse, or VS Code

---

## ⚙️ Installation and Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/placement-management-system.git
```

Navigate into the project:

```bash
cd placement-management-system
```

---

### Step 2: Configure MySQL

Create the database:

```sql
CREATE DATABASE placement_management;
```

Update the database configuration in:

```text
backend/src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/placement_management
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

server.port=8080
```

Replace `YOUR_PASSWORD` with your MySQL password.

---

### Step 3: Run the Backend

Navigate to the backend directory:

```bash
cd backend
```

Run:

```bash
mvn spring-boot:run
```

The backend will start at:

```text
http://localhost:8080
```

---

### Step 4: Run the Frontend

Open the frontend using a local development server.

For example, using VS Code Live Server:

```text
frontend/index.html
```

Or use another static web server.

---

## 🧪 API Testing

The REST APIs can be tested using Postman.

Example:

```text
GET
http://localhost:8080/api/students
```

Example POST request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "department": "Computer Science",
  "cgpa": 8.5
}
```

The exact request fields should match the final entity/DTO implementation.

---

## 🔐 Validation and Error Handling

The application includes validation to prevent invalid data from being stored.

Examples:

* Required field validation
* Email validation
* CGPA validation
* Duplicate record handling
* Invalid ID handling
* Resource-not-found handling
* Database error handling

Typical HTTP responses:

```text
200 OK
201 CREATED
400 BAD REQUEST
404 NOT FOUND
500 INTERNAL SERVER ERROR
```

---

## 📊 Dashboard

The dashboard provides an overview of placement activities.

Possible statistics include:

```text
Total Students
Total Companies
Active Placement Drives
Total Applications
Students Placed
Placement Percentage
```

The dashboard may also contain charts for:

* Department-wise placements
* Company-wise selections
* Application status
* Placement statistics

---

## 🔍 Search and Filtering

The application provides search and filtering functionality.

Users can search/filter based on:

* Student name
* Department
* Company
* Job role
* Placement drive
* Application status
* Placement status

---

## 🧪 Testing Strategy

Testing includes:

### Unit Testing

Testing individual backend components such as:

* Services
* Controllers
* Repository operations
* Validation

### Integration Testing

Testing communication between:

```text
Frontend → REST API → Backend → MySQL
```

### API Testing

REST APIs are tested using Postman.

### UI Testing

The frontend is tested for:

* Form submission
* Navigation
* CRUD operations
* Responsive layout
* Validation messages
* Search/filter functionality

---

## 🚀 Future Enhancements

Potential future improvements include:

* Email notifications
* Resume upload
* Automated eligibility checking
* Advanced analytics
* Placement prediction and reporting
* Role-based authentication and authorization
* Password reset
* Interview scheduling
* Student resume management
* Company login
* Automated placement reports
* Export reports to PDF/Excel
* Cloud deployment
* Mobile application

---

## ⚠️ Limitations

The initial version may have the following limitations:

* Requires local MySQL configuration.
* Requires the backend server to be running for API operations.
* Advanced authentication may not be included in the initial CRUD implementation.
* Email/SMS notifications may not be available.
* Cloud deployment may not be included.

These limitations can be addressed in future versions.

---

## 📸 Screenshots

Add screenshots of the completed application in:

```text
documentation/screenshots/
```

Recommended screenshots:

1. Login Page
2. Admin Dashboard
3. Student Dashboard
4. Student Management
5. Company Management
6. Placement Drive Management
7. Application Management
8. Placement Results
9. Search and Filter
10. Database / API Testing

Example:

```markdown
## Dashboard

![Dashboard](documentation/screenshots/admin-dashboard.png)
```

---

## 📚 Documentation

Detailed project documentation is available in the `documentation` folder.

```text
documentation/
├── Project Overview
├── Problem Statement
├── Objectives
├── Scope
├── Features
├── System Requirements
├── Technology Stack
├── System Architecture
├── Modules
├── Database Design
├── ER Diagram
├── API Documentation
├── Frontend Documentation
├── Backend Documentation
├── User Roles
├── Testing
├── Test Cases
├── Installation Guide
├── User Manual
├── Future Enhancements
├── Limitations
└── Conclusion
```

---

## 🌿 Git Workflow

Create a feature branch:

```bash
git checkout -b feature/student-management
```

Add changes:

```bash
git add .
```

Commit:

```bash
git commit -m "Add student management module"
```

Push:

```bash
git push origin feature/student-management
```

Merge the feature branch into `main` after testing.

---

## 👥 User Roles

### Admin / Placement Officer

Responsible for:

* Managing students
* Managing companies
* Creating placement drives
* Managing applications
* Updating placement results
* Monitoring placement statistics

### Student

Responsible for:

* Viewing profile
* Viewing placement drives
* Applying for eligible drives
* Tracking applications
* Viewing placement results

---

## 📌 Project Status

```text
Project Type: College Mini Project
Application: Placement Management System
Architecture: Three-Tier Architecture
Backend: Spring Boot
Frontend: HTML, CSS, JavaScript, Bootstrap
Database: MySQL
API: REST
API Testing: Postman
Version Control: Git/GitHub
```

---

## 👨‍💻 Contributors

| Name        | Role                 |
| ----------- | -------------------- |
| Your Name   | Full Stack Developer |
| Team Member | Developer            |
| Team Member | Developer            |

> Replace the names above with your actual project team members.

---

## 📄 License

This project is developed for educational and academic purposes.

---

## ⭐ Acknowledgement

This project was developed as part of a college mini-project to demonstrate practical implementation of full-stack web development, REST API development, CRUD operations, database management, and software engineering concepts.

---

## 📞 Contact

For project-related queries, please contact the project team through the contact information provided by the college/project documentation.

---

**Placement Management System — Full-Stack College Mini Project**
