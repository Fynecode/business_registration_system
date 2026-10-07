# System architecture

This project follows a **DDD-Lite (Domain-Driven-Design inspired) architecture**, structured to separate business logic, application logic, and infrastructure concerns

The goal is to keep the system
- scalable
- maintainable
- framework-agnostic at the core
- easy to reason about

# High-level architecture

The system is divided into four main layers:
- Presentation
- Application
- Domain
- Infrastructure

---

# Layer responsibilities

## 1. Presentation layer

Includes:
- Vue components
- Pages
- Pinia stores
- Vue router
- Composables

Responsibilities
- UI state
- User interactions
- Calling use cases
- Displaying results and errors

❌ It does not contain business logic

---

## 2. Application layer
This is where **business workflows live**

Includes:
- Use cases (one per action)
- Input types (derived using typescript utilities)

Examples:
- CreateBusinessRequestUseCase
- AssignReviewerUseCase

Responsibilities:
- Orchestrating domain logic
- Validating business rules
- Calling repositories
- Coordinating side effects (notifications, etc.)

❌ Does not know about

---

## 3. Domain layer

This is the **core of the system**

Includes:
- Entities
- Repository interfaces
- Domain types

Examples:
- BusinessRequest
- Client
- Profile

Responsibilities
- Defining business models
- Enforcing domain structure
- Defining repository contracts

❌ Does not depend on any external systems

---

## 4. Infrastructure layer

This layer handles external systems.

Includes:
- Supabase implementation
- Cloudinary integration
- Auth handling

Responsibilities:
- Database operations
- Api calls
- External service integration

This is the only layer that knows:
- Supabase
- HTTP
- Cloud storage
- External APIs

---

# Data flow

Example: Creating a business request

User submits form ➡ Pinai store/composables ➡ CreateBusinessRequestUseCase ➡ BusinessRequest entity created ➡ Repository (interface) ➡ Supabase implementation ➡ Databse stores record ➡ Response returned back up chain

---

# Key design decisions

## 1. Repository pattern

Repositories abstract persistence logic

They only handle:
- create
- update
- delete
- query

❌ They do not contain business logic

---

## 2. Use case driven application layer

Every business action is represented as a use case

This avoids:
- Fat services
- Scattered logic in components
- Duplicated business rules

---

## 3. Supabase as infrastructure only

Supabase is treated as a **persistence detail**, not a core dependency

This ensures:
- Domain independence
- Easy migration if needed
- Testability

---

## 4. Error abstraction layer

All external errors (Supabase, network, auth) are mapped to domain errors:

- ValidationError
- NotFoundError
- UnauthorizedError
- ForbiddenError
- ConfilctError

This prevents infrastructure leaking into the UI

---

## 5. Frontend as presentation layer

Pinia stores and composables are used only for:
- UI state
- Caching
- Orchestration of use cases

❌ Not business logic

---

# Current architecture status

- ✔ Fully layered architecture in place
- ✔ Domain isolated from infrastructure
- ✔ Use case driven application
- ✔ Repository abstraction implemnted
- ✔ Supabase isolated to infrastructure
- ✔ Error mapping system implemented

---

# Fututre improvements

- Background job system (BullMQ-style queue)
- Event driven architecture for notfications
- Email service layer
- Audit logging system
- Multi-tennant architecture support
- Domain event system

---

# Summary

This system is designed to evolve from a simple business tool to a scalable internal platform

The architecture prioritizes:
- Clarity over complexity
- Separation of concerns
- Long term mainainability