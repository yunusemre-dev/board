# Task Management Board

A modern, responsive task management board built with Next.js, TypeScript, and Tailwind CSS. Features a drag-and-drop interface, dark mode support, and a clean, professional design.

## Features

- 🎯 Drag-and-drop task management
- 🌓 Dark/Light mode support
- 📱 Fully responsive design
- 🎨 Clean and modern UI using Tailwind CSS
- 🔄 Real-time task updates
- 📊 Task status tracking
- 👥 User assignment
- 📅 Due date management
- 🏷️ Story point estimation
- 🔍 Context menu actions
- 🎯 Column-based workflow (Open, In Progress, In Review, Done)

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: 
  - Radix UI primitives
  - shadcn/ui components
- **State Management**: Zustand
- **Drag & Drop**: dnd-kit
- **Date Handling**: date-fns
- **Form Handling**: React Hook Form + Zod

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/task-board.git
cd task-board
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

## Key Features Implementation

### Task Management
- Drag-and-drop interface for task reordering
- Status updates through context menu
- Task editing with form validation
- Delete confirmation dialogs

### UI/UX
- Collapsible sidebar navigation
- Smooth animations and transitions
- Loading states and skeletons
- Toast notifications

### Data Management
- Mock API with simulated network delays
- Zustand store for state management
- TypeScript types for data consistency