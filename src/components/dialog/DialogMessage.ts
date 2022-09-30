import { ElNotification, ElMessageBox, MessageProps, ElMessage } from 'element-plus'
import { h } from 'vue'

export function successMessage(msg: string, arg?: Omit<MessageProps, any>) {
  ElMessage.success({
    message: msg,
    ...arg,
  })
}

export function errorMessage(msg: string, arg?: Omit<MessageProps, any>) {
  ElMessage.error({
    message: msg,
    ...arg,
  })
}

// import leftImg from "@/icons/svg/icon-chart-heat-map.svg";
/**
 * 如何调用，如下面调用案例
 * import {succesMsg,warnMsg,infoMsg,
     errorMsg,alertBox,confirmBox} from '@/utils/msgBox.ts'
  confirmBox('确认删除该标签吗？','确定',null).then(res => {
    alert("确定："+res)
  }).catch(res => {
    alert("取消关闭："+res)
  })
 * */

// 成功提示信息
export function succesMsg(msgInfo: string, arg?: Omit<MessageProps, any>) {
  ElMessage({
    type: 'success',
    showClose: true,
    // dangerouslyUseHTMLString: true,
    message: msgInfo,
    ...arg,
  })
}

// 警告提示信息
export function warnMsg(msgInfo: string, arg?: Omit<MessageProps, any>) {
  ElMessage({
    type: 'warning',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: msgInfo,
    ...arg,
  })
}

// 错误提示信息
export function errorMsg(msgInfo: string, arg?: Omit<MessageProps, any>) {
  ElMessage({
    type: 'error',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: msgInfo,
    ...arg,
  })
}

// 一般信息提示信息
export function infoMsg(msgInfo: string, arg?: Omit<MessageProps, any>) {
  ElMessage({
    type: 'info',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: msgInfo,
    ...arg,
  })
}

// 确定一个确定按钮alertBox
export function alertBox(msg: string, btnName: string, fun: any) {
  let confirmName = btnName == '确定' ? '确定' : '是'
  return ElMessageBox.alert(msg, '提示', {
    confirmButtonText: confirmName,
    dangerouslyUseHTMLString: true,
    callback: fun,
  })
}

export const succesElNotification = (msg: string) => {
  ElNotification({
    title: 'Success',
    message: msg,
    type: 'success',
    duration: 2000,
    position: 'bottom-left',
  })
}
