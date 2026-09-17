# Frontend Documentation

## 1. Overview

The frontend provides the user interface for the Placement Management System.

## 2. Technologies

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Fetch API

## 3. Main Pages

### Login

Provides entry into the application when authentication is implemented.

### Dashboard

Displays summarized placement statistics and navigation.

### Students

Provides student CRUD functionality for authorized users.

### Companies

Provides company CRUD functionality.

### Placement Drives

Displays and manages placement opportunities.

### Applications

Displays applications and their current status.

### Results

Displays placement results.

## 4. Frontend Communication

JavaScript uses Fetch API to call backend REST endpoints.

Example:

```javascript
fetch("http://localhost:8080/api/students")
  .then(response => response.json())
  .then(data => {
      console.log(data);
  });
```

## 5. Form Handling

Forms should:

1. Collect user input.
2. Validate required fields.
3. Send data to the appropriate REST endpoint.
4. Display success or error feedback.
5. Refresh or update the UI.

## 6. Responsive Design

Bootstrap responsive utilities should be used so pages work across:

- Desktop
- Laptop
- Tablet
- Mobile

## 7. UI Guidelines

- Use consistent navigation.
- Use readable forms.
- Provide clear action buttons.
- Show validation messages.
- Confirm destructive actions where appropriate.
- Display loading/error states for API requests.
