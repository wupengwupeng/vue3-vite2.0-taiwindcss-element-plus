import * as Cesium from 'Cesium'
export class Track {
  /**
   *Creates an instance of Roaming.
   * @param {*} viewer 需要传入
   * @param {*} options.speed 速度m/s 需要传入
   * @param {*} options.stayTime 等待时间  需要传入
   * @param {*} options.Lines  点集合 需要传入
   * @param {*} options.shootCallback  拍设点回调函数
   * @memberof Track
   */
  private viewer: any
  private entity: any
  private Lines: any
  private stayTime: any
  private stayTimeCalc: any
  private speed: any
  private primitivesone: any
  private primitivestwo: any
  private spotLightCamera: any
  private frustumFar: any
  private dataSource: any
  private onTickstate: any
  private shootCallback: any
  private property: any
  constructor(viewer, options) {
    this.viewer = viewer
    this.entity = undefined
    this.Lines = options.Lines
    this.stayTime = options.stayTime
    this.stayTimeCalc = options.stayTime
    this.speed = options.speed
    this.primitivesone = null
    this.primitivestwo = null
    this.spotLightCamera = null
    this.frustumFar = options.frustumFar
    this.dataSource
    // this.RoamingSpeed
    this.onTickstate = false
    this.shootCallback = options.shootCallback
    this.property = null
    this.TrackPath(options.Lines)
  }

  TrackPath(Lines) {
    var lins = []
    this.dataSource = new (Cesium as any).CustomDataSource('TrackPath')
    for (let i = 0; i < Lines.length; i++) {
      let LinesIndex = new (Cesium as any).Cartesian3.fromDegrees(Lines[i].aircraftLongitude, Lines[i].aircraftLatitude, Lines[i].aircraftAltitude)
      this.dataSource.entities.add({
        position: LinesIndex,
        point: {
          pixelSize: 8,
          color: (Cesium as any).Color.RED,
        },
      })
      lins.push(Lines[i].aircraftLongitude)
      lins.push(Lines[i].aircraftLatitude)
      lins.push(Lines[i].aircraftAltitude)
    }
    this.dataSource.entities.add({
      polyline: {
        positions: new (Cesium as any).Cartesian3.fromDegreesArrayHeights(lins),
        width: 2,
        material: (Cesium as any).Color.YELLOW,
      },
    })

    this.viewer.dataSources.add(this.dataSource)
    this.ChangePerspective('ViewSide')
  }
  StartFlying() {
    this.property = this.ComputeRoamingLineProperty(this.Lines)
    this.InitRoaming(this.property.property, this.property.startTime, this.property.stopTime)
  }
  /**
   * @param {*} Lines 点集合
   * @returns
   * @memberof Track
   */
  ComputeRoamingLineProperty(Lines) {
    this.onTickstate = true
    let startTime = (Cesium as any).JulianDate.fromDate(new Date())
    let stopTime
    let property = new (Cesium as any).SampledPositionProperty()
    let startWaiting, endWaiting
    let Waiting = []
    for (let i = 0, t = 0; i < Lines.length; i++) {
      if (i == 0) {
        t = 0
      } else {
        let p1 = new (Cesium as any).Cartesian3.fromDegrees(Lines[i - 1].aircraftLongitude, Lines[i - 1].aircraftLatitude, Lines[i - 1].aircraftAltitude)
        let p2 = new (Cesium as any).Cartesian3.fromDegrees(Lines[i].aircraftLongitude, Lines[i].aircraftLatitude, Lines[i].aircraftAltitude)
        let d = (Cesium as any).Cartesian3.distance(p1, p2)
        t += d / this.speed
      }
      let LinesIndex = new (Cesium as any).Cartesian3.fromDegrees(Lines[i].aircraftLongitude, Lines[i].aircraftLatitude, Lines[i].aircraftAltitude)
      property.addSample((Cesium as any).JulianDate.addSeconds(startTime, t, new (Cesium as any).JulianDate()), LinesIndex)

      if (Lines[i].isShoot == true) {
        startWaiting = (Cesium as any).JulianDate.addSeconds(startTime, t, new (Cesium as any).JulianDate())
        t += this.stayTime || 1
        property.addSample((Cesium as any).JulianDate.addSeconds(startTime, t, new (Cesium as any).JulianDate()), LinesIndex)
        endWaiting = (Cesium as any).JulianDate.addSeconds(startTime, t, new (Cesium as any).JulianDate())
        Waiting.push({
          startWaiting,
          endWaiting,
          shootId: Lines[i].shootId,
        })
      }

      if (i == Lines.length - 1) {
        stopTime = (Cesium as any).JulianDate.addSeconds(startTime, t, new (Cesium as any).JulianDate())
      }
    }

    let k = true
    this.viewer.clock.onTick.addEventListener(e => {
      if (this.onTickstate) {
        let finds = false
        for (let i = 0; i < Waiting.length; i++) {
          if (Waiting[i].startWaiting.secondsOfDay < e.currentTime.secondsOfDay && Waiting[i].endWaiting.secondsOfDay > e.currentTime.secondsOfDay) {
            if (k) {
              this.shootCallback(Waiting[i].shootId)
              this.SetLookCone(Waiting[i].shootId)
            }
            finds = true
            break
          }
        }
        if (finds) {
          k = false
        } else {
          k = true
        }
      }
    })

    this.viewer.clock.startTime = startTime.clone()
    this.viewer.clock.stopTime = stopTime.clone()
    this.viewer.clock.currentTime = startTime.clone()
    this.viewer.clock.clockRange = (Cesium as any).ClockRange.LOOP_STOP
    this.viewer.clock.multiplier = 1
    this.viewer.clock.shouldAnimate = true

    return {
      property,
      startTime,
      stopTime,
    }
  }
  /**
   *
   *
   * @param {*} position computeRoamingLineProperty计算的属性
   * @param {*} isPathShow path路径是否显示
   * @memberof Track
   */
  InitRoaming(position, start, stop) {
    this.entity = this.viewer.entities.add({
      availability: new (Cesium as any).TimeIntervalCollection([
        new (Cesium as any).TimeInterval({
          start: start,
          stop: stop,
        }),
      ]),
      // 位置
      position: position,
      // 计算朝向
      // orientation: new Cesium.VelocityOrientationProperty(position),
      // 加载模型
      model: {
        // 模型路径
        uri: '/gltf/air.glb',
        // 模型最小刻度
        minimumPixelSize: 64,
        maximumSize: 128,
        // 设置模型最大放大大小
        maximumScale: 200,
        // 模型是否可见
        show: true,
        // 模型轮廓颜色
        silhouetteColor: (Cesium as any).Color.WHITE,
        // 模型颜色  ，这里可以设置颜色的变化
        // color: color,
        // 仅用于调试，显示魔仙绘制时的线框
        debugWireframe: false,
        // 仅用于调试。显示模型绘制时的边界球。
        debugShowBoundingVolume: false,

        scale: 0.02,
        runAnimations: false, // 是否运行模型中的动画效果(由于我的模型是不会动所以就很呆哈哈哈)
      },
      path: {
        resolution: 1,
        material: new (Cesium as any).PolylineGlowMaterialProperty({
          glowPower: 0.1,
          color: (Cesium as any).Color.RED,
        }),
        width: 10,
        show: false,
      },
    })
  }

  /**
   *航迹模拟的暂停和继续
   *
   * @param {*} state bool类型 false为暂停，ture为继续
   * @memberof Track
   */
  PauseOrContinue(state) {
    this.viewer.clock.shouldAnimate = state
  }

  SetLookCone(value) {
    // this.RemovePrimitives()

    setTimeout(() => {
      this.RemovePrimitives()
    }, this.stayTime * 1000)

    value = this.Lines.filter(function (item) {
      return item.shootId == value
    })

    value = value[0]
    let positions = new (Cesium as any).Cartesian3.fromDegrees(value.aircraftLongitude, value.aircraftLatitude, value.aircraftAltitude)
    this.spotLightCamera = new (Cesium as any).Camera(this.viewer.scene)
    let spotLightCamera = this.spotLightCamera

    spotLightCamera.setView({
      destination: positions,
      orientation: {
        heading: (Cesium as any).Math.toRadians(value.gimbalYawValue),
        pitch: (Cesium as any).Math.toRadians(value.gimbalPitchValue),
        roll: (Cesium as any).Math.toRadians(0.0),
      },
    })

    let scratchRight = new (Cesium as any).Cartesian3()
    let scratchRotation = new (Cesium as any).Matrix3()
    var scratchOrientation = new (Cesium as any).Quaternion()

    let position = spotLightCamera.positionWC
    let directions = spotLightCamera.directionWC
    let up = spotLightCamera.upWC
    let right = spotLightCamera.rightWC
    right = (Cesium as any).Cartesian3.negate(right, scratchRight)

    let rotation = scratchRotation as any
    ;(Cesium as any).Matrix3.setColumn(
      rotation,
      0,
      right,
      rotation
    )(Cesium as any)
      .Matrix3.setColumn(
        rotation,
        1,
        up,
        rotation
      )(Cesium as any)
      .Matrix3.setColumn(rotation, 2, directions, rotation)
    //计算视锥姿态
    let orientation = (Cesium as any).Quaternion.fromRotationMatrix(rotation, scratchOrientation)
    spotLightCamera.frustum.near = 0.1
    spotLightCamera.frustum.far = this.frustumFar
    //视锥轮廓线图形

    let instanceOutline = new (Cesium as any).GeometryInstance({
      geometry: new (Cesium as any).FrustumGeometry({
        frustum: spotLightCamera.frustum,
        origin: position,
        orientation: orientation,
      }),
      material: (Cesium as any).Color.RED.withAlpha(1),
      id: 'pri' + this.viewer.scene.primitives.length + 1,
      attributes: {
        color: (Cesium as any).ColorGeometryInstanceAttribute.fromColor(new (Cesium as any).Color(1.0, 1.0, 0.0, 0.5)),
        show: new (Cesium as any).ShowGeometryInstanceAttribute(true),
      },
    })

    let instance = new (Cesium as any).GeometryInstance({
      geometry: new (Cesium as any).FrustumOutlineGeometry({
        frustum: spotLightCamera.frustum,
        origin: position,
        orientation: orientation,
      }),
      material: (Cesium as any).Color.RED.withAlpha(0.1),
      id: 'pri0' + this.viewer.scene.primitives.length + 1,
      attributes: {
        color: (Cesium as any).ColorGeometryInstanceAttribute.fromColor(new (Cesium as any).Color(1.0, 0.0, 0.0, 1)),
        show: new (Cesium as any).ShowGeometryInstanceAttribute(true),
      },
    })

    this.primitivesone = this.viewer.scene.primitives.add(
      new (Cesium as any).Primitive({
        geometryInstances: instance,
        appearance: new (Cesium as any).PerInstanceColorAppearance({
          translucent: true,
          flat: true,
        }),
        asynchronous: false,
      })
    )

    this.primitivestwo = this.viewer.scene.primitives.add(
      new (Cesium as any).Primitive({
        geometryInstances: instanceOutline,
        appearance: new (Cesium as any).PerInstanceColorAppearance({
          translucent: true,
          flat: true,
        }),
        asynchronous: false,
      })
    )
  }
  /**
   * 删除视锥
   */
  RemovePrimitives() {
    if (this.primitivesone) {
      this.primitivesone.destroy()
      this.primitivestwo.destroy()
      this.spotLightCamera = null
    }
  }

  /**
   * 改变观看角度
   *
   * @param {*} name string
   *
   * ViewTopDown:顶视图
   * ViewSide ：正视图
   * trackedEntity：跟随模型
   * @memberof Track
   */
  ChangePerspective(name) {
    if (name === 'ViewTopDown') {
      this.viewer.trackedEntity = undefined
      this.viewer.flyTo(this.dataSource, {
        offset: {
          heading: 0,
          pitch: (Cesium as any).Math.toRadians(-90),
          range: 35,
        },
      })
    } else if (name === 'ViewSide') {
      this.viewer.trackedEntity = undefined
      this.viewer.flyTo(this.dataSource, {
        offset: {
          heading: (Cesium as any).Math.toRadians(-90),
          pitch: (Cesium as any).Math.toRadians(-15),
          range: 50,
        },
      })
    } else if (name === 'trackedEntity') {
      this.viewer.trackedEntity = this.entity
    }
  }
  /**
   *改变飞行的速度
   *
   * @param {*} value  整数类型
   * @memberof Track
   */
  ChangeRoamingSpeed(value) {
    this.viewer.clock.multiplier = value
    this.stayTime = this.stayTimeCalc / value
  }
  /**
   *
   *取消航迹模拟
   * @memberof Track
   */
  EndRoaming() {
    this.onTickstate = false
    if (this.entity !== undefined) {
      this.viewer.entities.remove(this.entity)
    }
    if (this.dataSource !== undefined) {
      this.viewer.dataSources.remove(this.dataSource)
    }
    this.viewer.clock.multiplier = 1
    this.RemovePrimitives()
  }
}
