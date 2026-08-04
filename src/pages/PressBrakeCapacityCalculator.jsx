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
      'The final minimum V opening is the greater of the tonnage-based requirement and the applicable thickness-based rule below.',
    theoreticalVRuleTitle: 'Theoretical engineering minimum V opening',
    theoreticalVRuleItems: ['T < 8 mm: V ≥ 6T', '8 mm ≤ T < 25 mm: V ≥ 8T', 'T ≥ 25 mm: V ≥ 10T'],
    continuousVRuleTitle: 'Recommended V opening for continuous production',
    continuousVRuleItems: ['T < 8 mm: V ≥ 8T', '8 mm ≤ T < 25 mm: V ≥ 10T', 'T ≥ 25 mm: V ≥ 12T'],
    vRuleScopeNote:
      'These ratios are primarily for general engineering checks of mild-steel air bending. High-strength steel, wear-resistant steel, special materials and thick plate must not be assessed from these ratios alone. Always confirm the requirements of the machine manufacturer, tooling manufacturer and material supplier.',
    maximumThicknessNoteTitle: 'Engineering capacity note',
    maximumThicknessNote:
      'Maximum thickness is limited by both machine tonnage capacity and the applicable range of the current V-die opening. The final result uses the lower of these two limits.',
    currentVOpeningLabel: 'Current V opening',
    theoreticalMinimumVLabel: 'Theoretical minimum V opening',
    continuousMinimumVLabel: 'Recommended minimum V opening for continuous production',
    belowTheoreticalTitle: 'V opening is below the theoretical minimum',
    belowTheoreticalText:
      'The current V opening is smaller than the theoretical minimum for this sheet thickness. Neither the recommended continuous nor theoretical maximum bend length is an executable result.',
    belowTheoreticalAction:
      'Use a V opening equal to or greater than the theoretical minimum and recalculate.',
    theoreticalOnlyTitle: 'V opening supports theoretical calculation only',
    theoreticalOnlyText:
      'The current V opening meets the theoretical minimum but is below the continuous-production recommendation. Only the theoretical maximum bend length is shown; the recommended continuous maximum bend length is unavailable.',
    theoreticalOnlyAction:
      'For a continuous-production result, use a V opening equal to or greater than the recommended continuous minimum.',
    continuousCompatibleTitle: 'Tooling and part suitability confirmation',
    continuousCompatibleText:
      'The current V opening reaches the recommended minimum for continuous production. Still confirm the actual lower-die opening, tooling load capacity, target inside radius, minimum flange length, part geometry and material requirements. The calculated lengths do not mean the tooling and part are automatically suitable.',
    toolingCompatibilityTitle: 'Tooling and Part Compatibility Check',
    toolingCompatibilityRequirementBefore:
      'The minimum V-die opening required for continuous production is',
    toolingCompatibilityRequirementAfter:
      '. Confirm that the available lower die includes an opening equal to or larger than this value.',
    toolingCompatibilityDetails:
      'Before selecting the actual die, verify the target inside radius, minimum flange length, part geometry, tooling load capacity, material requirements and applicable manufacturer requirements. Confirm with the machine or tooling manufacturer when necessary.',
    safetyTitle: 'Engineering Limits and Safety Reminders',
    safetyItems: [
      'This calculator estimates air-bending capacity only.',
      'Actual usable bend length may be limited by machine working length and tooling length.',
      'Short and thick workpieces can create concentrated loads that require manufacturer load-curve confirmation.',
      'Check punch and die load ratings before production.',
      'Verify stroke, daylight, throat depth, inside radius and minimum flange requirements.',
      'Results are engineering references, not production guarantees.',
      'Larger V openings reduce required tonnage but increase natural inside radius and minimum flange requirements.',
      'The calculator checks V-opening compatibility with theoretical 6T / 8T / 10T and continuous-production 8T / 10T / 12T thickness rules.',
      'These ratios are general engineering guidance for mild-steel air bending and must not be the sole basis for high-strength steel, wear-resistant steel, special materials or thick plate.',
    ],
    faqTitle: 'Press Brake Capacity Calculator FAQ',
    faq: [
      ['What does a press brake capacity calculator calculate?', 'It works backward from an existing press brake’s rated tonnage to estimate maximum sheet thickness, maximum bend length or minimum V-die opening for air bending.'],
      ['How is maximum sheet thickness calculated?', 'The calculator rearranges the air-bending force formula and solves for thickness using machine tonnage, bend length, material factor and V-die opening.'],
      ['Why are theoretical and continuous capacities different?', 'The theoretical result uses 100% of rated tonnage. The recommended continuous result applies an automatic 85%, 90% or 92% load ratio for more conservative repeated production.'],
      ['Can the calculated maximum bend length exceed the machine working length?', 'Yes. The formula calculates tonnage capacity only. Actual usable bend length can still be limited by machine working length and available tooling length.'],
      ['How does the calculator check V-die opening compatibility with sheet thickness?', 'Theoretical results use the 6T / 8T / 10T thickness ranges, while continuous-production results use 8T / 10T / 12T. Maximum Thickness checks both tonnage capacity and V-opening suitability; Maximum Bend Length hides non-executable results when the opening is insufficient; and Minimum V Opening uses the greater of the tonnage requirement and the applicable thickness rule. High-strength steel, wear-resistant steel, special materials and thick plate still require confirmation from the machine and tooling manufacturers and the material supplier.'],
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
    minimumVExplanation: '最终最小 V 型模开口取吨位公式要求与下列板厚分段规则要求中的较大值。',
    theoreticalVRuleTitle: '理论工程最低 V 型模开口',
    theoreticalVRuleItems: ['T < 8 mm：V ≥ 6T', '8 mm ≤ T < 25 mm：V ≥ 8T', 'T ≥ 25 mm：V ≥ 10T'],
    continuousVRuleTitle: '建议连续生产 V 型模开口',
    continuousVRuleItems: ['T < 8 mm：V ≥ 8T', '8 mm ≤ T < 25 mm：V ≥ 10T', 'T ≥ 25 mm：V ≥ 12T'],
    vRuleScopeNote: '这些比例主要用于普通低碳钢空气折弯的一般工程校核。高强钢、耐磨钢、特殊材料和厚板不得只依赖该比例，必须继续确认机器制造商、模具制造商和材料供应商要求。',
    maximumThicknessNoteTitle: '工程能力说明',
    maximumThicknessNote: '最大板厚同时受到机器吨位能力和当前 V 型模开口适用范围限制，最终结果采用两项限制中的较小值。',
    currentVOpeningLabel: '当前 V 型模开口',
    theoreticalMinimumVLabel: '理论最低 V 型模开口',
    continuousMinimumVLabel: '连续生产建议最低 V 型模开口',
    belowTheoreticalTitle: 'V 型模开口低于理论最低值',
    belowTheoreticalText: '当前 V 型模开口小于该板厚对应的理论最低 V 开口，建议连续生产最大折弯长度和理论最大折弯长度均不可作为可执行结果。',
    belowTheoreticalAction: '请使用等于或大于理论最低值的 V 型模开口后重新计算。',
    theoreticalOnlyTitle: 'V 型模开口仅满足理论计算要求',
    theoreticalOnlyText: '当前 V 型模开口满足理论最低要求，但低于连续生产建议值。因此只显示理论最大折弯长度，建议连续生产最大折弯长度不可用。',
    theoreticalOnlyAction: '如需连续生产结果，请使用等于或大于连续生产建议最低值的 V 型模开口。',
    continuousCompatibleTitle: '模具与零件适用性确认',
    continuousCompatibleText: '当前 V 型模开口已达到连续生产建议最低值。仍需确认实际下模开口、模具承载能力、目标内半径、最小翻边长度、零件几何形状和材料要求；计算结果不代表模具和零件自动适用。',
    toolingCompatibilityTitle: '模具与零件适用性确认',
    toolingCompatibilityRequirementBefore: '连续生产要求的最小 V 型模开口为',
    toolingCompatibilityRequirementAfter: '。请确认现有下模是否包含等于或大于该数值的 V 型模开口。',
    toolingCompatibilityDetails: '选择实际模具前，还应校核目标内半径、最小翻边长度、零件几何形状、模具承载能力、材料要求以及相关制造商要求。必要时请向机器或模具制造商确认。',
    safetyTitle: '工程限制与安全提醒',
    safetyItems: [
      '本计算器仅估算空弯能力。',
      '实际可用折弯长度可能受设备工作长度和模具长度限制。',
      '短而厚的工件会产生集中载荷，需要制造商确认设备载荷曲线。',
      '生产前请检查上模和下模的额定载荷。',
      '请核实行程、开口高度、喉口深度、内半径和最小翻边要求。',
      '计算结果仅供工程参考，不是生产保证。',
      '增大 V 型模开口可降低所需吨位，但会增大自然内半径和最小翻边要求。',
      '本计算器使用理论 6T / 8T / 10T 和连续生产 8T / 10T / 12T 分段规则校核 V 型模开口与板厚的兼容性。',
      '这些比例主要用于普通低碳钢空气折弯的一般工程判断，不得作为高强钢、耐磨钢、特殊材料或厚板的唯一依据。',
    ],
    faqTitle: '折弯机能力计算器常见问题',
    faq: [
      ['折弯机能力计算器可以计算什么？', '它根据现有折弯机的额定吨位，反算空弯时的最大板厚、最大折弯长度或最小 V 型模开口。'],
      ['最大板厚如何计算？', '计算器对空弯力公式进行反算，结合设备吨位、折弯长度、材料系数和 V 型模开口求出板厚。'],
      ['理论能力与连续生产能力为什么不同？', '理论结果使用 100% 额定吨位；连续生产建议结果自动采用 85%、90% 或 92% 的负载比例，为重复生产保留更保守的余量。'],
      ['计算出的最大折弯长度会超过设备工作长度吗？', '可能会。公式只计算吨位能力，实际可用折弯长度仍可能受设备工作长度和模具长度限制。'],
      ['计算器如何校核 V 型模开口与板厚的兼容性？', '理论结果使用 6T / 8T / 10T 分段规则，连续生产结果使用 8T / 10T / 12T 分段规则。最大板厚模式同时校核吨位能力和 V 开口适用性；最大折弯长度模式在 V 开口不足时隐藏不可执行结果；最小 V 开口模式取吨位公式要求与板厚分段规则中的较大值。高强钢、耐磨钢、特殊材料和厚板仍需向机器及模具制造商和材料供应商确认。'],
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
    minimumVExplanation: 'Итоговое минимальное раскрытие V-матрицы равно большему из требования по усилию и применимого правила по толщине ниже.',
    theoreticalVRuleTitle: 'Теоретический инженерный минимум раскрытия V-матрицы',
    theoreticalVRuleItems: ['T < 8 мм: V ≥ 6T', '8 мм ≤ T < 25 мм: V ≥ 8T', 'T ≥ 25 мм: V ≥ 10T'],
    continuousVRuleTitle: 'Рекомендуемое раскрытие V-матрицы для непрерывного производства',
    continuousVRuleItems: ['T < 8 мм: V ≥ 8T', '8 мм ≤ T < 25 мм: V ≥ 10T', 'T ≥ 25 мм: V ≥ 12T'],
    vRuleScopeNote: 'Эти соотношения предназначены прежде всего для общей инженерной проверки воздушной гибки низкоуглеродистой стали. Для высокопрочной, износостойкой и специальной стали, других особых материалов и толстого листа нельзя полагаться только на эти соотношения. Обязательно подтвердите требования изготовителей пресса и оснастки, а также поставщика материала.',
    maximumThicknessNoteTitle: 'Инженерное пояснение по возможностям',
    maximumThicknessNote: 'Максимальная толщина одновременно ограничивается усилием пресса и допустимым диапазоном текущего раскрытия V-матрицы. Итоговый результат равен меньшему из этих двух ограничений.',
    currentVOpeningLabel: 'Текущее раскрытие V-матрицы',
    theoreticalMinimumVLabel: 'Теоретическое минимальное раскрытие V-матрицы',
    continuousMinimumVLabel: 'Рекомендуемое минимальное раскрытие для непрерывного производства',
    belowTheoreticalTitle: 'Раскрытие V-матрицы ниже теоретического минимума',
    belowTheoreticalText: 'Текущее раскрытие V-матрицы меньше теоретического минимума для этой толщины. Ни рекомендуемая непрерывная, ни теоретическая максимальная длина гиба не являются исполнимым результатом.',
    belowTheoreticalAction: 'Используйте раскрытие, равное или больше теоретического минимума, и выполните расчет повторно.',
    theoreticalOnlyTitle: 'Раскрытие допускает только теоретический расчет',
    theoreticalOnlyText: 'Текущее раскрытие соответствует теоретическому минимуму, но меньше рекомендации для непрерывного производства. Отображается только теоретическая максимальная длина; рекомендуемая непрерывная длина недоступна.',
    theoreticalOnlyAction: 'Для результата непрерывного производства используйте раскрытие не меньше рекомендуемого непрерывного минимума.',
    continuousCompatibleTitle: 'Проверка пригодности оснастки и детали',
    continuousCompatibleText: 'Текущее раскрытие достигло рекомендуемого минимума для непрерывного производства. Все равно проверьте фактическое раскрытие нижней матрицы, допустимую нагрузку оснастки, требуемый внутренний радиус, минимальную полку, геометрию детали и требования к материалу. Расчет не означает автоматическую пригодность оснастки и детали.',
    toolingCompatibilityTitle: 'Проверка совместимости оснастки и детали',
    toolingCompatibilityRequirementBefore: 'Минимальное раскрытие V-матрицы для непрерывной работы составляет',
    toolingCompatibilityRequirementAfter: '. Убедитесь, что имеющаяся нижняя матрица имеет раскрытие, равное или больше этого значения.',
    toolingCompatibilityDetails: 'Перед выбором фактической матрицы проверьте требуемый внутренний радиус, минимальную длину полки, геометрию детали, допустимую нагрузку оснастки, требования к материалу и применимые требования изготовителей. При необходимости проконсультируйтесь с изготовителем пресса или оснастки.',
    safetyTitle: 'Инженерные ограничения и безопасность',
    safetyItems: [
      'Калькулятор оценивает возможности только для воздушной гибки.',
      'Фактическая длина гиба может ограничиваться рабочей длиной пресса и длиной оснастки.',
      'Короткие толстые заготовки создают сосредоточенную нагрузку, требующую проверки диаграммы нагрузок изготовителя.',
      'Перед производством проверьте допустимую нагрузку пуансона и матрицы.',
      'Проверьте ход, открытие, глубину зева, внутренний радиус и минимальную полку.',
      'Результаты являются инженерным ориентиром, а не гарантией производства.',
      'Большее раскрытие V-матрицы снижает усилие, но увеличивает естественный внутренний радиус и минимальную полку.',
      'Калькулятор проверяет совместимость раскрытия V-матрицы по теоретическим диапазонам 6T / 8T / 10T и диапазонам 8T / 10T / 12T для непрерывного производства.',
      'Эти соотношения служат общей инженерной рекомендацией для воздушной гибки низкоуглеродистой стали и не должны быть единственным основанием для высокопрочной, износостойкой или специальной стали и толстого листа.',
    ],
    faqTitle: 'Вопросы о калькуляторе возможностей пресса',
    faq: [
      ['Что рассчитывает калькулятор возможностей листогибочного пресса?', 'Он определяет максимальную толщину, максимальную длину гиба или минимальное раскрытие V-матрицы по номинальному усилию имеющегося пресса для воздушной гибки.'],
      ['Как рассчитывается максимальная толщина листа?', 'Формула усилия воздушной гибки преобразуется для определения толщины с учетом усилия пресса, длины гиба, материала и раскрытия V-матрицы.'],
      ['Почему теоретические и непрерывные возможности различаются?', 'Теоретический результат использует 100% номинального усилия, а для непрерывной работы применяется коэффициент 85%, 90% или 92%.'],
      ['Может ли расчетная длина гиба превышать рабочую длину пресса?', 'Да. Формула учитывает только усилие; фактическая длина ограничивается рабочей длиной пресса и оснастки.'],
      ['Как калькулятор проверяет совместимость раскрытия V-матрицы с толщиной листа?', 'Теоретические результаты используют диапазоны 6T / 8T / 10T, а результаты для непрерывного производства — 8T / 10T / 12T. Режим максимальной толщины одновременно проверяет усилие и пригодность раскрытия; режим максимальной длины скрывает неисполнимые результаты при недостаточном раскрытии; режим минимального раскрытия выбирает большее из требования по усилию и применимого правила по толщине. Для высокопрочной, износостойкой и специальной стали и толстого листа по-прежнему требуется подтверждение изготовителей пресса и оснастки и поставщика материала.'],
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
    minimumVExplanation: 'La abertura V mínima final es el mayor valor entre el requisito por tonelaje y la regla aplicable por espesor indicada a continuación.',
    theoreticalVRuleTitle: 'Abertura V mínima teórica de ingeniería',
    theoreticalVRuleItems: ['T < 8 mm: V ≥ 6T', '8 mm ≤ T < 25 mm: V ≥ 8T', 'T ≥ 25 mm: V ≥ 10T'],
    continuousVRuleTitle: 'Abertura V recomendada para producción continua',
    continuousVRuleItems: ['T < 8 mm: V ≥ 8T', '8 mm ≤ T < 25 mm: V ≥ 10T', 'T ≥ 25 mm: V ≥ 12T'],
    vRuleScopeNote: 'Estas relaciones se destinan principalmente a comprobaciones generales de ingeniería para plegado al aire de acero dulce. El acero de alta resistencia, el acero antidesgaste, los materiales especiales y la chapa gruesa no deben evaluarse solo con estas relaciones. Confirme siempre los requisitos del fabricante de la máquina, del fabricante del utillaje y del proveedor del material.',
    maximumThicknessNoteTitle: 'Nota de capacidad de ingeniería',
    maximumThicknessNote: 'El espesor máximo está limitado tanto por la capacidad de tonelaje de la máquina como por el intervalo admisible de la abertura V actual. El resultado final utiliza el menor de ambos límites.',
    currentVOpeningLabel: 'Abertura V actual',
    theoreticalMinimumVLabel: 'Abertura V mínima teórica',
    continuousMinimumVLabel: 'Abertura V mínima recomendada para producción continua',
    belowTheoreticalTitle: 'La abertura V está por debajo del mínimo teórico',
    belowTheoreticalText: 'La abertura V actual es menor que el mínimo teórico para este espesor. Ni la longitud máxima recomendada para producción continua ni la longitud máxima teórica son resultados ejecutables.',
    belowTheoreticalAction: 'Use una abertura V igual o superior al mínimo teórico y vuelva a calcular.',
    theoreticalOnlyTitle: 'La abertura V solo admite el cálculo teórico',
    theoreticalOnlyText: 'La abertura V actual cumple el mínimo teórico, pero es inferior a la recomendación para producción continua. Solo se muestra la longitud máxima teórica; la longitud máxima continua recomendada no está disponible.',
    theoreticalOnlyAction: 'Para obtener un resultado de producción continua, use una abertura V igual o superior al mínimo continuo recomendado.',
    continuousCompatibleTitle: 'Confirmación de idoneidad del utillaje y la pieza',
    continuousCompatibleText: 'La abertura V actual alcanza el mínimo recomendado para producción continua. Aun así, confirme la abertura real de la matriz inferior, la capacidad de carga del utillaje, el radio interior objetivo, la pestaña mínima, la geometría de la pieza y los requisitos del material. El cálculo no implica que el utillaje y la pieza sean automáticamente adecuados.',
    toolingCompatibilityTitle: 'Comprobación de compatibilidad del utillaje y la pieza',
    toolingCompatibilityRequirementBefore: 'La abertura mínima de matriz V necesaria para la producción continua es',
    toolingCompatibilityRequirementAfter: '. Confirme que la matriz inferior disponible tenga una abertura igual o superior a este valor.',
    toolingCompatibilityDetails: 'Antes de seleccionar la matriz definitiva, compruebe el radio interior objetivo, la pestaña mínima, la geometría de la pieza, la capacidad de carga del utillaje, los requisitos del material y los requisitos aplicables de los fabricantes. Consulte al fabricante de la máquina o del utillaje cuando sea necesario.',
    safetyTitle: 'Límites de ingeniería y recordatorios de seguridad',
    safetyItems: [
      'Esta calculadora solo estima la capacidad para plegado al aire.',
      'La longitud útil real puede estar limitada por la longitud de trabajo de la máquina y del utillaje.',
      'Las piezas cortas y gruesas pueden generar cargas concentradas que requieren confirmar la curva de carga del fabricante.',
      'Compruebe las cargas admisibles del punzón y la matriz antes de producir.',
      'Verifique carrera, apertura, profundidad de cuello, radio interior y pestaña mínima.',
      'Los resultados son referencias de ingeniería, no garantías de producción.',
      'Una abertura V mayor reduce el tonelaje requerido, pero aumenta el radio interior natural y la pestaña mínima.',
      'La calculadora comprueba la compatibilidad de la abertura V con las reglas teóricas 6T / 8T / 10T y las reglas 8T / 10T / 12T para producción continua.',
      'Estas relaciones son una guía general de ingeniería para plegado al aire de acero dulce y no deben ser el único criterio para acero de alta resistencia, acero antidesgaste, materiales especiales o chapa gruesa.',
    ],
    faqTitle: 'Preguntas sobre la calculadora de capacidad',
    faq: [
      ['¿Qué calcula una calculadora de capacidad de plegadora?', 'A partir del tonelaje nominal estima el espesor máximo, la longitud máxima o la abertura mínima de matriz V para plegado al aire.'],
      ['¿Cómo se calcula el espesor máximo?', 'Se despeja el espesor en la fórmula de fuerza de plegado al aire usando tonelaje, longitud, factor del material y abertura de matriz V.'],
      ['¿Por qué difieren la capacidad teórica y la continua?', 'La teórica usa el 100% del tonelaje nominal; la recomendación continua aplica automáticamente una relación del 85%, 90% o 92%.'],
      ['¿Puede la longitud calculada superar la longitud de trabajo?', 'Sí. La fórmula solo calcula capacidad por tonelaje; la longitud útil real depende de la máquina y del utillaje.'],
      ['¿Cómo comprueba la calculadora la compatibilidad entre la abertura V y el espesor?', 'Los resultados teóricos usan los intervalos 6T / 8T / 10T y los de producción continua usan 8T / 10T / 12T. El modo de espesor máximo comprueba tanto el tonelaje como la idoneidad de la abertura; el modo de longitud máxima oculta resultados no ejecutables cuando la abertura es insuficiente; y el modo de abertura mínima utiliza el mayor valor entre el requisito por tonelaje y la regla aplicable por espesor. El acero de alta resistencia, el acero antidesgaste, los materiales especiales y la chapa gruesa siguen requiriendo confirmación de los fabricantes de la máquina y del utillaje y del proveedor del material.'],
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
    minimumVExplanation: 'Nihai minimum V açıklığı, tonaj gereksinimi ile aşağıdaki kalınlığa bağlı kuralın büyük olanıdır.',
    theoreticalVRuleTitle: 'Teorik mühendislik minimum V açıklığı',
    theoreticalVRuleItems: ['T < 8 mm: V ≥ 6T', '8 mm ≤ T < 25 mm: V ≥ 8T', 'T ≥ 25 mm: V ≥ 10T'],
    continuousVRuleTitle: 'Sürekli üretim için önerilen V açıklığı',
    continuousVRuleItems: ['T < 8 mm: V ≥ 8T', '8 mm ≤ T < 25 mm: V ≥ 10T', 'T ≥ 25 mm: V ≥ 12T'],
    vRuleScopeNote: 'Bu oranlar öncelikle yumuşak çeliğin havada bükümü için genel mühendislik kontrollerinde kullanılır. Yüksek dayanımlı çelik, aşınmaya dayanıklı çelik, özel malzemeler ve kalın levha yalnızca bu oranlarla değerlendirilmemelidir. Makine üreticisinin, takım üreticisinin ve malzeme tedarikçisinin gereksinimlerini mutlaka doğrulayın.',
    maximumThicknessNoteTitle: 'Mühendislik kapasite notu',
    maximumThicknessNote: 'Maksimum kalınlık hem makine tonaj kapasitesi hem de mevcut V kalıp açıklığının uygun aralığı ile sınırlıdır. Nihai sonuç bu iki sınırdan küçük olanını kullanır.',
    currentVOpeningLabel: 'Mevcut V açıklığı',
    theoreticalMinimumVLabel: 'Teorik minimum V açıklığı',
    continuousMinimumVLabel: 'Sürekli üretim için önerilen minimum V açıklığı',
    belowTheoreticalTitle: 'V açıklığı teorik minimumun altında',
    belowTheoreticalText: 'Mevcut V açıklığı bu sac kalınlığı için teorik minimumdan küçüktür. Önerilen sürekli ve teorik maksimum büküm uzunluklarının ikisi de uygulanabilir sonuç değildir.',
    belowTheoreticalAction: 'Teorik minimuma eşit veya daha büyük bir V açıklığı kullanın ve yeniden hesaplayın.',
    theoreticalOnlyTitle: 'V açıklığı yalnızca teorik hesabı destekliyor',
    theoreticalOnlyText: 'Mevcut V açıklığı teorik minimumu karşılar, ancak sürekli üretim önerisinin altındadır. Yalnızca teorik maksimum büküm uzunluğu gösterilir; önerilen sürekli maksimum uzunluk kullanılamaz.',
    theoreticalOnlyAction: 'Sürekli üretim sonucu için önerilen sürekli minimuma eşit veya daha büyük bir V açıklığı kullanın.',
    continuousCompatibleTitle: 'Takım ve parça uygunluğu onayı',
    continuousCompatibleText: 'Mevcut V açıklığı sürekli üretim için önerilen minimuma ulaşmıştır. Yine de gerçek alt kalıp açıklığını, takım yük kapasitesini, hedef iç yarıçapı, minimum flanş uzunluğunu, parça geometrisini ve malzeme gereksinimlerini doğrulayın. Hesaplanan uzunluklar takımın ve parçanın otomatik olarak uygun olduğu anlamına gelmez.',
    toolingCompatibilityTitle: 'Takım ve parça uyumluluk kontrolü',
    toolingCompatibilityRequirementBefore: 'Sürekli üretim için gereken minimum V kalıp açıklığı',
    toolingCompatibilityRequirementAfter: ' değeridir. Mevcut alt kalıbın bu değere eşit veya daha büyük bir açıklığa sahip olduğunu doğrulayın.',
    toolingCompatibilityDetails: 'Gerçek kalıbı seçmeden önce hedef iç yarıçapı, minimum flanş uzunluğunu, parça geometrisini, takım yük kapasitesini, malzeme gereksinimlerini ve geçerli üretici şartlarını kontrol edin. Gerektiğinde makine veya takım üreticisine danışın.',
    safetyTitle: 'Mühendislik sınırları ve güvenlik hatırlatmaları',
    safetyItems: [
      'Bu hesaplayıcı yalnızca havada büküm kapasitesini tahmin eder.',
      'Gerçek kullanılabilir büküm uzunluğu makine çalışma ve takım uzunluğuyla sınırlanabilir.',
      'Kısa ve kalın parçalar, üretici yük eğrisi doğrulaması gerektiren noktasal yükler oluşturabilir.',
      'Üretimden önce zımba ve kalıp yük kapasitelerini kontrol edin.',
      'Strok, açıklık, boğaz derinliği, iç yarıçap ve minimum flanş gereksinimlerini doğrulayın.',
      'Sonuçlar mühendislik referansıdır, üretim garantisi değildir.',
      'Daha büyük V açıklıkları tonajı azaltır, ancak doğal iç yarıçapı ve minimum flanşı artırır.',
      'Hesaplayıcı V açıklığı uyumluluğunu teorik 6T / 8T / 10T ve sürekli üretim 8T / 10T / 12T kalınlık kurallarıyla kontrol eder.',
      'Bu oranlar yumuşak çeliğin havada bükümü için genel mühendislik rehberidir ve yüksek dayanımlı çelik, aşınmaya dayanıklı çelik, özel malzemeler veya kalın levha için tek dayanak olmamalıdır.',
    ],
    faqTitle: 'Abkant pres kapasite hesaplayıcısı SSS',
    faq: [
      ['Abkant pres kapasite hesaplayıcısı neyi hesaplar?', 'Mevcut presin nominal tonajından havada büküm için maksimum kalınlık, büküm uzunluğu veya minimum V kalıp açıklığını hesaplar.'],
      ['Maksimum sac kalınlığı nasıl hesaplanır?', 'Havada büküm kuvveti formülü tonaj, uzunluk, malzeme katsayısı ve V açıklığıyla kalınlık için yeniden düzenlenir.'],
      ['Teorik ve sürekli üretim kapasiteleri neden farklıdır?', 'Teorik sonuç nominal tonajın %100’ünü, sürekli üretim sonucu ise otomatik %85, %90 veya %92 yük oranını kullanır.'],
      ['Hesaplanan büküm uzunluğu makine çalışma uzunluğunu aşabilir mi?', 'Evet. Formül yalnızca tonaj kapasitesini hesaplar; gerçek uzunluk makine ve takım uzunluğuyla sınırlıdır.'],
      ['Hesaplayıcı V kalıp açıklığı ile sac kalınlığı uyumluluğunu nasıl kontrol eder?', 'Teorik sonuçlar 6T / 8T / 10T, sürekli üretim sonuçları ise 8T / 10T / 12T kalınlık aralıklarını kullanır. Maksimum Kalınlık modu hem tonaj kapasitesini hem de V açıklığı uygunluğunu kontrol eder; Maksimum Büküm Uzunluğu modu açıklık yetersizse uygulanamaz sonuçları gizler; Minimum V Açıklığı modu tonaj gereksinimi ile geçerli kalınlık kuralından büyük olanını kullanır. Yüksek dayanımlı çelik, aşınmaya dayanıklı çelik, özel malzemeler ve kalın levha için makine ve takım üreticileri ile malzeme tedarikçisinin onayı yine gereklidir.'],
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
    minimumVExplanation: 'Bukaan V minimum akhir adalah nilai yang lebih besar antara kebutuhan berdasarkan tonase dan aturan ketebalan yang berlaku di bawah ini.',
    theoreticalVRuleTitle: 'Bukaan V minimum teoretis untuk pemeriksaan teknik',
    theoreticalVRuleItems: ['T < 8 mm: V ≥ 6T', '8 mm ≤ T < 25 mm: V ≥ 8T', 'T ≥ 25 mm: V ≥ 10T'],
    continuousVRuleTitle: 'Bukaan V yang disarankan untuk produksi kontinu',
    continuousVRuleItems: ['T < 8 mm: V ≥ 8T', '8 mm ≤ T < 25 mm: V ≥ 10T', 'T ≥ 25 mm: V ≥ 12T'],
    vRuleScopeNote: 'Rasio ini terutama digunakan untuk pemeriksaan teknik umum pada air bending baja ringan. Baja berkekuatan tinggi, baja tahan aus, material khusus, dan pelat tebal tidak boleh dinilai hanya berdasarkan rasio ini. Selalu konfirmasikan persyaratan produsen mesin, produsen tooling, dan pemasok material.',
    maximumThicknessNoteTitle: 'Catatan kapasitas teknik',
    maximumThicknessNote: 'Ketebalan maksimum dibatasi oleh kapasitas tonase mesin dan rentang yang sesuai untuk bukaan V-die saat ini. Hasil akhir menggunakan nilai yang lebih kecil dari kedua batas tersebut.',
    currentVOpeningLabel: 'Bukaan V saat ini',
    theoreticalMinimumVLabel: 'Bukaan V minimum teoretis',
    continuousMinimumVLabel: 'Bukaan V minimum yang disarankan untuk produksi kontinu',
    belowTheoreticalTitle: 'Bukaan V di bawah minimum teoretis',
    belowTheoreticalText: 'Bukaan V saat ini lebih kecil daripada minimum teoretis untuk ketebalan pelat ini. Panjang tekuk maksimum produksi kontinu yang disarankan dan panjang maksimum teoretis keduanya bukan hasil yang dapat dijalankan.',
    belowTheoreticalAction: 'Gunakan bukaan V yang sama dengan atau lebih besar daripada minimum teoretis, lalu hitung ulang.',
    theoreticalOnlyTitle: 'Bukaan V hanya mendukung perhitungan teoretis',
    theoreticalOnlyText: 'Bukaan V saat ini memenuhi minimum teoretis, tetapi berada di bawah rekomendasi produksi kontinu. Hanya panjang tekuk maksimum teoretis yang ditampilkan; panjang maksimum kontinu yang disarankan tidak tersedia.',
    theoreticalOnlyAction: 'Untuk memperoleh hasil produksi kontinu, gunakan bukaan V yang sama dengan atau lebih besar daripada minimum kontinu yang disarankan.',
    continuousCompatibleTitle: 'Konfirmasi kesesuaian tooling dan benda kerja',
    continuousCompatibleText: 'Bukaan V saat ini telah mencapai minimum yang disarankan untuk produksi kontinu. Tetap konfirmasikan bukaan lower die aktual, kapasitas beban tooling, radius dalam target, panjang flange minimum, geometri benda kerja, dan persyaratan material. Hasil perhitungan tidak berarti tooling dan benda kerja otomatis sesuai.',
    toolingCompatibilityTitle: 'Pemeriksaan kompatibilitas tooling dan benda kerja',
    toolingCompatibilityRequirementBefore: 'Bukaan V-die minimum yang diperlukan untuk produksi kontinu adalah',
    toolingCompatibilityRequirementAfter: '. Pastikan lower die yang tersedia memiliki bukaan yang sama dengan atau lebih besar dari nilai ini.',
    toolingCompatibilityDetails: 'Sebelum memilih die aktual, periksa radius dalam target, panjang flange minimum, geometri benda kerja, kapasitas beban tooling, persyaratan material, dan persyaratan produsen yang berlaku. Konfirmasikan kepada produsen mesin atau tooling bila diperlukan.',
    safetyTitle: 'Batas teknik dan pengingat keselamatan',
    safetyItems: [
      'Kalkulator ini hanya memperkirakan kapasitas air bending.',
      'Panjang tekuk aktual dapat dibatasi oleh panjang kerja mesin dan panjang tooling.',
      'Benda kerja pendek dan tebal dapat menghasilkan beban terpusat yang memerlukan konfirmasi kurva beban produsen.',
      'Periksa rating beban punch dan die sebelum produksi.',
      'Verifikasi stroke, daylight, throat depth, radius dalam, dan kebutuhan flange minimum.',
      'Hasil adalah referensi teknik, bukan jaminan produksi.',
      'Bukaan V yang lebih besar mengurangi tonase, tetapi meningkatkan radius dalam alami dan kebutuhan flange minimum.',
      'Kalkulator memeriksa kompatibilitas bukaan V dengan aturan ketebalan teoretis 6T / 8T / 10T dan produksi kontinu 8T / 10T / 12T.',
      'Rasio ini merupakan panduan teknik umum untuk air bending baja ringan dan tidak boleh menjadi satu-satunya dasar untuk baja berkekuatan tinggi, baja tahan aus, material khusus, atau pelat tebal.',
    ],
    faqTitle: 'FAQ kalkulator kapasitas press brake',
    faq: [
      ['Apa yang dihitung kalkulator kapasitas press brake?', 'Kalkulator menghitung balik ketebalan maksimum, panjang tekuk maksimum, atau bukaan V-die minimum dari tonase terukur untuk air bending.'],
      ['Bagaimana ketebalan pelat maksimum dihitung?', 'Rumus gaya air bending disusun ulang untuk ketebalan dengan tonase, panjang tekuk, faktor material, dan bukaan V-die.'],
      ['Mengapa kapasitas teoretis dan kontinu berbeda?', 'Hasil teoretis memakai 100% tonase terukur, sedangkan hasil kontinu menerapkan rasio beban otomatis 85%, 90%, atau 92%.'],
      ['Dapatkah panjang tekuk hasil perhitungan melebihi panjang kerja mesin?', 'Ya. Rumus hanya menghitung kapasitas tonase; panjang aktual tetap dibatasi mesin dan tooling.'],
      ['Bagaimana kalkulator memeriksa kompatibilitas bukaan V-die dengan ketebalan pelat?', 'Hasil teoretis memakai rentang 6T / 8T / 10T, sedangkan hasil produksi kontinu memakai 8T / 10T / 12T. Mode Ketebalan Maksimum memeriksa kapasitas tonase dan kesesuaian bukaan V; mode Panjang Tekuk Maksimum menyembunyikan hasil yang tidak dapat dijalankan saat bukaan tidak mencukupi; dan mode Bukaan V Minimum memakai nilai yang lebih besar antara kebutuhan tonase dan aturan ketebalan yang berlaku. Baja berkekuatan tinggi, baja tahan aus, material khusus, dan pelat tebal tetap memerlukan konfirmasi dari produsen mesin dan tooling serta pemasok material.'],
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

const getTheoreticalMinimumVOpening = (thickness) => {
  if (thickness < 8) return thickness * 6
  if (thickness < 25) return thickness * 8
  return thickness * 10
}

const getContinuousMinimumVOpening = (thickness) => {
  if (thickness < 8) return thickness * 8
  if (thickness < 25) return thickness * 10
  return thickness * 12
}

const getTheoreticalMaximumThicknessByVOpening = (opening) => {
  if (opening < 48) return opening / 6
  if (opening < 64) return 8
  if (opening < 200) return opening / 8
  if (opening < 250) return 25
  return opening / 10
}

const getContinuousMaximumThicknessByVOpening = (opening) => {
  if (opening < 64) return opening / 8
  if (opening < 80) return 8
  if (opening < 250) return opening / 10
  if (opening < 300) return 25
  return opening / 12
}

const getLimitSource = (tonnageLimit, vOpeningLimit) => {
  const tolerance = 1e-9 * Math.max(1, tonnageLimit, vOpeningLimit)

  if (Math.abs(tonnageLimit - vOpeningLimit) <= tolerance) return 'both'
  return tonnageLimit < vOpeningLimit ? 'tonnage' : 'vOpening'
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

      const theoreticalThicknessByTonnage = Math.sqrt(
        (rated * opening * 20) /
          (calibrationFactor * length * materialFactor)
      )
      const continuousThicknessByTonnage = Math.sqrt(
        (continuousTonnage * opening * 20) /
          (calibrationFactor * length * materialFactor)
      )
      const theoreticalThicknessByVOpening =
        getTheoreticalMaximumThicknessByVOpening(opening)
      const continuousThicknessByVOpening =
        getContinuousMaximumThicknessByVOpening(opening)
      const theoreticalValue = Math.min(
        theoreticalThicknessByTonnage,
        theoreticalThicknessByVOpening
      )
      const continuousValue = Math.min(
        continuousThicknessByTonnage,
        continuousThicknessByVOpening
      )

      return {
        ...base,
        theoretical: floorToTwoDecimals(theoreticalValue),
        continuous: floorToTwoDecimals(continuousValue),
        theoreticalThicknessByTonnage,
        continuousThicknessByTonnage,
        theoreticalThicknessByVOpening,
        continuousThicknessByVOpening,
        theoreticalLimitSource: getLimitSource(
          theoreticalThicknessByTonnage,
          theoreticalThicknessByVOpening
        ),
        continuousLimitSource: getLimitSource(
          continuousThicknessByTonnage,
          continuousThicknessByVOpening
        ),
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
      const theoreticalMinimumV =
        getTheoreticalMinimumVOpening(thickness)
      const continuousMinimumV =
        getContinuousMinimumVOpening(thickness)

      if (opening < theoreticalMinimumV) {
        return {
          ...base,
          theoretical: null,
          continuous: null,
          compatibilityStatus: 'belowTheoretical',
          theoreticalMinimumV,
          continuousMinimumV,
        }
      }

      const theoreticalValue = Math.floor(
        (rated * opening * 20) / denominator
      )

      if (opening < continuousMinimumV) {
        return {
          ...base,
          theoretical: theoreticalValue,
          continuous: null,
          compatibilityStatus: 'theoreticalOnly',
          theoreticalMinimumV,
          continuousMinimumV,
        }
      }

      return {
        ...base,
        theoretical: theoreticalValue,
        continuous: Math.floor(
          (continuousTonnage * opening * 20) / denominator
        ),
        compatibilityStatus: 'continuousCompatible',
        theoreticalMinimumV,
        continuousMinimumV,
      }
    }

    if (!isPositiveFinite(thickness) || !isPositiveFinite(length)) {
      return null
    }

    const numerator =
      calibrationFactor *
      thickness *
      thickness *
      length *
      materialFactor
    const theoreticalVByTonnage = numerator / (rated * 20)
    const continuousVByTonnage = numerator / (continuousTonnage * 20)
    const theoreticalMinimumVByThickness =
      getTheoreticalMinimumVOpening(thickness)
    const continuousMinimumVByThickness =
      getContinuousMinimumVOpening(thickness)
    const theoreticalValue = Math.max(
      theoreticalVByTonnage,
      theoreticalMinimumVByThickness
    )
    const continuousValue = Math.max(
      continuousVByTonnage,
      continuousMinimumVByThickness
    )

    return {
      ...base,
      theoretical: safeCeilMillimeters(theoreticalValue),
      continuous: safeCeilMillimeters(continuousValue),
      theoreticalVByTonnage,
      continuousVByTonnage,
      theoreticalMinimumVByThickness,
      continuousMinimumVByThickness,
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

          .zyco-capacity-tooling-check--info {
            border-color: rgba(56, 189, 248, 0.48);
            background: rgba(7, 89, 133, 0.3);
          }

          .zyco-capacity-tooling-check--warning {
            border-color: rgba(250, 204, 21, 0.52);
            background: rgba(113, 63, 18, 0.34);
          }

          .zyco-capacity-tooling-check--error {
            border-color: rgba(248, 113, 113, 0.58);
            background: rgba(127, 29, 29, 0.34);
          }

          .zyco-capacity-tooling-check--error .zyco-capacity-tooling-check__title {
            color: #fecaca;
          }

          .zyco-capacity-tooling-check__values {
            display: grid;
            gap: 7px;
            margin: 12px 0 0;
          }

          .zyco-capacity-tooling-check__value {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 8px 16px;
            align-items: start;
            margin: 0;
            color: #dbeafe;
          }

          .zyco-capacity-tooling-check__value dt,
          .zyco-capacity-tooling-check__value dd {
            margin: 0;
          }

          .zyco-capacity-tooling-check__value dd {
            color: #ffffff;
            font-weight: 900;
            text-align: right;
            white-space: nowrap;
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

              {isThicknessMode && result && (
                <div
                  className='zyco-capacity-tooling-check zyco-capacity-tooling-check--info'
                  role='note'
                >
                  <h3 className='zyco-capacity-tooling-check__title'>
                    {page.maximumThicknessNoteTitle}
                  </h3>
                  <p className='zyco-capacity-tooling-check__copy'>
                    {page.maximumThicknessNote}
                  </p>
                </div>
              )}

              {mode === 'maximumBendLength' &&
                result?.compatibilityStatus === 'belowTheoretical' && (
                  <div
                    className='zyco-capacity-tooling-check zyco-capacity-tooling-check--error'
                    role='alert'
                  >
                    <h3 className='zyco-capacity-tooling-check__title'>
                      {page.belowTheoreticalTitle}
                    </h3>
                    <p className='zyco-capacity-tooling-check__copy'>
                      {page.belowTheoreticalText}
                    </p>
                    <dl className='zyco-capacity-tooling-check__values'>
                      <div className='zyco-capacity-tooling-check__value'>
                        <dt>{page.currentVOpeningLabel}</dt>
                        <dd>{Number(vOpening).toFixed(2)} mm</dd>
                      </div>
                      <div className='zyco-capacity-tooling-check__value'>
                        <dt>{page.theoreticalMinimumVLabel}</dt>
                        <dd>{result.theoreticalMinimumV.toFixed(2)} mm</dd>
                      </div>
                      <div className='zyco-capacity-tooling-check__value'>
                        <dt>{page.continuousMinimumVLabel}</dt>
                        <dd>{result.continuousMinimumV.toFixed(2)} mm</dd>
                      </div>
                    </dl>
                    <p className='zyco-capacity-tooling-check__copy'>
                      {page.belowTheoreticalAction}
                    </p>
                  </div>
                )}

              {mode === 'maximumBendLength' &&
                result?.compatibilityStatus === 'theoreticalOnly' && (
                  <div
                    className='zyco-capacity-tooling-check zyco-capacity-tooling-check--warning'
                    role='status'
                  >
                    <h3 className='zyco-capacity-tooling-check__title'>
                      {page.theoreticalOnlyTitle}
                    </h3>
                    <p className='zyco-capacity-tooling-check__copy'>
                      {page.theoreticalOnlyText}
                    </p>
                    <dl className='zyco-capacity-tooling-check__values'>
                      <div className='zyco-capacity-tooling-check__value'>
                        <dt>{page.currentVOpeningLabel}</dt>
                        <dd>{Number(vOpening).toFixed(2)} mm</dd>
                      </div>
                      <div className='zyco-capacity-tooling-check__value'>
                        <dt>{page.theoreticalMinimumVLabel}</dt>
                        <dd>{result.theoreticalMinimumV.toFixed(2)} mm</dd>
                      </div>
                      <div className='zyco-capacity-tooling-check__value'>
                        <dt>{page.continuousMinimumVLabel}</dt>
                        <dd>{result.continuousMinimumV.toFixed(2)} mm</dd>
                      </div>
                    </dl>
                    <p className='zyco-capacity-tooling-check__copy'>
                      {page.theoreticalOnlyAction}
                    </p>
                  </div>
                )}

              {mode === 'maximumBendLength' &&
                result?.compatibilityStatus === 'continuousCompatible' && (
                  <div
                    className='zyco-capacity-tooling-check zyco-capacity-tooling-check--info'
                    role='note'
                  >
                    <h3 className='zyco-capacity-tooling-check__title'>
                      {page.continuousCompatibleTitle}
                    </h3>
                    <p className='zyco-capacity-tooling-check__copy'>
                      {page.continuousCompatibleText}
                    </p>
                    <dl className='zyco-capacity-tooling-check__values'>
                      <div className='zyco-capacity-tooling-check__value'>
                        <dt>{page.currentVOpeningLabel}</dt>
                        <dd>{Number(vOpening).toFixed(2)} mm</dd>
                      </div>
                      <div className='zyco-capacity-tooling-check__value'>
                        <dt>{page.continuousMinimumVLabel}</dt>
                        <dd>{result.continuousMinimumV.toFixed(2)} mm</dd>
                      </div>
                    </dl>
                  </div>
                )}

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
                  V = max(V<sub>tonnage</sub>, V<sub>thickness</sub>)
                </p>
                <p className='zyco-capacity__copy'>
                  {page.minimumVExplanation}
                </p>
                <h3>{page.theoreticalVRuleTitle}</h3>
                <ul className='zyco-capacity__list'>
                  {page.theoreticalVRuleItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <h3>{page.continuousVRuleTitle}</h3>
                <ul className='zyco-capacity__list'>
                  {page.continuousVRuleItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className='zyco-capacity__copy'>
                  {page.vRuleScopeNote}
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
