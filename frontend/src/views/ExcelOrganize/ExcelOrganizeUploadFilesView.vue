<template>
  <div class="uploadExcel">
    <div class="titleContainer">
      <img src="@/assets/excel_logo.png" alt="Excel Logo" class="titleLogo" />
      <h1 class="titleText">Excelフォーマットの統一</h1>
    </div>
    
    <div class="centeredText">
      <p class="fancyText">✔全シートを任意の倍率に変更</p>
      <p class="fancyText">✔全シートのカーソルをA1セルに変更</p>
      <p class="fancyText">✔カーソルをシート1のA1セルで保存</p>
    </div>
    
    <label class="uploadLabel">
      ファイルを選択
      <input type="file" @change="onFilesChange" accept=".xlsx, .xls" multiple>
    </label>

    <div class="sliderContainer">
      <div class="sliderContainerText">倍率の設定 &emsp; </div>
      <el-slider v-model="magnification" max="400" :step="5" show-input @input="checkMinValue" />
    </div>
    
    <div class="buttonWrapper">
      <label class="downloadLabel">
        ダウンロード
        <button @click="uploadFiles" :disabled="isLoading"></button>
      </label>
      <span v-if="isLoading" class="loadingSpinner"></span>
      <label class="deleteLabel" v-if="files.length > 0">
        全ての選択を解除
        <button class="deleteButton" @click="clearFiles"></button>
      </label>
    </div>

    <el-upload
      v-model:file-list="files"
      class="uploadDemo"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple
      accept=".xls,.xlsx"
      @change="onFilesChange"
    ></el-upload>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';

const files = ref<File[]>([]);
const magnification = ref(100);
const isLoading = ref(false);

// ファイルのアップロード
function onFilesChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    files.value = Array.from(target.files);
  }
}

// スライダーの最小値チェック
function checkMinValue(value: number) {
  if (value < 10) {
    magnification.value = 10;
  }
}

// ファイルのダウンロード
const uploadFiles = async () => {
  if (files.value.length === 0) {
    ElMessage({
      message: 'ファイルを選択してください',
      type: 'error',
      plain: true,
    });
    return;
  }

  const formData = new FormData();
  files.value.forEach(file => {
    formData.append('files', file);
  });
  formData.append('magnification', magnification.value.toString());

  try {
    isLoading.value = true;
    const response = await axios.post('http://localhost:8000/upload-excel-folder', formData, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '変更済みファイル.zip');
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('uploadFiles関数実行中にエラーが発生:', error);
  } finally {
    isLoading.value = false;
  }
}

function clearFiles() {
  files.value = [];
}
</script>

<style scoped>
.titleContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.titleLogo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.titleText {
  font-weight: bold;
}

h1 {
  font-size: 30px;
  color: #333;
}

.fancyText {
  border-radius: 10px;
  padding: 5px;
  margin: 10px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  color: #333;
  transition: transform 0.3s, box-shadow 0.3s;
}

.fancyText:hover {
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.uploadExcel {
  margin: 20px;
  text-align: center;
}

.centeredText {
  display: inline-block;
  text-align: left;
  margin-top: 30px;
}

.sliderContainer {
  display: flex;
  justify-content: center;
  margin: 40px 0;
}

.sliderContainer .el-slider {
  width: 500px;
}

.buttonWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.uploadLabel {
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: .7em 1em;
  line-height: 1.4;
  background: #28a745;
  color: #FFF;
  font-size: 0.95em;
  border-radius: 2.5em;
  transition: 0.2s;
  width: 10%;
  margin-top: 50px;
  margin-left: 45%;
  font-weight: bold;
}

.uploadLabel:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 10px -2px rgba(0, 0, 0, 0.2);
}

.uploadLabel input {
  display: none;
}

.downloadLabel {
  display: flex;
  justify-content: center;
  cursor: pointer;
  cursor: pointer;
  padding: .7em 1em;
  line-height: 1.4;
  background: #28a745;
  color: #FFF;
  font-size: 0.95em;
  border-radius: 2.5em;
  transition: 0.2s;
  width: 10%;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.downloadLabel:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 10px -2px rgba(0, 0, 0, 0.2);
}

.downloadLabel button {
  display: none;
}

.loadingSpinner {
  margin-top: 40px;
  margin-left: 10px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #28a745;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.downloadLink {
  color: darkblue;
  text-decoration: underline;
  font-weight: bold;
  margin-top: 10px;
}

.deleteLabel {
  display: inline-block;
  cursor: pointer;
  margin: 1em 0;
  padding: .7em 1em;
  line-height: 1.4;
  background: #28a745;
  color: #FFF;
  font-size: 0.95em;
  transition: 0.2s;
  width: 10%;
  margin-top: 50px;
  font-weight: bold;
}

.deleteLabel:hover {
  box-shadow: 0 8px 10px -2px rgba(0, 0, 0, 0.2);
}

.deleteLabel button {
  display: none;
}

.deleteButton:hover {
  box-shadow: 0 8px 10px -2px rgba(0, 0, 0, 0.2);
}

/* スマートフォン用のスタイル */
@media (max-width: 600px) {
  .titleContainer {
    flex-direction: column;
    text-align: center;
  }

  .titleLogo {
    width: 30px;
    height: 30px;
    margin-right: 0;
    margin-bottom: 10px;
  }

  h1 {
    font-size: 24px;
  }

  .centeredText {
    text-align: center;
    margin-top: 20px;
  }

  .sliderContainer {
    flex-direction: column;
    align-items: center;
  }

  .sliderContainer .el-slider {
    width: 90%;
  }

  .buttonWrapper {
    width: 100%;
    margin-top: 20px;
  }

  .uploadLabel,
  .downloadLabel,
  .deleteLabel {
    width: 80%;
    margin: 10px auto;
    font-size: 1em;
  }

  .loadingSpinner {
    margin-top: 10px;
  }
}
</style>
