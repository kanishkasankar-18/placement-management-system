# Installation and Setup

## 1. Prerequisites

Install:

- JDK 17 or later
- Maven
- MySQL 8.x
- Git
- IDE
- Postman
- Modern web browser

## 2. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/placement-management-system.git
cd placement-management-system
```

## 3. Create Database

Open MySQL and execute:

```sql
CREATE DATABASE placement_management;
```

## 4. Configure Backend

Open:

```text
backend/src/main/resources/application.properties
```

Configure:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/placement_management
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
server.port=8080
```

Never commit the actual database password.

## 5. Build Backend

```bash
cd backend
mvn clean install
```

## 6. Run Backend

```bash
mvn spring-boot:run
```

Backend:

```text
http://localhost:8080
```

## 7. Run Frontend

Open the `frontend` directory using a local development server.

For VS Code, Live Server can be used if available.

## 8. Verify API

Open Postman and test:

```http
GET http://localhost:8080/api/students
```

## 9. Troubleshooting

### Database connection failure

Check:

- MySQL is running.
- Database name is correct.
- Username is correct.
- Password is correct.
- Port is correct.

### Backend does not start

Check:

- Java version
- Maven installation
- Port 8080 availability
- Application logs

### Frontend cannot access API

Check:

- Backend is running.
- API URL is correct.
- CORS configuration is correct if frontend and backend use different origins.
