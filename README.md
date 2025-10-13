# Waitlist App

## Repository
https://github.com/kid-us/waitlist-app

## Live Application
- Frontend: https://waitlist-app-six.vercel.app/
- Backend API Docs: https://waitlist.jamescog.com/docs

## Admin Dashboard Password
- Username: admin@example.com
- Password: password123

## Local Development Setup

### Prerequisites
- Python 3.8+
- Node.js 18+
- PostgreSQL database

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   Create a `.env` file in the backend directory with:
   ```
   DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/waitlist_db
   RESEND_API_KEY=your_resend_api_key
   JWT_SECRET_KEY=your_jwt_secret_key
   ```

5. Run the backend:
   ```bash
   uvicorn app:app --reload
   ```

6. Create an admin user (optional, for admin dashboard):
   ```bash
   python create_admin.py admin@example.com your_password
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Setup
Ensure PostgreSQL is running and create a database named `waitlist_db` or update the DATABASE_URL accordingly.