FROM python:3.9

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をコピーしてインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# wait-for-itスクリプトをコピーして実行権限を付与
COPY wait-for-it.sh .
RUN chmod +x wait-for-it.sh

# アプリケーションコードをコピー
COPY . .

# wait-for-itを使用してデータベースの起動を待つ
CMD ["./wait-for-it.sh", "db:5432", "--", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
