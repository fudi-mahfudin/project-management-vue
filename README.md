# Pulse Project Management

An intuitive project management application built with modern web technologies. This app allows users to create, manage, and track projects with a clean and responsive user interface.

## 🚀 Features

- **Project Creation:** Easily create new projects with a title and description.
- **Task Management:** Add, edit, and delete tasks within each project.
- **User Authentication:** Secure user authentication powered by Supabase.
- **State Management:** Efficient and predictable state management with Pinia.
- **Responsive Design:** A mobile-first design built with Tailwind CSS.
- **Client-Side Routing:** Automatic file-based routing with `unplugin-vue-router`.

## 💻 Technologies Used

- **[Vue.js](https://vuejs.org/):** A progressive framework for building user interfaces.
- **[Vite](https://vitejs.dev/):** A next-generation frontend tooling that provides an extremely fast development experience.
- **[Supabase](https://supabase.com/):** An open-source Firebase alternative providing a powerful backend for authentication and database.
- **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapidly building custom designs.
- **[Pinia](https://pinia.vuejs.org/):** The official state management library for Vue.js, known for its simplicity and type safety.
- **[unplugin-vue-router](https://github.com/posva/unplugin-vue-router):** A file-based routing plugin for Vue Router that automatically generates routes from your file structure.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

You also need a Supabase project set up. Go to [Supabase](https://supabase.com/) and create a new project. You will need your `Project URL` and `anon public key` to connect your application.

## 🔧 Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/fudi-mahfudin/project-management-vue.git
    cd project-management-vue
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory of your project and add your Supabase credentials:

    ```env
    VITE_SUPABASE_URL=https://
    VITE_SUPABASE_ANON_KEY=
    SUPABASE_SERVICE_ROLE_KEy=
    TESTING_USER_EMAIL=
    ```

4.  **Set up the Supabase database:**
    Follow the Supabase documentation to create the necessary tables for `projects` and `tasks` with appropriate columns and row-level security policies.

## ▶️ Usage

### Development Server

Start the development server with hot-reloading:

```bash
npm run dev
# or
yarn dev
```
