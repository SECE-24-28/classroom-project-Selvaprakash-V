# Day 6 Assignment - React Project Setup & Component Architecture

## Project Information
- **Project Name:** RechargeX - Mobile Recharge Web Application
- **Framework:** React 19.2.0 with Vite 7.2.4
- **Date:** December 8, 2025
- **Student:** Selvaprakash V

---

## ✅ Assignment Completion Summary

### Task 1: Set Up React Project Using Vite ✓
- ✅ Vite and React project successfully created
- ✅ Development server verified and running
- ✅ Project structure explored and understood

**Project Structure:**
```
RechargeX/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── Footer.jsx
│   │   ├── Footer.css
│   │   ├── Sidebar.jsx
│   │   └── Sidebar.css
│   ├── App.jsx           # Main application component
│   ├── App.css           # Application styles
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── REACT_CONCEPTS.md     # React concepts documentation
```

---

### Task 2: Learn Core React Concepts ✓

Documented understanding of 6 core concepts (5-6 lines each):
- ✅ **JSX** - JavaScript XML syntax extension
- ✅ **Virtual DOM** - In-memory DOM representation
- ✅ **Functional Components** - JavaScript functions returning JSX
- ✅ **Props & State** - Component data management
- ✅ **Component Hierarchy** - Parent-child component structure
- ✅ **Folder Structuring** - Organized project architecture

📄 **Documentation:** See `REACT_CONCEPTS.md` for detailed explanations

---

### Task 3: Create Core Reusable Components ✓

All three required components created in `src/components/`:

#### 1. **Navbar.jsx** ✓
- Functional component with modern design
- Includes logo, navigation menu, and action buttons
- Props: None (self-contained)
- Features: Sticky positioning, gradient background, responsive layout
- Demonstrates: JSX, functional components, CSS-in-JS separation

#### 2. **Footer.jsx** ✓
- Functional component with multi-section layout
- Includes company info, quick links, support, and social media
- Props: None (uses internal state for year)
- Features: Grid layout, dynamic year display
- Demonstrates: State usage (currentYear), component structure

#### 3. **Sidebar.jsx** ✓
- Interactive functional component with state management
- Includes navigation menu, user profile section
- **Props:** `isOpen` (boolean), `toggleSidebar` (function)
- **State:** `activeItem` (tracks selected menu item)
- Features: Toggle visibility, overlay, active state highlighting
- Demonstrates: Props, useState hook, event handling, conditional rendering

---

### Task 4: Component Integration in App.jsx ✓

- ✅ All components imported and rendered in `App.jsx`
- ✅ Component hierarchy established
- ✅ Props passed to Sidebar component
- ✅ State management for sidebar toggle functionality

**Component Hierarchy:**
```
App (Parent)
├── Navbar
├── Sidebar (receives props: isOpen, toggleSidebar)
├── Main Content (features section)
└── Footer
```

---

## 🎯 Key React Concepts Demonstrated

### 1. **Functional Components**
All components use modern functional syntax:
```jsx
function ComponentName() {
  return <JSX />
}
```

### 2. **JSX Implementation**
- HTML-like syntax in JavaScript
- Dynamic expressions with `{}`
- Conditional rendering with ternary operators

### 3. **Props (Properties)**
Sidebar component receives props from parent:
```jsx
<Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
```

### 4. **State Management**
Using `useState` hook:
- App.jsx: `sidebarOpen` state
- Sidebar.jsx: `activeItem` state
- Footer.jsx: `currentYear` calculation

### 5. **Component Reusability**
- Navbar, Footer, Sidebar can be used across multiple pages
- Self-contained styling with separate CSS files
- Props enable customization

### 6. **Event Handling**
- Click handlers for menu toggle
- Sidebar item selection
- Button interactions

---

## 🚀 How to Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📝 Component Features Summary

| Component | Props | State | Key Features |
|-----------|-------|-------|--------------|
| Navbar | None | None | Logo, navigation menu, auth buttons |
| Footer | None | currentYear | Multi-section layout, social links |
| Sidebar | isOpen, toggleSidebar | activeItem | Collapsible menu, user profile, overlay |

---

## 💡 Learning Outcomes

1. ✅ Successfully set up React project with Vite
2. ✅ Understanding of JSX syntax and Virtual DOM
3. ✅ Created functional components with proper structure
4. ✅ Implemented props for parent-child communication
5. ✅ Used useState hook for state management
6. ✅ Established proper component hierarchy
7. ✅ Organized code with proper folder structure
8. ✅ Applied modern CSS styling techniques

---

## 🎨 Design Features

- **Color Scheme:** Purple gradient theme (#667eea to #764ba2)
- **Layout:** Responsive grid system
- **Interactions:** Hover effects, smooth transitions
- **Typography:** Modern, readable font hierarchy
- **Components:** Modular, reusable design

---

**Status:** ✅ Assignment Complete  
**All Tasks Completed Successfully**
