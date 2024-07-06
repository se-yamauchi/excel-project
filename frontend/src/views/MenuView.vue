<template>
  <div class="app">
    <header v-if="showHeader" class="header">
      <img class="footer-logo" src="@/assets/footer_logo.png" @click="goHome"/>
      <nav class="nav" v-if="!isMobile">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-icon><document /></el-icon> Excel整理
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <router-link to="/menu/excelOrganizeView/uploadFiles" class="dropdown-link">Excelフォーマットの統一</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-icon><DocumentChecked /></el-icon> Excel集計
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item disabled>CommingSoon</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-icon><data-analysis /></el-icon> Excel分析
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item disabled>CommingSoon</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </nav>
      <div class="user-info" v-if="!isMobile">
        <span v-if="isLoggedIn" class="login-name">{{ loginName }}さん</span>
        <button v-if="isLoggedIn" @click="logout" class="logout">ログアウト</button>
        <button v-else @click="goToLogin" class="login">ログイン</button>
      </div>
      <el-button v-if="isMobile" @click="toggleMenu" class="hamburger-menu">
        <el-icon><Menu /></el-icon>
      </el-button>
    </header>

    <el-drawer :model-value="drawerVisible" @update:model-value="drawerVisible = $event" direction="ltr" class="mobile-menu">
      <nav class="nav-mobile">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-icon><document /></el-icon> Excel整理
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <router-link to="/menu/excelOrganizeView/uploadFiles" class="dropdown-link">Excelフォーマットの統一</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-icon><DocumentChecked /></el-icon> Excel集計
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item disabled>CommingSoon</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-icon><data-analysis /></el-icon> Excel分析
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item disabled>CommingSoon</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <div class="user-info-mobile">
          <span v-if="isLoggedIn" class="login-name">{{ loginName }}さん</span>
          <button v-if="isLoggedIn" @click="logout" class="logout">ログアウト</button>
          <button v-else @click="goToLogin" class="login">ログイン</button>
        </div>
      </nav>
    </el-drawer>

    <main class="content">
      <router-view></router-view>
    </main>

    <footer class="footer">
      <div class="footer-content">
        <router-link to="/menu/termsOfService" class="footer-link">利用規約</router-link>
        <router-link to="/menu/privacyPolicy" class="footer-link">プライバシーポリシー</router-link>
        <span class="copyright">Copyright © 2024 TechLoom All Rights Reserved.</span>
      </div>
    </footer>  
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ArrowDown, Document, DocumentChecked, DataAnalysis, Menu } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { isLoggedIn, loginName } from '../../authState';

const router = useRouter();
const route = useRoute();

const showHeader = computed(() => route.name !== 'login');
const isMobile = ref(window.innerWidth <= 600);
const drawerVisible = ref(false);

const toggleMenu = () => {
  drawerVisible.value = !drawerVisible.value;
};

const logout = () => {
  isLoggedIn.value = false;
  loginName.value = '';
  ElMessage({
    message: 'ログアウトしました',
    type: 'success',
    plain: true,
  });
  router.push('/login');
};

const goHome = () => {
  router.push('/menu/home');
};

const goToLogin = () => {
  router.push('/login');
};

window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth <= 600;
});
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 130vh;
  width: 100%;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFFFFF;
  padding: 10px 20px;
  box-shadow: 0 3px 50px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  font-weight: bold;
}

.footer-logo {
  width: 5%;
}

.nav {
  flex-grow: 1;
  display: flex;
  gap: 50px;
  align-items: center;
  padding-left: 30px;
}

.nav .el-dropdown-link:focus {
  outline: 2px solid black;
  outline-offset: 2px;
}

.login-name {
  margin-right: 150px;
}

.example-showcase .el-dropdown-link {
  display: flex;
  align-items: center;
}

.disabled-item {
  pointer-events: none;
  color: #ccc;
}

.logout, .login {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.hamburger-menu {
  display: none;
}

.content {
  flex-grow: 1;
  margin-top: 10vh;
  padding: 20px;
  width: 100vw;
  background-color: #f8f9fa;
}

.dropdown-link {
  color: #000;
  text-decoration: none;
}

.dropdown-link:hover {
  text-decoration: underline;
}

.footer {
  width: 100%;
  background-color: #333;
  color: #fff;
  padding: 10px 0;
  text-align: center;
  font-weight: bold;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 960px;
  margin: 0 auto;
}

.footer-link {
  color: #fff;
  text-decoration: none;
  padding: 0 20px;
}

.footer-link:hover {
  text-decoration: underline;
}

/* スマートフォン用のスタイル */
@media (max-width: 600px) {
  .footer-logo {
    width: 15%;
  }

  .nav {
    display: none;
  }

  .user-info {
    display: none;
  }

  .hamburger-menu {
    display: block;
    margin-right: 5%;
  }

  .nav-mobile {
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding: 10px;
    margin: 10px;
  }

  .user-info-mobile {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin-top: 20px;
    align-items: center;
  }

  .logout, .login {
    background-color: #dc3545;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 10px;
  }
}
</style>
