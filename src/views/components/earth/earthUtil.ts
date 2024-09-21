import * as Cesium from 'Cesium'
import add from '@/icons/svg/add.svg'
export function createPoint(viewer) {
  // 创建点的位置
  var position = (Cesium as any).Cartesian3.fromDegrees(-75.59777, 40.03883)
  // 创建 Billboard 实体
  var point = viewer.entities.add({
    position: position,
    // billboard: {
    //   image: add, // 自定义图标的路径
    //   width: 32,
    //   height: 32,
    // },
    point: {
      pixelSize: 10, //点像素大小
      color: (Cesium as any).Color.RED,
      outlineColor: (Cesium as any).Color.WHITE,
      outlineWidth: 2,
    },
  })

  // 可以添加其他属性或操作
  point.name = 'Custom Point' // 为点添加名称

  // 设置相机视图，使点可见
  // viewer.zoomTo(point)
  // 设置视角，确保地球不会自动放大
}
// 创建一个多边形
export function createPolygon(viewer) {
  let wyoming = viewer.entities.add({
    name: 'Wyoming',
    polygon: {
      hierarchy: (Cesium as any).Cartesian3.fromDegreesArray([
        -109.080842, 45.002073, -105.91517, 45.002073, -104.058488, 44.996596, -104.053011, 43.002989, -104.053011, 41.003906, -105.728954, 40.998429, -107.919731, 41.003906,
        -109.04798, 40.998429, -111.047063, 40.998429, -111.047063, 42.000709, -111.047063, 44.476286, -111.05254, 45.002073,
      ]),
      height: 0,
      material: (Cesium as any).Color.RED.withAlpha(0.5),
      outline: true,
      outlineColor: (Cesium as any).Color.BLACK,
    },
  })
}
// 创建一个label
export function createLable(viewer) {
  var entity = viewer.entities.add({
    position: (Cesium as any).Cartesian3.fromDegrees(-75.59777, 40.03883),
    label: {
      text: 'Hello, Cesium!', // 设置标签文本
      font: '24px sans-serif', // 设置字体样式
      fillColor: (Cesium as any).Color.YELLOW, // 设置文本颜色
      outlineColor: (Cesium as any).Color.BLACK, // 设置轮廓颜色
      outlineWidth: 2, // 设置轮廓宽度
      showBackground: true,
      // 添加背景颜色
      backgroundColor: (Cesium as any).Color(0.5, 0.5, 0.5, 1), // 背景颜色以及透明度,
      style: (Cesium as any).LabelStyle.FILL_AND_OUTLINE, // 设置标签样式
      pixelOffset: new (Cesium as any).Cartesian2(0, -40), // 设置像素偏移量
      verticalOrigin: (Cesium as any).VerticalOrigin.BOTTOM, // 设置垂直方向上的对齐方式
      heightReference: (Cesium as any).HeightReference.RELATIVE_TO_GROUND, // 设置高度参考
    },
  })
  // viewer.camera.flyTo({
  //   destination: (Cesium as any).Cartesian3.fromDegrees(-75.59777, 40.03883, 1230213),
  // })
}
