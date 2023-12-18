<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <h1 class="w-full h-100 flex justify-center text-38">登录</h1>
    <el-form :inline="true" :model="formInline" :rules="rules" ref="refForm" class="w-300 flex flex-col items-center">
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="formInline.userName" placeholder="name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formInline.password" type="password" placeholder="password" show-password />
      </el-form-item>
    </el-form>
    <el-button class="w-full" type="primary" @click="onSubmit" :loading="loading">登录</el-button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref, Ref } from 'vue'
import { home, noBack } from '@/utils/config/redirect'
import JsEncrypt from 'jsencrypt'
import type { FormInstance, FormRules } from 'element-plus'
import { ElLoading } from 'element-plus'
import { useStore } from '@/store'
import { RootMutations } from '@/store/type'
import { useRouter } from 'vue-router'
import api from '@/api'
import { cloneDeep } from 'lodash'
import { useGetMenuList } from '@/utils/vueUse'
import { dealTreeDate } from '@/utils/modules/common'
import { clearAllUserDate } from '@/utils/storage'
const store = useStore()
const router = useRouter()
const refForm: Ref<FormInstance> = ref()
const loading: Ref<boolean> = ref(false)
const formInline = reactive({
  userName: '',
  password: '',
  getAuthKey: '',
})
const rules = reactive<FormRules>({
  userName: [{ required: true, message: 'Please input your username', trigger: 'blur' }],
  password: [
    {
      required: true,
      message: 'Please input your password',
      trigger: 'blur',
    },
  ],
})

onMounted(() => {
  noBack()
})

const goLogin = async rsaPassWord => {
  const payLoad = {
    account: formInline.userName,
    password: rsaPassWord,
    publicKey: formInline.getAuthKey,
    isFreeLogin: '1',
    logType: 'WORKER_ROOT',
  }
  const [data] = await api.login.login(payLoad)
  if (data?.code == 1000) {
    store.commit(RootMutations.SET_TOKEN, data.data.authToken)
    store.commit(RootMutations.SET_REFRESHTOKEN, data.data.refreshToken)
    store.commit(RootMutations.SET_LOGININFO, data.data.loginInfo)
    await getQueryUserInfo()
  } else {
    loading.value = false
  }
}
// 获取用户信息
const getQueryUserInfo = async () => {
  const [data] = await api.login.getQueryUserInfo({})
  if (data?.code == 1000) {
    let newLoginFo = cloneDeep(store.state.loginInfo)
    if (data.data.person) {
      newLoginFo.userInfo = data.data.personInfo
      newLoginFo.authenticationType = 'NATURAL_PERSON'
    } else {
      newLoginFo.userInfo = data.data.authenticationUserResDTO
      if (data.data.authenticationUserResDTO) {
        newLoginFo.authenticationType = data.data.authenticationUserResDTO.authenticationType
      }
    }
    newLoginFo.person = data.data.person
    getUserAllAcl(newLoginFo)
  }
}
// 获取菜单信息
const getUserAllAcl = async newLoginFo => {
  try {
    const instance = ElLoading.service({ fullscreen: true })
    const lastMenu = await useGetMenuList(newLoginFo)
    store.commit(RootMutations.SET_MENULIST, lastMenu)
    store.commit(RootMutations.SET_LOGININFO, newLoginFo)
    router
      .push({ path: lastMenu[0].children[0].path })
      .then(res => {
        instance.close()
      })
      .finally(() => {
        instance.close()
      })
    loading.value = false
  } catch (error) {
    loading.value = false
  }
}

const onSubmit = () => {
  loading.value = true
  refForm.value.validate(async valid => {
    if (valid) {
      clearAllUserDate()
      api.login.getPublicKey().then(response => {
        const [res] = response
        if (res?.code == 1000) {
          formInline.getAuthKey = res.data
          let encryptor = new JsEncrypt({})
          encryptor.setPublicKey(res.data)
          let rsaPassWord = encryptor.encrypt(formInline.password)
          goLogin(rsaPassWord)
        }
      })
    } else {
      return false
    }
  })
}
</script>

<style></style>
