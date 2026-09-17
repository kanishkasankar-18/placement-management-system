import React, { useState } from 'react';
import {
  Code2,
  FolderTree,
  Database,
  Layers,
  Network,
  Copy,
  Check,
  FileText
} from 'lucide-react';

export const ArchitectureViewer: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const projectFolderStructure = `placement-management-system/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/placementmanagement/
│   │   │   │   ├── PlacementManagementApplication.java
│   │   │   │   ├── config/
│   │   │   │   │   └── CorsConfig.java
│   │   │   │   ├── controller/
│   │   │   │   │   ├── StudentController.java
│   │   │   │   │   ├── CompanyController.java
│   │   │   │   │   ├── PlacementDriveController.java
│   │   │   │   │   ├── ApplicationController.java
│   │   │   │   │   └── PlacementResultController.java
│   │   │   │   ├── dto/
│   │   │   │   │   ├── ApiResponse.java
│   │   │   │   │   ├── ApplicationStatusDto.java
│   │   │   │   │   └── DashboardStatsDto.java
│   │   │   │   ├── exception/
│   │   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   │   ├── ResourceNotFoundException.java
│   │   │   │   │   ├── DuplicateRecordException.java
│   │   │   │   │   └── InvalidApplicationException.java
│   │   │   │   ├── model/
│   │   │   │   │   ├── Student.java
│   │   │   │   │   ├── Company.java
│   │   │   │   │   ├── PlacementDrive.java
│   │   │   │   │   ├── Application.java
│   │   │   │   │   └── PlacementResult.java
│   │   │   │   ├── repository/
│   │   │   │   │   ├── StudentRepository.java
│   │   │   │   │   ├── CompanyRepository.java
│   │   │   │   │   ├── PlacementDriveRepository.java
│   │   │   │   │   ├── ApplicationRepository.java
│   │   │   │   │   └── PlacementResultRepository.java
│   │   │   │   └── service/
│   │   │   │       ├── StudentService.java
│   │   │   │       ├── CompanyService.java
│   │   │   │       ├── PlacementDriveService.java
│   │   │   │       ├── ApplicationService.java
│   │   │   │       └── PlacementResultService.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── data.sql
│   ├── pom.xml
│   └── mvnw
├── frontend/
│   ├── index.html          (Login & Role Selector)
│   ├── dashboard.html      (Admin Analytics & KPI Cards)
│   ├── students.html       (Student CRUD Management)
│   ├── companies.html      (Company Directory & Liaison)
│   ├── drives.html         (Placement Drives & Cutoffs)
│   ├── applications.html   (Application Pipeline Status)
│   ├── results.html        (Placement Offers & Results)
│   ├── student-portal.html (Candidate Dashboard & Apply)
│   ├── css/
│   │   └── style.css       (Responsive College Portal CSS)
│   └── js/
│       ├── api.js          (Reusable Fetch API Wrapper)
│       ├── dashboard.js
│       ├── students.js
│       ├── companies.js
│       ├── drives.js
│       ├── applications.js
│       └── results.js
├── database/
│   └── schema.sql          (MySQL Database DDL & Seed Data)
├── postman/
│   └── Placement_Management_System.postman_collection.json
└── README.md`;

  const pomXmlSnippet = `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.3</version>
        <relativePath/>
    </parent>

    <groupId>com.example</groupId>
    <artifactId>placement-management-system</artifactId>
    <version>1.0.0</version>
    <name>placement-management-system</name>
    <description>College Placement Cell Full-Stack Management Portal</description>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <!-- Spring Boot Web for REST APIs -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Data JPA for Database ORM -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- Hibernate Bean Validation -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <!-- MySQL Connector Driver -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- Spring Boot DevTools for Hot Reload -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <!-- Unit Testing Support -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>`;

  const appPropertiesSnippet = `# ============================================
# Spring Boot Placement Management Application Config
# ============================================
server.port=8080

# MySQL Database DataSource Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/placement_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=\${DB_PASSWORD:root}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA & Hibernate Properties
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# Logging
logging.level.com.example.placementmanagement=DEBUG
logging.level.org.springframework.web=INFO`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Phase 1: Architecture & Project Structure Guide
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Standard Spring Boot 3 + MySQL + HTML5/CSS3/Vanilla JS layered system blueprint for your college submission.
        </p>
      </div>

      {/* Layered Architecture Flow Diagram */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <h3 className="font-bold text-slate-900 text-base mb-1 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          Layered Architecture & Data Flow
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Strict separation of concerns adhering to standard Java Enterprise & Spring Boot design patterns.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block mb-1">
              Client Layer
            </span>
            <h4 className="font-bold text-slate-900 text-sm">HTML5 / Bootstrap 5 / JS</h4>
            <p className="text-xs text-slate-600 mt-2">
              Clean responsive UI executing native JavaScript <code className="text-blue-700 font-mono">fetch()</code>{' '}
              calls with JSON payloads to Spring REST controllers.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 block mb-1">
              Controller Layer
            </span>
            <h4 className="font-bold text-slate-900 text-sm">@RestController</h4>
            <p className="text-xs text-slate-600 mt-2">
              Handles HTTP GET, POST, PUT, DELETE endpoints, Bean Validation (<code className="font-mono">@Valid</code>),
              and returns standardized <code className="font-mono">ResponseEntity&lt;T&gt;</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block mb-1">
              Service Layer
            </span>
            <h4 className="font-bold text-slate-900 text-sm">@Service Business Logic</h4>
            <p className="text-xs text-slate-600 mt-2">
              Encapsulates business rules: duplicate checking, student eligibility calculation, backlog restrictions,
              and transaction handling.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Data & Database
            </span>
            <h4 className="font-bold text-slate-900 text-sm">Spring Data JPA & MySQL</h4>
            <p className="text-xs text-slate-600 mt-2">
              <code className="font-mono">JpaRepository&lt;T, ID&gt;</code> communicates with MySQL via JDBC, managing
              foreign key constraints and automated schema updates.
            </p>
          </div>
        </div>
      </div>

      {/* Directory Structure Block */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-base">Complete Project Folder Structure</h3>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard('tree', projectFolderStructure)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            {copiedKey === 'tree' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedKey === 'tree' ? 'Copied Structure' : 'Copy Folder Tree'}
          </button>
        </div>
        <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed max-h-96">
          {projectFolderStructure}
        </pre>
      </div>

      {/* Maven pom.xml & application.properties Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* pom.xml */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <h4 className="font-bold text-slate-900 text-sm">backend/pom.xml</h4>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard('pom', pomXmlSnippet)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md"
              >
                {copiedKey === 'pom' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                Copy pom.xml
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Maven dependencies for Spring Boot 3, Spring Web, Spring Data JPA, Hibernate Validation, and MySQL Driver.
            </p>
          </div>
          <pre className="bg-slate-950 text-slate-200 p-3.5 rounded-xl text-[11px] font-mono overflow-x-auto leading-relaxed max-h-64">
            {pomXmlSnippet}
          </pre>
        </div>

        {/* application.properties */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-600" />
                <h4 className="font-bold text-slate-900 text-sm">application.properties</h4>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard('props', appPropertiesSnippet)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md"
              >
                {copiedKey === 'props' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                Copy Config
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              MySQL datasource connection string, Hibernate DDL auto-update, and dialect configuration.
            </p>
          </div>
          <pre className="bg-slate-950 text-slate-200 p-3.5 rounded-xl text-[11px] font-mono overflow-x-auto leading-relaxed max-h-64">
            {appPropertiesSnippet}
          </pre>
        </div>
      </div>
    </div>
  );
};
