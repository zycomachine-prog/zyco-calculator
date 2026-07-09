import { useEffect } from 'react'
import EngineeringCTA from '../components/EngineeringCTA.jsx'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'
import { getEngineeringText } from '../languages/engineeringText.js'
import { getSiteUrl, setPageSEO, setStructuredData } from '../utils/seo.js'

const routePath = '/engineering-tools/press-brake-controller-selection-guide'

const supportedLanguages = ['en', 'zh', 'ru', 'es', 'tr', 'id']

const normalizeLanguage = (language) => {
  if (supportedLanguages.includes(language)) return language
  if (language === 'cn') return 'zh'
  return 'en'
}

const relatedTools = [
  ['pressBrakeCalculator', '/engineering-tools/press-brake-calculator'],
  ['pressBrakeTonnageGuide', '/engineering-tools/press-brake-tonnage-guide'],
  ['vDieSelectionTool', '/engineering-tools/v-die-selection-tool'],
  ['vDieSelectionChart', '/engineering-tools/press-brake-v-die-selection-chart'],
  ['vDieOpeningGuide', '/engineering-tools/how-to-choose-press-brake-v-die-opening'],
  ['materialDatabase', '/engineering-tools/material-database'],
  ['springbackDatabase', '/engineering-tools/springback-database'],
  ['springbackCompensationGuide', '/engineering-tools/springback-compensation-guide'],
  ['bendSequenceGuide', '/engineering-tools/bend-sequence-guide'],
  ['toolingSelectionGuide', '/engineering-tools/press-brake-tooling-selection-guide'],
  ['controllerSelectionGuide', '/engineering-tools/press-brake-controller-selection-guide'],
  ['crowningGuide', '/engineering-tools/press-brake-crowning-guide'],
  ['airBendingGuide', '/engineering-tools/air-bending-guide'],
  ['bottomingVsCoiningGuide', '/engineering-tools/bottoming-vs-coining-guide'],
  ['bendAllowanceCalculator', '/engineering-tools/bend-allowance-calculator'],
  ['kFactorGuide', '/engineering-tools/k-factor-guide'],
  ['bendDeductionGuide', '/engineering-tools/bend-deduction-guide'],
  ['minimumFlangeLengthGuide', '/engineering-tools/minimum-flange-length-guide'],
  ['insideRadiusGuide', '/engineering-tools/inside-radius-guide'],
  ['stainlessSteelBendingGuide', '/engineering-tools/stainless-steel-bending-guide'],
  ['aluminumBendingGuide', '/engineering-tools/aluminum-bending-guide'],
]

const controllerModels = [
  ['EASYCAT', 'ET16', 'value', 'et16Axis', 'touch2d', 'practicalSupport', 'costExport', 'value'],
  ['EASYCAT', 'ET18', 'recommendedValue', 'et18Axis', 'et18Programming', 'et18Cad', 'standardAdvanced', 'value'],
  ['Delem', 'DA53TX', 'compact', 'standardSync', 'touchCnc', 'basicWorkflow', 'dailyCnc', 'mid'],
  ['Delem', 'DA58TX', 'graphical', 'multiAxis', 'program2d', 'betterWorkflow', 'visualFactories', 'midHigh'],
  ['Delem', 'DA66S', 'advanced', 'higherAxis', 'advanced2d3d', 'cadOfflinePackage', 'complexFlexible', 'high'],
  ['Delem', 'DA69S', 'premium', 'premiumAxis', 'program3d', 'cadOffline', 'premiumComplex', 'premium'],
  ['Cybelec', 'CT8', 'entry', 'basicAxis', 'simpleTouch', 'dailyWorkflow', 'economicalCnc', 'mid'],
  ['Cybelec', 'CT12', 'graphical', 'multiAxis', 'program2d', 'cadPackage', 'generalVisual', 'midHigh'],
  ['Cybelec', 'CT15', 'advancedGraphical', 'higherAxis', 'advancedGraphicalProgram', 'cadOfflinePackage', 'complexProfiles', 'high'],
  ['ESA', 'ESA630', 'entry', 'standardAxis', 'practicalCnc', 'basicSupport', 'standardCnc', 'mid'],
  ['ESA', 'ESA640', 'midCnc', 'standardMidAxis', 'graphicalOperation', 'practicalSupport', 'generalProduction', 'mid'],
  ['ESA', 'ESA650', 'midHighCnc', 'expandedAxis', 'improvedGraphical', 'cadPackage', 'flexibleProduction', 'midHigh'],
  ['ESA', 'ESA660', 'advanced', 'higherAxisCnc', 'advancedGraphicalProgram', 'cadOfflinePackage', 'complexProductivity', 'high'],
  ['ESA', 'ESA840', 'advanced', 'multiAxisMachines', 'advancedVisual', 'cadOfflinePackage', 'higherEndMachines', 'high'],
  ['ESA', 'ESA850', 'advanced', 'automationReady', 'advancedWorkflow', 'cadOfflinePackage', 'highMixMachines', 'high'],
  ['ESA', 'ESA860', 'highEnd', 'advancedMultiAxis', 'highEndGraphical', 'cadOfflinePackage', 'complexData', 'premium'],
  ['ESA', 'ESA875', 'premium', 'highEndAxis', 'premiumGraphical', 'cadOfflinePackage', 'industrialAdvanced', 'premium'],
  ['ESA', 'ESA890', 'premium3d', 'highEndAxis', 'program3dLevel', 'cadOffline', 'premiumComplexProduction', 'premium'],
]

const packs = {
  en: {
    back: 'Back to Engineering Tools',
    eyebrow: 'Engineering Guide',
    title: 'Press Brake CNC Controller Selection Guide: Axis Control, 2D/3D Programming and Cost Control',
    subtitle: 'Choose press brake controllers by machine configuration, axis quantity, programming workflow, stability, application scenario and machine cost control.',
    seoTitle: 'Press Brake Controller Selection Guide | EASYCAT, Delem, Cybelec & ESA Comparison',
    seoDescription: 'Learn how to choose the right press brake controller based on axis configuration, 2D/3D programming, offline software, stability, machine cost control and bending applications. Compare EASYCAT ET16/ET18, Delem, Cybelec and ESA CNC systems.',
    keywords: 'press brake CNC controller selection, press brake axis control, EASYCAT ET16, EASYCAT ET18, Delem DA53TX, Delem DA58TX, Cybelec CT12, ESA press brake controller',
    labels: {
      quickAnswer: 'Quick Answer: Which Controller Should You Choose?',
      logic: 'Start From Machine Configuration, Not Brand Name',
      ncCnc: 'CNC Controller Levels: Practical CNC, 2D CNC and 3D CNC',
      axes: 'Understanding Press Brake Axis Control',
      easycat: 'Recommended Cost-Effective CNC Options: EASYCAT ET16 and ET18',
      comparison: 'Controller Comparison: EASYCAT vs Delem vs Cybelec vs ESA',
      delem: 'Delem Controller Selection',
      cybelec: 'Cybelec Controller Selection',
      esa: 'ESA Controller Selection',
      scenarios: 'Controller Recommendations by Application Scenario',
      mistakes: 'Common Mistakes When Choosing a Press Brake Controller',
      advice: 'Practical Buying Advice from ZYCO',
      faq: 'Frequently Asked Questions',
      related: 'Related Engineering Tools',
    },
    quickHeaders: ['Production need', 'Recommended controller level', 'Suggested models'],
    comparisonHeaders: ['Brand', 'Model', 'Suggested level', 'Axis capability', 'Programming level', 'CAD / offline support', 'Best application', 'Cost position'],
    scenarioHeaders: ['Application scenario', 'Recommended controller type', 'Recommended models', 'Why it fits'],
    intro: [
      'The best controller is not the most expensive screen on the market. It is the controller that matches the press brake structure, axis package, operator workflow, part complexity and target selling price.',
      'For ZYCO projects, controller selection is part of machine engineering. Y1/Y2 synchronization, X/R backgauge, Z1/Z2 fingers, X2/R2 independent movement and CNC crowning should be selected before comparing brands.',
    ],
    quickRows: [
      ['Cost-controlled standard CNC press brake', 'High-value practical CNC', 'EASYCAT ET16, EASYCAT ET18'],
      ['Standard export CNC press brake', 'Cost-effective CNC with Y1/Y2/X/R and compensation', 'EASYCAT ET16, EASYCAT ET18, DA53TX'],
      ['Daily mixed sheet metal production', '2D graphical CNC', 'EASYCAT ET18, DA58TX, CT12, ESA650'],
      ['Complex parts and offline workflow', 'Advanced 2D / 3D CNC', 'DA66S, DA69S, CT15, ESA860, ESA890'],
      ['Premium automation and high-mix production', 'High-end multi-axis CNC', 'DA69S, ESA875, ESA890'],
    ],
    logic: [
      'Begin with the required machine configuration: bending length, tonnage, hydraulic synchronization, backgauge travel, crowning method, tooling plan and production mix.',
      'After the machine configuration is clear, choose the controller level that can actually use those axes and functions. A high-end controller cannot compensate for missing axis hardware, while an entry controller can limit a well-equipped machine.',
    ],
    ncCncCards: [
      ['NC controllers', 'Best for simple, repeatable bending where cost is critical and axis demand is limited. They reduce machine price but provide less process guidance and automation.'],
      ['CNC controllers', 'Recommended when synchronized Y1/Y2, backgauge axes, compensation, program storage, graphical programming and repeatable batch control matter.'],
      ['2D CNC', 'A strong practical choice for most factories because operators can draw profiles, check bend steps and produce standard parts without a full 3D workflow.'],
      ['3D CNC', 'Best for complex parts, collision review, CAD-driven process planning and factories that value offline programming efficiency over initial machine cost.'],
    ],
    axes: [
      ['Y1/Y2', 'Independent left and right ram synchronization for accurate CNC bending.'],
      ['X', 'Backgauge depth positioning for flange size control.'],
      ['R', 'Backgauge height adjustment for different bend stations and part geometries.'],
      ['Z1/Z2', 'Movable backgauge fingers for wide, tapered or multi-station parts.'],
      ['X2/R2', 'Independent second backgauge axes for asymmetric positioning and advanced parts.'],
      ['Crowning', 'CNC crowning or deflection compensation keeps long bends more consistent along the length.'],
    ],
    easycat: [
      'ZYCO recommends EASYCAT ET16 and ET18 as high-value CNC controller options when the project needs cost-effective, stable, global-ready operation, practical CNC functionality and careful machine cost control.',
      'EASYCAT ET18 is suitable for standard and higher-configuration CNC press brake projects: standard 4+1 axes: Y1/Y2/X/R + crowning or deflection compensation; expandable up to 8+1 axes; 21.5-inch high-resolution touch screen; 2D drawing programming; CAD import.',
    ],
    terms: {
      value: 'High-value CNC', recommendedValue: 'Recommended advanced value CNC', compact: 'Compact CNC', graphical: 'Graphical CNC', advanced: 'Advanced CNC', premium: 'Premium CNC', entry: 'Entry CNC', advancedGraphical: 'Advanced graphical CNC', midCnc: 'Mid CNC', midHighCnc: 'Mid-high CNC', highEnd: 'High-end CNC', premium3d: 'Premium 3D CNC',
      et16Axis: 'Practical CNC axis control for standard machines', et18Axis: 'Standard 4+1 axes: Y1/Y2/X/R + crowning or deflection compensation; expandable up to 8+1 axes', standardSync: 'Common Y1/Y2 and backgauge configurations', multiAxis: 'Multi-axis CNC configurations', higherAxis: 'Higher-axis machine configurations', premiumAxis: 'Advanced multi-axis and high-end configurations', basicAxis: 'Basic CNC axis configurations', standardAxis: 'Standard CNC machine axes', standardMidAxis: 'Standard to mid CNC axes', expandedAxis: 'Expanded CNC configurations', higherAxisCnc: 'Higher-axis CNC configurations', multiAxisMachines: 'Multi-axis CNC machines', automationReady: 'Multi-axis and automation-ready configurations', advancedMultiAxis: 'Advanced multi-axis CNC configurations', highEndAxis: 'High-end multi-axis configurations',
      touch2d: 'Touch CNC operation and 2D-oriented production', et18Programming: '21.5-inch high-resolution touch screen, 2D drawing programming', touchCnc: 'Touch CNC programming', program2d: '2D graphical programming', advanced2d3d: 'Advanced 2D/3D-oriented programming workflow', program3d: '3D graphical programming level', simpleTouch: 'Simple touch programming', advancedGraphicalProgram: 'Advanced graphical programming', practicalCnc: 'Practical CNC programming', graphicalOperation: 'Graphical CNC operation', improvedGraphical: 'Improved graphical programming', advancedVisual: 'Advanced visual programming', advancedWorkflow: 'Advanced graphical workflow', highEndGraphical: 'High-end graphical programming', premiumGraphical: 'Premium graphical programming', program3dLevel: '3D programming level',
      practicalSupport: 'Practical production support', et18Cad: 'CAD import; suitable for higher-configuration CNC projects', basicWorkflow: 'Basic production workflow support', betterWorkflow: 'Improved file and production workflow support', cadOfflinePackage: 'CAD/offline support depending on package', cadOffline: 'CAD and offline programming workflow', dailyWorkflow: 'Limited to practical daily workflow', cadPackage: 'Practical CAD/programming workflow depending on setup', basicSupport: 'Basic support depending on setup',
      costExport: 'Cost-controlled CNC press brakes and export projects', standardAdvanced: 'Standard and higher-configuration CNC press brakes', dailyCnc: 'Reliable daily CNC bending', visualFactories: 'Factories needing stronger visual programming', complexFlexible: 'Complex bending and flexible production', premiumComplex: 'Complex parts, high-mix production and premium machines', economicalCnc: 'Standard economical CNC press brakes', generalVisual: 'General CNC production with better visualization', complexProfiles: 'Complex profiles and flexible production', standardCnc: 'Standard CNC bending', generalProduction: 'General production machines', flexibleProduction: 'Flexible production', complexProductivity: 'Complex bending and better productivity', higherEndMachines: 'Higher-end CNC press brakes', highMixMachines: 'High-mix production and advanced machines', complexData: 'Complex parts and production data workflow', industrialAdvanced: 'Advanced industrial CNC press brakes', premiumComplexProduction: 'Premium complex-part production',
      mid: 'Mid', midHigh: 'Mid-high', high: 'High',
    },
    brandSections: {
      delem: [['DA53TX', 'Compact CNC choice for standard synchronized press brakes and practical daily production.'], ['DA58TX', 'Better graphical programming comfort for factories that want stronger 2D operation.'], ['DA66S', 'Advanced CNC level for higher-configuration machines and more flexible programming.'], ['DA69S', 'Premium 3D-oriented choice for complex parts, offline workflow and high-end CNC machines.']],
      cybelec: [['CT8', 'Entry CNC option for economical standard configurations.'], ['CT12', 'Graphical CNC option for broader daily production and clearer 2D operation.'], ['CT15', 'Advanced graphical CNC option for more complex bending and higher productivity.']],
      esa: [['ESA630 / ESA640', 'Practical CNC levels for standard machine configurations.'], ['ESA650 / ESA660', 'Mid to advanced CNC options for expanded axes and stronger graphical workflow.'], ['ESA840 / ESA850', 'Advanced controller levels for higher-configuration CNC projects.'], ['ESA860 / ESA875 / ESA890', 'High-end and premium selections for complex parts, multi-axis machines and 3D/offline-oriented workflows.']],
    },
    scenarioRows: [
      ['Cost-controlled standard CNC press brake', 'High-value practical CNC', 'EASYCAT ET16, EASYCAT ET18', 'Balances stable CNC functionality, practical programming, global-ready use and machine cost control.'],
      ['Cost-controlled export CNC press brake', 'High-value CNC', 'EASYCAT ET16, EASYCAT ET18', 'Balances stable CNC functionality, practical programming and machine cost control.'],
      ['General cabinet, bracket and panel production', '2D graphical CNC', 'EASYCAT ET18, DA58TX, CT12, ESA650', '2D drawing programming covers most common profiles efficiently.'],
      ['Long bends requiring angle consistency', 'CNC with crowning or compensation', 'EASYCAT ET18, DA66S, ESA850', 'Y1/Y2 plus compensation improves repeatability across the bending length.'],
      ['Complex high-mix production', 'Advanced 3D / offline CNC', 'DA69S, ESA875, ESA890', '3D visualization and offline workflow reduce setup risk for complex jobs.'],
    ],
    mistakes: ['Selecting a controller by brand before defining the machine axis package.', 'Buying a 3D controller for simple parts where 2D CNC would control cost better.', 'Ignoring crowning control on long-bed machines and high-tonnage bending.', 'Underestimating Z1/Z2, X2/R2 and backgauge needs for complex or asymmetric parts.', 'Forgetting operator skill level, language workflow, service access and program storage requirements.'],
    advice: ['For standard CNC press brakes, first confirm Y1/Y2/X/R and whether CNC crowning is required.', 'For many export projects, EASYCAT ET16 or ET18 offers a practical balance between CNC capability, stability and machine cost.', 'Use DA69S, ESA875, ESA890 or similar high-end controllers when 3D programming, CAD/offline workflow and complex bend planning are essential to the customer.'],
    faq: [
      ['What is the difference between NC and CNC press brake controllers?', 'NC controllers usually manage simpler positioning and angle data with limited automatic compensation. CNC controllers coordinate synchronized ram control, backgauge axes, crowning or deflection compensation, graphical programming and production data for more stable bending.'],
      ['How many axes does a CNC press brake controller need?', 'A practical CNC press brake commonly starts from Y1/Y2 plus X and R. Higher configurations add Z1/Z2, X2/R2 and CNC crowning when parts require multi-station backgauge positioning, longer bends or stronger process repeatability.'],
      ['Is 2D graphical programming enough for most users?', 'Yes. For many sheet metal factories, 2D drawing programming is enough for standard profiles, boxes, brackets, panels and mixed daily production when the machine configuration is correctly selected.'],
      ['When should I choose a 3D press brake controller?', 'Choose a 3D controller when complex parts, collision review, multi-bend visualization, CAD-driven programming or offline engineering workflow are more important than the lowest machine cost.'],
      ['Is EASYCAT ET18 suitable for export CNC press brakes?', 'Yes. ET18 is a practical export-ready CNC option with a 21.5-inch high-resolution touch screen, standard 4+1 axes, expansion up to 8+1 axes, 2D drawing programming and CAD import.'],
      ['How do EASYCAT ET16 and ET18 help control machine cost?', 'They provide practical CNC functionality and stable operation without forcing every project into a high-end 3D controller. This helps ZYCO match machine configuration, user skill level and budget more accurately.'],
      ['What is the difference between Delem DA53TX and DA58TX?', 'DA53TX is generally selected for compact CNC configurations and essential touch operation. DA58TX is a higher graphical step with stronger programming comfort for users who need more visual operation and flexibility.'],
      ['Should I choose the controller first or the press brake configuration first?', 'Start from the press brake configuration and application. Material, bend length, precision target, backgauge requirement, crowning need and programming workflow should decide the controller level.'],
    ],
  },
}

const termSets = {
  zh: {
    value: '高价值 CNC', recommendedValue: '推荐高价值 CNC', compact: '紧凑型 CNC', graphical: '图形 CNC', advanced: '高级 CNC', premium: '高端 CNC', entry: '入门 CNC', advancedGraphical: '高级图形 CNC', midCnc: '中阶 CNC', midHighCnc: '中高阶 CNC', highEnd: '高端 CNC', premium3d: '高端 3D CNC',
    et16Axis: '适合标准机器的实用 CNC 轴控制', et18Axis: '标准 4+1 轴：Y1/Y2/X/R + 挠度补偿或变形补偿；可扩展至 8+1 轴', standardSync: '常见 Y1/Y2 和后挡料配置', multiAxis: '多轴 CNC 配置', higherAxis: '较高轴数机器配置', premiumAxis: '高级多轴和高端配置', basicAxis: '基础 CNC 轴配置', standardAxis: '标准 CNC 机器轴', standardMidAxis: '标准到中阶 CNC 轴', expandedAxis: '扩展 CNC 配置', higherAxisCnc: '较高轴数 CNC 配置', multiAxisMachines: '多轴 CNC 机器', automationReady: '多轴和自动化准备配置', advancedMultiAxis: '高级多轴 CNC 配置', highEndAxis: '高端多轴配置',
    touch2d: '触摸 CNC 操作和 2D 取向生产', et18Programming: '21.5 英寸高清触摸屏，2D 绘图编程', touchCnc: '触摸 CNC 编程', program2d: '2D 图形编程', advanced2d3d: '高级 2D/3D 取向编程流程', program3d: '3D 图形编程等级', simpleTouch: '简单触摸编程', advancedGraphicalProgram: '高级图形编程', practicalCnc: '实用 CNC 编程', graphicalOperation: '图形 CNC 操作', improvedGraphical: '改进图形编程', advancedVisual: '高级可视化编程', advancedWorkflow: '高级图形流程', highEndGraphical: '高端图形编程', premiumGraphical: '高端图形编程', program3dLevel: '3D 编程等级',
    practicalSupport: '实用生产支持', et18Cad: 'CAD 导入；适合较高配置 CNC 项目', basicWorkflow: '基础生产流程支持', betterWorkflow: '更好的文件和生产流程支持', cadOfflinePackage: '取决于配置的 CAD/离线支持', cadOffline: 'CAD 和离线编程流程', dailyWorkflow: '实用日常流程', cadPackage: '取决于配置的 CAD/编程流程', basicSupport: '取决于配置的基础支持',
    costExport: '成本受控 CNC 折弯机和出口项目', standardAdvanced: '标准和较高配置 CNC 折弯机', dailyCnc: '可靠日常 CNC 折弯', visualFactories: '需要更强可视化编程的工厂', complexFlexible: '复杂折弯和柔性生产', premiumComplex: '复杂零件、多品种生产和高端机器', economicalCnc: '标准经济型 CNC 折弯机', generalVisual: '具有更好可视化的一般 CNC 生产', complexProfiles: '复杂轮廓和柔性生产', standardCnc: '标准 CNC 折弯', generalProduction: '一般生产机器', flexibleProduction: '柔性生产', complexProductivity: '复杂折弯和更高效率', higherEndMachines: '较高端 CNC 折弯机', highMixMachines: '多品种生产和高级机器', complexData: '复杂零件和生产数据流程', industrialAdvanced: '高级工业 CNC 折弯机', premiumComplexProduction: '高端复杂零件生产',
    mid: '中等', midHigh: '中高', high: '高',
  },
  ru: {
    value: 'Высокоценный CNC', recommendedValue: 'Рекомендуемый advanced value CNC', compact: 'Компактный CNC', graphical: 'Графический CNC', advanced: 'Продвинутый CNC', premium: 'Премиальный CNC', entry: 'Начальный CNC', advancedGraphical: 'Продвинутый графический CNC', midCnc: 'Средний CNC', midHighCnc: 'Средне-высокий CNC', highEnd: 'High-end CNC', premium3d: 'Премиальный 3D CNC',
    et16Axis: 'Практичное управление осями CNC для стандартных машин', et18Axis: 'Стандартные 4+1 оси: Y1/Y2/X/R + crowning или компенсация прогиба; расширение до 8+1 осей', standardSync: 'Типовые конфигурации Y1/Y2 и заднего упора', multiAxis: 'Многоосевые CNC конфигурации', higherAxis: 'Конфигурации с большим числом осей', premiumAxis: 'Продвинутые многоосевые и high-end конфигурации', basicAxis: 'Базовые CNC оси', standardAxis: 'Стандартные CNC оси', standardMidAxis: 'Стандартные и средние CNC оси', expandedAxis: 'Расширенные CNC конфигурации', higherAxisCnc: 'CNC конфигурации с большим числом осей', multiAxisMachines: 'Многоосевые CNC машины', automationReady: 'Многоосевые и automation-ready конфигурации', advancedMultiAxis: 'Продвинутые многоосевые CNC конфигурации', highEndAxis: 'High-end многоосевые конфигурации',
    touch2d: 'Сенсорное CNC управление и 2D производство', et18Programming: '21.5-дюймовый сенсорный экран высокого разрешения, 2D чертежное программирование', touchCnc: 'Сенсорное CNC программирование', program2d: '2D графическое программирование', advanced2d3d: 'Продвинутый 2D/3D процесс', program3d: 'Уровень 3D графического программирования', simpleTouch: 'Простое сенсорное программирование', advancedGraphicalProgram: 'Продвинутое графическое программирование', practicalCnc: 'Практичное CNC программирование', graphicalOperation: 'Графическая CNC работа', improvedGraphical: 'Улучшенное графическое программирование', advancedVisual: 'Продвинутое визуальное программирование', advancedWorkflow: 'Продвинутый графический процесс', highEndGraphical: 'High-end графическое программирование', premiumGraphical: 'Премиальное графическое программирование', program3dLevel: 'Уровень 3D программирования',
    practicalSupport: 'Практичная производственная поддержка', et18Cad: 'CAD импорт; подходит для CNC проектов с более высокой конфигурацией', basicWorkflow: 'Базовая поддержка производственного процесса', betterWorkflow: 'Улучшенная поддержка файлов и производства', cadOfflinePackage: 'CAD/offline поддержка в зависимости от пакета', cadOffline: 'CAD и offline программирование', dailyWorkflow: 'Практичный ежедневный процесс', cadPackage: 'CAD/программный процесс по настройке', basicSupport: 'Базовая поддержка по настройке',
    costExport: 'CNC листогибы с контролем стоимости и экспортные проекты', standardAdvanced: 'Стандартные и более оснащенные CNC листогибы', dailyCnc: 'Надежная ежедневная CNC гибка', visualFactories: 'Цеха с потребностью в лучшей визуализации', complexFlexible: 'Сложная гибка и гибкое производство', premiumComplex: 'Сложные детали, high-mix и премиальные машины', economicalCnc: 'Стандартные экономичные CNC листогибы', generalVisual: 'Общее CNC производство с лучшей визуализацией', complexProfiles: 'Сложные профили и гибкое производство', standardCnc: 'Стандартная CNC гибка', generalProduction: 'Общие производственные машины', flexibleProduction: 'Гибкое производство', complexProductivity: 'Сложная гибка и лучшая производительность', higherEndMachines: 'Более высокие CNC листогибы', highMixMachines: 'High-mix производство и продвинутые машины', complexData: 'Сложные детали и производственные данные', industrialAdvanced: 'Продвинутые промышленные CNC листогибы', premiumComplexProduction: 'Премиальное производство сложных деталей',
    mid: 'Средняя', midHigh: 'Средне-высокая', high: 'Высокая',
  },
}

termSets.es = {
  value: 'CNC de alto valor', recommendedValue: 'CNC avanzado de valor recomendado', compact: 'CNC compacto', graphical: 'CNC gráfico', advanced: 'CNC avanzado', premium: 'CNC premium', entry: 'CNC inicial', advancedGraphical: 'CNC gráfico avanzado', midCnc: 'CNC medio', midHighCnc: 'CNC medio-alto', highEnd: 'CNC high-end', premium3d: 'CNC 3D premium',
  et16Axis: 'Control práctico de ejes CNC para máquinas estándar', et18Axis: '4+1 ejes estándar: Y1/Y2/X/R + crowning o compensación de deflexión; ampliable hasta 8+1 ejes', standardSync: 'Configuraciones comunes Y1/Y2 y tope trasero', multiAxis: 'Configuraciones CNC multieje', higherAxis: 'Configuraciones con más ejes', premiumAxis: 'Configuraciones multieje avanzadas y high-end', basicAxis: 'Configuraciones básicas CNC', standardAxis: 'Ejes CNC estándar', standardMidAxis: 'Ejes CNC estándar a medios', expandedAxis: 'Configuraciones CNC ampliadas', higherAxisCnc: 'Configuraciones CNC con más ejes', multiAxisMachines: 'Máquinas CNC multieje', automationReady: 'Configuraciones multieje y listas para automatización', advancedMultiAxis: 'Configuraciones CNC multieje avanzadas', highEndAxis: 'Configuraciones multieje high-end',
  touch2d: 'Operación táctil CNC y producción orientada a 2D', et18Programming: 'Pantalla táctil de alta resolución de 21.5 pulgadas, programación por dibujo 2D', touchCnc: 'Programación CNC táctil', program2d: 'Programación gráfica 2D', advanced2d3d: 'Flujo avanzado 2D/3D', program3d: 'Programación gráfica 3D', simpleTouch: 'Programación táctil simple', advancedGraphicalProgram: 'Programación gráfica avanzada', practicalCnc: 'Programación CNC práctica', graphicalOperation: 'Operación CNC gráfica', improvedGraphical: 'Programación gráfica mejorada', advancedVisual: 'Programación visual avanzada', advancedWorkflow: 'Flujo gráfico avanzado', highEndGraphical: 'Programación gráfica high-end', premiumGraphical: 'Programación gráfica premium', program3dLevel: 'Programación 3D',
  practicalSupport: 'Soporte práctico de producción', et18Cad: 'Importación CAD; apto para proyectos CNC de mayor configuración', basicWorkflow: 'Soporte básico de producción', betterWorkflow: 'Mejor soporte de archivos y producción', cadOfflinePackage: 'Soporte CAD/offline según paquete', cadOffline: 'Programación CAD y offline', dailyWorkflow: 'Flujo diario práctico', cadPackage: 'Flujo CAD/programación según configuración', basicSupport: 'Soporte básico según configuración',
  costExport: 'Plegadoras CNC con costo controlado y proyectos de exportación', standardAdvanced: 'Plegadoras CNC estándar y de mayor configuración', dailyCnc: 'Plegado CNC diario fiable', visualFactories: 'Fábricas que necesitan más visualización', complexFlexible: 'Plegado complejo y producción flexible', premiumComplex: 'Piezas complejas, high-mix y máquinas premium', economicalCnc: 'Plegadoras CNC económicas estándar', generalVisual: 'Producción general con mejor visualización', complexProfiles: 'Perfiles complejos y producción flexible', standardCnc: 'Plegado CNC estándar', generalProduction: 'Máquinas de producción general', flexibleProduction: 'Producción flexible', complexProductivity: 'Plegado complejo y productividad', higherEndMachines: 'Plegadoras CNC de mayor nivel', highMixMachines: 'Producción high-mix y máquinas avanzadas', complexData: 'Piezas complejas y datos de producción', industrialAdvanced: 'Plegadoras CNC industriales avanzadas', premiumComplexProduction: 'Producción premium de piezas complejas',
  mid: 'Media', midHigh: 'Media-alta', high: 'Alta',
}

termSets.tr = {
  value: 'Yüksek değerli CNC', recommendedValue: 'Önerilen gelişmiş değer CNC', compact: 'Kompakt CNC', graphical: 'Grafik CNC', advanced: 'Gelişmiş CNC', premium: 'Premium CNC', entry: 'Giriş CNC', advancedGraphical: 'Gelişmiş grafik CNC', midCnc: 'Orta CNC', midHighCnc: 'Orta-yüksek CNC', highEnd: 'High-end CNC', premium3d: 'Premium 3D CNC',
  et16Axis: 'Standart makineler için pratik CNC eksen kontrolü', et18Axis: 'Standart 4+1 eksen: Y1/Y2/X/R + crowning veya sehim kompanzasyonu; 8+1 eksene kadar genişler', standardSync: 'Yaygın Y1/Y2 ve arka dayama konfigürasyonları', multiAxis: 'Çok eksenli CNC konfigürasyonları', higherAxis: 'Daha yüksek eksenli makine konfigürasyonları', premiumAxis: 'Gelişmiş çok eksenli ve high-end konfigürasyonlar', basicAxis: 'Temel CNC eksen konfigürasyonları', standardAxis: 'Standart CNC makine eksenleri', standardMidAxis: 'Standarttan orta seviyeye CNC eksenleri', expandedAxis: 'Genişletilmiş CNC konfigürasyonları', higherAxisCnc: 'Daha yüksek eksenli CNC konfigürasyonları', multiAxisMachines: 'Çok eksenli CNC makineler', automationReady: 'Çok eksenli ve otomasyona hazır konfigürasyonlar', advancedMultiAxis: 'Gelişmiş çok eksenli CNC konfigürasyonları', highEndAxis: 'High-end çok eksenli konfigürasyonlar',
  touch2d: 'Dokunmatik CNC kullanım ve 2D odaklı üretim', et18Programming: '21.5 inç yüksek çözünürlüklü dokunmatik ekran, 2D çizim programlama', touchCnc: 'Dokunmatik CNC programlama', program2d: '2D grafik programlama', advanced2d3d: 'Gelişmiş 2D/3D odaklı akış', program3d: '3D grafik programlama seviyesi', simpleTouch: 'Basit dokunmatik programlama', advancedGraphicalProgram: 'Gelişmiş grafik programlama', practicalCnc: 'Pratik CNC programlama', graphicalOperation: 'Grafik CNC kullanım', improvedGraphical: 'Geliştirilmiş grafik programlama', advancedVisual: 'Gelişmiş görsel programlama', advancedWorkflow: 'Gelişmiş grafik akış', highEndGraphical: 'High-end grafik programlama', premiumGraphical: 'Premium grafik programlama', program3dLevel: '3D programlama seviyesi',
  practicalSupport: 'Pratik üretim desteği', et18Cad: 'CAD import; yüksek konfigürasyonlu CNC projelerine uygun', basicWorkflow: 'Temel üretim desteği', betterWorkflow: 'Daha iyi dosya ve üretim desteği', cadOfflinePackage: 'Pakete bağlı CAD/offline destek', cadOffline: 'CAD ve offline programlama', dailyWorkflow: 'Pratik günlük akış', cadPackage: 'Kuruluma bağlı CAD/programlama akışı', basicSupport: 'Kuruluma bağlı temel destek',
  costExport: 'Maliyet kontrollü CNC abkant ve ihracat projeleri', standardAdvanced: 'Standart ve yüksek konfigürasyonlu CNC abkantlar', dailyCnc: 'Güvenilir günlük CNC büküm', visualFactories: 'Daha güçlü görsel programlama isteyen fabrikalar', complexFlexible: 'Karmaşık büküm ve esnek üretim', premiumComplex: 'Karmaşık parçalar ve premium makineler', economicalCnc: 'Standart ekonomik CNC abkantlar', generalVisual: 'Daha iyi görselleştirmeli genel üretim', complexProfiles: 'Karmaşık profiller ve esnek üretim', standardCnc: 'Standart CNC büküm', generalProduction: 'Genel üretim makineleri', flexibleProduction: 'Esnek üretim', complexProductivity: 'Karmaşık büküm ve verimlilik', higherEndMachines: 'Daha yüksek CNC abkantlar', highMixMachines: 'High-mix üretim ve gelişmiş makineler', complexData: 'Karmaşık parçalar ve üretim verileri', industrialAdvanced: 'Gelişmiş endüstriyel CNC abkantlar', premiumComplexProduction: 'Premium karmaşık parça üretimi',
  mid: 'Orta', midHigh: 'Orta-yüksek', high: 'Yüksek',
}

termSets.id = {
  value: 'CNC nilai tinggi', recommendedValue: 'CNC nilai lanjut direkomendasikan', compact: 'CNC kompak', graphical: 'CNC grafis', advanced: 'CNC lanjut', premium: 'CNC premium', entry: 'CNC entry', advancedGraphical: 'CNC grafis lanjut', midCnc: 'CNC menengah', midHighCnc: 'CNC menengah-tinggi', highEnd: 'CNC high-end', premium3d: 'CNC 3D premium',
  et16Axis: 'Kontrol sumbu CNC praktis untuk mesin standar', et18Axis: 'Standar 4+1 sumbu: Y1/Y2/X/R + crowning atau kompensasi defleksi; dapat diperluas hingga 8+1 sumbu', standardSync: 'Konfigurasi umum Y1/Y2 dan backgauge', multiAxis: 'Konfigurasi CNC multi-sumbu', higherAxis: 'Konfigurasi mesin dengan sumbu lebih banyak', premiumAxis: 'Konfigurasi multi-sumbu dan high-end', basicAxis: 'Konfigurasi sumbu CNC dasar', standardAxis: 'Sumbu mesin CNC standar', standardMidAxis: 'Sumbu CNC standar hingga menengah', expandedAxis: 'Konfigurasi CNC diperluas', higherAxisCnc: 'Konfigurasi CNC sumbu lebih tinggi', multiAxisMachines: 'Mesin CNC multi-sumbu', automationReady: 'Konfigurasi multi-sumbu dan siap otomasi', advancedMultiAxis: 'Konfigurasi CNC multi-sumbu lanjut', highEndAxis: 'Konfigurasi multi-sumbu high-end',
  touch2d: 'Operasi CNC sentuh dan produksi berorientasi 2D', et18Programming: 'Layar sentuh resolusi tinggi 21.5 inci, pemrograman gambar 2D', touchCnc: 'Pemrograman CNC sentuh', program2d: 'Pemrograman grafis 2D', advanced2d3d: 'Alur 2D/3D lanjut', program3d: 'Level pemrograman grafis 3D', simpleTouch: 'Pemrograman sentuh sederhana', advancedGraphicalProgram: 'Pemrograman grafis lanjut', practicalCnc: 'Pemrograman CNC praktis', graphicalOperation: 'Operasi CNC grafis', improvedGraphical: 'Pemrograman grafis ditingkatkan', advancedVisual: 'Pemrograman visual lanjut', advancedWorkflow: 'Alur grafis lanjut', highEndGraphical: 'Pemrograman grafis high-end', premiumGraphical: 'Pemrograman grafis premium', program3dLevel: 'Level pemrograman 3D',
  practicalSupport: 'Dukungan produksi praktis', et18Cad: 'Impor CAD; cocok untuk proyek CNC konfigurasi lebih tinggi', basicWorkflow: 'Dukungan produksi dasar', betterWorkflow: 'Dukungan file dan produksi lebih baik', cadOfflinePackage: 'Dukungan CAD/offline tergantung paket', cadOffline: 'Pemrograman CAD dan offline', dailyWorkflow: 'Alur harian praktis', cadPackage: 'Alur CAD/program tergantung setup', basicSupport: 'Dukungan dasar tergantung setup',
  costExport: 'CNC press brake dengan biaya terkontrol dan proyek ekspor', standardAdvanced: 'CNC press brake standar dan konfigurasi lebih tinggi', dailyCnc: 'Bending CNC harian yang andal', visualFactories: 'Pabrik yang membutuhkan visualisasi lebih kuat', complexFlexible: 'Bending kompleks dan produksi fleksibel', premiumComplex: 'Part kompleks dan mesin premium', economicalCnc: 'CNC press brake ekonomis standar', generalVisual: 'Produksi umum dengan visualisasi lebih baik', complexProfiles: 'Profil kompleks dan produksi fleksibel', standardCnc: 'Bending CNC standar', generalProduction: 'Mesin produksi umum', flexibleProduction: 'Produksi fleksibel', complexProductivity: 'Bending kompleks dan produktivitas', higherEndMachines: 'CNC press brake level lebih tinggi', highMixMachines: 'Produksi high-mix dan mesin lanjut', complexData: 'Part kompleks dan data produksi', industrialAdvanced: 'CNC press brake industri lanjut', premiumComplexProduction: 'Produksi premium part kompleks',
  mid: 'Menengah', midHigh: 'Menengah-tinggi', high: 'Tinggi',
}

const makeComparisonRows = (terms) => controllerModels.map(([brand, model, level, axis, programming, cad, best, cost]) => [
  brand,
  model,
  terms[level],
  terms[axis],
  terms[programming],
  terms[cad],
  terms[best],
  terms[cost] || cost,
])

packs.en.comparisonRows = makeComparisonRows(packs.en.terms)

const localizedPacks = {
  zh: {
    back: '返回工程工具中心',
    eyebrow: '工程指南',
    title: '折弯机 CNC 控制系统选型指南：轴控制、2D/3D 编程和成本控制',
    subtitle: '根据机器配置、轴数、编程流程、稳定性、应用场景和机器成本控制选择折弯机控制系统。',
    seoTitle: '折弯机控制系统选型指南 | EASYCAT、Delem、Cybelec 与 ESA 对比',
    seoDescription: '了解如何根据轴配置、2D/3D 编程、离线软件、稳定性、机器成本控制和折弯应用选择合适的折弯机控制系统，并对比 EASYCAT ET16/ET18、Delem、Cybelec 和 ESA CNC 系统。',
    keywords: '折弯机 CNC 控制系统选型, 折弯机轴控制, EASYCAT ET16, EASYCAT ET18, Delem DA53TX, Delem DA58TX, Cybelec CT12, ESA折弯机控制系统',
    labels: { quickAnswer: '快速建议：应该选择哪种控制系统？', logic: '从机器配置开始，而不是先看品牌', ncCnc: 'CNC 控制系统等级：实用型 CNC、2D CNC 和 3D CNC', axes: '理解折弯机轴控制', easycat: '高性价比 CNC 推荐：EASYCAT ET16 和 ET18', comparison: '控制系统对比：EASYCAT vs Delem vs Cybelec vs ESA', delem: 'Delem 控制系统选择', cybelec: 'Cybelec 控制系统选择', esa: 'ESA 控制系统选择', scenarios: '按应用场景推荐控制系统', mistakes: '选择折弯机控制系统的常见错误', advice: 'ZYCO 实用采购建议', faq: '常见问题', related: '相关工程工具' },
    quickHeaders: ['生产需求', '推荐控制系统等级', '建议型号'],
    comparisonHeaders: ['品牌', '型号', '建议等级', '轴控制能力', '编程等级', 'CAD / 离线支持', '最佳应用', '成本定位'],
    scenarioHeaders: ['应用场景', '推荐控制类型', '推荐型号', '适合原因'],
    intro: ['最合适的控制系统不一定是市场上价格最高的屏幕，而是能够匹配折弯机结构、轴配置、操作流程、零件复杂度和目标售价的系统。', '在 ZYCO 项目中，控制系统选型属于整机工程配置的一部分。应先确定 Y1/Y2 同步、X/R 后挡料、Z1/Z2 挡指、X2/R2 独立运动和 CNC 挠度补偿，再比较品牌。'],
    quickRows: [['成本受控的标准 CNC 折弯机', '高价值实用 CNC', 'EASYCAT ET16、EASYCAT ET18'], ['标准出口 CNC 折弯机', '带 Y1/Y2/X/R 和补偿的高性价比 CNC', 'EASYCAT ET16、EASYCAT ET18、DA53TX'], ['日常多品种钣金生产', '2D 图形 CNC', 'EASYCAT ET18、DA58TX、CT12、ESA650'], ['复杂零件和离线流程', '高级 2D / 3D CNC', 'DA66S、DA69S、CT15、ESA860、ESA890'], ['高端自动化和多品种生产', '高端多轴 CNC', 'DA69S、ESA875、ESA890']],
    logic: ['先从所需机器配置开始：折弯长度、吨位、液压同步、后挡料行程、挠度补偿方式、模具方案和生产组合。', '机器配置明确后，再选择能够真正使用这些轴和功能的控制系统等级。高端控制系统无法弥补机器缺少必要轴硬件的问题，而入门级控制系统也可能限制高配置机器的能力。'],
    ncCncCards: [['NC 控制系统', '适合轴需求有限、成本敏感且工件相对简单重复的折弯。它能降低整机价格，但工艺指导和自动化能力较少。'], ['CNC 控制系统', '当 Y1/Y2 同步、后挡料轴、补偿、程序存储、图形编程和批量重复控制很重要时，建议选择 CNC。'], ['2D CNC', '多数工厂的实用选择，操作者可以绘制轮廓、检查折弯步骤并生产标准零件，而不必使用完整 3D 流程。'], ['3D CNC', '适合复杂零件、碰撞检查、CAD 驱动工艺规划，以及更重视离线编程效率而非最低初始成本的工厂。']],
    axes: [['Y1/Y2', '左右油缸独立同步控制，用于实现精确 CNC 折弯。'], ['X', '后挡料深度定位，用于控制翻边尺寸。'], ['R', '后挡料高度调节，用于适应不同折弯工位和零件几何。'], ['Z1/Z2', '可移动后挡料挡指，用于宽板、锥形件或多工位零件。'], ['X2/R2', '第二组后挡料独立轴，用于非对称定位和高级零件。'], ['挠度补偿', 'CNC 挠度补偿或变形补偿可提高长工件全长角度一致性。']],
    easycat: ['当项目需要高性价比、稳定、面向全球市场、具备实用 CNC 功能并严格控制机器成本时，ZYCO 推荐 EASYCAT ET16 和 ET18 作为高价值 CNC 控制系统方案。', 'EASYCAT ET18 适合标准和较高配置 CNC 折弯机项目：标准 4+1 轴：Y1/Y2/X/R + 挠度补偿或变形补偿；可扩展至 8+1 轴；21.5 英寸高清触摸屏；2D 绘图编程；支持 CAD 导入。'],
    brandSections: { delem: [['DA53TX', '适合标准同步折弯机和日常生产的紧凑型 CNC 选择。'], ['DA58TX', '为需要更强 2D 操作体验的工厂提供更好的图形编程舒适性。'], ['DA66S', '适合更高配置机器和更灵活编程需求的高级 CNC 等级。'], ['DA69S', '面向复杂零件、离线流程和高端 CNC 机器的高端 3D 取向选择。']], cybelec: [['CT8', '适合经济型标准配置的入门 CNC 选择。'], ['CT12', '适合更广泛日常生产和清晰 2D 操作的图形 CNC 选择。'], ['CT15', '适合更复杂折弯和更高效率需求的高级图形 CNC 选择。']], esa: [['ESA630 / ESA640', '适合标准机器配置的实用 CNC 等级。'], ['ESA650 / ESA660', '适合扩展轴配置和更强图形流程的中高阶 CNC 选择。'], ['ESA840 / ESA850', '适合较高配置 CNC 项目的高级控制等级。'], ['ESA860 / ESA875 / ESA890', '适合复杂零件、多轴机器和 3D/离线流程的高端选择。']] },
    scenarioRows: [['成本受控的标准 CNC 折弯', '高价值实用 CNC', 'EASYCAT ET16、EASYCAT ET18', '平衡稳定 CNC 功能、实用编程、全球化使用和机器成本控制。'], ['极简单定位折弯', '基础 NC 仅作为有限功能替代方案', '基础 NC', '仅适合轴需求极少、工艺非常简单且预算极低的场景。'], ['机柜、支架和面板生产', '2D 图形 CNC', 'EASYCAT ET18、DA58TX、CT12、ESA650', '2D 绘图编程能高效覆盖多数常见轮廓。'], ['需要长工件角度一致性', '带挠度补偿的 CNC', 'EASYCAT ET18、DA66S、ESA850', 'Y1/Y2 加补偿可提高全长重复精度。'], ['复杂多品种生产', '高级 3D / 离线 CNC', 'DA69S、ESA875、ESA890', '3D 可视化和离线流程可降低复杂作业的调试风险。']],
    mistakes: ['先按品牌选控制系统，而不是先定义机器轴配置。', '简单零件选择 3D 控制系统，导致本可由 2D CNC 更好控制的成本上升。', '在长床身和高吨位折弯中忽略挠度补偿控制。', '低估复杂或非对称零件对 Z1/Z2、X2/R2 和后挡料的需求。', '忽略操作者能力、语言流程、服务支持和程序存储需求。'],
    advice: ['标准 CNC 折弯机应先确认 Y1/Y2/X/R 以及是否需要 CNC 挠度补偿。', '对许多出口项目，EASYCAT ET16 或 ET18 在 CNC 能力、稳定性和机器成本之间提供实用平衡。', '当客户确实需要 3D 编程、CAD/离线流程和复杂折弯规划时，再选择 DA69S、ESA875、ESA890 或同级高端控制系统。'],
    faq: [['NC 与 CNC 折弯机控制系统有什么区别？', 'NC 通常管理较简单的位置和角度数据，自动补偿能力有限。CNC 可协调 Y1/Y2 同步、后挡料轴、挠度或变形补偿、图形编程和生产数据，使折弯更稳定。'], ['CNC 折弯机控制系统需要多少轴？', '实用 CNC 折弯机通常从 Y1/Y2 加 X、R 开始。更高配置会增加 Z1/Z2、X2/R2 和 CNC 挠度补偿，以满足多工位定位、长工件或更强重复性的需求。'], ['2D 图形编程对多数用户够用吗？', '够用。对许多钣金工厂，机器配置正确时，2D 绘图编程足以覆盖标准轮廓、箱体、支架、面板和日常多品种生产。'], ['什么时候应该选择 3D 折弯机控制系统？', '当复杂零件、碰撞检查、多道折弯可视化、CAD 驱动编程或离线工程流程比最低机器成本更重要时，应选择 3D 控制系统。'], ['EASYCAT ET18 适合出口 CNC 折弯机吗？', '适合。ET18 是实用的出口就绪 CNC 方案，具备 21.5 英寸高清触摸屏、标准 4+1 轴、可扩展至 8+1 轴、2D 绘图编程和 CAD 导入。'], ['EASYCAT ET16 和 ET18 如何帮助控制机器成本？', '它们提供实用 CNC 功能和稳定运行，不必让每个项目都采用高端 3D 控制系统，从而帮助 ZYCO 更准确匹配机器配置、用户能力和预算。'], ['Delem DA53TX 和 DA58TX 有什么区别？', 'DA53TX 通常用于紧凑 CNC 配置和基础触摸操作。DA58TX 是更高的图形化等级，适合需要更强可视化和灵活性的用户。'], ['应该先选择控制系统还是先确定折弯机配置？', '应先从折弯机配置和应用开始。材料、折弯长度、精度目标、后挡料需求、挠度补偿需求和编程流程应决定控制系统等级。']],
  },
}

const simpleLocalized = {
  ru: ['Назад к инженерным инструментам', 'Инженерное руководство', 'Руководство по выбору CNC-контроллера листогиба: оси, 2D/3D программирование и контроль стоимости', 'Выбирайте контроллер по конфигурации станка, числу осей, рабочему процессу программирования, стабильности, применению и стоимости машины.'],
  es: ['Volver a herramientas de ingeniería', 'Guía de ingeniería', 'Guía de selección de controlador CNC para plegadora: ejes, programación 2D/3D y control de costo', 'Seleccione el control por configuración de máquina, número de ejes, flujo de programación, estabilidad, aplicación y control del costo.'],
  tr: ['Mühendislik araçlarına dön', 'Mühendislik kılavuzu', 'Abkant pres CNC kontrol seçim kılavuzu: eksen kontrolü, 2D/3D programlama ve maliyet kontrolü', 'Kontrol sistemini makine konfigürasyonu, eksen sayısı, programlama akışı, kararlılık, uygulama ve makine maliyetine göre seçin.'],
  id: ['Kembali ke alat teknik', 'Panduan Teknik', 'Panduan pemilihan controller CNC press brake: kontrol sumbu, pemrograman 2D/3D, dan kontrol biaya', 'Pilih controller berdasarkan konfigurasi mesin, jumlah sumbu, alur pemrograman, stabilitas, aplikasi, dan kontrol biaya mesin.'],
}

const labelsByLanguage = {
  ru: ['Краткий ответ: какой контроллер выбрать?', 'Начинайте с конфигурации станка, а не с бренда', 'Уровни CNC-контроллеров: практичный CNC, 2D CNC и 3D CNC', 'Понимание управления осями листогиба', 'Экономичные CNC решения: EASYCAT ET16 и ET18', 'Сравнение контроллеров: EASYCAT vs Delem vs Cybelec vs ESA', 'Выбор контроллеров Delem', 'Выбор контроллеров Cybelec', 'Выбор контроллеров ESA', 'Рекомендации по сценариям применения', 'Типичные ошибки при выборе контроллера', 'Практические советы ZYCO', 'Частые вопросы', 'Связанные инженерные инструменты'],
  es: ['Respuesta rápida: ¿qué control elegir?', 'Empiece por la configuración de la máquina, no por la marca', 'Niveles de control CNC: CNC práctico, CNC 2D y CNC 3D', 'Comprender el control de ejes', 'Opciones CNC rentables: EASYCAT ET16 y ET18', 'Comparación: EASYCAT vs Delem vs Cybelec vs ESA', 'Selección de controles Delem', 'Selección de controles Cybelec', 'Selección de controles ESA', 'Recomendaciones por aplicación', 'Errores comunes al elegir un control', 'Consejos prácticos de ZYCO', 'Preguntas frecuentes', 'Herramientas de ingeniería relacionadas'],
  tr: ['Hızlı cevap: hangi kontrol seçilmeli?', 'Markadan önce makine konfigürasyonundan başlayın', 'CNC kontrol seviyeleri: pratik CNC, 2D CNC ve 3D CNC', 'Abkant pres eksen kontrolünü anlamak', 'Uygun maliyetli CNC seçenekleri: EASYCAT ET16 ve ET18', 'Karşılaştırma: EASYCAT vs Delem vs Cybelec vs ESA', 'Delem kontrol seçimi', 'Cybelec kontrol seçimi', 'ESA kontrol seçimi', 'Uygulama senaryosuna göre öneriler', 'Kontrol seçerken yaygın hatalar', 'ZYCO pratik satın alma önerileri', 'Sık sorulan sorular', 'İlgili mühendislik araçları'],
  id: ['Jawaban cepat: controller mana yang dipilih?', 'Mulai dari konfigurasi mesin, bukan nama merek', 'Level controller CNC: CNC praktis, CNC 2D, dan CNC 3D', 'Memahami kontrol sumbu press brake', 'Opsi CNC hemat biaya: EASYCAT ET16 dan ET18', 'Perbandingan: EASYCAT vs Delem vs Cybelec vs ESA', 'Pemilihan controller Delem', 'Pemilihan controller Cybelec', 'Pemilihan controller ESA', 'Rekomendasi menurut aplikasi', 'Kesalahan umum saat memilih controller', 'Saran pembelian praktis dari ZYCO', 'Pertanyaan umum', 'Alat teknik terkait'],
}

const makeBasicPack = (language) => {
  const [back, eyebrow, title, subtitle] = simpleLocalized[language]
  const [quickAnswer, logic, ncCnc, axes, easycat, comparison, delem, cybelec, esa, scenarios, mistakes, advice, faq, related] = labelsByLanguage[language]
  const t = termSets[language]
  const common = {
    ru: {
      seoTitle: 'Выбор контроллера листогиба | Сравнение EASYCAT, Delem, Cybelec и ESA',
      seoDescription: 'Как выбрать контроллер листогиба по осям, 2D/3D программированию, offline ПО, стабильности, контролю стоимости и задачам гибки.',
      quickHeaders: ['Производственная задача', 'Рекомендуемый уровень контроллера', 'Предлагаемые модели'],
      comparisonHeaders: ['Бренд', 'Модель', 'Уровень', 'Возможности осей', 'Уровень программирования', 'CAD / offline поддержка', 'Лучшее применение', 'Стоимость'],
      scenarioHeaders: ['Сценарий применения', 'Рекомендуемый тип', 'Модели', 'Почему подходит'],
      intro: ['Лучший контроллер - не самый дорогой экран на рынке. Это система, которая соответствует конструкции листогиба, пакету осей, работе оператора, сложности деталей и целевой цене.', 'В проектах ZYCO выбор контроллера является частью инженерной конфигурации машины. Сначала определяют Y1/Y2, X/R, Z1/Z2, X2/R2 и CNC компенсацию прогиба, затем сравнивают бренды.'],
      quickRows: [['Стандартный CNC листогиб с контролем стоимости', 'Практичный CNC высокого ценностного уровня', 'EASYCAT ET16, EASYCAT ET18'], ['Стандартный экспортный CNC листогиб', 'Экономичный CNC с Y1/Y2/X/R и компенсацией', 'EASYCAT ET16, EASYCAT ET18, DA53TX'], ['Смешанное ежедневное производство', '2D графический CNC', 'EASYCAT ET18, DA58TX, CT12, ESA650'], ['Сложные детали и offline процесс', 'Продвинутый 2D / 3D CNC', 'DA66S, DA69S, CT15, ESA860, ESA890'], ['Премиальная автоматизация и high-mix', 'Высокий многоосевой CNC', 'DA69S, ESA875, ESA890']],
      logic: ['Начните с требуемой конфигурации: длина гибки, тоннаж, гидравлическая синхронизация, ход заднего упора, тип компенсации, оснастка и производственная смесь.', 'Когда конфигурация ясна, выберите уровень контроллера, который реально использует эти оси и функции.'],
      ncCncCards: [['NC контроллеры', 'Подходят для простых повторяемых деталей, когда важна низкая цена и требуется мало осей.'], ['CNC контроллеры', 'Рекомендуются для Y1/Y2, осей заднего упора, компенсации, памяти программ, графики и серийной повторяемости.'], ['2D CNC', 'Практичный выбор для большинства производств: оператор рисует профиль и проверяет шаги без полного 3D процесса.'], ['3D CNC', 'Подходит для сложных деталей, проверки столкновений, CAD-процесса и offline программирования.']],
      axes: [['Y1/Y2', 'Независимая синхронизация левой и правой стороны ползуна для точной CNC гибки.'], ['X', 'Позиция глубины заднего упора для размера полки.'], ['R', 'Высота заднего упора для разных станций и геометрии.'], ['Z1/Z2', 'Перемещаемые пальцы для широких, конических и многостанционных деталей.'], ['X2/R2', 'Независимые вторые оси для асимметричной установки и сложных деталей.'], ['Компенсация прогиба', 'CNC crowning или компенсация прогиба удерживает угол на длинных гибах.']],
      easycat: ['ZYCO рекомендует EASYCAT ET16 и ET18 как высокоценные CNC решения, когда проекту нужны экономичность, стабильность, готовность к глобальной эксплуатации, практичные функции CNC и контроль стоимости машины.', 'EASYCAT ET18 подходит для стандартных и более оснащенных CNC листогибов: стандартные 4+1 оси Y1/Y2/X/R + crowning или компенсация прогиба; расширение до 8+1 осей; 21.5-дюймовый сенсорный экран высокого разрешения; 2D чертежное программирование; CAD импорт.'],
      scenarioRows: [['Стандартная CNC гибка с контролем стоимости', 'Практичный CNC высокого ценностного уровня', 'EASYCAT ET16, EASYCAT ET18', 'Балансирует стабильные CNC функции, практичное программирование, готовность к глобальному использованию и стоимость машины.'], ['Крайне простое позиционирование', 'Базовый NC только как ограниченная альтернатива', 'Базовый NC', 'Подходит только для очень простой гибки с минимальными осями и крайне жестким бюджетом.'], ['Шкафы, кронштейны и панели', '2D графический CNC', 'EASYCAT ET18, DA58TX, CT12, ESA650', '2D чертежное программирование покрывает большинство профилей.'], ['Длинные гибы с требованием угла', 'CNC с crowning или компенсацией', 'EASYCAT ET18, DA66S, ESA850', 'Y1/Y2 плюс компенсация повышают повторяемость по длине.'], ['Сложное high-mix производство', 'Продвинутый 3D / offline CNC', 'DA69S, ESA875, ESA890', '3D визуализация и offline процесс снижают риск настройки.']],
      faq: [['Чем отличаются NC и CNC контроллеры листогиба?', 'NC обычно управляет простым позиционированием и углами. CNC координирует Y1/Y2, задний упор, компенсацию, графическое программирование и производственные данные.'], ['Сколько осей нужно CNC листогибу?', 'Практичная конфигурация часто начинается с Y1/Y2 плюс X и R. Более высокие уровни добавляют Z1/Z2, X2/R2 и CNC crowning.'], ['Достаточно ли 2D графического программирования?', 'Да, для многих производств 2D достаточно для профилей, коробов, кронштейнов, панелей и смешанных заказов.'], ['Когда выбирать 3D контроллер?', 'Когда важны сложные детали, проверка столкновений, CAD-процесс и offline программирование.'], ['Подходит ли EASYCAT ET18 для экспортных CNC листогибов?', 'Да. ET18 имеет экран 21.5 дюйма, стандартные 4+1 оси, расширение до 8+1, 2D программирование и CAD импорт.'], ['Как EASYCAT ET16 и ET18 помогают контролировать стоимость?', 'Они дают практичные CNC функции и стабильность без необходимости ставить дорогой 3D контроллер на каждый проект.'], ['Чем отличаются Delem DA53TX и DA58TX?', 'DA53TX подходит для компактных CNC конфигураций. DA58TX дает более сильную графику и удобство программирования.'], ['Что выбрать первым: контроллер или конфигурацию листогиба?', 'Сначала конфигурацию и применение: материал, длину, точность, задний упор, компенсацию и workflow.']],
    },
  }[language] || {}

  return {
    ...packs.en,
    ...common,
    back,
    eyebrow,
    title,
    subtitle,
    labels: { quickAnswer, logic, ncCnc, axes, easycat, comparison, delem, cybelec, esa, scenarios, mistakes, advice, faq, related },
    terms: t,
    comparisonRows: makeComparisonRows(t),
  }
}

;['ru', 'es', 'tr', 'id'].forEach((language) => {
  packs[language] = makeBasicPack(language)
})

Object.assign(packs.es, {
  seoTitle: 'Guía de selección de control para plegadora | Comparación EASYCAT, Delem, Cybelec y ESA',
  seoDescription: 'Aprenda a elegir el control adecuado según ejes, programación 2D/3D, software offline, estabilidad, control del costo y aplicaciones de plegado. Compare EASYCAT ET16/ET18, Delem, Cybelec y ESA.',
  keywords: 'selección de controlador CNC para plegadora, control de ejes de plegadora, EASYCAT ET16, EASYCAT ET18, Delem DA53TX, Delem DA58TX, Cybelec CT12, control ESA',
  quickHeaders: ['Necesidad de producción', 'Nivel de control recomendado', 'Modelos sugeridos'],
  comparisonHeaders: ['Marca', 'Modelo', 'Nivel sugerido', 'Capacidad de ejes', 'Nivel de programación', 'Soporte CAD / offline', 'Mejor aplicación', 'Posición de costo'],
  scenarioHeaders: ['Aplicación', 'Tipo recomendado', 'Modelos recomendados', 'Por qué encaja'],
  intro: ['El mejor control no es la pantalla más cara, sino el que coincide con la estructura de la plegadora, los ejes, el flujo del operador, la complejidad de piezas y el precio objetivo.', 'En proyectos ZYCO, la selección del control forma parte de la ingeniería de la máquina. Primero se definen Y1/Y2, X/R, Z1/Z2, X2/R2 y crowning CNC; después se comparan marcas.'],
  quickRows: [['Plegadora CNC estándar con costo controlado', 'CNC práctico de alto valor', 'EASYCAT ET16, EASYCAT ET18'], ['Plegadora CNC estándar de exportación', 'CNC rentable con Y1/Y2/X/R y compensación', 'EASYCAT ET16, EASYCAT ET18, DA53TX'], ['Producción mixta diaria', 'CNC gráfico 2D', 'EASYCAT ET18, DA58TX, CT12, ESA650'], ['Piezas complejas y flujo offline', 'CNC avanzado 2D / 3D', 'DA66S, DA69S, CT15, ESA860, ESA890'], ['Automatización premium y high-mix', 'CNC multieje de gama alta', 'DA69S, ESA875, ESA890']],
  logic: ['Empiece por la configuración requerida: longitud de plegado, tonelaje, sincronización hidráulica, recorrido del tope, método de compensación, utillaje y mezcla de producción.', 'Con la configuración clara, elija un nivel de control que realmente use esos ejes y funciones.'],
  ncCncCards: [['Controles NC', 'Adecuados para plegado simple y repetitivo cuando el costo es crítico y la demanda de ejes es limitada.'], ['Controles CNC', 'Recomendados cuando importan Y1/Y2, ejes del tope, compensación, memoria de programas, gráficos y repetibilidad.'], ['CNC 2D', 'Opción práctica para la mayoría de talleres: permite dibujar perfiles y revisar pasos sin flujo 3D completo.'], ['CNC 3D', 'Mejor para piezas complejas, revisión de colisiones, CAD y programación offline.']],
  axes: [['Y1/Y2', 'Sincronización independiente del pisón izquierdo y derecho para plegado CNC preciso.'], ['X', 'Posición de profundidad del tope para controlar pestañas.'], ['R', 'Altura del tope para estaciones y geometrías distintas.'], ['Z1/Z2', 'Dedos móviles para piezas anchas, cónicas o multiestación.'], ['X2/R2', 'Segundas axes independientes para posicionamiento asimétrico y piezas avanzadas.'], ['Compensación', 'Crowning CNC o compensación de deflexión mantiene mejor los ángulos en pliegues largos.']],
  easycat: ['ZYCO recomienda EASYCAT ET16 y ET18 como soluciones CNC de alto valor cuando el proyecto necesita rentabilidad, estabilidad, preparación global, funciones CNC prácticas y control del costo de máquina.', 'EASYCAT ET18 es adecuado para proyectos CNC estándar y de mayor configuración: 4+1 ejes estándar Y1/Y2/X/R + crowning o compensación de deflexión; expansión hasta 8+1 ejes; pantalla táctil de alta resolución de 21.5 pulgadas; programación por dibujo 2D; importación CAD.'],
  scenarioRows: [['Plegado CNC estándar con costo controlado', 'CNC práctico de alto valor', 'EASYCAT ET16, EASYCAT ET18', 'Equilibra funciones CNC estables, programación práctica, uso global y control del costo de máquina.'], ['Posicionamiento extremadamente simple', 'NC básico solo como alternativa de función limitada', 'NC básico', 'Solo aplica cuando la pieza es muy simple, los ejes son mínimos y el presupuesto es extremadamente ajustado.'], ['Gabinetes, soportes y paneles', 'CNC gráfico 2D', 'EASYCAT ET18, DA58TX, CT12, ESA650', 'La programación 2D cubre la mayoría de perfiles.'], ['Pliegues largos con ángulo consistente', 'CNC con crowning o compensación', 'EASYCAT ET18, DA66S, ESA850', 'Y1/Y2 más compensación mejora la repetibilidad.'], ['Producción compleja high-mix', 'CNC avanzado 3D / offline', 'DA69S, ESA875, ESA890', '3D y offline reducen el riesgo de preparación.']],
  faq: [['¿Cuál es la diferencia entre controles NC y CNC?', 'NC gestiona posiciones y ángulos simples. CNC coordina Y1/Y2, topes, compensación, gráficos y datos de producción.'], ['¿Cuántos ejes necesita una plegadora CNC?', 'Una configuración práctica empieza con Y1/Y2 más X y R. Las superiores añaden Z1/Z2, X2/R2 y crowning CNC.'], ['¿Es suficiente la programación gráfica 2D?', 'Sí, para muchos talleres basta para perfiles, cajas, soportes, paneles y producción mixta.'], ['¿Cuándo elegir un control 3D?', 'Cuando importan piezas complejas, colisiones, CAD y programación offline.'], ['¿EASYCAT ET18 es adecuado para exportación?', 'Sí. ET18 incluye pantalla 21.5 pulgadas, 4+1 ejes estándar, expansión a 8+1, programación 2D e importación CAD.'], ['¿Cómo ayudan ET16 y ET18 a controlar el costo?', 'Ofrecen CNC práctico y estable sin obligar a usar un control 3D caro en cada proyecto.'], ['¿Qué diferencia hay entre DA53TX y DA58TX?', 'DA53TX es compacto; DA58TX ofrece más operación gráfica y comodidad.'], ['¿Primero control o configuración?', 'Primero configuración y aplicación: material, longitud, precisión, tope, compensación y flujo.']],
})

packs.zh = {
  ...packs.en,
  ...localizedPacks.zh,
  terms: termSets.zh,
  comparisonRows: makeComparisonRows(termSets.zh),
}

;['tr', 'id'].forEach((language) => {
  packs[language].quickRows = language === 'tr'
    ? [['Maliyet kontrollü standart CNC abkant', 'Yüksek değerli pratik CNC', 'EASYCAT ET16, EASYCAT ET18'], ['Standart ihracat CNC abkant', 'Y1/Y2/X/R ve kompanzasyonlu uygun maliyetli CNC', 'EASYCAT ET16, EASYCAT ET18, DA53TX'], ['Günlük karma sac üretimi', '2D grafik CNC', 'EASYCAT ET18, DA58TX, CT12, ESA650'], ['Karmaşık parçalar ve offline akış', 'Gelişmiş 2D / 3D CNC', 'DA66S, DA69S, CT15, ESA860, ESA890'], ['Premium otomasyon ve high-mix', 'Üst seviye çok eksenli CNC', 'DA69S, ESA875, ESA890']]
    : [['CNC press brake standar dengan kontrol biaya', 'CNC praktis bernilai tinggi', 'EASYCAT ET16, EASYCAT ET18'], ['CNC press brake ekspor standar', 'CNC hemat biaya dengan Y1/Y2/X/R dan kompensasi', 'EASYCAT ET16, EASYCAT ET18, DA53TX'], ['Produksi sheet metal campuran', 'CNC grafis 2D', 'EASYCAT ET18, DA58TX, CT12, ESA650'], ['Part kompleks dan workflow offline', 'CNC 2D / 3D lanjut', 'DA66S, DA69S, CT15, ESA860, ESA890'], ['Otomasi premium dan high-mix', 'CNC multi-sumbu high-end', 'DA69S, ESA875, ESA890']]
})

Object.assign(packs.tr, {
  seoTitle: 'Abkant pres kontrol seçim kılavuzu | EASYCAT, Delem, Cybelec ve ESA karşılaştırması',
  seoDescription: 'Eksen konfigürasyonu, 2D/3D programlama, offline yazılım, stabilite, makine maliyeti ve büküm uygulamalarına göre doğru kontrolü seçin. EASYCAT ET16/ET18, Delem, Cybelec ve ESA karşılaştırması.',
  keywords: 'abkant pres CNC kontrol seçimi, abkant pres eksen kontrolü, EASYCAT ET16, EASYCAT ET18, Delem DA53TX, Delem DA58TX, Cybelec CT12, ESA kontrol',
  quickHeaders: ['Üretim ihtiyacı', 'Önerilen kontrol seviyesi', 'Önerilen modeller'],
  comparisonHeaders: ['Marka', 'Model', 'Önerilen seviye', 'Eksen yeteneği', 'Programlama seviyesi', 'CAD / offline destek', 'En uygun uygulama', 'Maliyet konumu'],
  scenarioHeaders: ['Uygulama senaryosu', 'Önerilen kontrol tipi', 'Önerilen modeller', 'Neden uygun'],
  intro: ['En iyi kontrol, piyasadaki en pahalı ekran değil; abkant yapısına, eksen paketine, operatör akışına, parça karmaşıklığına ve hedef fiyata uyan kontroldür.', 'ZYCO projelerinde kontrol seçimi makine mühendisliğinin parçasıdır. Önce Y1/Y2, X/R, Z1/Z2, X2/R2 ve CNC crowning belirlenir; sonra markalar karşılaştırılır.'],
  logic: ['Gerekli makine konfigürasyonu ile başlayın: büküm boyu, tonaj, hidrolik senkron, arka dayama hareketi, kompanzasyon yöntemi, takım planı ve üretim karışımı.', 'Konfigürasyon netleşince bu eksenleri ve fonksiyonları gerçekten kullanabilecek kontrol seviyesini seçin.'],
  ncCncCards: [['NC kontroller', 'Eksen ihtiyacı sınırlı ve maliyet kritik olduğunda basit, tekrarlı bükümler için uygundur.'], ['CNC kontroller', 'Y1/Y2, arka dayama eksenleri, kompanzasyon, program hafızası, grafik programlama ve seri tekrarı önemliyse önerilir.'], ['2D CNC', 'Çoğu atölye için pratik seçimdir; operatör tam 3D akış olmadan profil çizer ve adımları kontrol eder.'], ['3D CNC', 'Karmaşık parçalar, çarpışma kontrolü, CAD tabanlı planlama ve offline programlama için uygundur.']],
  axes: [['Y1/Y2', 'Hassas CNC büküm için sol ve sağ kızak senkronizasyonu.'], ['X', 'Flanş ölçüsü için arka dayama derinliği.'], ['R', 'Farklı istasyon ve geometri için arka dayama yüksekliği.'], ['Z1/Z2', 'Geniş, konik veya çok istasyonlu parçalar için hareketli dayama parmakları.'], ['X2/R2', 'Asimetrik konumlama ve ileri parçalar için bağımsız ikinci eksenler.'], ['Crowning', 'CNC crowning veya sehim kompanzasyonu uzun bükümlerde açı tutarlılığını artırır.']],
  easycat: ['ZYCO, uygun maliyet, stabilite, global kullanıma hazırlık, pratik CNC fonksiyonları ve makine maliyet kontrolü gereken projelerde EASYCAT ET16 ve ET18’i yüksek değerli CNC çözümleri olarak önerir.', 'EASYCAT ET18 standart ve daha yüksek konfigürasyonlu CNC abkant projeleri için uygundur: standart 4+1 eksen Y1/Y2/X/R + crowning veya sehim kompanzasyonu; 8+1 eksene kadar genişleme; 21.5 inç yüksek çözünürlüklü dokunmatik ekran; 2D çizim programlama; CAD içe aktarma.'],
  scenarioRows: [['Maliyet kontrollü standart CNC büküm', 'Yüksek değerli pratik CNC', 'EASYCAT ET16, EASYCAT ET18', 'Stabil CNC fonksiyonları, pratik programlama, global kullanıma hazır yapı ve makine maliyet kontrolünü dengeler.'], ['Çok basit konumlama', 'Temel NC yalnızca sınırlı fonksiyonlu alternatif', 'Temel NC', 'Sadece parça çok basit, eksen ihtiyacı minimum ve bütçe çok sıkı olduğunda uygundur.'], ['Pano, braket ve panel üretimi', '2D grafik CNC', 'EASYCAT ET18, DA58TX, CT12, ESA650', '2D çizim çoğu profili verimli kapsar.'], ['Uzun bükümde açı tutarlılığı', 'Crowning veya kompanzasyonlu CNC', 'EASYCAT ET18, DA66S, ESA850', 'Y1/Y2 ve kompanzasyon tekrarı artırır.'], ['Karmaşık high-mix üretim', 'Gelişmiş 3D / offline CNC', 'DA69S, ESA875, ESA890', '3D ve offline akış kurulum riskini azaltır.']],
  faq: [['NC ve CNC kontrol farkı nedir?', 'NC basit pozisyon ve açıları yönetir. CNC Y1/Y2, arka dayama, kompanzasyon, grafik ve üretim verilerini koordine eder.'], ['CNC abkant kaç eksene ihtiyaç duyar?', 'Pratik başlangıç Y1/Y2 artı X ve R’dir. Daha yüksek paketler Z1/Z2, X2/R2 ve CNC crowning ekler.'], ['2D grafik programlama yeterli mi?', 'Evet, birçok atölye için profil, kutu, braket, panel ve karma üretimde yeterlidir.'], ['Ne zaman 3D kontrol seçilmeli?', 'Karmaşık parçalar, çarpışma kontrolü, CAD ve offline programlama önemliyse.'], ['EASYCAT ET18 ihracat CNC abkant için uygun mu?', 'Evet. ET18 21.5 inç ekran, standart 4+1 eksen, 8+1 genişleme, 2D programlama ve CAD import sunar.'], ['ET16 ve ET18 maliyeti nasıl kontrol eder?', 'Her projeye pahalı 3D kontrol koymadan pratik ve stabil CNC fonksiyonları sağlar.'], ['DA53TX ve DA58TX farkı nedir?', 'DA53TX kompakt; DA58TX daha güçlü grafik kullanım sunar.'], ['Önce kontrol mü konfigürasyon mu?', 'Önce makine konfigürasyonu ve uygulama belirlenmelidir.']],
})

Object.assign(packs.id, {
  seoTitle: 'Panduan pemilihan controller press brake | Perbandingan EASYCAT, Delem, Cybelec & ESA',
  seoDescription: 'Pelajari cara memilih controller berdasarkan konfigurasi sumbu, pemrograman 2D/3D, software offline, stabilitas, kontrol biaya mesin, dan aplikasi bending. Bandingkan EASYCAT ET16/ET18, Delem, Cybelec, dan ESA.',
  keywords: 'pemilihan controller CNC press brake, kontrol sumbu press brake, EASYCAT ET16, EASYCAT ET18, Delem DA53TX, Delem DA58TX, Cybelec CT12, controller ESA',
  quickHeaders: ['Kebutuhan produksi', 'Level controller yang disarankan', 'Model yang disarankan'],
  comparisonHeaders: ['Merek', 'Model', 'Level disarankan', 'Kemampuan sumbu', 'Level pemrograman', 'Dukungan CAD / offline', 'Aplikasi terbaik', 'Posisi biaya'],
  scenarioHeaders: ['Skenario aplikasi', 'Tipe controller', 'Model rekomendasi', 'Alasan sesuai'],
  intro: ['Controller terbaik bukan layar paling mahal, tetapi yang cocok dengan struktur press brake, paket sumbu, alur operator, kompleksitas part, dan target harga.', 'Dalam proyek ZYCO, pemilihan controller adalah bagian dari engineering mesin. Tentukan Y1/Y2, X/R, Z1/Z2, X2/R2 dan CNC crowning sebelum membandingkan merek.'],
  logic: ['Mulai dari konfigurasi mesin: panjang bending, tonase, sinkron hidrolik, gerak backgauge, metode kompensasi, rencana tooling, dan variasi produksi.', 'Setelah konfigurasi jelas, pilih level controller yang benar-benar dapat memakai sumbu dan fungsi tersebut.'],
  ncCncCards: [['Controller NC', 'Cocok untuk bending sederhana dan berulang saat biaya penting dan kebutuhan sumbu terbatas.'], ['Controller CNC', 'Disarankan saat Y1/Y2, sumbu backgauge, kompensasi, memori program, grafik, dan repeatability batch penting.'], ['CNC 2D', 'Pilihan praktis untuk banyak pabrik; operator dapat menggambar profil dan memeriksa langkah tanpa workflow 3D penuh.'], ['CNC 3D', 'Terbaik untuk part kompleks, cek tabrakan, perencanaan CAD, dan pemrograman offline.']],
  axes: [['Y1/Y2', 'Sinkronisasi ram kiri dan kanan untuk bending CNC akurat.'], ['X', 'Posisi kedalaman backgauge untuk ukuran flange.'], ['R', 'Tinggi backgauge untuk stasiun dan geometri berbeda.'], ['Z1/Z2', 'Jari backgauge bergerak untuk part lebar, tirus, atau multi-stasiun.'], ['X2/R2', 'Sumbu kedua independen untuk posisi asimetris dan part lanjutan.'], ['Crowning', 'CNC crowning atau kompensasi defleksi menjaga sudut lebih konsisten pada tekukan panjang.']],
  easycat: ['ZYCO merekomendasikan EASYCAT ET16 dan ET18 sebagai solusi CNC bernilai tinggi ketika proyek membutuhkan biaya efektif, stabilitas, kesiapan global, fungsi CNC praktis, dan kontrol biaya mesin.', 'EASYCAT ET18 cocok untuk proyek CNC standar dan konfigurasi lebih tinggi: standar 4+1 sumbu Y1/Y2/X/R + crowning atau kompensasi defleksi; ekspansi hingga 8+1 sumbu; layar sentuh resolusi tinggi 21.5 inci; pemrograman gambar 2D; impor CAD.'],
  scenarioRows: [['Bending CNC standar dengan kontrol biaya', 'CNC praktis bernilai tinggi', 'EASYCAT ET16, EASYCAT ET18', 'Menyeimbangkan fungsi CNC stabil, pemrograman praktis, kesiapan global, dan kontrol biaya mesin.'], ['Posisi sangat sederhana', 'NC dasar hanya sebagai alternatif fungsi terbatas', 'NC dasar', 'Hanya cocok saat part sangat sederhana, kebutuhan sumbu minimal, dan anggaran sangat ketat.'], ['Produksi kabinet, bracket, panel', 'CNC grafis 2D', 'EASYCAT ET18, DA58TX, CT12, ESA650', 'Program gambar 2D mencakup profil umum.'], ['Tekukan panjang butuh sudut konsisten', 'CNC dengan crowning/kompensasi', 'EASYCAT ET18, DA66S, ESA850', 'Y1/Y2 plus kompensasi meningkatkan repeatability.'], ['Produksi kompleks high-mix', 'CNC 3D / offline lanjut', 'DA69S, ESA875, ESA890', '3D dan offline mengurangi risiko setup.']],
  faq: [['Apa bedanya controller NC dan CNC?', 'NC mengelola posisi dan sudut sederhana. CNC mengoordinasi Y1/Y2, backgauge, kompensasi, grafik, dan data produksi.'], ['Berapa sumbu yang dibutuhkan CNC press brake?', 'Umumnya mulai dari Y1/Y2 plus X dan R. Paket lebih tinggi menambah Z1/Z2, X2/R2, dan CNC crowning.'], ['Apakah 2D grafis cukup?', 'Ya, untuk banyak pabrik cukup untuk profil, box, bracket, panel, dan produksi campuran.'], ['Kapan memilih controller 3D?', 'Saat part kompleks, cek tabrakan, CAD, dan offline programming penting.'], ['Apakah EASYCAT ET18 cocok untuk ekspor?', 'Ya. ET18 memiliki layar 21.5 inci, standar 4+1 sumbu, ekspansi 8+1, program 2D, dan impor CAD.'], ['Bagaimana ET16 dan ET18 mengontrol biaya?', 'Memberi fungsi CNC praktis dan stabil tanpa memaksa setiap proyek memakai controller 3D mahal.'], ['Apa beda DA53TX dan DA58TX?', 'DA53TX kompak; DA58TX memberi operasi grafis lebih kuat.'], ['Pilih controller atau konfigurasi dulu?', 'Mulai dari konfigurasi mesin dan aplikasi.']],
})

;['ru', 'es', 'tr', 'id'].forEach((language) => {
  packs[language].brandSections = {
    ru: {
      delem: [['DA53TX', 'Компактный CNC для стандартных синхронных листогибов и ежедневной работы.'], ['DA58TX', 'Более удобная графическая работа для 2D операций.'], ['DA66S', 'Продвинутый CNC для более оснащенных машин и гибкого программирования.'], ['DA69S', 'Премиальный 3D-ориентированный выбор для сложных деталей и offline процесса.']],
      cybelec: [['CT8', 'Начальный CNC для экономичных стандартных конфигураций.'], ['CT12', 'Графический CNC для широкой ежедневной работы и 2D визуализации.'], ['CT15', 'Продвинутый графический CNC для сложной гибки и высокой производительности.']],
      esa: [['ESA630 / ESA640', 'Практичные CNC уровни для стандартных конфигураций.'], ['ESA650 / ESA660', 'Средние и продвинутые CNC варианты для расширенных осей.'], ['ESA840 / ESA850', 'Продвинутые уровни для более оснащенных CNC проектов.'], ['ESA860 / ESA875 / ESA890', 'High-end и премиальные решения для сложных деталей, многоосевых машин и 3D/offline процессов.']],
    },
    es: {
      delem: [['DA53TX', 'CNC compacto para plegadoras sincronizadas estándar y producción diaria.'], ['DA58TX', 'Mayor comodidad gráfica para operaciones 2D.'], ['DA66S', 'CNC avanzado para máquinas de mayor configuración y programación flexible.'], ['DA69S', 'Opción premium orientada a 3D para piezas complejas y flujo offline.']],
      cybelec: [['CT8', 'CNC básico para configuraciones económicas estándar.'], ['CT12', 'CNC gráfico para producción diaria amplia y visualización 2D.'], ['CT15', 'CNC gráfico avanzado para plegado complejo y productividad.']],
      esa: [['ESA630 / ESA640', 'Niveles CNC prácticos para configuraciones estándar.'], ['ESA650 / ESA660', 'Opciones medias y avanzadas para ejes ampliados.'], ['ESA840 / ESA850', 'Niveles avanzados para proyectos CNC de mayor configuración.'], ['ESA860 / ESA875 / ESA890', 'Selecciones high-end y premium para piezas complejas, máquinas multieje y flujos 3D/offline.']],
    },
    tr: {
      delem: [['DA53TX', 'Standart senkron abkant ve günlük üretim için kompakt CNC.'], ['DA58TX', '2D operasyon için daha iyi grafik programlama konforu.'], ['DA66S', 'Daha yüksek konfigürasyon ve esnek programlama için gelişmiş CNC.'], ['DA69S', 'Karmaşık parçalar ve offline akış için premium 3D yönelimli seçim.']],
      cybelec: [['CT8', 'Ekonomik standart konfigürasyonlar için giriş CNC.'], ['CT12', 'Geniş günlük üretim ve 2D görünürlük için grafik CNC.'], ['CT15', 'Karmaşık büküm ve verimlilik için gelişmiş grafik CNC.']],
      esa: [['ESA630 / ESA640', 'Standart konfigürasyonlar için pratik CNC seviyeleri.'], ['ESA650 / ESA660', 'Genişletilmiş eksenler için orta ve gelişmiş CNC.'], ['ESA840 / ESA850', 'Daha yüksek CNC projeleri için gelişmiş seviyeler.'], ['ESA860 / ESA875 / ESA890', 'Karmaşık parçalar, çok eksenli makineler ve 3D/offline akışlar için high-end seçenekler.']],
    },
    id: {
      delem: [['DA53TX', 'CNC kompak untuk press brake sinkron standar dan produksi harian.'], ['DA58TX', 'Kenyamanan grafis lebih baik untuk operasi 2D.'], ['DA66S', 'CNC lanjut untuk mesin konfigurasi lebih tinggi dan program fleksibel.'], ['DA69S', 'Pilihan premium 3D untuk part kompleks dan workflow offline.']],
      cybelec: [['CT8', 'CNC entry untuk konfigurasi ekonomis standar.'], ['CT12', 'CNC grafis untuk produksi harian dan visualisasi 2D.'], ['CT15', 'CNC grafis lanjut untuk bending kompleks dan produktivitas.']],
      esa: [['ESA630 / ESA640', 'Level CNC praktis untuk konfigurasi standar.'], ['ESA650 / ESA660', 'Opsi menengah hingga lanjut untuk sumbu tambahan.'], ['ESA840 / ESA850', 'Level lanjut untuk proyek CNC konfigurasi tinggi.'], ['ESA860 / ESA875 / ESA890', 'Pilihan high-end untuk part kompleks, mesin multi-sumbu, dan workflow 3D/offline.']],
    },
  }[language]
  packs[language].mistakes = {
    ru: ['Выбирать бренд до определения пакета осей машины.', 'Покупать 3D контроллер для простых деталей, где 2D CNC лучше контролирует стоимость.', 'Игнорировать crowning на длинных и тяжелых гибах.', 'Недооценивать Z1/Z2, X2/R2 и задний упор для сложных деталей.', 'Не учитывать навык оператора, язык, сервис и память программ.'],
    es: ['Elegir por marca antes de definir el paquete de ejes.', 'Comprar 3D para piezas simples donde 2D CNC controla mejor el costo.', 'Ignorar crowning en máquinas largas y alto tonelaje.', 'Subestimar Z1/Z2, X2/R2 y el tope para piezas complejas.', 'Olvidar habilidad del operador, idioma, servicio y memoria de programas.'],
    tr: ['Makine eksen paketini belirlemeden markaya göre seçim yapmak.', 'Basit parçalar için 2D CNC daha uygunken 3D kontrol almak.', 'Uzun gövdeli ve yüksek tonajlı bükümlerde crowning kontrolünü göz ardı etmek.', 'Karmaşık parçalar için Z1/Z2, X2/R2 ve arka dayamayı küçümsemek.', 'Operatör seviyesi, dil, servis ve program hafızasını unutmak.'],
    id: ['Memilih merek sebelum menentukan paket sumbu mesin.', 'Membeli controller 3D untuk part sederhana ketika 2D CNC lebih hemat.', 'Mengabaikan crowning pada mesin panjang dan bending tonase tinggi.', 'Meremehkan Z1/Z2, X2/R2, dan backgauge untuk part kompleks.', 'Melupakan skill operator, bahasa, akses servis, dan memori program.'],
  }[language]
  packs[language].advice = {
    ru: ['Для стандартного CNC листогиба сначала подтвердите Y1/Y2/X/R и необходимость CNC crowning.', 'Для многих экспортных проектов EASYCAT ET16 или ET18 дают практичный баланс CNC возможностей, стабильности и стоимости.', 'DA69S, ESA875, ESA890 и аналогичные high-end контроллеры выбирайте, когда 3D, CAD/offline и сложное планирование действительно необходимы.'],
    es: ['Para una CNC estándar confirme primero Y1/Y2/X/R y si se requiere crowning CNC.', 'En muchos proyectos de exportación, EASYCAT ET16 o ET18 equilibran capacidad CNC, estabilidad y costo.', 'Use DA69S, ESA875, ESA890 o similares cuando 3D, CAD/offline y planificación compleja sean esenciales.'],
    tr: ['Standart CNC abkant için önce Y1/Y2/X/R ve CNC crowning ihtiyacını doğrulayın.', 'Birçok ihracat projesinde EASYCAT ET16 veya ET18 CNC kabiliyeti, stabilite ve maliyet arasında pratik denge sunar.', '3D, CAD/offline ve karmaşık planlama gerçekten gerekliyse DA69S, ESA875, ESA890 veya benzerlerini seçin.'],
    id: ['Untuk CNC standar, konfirmasi dulu Y1/Y2/X/R dan kebutuhan CNC crowning.', 'Untuk banyak proyek ekspor, EASYCAT ET16 atau ET18 memberi keseimbangan praktis antara kemampuan CNC, stabilitas, dan biaya.', 'Gunakan DA69S, ESA875, ESA890 atau sekelasnya jika 3D, CAD/offline, dan perencanaan kompleks memang penting.'],
  }[language]
})

packs.zh.brandSections = localizedPacks.zh.brandSections
packs.zh.scenarioRows = localizedPacks.zh.scenarioRows
packs.zh.mistakes = localizedPacks.zh.mistakes
packs.zh.advice = localizedPacks.zh.advice
packs.zh.faq = localizedPacks.zh.faq
packs.zh.quickRows = localizedPacks.zh.quickRows
packs.zh.logic = localizedPacks.zh.logic
packs.zh.ncCncCards = localizedPacks.zh.ncCncCards
packs.zh.axes = localizedPacks.zh.axes
packs.zh.easycat = localizedPacks.zh.easycat
Object.assign(packs.zh, Object.fromEntries(Object.entries(localizedPacks.zh).filter(([key]) => !['terms'].includes(key))))

const createStructuredData = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebPage', name: packs.en.title, description: packs.en.seoDescription, url: getSiteUrl(routePath), isPartOf: { '@type': 'WebSite', name: 'ZYCO Engineering Hub', url: getSiteUrl('/engineering-tools') } },
    { '@type': 'TechArticle', headline: packs.en.title, description: packs.en.seoDescription, author: { '@type': 'Organization', name: 'ZYCO' }, publisher: { '@type': 'Organization', name: 'ZYCO', url: getSiteUrl('/') }, mainEntityOfPage: getSiteUrl(routePath) },
    { '@type': 'FAQPage', mainEntity: packs.en.faq.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Engineering Tools', item: getSiteUrl('/engineering-tools') }, { '@type': 'ListItem', position: 2, name: packs.en.title, item: getSiteUrl(routePath) }] },
  ],
})

function Card({ title, text }) {
  return <article className='zyco-controller__card'><h3>{title}</h3><p>{text}</p></article>
}

function Table({ headers, rows, minWidth = 760 }) {
  return (
    <div className='zyco-controller__table-wrap'>
      <table className='zyco-controller__table' style={{ minWidth }}>
        <thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>{rows.map((row) => <tr key={row.join('|')}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

function BrandList({ items }) {
  return <div className='zyco-controller__cards'>{items.map(([title, text]) => <Card key={title} title={title} text={text} />)}</div>
}

export default function PressBrakeControllerSelectionGuide({ language = 'en', setLanguage = () => {} }) {
  const activeLanguage = normalizeLanguage(language)
  const page = packs[activeLanguage] || packs.en
  const sharedText = getEngineeringText(activeLanguage)

  useEffect(() => {
    setPageSEO({ title: page.seoTitle, description: page.seoDescription, keywords: page.keywords, canonicalPath: routePath })
    setStructuredData({ id: 'press-brake-controller-selection-guide-jsonld', data: createStructuredData() })
  }, [page.keywords, page.seoDescription, page.seoTitle])

  return (
    <>
      <style>{`
        .zyco-controller { min-height: 100vh; box-sizing: border-box; padding: 52px 22px; background: radial-gradient(circle at 16% 12%, rgba(96, 165, 250, 0.34), transparent 30%), radial-gradient(circle at 84% 20%, rgba(14, 165, 233, 0.22), transparent 28%), linear-gradient(145deg, #071224 0%, #0b1f3f 42%, #12366e 74%, #1d4ed8 100%); color: #ffffff; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; position: relative; overflow: hidden; }
        .zyco-controller::before { content: ""; position: absolute; inset: 0; background-image: linear-gradient(rgba(96, 165, 250, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(96, 165, 250, 0.08) 1px, transparent 1px); background-size: 42px 42px; mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent 78%); pointer-events: none; }
        .zyco-controller__shell { width: min(1180px, 100%); margin: 0 auto; position: relative; z-index: 1; }
        .zyco-controller__hero { padding: 38px 36px; margin-bottom: 22px; border: 1px solid rgba(191,219,254,0.2); border-radius: 30px; background: linear-gradient(145deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06)); backdrop-filter: blur(16px); box-shadow: 0 28px 68px rgba(2,8,23,0.2); }
        .zyco-controller__back, .zyco-controller__tool { display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; text-decoration: none; color: #ffffff; font-size: 15px; font-weight: 800; transition: all .25s ease; }
        .zyco-controller__back { width: fit-content; max-width: min(100%, 460px); min-height: 44px; margin: 0 0 22px; padding: 0 16px; border: 1px solid rgba(147,197,253,0.46); border-radius: 999px; background: linear-gradient(145deg, rgba(15,23,42,0.34), rgba(37,99,235,0.12)); color: #bfdbfe; }
        .zyco-controller__back:hover, .zyco-controller__tool:hover { transform: translateY(-3px); border-color: rgba(125,211,252,0.7); color: #fff; background: rgba(37,99,235,0.42); box-shadow: 0 14px 32px rgba(37,99,235,0.28); }
        .zyco-controller__eyebrow { margin: 0; color: #7dd3fc; font-size: 12px; font-weight: 800; letter-spacing: .2em; text-transform: uppercase; }
        .zyco-controller__title { max-width: 980px; margin: 14px 0 18px; font-size: clamp(32px, 4.8vw, 52px); line-height: 1.08; letter-spacing: 0; }
        .zyco-controller__subtitle { max-width: 850px; margin: 0; color: #dbeafe; font-size: 18px; line-height: 1.72; }
        .zyco-controller__panel { padding: 28px; margin-top: 18px; border: 1px solid rgba(191,219,254,0.16); border-radius: 25px; background: rgba(10,30,61,0.48); backdrop-filter: blur(12px); }
        .zyco-controller__section-title { margin: 0 0 14px; color: #fff; font-size: 25px; letter-spacing: 0; }
        .zyco-controller__copy { margin: 0; color: #cbd5e1; font-size: 16px; line-height: 1.75; }
        .zyco-controller__copy + .zyco-controller__copy { margin-top: 10px; }
        .zyco-controller__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
        .zyco-controller__cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 16px; }
        .zyco-controller__card { padding: 18px; border: 1px solid rgba(191,219,254,0.13); border-radius: 18px; background: rgba(30,64,112,0.34); }
        .zyco-controller__card h3 { margin: 0 0 8px; color: #eff6ff; font-size: 16px; line-height: 1.35; }
        .zyco-controller__card p { margin: 0; color: #bfdbfe; font-size: 14px; line-height: 1.65; }
        .zyco-controller__table-wrap { overflow-x: auto; border: 1px solid rgba(191,219,254,0.16); border-radius: 18px; margin-top: 18px; }
        .zyco-controller__table { width: 100%; border-collapse: collapse; }
        .zyco-controller__table th, .zyco-controller__table td { padding: 14px 16px; border-bottom: 1px solid rgba(191,219,254,0.1); text-align: left; vertical-align: top; }
        .zyco-controller__table th { color: #bae6fd; background: rgba(30,64,112,0.38); font-size: 13px; white-space: nowrap; }
        .zyco-controller__table td { color: #e2e8f0; font-size: 14px; line-height: 1.55; }
        .zyco-controller__list, .zyco-controller__faq { display: grid; gap: 12px; padding: 0; margin: 0; list-style: none; }
        .zyco-controller__list li, .zyco-controller__faq article { padding: 17px 20px; border: 1px solid rgba(191,219,254,0.12); border-radius: 18px; background: rgba(30,64,112,0.3); }
        .zyco-controller__faq h3 { margin: 0 0 8px; color: #eff6ff; font-size: 17px; line-height: 1.4; }
        .zyco-controller__tools { display: flex; flex-wrap: wrap; gap: 12px; }
        .zyco-controller__tool { min-height: 46px; padding: 0 18px; border: 1px solid rgba(147,197,253,0.38); border-radius: 14px; color: #dbeafe; background: rgba(30,64,175,0.32); box-shadow: none; }
        @media (max-width: 900px) { .zyco-controller__grid, .zyco-controller__cards { grid-template-columns: 1fr; } }
        @media (max-width: 760px) { .zyco-controller { padding: 22px 14px; } .zyco-controller__hero, .zyco-controller__panel { padding: 22px; border-radius: 22px; } .zyco-controller__subtitle { font-size: 16px; } }
        @media (max-width: 640px) { .zyco-controller__back, .zyco-controller__tool { width: 100%; } }
      `}</style>
      <main className='zyco-controller'>
        <div className='zyco-controller__shell'>
          <header className='zyco-controller__hero'>
            <a className='zyco-controller__back' href='/engineering-tools' aria-label={page.back}>{page.back}</a>
            <LanguageSwitcher className='zyco-page-language-switcher' language={activeLanguage} setLanguage={setLanguage} />
            <p className='zyco-controller__eyebrow'>{page.eyebrow}</p>
            <h1 className='zyco-controller__title'>{page.title}</h1>
            <p className='zyco-controller__subtitle'>{page.subtitle}</p>
          </header>

          <section className='zyco-controller__panel'>{page.intro.map((item) => <p className='zyco-controller__copy' key={item}>{item}</p>)}</section>
          <section className='zyco-controller__panel'><h2 className='zyco-controller__section-title'>{page.labels.quickAnswer}</h2><Table headers={page.quickHeaders} rows={page.quickRows} /></section>
          <section className='zyco-controller__panel'><h2 className='zyco-controller__section-title'>{page.labels.logic}</h2>{page.logic.map((item) => <p className='zyco-controller__copy' key={item}>{item}</p>)}</section>
          <section className='zyco-controller__panel'><h2 className='zyco-controller__section-title'>{page.labels.ncCnc}</h2><BrandList items={page.ncCncCards} /></section>
          <section className='zyco-controller__panel'><h2 className='zyco-controller__section-title'>{page.labels.axes}</h2><BrandList items={page.axes} /></section>
          <section className='zyco-controller__panel'><h2 className='zyco-controller__section-title'>{page.labels.easycat}</h2>{page.easycat.map((item) => <p className='zyco-controller__copy' key={item}>{item}</p>)}</section>
          <section className='zyco-controller__panel'><h2 className='zyco-controller__section-title'>{page.labels.comparison}</h2><Table headers={page.comparisonHeaders} rows={page.comparisonRows} minWidth={1180} /></section>
          <div className='zyco-controller__grid'><section className='zyco-controller__panel'><h2 className='zyco-controller__section-title'>{page.labels.delem}</h2><BrandList items={page.brandSections.delem} /></section><section className='zyco-controller__panel'><h2 className='zyco-controller__section-title'>{page.labels.cybelec}</h2><BrandList items={page.brandSections.cybelec} /></section></div>
          <section className='zyco-controller__panel'><h2 className='zyco-controller__section-title'>{page.labels.esa}</h2><BrandList items={page.brandSections.esa} /></section>
          <section className='zyco-controller__panel'><h2 className='zyco-controller__section-title'>{page.labels.scenarios}</h2><Table headers={page.scenarioHeaders} rows={page.scenarioRows} /></section>
          <div className='zyco-controller__grid'><section className='zyco-controller__panel'><h2 className='zyco-controller__section-title'>{page.labels.mistakes}</h2><ul className='zyco-controller__list'>{page.mistakes.map((item) => <li className='zyco-controller__copy' key={item}>{item}</li>)}</ul></section><section className='zyco-controller__panel'><h2 className='zyco-controller__section-title'>{page.labels.advice}</h2><ul className='zyco-controller__list'>{page.advice.map((item) => <li className='zyco-controller__copy' key={item}>{item}</li>)}</ul></section></div>
          <section className='zyco-controller__panel'><h2 className='zyco-controller__section-title'>{page.labels.faq}</h2><div className='zyco-controller__faq'>{page.faq.map(([question, answer]) => <article key={question}><h3>{question}</h3><p className='zyco-controller__copy'>{answer}</p></article>)}</div></section>
          <EngineeringCTA language={activeLanguage} />
          <section className='zyco-controller__panel'><h2 className='zyco-controller__section-title'>{page.labels.related}</h2><nav className='zyco-controller__tools' aria-label={page.labels.related}>{relatedTools.map(([key, href]) => <a className='zyco-controller__tool' href={href} key={key}>{sharedText.relatedTools[key]}</a>)}</nav></section>
        </div>
      </main>
    </>
  )
}
