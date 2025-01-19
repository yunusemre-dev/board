![image](https://github.com/user-attachments/assets/bd5d4afa-ff5c-4bac-b2e3-8e5c66f272f5)

# Task Management Board

A modern task management board built with Next.js, TypeScript, and Tailwind CSS. Features a drag-and-drop interface, dark mode support, and a clean, professional design.

## Features

- 🎯 Drag-and-drop task management
- 🎨 Clean and modern UI using Tailwind CSS and shadcn/ui
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
- **Form Handling**: React Hook Form + Zod

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yunusemre-dev/board.git
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

  ![image](https://github.com/user-attachments/assets/eca8ac07-20b6-4639-9d4f-4e82beb7c58c)


### UI/UX
- Collapsible sidebar navigation
- Smooth animations and transitions
- Loading states and skeletons
- Toast notifications

  ![image](https://github.com/user-attachments/assets/6e1f5128-e712-46b0-867d-67e196c402ca)


### Data Management
- Mock API with simulated network delays
- Zustand store for state management
- TypeScript types for data consistency
