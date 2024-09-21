import * as Cesium from 'Cesium'
// 展示经纬度和高度
export function getPoint(viewer, obj) {
  let handler = new (Cesium as any).ScreenSpaceEventHandler(viewer.scene.canvas)
  handler.setInputAction(function (movement) {
    let cartesian = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid)
    if (cartesian) {
      // 转为地理坐标（弧度制）
      let cartographic = (Cesium as any).Cartographic.fromCartesian(cartesian)
      console.log(cartographic, 'cartographic')
      let longitude = (Cesium as any).Math.toDegrees(cartographic.longitude)
      let latitude = (Cesium as any).Math.toDegrees(cartographic.latitude)
      let heitude = cartographic.height
      obj.longitude = Number(longitude).toFixed(6)
      obj.latitude = Number(latitude).toFixed(6)
      obj.heitude = Number(heitude).toFixed(2)
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
/**鼠标滚轮滚动事件 */
export function bindWheelClick(viewer, fn) {
  bindClickEvent(viewer, fn, (Cesium as any).ScreenSpaceEventType.WHEEL)
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
    geocoder: true, //关闭geocoder小部件
    selectionIndicator: false,
    infoBox: false, //点击要素之后显示的信息,默认true
    baseLayerPicker: true, //是否显示图层选择控件
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

export class DrawPoint {
  viewer: any
  drawnPoints: Array<any>
  pointRef: Array<any>
  constructor(viewer: any) {
    this.viewer = viewer
    this.drawnPoints = []
    this.pointRef = []
  }
  init() {
    const handler = new (Cesium as any).ScreenSpaceEventHandler(this.viewer.canvas)
    // 注册鼠标左键点击事件，用于绘制
    handler.setInputAction(event => {
      let cartesian3 = this.viewer.camera.pickEllipsoid(event.position, this.viewer.scene.globe.ellipsoid)
      console.log(cartesian3, 'cartesian3')
      if (cartesian3) {
        const pointRef = this.viewer.entities.add({
          position: cartesian3,
          point: {
            color: (Cesium as any).Color.RED,
            pixelSize: 10,
          },
        })
        this.pointRef.push(pointRef)
      }

      // 获取经纬度（弧度制）
      const cartographic = (Cesium as any).Cartographic.fromCartesian(cartesian3)
      // 弧度经纬度转为 度经纬度
      const longitude = (Cesium as any).Math.toDegrees(cartographic.longitude)
      const latitude = (Cesium as any).Math.toDegrees(cartographic.latitude)
      const height = (Cesium as any).Math.toDegrees(cartographic.height)
      // 将绘制的点位放进数组中
      this.drawnPoints.push({ longitude, latitude, height })
    }, (Cesium as any).ScreenSpaceEventType.LEFT_CLICK)

    handler.setInputAction(event => {
      handler.destroy()
    }, (Cesium as any).ScreenSpaceEventType.RIGHT_CLICK)
  }
  clear() {
    this.pointRef.forEach(res => {
      this.viewer.entities.remove(res)
      this.pointRef = []
      this.drawnPoints = []
    })
    backCenter(this.viewer)
  }
}

// 绘制折线
export class DrawPolyLine {
  viewer: any
  polylinePoints: Array<any>
  polylinePointsRef: Array<any>
  polyLineEntityRef: Array<any>
  lastPoint: any
  currentMousePoint: any

  constructor(viewer: any) {
    this.viewer = viewer
    this.polylinePoints = []
    this.lastPoint = null
    this.currentMousePoint = null
    this.polyLineEntityRef = []
    this.polylinePointsRef = []
  }
  init() {
    const handler = new (Cesium as any).ScreenSpaceEventHandler(this.viewer.canvas)
    // 临时折线实体
    let polyLineEntity = this.viewer.entities.add({
      Id: 'drawingPolyline',
      name: '画线',
      polyline: {
        // CallbackProperty属性动态更新线段的位置
        positions: new (Cesium as any).CallbackProperty(() => {
          return this.polylinePoints
        }, false),
        width: 2,
        material: (Cesium as any).Color.RED,
      },
    })
    // 临时动态实体线段
    let dynamicLineEntity = this.viewer.entities.add({
      polyline: {
        positions: new (Cesium as any).CallbackProperty(() => {
          if (this.lastPoint && this.currentMousePoint) {
            return [this.lastPoint, this.currentMousePoint]
          }
          return []
        }, false),
        width: 2,
        material: (Cesium as any).Color.RED.withAlpha(0.5), // 使用半透明红色
      },
    })

    handler.setInputAction(event => {
      // 获取笛卡尔坐标
      let cartesian3 = this.viewer.camera.pickEllipsoid(event.position, this.viewer.scene.globe.ellipsoid)
      if (cartesian3) {
        this.polylinePoints.push(cartesian3)
        this.lastPoint = cartesian3
        const polyLineRef = this.viewer.entities.add({
          position: cartesian3,
          point: {
            color: (Cesium as any).Color.BLUE,
            pixelSize: 10,
          },
        })
        this.polylinePointsRef.push(polyLineRef)
      }
    }, (Cesium as any).ScreenSpaceEventType.LEFT_CLICK)

    // 鼠标移动事件
    handler.setInputAction(event => {
      const cartesian3 = this.viewer.camera.pickEllipsoid(event.endPosition, this.viewer.scene.globe.ellipsoid)
      if (cartesian3) {
        this.currentMousePoint = cartesian3
      }
    }, (Cesium as any).ScreenSpaceEventType.MOUSE_MOVE)

    // 注册鼠标左键双击点击事件，用于结束绘制
    handler.setInputAction(() => {
      handler.destroy()
      this.viewer.entities.remove(dynamicLineEntity)
      this.polyLineEntityRef.push(polyLineEntity)
    }, (Cesium as any).ScreenSpaceEventType.RIGHT_CLICK)
  }
  clear() {
    this.polyLineEntityRef.forEach(res => {
      this.viewer.entities.remove(res)
    })
    this.polylinePointsRef.forEach(res => {
      this.viewer.entities.remove(res)
    })
    this.polyLineEntityRef = []
    this.lastPoint = null
    this.currentMousePoint = null
    this.polylinePoints = []
    this.polylinePointsRef = []
  }
}

// 绘制多边形
export class DrawPolygon {
  viewer: any
  polygonPoints: Array<any>
  pointListRef: Array<any>
  lineListRef: Array<any>
  polygonListRef: Array<any>
  constructor(viewer) {
    this.viewer = viewer
    this.polygonPoints = []
    this.pointListRef = []
    this.lineListRef = []
    this.polygonListRef = []
  }
  init() {
    const handler = new (Cesium as any).ScreenSpaceEventHandler(this.viewer.canvas)
    // 创建一个用于显示当前绘制中的多边形的实体
    const drawingPolygon = this.viewer.entities.add({
      id: 'drawingPolygon',
      name: '多边形',
      polygon: {
        hierarchy: new (Cesium as any).CallbackProperty(() => {
          return new (Cesium as any).PolygonHierarchy(this.polygonPoints)
        }, false),
        material: (Cesium as any).Color.RED.withAlpha(0.2),
        perPositionHeight: false, // true 不贴地 false 贴地
      },
    })
    // 创建一个用于显示当前绘制中的线的实体
    const drawingLine = this.viewer.entities.add({
      id: 'drawingLine',
      name: '实线',
      polyline: {
        positions: new (Cesium as any).CallbackProperty(() => {
          return this.polygonPoints
        }, false),
        width: 2,
        material: (Cesium as any).Color.GREEN,
      },
    })
    handler.setInputAction(event => {
      const cartesian3 = this.viewer.camera.pickEllipsoid(event.position, this.viewer.scene.globe.ellipsoid)
      if (cartesian3) {
        this.polygonPoints.push(cartesian3.clone())
        // 在第一次点击时，添加一个克隆的点到数组中，用于动态更新 三点成面
        if (this.polygonPoints.length === 1) {
          this.polygonPoints.push(cartesian3.clone())
        }
        // 添加点位
        const pointRef = this.viewer.entities.add({
          position: cartesian3,
          point: {
            color: (Cesium as any).Color.RED,
            pixelSize: 10,
          },
        })
        if (pointRef) {
          this.pointListRef.push(pointRef)
        }
        if (drawingLine) {
          this.lineListRef.push(drawingLine)
        }
        if (drawingPolygon) {
          this.polygonListRef.push(drawingPolygon)
        }
      }
    }, (Cesium as any).ScreenSpaceEventType.LEFT_CLICK)

    // 监听鼠标移动
    handler.setInputAction(event => {
      const cartesian3 = this.viewer.camera.pickEllipsoid(event.endPosition, this.viewer.scene.globe.ellipsoid)
      if (this.polygonPoints.length >= 2) {
        if (cartesian3) {
          this.polygonPoints.pop() // 删除最后一个
          this.polygonPoints.push(cartesian3)
        }
      }
    }, (Cesium as any).ScreenSpaceEventType.MOUSE_MOVE)
    // 监听鼠标右键点击取消绘制
    handler.setInputAction(() => {
      const cartesian3 = this.polygonPoints[this.polygonPoints.length - 1]
      if (cartesian3) {
        const lastPointRef = this.viewer.entities.add({
          position: cartesian3,
          point: {
            color: (Cesium as any).Color.RED,
            pixelSize: 10,
          },
        })
        this.pointListRef.push(lastPointRef)
        this.polygonPoints.push(this.polygonPoints[0])
      }
      handler.destroy()
    }, (Cesium as any).ScreenSpaceEventType.RIGHT_CLICK)
  }

  clear() {
    this.polygonPoints.forEach(res => {
      this.viewer.entities.remove(res)
    })
    this.polygonPoints = []
    this.pointListRef.forEach(res => {
      this.viewer.entities.remove(res)
    })
    this.pointListRef = []
    this.lineListRef.forEach(res => {
      this.viewer.entities.remove(res)
    })
    this.lineListRef = []
    this.polygonListRef.forEach(res => {
      this.viewer.entities.remove(res)
    })
    this.polygonListRef = []
  }
}
// 绘制圆
export class DrawCircle {
  viewer: any
  centerPoint: any
  ceterRef: any
  centerEntiesRef: any
  radius: number
  constructor(viewer: any, radius = 10) {
    this.viewer = viewer
    this.centerPoint = null
    this.ceterRef = null
    this.centerEntiesRef = null
    this.radius = radius
  }
  init() {
    const handler = new (Cesium as any).ScreenSpaceEventHandler(this.viewer.canvas)
    const drawingCircle = this.viewer.entities.add({
      id: 'drawingCircle',
      name: '画圆',
      ellipse: {
        semiMinorAxis: new (Cesium as any).CallbackProperty(() => {
          return this.radius
        }),
        semiMajorAxis: new (Cesium as any).CallbackProperty(() => {
          return this.radius
        }, false),
        material: (Cesium as any).Color.BLUE.withAlpha(0.2),
        outline: true,
        outlineColor: (Cesium as any).Color.RED,
        outlineWidth: 2,
        fill: true, // true显示轮廓线
      },
    })
    handler.setInputAction(event => {
      const cartesian3 = this.viewer.camera.pickEllipsoid(event.position, this.viewer.scene.globe.ellipsoid)
      if (cartesian3 && this.centerPoint == null) {
        console.log(cartesian3, 'cartesian3')
        this.centerPoint = cartesian3
        drawingCircle.position = this.centerPoint
        // 添加中心点实体并保存其引用
        this.ceterRef = this.viewer.entities.add({
          position: cartesian3,
          point: {
            color: (Cesium as any).Color.RED,
            pixelSize: 10,
          },
        })
      }
    }, (Cesium as any).ScreenSpaceEventType.LEFT_CLICK)
    handler.setInputAction(event => {
      if (this.centerPoint) {
        const cartesian3 = this.viewer.camera.pickEllipsoid(event.endPosition, this.viewer.scene.globe.ellipsoid)
        if (cartesian3) {
          const distance = (Cesium as any).Cartesian3.distance(this.centerPoint, cartesian3)
          this.radius = distance
        }
      }
    }, (Cesium as any).ScreenSpaceEventType.MOUSE_MOVE)

    // 鼠标右键结束绘制
    handler.setInputAction(() => {
      if (this.centerPoint !== null && this.radius > 0) {
        handler.destroy()
        if (drawingCircle) {
          this.centerEntiesRef = drawingCircle
        }
      }
    }, (Cesium as any).ScreenSpaceEventType.RIGHT_CLICK)
  }
  clear() {
    if (this.centerPoint && this.centerEntiesRef) {
      this.viewer.entities.remove(this.ceterRef)
      this.viewer.entities.remove(this.centerEntiesRef)
      this.centerPoint = null
      this.ceterRef = null
      this.centerEntiesRef = null
    }
  }
}
