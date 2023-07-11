<template>
  <a-form
    ref="formRef"
    class="box"
    :model="user"
    :style="{ width: '600px' }"
    @submit="handleSubmit"
  >
    <a-form-item
      field="username"
      label="昵称"
      :rules="[
        { required: true, message: '请输入昵称' },
        { minLength: 4, message: '昵称小于4' },
      ]"
      :validate-trigger="['change', 'input', 'blur']"
    >
      <a-input v-model="user.username" placeholder="请输入昵称..." />
    </a-form-item>

    <a-form-item
      field="phone"
      label="电话"
      :rules="[
        { required: true, message: '请输入电话' },
        { minLength: 11, message: '电话号不正常' },
      ]"
      :validate-trigger="['change', 'input', 'blur']"
    >
      <a-input v-model="user.phone" placeholder="请输入电话..." />
    </a-form-item>
    <a-form-item
      field="email"
      label="邮箱"
      :rules="[
        { required: true, message: '请输入邮箱' },
        { minLength: 5, message: '邮箱格式不正确' },
      ]"
      :validate-trigger="['change', 'input', 'blur']"
    >
      <a-input v-model="user.email" placeholder="请输入邮箱..." />
    </a-form-item>

    <a-form-item field="userRole" label="角色">
      <a-radio-group v-model="user.userRole">
        <a-radio :value="1">管理员</a-radio>
        <a-radio :value="0">普通用户</a-radio>
      </a-radio-group>
    </a-form-item>

    <a-form-item field="userStatus" label="开启" :rules="[{ type: 'boolean' }]">
      <a-switch v-model="user.userStatus" />
    </a-form-item>

    <a-form-item>
      <a-space style="margin-left: 150px">
        <a-button type="primary" html-type="submit">提交</a-button>
        <a-button @click="$refs.formRef.resetFields()">重置</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { onMounted, reactive } from 'vue';
  import { useRoute } from 'vue-router';
  import { useUserStore } from '@/store';
  import router from '@/router';

  const route = useRoute();
  const userStore = useUserStore();
  const handleSubmit = async ({ values, errors }) => {
    if (errors) {
      return;
    }
    if (values.userStatus) {
      values.userStatus = 0;
    } else {
      values.userStatus = 1;
    }
    await userStore.updateUser(values);
    router.back();
  };

  const user = reactive({
    id: 0,
    username: '',
    phone: '',
    email: '',
    userRole: 1,
    userStatus: true,
  });
  // 加载数据
  onMounted(() => {
    const { params } = route;
    if (route.path === '/dashboard/editor') {
      user.id = userStore?.id || 0;
      user.username = userStore?.username || '';
      user.phone = userStore?.phone || '';
      user.email = userStore?.email || '';
      if (userStore?.userRole === '管理员') {
        user.userRole = 1;
      } else if (userStore?.userRole === '普通用户') {
        user.userRole = 0;
      }
      if (userStore?.userStatus === '正常') {
        user.userStatus = true;
      } else if (userStore?.userRole === '异常') {
        user.userStatus = false;
      }
    } else {
      user.id = params?.id || 0;
      user.username = params?.username || '';
      user.phone = params?.phone || '';
      user.email = params?.email || '';
      if (params?.userRole === '管理员') {
        user.userRole = 1;
      } else if (params?.userRole === '普通用户') {
        user.userRole = 0;
      }
      if (params?.userStatus === '正常') {
        user.userStatus = true;
      } else if (params?.userRole === '异常') {
        user.userStatus = false;
      }
    }
  });
</script>

<style scoped>
  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
