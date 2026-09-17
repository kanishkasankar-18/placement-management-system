# API Documentation

## 1. Base URL

```text
http://localhost:8080
```

## 2. Student APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students` | Get all students |
| GET | `/api/students/{id}` | Get student by ID |
| POST | `/api/students` | Create student |
| PUT | `/api/students/{id}` | Update student |
| DELETE | `/api/students/{id}` | Delete student |

### Example POST

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "department": "Computer Science",
  "course": "B.Tech",
  "graduationYear": 2027,
  "cgpa": 8.5,
  "skills": "Java, SQL, JavaScript"
}
```

## 3. Company APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/companies` | Get all companies |
| GET | `/api/companies/{id}` | Get company |
| POST | `/api/companies` | Create company |
| PUT | `/api/companies/{id}` | Update company |
| DELETE | `/api/companies/{id}` | Delete company |

## 4. Placement Drive APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/placement-drives` | Get all drives |
| GET | `/api/placement-drives/{id}` | Get drive |
| POST | `/api/placement-drives` | Create drive |
| PUT | `/api/placement-drives/{id}` | Update drive |
| DELETE | `/api/placement-drives/{id}` | Delete drive |

## 5. Application APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/applications` | Get applications |
| GET | `/api/applications/{id}` | Get application |
| POST | `/api/applications` | Submit application |
| PUT | `/api/applications/{id}` | Update application |
| DELETE | `/api/applications/{id}` | Delete application |

## 6. Placement Result APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/placement-results` | Get results |
| GET | `/api/placement-results/{id}` | Get result |
| POST | `/api/placement-results` | Create result |
| PUT | `/api/placement-results/{id}` | Update result |
| DELETE | `/api/placement-results/{id}` | Delete result |

## 7. Common HTTP Responses

```text
200 OK
201 CREATED
400 BAD REQUEST
404 NOT FOUND
500 INTERNAL SERVER ERROR
```

## 8. API Testing

APIs can be tested using Postman. The exact request and response structures should be synchronized with the implemented DTOs and controllers.
