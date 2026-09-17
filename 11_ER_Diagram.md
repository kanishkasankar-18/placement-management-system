# ER Diagram

## 1. Entity Relationship Overview

```text
+-------------+       +-------------------+
|   COMPANY   | 1   N |  PLACEMENT_DRIVE  |
+-------------+-------+-------------------+
                         |
                         | 1
                         | 
                         | N
                  +----------------+
                  |  APPLICATION   |
                  +----------------+
                    N |          | N
                      |          |
                      |          |
                    1 |          | 1
                +---------+   +---------+
                | STUDENT |   |  DRIVE  |
                +---------+   +---------+

Student -------------------- Placement Result
    1                              N
```

## 2. Mermaid ER Diagram

The following Mermaid diagram can be rendered by GitHub-compatible Markdown viewers:

```mermaid
erDiagram
    STUDENT ||--o{ APPLICATION : submits
    COMPANY ||--o{ PLACEMENT_DRIVE : conducts
    PLACEMENT_DRIVE ||--o{ APPLICATION : receives
    STUDENT ||--o{ PLACEMENT_RESULT : receives
    COMPANY ||--o{ PLACEMENT_RESULT : offers

    STUDENT {
        bigint id PK
        string name
        string email
        string phone
        string department
        string course
        int graduation_year
        decimal cgpa
        string skills
    }

    COMPANY {
        bigint id PK
        string name
        string email
        string industry
        string location
        string website
    }

    PLACEMENT_DRIVE {
        bigint id PK
        bigint company_id FK
        string job_role
        date drive_date
        date application_deadline
        decimal minimum_cgpa
        string required_skills
        string job_location
        decimal package
    }

    APPLICATION {
        bigint id PK
        bigint student_id FK
        bigint placement_drive_id FK
        date application_date
        string status
    }

    PLACEMENT_RESULT {
        bigint id PK
        bigint student_id FK
        bigint company_id FK
        string job_role
        decimal package
        date placement_date
        string status
    }
```

## 3. Note

The diagram represents the proposed logical model. The final diagram should be updated if the implemented entity fields differ.
