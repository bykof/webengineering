# Drink App Backend

### Setup

1. 
    Erstelle dir eine postgres Datenbank
2. 
   Führe `./setup.sh` aus
3. 
    Trag in die passwords.json die Datenbank ein
    
    ```json
    {
        "DATABASES": {
            "default": {
                "USER": "mbykovski",
                "HOST": "localhost",
                "PASSWORD": "test123",
                "PORT": 5432,
                "NAME": "drink",
                "ENGINE": "django.db.backends.postgresql_psycopg2"
            }
        }
    }
    ```
4.
    Migriere deine Datenbank mit den Models auf den neusten Stand:
    
    `./manage.py migrate`
    
5. Starte den Server mit:
    
    `./manage.py runserver`