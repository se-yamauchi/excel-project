<template>
  <!-- ログイン画面 -->
  <div v-if="isScreen" class="login-page">
    <img class="footer-logo" src="@/assets/excel_automate.png" />
    <el-form ref="loginFormRef" :model="loginForm" :rules="rules" class="login-form">
      <p class="title">ログイン画面</p>
      <el-form-item prop="username" class="user-info">
        <el-input v-model="loginForm.username" placeholder="ユーザーID" />
      </el-form-item>
      <el-form-item prop="password" class="user-info">
        <el-input v-model="loginForm.password" type="password" show-password placeholder="パスワード" />
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="loginForm.rememberMe">ログイン状態を保持する</el-checkbox>
      </el-form-item>
      <el-button class="login-button" type="success" :plain="true" @click="loginButtonClick">ログイン</el-button>
      <p class="register-title">初めてご利用ですか？</p>
      <el-button class="register-change-button" :plain="true" @click="changeButtonClick">新規登録(無料)</el-button>
    </el-form>
  </div>

  <!-- 新規登録画面 -->
  <div v-else class="register-page">
    <img class="footer-logo" src="@/assets/excel_automate.png" />
    <el-form ref="registerFormRef" :model="registerForm" :rules="rules" class="login-form">
      <p class="title">新規登録画面</p>
      <el-form-item prop="username" class="user-info">
        <el-input v-model="registerForm.username" placeholder="ユーザーID" />
      </el-form-item>
      <el-form-item prop="password" class="user-info">
        <el-input v-model="registerForm.password" type="password" show-password placeholder="パスワード(半角6文字以上)" />
      </el-form-item>
      <el-form-item prop="passwordCheck" class="user-info">
        <el-input v-model="registerForm.passwordCheck" type="password" show-password placeholder="パスワード確認用" />
      </el-form-item>
      <el-button class="register-button" type="success" :plain="true" @click="registerButtonClick">登録する</el-button>
      <el-button class="login-change-button" :plain="true" @click="changeButtonClick">ログイン画面に戻る</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormItemRule } from 'element-plus';

// 共有状態をインポート
import { isLoggedIn, loginName } from '../../authState';

const loginForm = ref({
  username: '',
  password: '',
  rememberMe: false // チェックボックスの状態を管理
});

const registerForm = ref({
  username: '',
  password: '',
  passwordCheck: ''
});

const loginFormRef = ref<FormInstance | null>(null);
const registerFormRef = ref<FormInstance | null>(null);

const isScreen = ref(true);
const router = useRouter();

const requiredRule: FormItemRule[] = [
  { required: true, message: '必須項目です', trigger: 'blur' }
];

const rules = {
  username: requiredRule,
  password: [
    { required: true, message: '必須項目です', trigger: 'blur' },
    { min: 6, message: 'パスワードは6文字以上必要です', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]+$/, message: 'パスワードは半角英数字である必要があります', trigger: 'blur' }
  ],
  passwordCheck: [
    { required: true, message: '必須項目です', trigger: 'blur' },
    {
      validator: (rule: FormItemRule, value: string, callback: (error?: Error) => void) => {
        if (value !== registerForm.value.password) {
          callback(new Error('パスワードが一致しません'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
};

function changeButtonClick() {
  isScreen.value = !isScreen.value;
}

function registerButtonClick() {
  registerFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      const formData = new FormData();
      formData.append('username', registerForm.value.username);
      formData.append('password', registerForm.value.password);

      axios.post(
        'http://localhost:8000/api/register',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      .then(res => {
        console.log('通信成功:' + res.data.message);
        ElMessage({
          message: '登録に成功しました',
          type: 'success',
          plain: true,
        })
        changeButtonClick();
      })
      .catch(error => {
        ElMessage({
          message: '登録に失敗しました',
          type: 'error',
          plain: true,
        })
        console.error('通信失敗:', error);
      });
    } else {
      console.log('error submit!!');
    }
  });
}

function loginButtonClick() {
  loginFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      const formData = new FormData();
      formData.append('username', loginForm.value.username);
      formData.append('password', loginForm.value.password);

      axios.post(
        'http://localhost:8000/api/login',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      .then(res => {
        console.log('ログイン成功:', res.data.message);
        ElMessage({
          message: 'ログインに成功しました',
          type: 'success',
          plain: true,
        });

        // ログイン状態を更新
        isLoggedIn.value = true;
        loginName.value = loginForm.value.username;

        // チェックボックスの状態に応じてセッション情報を保存
        if (loginForm.value.rememberMe) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('loginName', loginForm.value.username);
        } else {
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('loginName', loginForm.value.username);
        }

        router.push('/menu/home');
      })
      .catch(error => {
        console.error('ログイン失敗:', error);
        ElMessage({
          message: 'ユーザーIDまたはパスワードに誤りがあります',
          type: 'error',
          plain: true,
        })
      });
    } else {
      console.log('error submit!!');
    }
  });
}
</script>

<style scoped>

.login-page, .register-page {
  text-align: center;
}

.footer-logo {
  width: 80%;
}

.title {
  font-weight: bold;
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 40px 20px;
  margin-bottom: 30px;
  border-radius: 5%;
  box-shadow: 1px 2px 10px 5px rgba(0, 0, 0, 0.1);
}

.user-info {
  margin-bottom: 20px;
  width: 50%;
}

.login-button, .register-button {
  margin: 20px;
  width: 50%;
}

.register-title {
  color: darkgray;
  margin-top: 80px;
}

.register-change-button {
  margin-top: 5px;
  width: 50%;
}

.login-change-button {
  margin: 50px 15px 0 0;
  width: 50%;
}

/* スマートフォン用のスタイル */
@media (max-width: 600px) {
  .footer-logo {
    width: 100%;
  }

  .login-form {
    padding: 20px 10px;
    width: 90%;
    margin: 10px auto;
  }

  .user-info {
    width: 100%;
  }

  .login-button, .register-button, .register-change-button, .login-change-button {
    width: 100%;
    margin: 10px 0;
  }

  .register-title {
    margin-top: 40px;
  }
}

</style>
