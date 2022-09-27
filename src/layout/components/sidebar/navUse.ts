import { ref } from 'vue'
import { useStore } from '@/store'
import { RootMutations } from '@/store/type'

export function navUse() {
  const store = useStore()

  function handlerRouteAddTags(tag: any) {
    const tags = {
      ...tag,
      name: tag.meta.title,
      path: tag.path,
      type: '',
      color: '#fff',
    }
    store.commit(RootMutations.SET_TAGS, tags)
  }
  return {
    handlerRouteAddTags,
  }
}
