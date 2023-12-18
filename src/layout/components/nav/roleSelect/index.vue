<template>
  <div class="flex items-center mx-8 hover:cursor-pointer">
    <el-dropdown>
      <div class="flex">
        <span class="flex min-w-100 items-center justify-center">{{ isSelect[0].roleName }}</span>
        <svg-icon type="mdi" :path="$midIcon.mdiMenuDown" :size="20"></svg-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(item, index) in loginInfo.userAuthRoles"
            :key="index + 'sdf'"
            class="flex justify-center items-center"
            :disabled="item.selected"
            @click="handlerClickDrop(item)"
            >{{ item.roleName }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, unref } from 'vue'
import { useStore } from '@/store'
import { RootMutations } from '@/store/type'
import { useGetMenuList } from '@/utils/vueUse'
import { useRouter, useRoute } from 'vue-router'
import { ElLoading } from 'element-plus'

const getColor: string = document.documentElement.style.getPropertyValue('--el-tag-bg-color') as string
const store = useStore()
const router = useRouter()
const route = useRoute()
const loginInfo = computed(() => store.getters['getLoginInfo'])
const isSelect = computed(() => {
  return unref(loginInfo).userAuthRoles.filter(res => res.selected)
})

const handlerClickDrop = async item => {
  if (item.selected) return
  const loadingInstance = ElLoading.service({ fullscreen: true, text: '正在切换中', background: 'rgba(122, 122, 122, 0.8)' })

  try {
    const menuList = await useGetMenuList(unref(loginInfo), item.roleCode)
    store.commit(RootMutations.SET_MENULIST, menuList)
    store.commit(RootMutations.SET_LOGININFO, unref(loginInfo))
    router.push({ path: menuList[0].children[0].path }).then(res => {
      const initTag = {
        name: route.meta.title,
        path: route.path,
        type: '',
        color: getColor,
      }

      store.commit(RootMutations.SET_TAGS, initTag)
      store.commit(RootMutations.REMOVE_ALLTAGS, initTag)
    })
    loadingInstance.close()
  } catch (error) {
    loadingInstance.close()
  }
}
</script>

<style></style>
