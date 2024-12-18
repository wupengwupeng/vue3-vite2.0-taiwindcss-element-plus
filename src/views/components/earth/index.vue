<template>
  <div class="w-full h-full relative">
    <div class="w-full h-full" id="cesiumContainer"></div>
    <div class="absolute right-10 top-40 border-2 border-solid border-white h-100 w-150 z-999 flex flex-col p-5 text-white justify-between">
      <div>x:{{ lotLatObj.longitude }}</div>
      <div>y:{{ lotLatObj.latitude }}</div>
      <div>h:{{ lotLatObj.heitude }}</div>
    </div>
    <div id="zoomHeight" style="position: absolute; bottom: 10px; right: 10px; background-color: rgba(0, 0, 0, 0.7); color: white; padding: 5px"></div>
    <div class="absolute left-10 top-10">
      <div class="flex gap-5 flex-wrap">
        <el-button type="primary" @click="createPointAdd">画点</el-button>
        <el-button type="primary" @click="clearPointAdd">清除点位</el-button>
        <el-button type="primary" @click="handlerDrawLine">画线</el-button>
        <el-button type="primary" @click="clearDrawLine">清除画线</el-button>
        <el-button type="primary" @click="handlerDrawPolygon">绘制多边形</el-button>
        <el-button type="primary" @click="clearDrawPolygon">清除多边形</el-button>
        <el-button type="primary" @click="handlerDrawCircle">画圆</el-button>
        <el-button type="primary" @click="clearDrawCircle">清除画圆</el-button>
        <el-button type="primary" @click="backCenters">回到中心</el-button>
        <el-button type="primary" @click="distanceBox">空间距离</el-button>
        <el-button type="primary" @click="distanceArea">空间面积</el-button>
        <el-button type="primary" @click="triangulationArea">三角量测</el-button>
        <el-button type="primary" @click="clearDistance">清除测距</el-button>
        <el-button type="primary" @click="addModel">加载模型</el-button>
        <el-button type="primary" @click="trackInit">航迹模拟</el-button>
      </div>
    </div>
    <DialogTip :positionXy="positionXy" ref="dialogTipRef"></DialogTip>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, Ref, unref } from 'vue'
import {
  getPoint,
  bindLeftClick,
  bindRightClick,
  bindMouseMove,
  showTipDialog,
  initEarth,
  backCenter,
  bindWheelClick,
  DrawPoint,
  DrawPolyLine,
  DrawPolygon,
  DrawCircle,
} from './mapControl'
import { createPoint, createPolygon, createLable } from './earthUtil'
import * as Cesium from 'Cesium'
import DialogTip from './dialogs.vue'
import { Track } from './track'
var b = [
  {
    shootId: 1, // 拍摄点ID
    aircraftAltitude: 294.4321622812281, // 无人机高度
    aircraftLatitude: 29.332291372123606, // 无人机纬度
    aircraftLongitude: 106.3275423851136, // 无人机经度
    gimbalPitchValue: -34.86589098646805, // 无人机云台俯仰角
    gimbalYawValue: -141.52559172027878, // 无人机云台偏航角
    isShoot: false, // 是否为拍摄点
  },
  {
    shootId: 2,
    aircraftAltitude: 296.4321622812281,
    aircraftLatitude: 29.33218636728018,
    aircraftLongitude: 106.3274449132526,
    gimbalPitchValue: -29.77056379217234,
    gimbalYawValue: -141.52559171972544,
    isShoot: false,
  },
  {
    shootId: 3,
    aircraftAltitude: 296.4321622812281,
    aircraftLatitude: 29.332086291515342,
    aircraftLongitude: 106.32743456106668,
    gimbalPitchValue: -49.79999923706055,
    gimbalYawValue: -143.6999969482422,
    isShoot: false,
  },
  {
    shootId: 4,
    aircraftAltitude: 273.1146622812281,
    aircraftLatitude: 29.3320829466482,
    aircraftLongitude: 106.32743569795478,
    gimbalPitchValue: 0,
    gimbalYawValue: -96.52559172238325,
    isShoot: false,
  },
]
const lotLatObj = reactive({
  longitude: '',
  latitude: '',
  heitude: '',
})
const positionXy = reactive({
  xAxis: 0,
  yAxis: 0,
})
const contentViewer: Ref<any> = ref(null)
// 是否支持画点
const isCreatePoint: Ref<boolean> = ref(false)
const dialogTipRef: Ref<typeof DialogTip> = ref(null)

const drawPoint: Ref<any> = ref(null)
const drawLine: Ref<any> = ref(null)
// 多边形
const drawPolygon: Ref<any> = ref(null)
// 圆
const drawCircle: Ref<any> = ref(null)

// 测距
const measure: Ref<any> = ref(null)
onMounted(() => {
  init()
})

function init() {
  const viewer = initEarth()
  // 添加点位
  drawPoint.value = new DrawPoint(viewer)
  drawLine.value = new DrawPolyLine(viewer)
  drawPolygon.value = new DrawPolygon(viewer)
  drawCircle.value = new DrawCircle(viewer)

  measure.value = new (Cesium as any).Measure(viewer)
  computedHeight(viewer)
  contentViewer.value = viewer
  changeImagery(viewer)
  getPoint(viewer, lotLatObj)
  createPolygon(viewer)
  createLable(viewer)
  // 画点画线
  bindLeftClick(viewer, clickInfo => {
    if (isCreatePoint.value) {
      const pointGra = createPoint(viewer)
      isCreatePoint.value = false
    }
  })

  showTipDialog(viewer, positionXy, dialogTipRef)
  // bindRightClick(viewer, clickInfo => {
  //   console.log(clickInfo, 'bindRightClick')
  // })
  bindWheelClick(viewer, clickInfo => {
    //从Cesium中获取当前地图瓦片等级
    let tiles = new Set()
    let tilesToRender = viewer.scene.globe._surface._tilesToRender
    if ((Cesium as any).defined(tilesToRender)) {
      for (let i = 0; i < tilesToRender.length; i++) {
        tiles.add(tilesToRender[i].level)
      }
    }
  })
}
function computedHeight(viewer) {
  function showZoomHeight() {
    var cameraHeight = viewer.camera.positionCartographic.height
    var zoomHeightText = 'Zoom Height: ' + cameraHeight.toFixed(2) + ' meters'
    document.getElementById('zoomHeight').innerHTML = zoomHeightText
  }

  viewer.scene.postRender.addEventListener(showZoomHeight)
  showZoomHeight()
}
function createPointAdd() {
  isCreatePoint.value = true
  unref(drawPoint).init()
}
function clearPointAdd() {
  unref(drawPoint).clear()
}
function handlerDrawLine() {
  unref(drawLine).init()
}
function clearDrawLine() {
  unref(drawLine).clear()
}
function handlerDrawPolygon() {
  unref(drawPolygon).init()
}
function handlerDrawCircle() {
  unref(drawCircle).init()
}
function clearDrawCircle() {
  unref(drawCircle).clear()
}
function clearDrawPolygon() {
  unref(drawPolygon).clear()
}
function backCenters() {
  backCenter(contentViewer.value)
}
function changeImagery(viewer) {
  let TDU_Key = 'b18bbea095c5d592e08be3e3c593361b' //天地图申请的密钥

  //在线天地图影像服务地址(墨卡托投影)
  let TDT_IMG_W =
    'http://{s}.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0' +
    '&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
    '&style=default&format=tiles&tk=' +
    TDU_Key
  //在线天地图矢量地图服务(墨卡托投影)
  let TDT_VEC_W =
    'http://{s}.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0' +
    '&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
    '&style=default&format=tiles&tk=' +
    TDU_Key
  //在线天地图影像中文标记服务(墨卡托投影)
  let TDT_CIA_W =
    'http://{s}.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0' +
    '&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
    '&style=default.jpg&tk=' +
    TDU_Key
  //在线天地图矢量中文标记服务(墨卡托投影)
  let TDT_CVA_W =
    'http://{s}.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0' +
    '&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
    '&style=default.jpg&tk=' +
    TDU_Key
  // 在线天地图矢量底图
  let TDT_WU = `http://t0.tianditu.gov.cn/vec_w/wmts?tk=b18bbea095c5d592e08be3e3c593361b`

  let Img = new (Cesium as any).WebMapTileServiceImageryProvider({
    //调用影响中文服务
    url: TDT_IMG_W, //url地址
    layer: 'img_w', //WMTS请求的层名称
    style: 'default', //WMTS请求的样式名称
    format: 'tiles', //MIME类型，用于从服务器检索图像
    tileMatrixSetID: 'GoogleMapsCompatible', //	用于WMTS请求的TileMatrixSet的标识符
    subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'], //天地图8个服务器
    minimumLevel: 0, //最小层级
    maximumLevel: 18, //最大层级
  })

  viewer.imageryLayers.addImageryProvider(Img) //添加到cesium图层上

  let cia = new (Cesium as any).WebMapTileServiceImageryProvider({
    //调用影响中文注记服务
    url: TDT_CVA_W,
    layer: 'cia_w',
    style: 'default',
    format: 'tiles',
    tileMatrixSetID: 'GoogleMapsCompatible',
    subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'], //天地图8个服务器
    minimumLevel: 0,
    maximumLevel: 18,
  })

  viewer.imageryLayers.addImageryProvider(cia) //添加到cesium图层上
}
// 空间距离
function distanceBox() {
  measure.value.drawLineMeasureGraphics({ clampToGround: false, callback: () => {} })
}
// 空间面积
function distanceArea() {
  measure.value.drawAreaMeasureGraphics({ clampToGround: false, callback: () => {} })
}
// 三角量测
function triangulationArea() {
  measure.value.drawTrianglesMeasureGraphics({ callback: () => {} })
}
// 清除测距
function clearDistance() {
  measure.value._drawLayer.entities.removeAll()
}
// 加载模型
function addModel() {
  const entRef = contentViewer.value.entities.add({
    position: (Cesium as any).Cartesian3.fromDegrees(116.32878855240442, 39.95208707482746, 0.0),
    model: { uri: '/gltf/qiche.gltf' },
  })
  console.log(entRef, 'entRef-entRef')

  contentViewer.value.camera.flyTo({
    destination: (Cesium as any).Cartesian3.fromDegrees(116.32878855240442, 39.95208707482746, 0.0), //将经纬度转为笛卡尔坐标
    orientation: {
      heading: (Cesium as any).Math.toRadians(363.2757), // 角度转为弧度
      pitch: (Cesium as any).Math.toRadians(-90), // 角度转为弧度
    },
  })
}
// 航迹模拟
function trackInit() {
  let roaming = new Track(contentViewer.value, {
    Lines: b,
    stayTime: 1,
    speed: 3,
    frustumFar: 10,
    shootCallback: function (shootId) {
      console.log(shootId, 'shootid')
    },
  })
  /**
   *航迹模拟开始飞行
   * @memberof roaming.StartFlying()
   */

  roaming.StartFlying()

  /**
   *航迹模拟的暂停和继续
   *
   * @param {*} state bool类型 false为暂停，ture为继续
   * @memberof roaming.PauseOrContinue(state)
   */

  //roaming.PauseOrContinue(true)//false为暂停，ture为继续

  /**
   *改变飞行的速度
   *
   * @param {*} value  整数类型 建议（1-20）
   * @memberof roaming.ChangeRoamingSpeed(value)
   */

  //roaming.ChangeRoamingSpeed(1)

  /**
   * 改变观看角度
   *
   * @param {*} name string
   *
   * ViewTopDown:顶视图
   * ViewSide ：正视图
   * trackedEntity：跟随模型
   *
   * @memberof ChangePerspective(name)
   */

  roaming.ChangePerspective('trackedEntity')

  /**
   *取消航迹模拟
   *
   * @memberof roaming.EndRoaming()
   */

  //roaming.EndRoaming()
}
</script>

<style lang="scss" scoped></style>
