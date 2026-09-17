# Modules

## 1. Student Module

Manages student records.

### Operations

- Create
- Read
- Update
- Delete
- Search
- Filter

## 2. Company Module

Manages participating company information.

### Operations

- Create
- Read
- Update
- Delete
- Search

## 3. Placement Drive Module

Manages placement opportunities offered by companies.

### Data

- Company
- Job role
- Drive date
- Deadline
- Eligibility criteria
- Required CGPA
- Required skills
- Job location
- Package

## 4. Application Module

Connects students with placement drives.

### Operations

- Submit application
- View application
- Update status
- Delete application where permitted
- Search and filter

## 5. Placement Result Module

Stores final placement information.

### Data

- Student
- Company
- Job role
- Package
- Placement date
- Result status

## 6. Dashboard Module

Displays summarized information such as:

- Total students
- Total companies
- Active drives
- Total applications
- Students placed

## 7. Authentication / Authorization

If implemented in the final version, role-based access should distinguish Admin and Student operations. If authentication is not included, the UI should clearly identify this as a scope limitation.
