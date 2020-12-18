FROM python:3.8

ENV FLASK_APP manage.py

COPY manage.py unicorn.py requirements.txt .env ./
COPY app app
COPY migrations migrations

RUN pip install -r requirements.txt

EXPOSE 5000
CMD ["gunicorn", "--config", "unicorn.py", "???:app"]
