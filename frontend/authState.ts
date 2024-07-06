import { ref, watch } from 'vue';

// ログイン状態を管理するための変数
export const isLoggedIn = ref(false);
export const loginName = ref('');

// ページが読み込まれたときにlocalStorageまたはsessionStorageから状態を読み込む
const savedIsLoggedIn = localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn');
const savedLoginName = localStorage.getItem('loginName') || sessionStorage.getItem('loginName');
if (savedIsLoggedIn === 'true') {
  isLoggedIn.value = true;
  loginName.value = savedLoginName || '';
}

// ログイン状態が変わったときにlocalStorageまたはsessionStorageに保存する
watch(isLoggedIn, (newValue) => {
  if (newValue) {
    const storage = localStorage.getItem('isLoggedIn') ? localStorage : sessionStorage;
    storage.setItem('isLoggedIn', 'true');
  } else {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginName');
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('loginName');
  }
});

watch(loginName, (newValue) => {
  const storage = localStorage.getItem('isLoggedIn') ? localStorage : sessionStorage;
  if (newValue) {
    storage.setItem('loginName', newValue);
  } else {
    localStorage.removeItem('loginName');
    sessionStorage.removeItem('loginName');
  }
});
