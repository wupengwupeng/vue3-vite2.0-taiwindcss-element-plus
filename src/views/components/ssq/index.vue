<!-- <template>
  <div class="lottery-analyzer w-full h-full overflow-auto">
    <h1>ssq智能分析工具</h1>
    <div class="upload-section">
      <input type="file" @change="handleFileUpload" accept=".xls,.xlsx" />
      <button @click="analyzeData" :disabled="!fileData">开始分析</button>
    </div>

    <div v-if="analysisResult" class="results-section">
      <div class="analysis-section">
        <h2>红球分析结果</h2>
        <div class="result-item">
          <h3>奇偶比例</h3>
          <p>当前奇偶比: {{ analysisResult.oddEvenRatio }}</p>
          <p>推荐奇偶比: 3:3 或 4:2</p>
        </div>

        <div class="result-item">
          <h3>冷热号码</h3>
          <p>热号(近10期高频): {{ analysisResult.hotNumbers.join(', ') }}</p>
          <p>冷号(近30期未出): {{ analysisResult.coldNumbers.join(', ') }}</p>
        </div>

        <div class="result-item">
          <h3>区间分布</h3>
          <p>一区(1-11): {{ analysisResult.zone1.join(', ') }}</p>
          <p>二区(12-22): {{ analysisResult.zone2.join(', ') }}</p>
          <p>三区(23-33): {{ analysisResult.zone3.join(', ') }}</p>
        </div>
      </div>

      <div class="blue-ball-section">
        <h2>蓝球分析结果</h2>
        <p>高频蓝球(近10期): {{ analysisResult.hotBlueBalls.join(', ') }}</p>
      </div>

      <div class="recommendation-section">
        <h2>推荐号码</h2>
        <div class="recommendation-item" v-for="(rec, index) in analysisResult.recommendations" :key="index">
          <p>
            推荐组合 {{ index + 1 }}: <span class="red-balls">{{ rec.redBalls.join(', ') }}</span> +
            <span class="blue-ball">{{ rec.blueBall }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template> -->

<!-- <script name="ssq" setup>
import { ref } from 'vue'
import * as XLSX from 'xlsx'

const fileData = ref(null)
const analysisResult = ref(null)

// 处理文件上传
const handleFileUpload = event => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = e => {
    const data = new Uint8Array(e.target.result)
    const workbook = XLSX.read(data, { type: 'array' })
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
    fileData.value = XLSX.utils.sheet_to_json(firstSheet)
  }
  reader.readAsArrayBuffer(file)
}

// 分析数据
const analyzeData = () => {
  if (!fileData.value) return

  // 1. 准备数据
  const historyData = fileData.value.map(item => ({
    redBalls: [parseInt(item['红球1']), parseInt(item['红球2']), parseInt(item['红球3']), parseInt(item['红球4']), parseInt(item['红球5']), parseInt(item['红球6'])],
    blueBall: parseInt(item['蓝球']),
  }))

  // 2. 分析奇偶比
  const oddEvenStats = { odd: 0, even: 0 }
  historyData.slice(0, 10).forEach(draw => {
    draw.redBalls.forEach(num => {
      num % 2 === 1 ? oddEvenStats.odd++ : oddEvenStats.even++
    })
  })

  // 3. 分析冷热号
  const numberStats = {}
  for (let i = 1; i <= 33; i++) {
    numberStats[i] = 0
  }

  historyData.slice(0, 30).forEach(draw => {
    draw.redBalls.forEach(num => {
      numberStats[num]++
    })
  })

  const allNumbers = Object.entries(numberStats).map(([num, count]) => ({
    number: parseInt(num),
    count,
  }))

  // 热号(近10期出现3次以上)
  const hotNumbers = allNumbers
    .filter(num => num.count >= 3)
    .sort((a, b) => b.count - a.count)
    .map(item => item.number)

  // 冷号(近30期出现0-1次)
  const coldNumbers = allNumbers.filter(num => num.count <= 1).map(item => item.number)

  // 4. 区间分布
  const zone1 = allNumbers.filter(num => num.number >= 1 && num.number <= 11)
  const zone2 = allNumbers.filter(num => num.number >= 12 && num.number <= 22)
  const zone3 = allNumbers.filter(num => num.number >= 23 && num.number <= 33)

  // 5. 蓝球分析
  const blueBallStats = {}
  for (let i = 1; i <= 16; i++) {
    blueBallStats[i] = 0
  }

  historyData.slice(0, 10).forEach(draw => {
    blueBallStats[draw.blueBall]++
  })

  const hotBlueBalls = Object.entries(blueBallStats)
    .filter(([_, count]) => count >= 2)
    .map(([num]) => parseInt(num))

  // 6. 生成推荐号码
  const generateRecommendations = () => {
    const recommendations = []

    for (let i = 0; i < 10; i++) {
      // 从热号中随机选3-4个
      const fromHot = hotNumbers.sort(() => 0.5 - Math.random()).slice(0, 3 + Math.floor(Math.random() * 2))

      // 从冷号中随机选1-2个
      const fromCold = coldNumbers.sort(() => 0.5 - Math.random()).slice(0, 1 + Math.floor(Math.random() * 2))

      // 从各区补充
      const fromZone1 = zone1
        .sort(() => 0.5 - Math.random())
        .slice(0, 1)
        .map(item => item.number)

      const fromZone2 = zone2
        .sort(() => 0.5 - Math.random())
        .slice(0, 1)
        .map(item => item.number)

      const fromZone3 = zone3
        .sort(() => 0.5 - Math.random())
        .slice(0, 1)
        .map(item => item.number)

      // 合并并去重
      let redBalls = [...new Set([...fromHot, ...fromCold, ...fromZone1, ...fromZone2, ...fromZone3])]

      // 如果不足6个，随机补充
      while (redBalls.length < 6) {
        const randomNum = Math.floor(Math.random() * 33) + 1
        if (!redBalls.includes(randomNum)) {
          redBalls.push(randomNum)
        }
      }

      // 排序
      redBalls.sort((a, b) => a - b)

      // 选择蓝球
      const blueBall = hotBlueBalls.length > 0 ? hotBlueBalls[Math.floor(Math.random() * hotBlueBalls.length)] : Math.floor(Math.random() * 16) + 1

      recommendations.push({
        redBalls,
        blueBall,
      })
    }

    return recommendations
  }

  analysisResult.value = {
    oddEvenRatio: `${oddEvenStats.odd}:${oddEvenStats.even}`,
    hotNumbers,
    coldNumbers,
    zone1: zone1.map(item => item.number),
    zone2: zone2.map(item => item.number),
    zone3: zone3.map(item => item.number),
    hotBlueBalls,
    recommendations: generateRecommendations(),
  }
}
</script> -->

<!-- <style lang="scss" scoped>
.lottery-analyzer {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.upload-section {
  margin: 20px 0;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

.results-section {
  margin-top: 30px;
}

.analysis-section,
.blue-ball-section,
.recommendation-section {
  margin-bottom: 30px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
}

.result-item {
  margin-bottom: 15px;
}

.red-balls {
  color: red;
  font-weight: bold;
}

.blue-ball {
  color: blue;
  font-weight: bold;
}

button {
  padding: 8px 16px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}
</style>

<script name="ssq" setup>
import { ref } from 'vue'
import * as XLSX from 'xlsx'
import { UploadFilled } from '@element-plus/icons-vue'
import { calcAllStats } from '@/utils/ssq' // 把上面的算法集中放这里

const stats = ref(null)
const fileData = ref(null)
// 处理文件上传
const handleFileUpload = event => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = e => {
    const data = new Uint8Array(e.target.result)
    const workbook = XLSX.read(data, { type: 'array' })
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
    fileData.value = XLSX.utils.sheet_to_json(firstSheet)
    console.log(fileData.value, 'fileData')
  }
  reader.readAsArrayBuffer(file)
}
async function onFileChange(file) {
  const history = fileData.value.map(res => {
    return {
      id: res.__EMPTY_1,
      data: res.__EMPTY_1,
      reds: [res.__EMPTY_2, res.__EMPTY_3, res.__EMPTY_4, res.__EMPTY_5, res.__EMPTY_6, res.__EMPTY_7].map(Number),
      blue: +res.__EMPTY_8,
    }
  })
  const total = calcAllStats(history)
  console.log(total, 'total')
}
</script> -->

<template>
  <div class="lottery-analyzer h-full w-full overflow-auto">
    <h1>ssq智能分析工具 (Excel版)</h1>

    <div class="upload-section">
      <input type="file" @change="handleFileUpload" accept=".xls,.xlsx" />
      <button @click="analyzeData" :disabled="!fileData">开始分析</button>
    </div>

    <div v-if="loading" class="loading">分析中，请稍候...</div>

    <div v-if="analysisResult" class="results-section">
      <div class="strategy-section">
        <h2>分析策略</h2>
        <ul>
          <li><strong>热温冷比例:</strong> 3+2+1 或 2+3+1</li>
          <li><strong>区间分布:</strong> 2-2-2 或 3-2-1</li>
          <li><strong>奇偶比例:</strong> 3:3 / 4:2</li>
          <li><strong>和值范围:</strong> 70~120</li>
          <li><strong>蓝球策略:</strong> 高频 + 奇偶反转</li>
        </ul>
      </div>

      <div class="analysis-section">
        <h2>数据分析结果</h2>
        <div class="result-item">
          <h3>红球热温冷分类 (近30期)</h3>
          <p>热号(≥4次): {{ analysisResult.hotNumbers.join(', ') }}</p>
          <p>温号(2-3次): {{ analysisResult.warmNumbers.join(', ') }}</p>
          <p>冷号(0-1次): {{ analysisResult.coldNumbers.join(', ') }}</p>
        </div>

        <div class="result-item">
          <h3>区间分布统计</h3>
          <p>一区(1-11): {{ analysisResult.zone1.join(', ') }}</p>
          <p>二区(12-22): {{ analysisResult.zone2.join(', ') }}</p>
          <p>三区(23-33): {{ analysisResult.zone3.join(', ') }}</p>
        </div>

        <div class="result-item">
          <h3>蓝球分析</h3>
          <p>高频蓝球(近10期≥2次): {{ analysisResult.hotBlueBalls.join(', ') }}</p>
          <p>低频蓝球(近10期0-1次): {{ analysisResult.coldBlueBalls.join(', ') }}</p>
        </div>
      </div>

      <div class="recommendation-section">
        <h2>推荐号码组合 (10组)</h2>
        <div class="recommendation-grid">
          <div v-for="(combo, index) in analysisResult.recommendations" :key="index" class="combo-item">
            <div class="combo-header">组合 {{ index + 1 }}</div>
            <div class="red-balls">
              <span v-for="ball in combo.redBalls" :key="ball" class="red-ball">{{ ball }}</span>
            </div>
            <div class="blue-ball">{{ combo.blueBall }}</div>
            <div class="combo-stats">
              <span>和值: {{ combo.sum }}</span>
              <span>奇偶: {{ combo.oddEvenRatio }}</span>
              <span>区间: {{ combo.zoneDistribution }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import * as XLSX from 'xlsx'

const fileData = ref(null)
const analysisResult = ref(null)
const loading = ref(false)

// 处理Excel文件上传
const handleFileUpload = event => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = e => {
    const data = new Uint8Array(e.target.result)
    const workbook = XLSX.read(data, { type: 'array' })
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
    fileData.value = XLSX.utils.sheet_to_json(firstSheet)
    console.log(fileData.value, 'fileData')
  }
  reader.readAsArrayBuffer(file)
}

// 分析数据
const analyzeData = () => {
  if (!fileData.value) return

  loading.value = true

  try {
    console.log(fileData.value, 'fileData')
    // 准备历史数据
    const historyData = fileData.value
      .map(item => ({
        redBalls: [
          parseInt(item['红球1'] || item['red1']),
          parseInt(item['红球2'] || item['red2']),
          parseInt(item['红球3'] || item['red3']),
          parseInt(item['红球4'] || item['red4']),
          parseInt(item['红球5'] || item['red5']),
          parseInt(item['红球6'] || item['red6']),
        ],
        blueBall: parseInt(item['蓝球'] || item['blue']),
      }))
      .filter(item => !isNaN(item.redBalls[0])) // 过滤无效数据

    console.log(historyData, 'historyData')
    // 1. 分析红球热温冷
    const numberStats = {}
    for (let i = 1; i <= 33; i++) {
      numberStats[i] = 0
    }

    // 统计近30期出现频率
    const recent30 = historyData.slice(-30)
    recent30.forEach(draw => {
      draw.redBalls.forEach(num => {
        numberStats[num]++
      })
    })

    const allNumbers = Object.entries(numberStats).map(([num, count]) => ({
      number: parseInt(num),
      count,
    }))

    // 分类热温冷号码
    const hotNumbers = allNumbers.filter(num => num.count >= 4).map(item => item.number)

    const warmNumbers = allNumbers.filter(num => num.count >= 2 && num.count <= 3).map(item => item.number)

    const coldNumbers = allNumbers.filter(num => num.count <= 1).map(item => item.number)

    // 2. 区间分布
    const zone1 = allNumbers.filter(num => num.number >= 1 && num.number <= 11)
    const zone2 = allNumbers.filter(num => num.number >= 12 && num.number <= 22)
    const zone3 = allNumbers.filter(num => num.number >= 23 && num.number <= 33)

    // 3. 蓝球分析
    const blueBallStats = {}
    for (let i = 1; i <= 16; i++) {
      blueBallStats[i] = 0
    }

    // 统计近10期蓝球
    const recent10 = historyData.slice(-10)
    recent10.forEach(draw => {
      blueBallStats[draw.blueBall]++
    })

    const hotBlueBalls = Object.entries(blueBallStats)
      .filter(([_, count]) => count >= 2)
      .map(([num]) => parseInt(num))

    const coldBlueBalls = Object.entries(blueBallStats)
      .filter(([_, count]) => count <= 1)
      .map(([num]) => parseInt(num))

    // 4. 生成推荐组合
    const generateCombinations = () => {
      const combinations = []
      const strategies = [
        { hot: 3, warm: 2, cold: 1, zones: [2, 2, 2] },
        { hot: 2, warm: 3, cold: 1, zones: [3, 2, 1] },
      ]

      while (combinations.length < 10) {
        const strategy = strategies[Math.floor(Math.random() * strategies.length)]
        const oddEvenTarget = Math.random() > 0.5 ? [3, 3] : [4, 2]

        let redBalls = []
        let isValid = false
        let attempts = 0

        while (!isValid && attempts < 100) {
          attempts++
          redBalls = []

          // 从热号中选
          const selectedHot = [...hotNumbers].sort(() => 0.5 - Math.random()).slice(0, strategy.hot)

          // 从温号中选
          const selectedWarm = [...warmNumbers].sort(() => 0.5 - Math.random()).slice(0, strategy.warm)

          // 从冷号中选
          const selectedCold = [...coldNumbers].sort(() => 0.5 - Math.random()).slice(0, strategy.cold)

          // 合并并去重
          redBalls = [...new Set([...selectedHot, ...selectedWarm, ...selectedCold])]

          // 如果不足6个，从各区补充
          if (redBalls.length < 6) {
            const remaining = 6 - redBalls.length
            const zoneSelection = [...strategy.zones]

            for (let i = 0; i < remaining; i++) {
              let zone
              do {
                zone = Math.floor(Math.random() * 3)
              } while (zoneSelection[zone] <= 0)

              zoneSelection[zone]--

              let num
              switch (zone) {
                case 0:
                  num = zone1[Math.floor(Math.random() * zone1.length)].number
                  break
                case 1:
                  num = zone2[Math.floor(Math.random() * zone2.length)].number
                  break
                case 2:
                  num = zone3[Math.floor(Math.random() * zone3.length)].number
                  break
              }

              if (!redBalls.includes(num)) {
                redBalls.push(num)
              } else {
                i-- // 重试
              }
            }
          }

          // 检查奇偶比例
          const oddCount = redBalls.filter(n => n % 2 === 1).length
          const evenCount = 6 - oddCount

          // 检查和值
          const sum = redBalls.reduce((a, b) => a + b, 0)

          // 检查区间分布
          const zoneCounts = [0, 0, 0]
          redBalls.forEach(num => {
            if (num >= 1 && num <= 11) zoneCounts[0]++
            else if (num >= 12 && num <= 22) zoneCounts[1]++
            else zoneCounts[2]++
          })

          // 验证条件
          isValid =
            redBalls.length === 6 &&
            (oddCount === oddEvenTarget[0] || oddCount === oddEvenTarget[1]) &&
            sum >= 70 &&
            sum <= 120 &&
            zoneCounts[0] >= 1 &&
            zoneCounts[1] >= 1 &&
            zoneCounts[2] >= 1
        }

        if (isValid) {
          // 排序红球
          redBalls.sort((a, b) => a - b)

          // 选择蓝球 (高频或奇偶反转)
          let blueBall

          if (Math.random() > 0.3) {
            // 70%概率选高频
            blueBall = hotBlueBalls[Math.floor(Math.random() * hotBlueBalls.length)]
          } else {
            // 30%概率奇偶反转 (如果高频蓝球都是奇数，则选偶数，反之亦然)
            const hotBlueOdd = hotBlueBalls.filter(n => n % 2 === 1).length
            const hotBlueEven = hotBlueBalls.length - hotBlueOdd

            if (hotBlueOdd > hotBlueEven) {
              // 高频多为奇数，选偶数
              blueBall = coldBlueBalls.find(n => n % 2 === 0) || Math.floor(Math.random() * 8) * 2 + 2
            } else {
              // 高频多为偶数，选奇数
              blueBall = coldBlueBalls.find(n => n % 2 === 1) || Math.floor(Math.random() * 8) * 2 + 1
            }
          }
          // 如果没有找到合适的篮球，取最近10期频率最高的一个
          // if (!blueBall || isNaN(blueBall)) {
          //   blueBall = hotBlueBalls.length > 0 ? hotBlueBalls[Math.floor(Math.random() * hotBlueBalls.length)] : Math.floor(Math.random() * 16) + 1
          // }

          // 计算统计信息
          const oddCount = redBalls.filter(n => n % 2 === 1).length
          const sum = redBalls.reduce((a, b) => a + b, 0)
          const zoneCounts = [0, 0, 0]
          redBalls.forEach(num => {
            if (num >= 1 && num <= 11) zoneCounts[0]++
            else if (num >= 12 && num <= 22) zoneCounts[1]++
            else zoneCounts[2]++
          })

          combinations.push({
            redBalls,
            blueBall,
            sum,
            oddEvenRatio: `${oddCount}:${6 - oddCount}`,
            zoneDistribution: `${zoneCounts[0]}-${zoneCounts[1]}-${zoneCounts[2]}`,
          })
        }
      }

      return combinations
    }

    analysisResult.value = {
      hotNumbers,
      warmNumbers,
      coldNumbers,
      zone1: zone1.map(item => item.number),
      zone2: zone2.map(item => item.number),
      zone3: zone3.map(item => item.number),
      hotBlueBalls,
      coldBlueBalls,
      recommendations: generateCombinations(),
    }
    console.log(analysisResult.value, 'analysisResult')
  } catch (error) {
    console.error('分析出错:', error)
    alert('分析过程中出现错误，请检查数据格式')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.lottery-analyzer {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.upload-section {
  margin: 20px 0;
  padding: 20px;
  background: #f0f7ff;
  border-radius: 8px;
  text-align: center;
}

.upload-section input {
  margin-right: 10px;
}

button {
  padding: 8px 16px;
  background: #4a6baf;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.loading {
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
  color: #4a6baf;
}

.results-section {
  margin-top: 30px;
}

.strategy-section,
.analysis-section {
  margin-bottom: 30px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
}

.strategy-section ul {
  list-style-type: none;
  padding: 0;
}

.strategy-section li {
  margin-bottom: 8px;
  padding: 8px;
  background: #eef4ff;
  border-radius: 4px;
}

.result-item {
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.result-item h3 {
  margin-top: 0;
  color: #4a6baf;
}

.recommendation-section {
  margin-top: 30px;
}

.recommendation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.combo-item {
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.combo-header {
  font-weight: bold;
  margin-bottom: 10px;
  color: #4a6baf;
  font-size: 1.1em;
}

.red-balls {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.red-ball {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: #ff4d4d;
  color: white;
  border-radius: 50%;
  font-weight: bold;
}

.blue-ball {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: #4d79ff;
  color: white;
  border-radius: 50%;
  font-weight: bold;
  margin-bottom: 10px;
}

.combo-stats {
  font-size: 0.9em;
  color: #666;
  display: flex;
  justify-content: space-between;
}

.combo-stats span {
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
}

h2 {
  color: #333;
  border-bottom: 2px solid #4a6baf;
  padding-bottom: 8px;
}
</style>
