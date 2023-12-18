<template>
  <textarea :id="tinymceId" style="visibility: hidden" />
</template>

<script>
import loadTinymce from '../../utils/loadTinymce'
import { plugins, toolbar } from './config'
import { debounce } from '../../utils'
let num = 1

export default {
  props: {
    id: {
      type: String,
      default: () => {
        num === 10000 && (num = 1)
        return `tinymce${+new Date()}${num++}`
      },
    },
    value: {
      default: '',
    },
  },
  data() {
    return {
      tinymceId: this.id,
    }
  },
  mounted() {
    this.loadTinymce()
  },
  activated() {
    this.destroyTinymce()
    this.loadTinymce()
  },
  unmounted() {
    this.destroyTinymce()
  },
  methods: {
    loadTinymce() {
      loadTinymce(tinymce => {
        // eslint-disable-next-line global-require
        require('./zh_CN')
        let conf = {
          selector: `#${this.tinymceId}`,
          language: 'zh_CN',
          menubar: 'file edit insert view format table',
          font_formats:
            "微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';幼圆='幼圆';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings",
          style_formats: [{ title: '首行缩进', block: 'p', styles: { 'text-indent': '2em' } }],
          style_formats_merge: true,
          style_formats_autohide: true,
          plugins,
          toolbar,
          height: 300,
          branding: false,
          object_resizing: false,
          end_container_on_empty_block: true,
          powerpaste_word_import: 'clean',
          code_dialog_height: 450,
          code_dialog_width: 1000,
          advlist_bullet_styles: 'square',
          advlist_number_styles: 'default',
          default_link_target: '_blank',
          link_title: false,
          convert_urls: false,
          nonbreaking_force_tab: true,
        }
        conf = Object.assign(conf, this.$attrs)
        conf.init_instance_callback = editor => {
          if (this.value) editor.setContent(this.value)
          this.vModel(editor)
        }
        tinymce.init(conf)
      })
    },
    vModel(editor) {
      // 控制连续写入时setContent的触发频率
      const debounceSetContent = debounce(250, editor.setContent)
      this.$watch('value', (val, prevVal) => {
        if (editor && val !== prevVal && val !== editor.getContent()) {
          if (typeof val !== 'string') val = val.toString()
          debounceSetContent.call(editor, val)
        }
      })

      editor.on('change keyup undo redo', () => {
        this.$emit('input', editor.getContent())
      })
    },
    destroyTinymce() {
      if (!window.tinymce) return
      const tinymce = window.tinymce.get(this.tinymceId)
      if (tinymce) {
        tinymce.destroy()
      }
    },
  },
}
</script>
