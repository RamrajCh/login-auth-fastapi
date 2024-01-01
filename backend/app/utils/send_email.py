import smtplib
import ssl
import os
from dotenv import load_dotenv
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.models.users import Users

load_dotenv()

sender_email = os.getenv("SMTP_USERNAME")
smtp_server = os.getenv("SMTP_SERVER")
smtp_port = os.getenv("SMTP_PORT")
username = os.getenv("SMTP_USERNAME")
password = os.getenv("SMTP_PASSWORD")
base_url = os.getenv("BASE_URL")


def send_confirmation_email(user:Users, token:str):
    subject = 'Confirm your email'
    message = 'Click the link below for confirming your email and verifying.\n'
    message += f"{base_url}/api/confirm_email?verify={token}"

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = user.email
    msg['Subject'] = subject

    msg.attach(MIMEText(message, 'plain'))

    context = ssl.create_default_context()

    try:
        with smtplib.SMTP_SSL(smtp_server, smtp_port, context=context) as smtp:
            smtp.login(username, password)

            # Send the email
            smtp.send_message(msg)
            print('Email sent successfully.')

    except Exception as e:
        print(f'Error: {e}')