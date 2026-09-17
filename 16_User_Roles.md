# User Roles

## 1. Admin / Placement Officer

The Admin manages the overall placement process.

### Responsibilities

- Manage student records
- Manage company records
- Create placement drives
- Manage applications
- Update application status
- Record placement results
- View dashboard statistics

## 2. Student

The Student interacts with placement opportunities.

### Responsibilities

- View profile
- View companies
- View placement drives
- Review eligibility
- Apply for drives
- Track applications
- View placement results

## 3. Role Permission Matrix

| Function | Admin | Student |
|---|---:|---:|
| View students | Yes | Own profile |
| Add student | Yes | No |
| Update student | Yes | Limited/own profile if implemented |
| Delete student | Yes | No |
| Manage companies | Yes | View |
| Manage drives | Yes | View |
| Apply for drive | No/Administrative | Yes |
| Manage applications | Yes | View own |
| Manage results | Yes | View own |
| Dashboard | Yes | Student-specific |

The exact permissions depend on the authentication and authorization implementation.
