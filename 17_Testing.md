# Testing

## 1. Testing Objective

Testing ensures that the Placement Management System behaves according to its requirements and that major CRUD workflows operate correctly.

## 2. Testing Levels

### Unit Testing

Tests individual classes or methods.

Examples:

- Student service
- Company service
- Validation logic

### Integration Testing

Tests interaction between application layers.

```text
Controller
   ↓
Service
   ↓
Repository
   ↓
Database
```

### API Testing

REST endpoints are tested with Postman.

### UI Testing

Tests page navigation, forms, buttons, tables, validation, and responsive behavior.

## 3. Functional Testing

Major functional areas:

- Student CRUD
- Company CRUD
- Drive CRUD
- Application CRUD
- Result CRUD
- Search
- Filtering
- Validation
- Error handling

## 4. Validation Testing

Test invalid inputs such as:

- Empty required name
- Invalid email
- Invalid CGPA
- Missing company
- Missing placement drive

## 5. Error Testing

Verify correct handling of:

- Non-existing IDs
- Duplicate data
- Invalid request bodies
- Database failures

## 6. Regression Testing

After a new feature is added, previously working functionality should be retested.

## 7. Test Result Recording

Record:

- Test case ID
- Input
- Expected result
- Actual result
- Status
- Remarks
