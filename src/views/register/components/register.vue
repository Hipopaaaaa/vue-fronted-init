<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">注册用户</div>
    <div class="login-form-sub-title">快点注册一个用户吧</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="userAccount"
        :rules="[
          { required: true, message: '用户名不能为空' },
          { minLength: 4, message: '用户名长度不能小于4' },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input v-model="userInfo.userAccount" placeholder="请输入用户名">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        field="phone"
        :rules="[
          { required: true, message: '电话不能为空' },
          { minLength: 8, message: '手机号格式有误' },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input v-model="userInfo.phone" placeholder="请输入手机号">
          <template #prefix>
            <icon-phone />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        field="userPassword"
        :rules="[
          { required: true, message: '密码不能为空' },
          { minLength: 8, message: '密码长度不能小于8' },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.userPassword"
          placeholder="请输入密码"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item
        field="checkPassword"
        :rules="[
          { required: true, message: '密码不能为空' },
          { minLength: 8, message: '密码长度不能小于8' },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.checkPassword"
          placeholder="请再次输入密码"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>

      <a-space :size="16" direction="vertical">
        <a-button type="primary" html-type="submit" long :loading="loading">
          注册
        </a-button>
        <a-button
          type="text"
          long
          class="login-form-register-btn"
          @click="goToLogin"
        >
          返回
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';

  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  import type { LoginData, RegisterData } from '@/api/user';

  const router = useRouter();

  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();
  const userStore = useUserStore();

  const userInfo = reactive({
    userAccount: '',
    userPassword: '',
    checkPassword: '',
    phone: '',
  });

  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
  }) => {
    if (userInfo.userPassword !== userInfo.checkPassword) {
      Message.error('两次密码不一致');
      return;
    }
    if (loading.value) return;
    if (!errors) {
      setLoading(true);
      try {
        await userStore.register(values as RegisterData);
        const { redirect, ...othersQuery } = router.currentRoute.value.query;
        router.push({
          name: (redirect as string) || 'Workplace',
          query: {
            ...othersQuery,
          },
        });
        Message.success('欢迎使用');
      } catch (err) {
        errorMessage.value = (err as Error).message;
      } finally {
        setLoading(false);
      }
    }
  };
  // 跳转到登陆页
  const goToLogin = () => {
    router.push({
      name: 'login',
    });
  };
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 320px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }
</style>
