import uvicorn
from app.utils.database import engine
from sqlalchemy import text

if __name__ == "__main__":
    # Create tables if not exists
    # Create tables if not exists
    with engine.connect() as connection:
        # Use text() to create a SQL expression
        users_table_sql = text(
        """
        CREATE TABLE IF NOT EXISTS users (
            user_name VARCHAR UNIQUE,
            email VARCHAR UNIQUE,
            password VARCHAR,
            is_verified BOOLEAN DEFAULT FALSE,
            is_admin BOOLEAN DEFAULT FALSE
        )
        """
        )
        tokens_table_sql = text(
            """
            CREATE TABLE IF NOT EXISTS tokens (
                id INTEGER PRIMARY KEY,
                token VARCHAR,
                user_name VARCHAR REFERENCES users(user_name)
            )
            """
        )

        email_verifications_table_sql = text(
            """
            CREATE TABLE IF NOT EXISTS email_verifications (
                id INTEGER PRIMARY KEY,
                token VARCHAR,
                user_name VARCHAR
            )
            """
        )

        connection.execute(users_table_sql)
        connection.execute(tokens_table_sql)
        connection.execute(email_verifications_table_sql)
    uvicorn.run(
        "app.api:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )

