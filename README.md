# SchoolHelp

SchoolHelp is a web application that connects schools with volunteers who can provide tutoring services and resources. Built with React, Vite, and TailwindCSS, it provides a platform for schools to request assistance and for volunteers to offer their help.

## Features

- **Authentication System**

  - User registration for volunteers
  - Secure login for school administrators and volunteers
  - Role-based access control

- **School Administrator Features**

  - Create new requests for tutoring or resources
  - Review and manage volunteer offers
  - Track request status (New, Pending, Closed)
  - Dashboard to view all school requests

- **Volunteer Features**
  - Browse available requests from schools
  - Submit offers to help with specific requests
  - View request details and requirements

## Tech Stack

- [React](https://reactjs.org/) - Frontend framework
- [Vite](https://vitejs.dev/) - Build tool
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [React Router](https://reactrouter.com/) - Routing
- [Framer Motion](https://www.framer.com/motion/) - Animations

## Getting Started

1. Clone the repository

```sh
git clone <repository-url>
```

2. Install dependenciesnpm install

```sh
npm install
```

3. Run the development server

```sh
npm run dev
```

## Project Structure

src/
├── components/ # Reusable UI components
├── context/ # React context providers
├── layouts/ # Page layouts
├── pages/ # Application pages
├── services/ # Business logic and data handling
└── assets/ # Static assets
