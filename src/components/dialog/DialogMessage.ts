import { ElMessage, MessageProps } from 'element-plus'


export function successMessage(msg: string, arg?: Omit<MessageProps, any>) {
  ElMessage.success({
    message: msg,
    ...arg
  })
}

export function errorMessage(msg: string, arg?: Omit<MessageProps, any>) {
  ElMessage.error({
    message: msg,
    ...arg
  })
}