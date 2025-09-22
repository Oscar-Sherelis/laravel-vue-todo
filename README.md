# To-Do Application

A modern To-Do application built with Vue.js 3 and Laravel API.

## Features

- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as completed/incomplete
- ✅ Separate views for todo and completed tasks
- ✅ Modern UI with Vuetify and Tailwind CSS
- ✅ RESTful API with Laravel
- ✅ PostgreSQL database
- ✅ Responsive design

## Tech Stack

**Frontend:**
- Vue.js 3 (Composition API)
- TypeScript
- Vuetify (Material Design)
- Tailwind CSS
- Pinia (State Management)
- Vite

**Backend:**
- Laravel 12
- PostgreSQL

### 📦 Prerequisites
Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- Composer (v2.0 or higher)
- PHP (v8.1 or higher)
- PostgreSQL (v12 or higher)

## 🚀 Setup Instructions
### Backend Setup

1. Clone Repository and navigate to backend directory:
```bash
git clone https://github.com/Oscar-Sherelis/laravel-vue-todo
cd backend
```
2. Install dependencies:
```bash
composer install
```
3. Setup environment, after run command:
```bash
# Generate application key
php artisan key:generate
```
4. Install API support:
```bash
php artisan install:api
```
5. Setup database:
```bash
# Create database (if not already created)
createdb todo_app

# Run migrations
php artisan migrate

# Optional: Seed database with sample data
php artisan db:seed
```
6. Verify API routes:
```bash
# Check if routes are registered
php artisan route:list --path=api
```
7. Start Laravel development server:
```bash
php artisan serve
```

### Frontend  Setup

1. Navigate to frontend directory:
```bash
cd ../frontend
```
2. Install Node.js dependencies:
```bash
npm install
```
3. Run:
```bash
npm run dev
```