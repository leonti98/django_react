# Social Network Application

This is a full-stack social network application built with React and Django. Users can register, create notes, follow other users, and like notes.

## Features

- User registration and authentication
- Create, edit, and delete notes
- Follow and unfollow users
- Like and unlike notes
- Pagination for notes
- Responsive design

## Technologies Used

- Frontend: React, React Router, Axios, Bootstrap
- Backend: Django, Django REST Framework, Simple JWT
- Database: SQLite (default, can be changed to PostgreSQL or other databases)

## Setup Instructions

### Prerequisites

- Node.js and npm
- Python and pip
- Django

### Backend Setup

#### 1. Clone the repository

```bash
git clone https://github.com/leonti98/django_react.git
```

#### 2. Change directory

```bash
cd backend
```

#### 3. Install Python dependencies

```bash
pip install -r requirements.txt
```

#### 4. Run Django migrations

```bash
python manage.py migrate
```

#### 5. Create a superuser

```bash
python manage.py createsuperuser
```

#### 6. Run the Django development server

```bash
python manage.py runserver
```

### Frontend Setup

#### 1. Change directory

```bash
cd frontend
```

#### 2. Install npm packages

```bash
npm install
```

#### 3. Run the React development server

```bash
npm start
```

## Screenshots
