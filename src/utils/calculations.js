// 材料系数
export const materialFactors = {
  mildSteel: 1,
  galvanizedSteel: 1,
  stainless201: 2,
  stainless304: 1.63,
  aluminum: 0.7,
  brass: 0.55,
}

// 折弯力计算
export function calculateTonnage(
  thickness,
  length,
  vDie,
  material = 'mildSteel'
) {
  const T = Number(thickness)
  const L = Number(length)
  const V = Number(vDie)

  if (!T || !L || !V) {
    return 0
  }

  // 材料系数
  const factor =
    materialFactors[material] || 1

  // 工业经验公式
  let tonnage =
    (1.34 * T * T * L) / V

  // 材料修正
  tonnage = tonnage * factor

  // 工业修正
  tonnage = tonnage / 20

  return Number(tonnage.toFixed(2))
}

// 推荐机型
export function recommendMachine(
  tonnage,
  length
) {
  const ton = Number(tonnage)
  const len = Number(length)

  const machines = [
    [30, 1600],

    [40, 1600],
    [40, 2500],

    [50, 1600],
    [50, 2500],

    [63, 1600],
    [63, 2500],

    [80, 2500],
    [80, 3200],

    [100, 2500],
    [100, 3200],
    [100, 4000],

    [125, 2500],
    [125, 3200],
    [125, 4000],

    [135, 2500],
    [135, 3200],
    [135, 4000],

    [160, 2500],
    [160, 3200],
    [160, 4000],
    [160, 5000],
    [160, 6000],

    [200, 2500],
    [200, 3200],
    [200, 4000],
    [200, 5000],
    [200, 6000],

    [250, 2500],
    [250, 3200],
    [250, 4000],
    [250, 5000],
    [250, 6000],

    [300, 2500],
    [300, 3200],
    [300, 4000],
    [300, 5000],
    [300, 6000],

    [400, 3200],
    [400, 4000],
    [400, 5000],
    [400, 6000],

    [500, 3200],
    [500, 4000],
    [500, 5000],
    [500, 6000],

    [600, 4000],
    [600, 5000],
    [600, 6000],
  ]

  // 超范围
  if (ton > 600 || len > 6000) {
    return 'Custom Machine'
  }

  // 匹配最近机型
  for (const machine of machines) {
    const machineTon = machine[0]
    const machineLen = machine[1]

    if (
      machineTon >= ton &&
      machineLen >= len
    ) {
      return `${machineTon}T / ${machineLen}`
    }
  }

  return 'Custom Machine'
}

// 推荐V槽
export function recommendVdie(
  thickness
) {
  const T = Number(thickness)

  if (!T) {
    return 0
  }

  // 小于8mm
  if (T < 8) {
    return T * 8
  }

  // 8~25mm
  if (T >= 8 && T < 25) {
    return T * 10
  }

  // 大于25mm
  return T * 12
}