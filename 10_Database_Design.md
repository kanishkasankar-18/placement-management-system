# Database Design

## 1. Overview

MySQL is used as the relational database. The database is designed around the major business entities of the placement process.

## 2. Main Tables

```text
students
companies
placement_drives
applications
placement_results
```

## 3. Students

Stores student information.

Suggested fields:

| Field | Description |
|---|---|
| id | Primary key |
| name | Student name |
| email | Student email |
| phone | Contact number |
| department | Department |
| course | Course |
| graduation_year | Graduation year |
| cgpa | CGPA |
| skills | Skills |
| resume | Resume reference if implemented |

## 4. Companies

Stores company information.

| Field | Description |
|---|---|
| id | Primary key |
| name | Company name |
| email | Company email |
| industry | Industry |
| location | Company/job location |
| website | Website |
| description | Company information |

## 5. Placement Drives

Stores placement opportunity information.

| Field | Description |
|---|---|
| id | Primary key |
| company_id | Company reference |
| job_role | Job role |
| drive_date | Drive date |
| application_deadline | Deadline |
| minimum_cgpa | Minimum CGPA |
| required_skills | Required skills |
| job_location | Job location |
| package | Salary package |

## 6. Applications

Stores student applications.

| Field | Description |
|---|---|
| id | Primary key |
| student_id | Student reference |
| placement_drive_id | Drive reference |
| application_date | Application date |
| status | Application status |

## 7. Placement Results

Stores final placement information.

| Field | Description |
|---|---|
| id | Primary key |
| student_id | Student reference |
| company_id | Company reference |
| job_role | Selected role |
| package | Offered package |
| placement_date | Placement date |
| status | Result status |

## 8. Relationships

- Company 1:N Placement Drive
- Student 1:N Application
- Placement Drive 1:N Application
- Student 1:N Placement Result
- Company 1:N Placement Result

The exact cardinality can be adjusted if the final implementation uses different business rules.
