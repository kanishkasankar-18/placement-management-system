# GitHub Guide

## 1. Repository

Recommended repository name:

```text
placement-management-system
```

## 2. Initialize Git

From the project root:

```bash
git init
```

## 3. Add Remote

```bash
git remote add origin https://github.com/YOUR_USERNAME/placement-management-system.git
```

## 4. Check Status

```bash
git status
```

## 5. Add Files

```bash
git add .
```

## 6. Commit

```bash
git commit -m "Initial project setup"
```

## 7. Push

```bash
git branch -M main
git push -u origin main
```

## 8. Feature Branches

For a new feature:

```bash
git checkout -b feature/student-management
```

After development:

```bash
git add .
git commit -m "Add student management module"
git push origin feature/student-management
```

## 9. Recommended Commit Messages

```text
Initial project setup
Add student CRUD APIs
Add company management
Add placement drive module
Add application module
Add placement result module
Add frontend dashboard
Add API validation
Add testing documentation
Update README
```

## 10. Files Not to Commit

Do not commit:

- Database passwords
- API keys
- Private credentials
- IDE-specific secrets
- Build output
- Environment secrets

Use `.gitignore` for generated files and local configuration.
