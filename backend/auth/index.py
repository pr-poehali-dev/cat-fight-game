"""
Auth API: регистрация, вход, выход, профиль.
POST {"action": "register", "username", "email", "password"}
POST {"action": "login", "email", "password"}
POST {"action": "logout"} + заголовок X-Auth-Token
POST {"action": "me"}    + заголовок X-Auth-Token
"""

import json
import os
import hashlib
import secrets
import psycopg2

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Auth-Token",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def make_token() -> str:
    return secrets.token_hex(32)


def ok(data: dict, status: int = 200) -> dict:
    return {
        "statusCode": status,
        "headers": {**CORS, "Content-Type": "application/json"},
        "body": json.dumps(data, ensure_ascii=False),
    }


def err(msg: str, status: int = 400) -> dict:
    return {
        "statusCode": status,
        "headers": {**CORS, "Content-Type": "application/json"},
        "body": json.dumps({"error": msg}, ensure_ascii=False),
    }


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    schema = os.environ.get("MAIN_DB_SCHEMA", "public")
    headers = event.get("headers") or {}
    token = headers.get("X-Auth-Token") or headers.get("x-auth-token") or ""

    body = {}
    if event.get("body"):
        body = json.loads(event["body"])

    action = body.get("action", "")

    # ME
    if action == "me":
        if not token:
            return err("Не авторизован", 401)
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, username, email, nkt_balance, level, xp, battles, wins FROM {schema}.users WHERE token = %s",
            (token,),
        )
        row = cur.fetchone()
        conn.close()
        if not row:
            return err("Токен недействителен", 401)
        keys = ["id", "username", "email", "nkt_balance", "level", "xp", "battles", "wins"]
        return ok({"user": dict(zip(keys, row))})

    # REGISTER
    if action == "register":
        username = (body.get("username") or "").strip()
        email = (body.get("email") or "").strip().lower()
        password = body.get("password") or ""

        if not username or not email or not password:
            return err("Заполните все поля")
        if len(username) < 3:
            return err("Никнейм минимум 3 символа")
        if len(password) < 6:
            return err("Пароль минимум 6 символов")
        if "@" not in email or "." not in email:
            return err("Некорректный email")

        new_token = make_token()
        conn = get_conn()
        cur = conn.cursor()
        try:
            cur.execute(
                f"""INSERT INTO {schema}.users (username, email, password_hash, token)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id, username, email, nkt_balance, level, xp, battles, wins""",
                (username, email, hash_password(password), new_token),
            )
            row = cur.fetchone()
            conn.commit()
        except Exception as e:
            conn.rollback()
            conn.close()
            emsg = str(e)
            if "username" in emsg:
                return err("Этот никнейм уже занят", 409)
            if "email" in emsg:
                return err("Этот email уже зарегистрирован", 409)
            return err("Ошибка регистрации", 500)
        conn.close()

        keys = ["id", "username", "email", "nkt_balance", "level", "xp", "battles", "wins"]
        return ok({"token": new_token, "user": dict(zip(keys, row))})

    # LOGIN
    if action == "login":
        email = (body.get("email") or "").strip().lower()
        password = body.get("password") or ""

        if not email or not password:
            return err("Заполните все поля")

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, username, email, password_hash, nkt_balance, level, xp, battles, wins FROM {schema}.users WHERE email = %s",
            (email,),
        )
        row = cur.fetchone()

        if not row or row[3] != hash_password(password):
            conn.close()
            return err("Неверный email или пароль", 401)

        new_token = make_token()
        cur.execute(f"UPDATE {schema}.users SET token = %s WHERE id = %s", (new_token, row[0]))
        conn.commit()
        conn.close()

        keys = ["id", "username", "email", "_skip", "nkt_balance", "level", "xp", "battles", "wins"]
        user = {k: v for k, v in zip(keys, row) if k != "_skip"}
        return ok({"token": new_token, "user": user})

    # LOGOUT
    if action == "logout":
        if token:
            conn = get_conn()
            cur = conn.cursor()
            cur.execute(f"UPDATE {schema}.users SET token = NULL WHERE token = %s", (token,))
            conn.commit()
            conn.close()
        return ok({"ok": True})

    return err("Неизвестное действие", 400)
