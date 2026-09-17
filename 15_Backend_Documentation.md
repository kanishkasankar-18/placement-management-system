# Backend Documentation

## 1. Overview

The backend is developed using Java and Spring Boot. It exposes RESTful APIs and handles business operations and database communication.

## 2. Suggested Package Structure

```text
com.example.placement
├── controller
├── service
├── repository
├── entity
├── dto
├── exception
└── PlacementManagementApplication.java
```

## 3. Entity Layer

Entities represent database tables.

Main entities:

- Student
- Company
- PlacementDrive
- Application
- PlacementResult

## 4. Repository Layer

Repositories use Spring Data JPA to perform database operations.

Example:

```java
public interface StudentRepository
        extends JpaRepository<Student, Long> {
}
```

## 5. Service Layer

The service layer contains business logic and separates it from controllers.

Typical operations:

```text
create()
getAll()
getById()
update()
delete()
```

## 6. Controller Layer

Controllers expose REST endpoints.

Example structure:

```java
@RestController
@RequestMapping("/api/students")
public class StudentController {
    // CRUD endpoints
}
```

## 7. Validation

Bean Validation can be used for:

- Required fields
- Email format
- CGPA range
- String length
- Numeric constraints

## 8. Exception Handling

A centralized exception handler can provide consistent error responses.

Typical exceptions:

- ResourceNotFoundException
- Validation errors
- Data integrity errors
- Generic server errors

## 9. Configuration

Example `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/placement_management
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080
```

Do not commit real passwords or secrets to GitHub.
