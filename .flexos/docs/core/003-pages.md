---
id: f0e9d8c7-b6a5-4321-fedc-ba9876543210
title: 'Pages & User Journeys'
description: 'Defines the site map, page inventory, and key user journeys for the Blanky-App platform.'
type: doc
subtype: core
status: draft
sequence: 3
tags:
  - ux
  - pages
  - sitemap
createdAt: '2026-02-07T22:09:30.985Z'
updatedAt: '2026-02-07T22:09:30.985Z'
---

# Pages & User Journeys

This document outlines the overall structure of the Blanky-App platform, including the site map, a detailed inventory of key pages, and critical user journeys.

## 1. Site Map

The application is divided into two main sections: public-facing marketing pages and the authenticated application where users build.

- **Public Site**
  - `/` - Landing Page
  - `/features` - Detailed feature overview
  - `/pricing` - Subscription plans
  - `/login` - User login page
  - `/signup` - User registration page

- **Authenticated App**
  - `/dashboard` - Main dashboard listing all user projects.
  - `/apps/:projectId/editor` - The core visual app builder UI.
  - `/apps/:projectId/data` - Interface for managing data collections.
  - `/apps/:projectId/settings` - Settings for a specific app (e.g., name, subdomain, custom domain).
  - `/account` - User account settings (e.g., profile, billing, API keys).

## 2. Page Inventory

Here is a breakdown of the most important pages within the authenticated experience.

### Dashboard (`/dashboard`)

*   **Purpose:** The central hub for users after they log in. It provides an overview of all their projects and is the entry point for creating new ones.
*   **Key Elements:**
    *   A prominent "Create New App" button.
    *   A grid or list of project cards. Each card displays the app's name, a visual thumbnail, the last updated date, and a status indicator (Draft/Published).
    *   A navigation header with links to Account settings and a Logout button.
    *   A search bar to filter projects by name.

### App Editor (`/apps/:projectId/editor`)

*   **Purpose:** This is the heart of Blanky-App, where users visually construct their applications.
*   **Layout:** A three-panel interface for an efficient workflow.
    *   **Left Panel (Component & Page Tree):** A tabbed view. The first tab contains the drag-and-drop component library (Buttons, Forms, Tables, etc.). The second tab shows a tree view of all pages and the components within the currently selected page.
    *   **Center Panel (Canvas):** A large, interactive canvas that provides a live, what-you-see-is-what-you-get (WYSIWYG) preview of the application being built.
    *   **Right Panel (Properties Inspector):** A context-aware panel that displays all configurable properties for the currently selected component on the canvas (e.g., text content, color, data bindings, event handlers).
*   **Header:** Contains the app name, a 'Preview' button, and the primary 'Publish' button.

### Data Manager (`/apps/:projectId/data`)

*   **Purpose:** To provide a simple, spreadsheet-like interface for managing the data that powers the user's application.
*   **Key Elements:**
    *   A left sidebar listing all 'Collections' (tables) for the current project.
    *   A main content area that displays the records of the selected collection in a tabular format.
    *   Controls to add/delete collections, add/edit/delete fields (columns), and add/edit/delete records (rows).
    *   Import/Export functionality (a P1 feature).

## 3. User Journeys

### Journey 1: New User Onboarding & First App Publish

This journey is critical for user activation and retention.

1.  **Sign Up:** User lands on the marketing site, clicks 'Sign Up', and creates an account using their email and password.
2.  **Welcome & First Project:** Upon first login, they are greeted with a welcome modal and prompted to name their first app.
3.  **Enter Editor with Tutorial:** After creating the project, they are taken directly to the App Editor (`/apps/:projectId/editor`). An interactive, guided tutorial starts automatically.
4.  **Guided Building:** The tutorial walks them through the core actions:
    *   Dragging a `Table` component onto the canvas.
    *   Navigating to the `Data` tab to create a new `Customers` collection with `name` and `email` fields.
    *   Adding a few sample customer records.
    *   Returning to the `Editor` and using the Properties Inspector to bind the `Table` component to the `Customers` collection.
5.  **Publish:** The tutorial culminates in prompting the user to click the 'Publish' button.
6.  **Success:** The user sees a success confirmation with their live app URL (`new-app.blanky.app`), which they can visit immediately. The journey's goal is to provide an 'aha!' moment within minutes.

### Journey 2: Adding a Data Entry Form

This is a common follow-up action for a user who has built a data-viewing app.

1.  **Create New Page:** From the Editor, the user creates a new page named "Add Customer".
2.  **Add Form Components:** The user drags a `Form Container`, two `Text Input` components, and a `Button` onto the canvas.
3.  **Configure Inputs:** They label the inputs "Name" and "Email".
4.  **Configure Button Action:** They select the `Button` and, in the Properties Inspector, set its 'On Click' action to 'Submit Form'.
5.  **Configure Form Action:** They select the `Form Container` and set its 'On Submit' action to 'Create New Record' in the `Customers` collection, mapping the form inputs to the corresponding collection fields.
6.  **Add Navigation:** The user navigates back to their main page and adds a button that links to the "Add Customer" page.
7.  **Republish:** The user clicks 'Publish' again to deploy the changes.