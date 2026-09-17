# Database Schema

## 1. Database

```sql
CREATE DATABASE placement_management;
```

## 2. Example Schema

> Update this script to match the exact final JPA entities before production use.

```sql
CREATE TABLE students (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20),
    department VARCHAR(100),
    course VARCHAR(100),
    graduation_year INT,
    cgpa DECIMAL(4,2),
    skills TEXT
);

CREATE TABLE companies (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150),
    industry VARCHAR(100),
    location VARCHAR(150),
    website VARCHAR(255),
    description TEXT
);

CREATE TABLE placement_drives (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    company_id BIGINT NOT NULL,
    job_role VARCHAR(150) NOT NULL,
    drive_date DATE,
    application_deadline DATE,
    minimum_cgpa DECIMAL(4,2),
    required_skills TEXT,
    job_location VARCHAR(150),
    package DECIMAL(10,2),
    CONSTRAINT fk_drive_company
        FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE TABLE applications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    student_id BIGINT NOT NULL,
    placement_drive_id BIGINT NOT NULL,
    application_date DATE,
    status VARCHAR(30),
    CONSTRAINT fk_application_student
        FOREIGN KEY (student_id) REFERENCES students(id),
    CONSTRAINT fk_application_drive
        FOREIGN KEY (placement_drive_id) REFERENCES placement_drives(id)
);

CREATE TABLE placement_results (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    student_id BIGINT NOT NULL,
    company_id BIGINT NOT NULL,
    job_role VARCHAR(150),
    package DECIMAL(10,2),
    placement_date DATE,
    status VARCHAR(30),
    CONSTRAINT fk_result_student
        FOREIGN KEY (student_id) REFERENCES students(id),
    CONSTRAINT fk_result_company
        FOREIGN KEY (company_id) REFERENCES companies(id)
);
```

## 3. Sample Status Values

Applications:

```text
APPLIED
SHORTLISTED
INTERVIEW
SELECTED
REJECTED
```

Results:

```text
SELECTED
NOT_SELECTED
```

These values may be represented using Java enums in the final implementation.
