export const formConfGroup = {
    formRef: 'elForm',
    formModel: 'formData',
    size: 'medium',
    labelPosition: 'right',
    labelWidth: 120,
    formRules: 'rules',
    gutter: 15,
    disabled: false,
    span: 24,
    formBtns: true,
    __methods__: {
      changeType(val){
        console.log('目前的选中值：', val)
        console.log('表单的Model：', this.formData)
        if(val == 'NATURAL_PERSON'){
          this.rules = this['commonRules']
        }else{
            this.rules = this[val]
        }
        this.$nextTick(()=>{
          this.$refs['elForm'].clearValidate();
        })
      }
    },
}
export const applyUserGroup = [
    {
        __config__: {
          formId: '201',
          label: '用户类型',
          showLabel: true,
          labelWidth: null,
          tag: 'el-select',
          tagIcon: 'select',
          defaultValue: 'NATURAL_PERSON',
          layout: 'colFormItem',
          span: 12,
          required: true,
          regList: [],
          changeTag: true,
        },
        __slot__: {
          options: [{
            label: '自然人',
            value: 'NATURAL_PERSON'
          }, {
            label: '法人',
            value: 'JURIDICAL_PERSON'
          }]
        },
        __vModel__: 'userType',
        __events__: {
          change: ''
        },
        placeholder: '请选择',
        style: { width: '100%' },
        clearable: true,
        disabled: false,
        filterable: false,
        multiple: false,
        on: {
            change: 'changeType'
        }
    },
    {
        // 组件的自定义配置
        __config__: {
            formId: '202',
          label: '姓名',
          labelWidth: null,
          showLabel: true,
          changeTag: true,
          tag: 'el-input',
          tagIcon: 'input',
          defaultValue: undefined,
          required: true,
          layout: 'colFormItem',
          span: 12,
          // 正则校验规则
          regList: []
        },
        // 组件的插槽属性
        __slot__: {
          prepend: '',
          append: ''
        },
        __vModel__: 'userName',
        // 其余的为可直接写在组件标签上的属性
        placeholder: '请输入',
        style: { width: '100%' },
        clearable: true,
        'prefix-icon': '',
        'suffix-icon': '',
        maxlength: null,
        'show-word-limit': false,
        readonly: false,
        disabled: false
      },
      {
        // 组件的自定义配置
        __config__: {
            formId: '203',
          label: '社会信用代码',
          visible: {
              value:'',
              data:''
          },
          labelWidth: null,
          showLabel: true,
          changeTag: true,
          tag: 'el-input',
          tagIcon: 'input',
          defaultValue: undefined,
          required: true,
          layout: 'colFormItem',
          span: 12,
          // 正则校验规则
          regList: []
        },
        // 组件的插槽属性
        __slot__: {
          prepend: '',
          append: ''
        },
        __vModel__: 'creditCode',
        // 其余的为可直接写在组件标签上的属性
        placeholder: '请输入',
        style: { width: '100%' },
        clearable: true,
        'prefix-icon': '',
        'suffix-icon': '',
        maxlength: null,
        'show-word-limit': false,
        readonly: false,
        disabled: false
      },
      {
        // 组件的自定义配置
        __config__: {
            formId: '204',
          label: '法定代表人',
          visible: {
              value:'',
              data:''
          },
          labelWidth: null,
          showLabel: true,
          changeTag: true,
          tag: 'el-input',
          tagIcon: 'input',
          defaultValue: undefined,
          required: true,
          layout: 'colFormItem',
          span: 12,
          // 正则校验规则
          regList: []
        },
        // 组件的插槽属性
        __slot__: {
          prepend: '',
          append: ''
        },
        __vModel__: 'corporation',
        // 其余的为可直接写在组件标签上的属性
        placeholder: '请输入',
        style: { width: '100%' },
        clearable: true,
        'prefix-icon': '',
        'suffix-icon': '',
        maxlength: null,
        'show-word-limit': false,
        readonly: false,
        disabled: false
      },
      {
        // 组件的自定义配置
        __config__: {
            formId: '205',
          label: '联系电话',
          labelWidth: null,
          showLabel: true,
          changeTag: true,
          tag: 'el-input',
          tagIcon: 'input',
          defaultValue: undefined,
          required: true,
          layout: 'colFormItem',
          span: 12,
          // 正则校验规则
          regList: []
        },
        // 组件的插槽属性
        __slot__: {
          prepend: '',
          append: ''
        },
        __vModel__: 'phone',
        // 其余的为可直接写在组件标签上的属性
        placeholder: '请输入',
        style: { width: '100%' },
        clearable: true,
        'prefix-icon': '',
        'suffix-icon': '',
        maxlength: null,
        'show-word-limit': false,
        readonly: false,
        disabled: false
      },
      {
        // 组件的自定义配置
        __config__: {
            formId: '206',
          label: '身份证',
          labelWidth: null,
          showLabel: true,
          changeTag: true,
          tag: 'el-input',
          tagIcon: 'input',
          defaultValue: undefined,
          required: true,
          layout: 'colFormItem',
          span: 12,
          // 正则校验规则
          regList: []
        },
        // 组件的插槽属性
        __slot__: {
          prepend: '',
          append: ''
        },
        __vModel__: 'idCard',
        // 其余的为可直接写在组件标签上的属性
        placeholder: '请输入',
        style: { width: '100%' },
        clearable: true,
        'prefix-icon': '',
        'suffix-icon': '',
        maxlength: null,
        'show-word-limit': false,
        readonly: false,
        disabled: false
      },
      {
        // 组件的自定义配置
        __config__: {
            formId: '207',
          label: '地址',
          labelWidth: null,
          showLabel: true,
          changeTag: true,
          tag: 'el-input',
          tagIcon: 'input',
          defaultValue: undefined,
          required: true,
          layout: 'colFormItem',
          span: 24,
          // 正则校验规则
          regList: []
        },
        // 组件的插槽属性
        __slot__: {
          prepend: '',
          append: ''
        },
        __vModel__: 'address',
        // 其余的为可直接写在组件标签上的属性
        placeholder: '请输入',
        style: { width: '100%' },
        clearable: true,
        'prefix-icon': '',
        'suffix-icon': '',
        maxlength: null,
        'show-word-limit': false,
        readonly: false,
        disabled: false
      }
]
export const drawingDefalut = []
