<template>
  <div class="home-container">
    <h1 class="home-title">Excelに特化したオンラインツール</h1>
    <h2 class="home-subtitle">完全に無料のオンラインExcelツール。インストールの必要はありません。</h2>
    <div class="card-container">
      <div class="card" @click="goToUploadExcel">
        <img src="@/assets/excel_logo.png" alt="Excel Logo" class="card-logo" />
        <h2>Excelフォーマットの統一</h2>
        <p>Excelファイルのフォーマットを統一するツールです。</p>
      </div>
      <div class="card card-disabled">
        <img src="@/assets/totalling_logo.png" alt="Totalling Logo" class="card-logo" />
        <h2>Excel集計</h2>
        <p>CommingSoon</p>
      </div>
      <div class="card card-disabled">
        <img src="@/assets/analysis_logo.png" alt="Analysis Logo" class="card-logo" />
        <h2>Excel分析</h2>
        <p>CommingSoon</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function goToUploadExcel() {
  router.push('/menu/excelOrganizeView/uploadFiles');
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.home-title {
  font-weight: bold;
}

.home-subtitle {
  font-size: 18px;
  margin-bottom: 50px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.card-logo {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}

.card h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.card p {
  color: #555;
}

.card-disabled {
  background-color: #f0f0f0;
  color: #aaa;
  cursor: not-allowed;
}
</style>
