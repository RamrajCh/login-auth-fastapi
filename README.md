# login-auth-fastapi

## Environment variables

The required environment variables can be found in `./backend/.test-env`. The contents from the that file are as follows:
```
DATABASE_URL = <Your database>
SMTP_SERVER = <Your smpt server>
SMTP_PORT = <Your smtp port>
SMTP_USERNAME = <Your smtp username>
SMTP_PASSWORD = <Your smtp password>
BASE_URL = 'http://localhost:8000'
HCAPTCHA_SECRET_KEY = <HCaptcha Secret Key>
HCAPTCHA_BASE_URL = <HCaptcha Base url>
JWT_SECRET_KEY = <Your secret JWT key>
JWT_ALGORITHM = <JWT algorithm to use>
JWT_ACCESS_TOKEN_EXPIRE_MINUTES = <JWT expiry time in minutes>
```

Copy these configuration keys and paste to `.env`. Add all the values accurately.

## Backend server

Follow the steps below to run backend FastAPI server.
```
cd backend
```

Install `python3` and `pip3`, then set up virtual environment for the first time and install the dependencies using the commands:

### Linux
```
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Windows
```
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

After installing the dependencies run the FASTAPI development server using:
```
python main.py
```

API server can be now accessed through the base url `http://localhost:8000`.

## Frontend client
Follow the steps below to run React frontend application.
```
cd frontend
```

Install `nodejs` and `npm`.:

Then run the following commands in terminal or powershell.
```
npm install
npm run build
```

React application can be now accessed through the url `http://localhost:3000`.