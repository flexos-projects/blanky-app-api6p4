---
id: a1b2c3d4-e5f6-7890-1234-567890abcdef
title: 'Feature Inventory'
description: 'A prioritized list of features for Blanky-App, defining the scope for MVP, P1, and P2 phases.'
type: doc
subtype: core
status: draft
sequence: 2
tags:
  - features
  - roadmap
  - mvp
createdAt: '2026-02-07T22:09:30.985Z'
updatedAt: '2026-02-07T22:09:30.985Z'
---

# Feature Inventory

This document provides a comprehensive inventory of features for Blanky-App, prioritized into three phases: P0 (MVP), P1 (Fast Follow), and P2 (Future). This prioritization is guided by the personas and strategy defined in the [Vision Document](./001-vision.md).

## P0: Minimum Viable Product (MVP)

The goal of the MVP is to deliver a core, functional product that allows our primary persona, "Sam the Service Pro," to build a simple but useful application. The focus is on the essential building blocks of app creation.

| Feature ID | Feature Name | Description | Priority |
|---|---|---|---|
| FE-101 | **Visual App Editor** | A drag-and-drop interface for adding and arranging components on a page canvas. Includes a live preview. | P0 |
| FE-102 | **Component Library (Basic)** | A set of essential UI components: Text, Button, Form, Text Input, Table, Card List, Container. | P0 |
| FE-103 | **Component Properties Panel** | An inspector panel to configure the properties of a selected component (e.g., button text, table data source). | P0 |
| BE-201 | **User Authentication** | Secure user sign-up, login, and session management for the Blanky-App platform itself (email/password). | P0 |
| BE-202 | **Project Management** | Users can create, name, and delete their app projects from a central dashboard. | P0 |
| BE-203 | **Database Management (CRUD)** | A user-friendly interface, as described in the [Pages Document](./003-pages.md), to create data 'Collections' (like tables), define fields (text, number, boolean, date), and manually add/edit/delete records. | P0 |
| BE-204 | **Data Binding** | Ability to connect components to a data collection. For example, binding a Table component to display all records from a 'Customers' collection. | P0 |
| BE-205 | **Form Logic** | Ability to configure a Form component to create a new record in a specified collection upon submission. | P0 |
| DP-301 | **One-Click Publishing** | A single button to deploy the current app draft to a public URL on a `blanky.app` subdomain (e.g., `sams-landscaping.blanky.app`). | P0 |
| DS-401 | **Responsive Layouts** | Apps built on the platform are automatically responsive and usable on desktop, tablet, and mobile devices. | P0 |

## P1: Fast Follow

Once the MVP is validated, we will quickly follow up with features that broaden the platform's utility and address key requests.

| Feature ID | Feature Name | Description | Priority |
|---|---|---|---|
| FE-104 | **Component Library (Advanced)** | Add more complex components: Charts, Maps, Calendars, File Uploaders. | P1 |
| BE-206 | **User Roles & Permissions** | Allow app creators to define roles (e.g., 'Admin', 'User') for their published apps and control read/write access to data collections. | P1 |
| BE-207 | **Third-Party Integrations** | Initial integrations with Stripe (for payments) and Zapier (to connect with thousands of other apps). | P1 |
| BE-208 | **File Storage** | A system for users of published apps to upload and store files (images, documents). | P1 |
| DP-302 | **Custom Domains** | Allow users to connect their own custom domain names to their published apps. | P1 |

## P2: Future Vision

These are larger, more complex features that will establish Blanky-App as a market leader.

| Feature ID | Feature Name | Description | Priority |
|---|---|---|---|
| FE-105 | **App Templates** | A library of pre-built, cloneable app templates for common use cases (CRM, Project Tracker, Inventory Management). | P2 |
| FE-106 | **Component Marketplace** | Allow third-party developers to create and sell their own components on the Blanky-App platform. | P2 |
| BE-209 | **Team Collaboration** | Allow multiple users to collaborate on building a single Blanky-App project, with comments and version history. | P2 |
| BE-210 | **Backend Logic Flows** | A visual workflow builder to create more complex business logic (e.g., 'When a new invoice is created, send an email to the customer'). | P2 |
| DP-303 | **Native Mobile Export** | Ability to export a project as a native iOS and Android application package. | P2 |

### Dependencies

- The **Visual App Editor (FE-101)** is dependent on the **Component Library (FE-102)**.
- **Data Binding (BE-204)** is critically dependent on a functional **Database Management (BE-203)** system.
- **One-Click Publishing (DP-301)** requires a robust deployment pipeline, as detailed in the [Technical Document](./007-technical.md).