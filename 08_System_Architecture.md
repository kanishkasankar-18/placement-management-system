# System Architecture

## 1. Overview

The Placement Management System follows a three-tier architecture.

## 2. Presentation Layer

The frontend is responsible for:

- Displaying pages
- Accepting user input
- Client-side validation
- Calling REST APIs
- Displaying API responses
- Providing responsive navigation

Technologies:

- HTML5
- CSS3
- JavaScript
- Bootstrap 5

## 3. Application Layer

The Spring Boot backend provides:

- REST controllers
- Business logic
- Validation
- Exception handling
- Repository access

Typical request flow:

```text
HTTP Request
    |
Controller
    |
Service
    |
Repository
    |
Database
```

## 4. Data Layer

Spring Data JPA communicates with MySQL.

The database stores:

- Students
- Companies
- Placement drives
- Applications
- Placement results

## 5. Architecture Diagram

```text
+-----------------------------+
|          Browser            |
| HTML CSS JS Bootstrap       |
+--------------+--------------+
               |
               | HTTP / REST
               v
+-----------------------------+
|       Spring Boot API       |
| Controllers                 |
| Services                    |
| Validation                  |
| Exception Handling          |
+--------------+--------------+
               |
               v
+-----------------------------+
|       Spring Data JPA       |
|        Repositories         |
+--------------+--------------+
               |
               v
+-----------------------------+
|           MySQL             |
|         Database            |
+-----------------------------+
```

## 6. Benefits

- Separation of concerns
- Easier maintenance
- Reusable backend APIs
- Independent frontend and backend development
- Better testability
