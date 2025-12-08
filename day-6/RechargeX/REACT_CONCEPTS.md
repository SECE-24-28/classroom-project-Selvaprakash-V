# React Core Concepts - Day 6 Assignment

## 1. JSX (JavaScript XML)
JSX is a syntax extension for JavaScript that allows us to write HTML-like code within JavaScript. It makes React code more readable and expressive by combining markup and logic in the same file. JSX gets transpiled to regular JavaScript function calls (React.createElement) by tools like Babel. It supports JavaScript expressions inside curly braces {}, enabling dynamic content rendering. JSX enforces stricter rules than HTML, such as self-closing tags and camelCase property names.

## 2. Virtual DOM
The Virtual DOM is a lightweight, in-memory representation of the actual DOM. React maintains this virtual copy to optimize UI updates and improve performance. When state changes occur, React first updates the Virtual DOM, then calculates the minimal set of changes needed (diffing algorithm). Only the differences are applied to the real DOM, reducing expensive DOM manipulations. This reconciliation process makes React applications fast and efficient.

## 3. Functional Components
Functional components are JavaScript functions that accept props as arguments and return JSX elements. They are the modern, preferred way to create React components due to their simplicity and readability. With React Hooks (like useState, useEffect), functional components can manage state and lifecycle features. They encourage a more declarative programming style and are easier to test and maintain. Functional components are more lightweight compared to class components.

## 4. Props & State
Props (properties) are read-only inputs passed from parent to child components, enabling data flow down the component tree. State represents internal, mutable data that a component manages itself, triggering re-renders when updated. Props make components reusable and configurable, while state makes them interactive and dynamic. Props cannot be modified by the receiving component, ensuring one-way data flow. State is managed using hooks like useState in functional components.

## 5. Component Hierarchy
Component hierarchy refers to the tree-like structure of parent and child components in a React application. Parent components can pass data down to children via props, creating a unidirectional data flow. This structure promotes modularity, reusability, and separation of concerns in application design. Higher-level components manage business logic, while lower-level components focus on presentation. A well-designed hierarchy improves maintainability and makes the codebase more scalable.

## 6. Folder Structuring
Proper folder structure organizes React applications into logical, maintainable units for better scalability. Common approaches include grouping by feature (pages, components, services) or by type (components, hooks, utils). The `src/components/` directory typically contains reusable UI components shared across the application. Separation of concerns helps teams collaborate effectively and locate files quickly. A clean structure reduces complexity and technical debt as the project grows.

---

**Project:** Mobile Recharge Web Application (RechargeX)  
**Date:** December 8, 2025  
**Student:** Selvaprakash V
