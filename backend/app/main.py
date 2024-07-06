from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, excel
from app.database import Base, engine

# SQLAlchemyのテーブル作成
Base.metadata.create_all(bind=engine)

# FastAPIのインスタンス
app = FastAPI()

# CORSの設定
origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ルーターの登録
app.include_router(auth.router)
app.include_router(excel.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
