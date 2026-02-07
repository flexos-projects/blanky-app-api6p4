---
id: 1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d
title: 'Database Schema & Rules'
description: 'Detailed information about the database collections, schemas, relationships, and security rules for the Blanky-App platform itself.'
type: doc
subtype: core
status: draft
sequence: 4
tags:
  - database
  - schema
  - architecture
createdAt: '2026-02-07T22:09:30.985Z'
updatedAt: '2026-02-07T22:09:30.985Z'
---

# Database Schema & Rules

This document specifies the database architecture for the Blanky-App platform. This is the schema for our own application's backend, not the user-generated databases. We will use a NoSQL database (MongoDB) for its flexibility in handling dynamic, user-defined content.

## 1. Data Model Overview

The core data model revolves around Users, who own Projects. Each Project contains metadata and configurations, including definitions for user-created Collections. The actual data for those user-created Collections is stored in a separate, multi-tenant `records` collection.

## 2. Platform Collections

### `users`

Stores information about the users who sign up for Blanky-App.

-   `_id`: `ObjectId` (Primary Key)
-   `authId`: `String` (ID from external auth provider like Auth0, indexed, unique)
-   `email`: `String` (Indexed, unique)
-   `name`: `String` (Optional)
-   `subscription`: `Object`
    -   `plan`: `String` (e.g., 'free', 'pro', 'team')
    -   `status`: `String` (e.g., 'active', 'past_due', 'canceled')
    -   `stripeCustomerId`: `String`
-   `createdAt`: `Date`
-   `updatedAt`: `Date`

### `projects`

Stores metadata for each application a user builds.

-   `_id`: `ObjectId` (Primary Key)
-   `name`: `String`
-   `slug`: `String` (User-defined URL slug, indexed, unique across the platform)
-   `ownerId`: `ObjectId` (Foreign Key to `users._id`, indexed)
-   `draftConfig`: `Object` (A large JSON object representing the current, unpublished state of the app, including pages, component hierarchy, and properties)
-   `publishedConfig`: `Object` (The JSON config for the last successfully published version of the app)
-   `customDomain`: `String` (Optional)
-   `createdAt`: `Date`
-   `updatedAt`: `Date`

### `collections`

Stores the schema definitions for the data collections created by a user *within* a specific project.

-   `_id`: `ObjectId` (Primary Key)
-   `projectId`: `ObjectId` (Foreign Key to `projects._id`, indexed)
-   `name`: `String` (e.g., 'Customers', 'Invoices')
-   `slug`: `String` (e.g., 'customers', 'invoices', unique within the project)
-   `fields`: `Array`
    -   `name`: `String`
    -   `type`: `String` (e.g., 'text', 'number', 'boolean', 'date', 'relation')
    -   `required`: `Boolean`
-   `createdAt`: `Date`

### `records`

This is the multi-tenant collection that stores the actual data rows for all user-created collections across all projects.

-   `_id`: `ObjectId` (Primary Key)
-   `collectionId`: `ObjectId` (Foreign Key to `collections._id`, indexed)
-   `projectId`: `ObjectId` (Foreign Key to `projects._id`, indexed for security rules)
-   `data`: `Object` (A free-form object where keys are field slugs and values are the user-entered data, e.g., `{ "customer-name": "John Doe", "signup-date": "2026-02-08" }`)
-   `createdBy`: `String` (Identifier for the end-user who created the record, for future permissioning)
-   `createdAt`: `Date`
-   `updatedAt`: `Date`

## 3. Relationships

-   **Users to Projects:** One-to-Many (`users._id` -> `projects.ownerId`)
-   **Projects to Collections:** One-to-Many (`projects._id` -> `collections.projectId`)
-   **Collections to Records:** One-to-Many (`collections._id` -> `records.collectionId`)

## 4. Indexes

Proper indexing is critical for performance.

-   `users`: `authId` (unique), `email` (unique)
-   `projects`: `ownerId`, `slug` (unique)
-   `collections`: `projectId`
-   `records`: `collectionId`, `projectId` (compound index for efficient querying and security)

## 5. Security Rules

Security will be enforced at the API layer before any database query is executed.

-   **Rule 1: User Data Isolation:** A logged-in user can only perform CRUD operations on `projects` where `ownerId` matches their own `userId`.
-   **Rule 2: Project Data Containment:** When accessing `collections` or `records`, the query must always include a `projectId` filter that the user has been authorized to access.
-   **Rule 3: Public App Data Access:** For published apps, data is accessed via a separate, more restrictive API endpoint. This endpoint will have its own set of rules, defined by the app creator in the project settings (a P1 feature). For MVP, all data in a published app will be publicly readable, and form submissions will be publicly writable to the specified collection.
-   **Rule 4: Write Validation:** When a new record is created in the `records` collection, the API must first fetch the corresponding `collections` schema and validate that the incoming `data` object conforms to the defined field types and `required` constraints.