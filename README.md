# Full-Stack User Authentication & Admin Dashboard Template

A complete, responsive, and secure full-stack web application template featuring user authentication (JWT + bcrypt password hashing) and a restricted administration dashboard.

## Tech Stack
*   **Backend**: Python 3.10+ using **FastAPI**
*   **ORM**: **SQLAlchemy** for database modeling
*   **Local Database**: **SQLite** (auto-created for immediate local testing)
*   **Production Database**: Configuration ready for **PostgreSQL**
*   **Security**: `passlib` (`bcrypt` scheme) for password hashing + JWT (`PyJWT`) session-based bearer tokens
*   **Frontend**: Modern glassmorphic dark design built with **HTML5**, **Vanilla JS**, and styled with **Tailwind CSS** (via CDN)

---

## Directory Structure
```
user-auth-dashboard/
├── README.md                  # Instructions and setup guide
├── backend/
│   ├── requirements.txt       # Python backend dependencies
│   ├── database.py            # SQLAlchemy session and engine configuration
│   ├── models.py              # User database model
│   ├── schemas.py             # Pydantic data schemas
│   ├── auth.py                # Password hashing, JWT encode/decode, and security guards
│   └── main.py                # FastAPI main routes, CORS middleware, and initial seeder
└── frontend/
    ├── css/
    │   └── style.css          # Custom styling (glassmorphic cards, alerts, fonts, animations)
    ├── js/
    │   └── auth.js            # Auth utility wrapper (token manager, request guards, redirect functions)
    ├── index.html             # User login page
    ├── register.html          # User registration page
    ├── dashboard.html         # Restricted user dashboard (profile display)
    └── admin.html             # Restricted admin dashboard (user listing & user deletion)
```

---

## Getting Started

### 1. Setup Backend Server

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   *   **Windows (PowerShell)**:
       ```powershell
       .\venv\Scripts\Activate.ps1
       ```
   *   **Windows (CMD)**:
       ```cmd
       .\venv\Scripts\activate.bat
       ```
   *   **Linux / macOS**:
       ```bash
       source venv/bin/activate
       ```

4. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run the FastAPI development server:
   ```bash
   uvicorn main:app --reload
   ```
   *The API server will now be running on `http://127.0.0.1:8000`.*
   *You can access the automatic interactive API documentation at `http://127.0.0.1:8000/docs`.*

---

### 2. Switching SQLite to PostgreSQL

By default, the backend connects to an SQLite database file `sql_app.db` generated automatically in the `backend/` folder on startup.

To connect the application to a PostgreSQL database for Linux deployment, set the `DATABASE_URL` environment variable before starting the backend server:

*   **Linux / macOS**:
    ```bash
    export DATABASE_URL="postgresql://username:password@localhost:5432/databasename"
    uvicorn main:app --reload
    ```
*   **Windows (PowerShell)**:
    ```powershell
    $env:DATABASE_URL="postgresql://username:password@localhost:5432/databasename"
    uvicorn main:app --reload
    ```

---

### 3. Setup Frontend

Since FastAPI's CORS (Cross-Origin Resource Sharing) middleware is pre-configured to accept requests from all origins, you can run the frontend in a few ways:

#### Option A: Run a Local Static Server (Recommended)
Running a local static server helps bypass strict browser permissions regarding local files (`file://`).

Using Python, run this command inside the `frontend/` folder:
```bash
cd frontend
python -m http.server 3000
```
Open your browser and navigate to `http://localhost:3000/index.html`.

#### Option B: Direct File Open
Double click on `frontend/index.html` to open it directly in your web browser.

---

## Credentials for Testing

On backend startup, a default administrator is seeded automatically into the database for immediate validation of the admin dashboard:

*   **Admin Email**: `admin@example.com`
*   **Admin Password**: `adminpassword`

For normal user testing, navigate to `register.html`, create a standard account, and log in to explore the dashboard.

---

## Security Customization
Before deploying this template to production, make sure to override these parameters in `backend/auth.py` or set them as environment variables:
*   `SECRET_KEY`: Set this to a long random security secret.
*   `ACCESS_TOKEN_EXPIRE_MINUTES`: Customize session expiration length.
