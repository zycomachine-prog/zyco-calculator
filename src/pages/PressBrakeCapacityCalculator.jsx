import { useEffect, useMemo, useState } from 'react'
import EngineeringCTA from '../components/EngineeringCTA.jsx'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'
import { engineeringTools } from '../data/engineeringTools.js'
import { getEngineeringText } from '../languages/engineeringText.js'
import {
  createFAQPageStructuredData,
  createWebApplicationStructuredData,
  setPageSEO,
  setStructuredData,
} from '../utils/seo.js'

const routePath = '/engineering-tools/press-brake-capacity-calculator'
const calibrationFactor = 1.33

const materialFactors = {
  mildSteel: 1,
  galvanizedSteel: 1.05,
  stainless201: 1.76,
  stainless304: 1.62,
  aluminum: 0.65,
  brass: 0.6,
}

const capacityContent = {
  en: {
    back: '← Back to Engineering Tools Hub',
    eyebrow: 'Existing Machine Capacity Check',
    title: 'Press Brake Capacity Calculator',
    subtitle:
      'Calculate maximum sheet thickness, maximum bend length or minimum V-die opening from the rated tonnage of an existing press brake for air bending.',
    calculationModeAria: 'Calculation mode',
    modeSelectionTitle: 'Choose a Calculation Mode',
    selectModeLabel: 'Select Mode →',
    activeModeLabel: 'Current Mode ✓',
    modes: [
      ['maximumThickness', 'Maximum Thickness', 'Find the maximum sheet thickness for a known bend length and V-die opening.'],
      ['maximumBendLength', 'Maximum Bend Length', 'Find the maximum bend length for a known sheet thickness and V-die opening.'],
      ['minimumVOpening', 'Minimum V-Die Opening', 'Find the minimum V opening for a known sheet thickness and bend length.'],
    ],
    inputParameters: 'Input Parameters',
    ratedMachineTonnage: 'Rated Machine Tonnage',
    material: 'Material',
    sheetThickness: 'Sheet Thickness',
    bendLength: 'Bend Length',
    vDieOpening: 'V-Die Opening',
    below30Notice:
      'For machines below 30T, the 85% continuous-load ratio is a conservative default. Confirm the permitted continuous load with the machine manufacturer.',
    calculationResults: 'Calculation Results',
    theoreticalLabels: {
      maximumThickness: 'Theoretical Maximum Thickness',
      maximumBendLength: 'Theoretical Maximum Bend Length',
      minimumVOpening: 'Theoretical Minimum V Opening',
    },
    continuousLabels: {
      maximumThickness: 'Recommended Continuous Maximum Thickness',
      maximumBendLength: 'Recommended Continuous Bend Length',
      minimumVOpening: 'Recommended Continuous Minimum V Opening',
    },
    continuousLoadRatio: 'Continuous Load Ratio',
    recommendedContinuousTonnage: 'Recommended Continuous Tonnage',
    formulaReference: 'Formula Reference',
    formulaVariables:
      'P is bending force in tons, T is sheet thickness in mm, L is bend length in mm, M is the material factor and V is the V-die opening in mm.',
    minimumVExplanation:
      'The minimum V opening is the greater of the tonnage-based requirement and 6 times the sheet thickness.',
    toolingCompatibilityTitle: 'Tooling and Part Compatibility Check',
    toolingCompatibilityRequirementBefore:
      'The minimum V-die opening required for continuous production is',
    toolingCompatibilityRequirementAfter:
      '. Confirm that the available lower die includes an opening equal to or larger than this value.',
    toolingCompatibilityDetails:
      'Before selecting the actual die, verify that the resulting inside radius, minimum flange length and tooling load rating meet the part and machine requirements. Consult the machine or tooling manufacturer when necessary.',
    safetyTitle: 'Engineering Limits and Safety Reminders',
    safetyItems: [
      'This calculator estimates air-bending capacity only.',
      'Actual usable bend length may be limited by machine working length and tooling length.',
      'Short and thick workpieces can create concentrated loads that require manufacturer load-curve confirmation.',
      'Check punch and die load ratings before production.',
      'Verify stroke, daylight, throat depth, inside radius and minimum flange requirements.',
      'Results are engineering references, not production guarantees.',
      'Larger V openings reduce required tonnage but increase natural inside radius and minimum flange requirements.',
      'The V-die opening is never allowed to be smaller than 6 times the sheet thickness in this calculator.',
      'The 6× thickness rule is a conservative minimum. Tooling load, material strength, inside radius or flange requirements may require a larger V opening.',
    ],
    faqTitle: 'Press Brake Capacity Calculator FAQ',
    faq: [
      ['What does a press brake capacity calculator calculate?', 'It works backward from an existing press brake’s rated tonnage to estimate maximum sheet thickness, maximum bend length or minimum V-die opening for air bending.'],
      ['How is maximum sheet thickness calculated?', 'The calculator rearranges the air-bending force formula and solves for thickness using machine tonnage, bend length, material factor and V-die opening.'],
      ['Why are theoretical and continuous capacities different?', 'The theoretical result uses 100% of rated tonnage. The recommended continuous result applies an automatic 85%, 90% or 92% load ratio for more conservative repeated production.'],
      ['Can the calculated maximum bend length exceed the machine working length?', 'Yes. The formula calculates tonnage capacity only. Actual usable bend length can still be limited by machine working length and available tooling length.'],
      ['Why can the V-die opening not be smaller than six times the sheet thickness?', 'Six times sheet thickness is used as a conservative minimum opening. Tooling load, material strength, radius or flange requirements may require a larger opening.'],
      ['Can this calculator guarantee safe production?', 'No. Results are engineering references. Confirm machine load curves, concentrated loading, tooling ratings and the actual bending setup before production.'],
    ],
    relatedTools: 'Related Engineering Tools',
    relatedToolsAria: 'Related engineering tools',
    workflowTitle: 'Continue Your Engineering Calculation',
    workflowCards: [
      ['Calculate Required Tonnage', 'Know the material, thickness, bend length and V-die opening? Calculate the required press brake tonnage.', 'Open Press Brake Calculator →', '/engineering-tools/press-brake-calculator'],
      ['Calculate Flat Pattern Length', 'After checking machine capacity, calculate bend allowance, bend deduction and flat pattern length.', 'Open Bend Allowance Calculator →', '/engineering-tools/bend-allowance-calculator'],
    ],
    seoTitle: 'Press Brake Capacity Calculator | ZYCO',
    seoDescription:
      'Calculate maximum sheet thickness, maximum bend length or minimum V-die opening from an existing press brake’s rated tonnage for air bending.',
    seoKeywords:
      'press brake capacity calculator, press brake maximum thickness calculator, press brake maximum bend length, minimum V die opening calculator, press brake tonnage capacity, air bending capacity calculator',
  },
  zh: {
    back: '← 返回工程工具中心',
    eyebrow: '现有设备能力校核',
    title: '折弯机能力计算器',
    subtitle: '根据现有折弯机的额定吨位，计算空弯条件下的最大板厚、最大折弯长度或最小 V 型模开口。',
    calculationModeAria: '计算模式',
    modeSelectionTitle: '选择一个计算模式',
    selectModeLabel: '点击选择 →',
    activeModeLabel: '当前模式 ✓',
    modes: [
      ['maximumThickness', '最大板厚', '根据已知折弯长度和 V 型模开口计算最大板厚。'],
      ['maximumBendLength', '最大折弯长度', '根据已知板厚和 V 型模开口计算最大折弯长度。'],
      ['minimumVOpening', '最小 V 型模开口', '根据已知板厚和折弯长度计算最小 V 型模开口。'],
    ],
    inputParameters: '输入参数',
    ratedMachineTonnage: '折弯机额定吨位',
    material: '材料',
    sheetThickness: '板厚',
    bendLength: '折弯长度',
    vDieOpening: 'V 型模开口',
    below30Notice: '对于低于 30T 的设备，85% 连续负载比例是保守默认值。请向设备制造商确认允许的连续负载。',
    calculationResults: '计算结果',
    theoreticalLabels: {
      maximumThickness: '理论最大板厚',
      maximumBendLength: '理论最大折弯长度',
      minimumVOpening: '理论最小 V 型模开口',
    },
    continuousLabels: {
      maximumThickness: '建议连续生产最大板厚',
      maximumBendLength: '建议连续生产折弯长度',
      minimumVOpening: '建议连续生产最小 V 型模开口',
    },
    continuousLoadRatio: '连续负载比例',
    recommendedContinuousTonnage: '建议连续生产吨位',
    formulaReference: '公式说明',
    formulaVariables: 'P 为折弯力（吨），T 为板厚（mm），L 为折弯长度（mm），M 为材料系数，V 为 V 型模开口（mm）。',
    minimumVExplanation: '最小 V 型模开口取吨位要求与板厚 6 倍两者中的较大值。',
    toolingCompatibilityTitle: '模具与零件适用性确认',
    toolingCompatibilityRequirementBefore: '连续生产要求的最小 V 型模开口为',
    toolingCompatibilityRequirementAfter: '。请确认现有下模是否包含等于或大于该数值的 V 型模开口。',
    toolingCompatibilityDetails: '选择实际模具前，还应核实该模具形成的内半径、最小翻边长度及模具额定载荷是否满足零件和设备要求。必要时请向机床或模具制造商确认。',
    safetyTitle: '工程限制与安全提醒',
    safetyItems: [
      '本计算器仅估算空弯能力。',
      '实际可用折弯长度可能受设备工作长度和模具长度限制。',
      '短而厚的工件会产生集中载荷，需要制造商确认设备载荷曲线。',
      '生产前请检查上模和下模的额定载荷。',
      '请核实行程、开口高度、喉口深度、内半径和最小翻边要求。',
      '计算结果仅供工程参考，不是生产保证。',
      '增大 V 型模开口可降低所需吨位，但会增大自然内半径和最小翻边要求。',
      '本计算器不允许 V 型模开口小于板厚的 6 倍。',
      '板厚 6 倍规则是保守下限；模具载荷、材料强度、内半径或翻边要求可能需要更大的 V 型模开口。',
    ],
    faqTitle: '折弯机能力计算器常见问题',
    faq: [
      ['折弯机能力计算器可以计算什么？', '它根据现有折弯机的额定吨位，反算空弯时的最大板厚、最大折弯长度或最小 V 型模开口。'],
      ['最大板厚如何计算？', '计算器对空弯力公式进行反算，结合设备吨位、折弯长度、材料系数和 V 型模开口求出板厚。'],
      ['理论能力与连续生产能力为什么不同？', '理论结果使用 100% 额定吨位；连续生产建议结果自动采用 85%、90% 或 92% 的负载比例，为重复生产保留更保守的余量。'],
      ['计算出的最大折弯长度会超过设备工作长度吗？', '可能会。公式只计算吨位能力，实际可用折弯长度仍可能受设备工作长度和模具长度限制。'],
      ['为什么 V 型模开口不能小于板厚的 6 倍？', '板厚 6 倍作为保守的最小开口；模具载荷、材料强度、半径或翻边要求可能需要更大的开口。'],
      ['该计算器能保证生产安全吗？', '不能。结果仅供工程参考。生产前必须确认设备载荷曲线、集中载荷、模具额定载荷和实际折弯设置。'],
    ],
    relatedTools: '相关工程工具',
    relatedToolsAria: '相关工程工具',
    workflowTitle: '继续进行工程计算',
    workflowCards: [
      ['计算所需折弯吨位', '已知材料、板厚、折弯长度和 V 型模开口？计算所需折弯吨位。', '打开折弯机计算器 →', '/engineering-tools/press-brake-calculator'],
      ['计算板材展开长度', '完成机器能力校核后，继续计算折弯余量、折弯扣除量和板材展开长度。', '打开折弯展开计算器 →', '/engineering-tools/bend-allowance-calculator'],
    ],
    seoTitle: '折弯机能力计算器 | ZYCO',
    seoDescription: '根据现有折弯机的额定吨位，计算空弯条件下的最大板厚、最大折弯长度或最小 V 型模开口。',
    seoKeywords: '折弯机能力计算器, 折弯机最大板厚计算, 最大折弯长度, 最小V型模开口, 折弯机吨位能力, 空弯能力计算器',
  },
  ru: {
    back: '← Назад в центр инженерных инструментов',
    eyebrow: 'Проверка возможностей имеющегося станка',
    title: 'Калькулятор возможностей листогибочного пресса',
    subtitle: 'Расчет максимальной толщины листа, максимальной длины гиба или минимального раскрытия V-матрицы по номинальному усилию имеющегося листогибочного пресса при воздушной гибке.',
    calculationModeAria: 'Режим расчета',
    modeSelectionTitle: 'Выберите режим расчета',
    selectModeLabel: 'Выбрать →',
    activeModeLabel: 'Текущий режим ✓',
    modes: [
      ['maximumThickness', 'Максимальная толщина', 'Расчет максимальной толщины листа при заданной длине гиба и раскрытии V-матрицы.'],
      ['maximumBendLength', 'Максимальная длина гиба', 'Расчет максимальной длины гиба при заданной толщине листа и раскрытии V-матрицы.'],
      ['minimumVOpening', 'Минимальное раскрытие V-матрицы', 'Расчет минимального раскрытия V-матрицы при заданных толщине листа и длине гиба.'],
    ],
    inputParameters: 'Входные параметры',
    ratedMachineTonnage: 'Номинальное усилие пресса',
    material: 'Материал',
    sheetThickness: 'Толщина листа',
    bendLength: 'Длина гиба',
    vDieOpening: 'Раскрытие V-матрицы',
    below30Notice: 'Для прессов усилием менее 30 т коэффициент непрерывной нагрузки 85% принят как консервативное значение. Уточните допустимую непрерывную нагрузку у изготовителя.',
    calculationResults: 'Результаты расчета',
    theoreticalLabels: { maximumThickness: 'Теоретическая максимальная толщина', maximumBendLength: 'Теоретическая максимальная длина гиба', minimumVOpening: 'Теоретическое минимальное раскрытие V-матрицы' },
    continuousLabels: { maximumThickness: 'Рекомендуемая толщина для непрерывной работы', maximumBendLength: 'Рекомендуемая длина гиба для непрерывной работы', minimumVOpening: 'Рекомендуемое минимальное раскрытие V-матрицы для непрерывной работы' },
    continuousLoadRatio: 'Коэффициент непрерывной нагрузки',
    recommendedContinuousTonnage: 'Рекомендуемое усилие для непрерывной работы',
    formulaReference: 'Расчетные формулы',
    formulaVariables: 'P — усилие гибки в тоннах, T — толщина листа в мм, L — длина гиба в мм, M — коэффициент материала, V — раскрытие V-матрицы в мм.',
    minimumVExplanation: 'Минимальное раскрытие V-матрицы равно большему из двух значений: требованию по усилию или шестикратной толщине листа.',
    toolingCompatibilityTitle: 'Проверка совместимости оснастки и детали',
    toolingCompatibilityRequirementBefore: 'Минимальное раскрытие V-матрицы для непрерывной работы составляет',
    toolingCompatibilityRequirementAfter: '. Убедитесь, что имеющаяся нижняя матрица имеет раскрытие, равное или больше этого значения.',
    toolingCompatibilityDetails: 'Перед выбором фактической матрицы убедитесь, что получаемый внутренний радиус, минимальная длина полки и допустимая нагрузка оснастки соответствуют требованиям детали и пресса. При необходимости проконсультируйтесь с изготовителем пресса или оснастки.',
    safetyTitle: 'Инженерные ограничения и безопасность',
    safetyItems: [
      'Калькулятор оценивает возможности только для воздушной гибки.',
      'Фактическая длина гиба может ограничиваться рабочей длиной пресса и длиной оснастки.',
      'Короткие толстые заготовки создают сосредоточенную нагрузку, требующую проверки диаграммы нагрузок изготовителя.',
      'Перед производством проверьте допустимую нагрузку пуансона и матрицы.',
      'Проверьте ход, открытие, глубину зева, внутренний радиус и минимальную полку.',
      'Результаты являются инженерным ориентиром, а не гарантией производства.',
      'Большее раскрытие V-матрицы снижает усилие, но увеличивает естественный внутренний радиус и минимальную полку.',
      'В этом калькуляторе раскрытие V-матрицы не может быть меньше шестикратной толщины листа.',
      'Правило 6× является консервативным минимумом; нагрузка оснастки, прочность материала, радиус или полка могут потребовать большего раскрытия.',
    ],
    faqTitle: 'Вопросы о калькуляторе возможностей пресса',
    faq: [
      ['Что рассчитывает калькулятор возможностей листогибочного пресса?', 'Он определяет максимальную толщину, максимальную длину гиба или минимальное раскрытие V-матрицы по номинальному усилию имеющегося пресса для воздушной гибки.'],
      ['Как рассчитывается максимальная толщина листа?', 'Формула усилия воздушной гибки преобразуется для определения толщины с учетом усилия пресса, длины гиба, материала и раскрытия V-матрицы.'],
      ['Почему теоретические и непрерывные возможности различаются?', 'Теоретический результат использует 100% номинального усилия, а для непрерывной работы применяется коэффициент 85%, 90% или 92%.'],
      ['Может ли расчетная длина гиба превышать рабочую длину пресса?', 'Да. Формула учитывает только усилие; фактическая длина ограничивается рабочей длиной пресса и оснастки.'],
      ['Почему раскрытие V-матрицы не может быть меньше 6 толщин листа?', 'Шестикратная толщина принята как консервативный минимум; нагрузка оснастки, материал, радиус или полка могут требовать большего раскрытия.'],
      ['Гарантирует ли калькулятор безопасность производства?', 'Нет. Это инженерный ориентир. Необходимо проверить диаграмму нагрузок, сосредоточенную нагрузку, оснастку и реальную установку.'],
    ],
    relatedTools: 'Связанные инженерные инструменты',
    relatedToolsAria: 'Связанные инженерные инструменты',
    workflowTitle: 'Продолжить инженерный расчет',
    workflowCards: [
      ['Рассчитать требуемое усилие', 'Известны материал, толщина, длина гиба и раскрытие V-матрицы? Рассчитайте требуемое усилие листогибочного пресса.', 'Открыть калькулятор усилия →', '/engineering-tools/press-brake-calculator'],
      ['Рассчитать длину развертки', 'После проверки возможностей станка рассчитайте припуск на гиб, вычет гиба и длину развертки.', 'Открыть калькулятор припуска →', '/engineering-tools/bend-allowance-calculator'],
    ],
    seoTitle: 'Калькулятор возможностей листогибочного пресса | ZYCO',
    seoDescription: 'Рассчитайте максимальную толщину листа, длину гиба или минимальное раскрытие V-матрицы по усилию листогибочного пресса для воздушной гибки.',
    seoKeywords: 'калькулятор возможностей листогибочного пресса, максимальная толщина листа, максимальная длина гиба, минимальное раскрытие V-матрицы, усилие листогибочного пресса, воздушная гибка',
  },
  es: {
    back: '← Volver al centro de herramientas de ingeniería',
    eyebrow: 'Comprobación de capacidad de la máquina existente',
    title: 'Calculadora de capacidad de plegadora',
    subtitle: 'Calcule el espesor máximo de chapa, la longitud máxima de plegado o la abertura mínima de matriz V a partir del tonelaje nominal de una plegadora existente para plegado al aire.',
    calculationModeAria: 'Modo de cálculo',
    modeSelectionTitle: 'Seleccione un modo de cálculo',
    selectModeLabel: 'Seleccionar →',
    activeModeLabel: 'Modo actual ✓',
    modes: [
      ['maximumThickness', 'Espesor máximo', 'Calcule el espesor máximo para una longitud de plegado y abertura de matriz V conocidas.'],
      ['maximumBendLength', 'Longitud máxima de plegado', 'Calcule la longitud máxima para un espesor y una abertura de matriz V conocidos.'],
      ['minimumVOpening', 'Abertura mínima de matriz V', 'Calcule la abertura mínima de matriz V para un espesor y una longitud de plegado conocidos.'],
    ],
    inputParameters: 'Parámetros de entrada',
    ratedMachineTonnage: 'Tonelaje nominal de la plegadora',
    material: 'Material',
    sheetThickness: 'Espesor de chapa',
    bendLength: 'Longitud de plegado',
    vDieOpening: 'Abertura de matriz V',
    below30Notice: 'Para máquinas de menos de 30 T, la relación de carga continua del 85% es un valor conservador. Confirme la carga continua permitida con el fabricante.',
    calculationResults: 'Resultados del cálculo',
    theoreticalLabels: { maximumThickness: 'Espesor máximo teórico', maximumBendLength: 'Longitud máxima de plegado teórica', minimumVOpening: 'Abertura mínima teórica de matriz V' },
    continuousLabels: { maximumThickness: 'Espesor máximo recomendado para producción continua', maximumBendLength: 'Longitud recomendada para producción continua', minimumVOpening: 'Abertura mínima recomendada para producción continua' },
    continuousLoadRatio: 'Relación de carga continua',
    recommendedContinuousTonnage: 'Tonelaje recomendado para producción continua',
    formulaReference: 'Referencia de fórmulas',
    formulaVariables: 'P es la fuerza de plegado en toneladas, T es el espesor en mm, L es la longitud de plegado en mm, M es el factor del material y V es la abertura de matriz V en mm.',
    minimumVExplanation: 'La abertura mínima de matriz V es el mayor valor entre el requisito por tonelaje y 6 veces el espesor de la chapa.',
    toolingCompatibilityTitle: 'Comprobación de compatibilidad del utillaje y la pieza',
    toolingCompatibilityRequirementBefore: 'La abertura mínima de matriz V necesaria para la producción continua es',
    toolingCompatibilityRequirementAfter: '. Confirme que la matriz inferior disponible tenga una abertura igual o superior a este valor.',
    toolingCompatibilityDetails: 'Antes de seleccionar la matriz definitiva, verifique que el radio interior resultante, la longitud mínima de pestaña y la capacidad de carga del utillaje cumplan los requisitos de la pieza y de la plegadora. Consulte al fabricante de la máquina o del utillaje cuando sea necesario.',
    safetyTitle: 'Límites de ingeniería y recordatorios de seguridad',
    safetyItems: [
      'Esta calculadora solo estima la capacidad para plegado al aire.',
      'La longitud útil real puede estar limitada por la longitud de trabajo de la máquina y del utillaje.',
      'Las piezas cortas y gruesas pueden generar cargas concentradas que requieren confirmar la curva de carga del fabricante.',
      'Compruebe las cargas admisibles del punzón y la matriz antes de producir.',
      'Verifique carrera, apertura, profundidad de cuello, radio interior y pestaña mínima.',
      'Los resultados son referencias de ingeniería, no garantías de producción.',
      'Una abertura V mayor reduce el tonelaje requerido, pero aumenta el radio interior natural y la pestaña mínima.',
      'Esta calculadora nunca permite una abertura de matriz V menor que 6 veces el espesor.',
      'La regla de 6× es un mínimo conservador; la carga del utillaje, la resistencia, el radio o la pestaña pueden exigir una abertura mayor.',
    ],
    faqTitle: 'Preguntas sobre la calculadora de capacidad',
    faq: [
      ['¿Qué calcula una calculadora de capacidad de plegadora?', 'A partir del tonelaje nominal estima el espesor máximo, la longitud máxima o la abertura mínima de matriz V para plegado al aire.'],
      ['¿Cómo se calcula el espesor máximo?', 'Se despeja el espesor en la fórmula de fuerza de plegado al aire usando tonelaje, longitud, factor del material y abertura de matriz V.'],
      ['¿Por qué difieren la capacidad teórica y la continua?', 'La teórica usa el 100% del tonelaje nominal; la recomendación continua aplica automáticamente una relación del 85%, 90% o 92%.'],
      ['¿Puede la longitud calculada superar la longitud de trabajo?', 'Sí. La fórmula solo calcula capacidad por tonelaje; la longitud útil real depende de la máquina y del utillaje.'],
      ['¿Por qué la abertura V no puede ser menor que 6 veces el espesor?', 'Se utiliza como mínimo conservador; la carga del utillaje, el material, el radio o la pestaña pueden requerir una abertura mayor.'],
      ['¿Garantiza esta calculadora una producción segura?', 'No. Es una referencia de ingeniería. Confirme curvas de carga, cargas concentradas, límites del utillaje y la configuración real.'],
    ],
    relatedTools: 'Herramientas de ingeniería relacionadas',
    relatedToolsAria: 'Herramientas de ingeniería relacionadas',
    workflowTitle: 'Continúe su cálculo de ingeniería',
    workflowCards: [
      ['Calcular el tonelaje requerido', '¿Conoce el material, el espesor, la longitud de plegado y la abertura de matriz V? Calcule el tonelaje necesario.', 'Abrir la calculadora de plegadora →', '/engineering-tools/press-brake-calculator'],
      ['Calcular la longitud desarrollada', 'Después de comprobar la capacidad, calcule el bend allowance, la deducción de plegado y la longitud desarrollada.', 'Abrir la calculadora de bend allowance →', '/engineering-tools/bend-allowance-calculator'],
    ],
    seoTitle: 'Calculadora de capacidad de plegadora | ZYCO',
    seoDescription: 'Calcule el espesor máximo, la longitud máxima de plegado o la abertura mínima de matriz V según el tonelaje de una plegadora para plegado al aire.',
    seoKeywords: 'calculadora de capacidad de plegadora, espesor máximo de chapa, longitud máxima de plegado, abertura mínima de matriz V, capacidad de tonelaje de plegadora, calculadora de plegado al aire',
  },
  tr: {
    back: '← Mühendislik araçları merkezine dön',
    eyebrow: 'Mevcut makine kapasite kontrolü',
    title: 'Abkant pres kapasite hesaplayıcısı',
    subtitle: 'Mevcut bir abkant presin nominal tonajından havada büküm için maksimum sac kalınlığını, maksimum büküm uzunluğunu veya minimum V kalıp açıklığını hesaplayın.',
    calculationModeAria: 'Hesaplama modu',
    modeSelectionTitle: 'Bir hesaplama modu seçin',
    selectModeLabel: 'Modu seç →',
    activeModeLabel: 'Geçerli mod ✓',
    modes: [
      ['maximumThickness', 'Maksimum kalınlık', 'Bilinen büküm uzunluğu ve V kalıp açıklığı için maksimum sac kalınlığını bulun.'],
      ['maximumBendLength', 'Maksimum büküm uzunluğu', 'Bilinen sac kalınlığı ve V kalıp açıklığı için maksimum büküm uzunluğunu bulun.'],
      ['minimumVOpening', 'Minimum V kalıp açıklığı', 'Bilinen sac kalınlığı ve büküm uzunluğu için minimum V kalıp açıklığını bulun.'],
    ],
    inputParameters: 'Giriş parametreleri',
    ratedMachineTonnage: 'Abkant pres nominal tonajı',
    material: 'Malzeme',
    sheetThickness: 'Sac kalınlığı',
    bendLength: 'Büküm uzunluğu',
    vDieOpening: 'V kalıp açıklığı',
    below30Notice: '30 T altındaki makinelerde %85 sürekli yük oranı ihtiyatlı bir varsayımdır. İzin verilen sürekli yükü üreticiyle doğrulayın.',
    calculationResults: 'Hesaplama sonuçları',
    theoreticalLabels: { maximumThickness: 'Teorik maksimum kalınlık', maximumBendLength: 'Teorik maksimum büküm uzunluğu', minimumVOpening: 'Teorik minimum V kalıp açıklığı' },
    continuousLabels: { maximumThickness: 'Önerilen sürekli üretim maksimum kalınlığı', maximumBendLength: 'Önerilen sürekli üretim büküm uzunluğu', minimumVOpening: 'Önerilen sürekli üretim minimum V kalıp açıklığı' },
    continuousLoadRatio: 'Sürekli yük oranı',
    recommendedContinuousTonnage: 'Önerilen sürekli üretim tonajı',
    formulaReference: 'Formül referansı',
    formulaVariables: 'P ton cinsinden büküm kuvveti, T mm cinsinden sac kalınlığı, L mm cinsinden büküm uzunluğu, M malzeme katsayısı ve V mm cinsinden V kalıp açıklığıdır.',
    minimumVExplanation: 'Minimum V kalıp açıklığı, tonaj gereksinimi ile sac kalınlığının 6 katından büyük olanıdır.',
    toolingCompatibilityTitle: 'Takım ve parça uyumluluk kontrolü',
    toolingCompatibilityRequirementBefore: 'Sürekli üretim için gereken minimum V kalıp açıklığı',
    toolingCompatibilityRequirementAfter: ' değeridir. Mevcut alt kalıbın bu değere eşit veya daha büyük bir açıklığa sahip olduğunu doğrulayın.',
    toolingCompatibilityDetails: 'Gerçek kalıbı seçmeden önce oluşacak iç yarıçapın, minimum flanş uzunluğunun ve takım yük kapasitesinin parça ve makine gereksinimlerini karşıladığını doğrulayın. Gerektiğinde makine veya takım üreticisine danışın.',
    safetyTitle: 'Mühendislik sınırları ve güvenlik hatırlatmaları',
    safetyItems: [
      'Bu hesaplayıcı yalnızca havada büküm kapasitesini tahmin eder.',
      'Gerçek kullanılabilir büküm uzunluğu makine çalışma ve takım uzunluğuyla sınırlanabilir.',
      'Kısa ve kalın parçalar, üretici yük eğrisi doğrulaması gerektiren noktasal yükler oluşturabilir.',
      'Üretimden önce zımba ve kalıp yük kapasitelerini kontrol edin.',
      'Strok, açıklık, boğaz derinliği, iç yarıçap ve minimum flanş gereksinimlerini doğrulayın.',
      'Sonuçlar mühendislik referansıdır, üretim garantisi değildir.',
      'Daha büyük V açıklıkları tonajı azaltır, ancak doğal iç yarıçapı ve minimum flanşı artırır.',
      'Bu hesaplayıcıda V kalıp açıklığı sac kalınlığının 6 katından küçük olamaz.',
      '6× kalınlık kuralı ihtiyatlı bir minimumdur; takım yükü, malzeme dayanımı, yarıçap veya flanş daha büyük açıklık gerektirebilir.',
    ],
    faqTitle: 'Abkant pres kapasite hesaplayıcısı SSS',
    faq: [
      ['Abkant pres kapasite hesaplayıcısı neyi hesaplar?', 'Mevcut presin nominal tonajından havada büküm için maksimum kalınlık, büküm uzunluğu veya minimum V kalıp açıklığını hesaplar.'],
      ['Maksimum sac kalınlığı nasıl hesaplanır?', 'Havada büküm kuvveti formülü tonaj, uzunluk, malzeme katsayısı ve V açıklığıyla kalınlık için yeniden düzenlenir.'],
      ['Teorik ve sürekli üretim kapasiteleri neden farklıdır?', 'Teorik sonuç nominal tonajın %100’ünü, sürekli üretim sonucu ise otomatik %85, %90 veya %92 yük oranını kullanır.'],
      ['Hesaplanan büküm uzunluğu makine çalışma uzunluğunu aşabilir mi?', 'Evet. Formül yalnızca tonaj kapasitesini hesaplar; gerçek uzunluk makine ve takım uzunluğuyla sınırlıdır.'],
      ['V kalıp açıklığı neden kalınlığın 6 katından küçük olamaz?', 'Bu değer ihtiyatlı minimumdur; takım yükü, malzeme, yarıçap veya flanş daha büyük açıklık gerektirebilir.'],
      ['Bu hesaplayıcı güvenli üretimi garanti eder mi?', 'Hayır. Sonuçlar mühendislik referansıdır. Yük eğrilerini, noktasal yükü, takım kapasitesini ve gerçek kurulumu doğrulayın.'],
    ],
    relatedTools: 'İlgili mühendislik araçları',
    relatedToolsAria: 'İlgili mühendislik araçları',
    workflowTitle: 'Mühendislik hesabınıza devam edin',
    workflowCards: [
      ['Gerekli tonajı hesaplayın', 'Malzeme, kalınlık, büküm uzunluğu ve V kalıp açıklığı biliniyor mu? Gerekli abkant pres tonajını hesaplayın.', 'Abkant pres hesaplayıcısını aç →', '/engineering-tools/press-brake-calculator'],
      ['Açınım uzunluğunu hesaplayın', 'Makine kapasitesini kontrol ettikten sonra büküm payı, büküm düşümü ve açınım uzunluğunu hesaplayın.', 'Büküm payı hesaplayıcısını aç →', '/engineering-tools/bend-allowance-calculator'],
    ],
    seoTitle: 'Abkant pres kapasite hesaplayıcısı | ZYCO',
    seoDescription: 'Abkant pres nominal tonajına göre havada büküm için maksimum sac kalınlığını, büküm uzunluğunu veya minimum V kalıp açıklığını hesaplayın.',
    seoKeywords: 'abkant pres kapasite hesaplayıcısı, maksimum sac kalınlığı, maksimum büküm uzunluğu, minimum V kalıp açıklığı, abkant pres tonaj kapasitesi, havada büküm hesaplayıcısı',
  },
  id: {
    back: '← Kembali ke pusat alat teknik',
    eyebrow: 'Pemeriksaan kapasitas mesin yang ada',
    title: 'Kalkulator kapasitas press brake',
    subtitle: 'Hitung ketebalan pelat maksimum, panjang tekuk maksimum, atau bukaan V-die minimum dari tonase terukur press brake yang sudah ada untuk air bending.',
    calculationModeAria: 'Mode perhitungan',
    modeSelectionTitle: 'Pilih mode perhitungan',
    selectModeLabel: 'Pilih mode →',
    activeModeLabel: 'Mode aktif ✓',
    modes: [
      ['maximumThickness', 'Ketebalan maksimum', 'Hitung ketebalan pelat maksimum untuk panjang tekuk dan bukaan V-die yang diketahui.'],
      ['maximumBendLength', 'Panjang tekuk maksimum', 'Hitung panjang tekuk maksimum untuk ketebalan pelat dan bukaan V-die yang diketahui.'],
      ['minimumVOpening', 'Bukaan V-die minimum', 'Hitung bukaan V-die minimum untuk ketebalan pelat dan panjang tekuk yang diketahui.'],
    ],
    inputParameters: 'Parameter input',
    ratedMachineTonnage: 'Tonase terukur press brake',
    material: 'Material',
    sheetThickness: 'Ketebalan pelat',
    bendLength: 'Panjang tekuk',
    vDieOpening: 'Bukaan V-die',
    below30Notice: 'Untuk mesin di bawah 30 T, rasio beban kontinu 85% adalah nilai konservatif. Konfirmasikan beban kontinu yang diizinkan kepada produsen.',
    calculationResults: 'Hasil perhitungan',
    theoreticalLabels: { maximumThickness: 'Ketebalan maksimum teoretis', maximumBendLength: 'Panjang tekuk maksimum teoretis', minimumVOpening: 'Bukaan V-die minimum teoretis' },
    continuousLabels: { maximumThickness: 'Ketebalan maksimum produksi kontinu yang disarankan', maximumBendLength: 'Panjang tekuk produksi kontinu yang disarankan', minimumVOpening: 'Bukaan V-die minimum produksi kontinu yang disarankan' },
    continuousLoadRatio: 'Rasio beban kontinu',
    recommendedContinuousTonnage: 'Tonase produksi kontinu yang disarankan',
    formulaReference: 'Referensi rumus',
    formulaVariables: 'P adalah gaya tekuk dalam ton, T adalah ketebalan pelat dalam mm, L adalah panjang tekuk dalam mm, M adalah faktor material, dan V adalah bukaan V-die dalam mm.',
    minimumVExplanation: 'Bukaan V-die minimum adalah nilai yang lebih besar antara kebutuhan berdasarkan tonase dan 6 kali ketebalan pelat.',
    toolingCompatibilityTitle: 'Pemeriksaan kompatibilitas tooling dan benda kerja',
    toolingCompatibilityRequirementBefore: 'Bukaan V-die minimum yang diperlukan untuk produksi kontinu adalah',
    toolingCompatibilityRequirementAfter: '. Pastikan lower die yang tersedia memiliki bukaan yang sama dengan atau lebih besar dari nilai ini.',
    toolingCompatibilityDetails: 'Sebelum memilih die yang akan digunakan, pastikan radius dalam yang dihasilkan, panjang flange minimum, dan rating beban tooling memenuhi kebutuhan benda kerja dan mesin. Konsultasikan dengan produsen mesin atau tooling bila diperlukan.',
    safetyTitle: 'Batas teknik dan pengingat keselamatan',
    safetyItems: [
      'Kalkulator ini hanya memperkirakan kapasitas air bending.',
      'Panjang tekuk aktual dapat dibatasi oleh panjang kerja mesin dan panjang tooling.',
      'Benda kerja pendek dan tebal dapat menghasilkan beban terpusat yang memerlukan konfirmasi kurva beban produsen.',
      'Periksa rating beban punch dan die sebelum produksi.',
      'Verifikasi stroke, daylight, throat depth, radius dalam, dan kebutuhan flange minimum.',
      'Hasil adalah referensi teknik, bukan jaminan produksi.',
      'Bukaan V yang lebih besar mengurangi tonase, tetapi meningkatkan radius dalam alami dan kebutuhan flange minimum.',
      'Bukaan V-die tidak boleh lebih kecil dari 6 kali ketebalan pelat dalam kalkulator ini.',
      'Aturan ketebalan 6× adalah batas minimum konservatif; beban tooling, kekuatan material, radius, atau flange dapat memerlukan bukaan lebih besar.',
    ],
    faqTitle: 'FAQ kalkulator kapasitas press brake',
    faq: [
      ['Apa yang dihitung kalkulator kapasitas press brake?', 'Kalkulator menghitung balik ketebalan maksimum, panjang tekuk maksimum, atau bukaan V-die minimum dari tonase terukur untuk air bending.'],
      ['Bagaimana ketebalan pelat maksimum dihitung?', 'Rumus gaya air bending disusun ulang untuk ketebalan dengan tonase, panjang tekuk, faktor material, dan bukaan V-die.'],
      ['Mengapa kapasitas teoretis dan kontinu berbeda?', 'Hasil teoretis memakai 100% tonase terukur, sedangkan hasil kontinu menerapkan rasio beban otomatis 85%, 90%, atau 92%.'],
      ['Dapatkah panjang tekuk hasil perhitungan melebihi panjang kerja mesin?', 'Ya. Rumus hanya menghitung kapasitas tonase; panjang aktual tetap dibatasi mesin dan tooling.'],
      ['Mengapa bukaan V-die tidak boleh kurang dari 6 kali ketebalan?', 'Nilai itu adalah minimum konservatif; beban tooling, material, radius, atau flange mungkin memerlukan bukaan lebih besar.'],
      ['Apakah kalkulator menjamin produksi yang aman?', 'Tidak. Hasil adalah referensi teknik. Konfirmasikan kurva beban, beban terpusat, rating tooling, dan setup aktual.'],
    ],
    relatedTools: 'Alat teknik terkait',
    relatedToolsAria: 'Alat teknik terkait',
    workflowTitle: 'Lanjutkan perhitungan teknik',
    workflowCards: [
      ['Hitung tonase yang diperlukan', 'Sudah mengetahui material, ketebalan, panjang tekuk, dan bukaan V-die? Hitung tonase press brake yang diperlukan.', 'Buka kalkulator press brake →', '/engineering-tools/press-brake-calculator'],
      ['Hitung panjang flat pattern', 'Setelah memeriksa kapasitas mesin, hitung bend allowance, bend deduction, dan panjang flat pattern.', 'Buka kalkulator bend allowance →', '/engineering-tools/bend-allowance-calculator'],
    ],
    seoTitle: 'Kalkulator kapasitas press brake | ZYCO',
    seoDescription: 'Hitung ketebalan pelat maksimum, panjang tekuk maksimum, atau bukaan V-die minimum dari tonase press brake untuk air bending.',
    seoKeywords: 'kalkulator kapasitas press brake, ketebalan pelat maksimum, panjang tekuk maksimum, bukaan V-die minimum, kapasitas tonase press brake, kalkulator air bending',
  },
}

const getLoadRatio = (ratedTonnage) => {
  if (ratedTonnage < 63) return 0.85
  if (ratedTonnage < 300) return 0.9
  return 0.92
}

const isPositiveFinite = (value) =>
  Number.isFinite(value) && value > 0

const floorToTwoDecimals = (value) =>
  Math.floor((value + Number.EPSILON) * 100) / 100

const safeCeilMillimeters = (value) =>
  Math.ceil(value - 1e-9)

const formatTwoDecimals = (value) =>
  isPositiveFinite(value) ? value.toFixed(2) : '--'

const formatWholeMillimeters = (value) =>
  isPositiveFinite(value) ? `${value.toFixed(0)} mm` : '--'

export default function PressBrakeCapacityCalculator({
  language = 'en',
  setLanguage = () => {},
}) {
  const page = capacityContent[language] || capacityContent.en
  const sharedText = getEngineeringText(language)
  const modes = page.modes.map(([key, title, description]) => ({
    key,
    title,
    description,
  }))
  const [mode, setMode] = useState('maximumThickness')
  const [ratedTonnage, setRatedTonnage] = useState('')
  const [material, setMaterial] = useState('mildSteel')
  const [sheetThickness, setSheetThickness] = useState('')
  const [bendLength, setBendLength] = useState('')
  const [vOpening, setVOpening] = useState('')

  useEffect(() => {
    setPageSEO({
      title: page.seoTitle,
      description: page.seoDescription,
      keywords: page.seoKeywords,
      canonicalPath: routePath,
    })

    setStructuredData({
      id: 'press-brake-capacity-calculator-jsonld',
      data: {
        '@context': 'https://schema.org',
        '@graph': [
          createWebApplicationStructuredData({
            name: page.title,
            description: page.seoDescription,
            path: routePath,
          }),
          createFAQPageStructuredData(page.faq),
        ],
      },
    })
  }, [page])

  const result = useMemo(() => {
    const rated = Number(ratedTonnage)
    const thickness = Number(sheetThickness)
    const length = Number(bendLength)
    const opening = Number(vOpening)
    const materialFactor = materialFactors[material]

    if (!isPositiveFinite(rated) || !isPositiveFinite(materialFactor)) {
      return null
    }

    const loadRatio = getLoadRatio(rated)
    const continuousTonnage = rated * loadRatio
    const base = {
      rated,
      loadRatio,
      continuousTonnage,
    }

    if (mode === 'maximumThickness') {
      if (!isPositiveFinite(length) || !isPositiveFinite(opening)) {
        return null
      }

      const theoreticalRaw = Math.sqrt(
        (rated * opening * 20) /
          (calibrationFactor * length * materialFactor)
      )
      const continuousRaw = Math.sqrt(
        (continuousTonnage * opening * 20) /
          (calibrationFactor * length * materialFactor)
      )

      return {
        ...base,
        theoretical: floorToTwoDecimals(theoreticalRaw),
        continuous: floorToTwoDecimals(continuousRaw),
      }
    }

    if (mode === 'maximumBendLength') {
      if (!isPositiveFinite(thickness) || !isPositiveFinite(opening)) {
        return null
      }

      const denominator =
        calibrationFactor *
        thickness *
        thickness *
        materialFactor

      return {
        ...base,
        theoretical: Math.floor(
          (rated * opening * 20) / denominator
        ),
        continuous: Math.floor(
          (continuousTonnage * opening * 20) / denominator
        ),
      }
    }

    if (!isPositiveFinite(thickness) || !isPositiveFinite(length)) {
      return null
    }

    const thicknessMinimum = thickness * 6
    const numerator =
      calibrationFactor *
      thickness *
      thickness *
      length *
      materialFactor
    const theoreticalRaw = Math.max(
      numerator / (rated * 20),
      thicknessMinimum
    )
    const continuousRaw = Math.max(
      numerator / (continuousTonnage * 20),
      thicknessMinimum
    )

    return {
      ...base,
      theoretical: safeCeilMillimeters(theoreticalRaw),
      continuous: safeCeilMillimeters(continuousRaw),
    }
  }, [
    bendLength,
    material,
    mode,
    ratedTonnage,
    sheetThickness,
    vOpening,
  ])

  const isVOpeningMode = mode === 'minimumVOpening'
  const isThicknessMode = mode === 'maximumThickness'
  const theoreticalLabel = page.theoreticalLabels[mode]
  const continuousLabel = page.continuousLabels[mode]

  const formatCapacityResult = (value) => {
    if (!isPositiveFinite(value)) return '--'
    if (isVOpeningMode) return `≥ ${value.toFixed(0)} mm`
    if (isThicknessMode) return `${formatTwoDecimals(value)} mm`
    return formatWholeMillimeters(value)
  }

  const outputRows = [
    [
      continuousLabel,
      formatCapacityResult(result?.continuous),
      true,
    ],
    [
      theoreticalLabel,
      formatCapacityResult(result?.theoretical),
      false,
    ],
    [
      page.ratedMachineTonnage,
      result ? `${result.rated.toFixed(2)} T` : '--',
      false,
    ],
    [
      page.continuousLoadRatio,
      result ? `${(result.loadRatio * 100).toFixed(0)}%` : '--',
      false,
    ],
    [
      page.recommendedContinuousTonnage,
      result ? `${result.continuousTonnage.toFixed(2)} T` : '--',
      false,
    ],
  ]

  return (
    <>
      <style>
        {`
          .zyco-capacity {
            min-height: 100vh;
            box-sizing: border-box;
            padding: 48px 20px;
            background:
              radial-gradient(circle at 15% 10%, rgba(59, 130, 246, 0.28), transparent 32%),
              radial-gradient(circle at 85% 18%, rgba(14, 165, 233, 0.2), transparent 30%),
              linear-gradient(145deg, #071224, #0b1f3f 48%, #12366e);
            color: #ffffff;
            font-family: Inter, ui-sans-serif, system-ui, sans-serif;
          }

          .zyco-capacity__shell {
            width: min(1180px, 100%);
            margin: 0 auto;
          }

          .zyco-capacity__back {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            max-width: min(100%, 460px);
            min-height: 44px;
            box-sizing: border-box;
            margin: 0 0 22px;
            padding: 0 16px;
            border: 1px solid rgba(147, 197, 253, 0.46);
            border-radius: 999px;
            background:
              linear-gradient(145deg, rgba(15, 23, 42, 0.34), rgba(37, 99, 235, 0.12));
            color: #bfdbfe;
            font-size: 14px;
            line-height: 1.35;
            font-weight: 850;
            text-decoration: none;
            box-shadow:
              0 10px 28px rgba(15, 23, 42, 0.18),
              inset 0 1px 0 rgba(255, 255, 255, 0.12);
            backdrop-filter: blur(16px);
            transition: all 0.25s ease;
          }

          .zyco-capacity__back:hover {
            transform: translateY(-2px);
            border-color: rgba(125, 211, 252, 0.7);
            background: rgba(37, 99, 235, 0.42);
            color: #ffffff;
            box-shadow:
              0 14px 32px rgba(37, 99, 235, 0.32),
              0 0 0 1px rgba(125, 211, 252, 0.16);
          }

          .zyco-capacity__back:focus-visible {
            outline: 3px solid rgba(147, 197, 253, 0.46);
            outline-offset: 3px;
          }

          .zyco-capacity__header,
          .zyco-capacity__panel,
          .zyco-capacity-card {
            box-sizing: border-box;
            border: 1px solid rgba(147, 197, 253, 0.2);
            border-radius: 26px;
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.05));
            box-shadow: 0 22px 58px rgba(0, 0, 0, 0.25);
            backdrop-filter: blur(16px);
          }

          .zyco-capacity__header {
            padding: 32px;
            margin-bottom: 22px;
          }

          .zyco-capacity__eyebrow {
            margin: 16px 0 12px;
            color: #7dd3fc;
            font-size: 13px;
            font-weight: 900;
            letter-spacing: 2px;
            text-transform: uppercase;
          }

          .zyco-capacity__title {
            margin: 0;
            font-size: clamp(34px, 5vw, 52px);
            line-height: 1.08;
          }

          .zyco-capacity__subtitle {
            max-width: 820px;
            margin: 16px 0 0;
            color: #dbeafe;
            font-size: 17px;
            line-height: 1.7;
          }

          .zyco-capacity__modes {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
            margin-bottom: 22px;
          }

          .zyco-capacity__mode-heading {
            margin: 0 0 12px;
            color: #dbeafe;
            font-size: 18px;
            font-weight: 900;
          }

          .zyco-capacity-mode {
            min-height: 150px;
            padding: 20px;
            border: 1px solid rgba(147, 197, 253, 0.25);
            border-radius: 20px;
            background: rgba(15, 23, 42, 0.48);
            color: #ffffff;
            text-align: left;
            cursor: pointer;
            transition:
              transform 0.25s ease,
              border-color 0.25s ease,
              box-shadow 0.25s ease,
              background 0.25s ease;
            overflow-wrap: anywhere;
          }

          .zyco-capacity-mode:not(.zyco-capacity-mode--active):hover {
            transform: translateY(-4px);
            border-color: rgba(125, 211, 252, 0.72);
            box-shadow: 0 16px 34px rgba(2, 8, 23, 0.28);
          }

          .zyco-capacity-mode:focus-visible {
            outline: 3px solid rgba(125, 211, 252, 0.8);
            outline-offset: 3px;
          }

          .zyco-capacity-mode--active {
            border-color: #7dd3fc;
            background: linear-gradient(145deg, rgba(37, 99, 235, 0.82), rgba(14, 165, 233, 0.52));
            box-shadow: 0 16px 36px rgba(37, 99, 235, 0.28);
          }

          .zyco-capacity-mode__title {
            display: block;
            margin-bottom: 10px;
            font-size: 18px;
            font-weight: 900;
          }

          .zyco-capacity-mode__status {
            display: inline-flex;
            margin-bottom: 12px;
            padding: 5px 9px;
            border: 1px solid rgba(147, 197, 253, 0.32);
            border-radius: 999px;
            color: #dbeafe;
            font-size: 12px;
            font-weight: 900;
            line-height: 1.3;
          }

          .zyco-capacity-mode__description {
            display: block;
            color: #dbeafe;
            line-height: 1.55;
          }

          .zyco-capacity__grid {
            display: grid;
            grid-template-columns: minmax(300px, 0.9fr) minmax(0, 1.1fr);
            gap: 18px;
          }

          .zyco-capacity-card,
          .zyco-capacity__panel {
            padding: 24px;
          }

          .zyco-capacity-card__title,
          .zyco-capacity__panel-title {
            margin: 0 0 18px;
            font-size: 22px;
          }

          .zyco-capacity-form {
            display: grid;
            gap: 16px;
          }

          .zyco-capacity-field {
            display: grid;
            gap: 8px;
            color: #dbeafe;
            font-weight: 800;
          }

          .zyco-capacity-field__control {
            width: 100%;
            min-height: 50px;
            box-sizing: border-box;
            padding: 0 14px;
            border: 1px solid rgba(147, 197, 253, 0.34);
            border-radius: 14px;
            background: rgba(248, 250, 252, 0.96);
            color: #0f172a;
            font: inherit;
          }

          .zyco-capacity-results {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
            margin: 0;
          }

          .zyco-capacity-result {
            padding: 18px;
            border: 1px solid rgba(147, 197, 253, 0.2);
            border-radius: 18px;
            background: rgba(15, 23, 42, 0.48);
          }

          .zyco-capacity-result--primary {
            grid-column: 1 / -1;
            border-color: rgba(125, 211, 252, 0.72);
            background: linear-gradient(145deg, rgba(30, 64, 175, 0.9), rgba(14, 165, 233, 0.55));
          }

          .zyco-capacity-result__label {
            color: #bfdbfe;
            font-size: 13px;
            font-weight: 800;
            line-height: 1.4;
          }

          .zyco-capacity-result__value {
            margin: 10px 0 0;
            color: #ffffff;
            font-size: 25px;
            font-weight: 900;
          }

          .zyco-capacity-tooling-check {
            margin-top: 16px;
            padding: 17px;
            border: 1px solid rgba(250, 204, 21, 0.34);
            border-radius: 16px;
            background: rgba(30, 41, 59, 0.58);
            overflow-wrap: anywhere;
          }

          .zyco-capacity-tooling-check__title {
            margin: 0 0 10px;
            color: #fef3c7;
            font-size: 17px;
            line-height: 1.4;
          }

          .zyco-capacity-tooling-check__copy {
            margin: 0;
            color: #e2e8f0;
            line-height: 1.65;
          }

          .zyco-capacity-tooling-check__copy + .zyco-capacity-tooling-check__copy {
            margin-top: 9px;
          }

          .zyco-capacity-tooling-check__copy strong {
            color: #fde68a;
            font-size: 1.05em;
          }

          .zyco-capacity__panel {
            margin-top: 22px;
          }

          .zyco-capacity__copy,
          .zyco-capacity__list {
            color: #dbeafe;
            line-height: 1.75;
          }

          .zyco-capacity__formula {
            padding: 16px;
            border-radius: 16px;
            background: rgba(15, 23, 42, 0.5);
            color: #7dd3fc;
            font-weight: 900;
            overflow-wrap: anywhere;
          }

          .zyco-capacity__notice {
            margin-top: 14px;
            padding: 14px;
            border: 1px solid rgba(250, 204, 21, 0.4);
            border-radius: 14px;
            background: rgba(113, 63, 18, 0.3);
            color: #fef3c7;
            line-height: 1.6;
          }

          .zyco-capacity__faq {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }

          .zyco-capacity__faq-item {
            padding: 18px;
            border-radius: 16px;
            background: rgba(15, 23, 42, 0.42);
          }

          .zyco-capacity__faq-item h3 {
            margin: 0 0 10px;
            font-size: 17px;
          }

          .zyco-capacity__faq-item p {
            margin: 0;
            color: #dbeafe;
            line-height: 1.65;
          }

          .zyco-capacity-workflow {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .zyco-capacity-workflow__card {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 20px;
            border: 1px solid rgba(147, 197, 253, 0.22);
            border-radius: 18px;
            background: rgba(15, 23, 42, 0.44);
          }

          .zyco-capacity-workflow__title {
            margin: 0 0 10px;
            font-size: 19px;
          }

          .zyco-capacity-workflow__copy {
            flex: 1;
            margin: 0 0 18px;
            color: #dbeafe;
            line-height: 1.65;
          }

          .zyco-capacity-workflow__link {
            display: inline-flex;
            align-items: center;
            padding: 11px 15px;
            border: 1px solid rgba(147, 197, 253, 0.36);
            border-radius: 13px;
            background: rgba(37, 99, 235, 0.5);
            color: #ffffff;
            font-weight: 900;
            text-decoration: none;
            transition: all 0.25s ease;
          }

          .zyco-capacity-workflow__link:hover {
            transform: translateY(-3px);
            border-color: rgba(125, 211, 252, 0.8);
            background: rgba(37, 99, 235, 0.68);
            box-shadow: 0 14px 30px rgba(2, 8, 23, 0.26);
          }

          .zyco-capacity-workflow__link:focus-visible {
            outline: 3px solid rgba(125, 211, 252, 0.72);
            outline-offset: 3px;
          }

          .zyco-capacity__tools {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }

          .zyco-capacity__tool {
            display: inline-flex;
            align-items: center;
            padding: 12px 15px;
            border: 1px solid rgba(147, 197, 253, 0.34);
            border-radius: 13px;
            background: rgba(30, 64, 175, 0.36);
            color: #dbeafe;
            font-weight: 800;
            text-decoration: none;
            transition: all 0.25s ease;
          }

          .zyco-capacity__tool:hover {
            transform: translateY(-3px);
            border-color: rgba(125, 211, 252, 0.78);
            background: rgba(37, 99, 235, 0.52);
            box-shadow: 0 12px 28px rgba(2, 8, 23, 0.24);
          }

          .zyco-capacity__tool:focus-visible {
            outline: 3px solid rgba(125, 211, 252, 0.72);
            outline-offset: 3px;
          }

          @media (max-width: 980px) {
            .zyco-capacity__modes,
            .zyco-capacity__grid,
            .zyco-capacity__faq,
            .zyco-capacity-workflow {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 640px) {
            .zyco-capacity {
              padding: 28px 14px;
            }

            .zyco-capacity__header,
            .zyco-capacity-card,
            .zyco-capacity__panel {
              padding: 20px;
            }

            .zyco-capacity__back {
              width: 100%;
              margin-bottom: 16px;
              padding: 10px 14px;
              text-align: center;
            }

            .zyco-capacity-results {
              grid-template-columns: 1fr;
            }

            .zyco-capacity-result--primary {
              grid-column: auto;
            }
          }
        `}
      </style>

      <main className='zyco-capacity'>
        <div className='zyco-capacity__shell'>
          <header className='zyco-capacity__header'>
            <a
              aria-label={page.back}
              className='zyco-capacity__back'
              href='/engineering-tools'
            >
              {page.back}
            </a>

            <LanguageSwitcher
              className='zyco-page-language-switcher'
              language={language}
              setLanguage={setLanguage}
            />
            <p className='zyco-capacity__eyebrow'>
              {page.eyebrow}
            </p>
            <h1 className='zyco-capacity__title'>
              {page.title}
            </h1>
            <p className='zyco-capacity__subtitle'>
              {page.subtitle}
            </p>
          </header>

          <h2 className='zyco-capacity__mode-heading'>
            {page.modeSelectionTitle}
          </h2>

          <section
            className='zyco-capacity__modes'
            aria-label={page.calculationModeAria}
          >
            {modes.map((item) => (
              <button
                aria-pressed={mode === item.key}
                className={`zyco-capacity-mode${
                  mode === item.key
                    ? ' zyco-capacity-mode--active'
                    : ''
                }`}
                key={item.key}
                type='button'
                onClick={() => setMode(item.key)}
              >
                <span className='zyco-capacity-mode__status'>
                  {mode === item.key
                    ? page.activeModeLabel
                    : page.selectModeLabel}
                </span>
                <span className='zyco-capacity-mode__title'>
                  {item.title}
                </span>
                <span className='zyco-capacity-mode__description'>
                  {item.description}
                </span>
              </button>
            ))}
          </section>

          <div className='zyco-capacity__grid'>
            <article className='zyco-capacity-card'>
              <h2 className='zyco-capacity-card__title'>
                {page.inputParameters}
              </h2>
              <div className='zyco-capacity-form'>
                <label className='zyco-capacity-field'>
                  <span>{page.ratedMachineTonnage} (T)</span>
                  <input
                    className='zyco-capacity-field__control'
                    min='0'
                    step='any'
                    type='number'
                    value={ratedTonnage}
                    onChange={(event) =>
                      setRatedTonnage(event.target.value)
                    }
                  />
                </label>

                <label className='zyco-capacity-field'>
                  <span>{page.material}</span>
                  <select
                    className='zyco-capacity-field__control'
                    value={material}
                    onChange={(event) => setMaterial(event.target.value)}
                  >
                    {Object.keys(materialFactors).map((key) => (
                      <option key={key} value={key}>
                        {sharedText.materialNames[key] || key}
                      </option>
                    ))}
                  </select>
                </label>

                {!isThicknessMode && (
                  <label className='zyco-capacity-field'>
                    <span>{page.sheetThickness} (mm)</span>
                    <input
                      className='zyco-capacity-field__control'
                      min='0'
                      step='any'
                      type='number'
                      value={sheetThickness}
                      onChange={(event) =>
                        setSheetThickness(event.target.value)
                      }
                    />
                  </label>
                )}

                {mode !== 'maximumBendLength' && (
                  <label className='zyco-capacity-field'>
                    <span>{page.bendLength} (mm)</span>
                    <input
                      className='zyco-capacity-field__control'
                      min='0'
                      step='any'
                      type='number'
                      value={bendLength}
                      onChange={(event) =>
                        setBendLength(event.target.value)
                      }
                    />
                  </label>
                )}

                {!isVOpeningMode && (
                  <label className='zyco-capacity-field'>
                    <span>{page.vDieOpening} (mm)</span>
                    <input
                      className='zyco-capacity-field__control'
                      min='0'
                      step='any'
                      type='number'
                      value={vOpening}
                      onChange={(event) =>
                        setVOpening(event.target.value)
                      }
                    />
                  </label>
                )}
              </div>

              {Number(ratedTonnage) > 0 &&
                Number(ratedTonnage) < 30 && (
                  <p className='zyco-capacity__notice'>
                    {page.below30Notice}
                  </p>
                )}
            </article>

            <article className='zyco-capacity-card'>
              <h2 className='zyco-capacity-card__title'>
                {page.calculationResults}
              </h2>
              <dl className='zyco-capacity-results'>
                {outputRows.map(([label, value, isPrimary]) => (
                  <div
                    className={`zyco-capacity-result${
                      isPrimary
                        ? ' zyco-capacity-result--primary'
                        : ''
                    }`}
                    key={label}
                  >
                    <dt className='zyco-capacity-result__label'>
                      {label}
                    </dt>
                    <dd className='zyco-capacity-result__value'>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              {isVOpeningMode &&
                result &&
                isPositiveFinite(result.continuous) && (
                  <div
                    className='zyco-capacity-tooling-check'
                    role='note'
                  >
                    <h3 className='zyco-capacity-tooling-check__title'>
                      {page.toolingCompatibilityTitle}
                    </h3>
                    <p className='zyco-capacity-tooling-check__copy'>
                      {page.toolingCompatibilityRequirementBefore}{' '}
                      <strong>
                        ≥ {result.continuous.toFixed(0)} mm
                      </strong>
                      {page.toolingCompatibilityRequirementAfter}
                    </p>
                    <p className='zyco-capacity-tooling-check__copy'>
                      {page.toolingCompatibilityDetails}
                    </p>
                  </div>
                )}
            </article>
          </div>

          <section className='zyco-capacity__panel'>
            <h2 className='zyco-capacity__panel-title'>
              {page.workflowTitle}
            </h2>
            <div className='zyco-capacity-workflow'>
              {page.workflowCards.map(
                ([title, description, action, href]) => (
                  <article
                    className='zyco-capacity-workflow__card'
                    key={href}
                  >
                    <h3 className='zyco-capacity-workflow__title'>
                      {title}
                    </h3>
                    <p className='zyco-capacity-workflow__copy'>
                      {description}
                    </p>
                    <a
                      className='zyco-capacity-workflow__link'
                      href={href}
                    >
                      {action}
                    </a>
                  </article>
                )
              )}
            </div>
          </section>

          <section className='zyco-capacity__panel'>
            <h2 className='zyco-capacity__panel-title'>
              {page.formulaReference}
            </h2>
            <p className='zyco-capacity__formula'>
              P = (1.33 × T² × L × M) / V / 20
            </p>
            <p className='zyco-capacity__copy'>
              {page.formulaVariables}
            </p>
            {isVOpeningMode && (
              <>
                <p className='zyco-capacity__formula'>
                  V = max((1.33 × T² × L × M) / (P × 20), T × 6)
                </p>
                <p className='zyco-capacity__copy'>
                  {page.minimumVExplanation}
                </p>
              </>
            )}
          </section>

          <section className='zyco-capacity__panel'>
            <h2 className='zyco-capacity__panel-title'>
              {page.safetyTitle}
            </h2>
            <ul className='zyco-capacity__list'>
              {page.safetyItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className='zyco-capacity__panel'>
            <h2 className='zyco-capacity__panel-title'>
              {page.faqTitle}
            </h2>
            <div className='zyco-capacity__faq'>
              {page.faq.map(([question, answer]) => (
                <article
                  className='zyco-capacity__faq-item'
                  key={question}
                >
                  <h3>{question}</h3>
                  <p>{answer}</p>
                </article>
              ))}
            </div>
          </section>

          <EngineeringCTA language={language} />

          <section className='zyco-capacity__panel'>
            <h2 className='zyco-capacity__panel-title'>
              {page.relatedTools}
            </h2>
            <nav
              className='zyco-capacity__tools'
              aria-label={page.relatedToolsAria}
            >
              {engineeringTools.map((tool) => (
                <a
                  className='zyco-capacity__tool'
                  href={tool.href}
                  key={tool.key}
                >
                  {sharedText.relatedTools[tool.key]}
                </a>
              ))}
            </nav>
          </section>
        </div>
      </main>
    </>
  )
}
