---
id: blanky-app-db-collection-users
title: Users Database Collection
description: Detailed specification for the primary 'users' database collection, including schema, indexing, and relationships.
type: spec
subtype: database
status: draft
sequence: 5
tags:
  - database
  - schema
  - users
relatesTo: blanky-app
createdAt: 2026-02-07T22:09:30.985Z
updatedAt: 2026-02-07T22:09:30.985Z
---

# Users Database Collection Specification

This document defines the structure, indexing, and key considerations for the `users` database collection, which is central to the blanky-app project. This collection will store all essential information pertaining to individual user accounts, supporting core functionalities like authentication and personalization.

## Schema Definition

The `users` collection will adhere to the following schema:

*   `_id`: (String/ObjectID) Unique identifier for the user. Primary key.
*   `email`: (String) User's email address. Must be unique across all users. Used for login and communication.
*   `passwordHash`: (String) Hashed and salted password for security.
*   `name`: (String, Optional) User's full name or display name.
*   `createdAt`: (DateTime) Timestamp of when the user account was created.
*   `updatedAt`: (DateTime) Timestamp of the last time the user's information was updated.
*   `lastLogin`: (DateTime, Optional) Timestamp of the user's last successful login.
*   `status`: (String) Current status of the user account (e.g., `active`, `pending_email_verification`, `suspended`, `deleted`).
*   `roles`: (Array of Strings, Optional) List of roles assigned to the user (e.g., `admin`, `standard`, `guest`).

## Indexing Strategy

To ensure efficient data retrieval and maintain data integrity, the following indexes will be applied:

*   `email`: Unique index to enforce uniqueness and speed up login queries.
*   `createdAt`: Index for chronological sorting and querying of user creation dates.
*   `status`: Index for efficient filtering of users by their account status.

## Relationships

*   **One-to-Many:** A user can be associated with multiple items or records within other collections (e.g., `documents`, `tasks`). These relationships will typically be established via a `userId` foreign key in the related collections.

## Acceptance Criteria

*   **AC1:** Each document in the `users` collection must have a unique `_id` and `email`.
*   **AC2:** Passwords must be stored as secure, salted hashes (`passwordHash`) and never in plain text.
*   **AC3:** Essential user metadata (`createdAt`, `updatedAt`, `status`) must be accurately maintained.
*   **AC4:** Queries for users by `email` or `_id` must be performant.
*   **AC5:** The `status` field accurately reflects the user's account state, supporting `blanky-app-feature-user-authentication` and `blanky-app-flow-onboarding-user-setup`.

## Edge Cases

*   **EC1:** Schema evolution: Future additions or modifications to user attributes must be handled with appropriate migration strategies.
*   **EC2:** Data volume: The schema and indexing should scale efficiently for a large number of users.
*   **EC3:** Soft delete: Instead of permanent deletion, users with `status: 'deleted'` might be retained for audit purposes, with a mechanism for permanent purge.
*   **EC4:** Data privacy: Ensure sensitive user data beyond `passwordHash` is encrypted at rest if required by compliance.
*   **EC5:** Concurrent updates: Implement optimistic or pessimistic locking for user profile updates to prevent data corruption.

## Cross-references

*   `blanky-app-feature-user-authentication`: Relies heavily on this collection for user credentials and session management.
*   `blanky-app-flow-onboarding-user-setup`: Populates initial user data into this collection during the onboarding process.