export const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: '中文' },
  { value: 'ru', label: 'Русский' },
  { value: 'es', label: 'Español' },
  { value: 'tr', label: 'Türkçe' },
  { value: 'id', label: 'Indonesia' },
]

export const calculatorLanguageMap = {
  en: 'EN',
  zh: 'CN',
  ru: 'RU',
  es: 'ES',
  tr: 'TR',
  id: 'ID',
}

export const getStoredLanguage = () => {
  if (typeof window === 'undefined') {
    return 'en'
  }

  const storedLanguage = window.localStorage.getItem('zyco-language')

  return languageOptions.some((option) => option.value === storedLanguage)
    ? storedLanguage
    : 'en'
}

const relatedTools = {
  en: {
    pressBrakeCalculator: 'Press Brake Calculator',
    materialDatabase: 'Material Database',
    vDieSelectionTool: 'V Die Selection Tool',
    insideRadiusGuide: 'Inside Radius Guide',
    springbackDatabase: 'Springback Database',
    bendAllowanceCalculator: 'Bend Allowance Calculator',
    airBendingGuide: 'Air Bending Guide',
  },
  zh: {
    pressBrakeCalculator: '折弯机计算器',
    materialDatabase: '材料数据库',
    vDieSelectionTool: 'V 型模具选择工具',
    insideRadiusGuide: '内半径指南',
    springbackDatabase: '回弹数据库',
    bendAllowanceCalculator: '折弯展开计算器',
  },
  ru: {
    pressBrakeCalculator: 'Калькулятор листогиба',
    materialDatabase: 'База материалов',
    vDieSelectionTool: 'Подбор V-матрицы',
    insideRadiusGuide: 'Справочник внутреннего радиуса',
    springbackDatabase: 'База пружинения',
    bendAllowanceCalculator: 'Калькулятор припуска на гиб',
  },
  es: {
    pressBrakeCalculator: 'Calculadora de plegadora',
    materialDatabase: 'Base de datos de materiales',
    vDieSelectionTool: 'Selección de matriz V',
    insideRadiusGuide: 'Guía de radio interior',
    springbackDatabase: 'Base de datos de recuperación elástica',
    bendAllowanceCalculator: 'Calculadora de desarrollo de plegado',
  },
  tr: {
    pressBrakeCalculator: 'Abkant pres hesaplayıcısı',
    materialDatabase: 'Malzeme veritabanı',
    vDieSelectionTool: 'V kalıp seçim aracı',
    insideRadiusGuide: 'İç radyüs kılavuzu',
    springbackDatabase: 'Geri esneme veritabanı',
    bendAllowanceCalculator: 'Büküm payı hesaplayıcı',
  },
  id: {
    pressBrakeCalculator: 'Kalkulator press brake',
    materialDatabase: 'Database material',
    vDieSelectionTool: 'Alat pemilihan V-die',
    insideRadiusGuide: 'Panduan radius dalam',
    springbackDatabase: 'Database springback',
    bendAllowanceCalculator: 'Kalkulator bend allowance',
  },
}

relatedTools.zh.airBendingGuide = '空气折弯指南'
relatedTools.ru.airBendingGuide = 'Руководство по Air Bending'
relatedTools.es.airBendingGuide = 'Guía de Air Bending'
relatedTools.tr.airBendingGuide = 'Air Bending kılavuzu'
relatedTools.id.airBendingGuide = 'Panduan Air Bending'

relatedTools.en.pressBrakeTonnageGuide = 'Press Brake Tonnage Guide'
relatedTools.zh.pressBrakeTonnageGuide = '折弯机吨位指南'
relatedTools.ru.pressBrakeTonnageGuide = 'Руководство по тоннажу листогибочного пресса'
relatedTools.es.pressBrakeTonnageGuide = 'Guía de tonelaje para plegadoras'
relatedTools.tr.pressBrakeTonnageGuide = 'Abkant Pres Tonaj Kılavuzu'
relatedTools.id.pressBrakeTonnageGuide = 'Panduan Tonase Press Brake'
relatedTools.en.vDieOpeningGuide = 'How to Choose Press Brake V-Die Opening'
relatedTools.zh.vDieOpeningGuide = '如何选择折弯机 V 型模开口'
relatedTools.ru.vDieOpeningGuide = 'Как выбрать раскрытие V-матрицы листогибочного пресса'
relatedTools.es.vDieOpeningGuide = 'Cómo elegir la abertura de matriz V para una plegadora'
relatedTools.tr.vDieOpeningGuide = 'Abkant Pres İçin V Kalıp Açıklığı Nasıl Seçilir'
relatedTools.id.vDieOpeningGuide = 'Cara Memilih Bukaan Cetakan V Press Brake'
relatedTools.en.toolingSelectionGuide = 'Press Brake Tooling Selection Guide'
relatedTools.zh.toolingSelectionGuide = '折弯机模具选型指南'
relatedTools.ru.toolingSelectionGuide = 'Руководство по выбору оснастки листогибочного пресса'
relatedTools.es.toolingSelectionGuide = 'Guía de selección de utillaje para plegadora'
relatedTools.tr.toolingSelectionGuide = 'Abkant pres takım seçimi kılavuzu'
relatedTools.id.toolingSelectionGuide = 'Panduan pemilihan perkakas mesin tekuk'
relatedTools.en.crowningGuide = 'Press Brake Crowning Guide'
relatedTools.zh.crowningGuide = '折弯机挠度补偿指南'
relatedTools.ru.crowningGuide = 'Руководство по компенсации прогиба листогиба'
relatedTools.es.crowningGuide = 'Guía de compensación de flecha para plegadoras'
relatedTools.tr.crowningGuide = 'Abkant pres sehim kompanzasyonu kılavuzu'
relatedTools.id.crowningGuide = 'Panduan kompensasi lendutan press brake'
relatedTools.en.stainlessSteelBendingGuide = 'Stainless Steel Bending Guide'
relatedTools.zh.stainlessSteelBendingGuide = '不锈钢折弯指南'
relatedTools.ru.stainlessSteelBendingGuide = 'Руководство по гибке нержавеющей стали'
relatedTools.es.stainlessSteelBendingGuide = 'Guía de plegado de acero inoxidable'
relatedTools.tr.stainlessSteelBendingGuide = 'Paslanmaz Çelik Büküm Kılavuzu'
relatedTools.id.stainlessSteelBendingGuide = 'Panduan Tekuk Stainless Steel'
relatedTools.en.aluminumBendingGuide = 'Aluminum Bending Guide'
relatedTools.zh.aluminumBendingGuide = '铝板折弯指南'
relatedTools.ru.aluminumBendingGuide = 'Руководство по гибке алюминия'
relatedTools.es.aluminumBendingGuide = 'Guía de plegado de aluminio'
relatedTools.tr.aluminumBendingGuide = 'Alüminyum Büküm Kılavuzu'
relatedTools.id.aluminumBendingGuide = 'Panduan Tekuk Aluminium'
relatedTools.en.minimumFlangeLengthGuide = 'Minimum Flange Length Guide'
relatedTools.zh.minimumFlangeLengthGuide = '最小翻边长度指南'
relatedTools.ru.minimumFlangeLengthGuide = 'Руководство по минимальной длине полки'
relatedTools.es.minimumFlangeLengthGuide = 'Guía de longitud mínima de pestaña'
relatedTools.tr.minimumFlangeLengthGuide = 'Minimum Flanş Boyu Kılavuzu'
relatedTools.id.minimumFlangeLengthGuide = 'Panduan Panjang Flange Minimum'

const materialNames = {
  en: {
    mildSteel: 'Mild Steel',
    galvanizedSteel: 'Galvanized Steel',
    stainless201: 'Stainless Steel 201',
    stainless304: 'Stainless Steel 304',
    aluminum: 'Aluminum',
    brass: 'Brass',
  },
  zh: {
    mildSteel: '低碳钢',
    galvanizedSteel: '镀锌钢',
    stainless201: '201不锈钢',
    stainless304: '304不锈钢',
    aluminum: '铝',
    brass: '黄铜',
  },
  ru: {
    mildSteel: 'Низкоуглеродистая сталь',
    galvanizedSteel: 'Оцинкованная сталь',
    stainless201: 'Нержавеющая сталь 201',
    stainless304: 'Нержавеющая сталь 304',
    aluminum: 'Алюминий',
    brass: 'Латунь',
  },
  es: {
    mildSteel: 'Acero dulce',
    galvanizedSteel: 'Acero galvanizado',
    stainless201: 'Acero inoxidable 201',
    stainless304: 'Acero inoxidable 304',
    aluminum: 'Aluminio',
    brass: 'Latón',
  },
  tr: {
    mildSteel: 'Yumuşak çelik',
    galvanizedSteel: 'Galvanizli çelik',
    stainless201: '201 paslanmaz çelik',
    stainless304: '304 paslanmaz çelik',
    aluminum: 'Alüminyum',
    brass: 'Pirinç',
  },
  id: {
    mildSteel: 'Baja ringan',
    galvanizedSteel: 'Baja galvanis',
    stainless201: 'Stainless steel 201',
    stainless304: 'Stainless steel 304',
    aluminum: 'Aluminium',
    brass: 'Kuningan',
  },
}

const common = {
  en: {
    engineeringReference: 'Engineering Reference',
    engineeringCalculator: 'Engineering Calculator',
    engineeringOverview: 'Engineering Overview',
    engineeringReferenceNotes: 'Engineering Reference Notes',
    relatedEngineeringTools: 'Related Engineering Tools',
    relatedToolsAria: 'Related engineering tools',
    inputParameters: 'Input Parameters',
    calculationOutput: 'Calculation Output',
    selectionOutput: 'Selection Output',
    material: 'Material',
    thickness: 'Thickness (mm)',
    insideRadius: 'Inside Radius (mm)',
    bendAngle: 'Bend Angle (degrees)',
    kFactor: 'K-Factor',
    applicationNote: 'Application Note',
    engineeringNote: 'Engineering Note',
    referenceCondition: 'Reference Condition',
    calculateBendingForce: 'Calculate Bending Force',
    openTool: 'Open Tool',
    comingSoon: 'Coming Soon',
    materialAdjustmentAdvice:
      'Practical V-opening may be adjusted based on bend radius requirement, crack risk, surface quality, springback and tooling condition.',
    useAutoEstimatedRadius: 'Use Auto Estimated Radius',
    manualRadiusOverrideActive: 'Manual Radius Override Active',
    autoEstimatedInsideRadius: 'Auto Estimated Inside Radius',
    autoEstimatedInsideRadiusNote:
      'Calculated from standard V-opening, material factor and a small bend-angle adjustment.',
    recommendedKFactorFor: 'Recommended K-Factor for',
    useEstimatedRadiusFromVDieTool: 'Use Estimated Radius from V Die Tool',
    enterSheetThickness: 'Enter sheet thickness',
  },
  zh: {
    engineeringReference: '工程参考',
    engineeringCalculator: '工程计算器',
    engineeringOverview: '工程概述',
    engineeringReferenceNotes: '工程参考说明',
    relatedEngineeringTools: '相关工程工具',
    relatedToolsAria: '相关工程工具',
    inputParameters: '输入参数',
    calculationOutput: '计算输出',
    selectionOutput: '选择输出',
    material: '材料',
    thickness: '板厚 (mm)',
    insideRadius: '内半径 (mm)',
    bendAngle: '折弯角度 (度)',
    kFactor: 'K 因子',
    applicationNote: '应用说明',
    engineeringNote: '工程说明',
    referenceCondition: '参考条件',
    calculateBendingForce: '计算折弯力',
    openTool: '打开工具',
    comingSoon: '即将上线',
    materialAdjustmentAdvice:
      '实际 V 开口可根据目标折弯半径、开裂风险、表面质量、回弹和模具状态进行修正。',
    useAutoEstimatedRadius: '使用自动估算半径',
    manualRadiusOverrideActive: '手动半径覆盖已启用',
    autoEstimatedInsideRadius: '自动估算内半径',
    autoEstimatedInsideRadiusNote:
      '根据标准 V 开口、材料系数和小幅角度修正进行估算。',
    recommendedKFactorFor: '推荐 K 因子，材料：',
    useEstimatedRadiusFromVDieTool: '使用 V 模具工具估算半径',
    enterSheetThickness: '输入板材厚度',
  },
  ru: {
    engineeringReference: 'Инженерный справочник',
    engineeringCalculator: 'Инженерный калькулятор',
    engineeringOverview: 'Инженерный обзор',
    engineeringReferenceNotes: 'Инженерные справочные примечания',
    relatedEngineeringTools: 'Связанные инженерные инструменты',
    relatedToolsAria: 'Связанные инженерные инструменты',
    inputParameters: 'Входные параметры',
    calculationOutput: 'Результаты расчета',
    selectionOutput: 'Результат подбора',
    material: 'Материал',
    thickness: 'Толщина (мм)',
    insideRadius: 'Внутренний радиус (мм)',
    bendAngle: 'Угол гибки (градусы)',
    kFactor: 'K-фактор',
    applicationNote: 'Примечание по применению',
    engineeringNote: 'Инженерное примечание',
    referenceCondition: 'Справочное условие',
    calculateBendingForce: 'Рассчитать усилие гибки',
    openTool: 'Открыть инструмент',
    comingSoon: 'Скоро',
    materialAdjustmentAdvice:
      'Практическое раскрытие V-матрицы можно корректировать по требуемому радиусу, риску трещин, качеству поверхности, пружинению и состоянию оснастки.',
    useAutoEstimatedRadius: 'Использовать расчетный радиус',
    manualRadiusOverrideActive: 'Ручной радиус активен',
    autoEstimatedInsideRadius: 'Расчетный внутренний радиус',
    autoEstimatedInsideRadiusNote:
      'Рассчитано по стандартному раскрытию V-матрицы, коэффициенту материала и небольшой поправке на угол.',
    recommendedKFactorFor: 'Рекомендуемый K-фактор для',
    useEstimatedRadiusFromVDieTool: 'Взять радиус из инструмента V-матрицы',
    enterSheetThickness: 'Введите толщину листа',
  },
  es: {
    engineeringReference: 'Referencia de ingeniería',
    engineeringCalculator: 'Calculadora de ingeniería',
    engineeringOverview: 'Resumen de ingeniería',
    engineeringReferenceNotes: 'Notas de referencia de ingeniería',
    relatedEngineeringTools: 'Herramientas de ingeniería relacionadas',
    relatedToolsAria: 'Herramientas de ingeniería relacionadas',
    inputParameters: 'Parámetros de entrada',
    calculationOutput: 'Salida de cálculo',
    selectionOutput: 'Resultado de selección',
    material: 'Material',
    thickness: 'Espesor (mm)',
    insideRadius: 'Radio interior (mm)',
    bendAngle: 'Ángulo de plegado (grados)',
    kFactor: 'K-Factor',
    applicationNote: 'Nota de aplicación',
    engineeringNote: 'Nota de ingeniería',
    referenceCondition: 'Condición de referencia',
    calculateBendingForce: 'Calcular fuerza de plegado',
    openTool: 'Abrir herramienta',
    comingSoon: 'Próximamente',
    materialAdjustmentAdvice:
      'La abertura V práctica puede ajustarse según el radio objetivo, riesgo de grieta, calidad superficial, recuperación elástica y estado del utillaje.',
    useAutoEstimatedRadius: 'Usar radio estimado automático',
    manualRadiusOverrideActive: 'Radio manual activo',
    autoEstimatedInsideRadius: 'Radio interior estimado automático',
    autoEstimatedInsideRadiusNote:
      'Calculado desde la abertura V estándar, el factor de material y un pequeño ajuste por ángulo.',
    recommendedKFactorFor: 'K-Factor recomendado para',
    useEstimatedRadiusFromVDieTool: 'Usar radio estimado desde matriz V',
    enterSheetThickness: 'Introduzca el espesor de chapa',
  },
  tr: {
    engineeringReference: 'Mühendislik referansı',
    engineeringCalculator: 'Mühendislik hesaplayıcısı',
    engineeringOverview: 'Mühendislik özeti',
    engineeringReferenceNotes: 'Mühendislik referans notları',
    relatedEngineeringTools: 'İlgili mühendislik araçları',
    relatedToolsAria: 'İlgili mühendislik araçları',
    inputParameters: 'Giriş parametreleri',
    calculationOutput: 'Hesaplama çıktısı',
    selectionOutput: 'Seçim çıktısı',
    material: 'Malzeme',
    thickness: 'Kalınlık (mm)',
    insideRadius: 'İç radyüs (mm)',
    bendAngle: 'Büküm açısı (derece)',
    kFactor: 'K-Faktörü',
    applicationNote: 'Uygulama notu',
    engineeringNote: 'Mühendislik notu',
    referenceCondition: 'Referans koşul',
    calculateBendingForce: 'Bükme kuvvetini hesapla',
    openTool: 'Aracı aç',
    comingSoon: 'Yakında',
    materialAdjustmentAdvice:
      'Pratik V kalıp açıklığı; hedef radyüs, çatlama riski, yüzey kalitesi, geri esneme ve takım durumuna göre ayarlanabilir.',
    useAutoEstimatedRadius: 'Otomatik radyüsü kullan',
    manualRadiusOverrideActive: 'Manuel radyüs aktif',
    autoEstimatedInsideRadius: 'Otomatik tahmini iç radyüs',
    autoEstimatedInsideRadiusNote:
      'Standart V açıklığı, malzeme katsayısı ve küçük açı düzeltmesiyle hesaplanır.',
    recommendedKFactorFor: 'Önerilen K-Faktörü:',
    useEstimatedRadiusFromVDieTool: 'V kalıp aracından radyüs kullan',
    enterSheetThickness: 'Sac kalınlığını girin',
  },
  id: {
    engineeringReference: 'Referensi teknik',
    engineeringCalculator: 'Kalkulator teknik',
    engineeringOverview: 'Ringkasan teknik',
    engineeringReferenceNotes: 'Catatan referensi teknik',
    relatedEngineeringTools: 'Alat teknik terkait',
    relatedToolsAria: 'Alat teknik terkait',
    inputParameters: 'Parameter input',
    calculationOutput: 'Output perhitungan',
    selectionOutput: 'Output pemilihan',
    material: 'Material',
    thickness: 'Ketebalan (mm)',
    insideRadius: 'Radius dalam (mm)',
    bendAngle: 'Sudut tekuk (derajat)',
    kFactor: 'K-Factor',
    applicationNote: 'Catatan aplikasi',
    engineeringNote: 'Catatan teknik',
    referenceCondition: 'Kondisi referensi',
    calculateBendingForce: 'Hitung gaya tekuk',
    openTool: 'Buka alat',
    comingSoon: 'Segera hadir',
    materialAdjustmentAdvice:
      'Bukaan V praktis dapat disesuaikan menurut kebutuhan radius tekuk, risiko retak, kualitas permukaan, springback, dan kondisi tooling.',
    useAutoEstimatedRadius: 'Gunakan radius estimasi otomatis',
    manualRadiusOverrideActive: 'Override radius manual aktif',
    autoEstimatedInsideRadius: 'Radius dalam estimasi otomatis',
    autoEstimatedInsideRadiusNote:
      'Dihitung dari bukaan V standar, faktor material, dan penyesuaian kecil sudut tekuk.',
    recommendedKFactorFor: 'K-Factor rekomendasi untuk',
    useEstimatedRadiusFromVDieTool: 'Gunakan radius dari alat V-die',
    enterSheetThickness: 'Masukkan ketebalan plat',
  },
}

const materialNotes = {
  en: {
    mildSteel: 'Standard reference material for press brake tonnage calculation.',
    galvanizedSteel:
      'Similar to mild steel, coating condition may affect surface quality.',
    stainless201:
      'Higher work hardening and springback than mild steel.',
    stainless304:
      'Common stainless steel with strong springback and good corrosion resistance.',
    aluminum:
      'Low bending force but higher springback due to lower elastic modulus.',
    brass:
      'Good formability, but bending direction and hardness condition should be considered.',
  },
  zh: {
    mildSteel: '折弯力计算的常用基准材料，成形稳定性较好。',
    galvanizedSteel: '性能接近低碳钢，但镀层状态会影响表面质量。',
    stainless201: '加工硬化和回弹均高于低碳钢。',
    stainless304: '常用不锈钢材料，回弹明显，耐腐蚀性好。',
    aluminum: '所需折弯力较低，但因弹性模量较低，回弹需要关注。',
    brass: '成形性较好，但需考虑折弯方向和材料硬度状态。',
  },
  ru: {
    mildSteel: 'Базовый справочный материал для расчета усилия листогиба.',
    galvanizedSteel:
      'Близка к низкоуглеродистой стали, но покрытие влияет на качество поверхности.',
    stainless201:
      'Более сильное наклепывание и пружинение, чем у низкоуглеродистой стали.',
    stainless304:
      'Распространенная нержавеющая сталь с заметным пружинением и хорошей коррозионной стойкостью.',
    aluminum:
      'Требует меньшего усилия, но пружинение выше из-за меньшего модуля упругости.',
    brass:
      'Хорошая формуемость при правильном учете направления гибки и твердости.',
  },
  es: {
    mildSteel: 'Material base habitual para estimar el tonelaje de plegadora.',
    galvanizedSteel:
      'Similar al acero dulce; el recubrimiento puede afectar la calidad superficial.',
    stainless201:
      'Mayor endurecimiento por deformación y recuperación elástica que el acero dulce.',
    stainless304:
      'Acero inoxidable común con recuperación elástica marcada y buena resistencia a la corrosión.',
    aluminum:
      'Menor fuerza de plegado, pero mayor recuperación por su menor módulo elástico.',
    brass:
      'Buena conformabilidad, considerando dirección de plegado y condición de dureza.',
  },
  tr: {
    mildSteel: 'Abkant tonaj hesabı için standart referans malzemedir.',
    galvanizedSteel:
      'Yumuşak çeliğe benzerdir; kaplama durumu yüzey kalitesini etkileyebilir.',
    stainless201:
      'Yumuşak çeliğe göre daha yüksek pekleşme ve geri esneme gösterir.',
    stainless304:
      'Belirgin geri esnemeye ve iyi korozyon direncine sahip yaygın paslanmaz çelik.',
    aluminum:
      'Düşük bükme kuvveti ister, ancak düşük elastisite modülü nedeniyle geri esneme izlenmelidir.',
    brass:
      'Uygun sertlik ve büküm yönüyle iyi şekillendirilebilirlik sağlar.',
  },
  id: {
    mildSteel: 'Material referensi standar untuk perhitungan tonase press brake.',
    galvanizedSteel:
      'Mirip baja ringan; kondisi coating dapat memengaruhi kualitas permukaan.',
    stainless201:
      'Work hardening dan springback lebih tinggi dibanding baja ringan.',
    stainless304:
      'Stainless steel umum dengan springback kuat dan ketahanan korosi baik.',
    aluminum:
      'Gaya tekuk rendah, tetapi springback perlu diperhatikan karena modulus elastisitas lebih rendah.',
    brass:
      'Formability baik, dengan memperhatikan arah tekuk dan kondisi kekerasan.',
  },
}

const pages = {
  en: {
    hub: {
      hubName: 'ZYCO Engineering Hub',
      eyebrow: 'Engineering Tools Hub',
      title: 'ZYCO Engineering Tools',
      subtitle:
        'Professional engineering references for sheet metal bending, tooling selection and press brake setup.',
      overview:
        'The ZYCO Engineering Hub organizes practical press brake references into separate tools so engineers can check tonnage, material behavior, V-die opening, inside bend radius and springback from focused pages. These references are intended for air bending preparation, quotation checks, tooling review and production setup planning where material strength, thickness, bend length, V-opening and forming method all affect the final bending result.',
      tools: [
        ['pressBrakeCalculator', 'Professional bending force calculation system'],
        [
          'bendAllowanceCalculator',
          'Sheet metal bend allowance, bend deduction and flat pattern reference',
        ],
        [
          'materialDatabase',
          'Yield strength, tensile strength, K-factor and bending properties',
        ],
        ['springbackDatabase', 'Industrial springback reference system'],
        ['vDieSelectionTool', 'Recommended V opening and tooling selection'],
        [
          'insideRadiusGuide',
          'Inside bend radius and minimum radius reference',
        ],
        ['pressBrakeTonnageGuide', 'Practical reference for bending force and machine capacity selection'],
        ['vDieOpeningGuide', 'Practical reference for selecting V-die opening in air bending'],
        ['minimumFlangeLengthGuide', 'Engineering reference for short-flange support, V opening and forming stability'],
        ['toolingSelectionGuide', 'Structured reference for punch and die selection'],
        ['crowningGuide', 'Engineering reference for long-bend deflection compensation and angle consistency'],
        ['stainlessSteelBendingGuide', 'Engineering reference for stainless grades, springback, surface control and tooling decisions'],
        ['aluminumBendingGuide', 'Engineering reference for aluminum alloys, springback, surface protection and tooling selection'],
      ],
    },
    material: {
      title: 'Material Database',
      subtitle: 'Engineering reference for sheet metal bending materials',
      overview:
        'This material database compares common sheet metals used in press brake air bending. Material factor, strength range, inside radius reference and springback range are useful when estimating bending force, selecting tooling and preparing angle compensation. In production, the same nominal thickness can behave differently when tensile strength, coating condition, hardness, grain direction or material batch changes.',
      fields: {
        factor: 'Material Factor',
        yieldStrength: 'Yield Strength',
        tensileStrength: 'Tensile Strength',
        standardAutoVDie: 'Standard Auto V Die',
        insideRadiusReference: 'Inside Radius Reference',
        springbackRange: 'Typical Springback Range',
      },
      values: {
        standardAutoVDie: 'Calculator-based 8T / 10T / 12T rule',
        springbackReferenceCondition:
          '2 mm thickness / 90 degree air bending / V approximately 8T',
      },
      notes: [
        'Standard Auto V Die follows the same recommendation logic used in the Press Brake Calculator:',
        'T < 8 mm -> V = 8T',
        '8 mm <= T < 25 mm -> V = 10T',
        'T >= 25 mm -> V = 12T',
        'Springback and inside radius values are typical engineering reference ranges. Actual results may vary depending on material batch, thickness, V-opening, punch radius, grain direction, tooling condition and machine setup.',
      ],
      calculatorNote:
        'For thickness- and V-die-based estimation, use the Press Brake Calculator.',
      faqTitle: 'Material Database FAQ',
      faq: [
        [
          'Which material properties affect press brake tonnage most?',
          'Tonnage is strongly affected by tensile strength, sheet thickness, bend length and V-die opening. Higher-strength materials such as stainless steel need more force than mild steel at the same thickness and bend length.',
        ],
        [
          'Why are yield strength and tensile strength both useful?',
          'Yield strength helps describe when the sheet begins to plastically deform, while tensile strength is often used in practical bending force estimates. Both values help compare material behavior during forming.',
        ],
        [
          'Can the same V-die opening be used for every material?',
          'The same thickness rule can be a starting point, but material strength, crack risk, target inside radius and surface requirements may require a wider or narrower V-opening.',
        ],
        [
          'Why do material batch and grain direction matter?',
          'Real sheet material varies by batch, rolling direction and hardness condition. These factors can change cracking risk, springback and the final inside radius.',
        ],
      ],
    },
    radius: {
      title: 'Inside Radius Guide',
      subtitle: 'Industrial reference for inside bend radius selection',
      overview:
        'Inside bend radius is a key forming result in press brake air bending because it affects part fit, flat pattern development, cracking risk and final angle stability. This guide compares practical radius ranges by material so engineers can judge whether a bend is close to the forming limit or better suited for stable production.',
      fields: {
        recommendedInsideRadius: 'Recommended Inside Radius',
        minimumInsideRadius: 'Minimum Inside Radius',
        crackRisk: 'Crack Risk',
        springbackSensitivity: 'Springback Sensitivity',
      },
      values: {
        low: 'Low',
        medium: 'Medium',
        high: 'High',
        veryHigh: 'Very High',
        lowToMedium: 'Low to Medium',
        mediumToHigh: 'Medium to High',
      },
      notes: [
        'Minimum Inside Radius represents the minimum practical forming limit under favorable tooling and material conditions.',
        'Recommended Inside Radius represents a more stable production-friendly bending condition for consistent forming quality and reduced cracking risk.',
        'Actual inside radius in air bending depends mainly on the selected V-opening width and material properties.',
      ],
      faqTitle: 'Inside Radius FAQ',
      faq: [
        [
          'What determines inside bend radius in air bending?',
          'In air bending, the inside radius is mainly formed by the V-opening width and material behavior rather than by forcing the sheet fully into the die.',
        ],
        [
          'What happens if the inside radius is too small?',
          'A radius below the practical forming limit increases cracking risk, coating damage and unstable bend quality.',
        ],
        [
          'Is minimum inside radius the best production target?',
          'Not usually. Minimum radius is a forming limit reference. A recommended radius gives more stable production and more consistent angle control.',
        ],
        [
          'How does V-die opening affect inside radius?',
          'A wider V-opening generally creates a larger natural inside radius in air bending. A narrower opening can reduce radius but increases tonnage.',
        ],
      ],
    },
    springback: {
      title: 'Springback Database',
      subtitle:
        'Typical air bending springback reference by material, thickness and V-opening',
      overviewTitle: 'Press Brake Springback Engineering Overview',
      overview:
        'Springback is not a fixed value. In air bending, the final angle after unloading changes with the elastic recovery of the sheet and with practical press brake setup conditions. The values below are intended as engineering reference ranges for comparing materials and preparing trial bending compensation.',
      fields: {
        range: 'Typical Springback Range',
        reference: 'Reference Condition',
        sensitivity: 'Springback Sensitivity',
        factors: 'Main Influencing Factors',
      },
      values: {
        reference:
          '2 mm thickness / 90 degree air bending / V approximately 8T',
        sensitivity: {
          mildSteel: 'Low',
          galvanizedSteel: 'Low to Medium',
          stainless201: 'Very High',
          stainless304: 'High',
          aluminum: 'Medium to High',
          brass: 'Low',
        },
        factors: {
          mildSteel: 'V-opening, thickness, tooling condition',
          galvanizedSteel: 'Coating condition, V-opening, material batch',
          stainless201:
            'Work hardening, tensile strength, V-opening, inside radius',
          stainless304:
            'Work hardening, V-opening, inside radius, grain direction',
          aluminum:
            'Lower elastic modulus, alloy grade, temper condition, grain direction',
          brass: 'Hardness condition, grain direction, V-opening',
        },
      },
      factors: [
        'material strength',
        'thickness',
        'V-opening',
        'inside radius',
        'tooling condition',
        'bending method',
        'machine setup',
      ],
      notes: [
        'Springback values are typical reference ranges based on 2 mm sheet thickness, 90 degree air bending and V-opening around 8x material thickness.',
        'Actual springback may vary depending on material batch, thickness, V-die opening, punch radius, inside radius, grain direction, tooling condition and machine setup.',
        'For thickness-, V-die- and length-based estimation, use the Press Brake Calculator.',
      ],
      faqTitle: 'Springback FAQ',
      faq: [
        [
          'What is springback in press brake bending?',
          'Springback is the elastic recovery of the material after bending. It causes the final angle to open slightly after the bending force is released.',
        ],
        [
          'Why does stainless steel have more springback?',
          'Stainless steel usually has higher tensile strength and stronger work hardening behavior, so it tends to spring back more than mild steel.',
        ],
        [
          'Does a larger V-opening increase springback?',
          'In air bending, a larger V-opening usually produces a larger inside radius and can increase springback tendency.',
        ],
        [
          'How can springback be reduced?',
          'Springback can be reduced by using proper tooling, selecting a suitable V-opening, applying angle compensation and performing trial bending.',
        ],
      ],
    },
    vdie: {
      title: 'V Die Selection Tool',
      subtitle: 'Recommended V-opening guide for sheet metal air bending',
      overview:
        'V-die selection controls more than tool fit. In press brake air bending, V-opening width affects required tonnage, natural inside radius, springback tendency, surface marking and the available flange length. The standard 8T / 10T / 12T rule is a practical starting point, but the final die choice should also consider material strength, crack risk, punch radius, target bend radius, tooling condition and whether the job prioritizes force reduction or tight radius control.',
      output: {
        standardRule: 'Standard Auto V Die Rule',
        standardRuleValue:
          'Follows Calculator logic: 8T / 10T / 12T by thickness range',
        standardAutoVDie: 'Standard Auto V Die',
        estimatedNaturalInsideRadius: 'Estimated Natural Inside Radius',
        minimumSafeInsideRadius: 'Minimum Safe Inside Radius',
        recommendedInsideRadius: 'Recommended Inside Radius',
        materialAdjustmentAdvice: 'Material Adjustment Advice',
      },
      faqTitle: 'V Die Selection FAQ',
      faq: [
        [
          'How do I choose V-die opening for sheet metal bending?',
          'A common starting point is 8 times material thickness for thinner sheets, 10 times thickness for medium thickness and 12 times thickness for thicker plates.',
        ],
        [
          'Does a smaller V-opening reduce inside radius?',
          'Yes, a smaller V-opening generally produces a smaller natural inside radius in air bending, but it also increases bending force.',
        ],
        [
          'Why would I use a larger V-die opening?',
          'A larger V-opening can reduce required tonnage and tool load. It is often useful for thicker plates or higher-strength materials.',
        ],
        [
          'Is V-die selection the same for stainless steel and mild steel?',
          'The thickness rule can be the same starting point, but stainless steel usually needs more force and has higher springback.',
        ],
      ],
    },
    bend: {
      title: 'Bend Allowance Calculator',
      subtitle:
        'Calculate sheet metal bend allowance, bend deduction and flat pattern reference values',
      formulaReference: 'Formula Reference',
      formulaIntro:
        'Bend allowance uses the neutral axis arc length formula:',
      formulaWhere:
        'Where: A = bend angle in degrees, R = inside radius, K = K-factor, T = material thickness',
      formulaOutsideSetback: 'Outside setback: OSSB = tan(A / 2) x (R + T)',
      formulaBendDeduction: 'Bend deduction: BD = 2 x OSSB - BA',
      formulaNote:
        'These formulas are standard sheet metal development references. Actual flat pattern results may vary depending on material grade, grain direction, tooling, bend method, springback compensation and production tolerance. For production parts, trial bending and measurement are recommended.',
      output: {
        bendAllowance: 'Bend Allowance',
        outsideSetback: 'Outside Setback',
        bendDeduction: 'Bend Deduction',
      },
      overview:
        'Bend allowance is used to estimate the developed length needed for a sheet metal flat pattern before press brake forming. It is affected by material thickness, inside bend radius, bend angle, K-Factor, material ductility and the bending method. In practical air bending, the selected V-opening, tooling geometry and material condition can shift the neutral axis and change the final flat pattern reference value.',
      overview2:
        'In air bending, the inside radius is mainly determined by the V-opening and material properties. Bend angle can slightly influence the formed radius, so this calculator applies a conservative angle adjustment for engineering reference.',
      notes: [
        'K-Factor is an engineering reference value.',
        'Actual flat pattern results may vary depending on material grade, grain direction, tooling, bend method and production tolerance.',
        'For production parts, trial bending and measurement are recommended.',
      ],
      faqTitle: 'Bend Allowance FAQ',
      faq: [
        [
          'What is bend allowance?',
          'Bend allowance is the arc length of the neutral axis through the bend area. It is used to calculate the flat pattern length of a bent sheet metal part.',
        ],
        [
          'What is K-Factor?',
          'K-Factor describes the position of the neutral axis relative to the sheet thickness. It varies with material, tooling, inside radius and bending method.',
        ],
        [
          'Is K-Factor fixed for one material?',
          'No. K-Factor is a practical reference value. It can change with inside radius, V-opening, material condition and bending method.',
        ],
        [
          'How is bend deduction different from bend allowance?',
          'Bend allowance represents the developed arc length through the bend, while bend deduction is used to subtract from flange dimensions to calculate flat length.',
        ],
      ],
    },
  },
}

const localizedOverrides = {
  zh: {
    hub: {
      hubName: 'ZYCO 工程中心',
      eyebrow: '工程工具中心',
      title: 'ZYCO 工程工具',
      subtitle: '面向钣金折弯、模具选择和折弯机设定的专业工程参考。',
      overview:
        'ZYCO Engineering Hub 将常用折弯机工程参考拆分为独立工具，便于工程人员分别核对吨位、材料行为、V 型模具开口、内半径和回弹。相关参考适用于空气折弯准备、报价审核、模具评估和生产设定规划，材料强度、板厚、折弯长度、V 开口和成形方式都会影响最终折弯结果。',
      tools: [
        ['pressBrakeCalculator', '用于估算折弯力和设备吨位的专业计算工具'],
        ['bendAllowanceCalculator', '用于钣金展开量、折弯扣除和展开尺寸参考'],
        ['materialDatabase', '汇总屈服强度、抗拉强度、K 因子和折弯性能参考'],
        ['springbackDatabase', '按材料整理的工业回弹参考数据'],
        ['vDieSelectionTool', '用于选择推荐 V 开口和模具方案'],
        ['insideRadiusGuide', '用于查询内折弯半径和最小半径参考'],
        ['pressBrakeTonnageGuide', '折弯力与设备能力选型的实用参考指南'],
        ['vDieOpeningGuide', '空气折弯中选择 V 型模开口的实用参考指南'],
        ['minimumFlangeLengthGuide', '用于短翻边支撑、V 开口与成形稳定性判断的工程参考指南'],
        ['toolingSelectionGuide', '冲头与下模选型的结构化参考指南'],
        ['crowningGuide', '长工件折弯挠度补偿与角度一致性的工程参考指南'],
        ['stainlessSteelBendingGuide', '针对不锈钢牌号、回弹、表面保护与模具决策的工程参考指南'],
        ['aluminumBendingGuide', '针对铝合金牌号、回弹、表面保护与模具选择的工程参考指南'],
      ],
    },
    material: {
      title: '材料数据库',
      subtitle: '钣金折弯材料工程参考',
      overview:
        '该材料数据库对比折弯机空气折弯中常见板材。材料系数、强度范围、内半径参考和回弹范围可用于折弯力估算、模具选择和角度补偿准备。生产中，即使名义厚度相同，材料抗拉强度、镀层状态、硬度、纹理方向或批次变化也会造成不同成形表现。',
      fields: {
        factor: '材料系数',
        yieldStrength: '屈服强度',
        tensileStrength: '抗拉强度',
        standardAutoVDie: '标准自动 V 开口',
        insideRadiusReference: '内半径参考',
        springbackRange: '典型回弹范围',
      },
      values: {
        standardAutoVDie: '基于计算器的 8T / 10T / 12T 规则',
        springbackReferenceCondition: '2 mm 板厚 / 90 度空气折弯 / V 约为 8T',
      },
      notes: [
        '标准自动 V 开口遵循折弯机计算器中的同一推荐逻辑：',
        'T < 8 mm -> V = 8T',
        '8 mm <= T < 25 mm -> V = 10T',
        'T >= 25 mm -> V = 12T',
        '回弹和内半径为典型工程参考范围。实际结果会随材料批次、板厚、V 开口、冲头半径、纹理方向、模具状态和设备设定变化。',
      ],
      calculatorNote: '如需基于板厚和 V 开口估算，请使用折弯机计算器。',
      faqTitle: '材料数据库 FAQ',
      faq: [
        [
          '哪些材料属性对折弯机吨位影响最大？',
          '吨位主要受抗拉强度、板厚、折弯长度和 V 型模具开口影响。在相同板厚和长度下，不锈钢等高强度材料通常需要比低碳钢更大的折弯力。',
        ],
        [
          '为什么屈服强度和抗拉强度都需要参考？',
          '屈服强度用于判断材料开始产生塑性变形的区间，抗拉强度则常用于实际折弯力估算。两者结合有助于比较不同材料的成形行为。',
        ],
        [
          '同一个 V 开口可以用于所有材料吗？',
          '按板厚选择 V 开口可以作为起点，但材料强度、开裂风险、目标内半径和表面要求可能需要加宽或缩小 V 开口。',
        ],
        [
          '为什么材料批次和纹理方向重要？',
          '板材会随批次、轧制方向和硬度状态变化。这些因素会改变开裂风险、回弹和最终内半径，尤其在不锈钢和铝材中更明显。',
        ],
      ],
    },
    radius: {
      title: '内半径指南',
      subtitle: '内折弯半径选择的工业参考',
      overview:
        '内折弯半径是折弯机空气折弯的重要成形结果，会影响零件配合、展开尺寸、开裂风险和最终角度稳定性。本指南按材料对比实用半径范围，帮助工程人员判断折弯是否接近成形极限，或更适合稳定量产。',
      fields: {
        recommendedInsideRadius: '推荐内半径',
        minimumInsideRadius: '最小内半径',
        crackRisk: '开裂风险',
        springbackSensitivity: '回弹敏感性',
      },
      values: {
        low: '低',
        medium: '中',
        high: '高',
        veryHigh: '很高',
        lowToMedium: '低至中',
        mediumToHigh: '中至高',
      },
      notes: [
        '最小内半径表示在材料和模具条件较有利时可实现的实用成形下限。',
        '推荐内半径更适合稳定生产，可提高成形一致性并降低开裂风险。',
        '空气折弯中的实际内半径主要取决于所选 V 开口宽度和材料特性。',
      ],
      faqTitle: '内半径 FAQ',
      faq: [
        [
          '空气折弯中的内半径由什么决定？',
          '空气折弯中，内半径主要由 V 开口宽度和材料行为形成，而不是将板材完全压入下模。板厚、材料强度和冲头半径也会影响最终半径。',
        ],
        [
          '内半径过小会产生什么问题？',
          '低于实用成形极限的半径会提高开裂、镀层损伤和折弯质量不稳定的风险，硬质不锈钢、镀锌板和部分铝材状态尤其需要注意。',
        ],
        [
          '最小内半径适合作为量产目标吗？',
          '通常不建议。最小半径是成形极限参考，推荐半径更有利于稳定生产、降低开裂风险并保持角度一致性。',
        ],
        [
          'V 开口如何影响内半径？',
          '更宽的 V 开口通常会形成更大的自然内半径；更窄的开口可以减小半径，但会提高吨位需求，并可能增加压痕或开裂风险。',
        ],
      ],
    },
    springback: {
      title: '回弹数据库',
      subtitle: '按材料、厚度和 V 开口整理的空气折弯回弹参考',
      overviewTitle: '折弯机回弹工程概述',
      overview:
        '回弹不是固定值。在空气折弯中，卸载后的最终角度会随板材弹性恢复和实际折弯机设定条件变化。以下数据用于材料对比和试弯补偿准备的工程参考范围。',
      fields: {
        range: '典型回弹范围',
        reference: '参考条件',
        sensitivity: '回弹敏感性',
        factors: '主要影响因素',
      },
      values: {
        reference: '2 mm 板厚 / 90 度空气折弯 / V 约为 8T',
        sensitivity: {
          mildSteel: '低',
          galvanizedSteel: '低至中',
          stainless201: '很高',
          stainless304: '高',
          aluminum: '中至高',
          brass: '低',
        },
        factors: {
          mildSteel: 'V 开口、板厚、模具状态',
          galvanizedSteel: '镀层状态、V 开口、材料批次',
          stainless201: '加工硬化、抗拉强度、V 开口、内半径',
          stainless304: '加工硬化、V 开口、内半径、纹理方向',
          aluminum: '较低弹性模量、合金牌号、热处理状态、纹理方向',
          brass: '硬度状态、纹理方向、V 开口',
        },
      },
      factors: [
        '材料强度',
        '板厚',
        'V 开口',
        '内半径',
        '模具状态',
        '折弯方式',
        '设备设定',
      ],
      notes: [
        '回弹值为典型参考范围，基于 2 mm 板厚、90 度空气折弯和约 8 倍板厚的 V 开口。',
        '实际回弹会随材料批次、板厚、V 开口、冲头半径、内半径、纹理方向、模具状态和设备设定变化。',
        '如需基于板厚、V 开口和折弯长度估算，请使用折弯机计算器。',
      ],
      faqTitle: '回弹 FAQ',
      faq: [
        [
          '折弯机折弯中的回弹是什么？',
          '回弹是材料在折弯后卸载产生的弹性恢复，会使最终角度在释放压力后略微张开。',
        ],
        [
          '为什么不锈钢回弹更大？',
          '不锈钢通常具有更高抗拉强度和更明显的加工硬化，因此相比低碳钢更容易产生较大回弹。',
        ],
        [
          '更大的 V 开口会增加回弹吗？',
          '在空气折弯中，更大的 V 开口通常会形成更大的内半径，并可能增加回弹趋势。',
        ],
        [
          '如何降低回弹影响？',
          '可通过合适的模具、合理 V 开口、角度补偿和试弯来控制回弹。量产前应结合实际设备和材料批次验证。',
        ],
      ],
    },
    vdie: {
      title: 'V 型模具选择工具',
      subtitle: '钣金空气折弯推荐 V 开口指南',
      overview:
        'V 型模具选择不仅关系到模具匹配。在折弯机空气折弯中，V 开口宽度会影响所需吨位、自然内半径、回弹趋势、表面压痕和可成形翻边长度。标准 8T / 10T / 12T 规则是实用起点，最终模具选择还应考虑材料强度、开裂风险、冲头半径、目标折弯半径、模具状态以及工件更重视降低载荷还是控制小半径。',
      output: {
        standardRule: '标准自动 V 开口规则',
        standardRuleValue: '按板厚区间遵循计算器逻辑：8T / 10T / 12T',
        standardAutoVDie: '标准自动 V 开口',
        estimatedNaturalInsideRadius: '估算自然内半径',
        minimumSafeInsideRadius: '最小安全内半径',
        recommendedInsideRadius: '推荐内半径',
        materialAdjustmentAdvice: '材料修正建议',
      },
      faqTitle: 'V 型模具选择 FAQ',
      faq: [
        [
          '如何为钣金折弯选择 V 开口？',
          '常用起点是薄板取 8 倍板厚，中等厚度取 10 倍板厚，厚板取 12 倍板厚。最终选择还需核对半径、吨位、翻边长度和材料风险。',
        ],
        [
          '更小的 V 开口会减小内半径吗？',
          '通常会。较小 V 开口会形成更小的自然内半径，但同时会提高折弯力，并可能增加压痕或开裂风险。',
        ],
        [
          '为什么要使用更大的 V 开口？',
          '更大的 V 开口可降低所需吨位和模具载荷，常用于厚板或高强度材料，但也可能增大内半径和回弹。',
        ],
        [
          '不锈钢和低碳钢的 V 开口选择相同吗？',
          '板厚规则可以作为相同起点，但不锈钢通常需要更大折弯力且回弹更高，因此应更仔细复核半径和角度补偿。',
        ],
      ],
    },
    bend: {
      title: '折弯展开计算器',
      subtitle: '计算钣金折弯展开量、折弯扣除和展开参考值',
      formulaReference: '公式参考',
      formulaIntro: '折弯展开量采用中性层弧长公式：',
      formulaWhere: '其中：A = 折弯角度，R = 内半径，K = K 因子，T = 材料厚度',
      formulaOutsideSetback: '外侧退让量：OSSB = tan(A / 2) x (R + T)',
      formulaBendDeduction: '折弯扣除：BD = 2 x OSSB - BA',
      formulaNote:
        '这些公式为标准钣金展开参考。实际展开结果会随材料牌号、纹理方向、模具、折弯方式、回弹补偿和生产公差变化。量产零件建议通过试弯和测量确认。',
      output: {
        bendAllowance: '折弯展开量',
        outsideSetback: '外侧退让量',
        bendDeduction: '折弯扣除',
      },
      overview:
        '折弯展开量用于估算折弯成形前钣金展开所需的展开长度。它受材料厚度、内半径、折弯角度、K 因子、材料延展性和折弯方式影响。在实际空气折弯中，所选 V 开口、模具几何和材料状态会改变中性层位置，从而改变最终展开参考值。',
      overview2:
        '空气折弯中，内半径主要由 V 开口和材料属性决定。折弯角度会轻微影响成形半径，因此本计算器采用保守角度修正作为工程参考。',
      notes: [
        'K 因子是工程参考值。',
        '实际展开结果会随材料牌号、纹理方向、模具、折弯方式和生产公差变化。',
        '量产零件建议通过试弯和测量确认。',
      ],
      faqTitle: '折弯展开 FAQ',
      faq: [
        [
          '什么是折弯展开量？',
          '折弯展开量是折弯区域中性层弧长，用于计算钣金折弯件的展开长度。',
        ],
        [
          '什么是 K 因子？',
          'K 因子描述中性层相对板厚的位置，会随材料、模具、内半径和折弯方式变化。',
        ],
        [
          '同一种材料的 K 因子是固定的吗？',
          '不是。K 因子是实用参考值，会随内半径、V 开口、材料状态和折弯方式变化。',
        ],
        [
          '折弯扣除和折弯展开量有什么区别？',
          '折弯展开量表示折弯区域展开弧长，折弯扣除则用于从法兰尺寸中扣减，以计算展开长度。',
        ],
      ],
    },
  },
  ru: {
    hub: {
      hubName: 'Инженерный центр ZYCO',
      eyebrow: 'Центр инженерных инструментов',
      title: 'Инженерные инструменты ZYCO',
      subtitle:
        'Профессиональные справочные материалы для гибки листа, выбора оснастки и настройки листогиба.',
      overview:
        'ZYCO Engineering Hub объединяет практические справочники по листогибу в отдельные инструменты, чтобы инженер мог проверить усилие, поведение материала, раскрытие V-матрицы, внутренний радиус и пружинение на специализированных страницах.',
      tools: [
        ['pressBrakeCalculator', 'Профессиональный расчет усилия гибки'],
        ['bendAllowanceCalculator', 'Припуск на гиб, вычет гиба и справка по развертке листа'],
        ['materialDatabase', 'Предел текучести, прочность, K-фактор и свойства гибки'],
        ['springbackDatabase', 'Промышленный справочник по пружинению'],
        ['vDieSelectionTool', 'Рекомендации по раскрытию V-матрицы и выбору оснастки'],
        ['insideRadiusGuide', 'Справка по внутреннему и минимальному радиусу гибки'],
        ['pressBrakeTonnageGuide', 'Практическое руководство по усилию гибки и выбору мощности станка'],
        ['vDieOpeningGuide', 'Практический справочник по выбору раскрытия V-матрицы при воздушной гибке'],
        ['minimumFlangeLengthGuide', 'Инженерный справочник по опоре короткой полки, раскрытию V и устойчивости гибки'],
        ['toolingSelectionGuide', 'Структурированный справочник по выбору пуансона и матрицы'],
        ['crowningGuide', 'Инженерный справочник по компенсации прогиба и точности длинного гиба'],
        ['stainlessSteelBendingGuide', 'Инженерный справочник по маркам нержавеющей стали, пружинению, поверхности и оснастке'],
        ['aluminumBendingGuide', 'Инженерный справочник по алюминиевым сплавам, пружинению, защите поверхности и оснастке'],
      ],
    },
    material: {
      title: 'База материалов',
      subtitle: 'Инженерный справочник по материалам для гибки листа',
      fields: {
        factor: 'Коэффициент материала',
        yieldStrength: 'Предел текучести',
        tensileStrength: 'Предел прочности',
        standardAutoVDie: 'Стандартная V-матрица',
        insideRadiusReference: 'Справочный внутренний радиус',
        springbackRange: 'Типовой диапазон пружинения',
      },
      values: {
        standardAutoVDie: 'Правило калькулятора 8T / 10T / 12T',
        springbackReferenceCondition:
          'Толщина 2 мм / воздушная гибка 90 градусов / V около 8T',
      },
      overview:
        'Эта база сравнивает распространенные листовые материалы для воздушной гибки на листогибе. Коэффициент материала, диапазон прочности, внутренний радиус и пружинение помогают оценивать усилие, выбирать оснастку и готовить компенсацию угла.',
      notes: [
        'Стандартная V-матрица следует той же логике рекомендаций, что и калькулятор листогиба:',
        'T < 8 мм -> V = 8T',
        '8 мм <= T < 25 мм -> V = 10T',
        'T >= 25 мм -> V = 12T',
        'Пружинение и внутренний радиус являются типовыми инженерными диапазонами. Фактический результат зависит от партии материала, толщины, раскрытия V-матрицы, радиуса пуансона, направления прокатки, состояния оснастки и настройки станка.',
      ],
      calculatorNote:
        'Для оценки по толщине и V-матрице используйте калькулятор листогиба.',
      faqTitle: 'FAQ по базе материалов',
      faq: [
        ['Какие свойства материала сильнее всего влияют на усилие гибки?', 'На усилие существенно влияют прочность на растяжение, толщина листа, длина гиба и раскрытие V-матрицы. Более прочные материалы требуют большего усилия при той же толщине и длине.'],
        ['Зачем учитывать предел текучести и прочность на растяжение?', 'Предел текучести показывает начало пластической деформации, а прочность на растяжение часто используется в практических оценках усилия гибки. Вместе они помогают сравнивать поведение материалов.'],
        ['Можно ли использовать одно раскрытие V-матрицы для всех материалов?', 'Правило по толщине подходит как начальная точка, но прочность, риск трещин, требуемый радиус и требования к поверхности могут потребовать изменения раскрытия.'],
        ['Почему важны партия материала и направление прокатки?', 'Реальный лист меняется по партии, направлению прокатки и твердости. Эти факторы влияют на трещины, пружинение и конечный внутренний радиус.'],
      ],
    },
    radius: {
      title: 'Справочник внутреннего радиуса',
      subtitle: 'Промышленный справочник для выбора внутреннего радиуса гибки',
      fields: {
        recommendedInsideRadius: 'Рекомендуемый внутренний радиус',
        minimumInsideRadius: 'Минимальный внутренний радиус',
        crackRisk: 'Риск трещин',
        springbackSensitivity: 'Чувствительность к пружинению',
      },
      values: {
        low: 'Низкий',
        medium: 'Средний',
        high: 'Высокий',
        veryHigh: 'Очень высокий',
        lowToMedium: 'Низкий-средний',
        mediumToHigh: 'Средний-высокий',
      },
      overview:
        'Внутренний радиус является важным результатом воздушной гибки, так как влияет на посадку детали, развертку, риск трещин и стабильность угла. Справочник помогает оценить, находится ли гиб близко к пределу формовки или лучше подходит для стабильного производства.',
      notes: [
        'Минимальный внутренний радиус показывает практический нижний предел формовки при благоприятных условиях материала и оснастки.',
        'Рекомендуемый внутренний радиус дает более стабильное серийное производство и снижает риск трещин.',
        'Фактический радиус при воздушной гибке в основном зависит от раскрытия V-матрицы и свойств материала.',
      ],
      faqTitle: 'FAQ по внутреннему радиусу',
      faq: [
        ['Что определяет внутренний радиус при воздушной гибке?', 'Радиус в основном формируется раскрытием V-матрицы и поведением материала, а не полным вдавливанием листа в матрицу.'],
        ['Что происходит при слишком малом радиусе?', 'Радиус ниже практического предела повышает риск трещин, повреждения покрытия и нестабильного качества гибки.'],
        ['Является ли минимальный радиус лучшей целью для производства?', 'Обычно нет. Минимальный радиус является пределом формовки, а рекомендуемый радиус обеспечивает более стабильный процесс.'],
        ['Как раскрытие V-матрицы влияет на радиус?', 'Большее раскрытие обычно дает больший естественный радиус. Меньшее раскрытие уменьшает радиус, но повышает усилие и риск следов или трещин.'],
      ],
    },
    springback: {
      title: 'База пружинения',
      subtitle:
        'Типовой справочник по пружинению при воздушной гибке по материалам, толщине и V-матрице',
      overviewTitle: 'Инженерный обзор пружинения листогиба',
      fields: {
        range: 'Типовой диапазон пружинения',
        reference: 'Справочное условие',
        sensitivity: 'Чувствительность к пружинению',
        factors: 'Основные влияющие факторы',
      },
      values: {
        reference:
          'Толщина 2 мм / воздушная гибка 90 градусов / V около 8T',
        sensitivity: {
          mildSteel: 'Низкий',
          galvanizedSteel: 'Низкий-средний',
          stainless201: 'Очень высокий',
          stainless304: 'Высокий',
          aluminum: 'Средний-высокий',
          brass: 'Низкий',
        },
        factors: {
          mildSteel: 'Раскрытие V-матрицы, толщина, состояние оснастки',
          galvanizedSteel: 'Состояние покрытия, V-матрица, партия материала',
          stainless201:
            'Наклеп, прочность на растяжение, V-матрица, внутренний радиус',
          stainless304:
            'Наклеп, V-матрица, внутренний радиус, направление прокатки',
          aluminum:
            'Низкий модуль упругости, марка сплава, состояние поставки, направление прокатки',
          brass: 'Твердость, направление прокатки, V-матрица',
        },
      },
      factors: ['прочность материала', 'толщина', 'раскрытие V-матрицы', 'внутренний радиус', 'состояние оснастки', 'метод гибки', 'настройка станка'],
      notes: [
        'Значения пружинения являются типовыми диапазонами для листа 2 мм, воздушной гибки 90 градусов и раскрытия V-матрицы около 8T.',
        'Фактическое пружинение зависит от партии материала, толщины, V-матрицы, радиуса пуансона, внутреннего радиуса, направления прокатки, состояния оснастки и настройки станка.',
        'Для оценки по толщине, V-матрице и длине гиба используйте калькулятор листогиба.',
      ],
      faqTitle: 'FAQ по пружинению',
      faq: [
        ['Что такое пружинение при гибке?', 'Пружинение - это упругое восстановление материала после гибки, из-за которого конечный угол немного раскрывается после снятия усилия.'],
        ['Почему у нержавеющей стали больше пружинение?', 'Нержавеющая сталь обычно имеет более высокую прочность и выраженное наклепывание, поэтому пружинит сильнее низкоуглеродистой стали.'],
        ['Увеличивает ли большая V-матрица пружинение?', 'При воздушной гибке большее раскрытие часто формирует больший радиус и может повышать склонность к пружинению.'],
        ['Как уменьшить влияние пружинения?', 'Используйте подходящую оснастку, корректное раскрытие V-матрицы, компенсацию угла и пробную гибку.'],
      ],
    },
    vdie: {
      title: 'Инструмент подбора V-матрицы',
      subtitle: 'Рекомендации по раскрытию V-матрицы для воздушной гибки листа',
      output: {
        standardRule: 'Правило стандартной V-матрицы',
        standardRuleValue:
          'Следует логике калькулятора: 8T / 10T / 12T по диапазону толщины',
        standardAutoVDie: 'Стандартная V-матрица',
        estimatedNaturalInsideRadius: 'Расчетный естественный внутренний радиус',
        minimumSafeInsideRadius: 'Минимальный безопасный внутренний радиус',
        recommendedInsideRadius: 'Рекомендуемый внутренний радиус',
        materialAdjustmentAdvice: 'Рекомендация по корректировке материала',
      },
      overview:
        'Выбор V-матрицы влияет не только на посадку инструмента. При воздушной гибке раскрытие V-матрицы определяет усилие, естественный внутренний радиус, склонность к пружинению, следы на поверхности и доступную длину полки.',
      faqTitle: 'FAQ по выбору V-матрицы',
      faq: [
        ['Как выбрать раскрытие V-матрицы для гибки листа?', 'Обычно начинают с 8T для тонких листов, 10T для средней толщины и 12T для толстых плит. Затем проверяют радиус, усилие, длину полки и риск материала.'],
        ['Уменьшает ли меньшая V-матрица внутренний радиус?', 'Да, меньшее раскрытие обычно уменьшает естественный радиус, но повышает усилие и риск следов или трещин.'],
        ['Зачем использовать большую V-матрицу?', 'Большее раскрытие снижает усилие и нагрузку на оснастку, что полезно для толстых или высокопрочных материалов.'],
        ['Одинаков ли выбор V-матрицы для нержавеющей и мягкой стали?', 'Правило по толщине может быть одинаковой отправной точкой, но нержавеющая сталь требует большего усилия и имеет большее пружинение.'],
      ],
    },
    bend: {
      title: 'Калькулятор припуска на гиб',
      subtitle:
        'Расчет припуска на гиб, вычета гиба и справочных значений развертки',
      formulaReference: 'Справка по формулам',
      formulaIntro: 'Припуск на гиб рассчитывается по длине дуги нейтральной оси:',
      formulaWhere: 'Где: A = угол гибки в градусах, R = внутренний радиус, K = K-фактор, T = толщина материала',
      formulaOutsideSetback: 'Внешний отступ: OSSB = tan(A / 2) x (R + T)',
      formulaBendDeduction: 'Вычет гиба: BD = 2 x OSSB - BA',
      formulaNote:
        'Эти формулы являются стандартной справкой по развертке листа. Фактическая развертка зависит от марки материала, направления прокатки, оснастки, метода гибки, компенсации пружинения и допуска производства.',
      output: {
        bendAllowance: 'Припуск на гиб',
        outsideSetback: 'Внешний отступ',
        bendDeduction: 'Вычет гиба',
      },
      overview:
        'Припуск на гиб используется для оценки развернутой длины листовой детали до формовки на листогибе. На него влияют толщина, внутренний радиус, угол гибки, K-фактор, пластичность материала и метод гибки.',
      overview2:
        'При воздушной гибке внутренний радиус в основном задается раскрытием V-матрицы и свойствами материала. Угол гибки может немного менять сформированный радиус, поэтому применяется консервативная поправка.',
      notes: [
        'K-фактор является инженерным справочным значением.',
        'Фактическая развертка зависит от марки материала, направления прокатки, оснастки, метода гибки и допуска производства.',
        'Для серийных деталей рекомендуется пробная гибка и измерение.',
      ],
      faqTitle: 'FAQ по припуску на гиб',
      faq: [
        ['Что такое припуск на гиб?', 'Это длина дуги нейтральной оси в зоне гиба, используемая для расчета развертки листовой детали.'],
        ['Что такое K-фактор?', 'K-фактор описывает положение нейтральной оси относительно толщины листа и зависит от материала, оснастки, радиуса и метода гибки.'],
        ['Фиксирован ли K-фактор для одного материала?', 'Нет. Это практическое справочное значение, которое меняется с радиусом, V-матрицей, состоянием материала и методом гибки.'],
        ['Чем вычет гиба отличается от припуска?', 'Припуск описывает развернутую дугу гиба, а вычет гиба вычитается из размеров полок для расчета развертки.'],
      ],
    },
  },
  es: {
    hub: {
      hubName: 'Centro de ingeniería ZYCO',
      eyebrow: 'Centro de herramientas de ingeniería',
      title: 'Herramientas de ingeniería ZYCO',
      subtitle:
        'Referencias profesionales para plegado de chapa, selección de utillaje y ajuste de plegadora.',
      overview:
        'ZYCO Engineering Hub organiza referencias prácticas de plegadora en herramientas separadas para comprobar fuerza, comportamiento del material, abertura V, radio interior y recuperación elástica en páginas específicas.',
      tools: [
        ['pressBrakeCalculator', 'Sistema profesional para calcular la fuerza de plegado'],
        ['bendAllowanceCalculator', 'Desarrollo, deducción de plegado y referencia de patrón plano'],
        ['materialDatabase', 'Límite elástico, resistencia, K-Factor y propiedades de plegado'],
        ['springbackDatabase', 'Sistema industrial de referencia de recuperación elástica'],
        ['vDieSelectionTool', 'Abertura V recomendada y selección de utillaje'],
        ['insideRadiusGuide', 'Referencia de radio interior y radio mínimo'],
        ['pressBrakeTonnageGuide', 'Guía práctica para fuerza de plegado y selección de capacidad de máquina'],
        ['vDieOpeningGuide', 'Guía práctica para seleccionar la abertura de matriz V en plegado al aire'],
        ['minimumFlangeLengthGuide', 'Referencia técnica para apoyo de pestañas cortas, abertura V y estabilidad del plegado'],
        ['toolingSelectionGuide', 'Referencia estructurada para seleccionar punzón y matriz'],
        ['crowningGuide', 'Referencia técnica para compensación de flecha y precisión en pliegues largos'],
        ['stainlessSteelBendingGuide', 'Referencia técnica para calidades inoxidables, retorno, protección superficial y utillaje'],
        ['aluminumBendingGuide', 'Referencia técnica para aleaciones de aluminio, retorno elástico, protección superficial y utillaje'],
      ],
    },
    material: {
      title: 'Base de datos de materiales',
      subtitle: 'Referencia de ingeniería para materiales de plegado de chapa',
      fields: {
        factor: 'Factor de material',
        yieldStrength: 'Límite elástico',
        tensileStrength: 'Resistencia a tracción',
        standardAutoVDie: 'Matriz V automática estándar',
        insideRadiusReference: 'Referencia de radio interior',
        springbackRange: 'Rango típico de recuperación',
      },
      values: {
        standardAutoVDie: 'Regla 8T / 10T / 12T basada en la calculadora',
        springbackReferenceCondition:
          'Espesor 2 mm / plegado al aire 90 grados / V aproximadamente 8T',
      },
      overview:
        'Esta base compara chapas comunes usadas en plegado al aire. El factor de material, los rangos de resistencia, el radio interior y la recuperación elástica ayudan a estimar fuerza, seleccionar utillaje y preparar compensación angular.',
      notes: [
        'La matriz V automática estándar sigue la misma lógica de recomendación que la calculadora de plegadora:',
        'T < 8 mm -> V = 8T',
        '8 mm <= T < 25 mm -> V = 10T',
        'T >= 25 mm -> V = 12T',
        'La recuperación elástica y el radio interior son rangos típicos de referencia. El resultado real depende del lote, espesor, abertura V, radio del punzón, dirección de laminación, estado del utillaje y ajuste de máquina.',
      ],
      calculatorNote:
        'Para estimar por espesor y matriz V, use la calculadora de plegadora.',
      faqTitle: 'FAQ de materiales',
      faq: [
        ['¿Qué propiedades afectan más al tonelaje?', 'El tonelaje depende principalmente de la resistencia a tracción, espesor, longitud de plegado y abertura V. Materiales más resistentes requieren más fuerza.'],
        ['¿Por qué son útiles el límite elástico y la resistencia a tracción?', 'El límite elástico indica el inicio de la deformación plástica, mientras que la resistencia a tracción se usa a menudo para estimar fuerza de plegado.'],
        ['¿Puede usarse la misma abertura V para todos los materiales?', 'La regla por espesor es un punto de partida, pero resistencia, riesgo de grieta, radio objetivo y superficie pueden exigir ajustes.'],
        ['¿Por qué importan el lote y la dirección de laminación?', 'El material real cambia por lote, dirección de laminación y dureza, afectando grietas, recuperación y radio final.'],
      ],
    },
    radius: {
      title: 'Guía de radio interior',
      subtitle: 'Referencia industrial para seleccionar el radio interior',
      fields: {
        recommendedInsideRadius: 'Radio interior recomendado',
        minimumInsideRadius: 'Radio interior mínimo',
        crackRisk: 'Riesgo de grieta',
        springbackSensitivity: 'Sensibilidad a recuperación',
      },
      values: {
        low: 'Bajo',
        medium: 'Medio',
        high: 'Alto',
        veryHigh: 'Muy alto',
        lowToMedium: 'Bajo a medio',
        mediumToHigh: 'Medio a alto',
      },
      overview:
        'El radio interior es un resultado clave del plegado al aire porque afecta al montaje, desarrollo, riesgo de grieta y estabilidad angular. Esta guía compara rangos prácticos por material.',
      notes: [
        'El radio interior mínimo representa el límite práctico de conformado bajo condiciones favorables de material y utillaje.',
        'El radio recomendado ofrece una condición más estable para producción y reduce el riesgo de grieta.',
        'El radio real en plegado al aire depende sobre todo de la abertura V seleccionada y de las propiedades del material.',
      ],
      faqTitle: 'FAQ de radio interior',
      faq: [
        ['¿Qué determina el radio interior en plegado al aire?', 'Lo determinan principalmente la abertura V y el comportamiento del material, no el cierre total contra la matriz.'],
        ['¿Qué ocurre si el radio es demasiado pequeño?', 'Aumenta el riesgo de grieta, daño de recubrimiento e inestabilidad de calidad.'],
        ['¿Es el radio mínimo el mejor objetivo de producción?', 'Normalmente no. Es un límite de conformado; el radio recomendado da un proceso más estable.'],
        ['¿Cómo afecta la abertura V al radio?', 'Una abertura mayor genera un radio natural mayor. Una abertura menor reduce el radio, pero aumenta fuerza y riesgo de marcas.'],
      ],
    },
    springback: {
      title: 'Base de datos de recuperación elástica',
      subtitle:
        'Referencia típica de recuperación en plegado al aire por material, espesor y abertura V',
      overviewTitle: 'Resumen de ingeniería de recuperación elástica',
      fields: {
        range: 'Rango típico de recuperación',
        reference: 'Condición de referencia',
        sensitivity: 'Sensibilidad a recuperación',
        factors: 'Factores principales',
      },
      values: {
        reference:
          'Espesor 2 mm / plegado al aire 90 grados / V aproximadamente 8T',
        sensitivity: {
          mildSteel: 'Bajo',
          galvanizedSteel: 'Bajo a medio',
          stainless201: 'Muy alto',
          stainless304: 'Alto',
          aluminum: 'Medio a alto',
          brass: 'Bajo',
        },
        factors: {
          mildSteel: 'Abertura V, espesor, estado del utillaje',
          galvanizedSteel: 'Estado del recubrimiento, abertura V, lote de material',
          stainless201:
            'Endurecimiento por deformación, resistencia a tracción, abertura V, radio interior',
          stainless304:
            'Endurecimiento por deformación, abertura V, radio interior, dirección de laminación',
          aluminum:
            'Módulo elástico bajo, aleación, temple, dirección de laminación',
          brass: 'Condición de dureza, dirección de laminación, abertura V',
        },
      },
      overview:
        'La recuperación elástica no es fija. En plegado al aire, el ángulo final tras descargar cambia por la recuperación del material y por las condiciones reales de ajuste de la plegadora.',
      factors: ['resistencia del material', 'espesor', 'abertura V', 'radio interior', 'estado del utillaje', 'método de plegado', 'ajuste de máquina'],
      notes: [
        'Los valores son rangos típicos basados en chapa de 2 mm, plegado al aire de 90 grados y abertura V cercana a 8T.',
        'La recuperación real depende del lote, espesor, abertura V, radio de punzón, radio interior, dirección de laminación, utillaje y ajuste de máquina.',
        'Para estimación por espesor, V y longitud, use la calculadora de plegadora.',
      ],
      faqTitle: 'FAQ de recuperación elástica',
      faq: [
        ['¿Qué es la recuperación elástica?', 'Es la recuperación elástica del material después del plegado, que hace que el ángulo final se abra ligeramente.'],
        ['¿Por qué el inoxidable recupera más?', 'Suele tener mayor resistencia y endurecimiento por deformación, por lo que recupera más que el acero dulce.'],
        ['¿Una abertura V mayor aumenta la recuperación?', 'En plegado al aire, una abertura mayor suele producir un radio mayor y puede aumentar la recuperación.'],
        ['¿Cómo se reduce la recuperación?', 'Con utillaje adecuado, abertura V correcta, compensación angular y prueba de plegado.'],
      ],
    },
    vdie: {
      title: 'Herramienta de selección de matriz V',
      subtitle: 'Guía de abertura V recomendada para plegado al aire',
      output: {
        standardRule: 'Regla automática de matriz V',
        standardRuleValue:
          'Sigue la lógica de la calculadora: 8T / 10T / 12T por rango de espesor',
        standardAutoVDie: 'Matriz V automática estándar',
        estimatedNaturalInsideRadius: 'Radio interior natural estimado',
        minimumSafeInsideRadius: 'Radio interior mínimo seguro',
        recommendedInsideRadius: 'Radio interior recomendado',
        materialAdjustmentAdvice: 'Consejo de ajuste por material',
      },
      overview:
        'La selección de matriz V controla fuerza requerida, radio interior natural, tendencia de recuperación, marcas superficiales y longitud de pestaña disponible. La regla 8T / 10T / 12T es un punto de partida práctico.',
      faqTitle: 'FAQ de selección de matriz V',
      faq: [
        ['¿Cómo elijo la abertura V?', 'Use como inicio 8T para chapas finas, 10T para espesores medios y 12T para placas gruesas, verificando radio, fuerza y longitud de pestaña.'],
        ['¿Una abertura menor reduce el radio?', 'Sí, suele reducir el radio natural, pero aumenta la fuerza y el riesgo de marcas o grietas.'],
        ['¿Por qué usar una abertura V mayor?', 'Reduce fuerza y carga de utillaje, útil en placas gruesas o materiales de mayor resistencia.'],
        ['¿Es igual para inoxidable y acero dulce?', 'La regla inicial puede ser la misma, pero el inoxidable requiere más fuerza y tiene mayor recuperación.'],
      ],
    },
    bend: {
      title: 'Calculadora de desarrollo de plegado',
      subtitle:
        'Calcular desarrollo, deducción de plegado y valores de referencia de patrón plano',
      formulaReference: 'Referencia de fórmulas',
      formulaIntro:
        'El desarrollo de plegado usa la fórmula de longitud de arco de la fibra neutra:',
      formulaWhere:
        'Donde: A = ángulo de plegado en grados, R = radio interior, K = K-Factor, T = espesor del material',
      formulaOutsideSetback: 'Retroceso exterior: OSSB = tan(A / 2) x (R + T)',
      formulaBendDeduction: 'Deducción de plegado: BD = 2 x OSSB - BA',
      formulaNote:
        'Estas fórmulas son referencias estándar de desarrollo de chapa. El resultado real puede variar por material, dirección de laminación, utillaje, método, compensación de recuperación y tolerancia.',
      output: {
        bendAllowance: 'Desarrollo de plegado',
        outsideSetback: 'Retroceso exterior',
        bendDeduction: 'Deducción de plegado',
      },
      overview:
        'El desarrollo de plegado estima la longitud desplegada necesaria antes del conformado. Depende del espesor, radio interior, ángulo, K-Factor, ductilidad y método de plegado.',
      overview2:
        'En plegado al aire, el radio interior depende principalmente de la abertura V y del material. El ángulo puede influir ligeramente, por lo que se aplica un ajuste conservador.',
      notes: [
        'K-Factor es un valor de referencia de ingeniería.',
        'El patrón plano real puede variar según material, dirección de laminación, utillaje, método y tolerancia.',
        'Para piezas de producción se recomienda prueba de plegado y medición.',
      ],
      faqTitle: 'FAQ de desarrollo de plegado',
      faq: [
        ['¿Qué es el desarrollo de plegado?', 'Es la longitud de arco de la fibra neutra en la zona de plegado, usada para calcular el patrón plano.'],
        ['¿Qué es K-Factor?', 'Describe la posición de la fibra neutra respecto al espesor y cambia con material, utillaje, radio y método.'],
        ['¿K-Factor es fijo para un material?', 'No. Es un valor práctico que cambia con radio, abertura V, condición del material y método.'],
        ['¿Cómo difiere la deducción del desarrollo?', 'El desarrollo es la longitud de arco; la deducción se resta de las pestañas para calcular la longitud plana.'],
      ],
    },
  },
  tr: {
    hub: {
      hubName: 'ZYCO Mühendislik Merkezi',
      eyebrow: 'Mühendislik araçları merkezi',
      title: 'ZYCO Mühendislik Araçları',
      subtitle:
        'Sac bükme, takım seçimi ve abkant ayarı için profesyonel mühendislik referansları.',
      overview:
        'ZYCO Engineering Hub; tonaj, malzeme davranışı, V açıklığı, iç radyüs ve geri esneme kontrolünü ayrı araçlarda toplar. Bu referanslar havada bükme hazırlığı, teklif kontrolü, takım incelemesi ve üretim ayarı için kullanılır.',
      tools: [
        ['pressBrakeCalculator', 'Profesyonel bükme kuvveti hesaplama sistemi'],
        ['bendAllowanceCalculator', 'Sac büküm payı, büküm düşümü ve açınım referansı'],
        ['materialDatabase', 'Akma dayanımı, çekme dayanımı, K-Faktörü ve bükme özellikleri'],
        ['springbackDatabase', 'Endüstriyel geri esneme referans sistemi'],
        ['vDieSelectionTool', 'Önerilen V açıklığı ve takım seçimi'],
        ['insideRadiusGuide', 'İç büküm radyüsü ve minimum radyüs referansı'],
        ['pressBrakeTonnageGuide', 'Bükme kuvveti ve makine kapasitesi seçimi için pratik kılavuz'],
        ['vDieOpeningGuide', 'Havada bükmede V kalıp açıklığı seçimi için pratik kılavuz'],
        ['minimumFlangeLengthGuide', 'Kısa flanş desteği, V açıklığı ve büküm kararlılığı için mühendislik referansı'],
        ['toolingSelectionGuide', 'Zımba ve kalıp seçimi için yapılandırılmış başvuru'],
        ['crowningGuide', 'Uzun büküm sehimi kompanzasyonu ve açı tutarlılığı için mühendislik referansı'],
        ['stainlessSteelBendingGuide', 'Paslanmaz kaliteler, geri esneme, yüzey koruması ve takım kararları için mühendislik referansı'],
        ['aluminumBendingGuide', 'Alüminyum alaşımları, geri esneme, yüzey koruması ve takım seçimi için mühendislik referansı'],
      ],
    },
    material: {
      title: 'Malzeme veritabanı',
      subtitle: 'Sac bükme malzemeleri için mühendislik referansı',
      fields: {
        factor: 'Malzeme katsayısı',
        yieldStrength: 'Akma dayanımı',
        tensileStrength: 'Çekme dayanımı',
        standardAutoVDie: 'Standart otomatik V kalıp',
        insideRadiusReference: 'İç radyüs referansı',
        springbackRange: 'Tipik geri esneme aralığı',
      },
      values: {
        standardAutoVDie: 'Hesaplayıcı tabanlı 8T / 10T / 12T kuralı',
        springbackReferenceCondition:
          '2 mm kalınlık / 90 derece havada bükme / V yaklaşık 8T',
      },
      overview:
        'Bu veritabanı, abkant havada bükmede kullanılan yaygın sac malzemeleri karşılaştırır. Malzeme katsayısı, dayanım aralığı, iç radyüs ve geri esneme değerleri kuvvet tahmini, takım seçimi ve açı telafisi için kullanılır.',
      notes: [
        'Standart otomatik V kalıp, abkant hesaplayıcısındaki aynı öneri mantığını izler:',
        'T < 8 mm -> V = 8T',
        '8 mm <= T < 25 mm -> V = 10T',
        'T >= 25 mm -> V = 12T',
        'Geri esneme ve iç radyüs tipik mühendislik referans aralıklarıdır. Gerçek sonuç malzeme partisi, kalınlık, V açıklığı, zımba radyüsü, hadde yönü, takım durumu ve makine ayarına göre değişir.',
      ],
      calculatorNote:
        'Kalınlık ve V kalıp tabanlı tahmin için abkant pres hesaplayıcısını kullanın.',
      faqTitle: 'Malzeme veritabanı SSS',
      faq: [
        ['Abkant tonajını en çok hangi malzeme özellikleri etkiler?', 'Tonaj; çekme dayanımı, sac kalınlığı, bükme uzunluğu ve V açıklığından güçlü şekilde etkilenir.'],
        ['Akma ve çekme dayanımı neden birlikte kullanılır?', 'Akma dayanımı plastik deformasyon başlangıcını, çekme dayanımı ise pratik bükme kuvveti tahminini destekler.'],
        ['Aynı V açıklığı her malzeme için kullanılabilir mi?', 'Kalınlık kuralı başlangıçtır; dayanım, çatlama riski, hedef radyüs ve yüzey şartları ayar gerektirebilir.'],
        ['Malzeme partisi ve hadde yönü neden önemlidir?', 'Gerçek sac parti, hadde yönü ve sertlik durumuna göre değişir; çatlama, geri esneme ve iç radyüsü etkiler.'],
      ],
    },
    radius: {
      title: 'İç radyüs kılavuzu',
      subtitle: 'İç büküm radyüsü seçimi için endüstriyel referans',
      fields: {
        recommendedInsideRadius: 'Önerilen iç radyüs',
        minimumInsideRadius: 'Minimum iç radyüs',
        crackRisk: 'Çatlama riski',
        springbackSensitivity: 'Geri esneme hassasiyeti',
      },
      values: {
        low: 'Düşük',
        medium: 'Orta',
        high: 'Yüksek',
        veryHigh: 'Çok yüksek',
        lowToMedium: 'Düşük-orta',
        mediumToHigh: 'Orta-yüksek',
      },
      overview:
        'İç büküm radyüsü; parça uyumu, açınım, çatlama riski ve nihai açı stabilitesini etkileyen önemli bir havada bükme sonucudur. Bu kılavuz, malzemeye göre pratik radyüs aralıklarını karşılaştırır.',
      notes: [
        'Minimum iç radyüs, uygun takım ve malzeme koşullarında pratik şekillendirme alt sınırını gösterir.',
        'Önerilen iç radyüs, daha stabil üretim ve daha düşük çatlama riski sağlar.',
        'Havada bükmede gerçek iç radyüs esas olarak seçilen V açıklığına ve malzeme özelliklerine bağlıdır.',
      ],
      faqTitle: 'İç radyüs SSS',
      faq: [
        ['Havada bükmede iç radyüsü ne belirler?', 'İç radyüs esas olarak V açıklığı ve malzeme davranışıyla oluşur; sacın tamamen kalıba bastırılmasıyla oluşmaz.'],
        ['İç radyüs çok küçükse ne olur?', 'Çatlama, kaplama hasarı ve kararsız bükme kalitesi riski artar.'],
        ['Minimum radyüs üretim hedefi olmalı mı?', 'Genellikle hayır. Minimum radyüs sınır referansıdır; önerilen radyüs daha stabil üretim sağlar.'],
        ['V açıklığı iç radyüsü nasıl etkiler?', 'Daha geniş açıklık daha büyük doğal radyüs oluşturur. Daha dar açıklık radyüsü küçültür fakat kuvveti artırır.'],
      ],
    },
    springback: {
      title: 'Geri esneme veritabanı',
      subtitle:
        'Malzeme, kalınlık ve V açıklığına göre tipik havada bükme geri esneme referansı',
      overviewTitle: 'Abkant geri esneme mühendislik özeti',
      fields: {
        range: 'Tipik geri esneme aralığı',
        reference: 'Referans koşul',
        sensitivity: 'Geri esneme hassasiyeti',
        factors: 'Ana etki faktörleri',
      },
      values: {
        reference: '2 mm kalınlık / 90 derece havada bükme / V yaklaşık 8T',
        sensitivity: {
          mildSteel: 'Düşük',
          galvanizedSteel: 'Düşük-orta',
          stainless201: 'Çok yüksek',
          stainless304: 'Yüksek',
          aluminum: 'Orta-yüksek',
          brass: 'Düşük',
        },
        factors: {
          mildSteel: 'V açıklığı, kalınlık, takım durumu',
          galvanizedSteel: 'Kaplama durumu, V açıklığı, malzeme partisi',
          stainless201:
            'Pekleşme, çekme dayanımı, V açıklığı, iç radyüs',
          stainless304:
            'Pekleşme, V açıklığı, iç radyüs, hadde yönü',
          aluminum:
            'Düşük elastisite modülü, alaşım sınıfı, temper durumu, hadde yönü',
          brass: 'Sertlik durumu, hadde yönü, V açıklığı',
        },
      },
      overview:
        'Geri esneme sabit bir değer değildir. Havada bükmede yük kaldırıldıktan sonraki nihai açı, sacın elastik toparlanması ve gerçek abkant ayar koşullarıyla değişir.',
      factors: ['malzeme dayanımı', 'kalınlık', 'V açıklığı', 'iç radyüs', 'takım durumu', 'bükme yöntemi', 'makine ayarı'],
      notes: [
        'Geri esneme değerleri 2 mm sac, 90 derece havada bükme ve yaklaşık 8T V açıklığı için tipik referans aralıklarıdır.',
        'Gerçek geri esneme; parti, kalınlık, V açıklığı, zımba radyüsü, iç radyüs, hadde yönü, takım durumu ve makine ayarına göre değişir.',
        'Kalınlık, V kalıp ve uzunluk tabanlı tahmin için abkant pres hesaplayıcısını kullanın.',
      ],
      faqTitle: 'Geri esneme SSS',
      faq: [
        ['Abkant bükmede geri esneme nedir?', 'Bükme kuvveti kalktıktan sonra malzemenin elastik toparlanmasıdır; nihai açı biraz açılır.'],
        ['Paslanmaz çelik neden daha fazla geri esner?', 'Genellikle daha yüksek çekme dayanımı ve pekleşme gösterdiği için yumuşak çelikten daha fazla geri esner.'],
        ['Daha büyük V açıklığı geri esnemeyi artırır mı?', 'Havada bükmede daha büyük açıklık çoğunlukla daha büyük iç radyüs oluşturur ve geri esnemeyi artırabilir.'],
        ['Geri esneme nasıl azaltılır?', 'Uygun takım, doğru V açıklığı, açı telafisi ve deneme bükümü ile kontrol edilir.'],
      ],
    },
    vdie: {
      title: 'V kalıp seçim aracı',
      subtitle: 'Sac havada bükme için önerilen V açıklığı kılavuzu',
      output: {
        standardRule: 'Standart otomatik V kalıp kuralı',
        standardRuleValue:
          'Kalınlık aralığına göre hesaplayıcı mantığı: 8T / 10T / 12T',
        standardAutoVDie: 'Standart otomatik V kalıp',
        estimatedNaturalInsideRadius: 'Tahmini doğal iç radyüs',
        minimumSafeInsideRadius: 'Minimum güvenli iç radyüs',
        recommendedInsideRadius: 'Önerilen iç radyüs',
        materialAdjustmentAdvice: 'Malzeme ayar tavsiyesi',
      },
      overview:
        'V kalıp seçimi yalnızca takım uyumunu belirlemez. Havada bükmede V açıklığı; gerekli kuvveti, doğal iç radyüsü, geri esneme eğilimini, yüzey izini ve kullanılabilir flanş boyunu etkiler.',
      faqTitle: 'V kalıp seçimi SSS',
      faq: [
        ['Sac bükme için V açıklığı nasıl seçilir?', 'İnce sacda 8T, orta kalınlıkta 10T, kalın plakada 12T başlangıç alınır; radyüs, tonaj ve flanş boyu kontrol edilir.'],
        ['Daha küçük V açıklığı iç radyüsü azaltır mı?', 'Evet, genellikle doğal iç radyüsü azaltır; ancak bükme kuvvetini ve iz/çatlak riskini artırır.'],
        ['Neden daha büyük V açıklığı kullanılır?', 'Gerekli tonajı ve takım yükünü azaltır; kalın veya yüksek dayanımlı malzemelerde yararlıdır.'],
        ['Paslanmaz ve yumuşak çelik için seçim aynı mı?', 'Başlangıç kuralı aynı olabilir, ancak paslanmaz daha fazla kuvvet ve açı telafisi gerektirir.'],
      ],
    },
    bend: {
      title: 'Büküm payı hesaplayıcı',
      subtitle:
        'Sac büküm payı, büküm düşümü ve açınım referans değerlerini hesapla',
      formulaReference: 'Formül referansı',
      formulaIntro: 'Büküm payı, nötr eksen yay uzunluğu formülüyle hesaplanır:',
      formulaWhere: 'Burada: A = derece cinsinden büküm açısı, R = iç radyüs, K = K-Faktörü, T = malzeme kalınlığı',
      formulaOutsideSetback: 'Dış geri çekme: OSSB = tan(A / 2) x (R + T)',
      formulaBendDeduction: 'Büküm düşümü: BD = 2 x OSSB - BA',
      formulaNote:
        'Bu formüller standart sac açınım referanslarıdır. Gerçek açınım; malzeme kalitesi, hadde yönü, takım, bükme yöntemi, geri esneme telafisi ve üretim toleransına göre değişebilir.',
      output: {
        bendAllowance: 'Büküm payı',
        outsideSetback: 'Dış geri çekme',
        bendDeduction: 'Büküm düşümü',
      },
      overview:
        'Büküm payı, abkant şekillendirme öncesinde sac açınımı için gereken geliştirilmiş uzunluğu tahmin eder. Kalınlık, iç radyüs, büküm açısı, K-Faktörü, süneklik ve bükme yöntemi etkiler.',
      overview2:
        'Havada bükmede iç radyüs esas olarak V açıklığı ve malzeme özellikleriyle belirlenir. Büküm açısı radyüsü az miktarda etkileyebilir, bu nedenle muhafazakar bir açı düzeltmesi uygulanır.',
      notes: [
        'K-Faktörü mühendislik referans değeridir.',
        'Gerçek açınım; malzeme kalitesi, hadde yönü, takım, bükme yöntemi ve üretim toleransına göre değişebilir.',
        'Üretim parçaları için deneme bükümü ve ölçüm önerilir.',
      ],
      faqTitle: 'Büküm payı SSS',
      faq: [
        ['Büküm payı nedir?', 'Büküm bölgesindeki nötr eksen yay uzunluğudur ve sac parçanın açınım uzunluğunu hesaplamak için kullanılır.'],
        ['K-Faktörü nedir?', 'Nötr eksenin sac kalınlığı içindeki konumunu açıklar; malzeme, takım, radyüs ve yönteme göre değişir.'],
        ['K-Faktörü bir malzeme için sabit midir?', 'Hayır. İç radyüs, V açıklığı, malzeme durumu ve yönteme göre değişen pratik bir referanstır.'],
        ['Büküm düşümü büküm payından nasıl farklıdır?', 'Büküm payı yay uzunluğunu temsil eder; büküm düşümü düz boyu hesaplamak için flanş ölçülerinden çıkarılır.'],
      ],
    },
  },
  id: {
    hub: {
      hubName: 'Pusat Engineering ZYCO',
      eyebrow: 'Pusat alat teknik',
      title: 'Alat Teknik ZYCO',
      subtitle:
        'Referensi teknik profesional untuk bending plat, pemilihan tooling, dan setup press brake.',
      overview:
        'ZYCO Engineering Hub mengelompokkan referensi press brake praktis ke alat terpisah agar engineer dapat memeriksa tonase, perilaku material, bukaan V, radius dalam, dan springback dari halaman khusus.',
      tools: [
        ['pressBrakeCalculator', 'Sistem profesional untuk menghitung gaya bending'],
        ['bendAllowanceCalculator', 'Bend allowance, bend deduction, dan referensi flat pattern'],
        ['materialDatabase', 'Yield strength, tensile strength, K-Factor, dan properti bending'],
        ['springbackDatabase', 'Sistem referensi springback industri'],
        ['vDieSelectionTool', 'Bukaan V rekomendasi dan pemilihan tooling'],
        ['insideRadiusGuide', 'Referensi radius dalam dan radius minimum'],
        ['pressBrakeTonnageGuide', 'Panduan praktis gaya bending dan pemilihan kapasitas mesin'],
        ['vDieOpeningGuide', 'Panduan praktis pemilihan bukaan cetakan V pada tekuk udara'],
        ['minimumFlangeLengthGuide', 'Referensi teknik untuk tumpuan flange pendek, bukaan V, dan kestabilan bending'],
        ['toolingSelectionGuide', 'Referensi terstruktur untuk pemilihan penekan dan cetakan'],
        ['crowningGuide', 'Referensi teknik kompensasi lendutan dan keseragaman sudut pada tekukan panjang'],
        ['stainlessSteelBendingGuide', 'Referensi teknik grade stainless, springback, kontrol permukaan dan keputusan perkakas'],
        ['aluminumBendingGuide', 'Referensi teknik paduan aluminium, springback, perlindungan permukaan, dan pemilihan perkakas'],
      ],
    },
    material: {
      title: 'Database material',
      subtitle: 'Referensi teknik untuk material bending plat',
      fields: {
        factor: 'Faktor material',
        yieldStrength: 'Yield strength',
        tensileStrength: 'Tensile strength',
        standardAutoVDie: 'V-die otomatis standar',
        insideRadiusReference: 'Referensi radius dalam',
        springbackRange: 'Rentang springback tipikal',
      },
      values: {
        standardAutoVDie: 'Aturan 8T / 10T / 12T berbasis kalkulator',
        springbackReferenceCondition:
          'Ketebalan 2 mm / air bending 90 derajat / V sekitar 8T',
      },
      overview:
        'Database ini membandingkan material plat umum untuk air bending press brake. Faktor material, rentang kekuatan, referensi radius dalam, dan rentang springback berguna untuk estimasi gaya, pemilihan tooling, dan kompensasi sudut.',
      notes: [
        'V-die otomatis standar mengikuti logika rekomendasi yang sama dengan kalkulator press brake:',
        'T < 8 mm -> V = 8T',
        '8 mm <= T < 25 mm -> V = 10T',
        'T >= 25 mm -> V = 12T',
        'Springback dan radius dalam adalah rentang referensi teknik tipikal. Hasil aktual bergantung pada batch material, ketebalan, bukaan V, radius punch, arah rolling, kondisi tooling, dan setup mesin.',
      ],
      calculatorNote:
        'Untuk estimasi berbasis ketebalan dan V-die, gunakan kalkulator press brake.',
      faqTitle: 'FAQ database material',
      faq: [
        ['Properti material apa yang paling memengaruhi tonase?', 'Tonase sangat dipengaruhi tensile strength, ketebalan plat, panjang tekuk, dan bukaan V-die. Material lebih kuat membutuhkan gaya lebih besar.'],
        ['Mengapa yield strength dan tensile strength sama-sama berguna?', 'Yield strength menunjukkan awal deformasi plastis, sedangkan tensile strength sering dipakai untuk estimasi gaya bending praktis.'],
        ['Apakah bukaan V yang sama bisa dipakai untuk semua material?', 'Aturan berdasarkan ketebalan adalah titik awal, tetapi kekuatan, risiko retak, radius target, dan kebutuhan permukaan dapat memerlukan penyesuaian.'],
        ['Mengapa batch dan arah rolling penting?', 'Plat aktual berubah menurut batch, arah rolling, dan kondisi kekerasan. Faktor ini memengaruhi retak, springback, dan radius akhir.'],
      ],
    },
    radius: {
      title: 'Panduan radius dalam',
      subtitle: 'Referensi industri untuk pemilihan radius dalam tekuk',
      fields: {
        recommendedInsideRadius: 'Radius dalam rekomendasi',
        minimumInsideRadius: 'Radius dalam minimum',
        crackRisk: 'Risiko retak',
        springbackSensitivity: 'Sensitivitas springback',
      },
      values: {
        low: 'Rendah',
        medium: 'Sedang',
        high: 'Tinggi',
        veryHigh: 'Sangat tinggi',
        lowToMedium: 'Rendah hingga sedang',
        mediumToHigh: 'Sedang hingga tinggi',
      },
      overview:
        'Radius dalam adalah hasil pembentukan penting pada air bending karena memengaruhi fit part, flat pattern, risiko retak, dan stabilitas sudut. Panduan ini membandingkan rentang radius praktis menurut material.',
      notes: [
        'Radius dalam minimum menunjukkan batas forming praktis pada kondisi material dan tooling yang mendukung.',
        'Radius dalam rekomendasi lebih stabil untuk produksi dan mengurangi risiko retak.',
        'Radius aktual pada air bending terutama bergantung pada bukaan V yang dipilih dan properti material.',
      ],
      faqTitle: 'FAQ radius dalam',
      faq: [
        ['Apa yang menentukan radius dalam pada air bending?', 'Radius terutama dibentuk oleh bukaan V dan perilaku material, bukan dengan menekan plat sepenuhnya ke die.'],
        ['Apa yang terjadi jika radius terlalu kecil?', 'Risiko retak, kerusakan coating, dan kualitas bending tidak stabil akan meningkat.'],
        ['Apakah radius minimum target terbaik untuk produksi?', 'Biasanya tidak. Radius minimum adalah referensi batas forming; radius rekomendasi lebih stabil.'],
        ['Bagaimana bukaan V memengaruhi radius?', 'Bukaan lebih lebar biasanya membuat radius alami lebih besar. Bukaan lebih sempit mengurangi radius tetapi menaikkan gaya.'],
      ],
    },
    springback: {
      title: 'Database springback',
      subtitle:
        'Referensi springback air bending tipikal menurut material, ketebalan, dan bukaan V',
      overviewTitle: 'Ringkasan teknik springback press brake',
      fields: {
        range: 'Rentang springback tipikal',
        reference: 'Kondisi referensi',
        sensitivity: 'Sensitivitas springback',
        factors: 'Faktor pengaruh utama',
      },
      values: {
        reference: 'Ketebalan 2 mm / air bending 90 derajat / V sekitar 8T',
        sensitivity: {
          mildSteel: 'Rendah',
          galvanizedSteel: 'Rendah hingga sedang',
          stainless201: 'Sangat tinggi',
          stainless304: 'Tinggi',
          aluminum: 'Sedang hingga tinggi',
          brass: 'Rendah',
        },
        factors: {
          mildSteel: 'Bukaan V, ketebalan, kondisi tooling',
          galvanizedSteel: 'Kondisi coating, bukaan V, batch material',
          stainless201:
            'Work hardening, tensile strength, bukaan V, radius dalam',
          stainless304:
            'Work hardening, bukaan V, radius dalam, arah rolling',
          aluminum:
            'Modulus elastisitas rendah, grade alloy, kondisi temper, arah rolling',
          brass: 'Kondisi kekerasan, arah rolling, bukaan V',
        },
      },
      overview:
        'Springback bukan nilai tetap. Pada air bending, sudut akhir setelah unloading berubah karena pemulihan elastis material dan kondisi setup press brake aktual.',
      factors: ['kekuatan material', 'ketebalan', 'bukaan V', 'radius dalam', 'kondisi tooling', 'metode bending', 'setup mesin'],
      notes: [
        'Nilai springback adalah rentang tipikal berdasarkan plat 2 mm, air bending 90 derajat, dan bukaan V sekitar 8T.',
        'Springback aktual dapat berubah menurut batch material, ketebalan, bukaan V, radius punch, radius dalam, arah rolling, kondisi tooling, dan setup mesin.',
        'Untuk estimasi berbasis ketebalan, V-die, dan panjang, gunakan kalkulator press brake.',
      ],
      faqTitle: 'FAQ springback',
      faq: [
        ['Apa itu springback pada bending press brake?', 'Springback adalah pemulihan elastis material setelah bending, sehingga sudut akhir sedikit membuka setelah gaya dilepas.'],
        ['Mengapa stainless steel memiliki springback lebih besar?', 'Stainless biasanya memiliki tensile strength dan work hardening lebih tinggi, sehingga springback lebih besar dibanding baja ringan.'],
        ['Apakah bukaan V lebih besar meningkatkan springback?', 'Pada air bending, bukaan lebih besar biasanya menghasilkan radius dalam lebih besar dan dapat meningkatkan springback.'],
        ['Bagaimana mengurangi springback?', 'Gunakan tooling yang sesuai, bukaan V yang tepat, kompensasi sudut, dan trial bending.'],
      ],
    },
    vdie: {
      title: 'Alat pemilihan V-die',
      subtitle: 'Panduan bukaan V rekomendasi untuk air bending plat',
      output: {
        standardRule: 'Aturan V-die otomatis standar',
        standardRuleValue:
          'Mengikuti logika kalkulator: 8T / 10T / 12T menurut rentang ketebalan',
        standardAutoVDie: 'V-die otomatis standar',
        estimatedNaturalInsideRadius: 'Radius dalam alami estimasi',
        minimumSafeInsideRadius: 'Radius dalam aman minimum',
        recommendedInsideRadius: 'Radius dalam rekomendasi',
        materialAdjustmentAdvice: 'Saran penyesuaian material',
      },
      overview:
        'Pemilihan V-die mengontrol lebih dari kecocokan tooling. Pada air bending, bukaan V memengaruhi gaya, radius dalam alami, kecenderungan springback, marking permukaan, dan panjang flange yang tersedia.',
      faqTitle: 'FAQ pemilihan V-die',
      faq: [
        ['Bagaimana memilih bukaan V untuk bending plat?', 'Mulai dari 8T untuk plat tipis, 10T untuk ketebalan sedang, dan 12T untuk plat tebal, lalu cek radius, tonase, dan panjang flange.'],
        ['Apakah bukaan V lebih kecil mengurangi radius?', 'Ya, biasanya menghasilkan radius alami lebih kecil, tetapi meningkatkan gaya bending dan risiko marking atau retak.'],
        ['Mengapa menggunakan bukaan V lebih besar?', 'Bukaan lebih besar mengurangi tonase dan beban tooling, berguna untuk plat tebal atau material berkekuatan tinggi.'],
        ['Apakah sama untuk stainless dan baja ringan?', 'Aturan awal bisa sama, tetapi stainless membutuhkan gaya lebih besar dan memiliki springback lebih tinggi.'],
      ],
    },
    bend: {
      title: 'Kalkulator bend allowance',
      subtitle:
        'Hitung bend allowance, bend deduction, dan nilai referensi flat pattern',
      formulaReference: 'Referensi formula',
      formulaIntro:
        'Bend allowance menggunakan rumus panjang busur pada neutral axis:',
      formulaWhere:
        'Di mana: A = sudut tekuk dalam derajat, R = radius dalam, K = K-Factor, T = ketebalan material',
      formulaOutsideSetback: 'Outside setback: OSSB = tan(A / 2) x (R + T)',
      formulaBendDeduction: 'Bend deduction: BD = 2 x OSSB - BA',
      formulaNote:
        'Formula ini adalah referensi standar pengembangan plat. Hasil flat pattern aktual dapat berubah menurut grade material, arah rolling, tooling, metode bending, kompensasi springback, dan toleransi produksi.',
      output: {
        bendAllowance: 'Bend allowance',
        outsideSetback: 'Outside setback',
        bendDeduction: 'Bend deduction',
      },
      overview:
        'Bend allowance digunakan untuk memperkirakan panjang pengembangan yang diperlukan untuk flat pattern sebelum forming press brake. Nilainya dipengaruhi ketebalan, radius dalam, sudut tekuk, K-Factor, daktilitas, dan metode bending.',
      overview2:
        'Pada air bending, radius dalam terutama ditentukan oleh bukaan V dan properti material. Sudut tekuk dapat sedikit memengaruhi radius terbentuk, sehingga kalkulator memakai penyesuaian konservatif.',
      notes: [
        'K-Factor adalah nilai referensi teknik.',
        'Hasil flat pattern aktual dapat berubah menurut grade material, arah rolling, tooling, metode bending, dan toleransi produksi.',
        'Untuk part produksi, trial bending dan pengukuran direkomendasikan.',
      ],
      faqTitle: 'FAQ bend allowance',
      faq: [
        ['Apa itu bend allowance?', 'Bend allowance adalah panjang busur neutral axis pada area tekuk, digunakan untuk menghitung panjang flat pattern.'],
        ['Apa itu K-Factor?', 'K-Factor menjelaskan posisi neutral axis relatif terhadap ketebalan plat dan berubah menurut material, tooling, radius, dan metode bending.'],
        ['Apakah K-Factor tetap untuk satu material?', 'Tidak. Ini nilai referensi praktis yang berubah menurut radius dalam, bukaan V, kondisi material, dan metode bending.'],
        ['Apa beda bend deduction dan bend allowance?', 'Bend allowance adalah panjang busur area tekuk, sedangkan bend deduction dikurangkan dari dimensi flange untuk menghitung panjang flat.'],
      ],
    },
  },
}

const airBendingHubDescriptions = {
  en: 'Engineering guide to air bending principles, V-die selection, inside radius behavior, springback influence and bending force estimation.',
  zh: '介绍空气折弯原理、V型模具选择、内半径变化、回弹影响和折弯力估算的工程指南。',
  ru: 'Инженерное руководство по принципам Air Bending, выбору V-матрицы, поведению внутреннего радиуса, влиянию springback и оценке усилия гибки.',
  es: 'Guía de ingeniería sobre principios de Air Bending, selección de matriz V, comportamiento del radio interior, springback y estimación de fuerza de plegado.',
  tr: 'Air Bending prensipleri, V kalıp seçimi, iç radyüs davranışı, geri esneme etkisi ve bükme kuvveti tahmini için mühendislik kılavuzu.',
  id: 'Panduan teknik untuk prinsip Air Bending, pemilihan V-die, perilaku radius dalam, pengaruh springback, dan estimasi gaya tekuk.',
}

pages.en.hub.tools.splice(6, 0, [
  'airBendingGuide',
  airBendingHubDescriptions.en,
])

Object.entries(airBendingHubDescriptions).forEach(([language, description]) => {
  if (language !== 'en') {
    localizedOverrides[language].hub.tools.splice(6, 0, [
      'airBendingGuide',
      description,
    ])
  }
})

const airBendingPageTranslations = {
  en: {
    backToEngineeringTools: '← Back to Engineering Tools',
    title: 'Air Bending Guide for Press Brake Sheet Metal Forming',
    subtitle:
      'Understand air bending principles, V-die selection, inside radius behavior, springback influence and bending force estimation for modern press brake operations.',
    industrialNote:
      'Air bending is the most widely used press brake bending method in modern sheet metal fabrication because it provides flexible angle control, lower tooling force and reduced tooling wear.',
    overviewTitle: 'Engineering Overview',
    motionDiagram: {
      eyebrow: 'Motion Diagram V1',
      title: 'Air bending load path and three-point contact',
      punchStroke: 'Punch stroke',
      sheetBending: 'Sheet bending',
      springbackReference: 'Springback reference',
      punchDownstroke: 'Punch downstroke',
      leftSupport: 'left support',
      rightSupport: 'right support',
      angleFormation: 'angle formation',
      vDieSupport: 'V-die support',
      highlightsAria: 'Diagram highlights',
      svgTitle: 'Air bending motion diagram',
      svgDescription:
        'Animated SVG showing punch downstroke, sheet bending over a V die, three-point contact and a springback reference line.',
    },
    overview: [
      'Air bending is a press brake forming method where the punch drives the sheet into a V die without forcing the material to fully match the die angle or bottom surface. The bend is formed through controlled elastic-plastic deformation while the material is supported at the die shoulders and loaded at the punch tip.',
      'It is common in modern shops because one punch and die set can form a wide range of angles by changing ram depth. This reduces tool changes, lowers forming force compared with bottoming or coining, and makes CNC angle correction practical for mixed-part production.',
      'The relationship between punch tip and V die is not a full-contact geometry. In typical air bending, the sheet contacts three points: the punch nose and the two die shoulders. The final angle is mainly controlled by punch penetration depth, while material strength, thickness, grain direction, tooling condition and machine deflection influence the actual result.',
      'Springback exists because the outer and inner zones of the bend do not remain fully plastically deformed after unloading. Higher tensile strength, higher yield strength and larger elastic recovery cause the angle to open after the ram returns.',
      'The V opening changes inside radius because air bending allows the material to form a natural radius over the die span. A wider V opening usually produces a larger inside radius and lower force. A narrower V opening concentrates deformation, reducing radius but increasing required tonnage and marking risk.',
    ],
    sections: [
      {
        title: 'How Air Bending Works',
        paragraphs: [
          'In air bending, the punch does not bottom out against the die. The material is suspended over the V opening and contacts the tooling mainly at the punch tip and the two die shoulders.',
          'The bend angle is controlled by punch penetration depth. Deeper penetration closes the angle; less penetration leaves a more open angle. Because the material is not forced to the die angle, the same tooling can produce multiple bend angles when the machine position and compensation are controlled correctly.',
          'This method depends on repeatable material behavior and accurate machine control. Variations in thickness, tensile strength, rolling direction, surface coating and tooling wear can change the final angle even when the programmed depth is unchanged.',
        ],
      },
      {
        title: 'V-Die Selection Influence',
        paragraphs: [
          'A larger V opening reduces bending force because the forming lever arm becomes longer and the material bends over a wider span. The tradeoff is a larger natural inside radius, greater sensitivity to springback and a wider bend line footprint.',
          'A smaller V opening increases tonnage because the material is forced to bend over a shorter span. It can produce a smaller inside radius and often reduces springback, but it also increases tool pressure, surface marking and the risk of cracking on hard or low-ductility materials.',
          'Production V-die choice is therefore a balance between force capacity, required inside radius, flange length, material ductility, marking tolerance and angle stability.',
        ],
      },
      {
        title: 'Inside Radius Behavior in Air Bending',
        paragraphs: [
          'In air bending, the inside radius is normally a natural radius created by the material, thickness and V opening. It is not automatically equal to the punch tip radius unless the punch radius is large enough to dominate the bend geometry.',
          'For many mild steel air bends, the natural inside radius is often related to the V opening rather than only the punch nose. Wider V openings create larger inside radii, while narrower V openings create tighter radii at higher tonnage.',
          'Material thickness matters because thicker plate needs a larger deformation zone to bend without excessive strain. If the specified inside radius is too small for the material and thickness, cracking, coating damage or unstable angle repeatability may occur.',
        ],
      },
      {
        title: 'Springback in Air Bending',
        paragraphs: [
          'Springback is the elastic recovery that occurs after the ram releases pressure. In air bending it is more visible because the material is not coined into a fully compressed tool cavity.',
          'High tensile and high yield materials spring back more because a larger portion of the bend remains elastically stressed after forming. Stainless steel generally needs more overbend than mild steel. Aluminum behavior depends strongly on alloy and temper.',
          'Compensation methods include programmed overbend, angle measurement systems, material-specific bend tables, test bends, tighter thickness control and tooling choices that reduce variation.',
        ],
      },
    ],
    comparisonTitle: 'Air Bending vs Bottoming vs Coining',
    comparisonHeaders: ['Engineering factor', 'Air bending', 'Bottoming', 'Coining'],
    comparison: [
      ['Forming pressure', 'Low to medium', 'High', 'Very high'],
      ['Accuracy', 'Good with CNC compensation', 'High when tooling and material are stable', 'Very high for suitable parts'],
      ['Springback', 'Must be compensated', 'Reduced by higher contact pressure', 'Minimal because material is heavily compressed'],
      ['Tool wear', 'Lower', 'Medium to high', 'High'],
      ['Flexibility', 'High; multiple angles with same tooling', 'Medium; closer to tool angle', 'Low; tooling and tonnage specific'],
      ['Production speed', 'Fast for mixed production', 'Fast for repeat jobs after setup', 'Slower when high tonnage or special tooling is required'],
      ['Tooling force', 'Lowest of the three methods', 'Higher than air bending', 'Highest'],
    ],
    faqTitle: 'Air Bending FAQ',
    faq: [
      ['What is air bending in a press brake?', 'Air bending is a press brake method where the punch bends the sheet into a V die without bottoming out. The material contacts the punch tip and die shoulders, and the final angle is controlled mainly by punch penetration depth.'],
      ['Why is air bending more flexible?', 'Air bending is flexible because one punch and V die combination can form multiple angles. Operators adjust ram depth and compensation rather than changing tooling for every angle.'],
      ['How does V-die opening affect bending force?', 'A larger V opening lowers bending force because the material bends over a wider span. A smaller V opening increases tonnage because the bend is formed over a shorter lever arm.'],
      ['Why does springback occur?', 'Springback occurs because part of the bend remains elastically stressed during forming. After the ram releases pressure, the material recovers slightly and the bend angle opens.'],
      ['What is the difference between air bending and coining?', 'Air bending forms the angle through controlled penetration without full tool contact. Coining uses much higher force to compress the material into the die angle, reducing springback but increasing tonnage and tool wear.'],
      ['Does punch radius determine inside radius?', 'Not always. In air bending, inside radius is often a natural radius influenced by V opening, material thickness and material properties. The punch radius dominates only when it is large enough relative to the natural bend radius.'],
      ['Why does stainless steel spring back more?', 'Stainless steel usually has higher yield strength and stronger elastic recovery than mild steel, so it often requires more overbend or angle compensation in air bending.'],
      ['How accurate is air bending?', 'Air bending can be accurate when machine repeatability, tooling condition, material consistency and angle compensation are controlled. It is more sensitive to material variation than bottoming or coining.'],
      ['Why does a wider V die create a larger inside radius?', 'A wider V opening spreads bending deformation across a larger zone. The sheet forms a broader natural radius instead of being forced tightly around the punch nose.'],
      ['When should a smaller V opening be avoided?', 'Avoid a smaller V opening when tonnage exceeds machine capacity, when surface marking is unacceptable, or when hard material may crack from excessive localized strain.'],
    ],
  },
  zh: {
    backToEngineeringTools: '← 返回工程工具中心',
    title: '折弯机钣金成形空气折弯指南',
    subtitle:
      '了解现代折弯机作业中的空气折弯原理、V型模具选择、内半径变化、回弹影响和折弯力估算逻辑。',
    industrialNote:
      '空气折弯是现代钣金制造中最常用的折弯方式，因为它具有角度控制灵活、所需成形力较低、模具磨损较小等特点。',
    overviewTitle: '工程概述',
    motionDiagram: {
      eyebrow: '动态图 V1',
      title: '空气折弯载荷路径与三点接触',
      punchStroke: '冲头行程',
      sheetBending: '板料弯曲',
      springbackReference: '回弹参考',
      punchDownstroke: '冲头下压',
      leftSupport: '左侧支撑',
      rightSupport: '右侧支撑',
      angleFormation: '角度形成',
      vDieSupport: 'V 型下模支撑',
      highlightsAria: '图示重点',
      svgTitle: '空气折弯动态图示',
      svgDescription:
        '动态图示展示冲头下压、板料在 V 型下模上弯曲、三点接触以及回弹参考线。',
    },
    overview: [
      '空气折弯是一种折弯机成形方法，冲头将板材压入 V 型下模，但不会强制板材完全贴合下模角度或模腔底部。弯曲区域通过弹塑性变形形成，板材主要由两个模肩支撑，并由冲头尖端加载。',
      '这种方法在现代工厂中最常见，因为同一套冲头和下模可以通过改变滑块下压深度形成多个角度。它减少换模时间，相比压底和压印需要更低的折弯力，也更适合 CNC 角度补偿和多品种生产。',
      '冲头尖端与 V 型模之间不是全接触关系。典型空气折弯中，板材形成三点接触：冲头鼻部和两个下模肩部。最终角度主要由冲头下压深度决定，同时受材料强度、板厚、纹向、模具状态和机器挠度影响。',
      '回弹产生的原因是卸载后弯曲内外层并未完全保持塑性变形。抗拉强度、屈服强度和弹性恢复越高，滑块回程后角度越容易张开。',
      'V 开口会改变内半径，因为空气折弯允许板材在模口跨度内形成自然半径。较大的 V 开口通常带来较大的内半径和较低的折弯力；较小的 V 开口会集中变形、减小半径，但会提高所需吨位和压痕风险。',
    ],
    sections: [
      {
        title: '空气折弯如何工作',
        paragraphs: [
          '在空气折弯中，冲头不会压到底，也不会让板材完全贴死下模。板材悬跨在 V 开口上，主要接触冲头尖端和两个下模肩部。',
          '折弯角度由冲头下压深度控制。下压越深，角度越闭合；下压较浅，角度更开放。由于板材不被强制压成模具角度，同一套模具在机器位置控制和补偿正确时可以生产多个角度。',
          '这种方法依赖材料行为的稳定性和机器控制精度。板厚、抗拉强度、轧制方向、表面涂层和模具磨损的变化，即使程序深度不变，也会改变最终角度。',
        ],
      },
      {
        title: 'V型模具选择的影响',
        paragraphs: [
          '较大的 V 开口会降低折弯力，因为成形力臂变长，材料在更宽的跨度上弯曲。代价是自然内半径更大，对回弹更敏感，弯曲区域占用的宽度也更大。',
          '较小的 V 开口会提高吨位，因为材料在更短跨度内成形。它可以获得更小的内半径，并且有时能减小回弹，但也会增加模具压力、表面压痕以及高强或低延展材料的开裂风险。',
          '生产中的 V 型模具选择需要在机器吨位、目标内半径、最小边长、材料延展性、表面要求和角度稳定性之间平衡。',
        ],
      },
      {
        title: '空气折弯中的内半径行为',
        paragraphs: [
          '空气折弯中的内半径通常是由材料、板厚和 V 开口共同形成的自然半径，并不一定等于冲头尖端半径。只有当冲头半径足够大并主导成形几何时，冲头半径才会决定内半径。',
          '对于许多低碳钢空气折弯，内半径通常更接近 V 开口的影响，而不是只由冲头鼻部决定。较宽的 V 开口形成较大的自然内半径，较窄的 V 开口在更高吨位下形成更小半径。',
          '板厚也很关键。较厚板材需要更大的变形区域才能避免过高应变。如果指定内半径对材料和板厚来说过小，可能出现开裂、涂层损伤或角度重复性不稳定。',
        ],
      },
      {
        title: '空气折弯中的回弹',
        paragraphs: [
          '回弹是滑块卸载后材料发生的弹性恢复。空气折弯没有像压印那样将材料强制压入模腔，因此回弹表现更明显。',
          '高抗拉、高屈服材料回弹更大，因为折弯后仍有更多区域保持弹性应力。不锈钢通常比低碳钢需要更大的过弯补偿；铝材的表现则强烈依赖合金牌号和热处理状态。',
          '常见补偿方法包括程序过弯、角度测量系统、按材料建立折弯表、试折、控制板厚公差以及选择能减少波动的模具组合。',
        ],
      },
    ],
    comparisonTitle: '空气折弯、压底与压印对比',
    comparisonHeaders: ['工程因素', '空气折弯', '压底', '压印'],
    comparison: [
      ['成形压力', '低到中等', '高', '非常高'],
      ['精度', '配合 CNC 补偿时较好', '材料和模具稳定时较高', '适合条件下非常高'],
      ['回弹', '必须补偿', '通过较高接触压力降低', '因材料被强压，通常最小'],
      ['模具磨损', '较低', '中到高', '高'],
      ['灵活性', '高；同一模具可做多个角度', '中；更接近模具角度', '低；依赖特定模具和高吨位'],
      ['生产速度', '适合多品种生产，速度快', '批量稳定后速度快', '高吨位或特殊模具时较慢'],
      ['模具受力', '三种方式中最低', '高于空气折弯', '最高'],
    ],
    faqTitle: '空气折弯常见问题',
    faq: [
      ['什么是折弯机空气折弯？', '空气折弯是冲头将板材压入 V 型下模但不压到底的折弯方法。板材主要接触冲头尖端和下模肩部，最终角度主要由冲头下压深度控制。'],
      ['为什么空气折弯更灵活？', '因为一套冲头和 V 型下模可以通过调整滑块深度和补偿形成多个角度，不需要每个角度都更换模具。'],
      ['V 型模具开口如何影响折弯力？', '较大的 V 开口让材料在更宽跨度上弯曲，因此折弯力较低；较小的 V 开口缩短力臂，会提高所需吨位。'],
      ['为什么会发生回弹？', '折弯过程中部分材料仍保留弹性应力。卸载后材料发生弹性恢复，折弯角度会略微张开。'],
      ['空气折弯和压印有什么区别？', '空气折弯通过控制下压深度成形，不需要完全贴合模具；压印使用更高压力将材料压入模具角度，回弹更小但吨位和模具磨损更高。'],
      ['冲头半径是否决定内半径？', '不一定。空气折弯中的内半径常由 V 开口、板厚和材料性能形成自然半径。只有冲头半径足够大时才会主导内半径。'],
      ['为什么不锈钢回弹更大？', '不锈钢通常屈服强度更高、弹性恢复更明显，因此比低碳钢需要更多过弯或角度补偿。'],
      ['空气折弯精度如何？', '在机器重复精度、模具状态、材料一致性和角度补偿受控时，空气折弯可以达到较好精度，但它比压底或压印更受材料波动影响。'],
      ['为什么较宽 V 型模会形成较大内半径？', '较宽 V 开口会把弯曲变形分布到更大的区域，板材形成更宽的自然半径，而不是被强制紧贴冲头鼻部。'],
      ['什么时候应避免较小 V 开口？', '当吨位超过设备能力、表面压痕不可接受，或硬材料可能因局部应变过大而开裂时，应避免使用过小 V 开口。'],
    ],
  },
  ru: {
    backToEngineeringTools: '← Назад к инженерным инструментам',
    title: 'Руководство Air Bending для гибки листового металла',
    subtitle:
      'Разберите принципы Air Bending, выбор V-матрицы, поведение внутреннего радиуса, влияние springback и оценку усилия для современных листогибов.',
    industrialNote:
      'Air Bending является самым распространенным методом гибки на листогибе, потому что дает гибкое управление углом, снижает усилие и уменьшает износ оснастки.',
    overviewTitle: 'Инженерный обзор',
    motionDiagram: {
      eyebrow: 'Динамическая схема V1',
      title: 'Траектория нагрузки Air Bending и трехточечный контакт',
      punchStroke: 'Ход пуансона',
      sheetBending: 'Гибка листа',
      springbackReference: 'Ориентир springback',
      punchDownstroke: 'Ход пуансона вниз',
      leftSupport: 'левая опора',
      rightSupport: 'правая опора',
      angleFormation: 'формирование угла',
      vDieSupport: 'опора V-матрицы',
      highlightsAria: 'Ключевые элементы схемы',
      svgTitle: 'Динамическая схема Air Bending',
      svgDescription:
        'Анимированная SVG-схема показывает ход пуансона вниз, гибку листа на V-матрице, трехточечный контакт и ориентир springback.',
    },
    overview: [
      'Air Bending формирует лист в V-матрице без полного прижатия к углу или дну матрицы. Изгиб создается управляемой упруго-пластической деформацией при опоре на плечи матрицы и нагрузке от пуансона.',
      'Метод удобен для цехов, потому что одна пара пуансон-матрица может получать разные углы за счет изменения глубины хода. Это сокращает переналадку и снижает усилие по сравнению с bottoming и coining.',
      'Контакт обычно трехточечный: нос пуансона и два плеча матрицы. Итоговый угол задается глубиной проникновения, но зависит от прочности, толщины, направления прокатки, состояния оснастки и прогиба машины.',
      'Springback возникает из-за упругого восстановления после разгрузки. Чем выше предел текучести, прочность и упругая составляющая, тем сильнее угол раскрывается после возврата балки.',
      'Раскрытие V-матрицы влияет на внутренний радиус и усилие. Более широкое V дает больший естественный радиус и меньшее усилие; более узкое V уменьшает радиус, но повышает тоннаж и риск следов.',
    ],
    sections: [
      { title: 'Как работает Air Bending', paragraphs: ['Пуансон не доходит до дна матрицы. Лист в основном касается носа пуансона и двух плеч V-матрицы.', 'Угол управляется глубиной проникновения пуансона. Большая глубина закрывает угол, меньшая оставляет его более открытым.', 'Стабильность зависит от повторяемости материала и машины; толщина, прочность, направление прокатки и износ оснастки меняют конечный угол.'] },
      { title: 'Влияние выбора V-матрицы', paragraphs: ['Большее раскрытие V снижает усилие, но обычно увеличивает естественный внутренний радиус и чувствительность к springback.', 'Меньшее раскрытие V повышает тоннаж, может уменьшить радиус и springback, но увеличивает давление на оснастку, следы и риск трещин.', 'Практический выбор V-матрицы балансирует усилие, радиус, длину полки, пластичность материала, качество поверхности и стабильность угла.'] },
      { title: 'Поведение внутреннего радиуса', paragraphs: ['При Air Bending внутренний радиус обычно формируется естественно под влиянием материала, толщины и раскрытия V, а не всегда равен радиусу пуансона.', 'Широкое V формирует больший радиус, узкое V формирует меньший радиус при большем тоннаже.', 'Если заданный радиус слишком мал для материала и толщины, возрастает риск трещин, повреждения покрытия и нестабильного угла.'] },
      { title: 'Springback при Air Bending', paragraphs: ['Springback - это упругое восстановление после снятия нагрузки. При Air Bending оно заметнее, чем при coining.', 'Материалы с высокой прочностью и пределом текучести, особенно нержавеющая сталь, требуют большего перегиба.', 'Компенсация включает программный перегиб, измерение угла, таблицы по материалам, пробные гибы и контроль толщины.'] },
    ],
    comparisonTitle: 'Air Bending, Bottoming и Coining',
    comparisonHeaders: ['Фактор', 'Air Bending', 'Bottoming', 'Coining'],
    comparison: [
      ['Давление формовки', 'Низкое или среднее', 'Высокое', 'Очень высокое'],
      ['Точность', 'Хорошая с CNC-компенсацией', 'Высокая при стабильном материале', 'Очень высокая для подходящих деталей'],
      ['Springback', 'Требует компенсации', 'Снижен высоким контактом', 'Минимальный'],
      ['Износ оснастки', 'Низкий', 'Средний или высокий', 'Высокий'],
      ['Гибкость', 'Высокая', 'Средняя', 'Низкая'],
      ['Скорость производства', 'Высокая для смешанных партий', 'Высокая после наладки', 'Ниже при высоком тоннаже'],
      ['Усилие на оснастке', 'Минимальное', 'Выше Air Bending', 'Максимальное'],
    ],
    faqTitle: 'FAQ по Air Bending',
    faq: [
      ['Что такое Air Bending на листогибе?', 'Это гибка без полного прижатия листа к матрице; угол задается глубиной хода пуансона.'],
      ['Почему Air Bending более гибкий?', 'Одна оснастка может получать разные углы за счет изменения глубины и компенсации.'],
      ['Как раскрытие V влияет на усилие?', 'Большее V снижает усилие, меньшее V повышает тоннаж.'],
      ['Почему возникает springback?', 'Материал упруго восстанавливается после снятия усилия, и угол немного раскрывается.'],
      ['Чем Air Bending отличается от coining?', 'Coining использует намного большее усилие для сжатия материала в угол матрицы.'],
      ['Определяет ли радиус пуансона внутренний радиус?', 'Не всегда; часто радиус задается раскрытием V, толщиной и материалом.'],
      ['Почему нержавеющая сталь сильнее пружинит?', 'Из-за более высокой прочности и упругого восстановления.'],
      ['Насколько точен Air Bending?', 'Он точен при стабильном материале, исправной оснастке и корректной компенсации.'],
    ],
  },
  es: {
    backToEngineeringTools: '← Volver a herramientas de ingeniería',
    title: 'Guía de Air Bending para conformado de chapa en plegadora',
    subtitle:
      'Comprenda principios de Air Bending, selección de matriz V, radio interior, springback y estimación de fuerza en operaciones modernas de plegadora.',
    industrialNote:
      'Air Bending es el método de plegado más usado porque permite controlar el ángulo con flexibilidad, requiere menos fuerza y reduce el desgaste del utillaje.',
    overviewTitle: 'Resumen de ingeniería',
    motionDiagram: {
      eyebrow: 'Diagrama de movimiento V1',
      title: 'Ruta de carga en Air Bending y contacto de tres puntos',
      punchStroke: 'Carrera del punzón',
      sheetBending: 'Plegado de chapa',
      springbackReference: 'Referencia de springback',
      punchDownstroke: 'Descenso del punzón',
      leftSupport: 'apoyo izquierdo',
      rightSupport: 'apoyo derecho',
      angleFormation: 'formación del ángulo',
      vDieSupport: 'apoyo de matriz V',
      highlightsAria: 'Puntos clave del diagrama',
      svgTitle: 'Diagrama de movimiento de Air Bending',
      svgDescription:
        'SVG animado que muestra el descenso del punzón, el plegado de la chapa sobre una matriz V, el contacto de tres puntos y una referencia de springback.',
    },
    overview: [
      'Air Bending forma la chapa en una matriz V sin obligarla a copiar completamente el ángulo o el fondo de la matriz.',
      'Es común porque una misma combinación de punzón y matriz puede producir varios ángulos mediante la profundidad de penetración.',
      'El contacto típico es de tres puntos: punta del punzón y dos hombros de la matriz. El ángulo depende de la penetración y de material, espesor, dirección de laminación, utillaje y deflexión.',
      'El springback aparece por recuperación elástica después de descargar la fuerza.',
      'Una abertura V mayor reduce fuerza y aumenta el radio interior natural; una abertura menor reduce radio pero aumenta tonelaje y riesgo de marcas.',
    ],
    sections: [
      { title: 'Cómo funciona Air Bending', paragraphs: ['El punzón no llega al fondo de la matriz. La chapa contacta principalmente la punta del punzón y los hombros de la matriz.', 'El ángulo se controla con la profundidad de penetración; más profundidad cierra el ángulo.', 'La repetibilidad depende de material, espesor, resistencia, recubrimiento, dirección de laminación y estado del utillaje.'] },
      { title: 'Influencia de la selección de matriz V', paragraphs: ['Una abertura V mayor reduce la fuerza y aumenta el radio interior natural y la sensibilidad al springback.', 'Una abertura V menor aumenta el tonelaje, reduce el radio y puede reducir springback, pero eleva presión, marcas y riesgo de grietas.', 'La selección equilibra capacidad, radio requerido, longitud de ala, ductilidad, marcas y estabilidad angular.'] },
      { title: 'Comportamiento del radio interior', paragraphs: ['En Air Bending el radio interior suele ser natural y depende de material, espesor y abertura V.', 'El radio no siempre es igual al radio del punzón; el punzón domina solo si su radio es suficientemente grande.', 'Un radio demasiado pequeño puede causar grietas, daño de recubrimiento o baja repetibilidad.'] },
      { title: 'Springback en Air Bending', paragraphs: ['Springback es la recuperación elástica al liberar la fuerza.', 'Materiales de alta resistencia, como aceros inoxidables, suelen requerir mayor sobreplegado.', 'La compensación usa sobreplegado programado, medición de ángulo, tablas de material, pruebas y control de espesor.'] },
    ],
    comparisonTitle: 'Air Bending vs Bottoming vs Coining',
    comparisonHeaders: ['Factor', 'Air Bending', 'Bottoming', 'Coining'],
    comparison: [
      ['Presión de formado', 'Baja a media', 'Alta', 'Muy alta'],
      ['Precisión', 'Buena con compensación CNC', 'Alta con material estable', 'Muy alta en piezas adecuadas'],
      ['Springback', 'Debe compensarse', 'Reducido por mayor contacto', 'Mínimo'],
      ['Desgaste de herramienta', 'Menor', 'Medio a alto', 'Alto'],
      ['Flexibilidad', 'Alta', 'Media', 'Baja'],
      ['Velocidad de producción', 'Rápida para producción mixta', 'Rápida tras ajuste', 'Más lenta con alto tonelaje'],
      ['Fuerza de utillaje', 'La menor', 'Mayor que Air Bending', 'La mayor'],
    ],
    faqTitle: 'FAQ de Air Bending',
    faq: [
      ['¿Qué es Air Bending en una plegadora?', 'Es un método donde el punzón dobla la chapa en una matriz V sin llegar al fondo.'],
      ['¿Por qué Air Bending es más flexible?', 'Porque una misma herramienta puede producir varios ángulos ajustando profundidad y compensación.'],
      ['¿Cómo afecta la abertura V a la fuerza?', 'Una V mayor reduce la fuerza; una V menor aumenta el tonelaje.'],
      ['¿Por qué ocurre springback?', 'Por recuperación elástica del material después de descargar la fuerza.'],
      ['¿Cuál es la diferencia con coining?', 'Coining comprime el material con mucha más fuerza dentro del ángulo de la matriz.'],
      ['¿El radio del punzón determina el radio interior?', 'No siempre; en Air Bending influyen abertura V, espesor y material.'],
      ['¿Por qué el inoxidable tiene más springback?', 'Por mayor límite elástico y recuperación elástica.'],
      ['¿Qué precisión tiene Air Bending?', 'Puede ser preciso con buena repetibilidad, material estable y compensación angular.'],
    ],
  },
  tr: {
    backToEngineeringTools: '← Mühendislik araçlarına dön',
    title: 'Abkant sac şekillendirme için Air Bending kılavuzu',
    subtitle:
      'Modern abkant operasyonlarında Air Bending prensiplerini, V kalıp seçimini, iç radyüs davranışını, geri esnemeyi ve bükme kuvveti tahminini anlayın.',
    industrialNote:
      'Air Bending, esnek açı kontrolü, daha düşük şekillendirme kuvveti ve daha az takım aşınması sağladığı için en yaygın abkant bükme yöntemidir.',
    overviewTitle: 'Mühendislik özeti',
    motionDiagram: {
      eyebrow: 'Hareket diyagramı V1',
      title: 'Air Bending yük yolu ve üç nokta teması',
      punchStroke: 'Zımba stroku',
      sheetBending: 'Sac bükme',
      springbackReference: 'Geri esneme referansı',
      punchDownstroke: 'Zımba aşağı hareketi',
      leftSupport: 'sol destek',
      rightSupport: 'sağ destek',
      angleFormation: 'açı oluşumu',
      vDieSupport: 'V kalıp desteği',
      highlightsAria: 'Diyagram vurguları',
      svgTitle: 'Air Bending hareket diyagramı',
      svgDescription:
        'Animasyonlu SVG; zımba aşağı hareketini, sacın V kalıp üzerinde bükülmesini, üç nokta temasını ve geri esneme referansını gösterir.',
    },
    overview: [
      'Air Bending, sacın V kalıp içinde tamamen dibe basılmadan şekillendirildiği abkant yöntemidir.',
      'Aynı zımba ve V kalıp seti, koç derinliği değiştirilerek birçok açı üretebildiği için modern atölyelerde çok yaygındır.',
      'Tipik temas üç noktadadır: zımba burnu ve iki kalıp omzu. Son açı penetrasyon derinliğiyle kontrol edilir.',
      'Geri esneme, yük kaldırıldıktan sonra malzemenin elastik toparlanması nedeniyle oluşur.',
      'Daha geniş V açıklığı daha büyük doğal iç radyüs ve daha düşük kuvvet üretir; daha dar V açıklığı daha küçük radyüs ama daha yüksek tonaj oluşturur.',
    ],
    sections: [
      { title: 'Air Bending nasıl çalışır', paragraphs: ['Zımba kalıbın dibine basmaz; sac çoğunlukla zımba ucu ve iki kalıp omzuna temas eder.', 'Açı zımba penetrasyon derinliğiyle kontrol edilir; daha derin giriş açıyı kapatır.', 'Kalınlık, çekme dayanımı, hadde yönü, kaplama ve takım aşınması nihai açıyı değiştirebilir.'] },
      { title: 'V kalıp seçiminin etkisi', paragraphs: ['Daha büyük V açıklığı bükme kuvvetini düşürür, fakat iç radyüsü ve geri esneme hassasiyetini artırır.', 'Daha küçük V açıklığı tonajı artırır, radyüsü küçültür ve iz/çatlak riskini yükseltir.', 'Seçim; kuvvet kapasitesi, radyüs, flanş boyu, süneklik, yüzey kalitesi ve açı kararlılığı arasında dengedir.'] },
      { title: 'Air Bending içinde iç radyüs', paragraphs: ['İç radyüs çoğu zaman malzeme, kalınlık ve V açıklığıyla oluşan doğal radyüstür.', 'Radyüs her zaman zımba uç radyüsüne eşit değildir.', 'Çok küçük radyüs çatlak, kaplama hasarı ve açı tekrarlanabilirliği sorunları yaratabilir.'] },
      { title: 'Air Bending içinde geri esneme', paragraphs: ['Geri esneme, koç basıncı kalktıktan sonra oluşan elastik toparlanmadır.', 'Yüksek dayanımlı malzemeler ve paslanmaz çelik daha fazla overbend gerektirir.', 'Telafi; programlı overbend, açı ölçümü, malzeme tabloları, deneme bükümü ve kalınlık kontrolüyle yapılır.'] },
    ],
    comparisonTitle: 'Air Bending, Bottoming ve Coining karşılaştırması',
    comparisonHeaders: ['Faktör', 'Air Bending', 'Bottoming', 'Coining'],
    comparison: [
      ['Şekillendirme basıncı', 'Düşük-orta', 'Yüksek', 'Çok yüksek'],
      ['Hassasiyet', 'CNC telafiyle iyi', 'Stabil malzemede yüksek', 'Uygun parçada çok yüksek'],
      ['Geri esneme', 'Telafi gerekir', 'Daha fazla temasla azalır', 'Minimum'],
      ['Takım aşınması', 'Düşük', 'Orta-yüksek', 'Yüksek'],
      ['Esneklik', 'Yüksek', 'Orta', 'Düşük'],
      ['Üretim hızı', 'Karma üretimde hızlı', 'Ayar sonrası hızlı', 'Yüksek tonajda daha yavaş'],
      ['Takım kuvveti', 'En düşük', 'Air Bendingden yüksek', 'En yüksek'],
    ],
    faqTitle: 'Air Bending SSS',
    faq: [
      ['Abkantta Air Bending nedir?', 'Zımbanın sacı V kalıba bastığı ancak dibe basmadığı bükme yöntemidir.'],
      ['Neden daha esnektir?', 'Aynı takım ile penetrasyon ve telafi ayarlanarak farklı açılar üretilebilir.'],
      ['V açıklığı kuvveti nasıl etkiler?', 'Büyük V kuvveti düşürür, küçük V tonajı artırır.'],
      ['Geri esneme neden olur?', 'Malzeme yük kalkınca elastik olarak toparlanır ve açı açılır.'],
      ['Coining ile farkı nedir?', 'Coining malzemeyi çok yüksek kuvvetle kalıp açısına sıkıştırır.'],
      ['Zımba radyüsü iç radyüsü belirler mi?', 'Her zaman değil; V açıklığı, kalınlık ve malzeme de belirleyicidir.'],
      ['Paslanmaz neden daha fazla geri esner?', 'Daha yüksek akma dayanımı ve elastik toparlanma nedeniyle.'],
      ['Air Bending ne kadar hassastır?', 'Makine, takım, malzeme ve açı telafisi kontrol edildiğinde hassastır.'],
    ],
  },
  id: {
    backToEngineeringTools: '← Kembali ke alat teknik',
    title: 'Panduan Air Bending untuk forming plat dengan press brake',
    subtitle:
      'Pahami prinsip Air Bending, pemilihan V-die, perilaku radius dalam, pengaruh springback, dan estimasi gaya tekuk untuk operasi press brake modern.',
    industrialNote:
      'Air Bending adalah metode bending press brake paling umum karena fleksibel untuk kontrol sudut, membutuhkan gaya lebih rendah, dan mengurangi keausan tooling.',
    overviewTitle: 'Ringkasan teknik',
    motionDiagram: {
      eyebrow: 'Diagram gerak V1',
      title: 'Jalur beban Air Bending dan kontak tiga titik',
      punchStroke: 'Stroke punch',
      sheetBending: 'Bending plat',
      springbackReference: 'Referensi springback',
      punchDownstroke: 'Punch bergerak turun',
      leftSupport: 'tumpuan kiri',
      rightSupport: 'tumpuan kanan',
      angleFormation: 'pembentukan sudut',
      vDieSupport: 'tumpuan V-die',
      highlightsAria: 'Sorotan diagram',
      svgTitle: 'Diagram gerak Air Bending',
      svgDescription:
        'SVG animasi yang menampilkan punch bergerak turun, plat bending di atas V-die, kontak tiga titik, dan garis referensi springback.',
    },
    overview: [
      'Air Bending membentuk plat ke dalam V-die tanpa memaksa material menyentuh penuh sudut atau dasar die.',
      'Metode ini umum karena satu set punch dan die dapat membuat banyak sudut dengan mengubah kedalaman ram.',
      'Kontak biasanya tiga titik: ujung punch dan dua bahu die. Sudut akhir dikontrol oleh penetrasi punch dan dipengaruhi material, ketebalan, arah rolling, tooling, dan defleksi mesin.',
      'Springback terjadi karena pemulihan elastis setelah gaya dilepas.',
      'V opening lebih besar menurunkan gaya dan membuat radius dalam lebih besar; V opening lebih kecil mengecilkan radius tetapi menaikkan tonase dan risiko marking.',
    ],
    sections: [
      { title: 'Cara kerja Air Bending', paragraphs: ['Punch tidak bottom out. Plat terutama menyentuh ujung punch dan dua bahu V-die.', 'Sudut dikontrol oleh kedalaman penetrasi punch; penetrasi lebih dalam menutup sudut.', 'Variasi ketebalan, tensile strength, arah rolling, coating, dan keausan tooling dapat mengubah sudut akhir.'] },
      { title: 'Pengaruh pemilihan V-die', paragraphs: ['V opening lebih besar mengurangi gaya tekuk, tetapi membuat radius alami lebih besar dan springback lebih sensitif.', 'V opening lebih kecil meningkatkan tonase, mengecilkan radius, dan meningkatkan risiko marking atau retak.', 'Pemilihan die menyeimbangkan kapasitas gaya, radius, panjang flange, daktilitas, marking, dan stabilitas sudut.'] },
      { title: 'Perilaku radius dalam pada Air Bending', paragraphs: ['Radius dalam biasanya radius alami yang terbentuk dari material, ketebalan, dan V opening.', 'Radius tidak selalu sama dengan radius ujung punch.', 'Radius yang terlalu kecil dapat menyebabkan retak, kerusakan coating, atau sudut yang tidak stabil.'] },
      { title: 'Springback pada Air Bending', paragraphs: ['Springback adalah pemulihan elastis setelah tekanan ram dilepas.', 'Material high tensile dan stainless steel biasanya membutuhkan overbend lebih besar.', 'Kompensasi dilakukan dengan overbend program, sistem ukur sudut, tabel material, trial bending, dan kontrol ketebalan.'] },
    ],
    comparisonTitle: 'Air Bending vs Bottoming vs Coining',
    comparisonHeaders: ['Faktor', 'Air Bending', 'Bottoming', 'Coining'],
    comparison: [
      ['Tekanan forming', 'Rendah-sedang', 'Tinggi', 'Sangat tinggi'],
      ['Akurasi', 'Baik dengan kompensasi CNC', 'Tinggi bila material stabil', 'Sangat tinggi untuk part sesuai'],
      ['Springback', 'Harus dikompensasi', 'Berkurang karena tekanan kontak', 'Minimal'],
      ['Keausan tooling', 'Lebih rendah', 'Sedang-tinggi', 'Tinggi'],
      ['Fleksibilitas', 'Tinggi', 'Sedang', 'Rendah'],
      ['Kecepatan produksi', 'Cepat untuk produksi campuran', 'Cepat setelah setup', 'Lebih lambat pada tonase tinggi'],
      ['Gaya tooling', 'Paling rendah', 'Lebih tinggi dari Air Bending', 'Paling tinggi'],
    ],
    faqTitle: 'FAQ Air Bending',
    faq: [
      ['Apa itu Air Bending pada press brake?', 'Metode bending di mana punch menekuk plat ke V-die tanpa bottoming out.'],
      ['Mengapa Air Bending lebih fleksibel?', 'Satu tooling dapat membuat beberapa sudut dengan mengatur kedalaman ram dan kompensasi.'],
      ['Bagaimana V opening memengaruhi gaya?', 'V lebih besar menurunkan gaya; V lebih kecil menaikkan tonase.'],
      ['Mengapa springback terjadi?', 'Material pulih secara elastis setelah gaya bending dilepas.'],
      ['Apa beda Air Bending dan coining?', 'Coining memakai gaya jauh lebih besar untuk menekan material ke sudut die.'],
      ['Apakah radius punch menentukan radius dalam?', 'Tidak selalu; V opening, ketebalan, dan material sangat berpengaruh.'],
      ['Mengapa stainless steel springback lebih besar?', 'Karena yield strength dan pemulihan elastis biasanya lebih tinggi.'],
      ['Seberapa akurat Air Bending?', 'Akurat bila repeatability mesin, tooling, material, dan kompensasi sudut terkontrol.'],
    ],
  },
}

pages.en.air = airBendingPageTranslations.en

Object.entries(airBendingPageTranslations).forEach(([language, page]) => {
  if (language !== 'en') {
    localizedOverrides[language].air = page
  }
})

const mergeDeep = (base, override) => {
  if (!override) return base

  return Object.keys(override).reduce((result, key) => {
    const value = override[key]

    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      typeof result[key] === 'object' &&
      !Array.isArray(result[key])
    ) {
      result[key] = mergeDeep(result[key], value)
      return result
    }

    result[key] = value
    return result
  }, { ...base })
}

export const getEngineeringText = (language) => {
  const normalizedLanguage = languageOptions.some(
    (option) => option.value === language
  )
    ? language
    : 'en'

  const base = {
    common: common.en,
    relatedTools: relatedTools.en,
    materialNames: materialNames.en,
    materialNotes: materialNotes.en,
    pages: pages.en,
  }

  const localized = {
    common: common[normalizedLanguage],
    relatedTools: relatedTools[normalizedLanguage],
    materialNames: materialNames[normalizedLanguage],
    materialNotes: materialNotes[normalizedLanguage],
    pages: mergeDeep(pages.en, localizedOverrides[normalizedLanguage]),
  }

  return mergeDeep(base, localized)
}
