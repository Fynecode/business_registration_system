# Business registration system

The business registration system is a web platform design for business consultants to manage client business registration requests, document collection, and internal review workflows through a structured, role-based process

# Current features

ATHENTICATION
- Login
- Signup
- Role-base authorization
- Session persistence

CLIENT
- Profile management
- Submit business registration request
- Upload supporting documents
- View request history

STAFF
- Review assign requests
- Update request status
- Manage business registrations

SYSTEM
- Supabase authentication
- Row level security
- Global error handling
- Retry logic
- Offline profile caching

# Tech Stack

FRONTEND
- Vue 3
- Typescript
- Pinia
- Vue router

BACKEND SERVICES
- Supabase
- PostgreSQL
- Cloudinary

ARCHITECTURE
- Domain-Driven-Design (DDD-Lite)
- Repository pattern
- Use cases
- Clean architecture

# Architecture Diagram (in progress)

Presentation ➡
Application (use cases) ➡
Domain (entities + repositories) ➡
Infrastructure (supabase/cloudinary)

# Project Status

current version (v0.1.0)

✔ Authentication
✔ Business requests
✔ Error handling
✔ Design system
🚧 Staff dashboard
🚧 Email notifications
🚧 Change password
🚧 Change email
