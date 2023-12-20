import * as Cesium from 'Cesium'
export function getPoint(viewer, obj) {
  console.log(viewer, 'viewr')
  let handler = new (Cesium as any).ScreenSpaceEventHandler(viewer.scene.canvas)

  handler.setInputAction(function (movement) {
    console.log(movement, 'movement')
    let cartesian = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid)
    console.log(cartesian, 'cartesian')
    if (cartesian) {
      // 转为地理坐标（弧度制）
      let cartographic = (Cesium as any).Cartographic.fromCartesian(cartesian)
      console.log(cartographic, 'cartographic')
      let longitude = (Cesium as any).Math.toDegrees(cartographic.longitude)
      let latitude = (Cesium as any).Math.toDegrees(cartographic.latitude)
      let heitude = cartographic.height
      console.log('Longitude: ' + longitude + ', Latitude: ' + latitude)
      obj.longitude = Number(longitude).toFixed(6)
      obj.latitude = Number(latitude).toFixed(6)
      obj.heitude = heitude
    }
  }, (Cesium as any).ScreenSpaceEventType.LEFT_CLICK)
}
// 鼠标右键弹框提示
export function showTipDialog(viewer, positionXy, tipRef) {
  let handler = new (Cesium as any).ScreenSpaceEventHandler(viewer.scene.canvas)
  handler.setInputAction(e => {
    //判断有没有地图的这个属性
    if (!viewer.scene) return

    // 形成可以使用的px位置
    let cartesian = viewer.camera.pickEllipsoid(e.position, viewer.scene.globe.ellipsoid)
    // let cartesian = (Cesium as any).Cartesian3.fromDegrees(lotLatObj.latitude, lotLatObj.longitude, lotLatObj.heitude)

    positionXy.xAxis = e.position.x - 100
    positionXy.yAxis = e.position.y - 100
    console.log(tipRef.value, 'value')
    // 打开弹框
    tipRef.value.openInfo()
    // proxy.$refs['popInfoRef'].openInfo()

    //实时更新位置 这个很重要 不然弹框会固定在屏幕的一个位置不随地图转动
    viewer.scene.postRender.addEventListener(() => {
      let windowPosition = (Cesium as any).SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, cartesian)
      positionXy.xAxis = windowPosition.x - 100
      positionXy.yAxis = windowPosition.y - 100
    })
  }, (Cesium as any).ScreenSpaceEventType.RIGHT_CLICK)
}

/**绑定地图点击事件 */
function bindClickEvent(viewer, fn, clickType) {
  console.log(viewer, 'viewer')
  let handler = new (Cesium as any).ScreenSpaceEventHandler(viewer.scene.canvas)
  handler.setInputAction(fn, clickType)
}
/**绑定地图左击事件 */
export function bindLeftClick(viewer, fn) {
  bindClickEvent(viewer, fn, (Cesium as any).ScreenSpaceEventType.LEFT_CLICK)
}
/**绑定地图鼠标滑动事件 */
export function bindMouseMove(viewer, fn) {
  bindClickEvent(viewer, fn, (Cesium as any).ScreenSpaceEventType.MOUSE_MOVE)
}
/**绑定地图右击事件 */
export function bindRightClick(viewer, fn) {
  bindClickEvent(viewer, fn, (Cesium as any).ScreenSpaceEventType.RIGHT_CLICK)
}
/**切换到2D地图 */
function setMapTo2D(viewer) {
  viewer.scene.morphTo2D(0)
}
/**调整相机角度 */
function setCameraPosition(viewer, newPosition) {
  const defaultCameraPosition = {
    lon: 123,
    lat: 38.6,
    alt: 2262400,
    heading: 363.2757,
    pitch: -90,
    roll: 0,
  }
  let position = newPosition || defaultCameraPosition
  viewer.Icamera.flyTo({
    destination: (Cesium as any).Cartesian3.fromDegrees(123, 38.6, 2262400), //将经纬度转为笛卡尔坐标
    orientation: {
      heading: (Cesium as any).Math.toRadians(363.2757), // 角度转为弧度
      pitch: (Cesium as any).Math.toRadians(-90), // 角度转为弧度
    },
  })
}

export function initEarth() {
  var cesiumAsset = '你的asset'
  let tiandituTk = 'b18bbea095c5d592e08be3e3c593361b'
  // 服务负载子域
  let subdomains = ['0', '1', '2', '3', '4', '5', '6', '7']
  // 初始化Viewer之前，将token加入，可避免报错{"code":"InvalidCredentials","message":"Invalid access token"}
  ;(Cesium as any).Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ZDliYjU2OS03YTA0LTQ4NjUtYWE4Zi1iZTMzOTEzOGI5NmIiLCJpZCI6MTg0MzQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NzM4MDA2MzR9.TiRGDlgKIT4SB2apFIwEAWyqp5Ad_qSqh3zrpE0l8h4'
  ;(Cesium as any).Camera.DEFAULT_VIEW_RECTANGLE = (Cesium as any).Rectangle.fromDegrees(90, -20, 110, 90) //核心
  const viewer = new (Cesium as any).Viewer('cesiumContainer', {
    // animation: false, //关闭动画
    timeline: false, //关闭时间线
    navigationHelpButton: false, //关闭显示默认的相机控制提示
    fullscreenButton: false, //关闭全屏按钮
    geocoder: false, //关闭geocoder小部件
    selectionIndicator: false,
    infoBox: false, //点击要素之后显示的信息,默认true
    baseLayerPicker: false, //是否显示图层选择控件
    sceneModePicker: false, //是否显示投影方式控件
    homeButton: false, //是否显示默认定位点的控件
    shouldAnimate: true,
    showRenderLoopErrors: false,
    creditsDisplay: false, //​展示商标版权和数据归属。
    imageryProvider: new (Cesium as any).WebMapTileServiceImageryProvider({
      //影像底图
      url:
        'http://t{s}.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=' +
        tiandituTk,
      subdomains: subdomains,
      layer: 'tdtImgLayer',
      style: 'default',
      format: 'image/jpeg',
      tileMatrixSetID: 'GoogleMapsCompatible', //使用谷歌的瓦片切片方式
      show: true,
    }),
  })
  // viewer.scene.morphTo2D(0) // 0 表示动画时间，单位秒，这里设为0表示立即切换
  viewer._cesiumWidget._creditContainer.style.display = 'none' // 默认去除版权信息
  // 隐藏动画和时间线控件
  // viewer.animation.container.style.visibility = 'hidden'
  // viewer.timeline.container.style.visibility = 'hidden'
  return viewer
}
export function backCenter(viewer) {
  viewer.camera.flyTo({
    destination: (Cesium as any).Cartesian3.fromDegrees(106.61, 29.62, 15000.0),
  })
}
