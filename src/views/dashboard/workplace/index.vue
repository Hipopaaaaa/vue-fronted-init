<template>
  <a-table
    :columns="columns"
    :data="data"
    :table-layout-fixed="true"
    :pagination="paginationConfig"
    :ohj="n"
    @page-change="handlerPage"
  >
    <template #optional="{ record }">
      <a-button class="button" type="outline" @click="goToEditor(record)"
        >编辑</a-button
      >
      <a-button
        class="button"
        type="outline"
        status="danger"
        @click="deleteUser(record)"
        >删除</a-button
      >
    </template>
    <template #phone="{ record }">
      <a-image width="40" :src="record.avatarUrl" show-loader />
    </template>
  </a-table>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import router from '@/router';
  import type { SearchData } from '@/api/user';
  import { useUserStore } from '@/store';

  const username = ref('');
  const userStore = useUserStore();

  const columns = [
    {
      title: '昵称',
      dataIndex: 'username',
      sortable: {
        sortDirections: ['ascend', 'descend'],
      },
    },
    {
      title: '账号',
      dataIndex: 'userAccount',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      sortable: {
        sortDirections: ['ascend', 'descend'],
      },
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      slotName: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      sortable: {
        sortDirections: ['ascend', 'descend'],
      },
    },
    {
      title: '角色',
      dataIndex: 'userRole',
      sortable: {
        sortDirections: ['ascend', 'descend'],
      },
    },
    {
      title: '状态',
      dataIndex: 'userStatus',
      sortable: {
        sortDirections: ['ascend', 'descend'],
      },
    },
    {
      title: '操作',
      slotName: 'optional',
    },
  ];

  let data = reactive([]);
  // 修改用户
  const goToEditor = (user) => {
    const editorUser = {
      id: user.id,
      username: user.username,
      phone: user.phone,
      email: user.email,
      userRole: user.userRole,
      userStatus: user.userStatus,
    };
    router.push({
      name: 'Editor',
      params: editorUser,
    });
  };
  // 删除用户
  const deleteUser = async (user) => {
    await userStore.deleteUser(user.id);
    let index = -1;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === user.id) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      data.splice(index, 1);
    }
  };

  const paginationConfig = reactive({
    current: 1,
    pageSize: 7,
    total: 0,
  });

  // 重新渲染组件开关
  const n = ref('');

  // 处理分页
  const handlerPage = async (pageNum) => {
    paginationConfig.current = pageNum;
    const pageResult = await userStore.getUserListByPage(
      paginationConfig as SearchData
    );
    const userList = pageResult.records;
    [...userList].forEach((user) => {
      user.userRole = user.userRole === 1 ? '管理员' : '普通用户';
      user.userStatus = user.userStatus === 0 ? '正常' : '异常';
      if (!user.email) {
        user.email = '暂无记录';
      }
    });

    // 骚操作，重新渲染组件
    data = reactive([]);
    data.push(...userList);
    n.value += 1;
    if (n.value >= 10) {
      n.value %= 10;
    }
    paginationConfig.total = pageResult.total;
  };

  // 加载用户列表
  onMounted(async () => {
    // 分页
    const pageResult = await userStore.getUserListByPage(
      paginationConfig as SearchData
    );
    const userList = pageResult.records;
    [...userList].forEach((user) => {
      user.userRole = user.userRole === 1 ? '管理员' : '普通用户';
      user.userStatus = user.userStatus === 0 ? '正常' : '异常';
      if (!user.email) {
        user.email = '暂无记录';
      }
    });
    paginationConfig.total = pageResult.total;
    data.push(...userList);
  });
</script>

<style>
  .button {
    margin-right: 10px;
  }
</style>
