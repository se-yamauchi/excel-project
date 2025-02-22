# Excel自動化ツール

## 概要
Excel自動化ツールは、日常業務でのExcel操作を効率化し、データ整理、集計、分析の作業を自動化するためのツールです。
本ツールを使用することで、手動で行っていた煩雑な作業を簡単に実行できるようになります。

## 目次
1. [特徴](#特徴)
2. [前提条件](#前提条件)
3. [インストール](#インストール)
4. [使用方法](#使用方法)
5. [機能一覧](#機能一覧)
6. [トラブルシューティング](#トラブルシューティング)
7. [開発者](#開発者)

## 特徴
- **簡単な操作**: 直感的なインターフェースで誰でも簡単に使用できます。
- **柔軟なカスタマイズ**: 各種設定やスクリプトを変更することで、自分の業務に最適な形にカスタマイズ可能です。
- **高速処理**: 大量のデータでも迅速に処理できます。
- **豊富な機能**: データの整理、集計、分析、レポート生成など多岐にわたる機能を搭載しています。

## 前提条件
本ツールを使用するためには、以下のソフトウェアが必要です。
- Node.js (バージョン14以上)
- npm (バージョン6以上)
- Excel (Office 365 推奨)

## インストール
以下の手順で本ツールをインストールします。

1. リポジトリをクローンします。  
   ~~~
   git clone https://github.com/username/excel-automation-tool.git
   cd excel-automation-tool
   ~~~

2. 必要な依存関係をインストールします。  
   ~~~
   npm install
   ~~~


## 使用方法
   以下のコマンドを別のターミナルで実行してツールを起動します。

   ~~~
   docker-compose up --build -d
   ~~~
   ~~~
   npm run dev
   ~~~

   起動後、ブラウザで http://localhost:5173 にアクセスします。
   ログイン画面が表示されますので、アカウントを作成または既存のアカウントでログインします。

## 機能一覧
  ・Excel整理  
   &nbsp;∟Excelフォーマットの統一: 異なる形式のExcelファイルを統一フォーマットに変換します。  
   &nbsp;&nbsp;&nbsp;重複データの削除: 重複しているデータを自動的に検出して削除します。

   ・Excel集計  
   &nbsp;∟データの集計: 指定した範囲のデータを集計し、レポートを生成します。
   
   ・Excel分析  
   &nbsp;∟データ分析: データの傾向や異常値を分析し、視覚的に表示します。


## トラブルシューティング

・インストールエラー(npm install)  
&nbsp;∟実行時にエラーが発生した場合は、Node.jsとnpmのバージョンを確認してください。

・起動エラー(npm run dev)   
&nbsp;∟実行時にエラーが発生した場合は、環境変数の設定を確認してください。  
&nbsp;&nbsp;&nbsp;Excelファイルの読み込みエラー:対応しているExcelファイル形式かどうか確認してください。


## 開発者

s_yamauchi





