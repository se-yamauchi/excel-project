from fastapi import APIRouter, Depends, HTTPException, Form
from sqlalchemy.orm import Session
from app.crud import create_user, get_user_by_username
from app.schemas import UserCreate
from app.database import get_db
import bcrypt

router = APIRouter()

# 登録ボタンを押下時の登録処理
@router.post("/api/register")
def register_user(username: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    user_create = UserCreate(username=username, password=password)
    db_user = get_user_by_username(db, username)
    if db_user:
        raise HTTPException(status_code=400, detail="すでに登録済みのユーザー名です。")
    create_user(db, user_create)
    return {"message": "ユーザの新規登録が完了しました。"}

# ログインボタン押下時のログイン処理
@router.post("/api/login")
def login_user(username: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    db_user = get_user_by_username(db, username)
    if not db_user:
        raise HTTPException(status_code=400, detail="登録されていないユーザーIDです。")
    if not bcrypt.checkpw(password.encode('utf-8'), db_user.password.encode('utf-8')):
        raise HTTPException(status_code=400, detail="パスワードに誤りがあります。")
    return {"message": "ログイン認証に成功しました。"}
