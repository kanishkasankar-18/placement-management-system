# Test Cases

## 1. Student Management

| ID | Test Case | Expected Result |
|---|---|---|
| TC-ST-01 | Add valid student | Student created |
| TC-ST-02 | Get all students | Student list displayed |
| TC-ST-03 | Get valid student ID | Student returned |
| TC-ST-04 | Get invalid ID | 404/error response |
| TC-ST-05 | Update student | Student updated |
| TC-ST-06 | Delete student | Student deleted |
| TC-ST-07 | Submit invalid email | Validation error |

## 2. Company Management

| ID | Test Case | Expected Result |
|---|---|---|
| TC-CO-01 | Add company | Company created |
| TC-CO-02 | View companies | Company list displayed |
| TC-CO-03 | Update company | Company updated |
| TC-CO-04 | Delete company | Company deleted |
| TC-CO-05 | Invalid company ID | Error response |

## 3. Placement Drive

| ID | Test Case | Expected Result |
|---|---|---|
| TC-PD-01 | Create drive | Drive created |
| TC-PD-02 | View drives | Drives displayed |
| TC-PD-03 | Update drive | Drive updated |
| TC-PD-04 | Delete drive | Drive deleted |
| TC-PD-05 | Invalid required field | Validation error |

## 4. Application

| ID | Test Case | Expected Result |
|---|---|---|
| TC-AP-01 | Submit valid application | Application created |
| TC-AP-02 | View application | Application displayed |
| TC-AP-03 | Update status | Status updated |
| TC-AP-04 | Invalid student | Error response |
| TC-AP-05 | Invalid drive | Error response |

## 5. Placement Result

| ID | Test Case | Expected Result |
|---|---|---|
| TC-PR-01 | Add result | Result created |
| TC-PR-02 | View results | Results displayed |
| TC-PR-03 | Update result | Result updated |
| TC-PR-04 | Delete result | Result deleted |

## 6. UI Tests

| ID | Test | Expected Result |
|---|---|---|
| TC-UI-01 | Open dashboard | Dashboard loads |
| TC-UI-02 | Submit form | Data sent to API |
| TC-UI-03 | Search record | Matching records displayed |
| TC-UI-04 | Open on mobile | Responsive layout |
| TC-UI-05 | API unavailable | User-friendly error shown |

## 7. Test Status

Before final submission, replace expected results with actual execution results and mark each case as **PASS** or **FAIL**.
