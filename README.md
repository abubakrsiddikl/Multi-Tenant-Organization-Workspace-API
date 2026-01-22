# Multi-Tenant Organization Workspace Management API

A robust, production-grade **Multi-Tenant Workspace Management REST API** built with **Node.js, TypeScript, Express.js, and MongoDB (Mongoose)**.  
The system is designed with strict **data isolation** and **role-based authorization**, ensuring that organizations and their data remain fully separated.

---

## 🚀 Live API & Documentation

- **Live API URL:**  
  https://multi-tenant-organization-workspace-api-oyqg.onrender.com

- **Postman Collection:**  
  👉 *(Attach your exported Postman Collection JSON or public Postman link here)*

---

## 🛠 Project Overview

This project simulates a real-world **multi-tenant SaaS backend** where multiple organizations operate within the same platform while remaining fully isolated.

### Supported Roles
1. **Platform Admin**
   - Can create and view all organizations

2. **Organization Admin**
   - Belongs to one organization
   - Can manage users, projects, and tasks within their organization

3. **Organization Member**
   - Belongs to one organization
   - Can only view tasks assigned to them

---

## 📂 Folder Structure Explanation

The project follows a **modular and scalable architecture**, separating concerns clearly:

```text
src/
├── app/
│   ├── modules/
│   │   ├── auth/           # Authentication & login logic
│   │   ├── user/           # User management & schema
│   │   ├── organization/   # Organization (multi-tenant root)
│   │   ├── project/        # Project management
│   │   └── task/           # Task assignment & tracking
│   │
│   ├── middleware/         # Auth, RBAC & validation middlewares
│   ├── config/             # Environment & database configuration
│   ├── utils/              # Utility helpers (JWT, error handling)
│   └── routes/             # Centralized route registration
│
└── server.ts               # Application entry point

📊 ER Diagram

The ER diagram below represents the database schema and relationships between core entities.

👉 Click the link to view the ER Diagram:
https://drive.google.com/file/d/1n5R_QElb3TWiF4Tt9gzJSPIzZbL6BTXG/view?usp=sharing

Entity Relationships (Logical View)

An Organization has many Users

An Organization owns many Projects

A Project contains many Tasks

A User can be assigned multiple Tasks

💾 Database Choice Reasoning

I chose MongoDB with Mongoose for this assignment due to the following reasons:

Flexible Schema: Workspace requirements (tasks, statuses, metadata) evolve frequently. MongoDB allows schema evolution without heavy migrations.

Scalability: MongoDB supports horizontal scaling, making it suitable for multi-tenant systems with growing organizations.

Native JSON Support: Works naturally with Node.js and TypeScript, reducing object-mapping overhead.

Explicit Tenant Isolation: Each document contains an organizationId, ensuring strict data separation at the query level.

🔐 Authentication & Authorization Strategy

Authorization is enforced using JWT-based authentication and Role-Based Access Control (RBAC).

How It Works

JWT Verification

Every protected route requires a valid Bearer Token.

Request Enrichment

After verification, the decoded payload is attached to req.user:

{
  userId,
  role,
  organizationId
}


Multi-Tenant Data Isolation

Every database query enforces:

{ organizationId: req.user.organizationId }


Even if a user knows another organization’s resource ID, access is denied.

Role Restrictions

Platform Admin → Organization management

Organization Admin → User, Project, Task management

Member → Can only view tasks where:

{ assignedTo: req.user.userId }


Authorization logic is enforced via middleware and service layers, not directly in route files.

📮 Postman Usage Notes

Import the Postman Collection

Use the Live API URL as the base URL

Login using the test credentials below

Copy the returned accessToken

Set it as a Bearer Token in the Authorization tab

Recommended API Flow

Login as Platform Admin → Create Organization

Login as Organization Admin → Create Project & Users

Login as Member → View assigned tasks

🔑 Test Credentials
Role	Email	Password
Platform Admin	platform.admin@abctech.com
	Admin@123
Organization Admin	admin@creativesolutions.com
	OrgAdmin@123
Organization Member	member.one@creativesolutions.com
	Member@123
✅ Key Highlights

Strict multi-tenant data isolation

Role-based access control

Clean modular architecture

Centralized error handling

Production-ready deployment