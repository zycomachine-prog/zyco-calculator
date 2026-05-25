import { useEffect } from 'react'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'
import { getEngineeringText } from '../languages/engineeringText.js'
import {
  getSiteUrl,
  setPageSEO,
  setStructuredData,
} from '../utils/seo.js'

const routePath = '/engineering/press-brake-tonnage-guide'

const englishContent = {
  eyebrow: 'Engineering Guide',
  title: 'Press Brake Tonnage Guide',
  subtitle:
    'A practical reference for estimating air-bending force and selecting machine capacity for stable production.',
  introTitle: 'Introduction',
  intro:
    'Press brake tonnage is the force required to form a bend over a specified length. It is influenced by the sheet material, thickness, bend length and V-die opening. A calculated value is a selection reference: actual production also depends on tensile variation, tooling condition, punch radius, grain direction, deflection compensation and the intended duty cycle.',
  formulaTitle: 'Tonnage Formula',
  formulaLabel: 'Air-bending calculation basis',
  formula:
    'Required tonnage = (calibration factor x thickness² x bend length x material factor) / V-opening / 20',
  formulaNote:
    'In the calculator, thickness, bend length and V-opening are entered in millimetres. Mild steel is the baseline material factor; other materials apply a relative correction. This estimate is intended for air bending, not bottoming or coining.',
  formulaNotesTitle: 'Formula Notes',
  formulaNotes: [
    'Calibration factor: 1.33.',
    'Mild steel material factor: 1.00.',
    'Other materials are calculated using their relative material factor.',
    'This formula is used as an air-bending reference value.',
  ],
  factorsTitle: 'Factors That Influence Tonnage',
  factors: [
    ['Material strength', 'Higher-strength sheet requires more bending force than mild steel at the same geometry.'],
    ['Sheet thickness', 'Force rises approximately with the square of thickness, so a small thickness increase can be significant.'],
    ['Bend length', 'Required machine tonnage increases in direct proportion to the length being bent.'],
    ['V-opening', 'A wider V-opening reduces required force but normally increases the natural inside radius.'],
  ],
  recommendationTitle: 'Engineering Recommendation',
  recommendationText:
    'For continuous production, avoid long-term operation close to maximum tonnage. Increasing the V-die opening or selecting a larger machine can improve long-term machine stability when part geometry permits.',
  capacityTitle: 'Continuous Production Load Ratio',
  capacityText:
    'Rated tonnage is the machine maximum, not the preferred continuous working point. For repeat production, the recommended model is selected so calculated force remains within a practical continuous-load share of rated capacity.',
  capacityCards: [
    ['30T to 50T machines', 'Use up to 85% of rated tonnage for continuous-production selection.'],
    ['63T to 250T machines', 'Use up to 90% of rated tonnage for continuous-production selection.'],
    ['300T to 600T machines', 'Use up to 92% of rated tonnage for continuous-production selection.'],
  ],
  chartTitle: 'Tonnage Chart',
  chartText:
    'The following selection envelope shows the continuous operating force represented by each machine group. Length capacity and tooling suitability must still be checked separately.',
  chartHeaders: ['Machine rating', 'Load ratio', 'Continuous force envelope'],
  chartRows: [
    ['30T / 40T / 50T', '85%', '25.5T / 34T / 42.5T'],
    ['63T / 80T / 100T / 125T / 135T / 160T / 200T / 250T', '90%', '56.7T to 225T'],
    ['300T / 400T / 500T / 600T', '92%', '276T / 368T / 460T / 552T'],
  ],
  faqTitle: 'Frequently Asked Questions',
  faq: [
    [
      'What does press brake tonnage mean?',
      'It is the total forming force required along the programmed bend length under the chosen material and tooling conditions.',
    ],
    [
      'Why is a larger V-opening sometimes used?',
      'A larger V-opening lowers required tonnage and tool loading, but it generally produces a larger natural inside radius and may affect flange requirements.',
    ],
    [
      'Why is the calculated force not matched directly to rated capacity?',
      'Continuous production should not normally run at maximum rating. Selection margin helps reduce sustained load on the frame, hydraulics and tooling.',
    ],
  ],
  notesTitle: 'Engineering Notes',
  notes: [
    'Use the calculated tonnage together with bend length, daylight, stroke, throat depth and tooling limits when selecting a machine.',
    'Material certificates and trial bends remain important for stainless steel, high-strength steel, coated sheet and thick plate, where actual forming behaviour may vary.',
    'If required force is close to the continuous-load limit, increasing V-opening or selecting the next machine capacity is normally the more stable production choice.',
  ],
}

const localizedContent = {
  zh: {
    eyebrow: '工程指南',
    title: '折弯机吨位指南',
    subtitle: '用于估算空气折弯力并为稳定生产选择设备能力的实用参考。',
    introTitle: '简介',
    intro: '折弯机吨位是沿指定折弯长度完成成形所需的总力，其主要受材料、板厚、折弯长度和 V 槽开口影响。计算结果用于设备选型参考；实际生产还应考虑材料抗拉强度波动、模具状态、冲头半径、轧制方向、挠度补偿以及生产负载周期。',
    formulaTitle: '吨位公式',
    formulaLabel: '空气折弯计算基础',
    formula: '所需吨位 =（校准系数 x 板厚² x 折弯长度 x 材料系数）/ V 槽开口 / 20',
    formulaNote: '计算器中板厚、折弯长度和 V 槽开口均以毫米输入。低碳钢为材料基准，其它材料按相对系数修正。本估算适用于空气折弯，不适用于压底或压印成形。',
    formulaNotesTitle: '公式说明',
    formulaNotes: [
      '校准系数：1.33。',
      '低碳钢材料系数：1.00。',
      '其它材料按照各自相对材料系数进行计算。',
      '本公式用于空气折弯的参考吨位估算。',
    ],
    factorsTitle: '影响吨位的因素',
    factors: [
      ['材料强度', '在相同几何条件下，高强度板材所需折弯力高于低碳钢。'],
      ['板材厚度', '折弯力大致随厚度平方增长，因此小幅增厚也可能显著提高吨位。'],
      ['折弯长度', '总吨位随实际折弯长度近似成正比增加。'],
      ['V 槽开口', '增大 V 槽可降低所需吨位，但通常会增大自然内圆角。'],
    ],
    recommendationTitle: '工程建议',
    recommendationText:
      '对于持续生产，应避免长期接近最大吨位运行。在零件几何允许的条件下，增大 V 槽开口或选择更大吨位设备，有助于提高机器长期运行稳定性。',
    capacityTitle: '持续生产负载率',
    capacityText: '额定吨位是设备最大能力，并非建议的持续工作点。重复生产选型时，应使计算折弯力处于额定能力的合理持续负载范围内。',
    capacityCards: [
      ['30T 至 50T 设备', '持续生产选型按额定吨位的 85% 使用。'],
      ['63T 至 250T 设备', '持续生产选型按额定吨位的 90% 使用。'],
      ['300T 至 600T 设备', '持续生产选型按额定吨位的 92% 使用。'],
    ],
    chartTitle: '吨位表',
    chartText: '下表显示各设备组在持续生产选型中的可用折弯力范围。选机时仍需另行核对有效长度与模具适用性。',
    chartHeaders: ['设备额定吨位', '负载率', '持续生产力范围'],
    chartRows: [
      ['30T / 40T / 50T', '85%', '25.5T / 34T / 42.5T'],
      ['63T / 80T / 100T / 125T / 135T / 160T / 200T / 250T', '90%', '56.7T 至 225T'],
      ['300T / 400T / 500T / 600T', '92%', '276T / 368T / 460T / 552T'],
    ],
    faqTitle: '常见问题',
    faq: [
      ['折弯机吨位是什么？', '它是选定材料和模具条件下，沿设定折弯长度完成成形所需的总力。'],
      ['为什么有时应选择更大的 V 槽？', '更大的 V 槽能够降低所需吨位和模具载荷，但通常会产生更大的自然内圆角，并可能影响法兰要求。'],
      ['为什么不能将计算吨位直接等同于额定能力？', '持续生产通常不宜长期运行在最大额定吨位附近，适当余量有助于降低机架、液压系统和模具的持续载荷。'],
    ],
    notesTitle: '工程说明',
    notes: [
      '选择设备时，应将计算吨位与折弯长度、开口高度、行程、喉口深度及模具承载限制一并核对。',
      '对于不锈钢、高强钢、涂层板和厚板，材料证书与试折仍十分重要，因为实际成形表现可能存在偏差。',
      '当所需吨位接近持续负载上限时，增大 V 槽开口或选择更高一级设备能力通常更利于稳定生产。',
    ],
  },
  ru: {
    eyebrow: 'Инженерное руководство',
    title: 'Руководство по тоннажу листогибочного пресса',
    subtitle:
      'Практический справочник по расчету усилия воздушной гибки и выбору мощности станка для стабильного производства.',
    introTitle: 'Введение',
    intro:
      'Тоннаж листогибочного пресса - это суммарное усилие, необходимое для формирования гиба заданной длины. На него влияют материал листа, толщина, длина гиба и раскрытие V-матрицы. Расчетное значение служит ориентиром для выбора оборудования; в производстве также учитывают разброс прочности, состояние инструмента, радиус пуансона, направление проката, компенсацию прогиба и режим загрузки.',
    formulaTitle: 'Формула тоннажа',
    formulaLabel: 'Основа расчета воздушной гибки',
    formula: 'Требуемый тоннаж = (калибровочный коэффициент x толщина² x длина гиба x коэффициент материала) / раскрытие V / 20',
    formulaNote:
      'В калькуляторе толщина, длина гиба и раскрытие V вводятся в миллиметрах. Низкоуглеродистая сталь является базовым материалом, а для остальных материалов применяется относительная поправка. Оценка относится к воздушной гибке, а не к гибке с дожимом или чеканке.',
    formulaNotesTitle: 'Примечания к формуле',
    formulaNotes: [
      'Калибровочный коэффициент: 1.33.',
      'Коэффициент материала для низкоуглеродистой стали: 1.00.',
      'Другие материалы рассчитываются по их относительному коэффициенту материала.',
      'Формула используется как справочное значение для воздушной гибки.',
    ],
    factorsTitle: 'Факторы, влияющие на тоннаж',
    factors: [
      ['Прочность материала', 'При одинаковой геометрии высокопрочный лист требует большего усилия, чем низкоуглеродистая сталь.'],
      ['Толщина листа', 'Усилие растет примерно пропорционально квадрату толщины, поэтому даже небольшое увеличение существенно.'],
      ['Длина гиба', 'Необходимый тоннаж возрастает приблизительно пропорционально длине формируемого гиба.'],
      ['Раскрытие V', 'Более широкая матрица снижает усилие, но обычно увеличивает естественный внутренний радиус.'],
    ],
    recommendationTitle: 'Инженерная рекомендация',
    recommendationText:
      'При непрерывном производстве следует избегать длительной работы вблизи максимального тоннажа. Если геометрия детали допускает, увеличение раскрытия V-матрицы или выбор более мощного станка повышают долговременную стабильность оборудования.',
    capacityTitle: 'Коэффициент непрерывной производственной нагрузки',
    capacityText:
      'Номинальный тоннаж является максимальной возможностью станка, а не предпочтительной точкой постоянной работы. Для серийного производства расчетное усилие должно оставаться в практическом диапазоне непрерывной нагрузки.',
    capacityCards: [
      ['Станки 30T-50T', 'Для выбора под непрерывную работу используется до 85% номинального тоннажа.'],
      ['Станки 63T-250T', 'Для выбора под непрерывную работу используется до 90% номинального тоннажа.'],
      ['Станки 300T-600T', 'Для выбора под непрерывную работу используется до 92% номинального тоннажа.'],
    ],
    chartTitle: 'Таблица тоннажа',
    chartText:
      'В таблице приведено доступное усилие для непрерывной работы по группам станков. Дополнительно необходимо проверить рабочую длину и допустимость инструмента.',
    chartHeaders: ['Номинал станка', 'Коэффициент нагрузки', 'Усилие непрерывной работы'],
    chartRows: [
      ['30T / 40T / 50T', '85%', '25.5T / 34T / 42.5T'],
      ['63T / 80T / 100T / 125T / 135T / 160T / 200T / 250T', '90%', '56.7T-225T'],
      ['300T / 400T / 500T / 600T', '92%', '276T / 368T / 460T / 552T'],
    ],
    faqTitle: 'Частые вопросы',
    faq: [
      ['Что означает тоннаж листогибочного пресса?', 'Это полное формовочное усилие по заданной длине гиба для выбранных материала и инструмента.'],
      ['Почему иногда выбирают большее раскрытие V?', 'Большее раскрытие снижает требуемый тоннаж и нагрузку на инструмент, но обычно увеличивает естественный внутренний радиус и может влиять на полку детали.'],
      ['Почему расчетное усилие не приравнивают к номиналу станка?', 'При серийной работе не рекомендуется постоянно использовать максимальный номинал; запас уменьшает длительную нагрузку на раму, гидравлику и инструмент.'],
    ],
    notesTitle: 'Инженерные примечания',
    notes: [
      'При выборе станка учитывайте расчетный тоннаж вместе с длиной гиба, открытой высотой, ходом, глубиной зева и ограничениями инструмента.',
      'Для нержавеющей и высокопрочной стали, листа с покрытием и толстой плиты важны сертификаты материала и пробные гибы.',
      'Если необходимое усилие близко к пределу непрерывной нагрузки, увеличение раскрытия V или выбор следующей мощности обычно обеспечивает более стабильное производство.',
    ],
  },
  es: {
    eyebrow: 'Guía de ingeniería',
    title: 'Guía de tonelaje para plegadoras',
    subtitle:
      'Referencia práctica para estimar la fuerza de plegado al aire y seleccionar capacidad de máquina para producción estable.',
    introTitle: 'Introducción',
    intro:
      'El tonelaje de una plegadora es la fuerza total necesaria para formar un pliegue de una longitud determinada. Depende del material, el espesor, la longitud de plegado y la abertura de la matriz V. El valor calculado orienta la selección; en producción también importan la variación de resistencia, el estado del utillaje, el radio del punzón, la dirección de laminación, la compensación de deflexión y el ciclo de trabajo.',
    formulaTitle: 'Fórmula de tonelaje',
    formulaLabel: 'Base de cálculo para plegado al aire',
    formula: 'Tonelaje requerido = (factor de calibración x espesor² x longitud de plegado x factor de material) / abertura V / 20',
    formulaNote:
      'En la calculadora, el espesor, la longitud y la abertura V se introducen en milímetros. El acero dulce es la referencia y los demás materiales aplican una corrección relativa. La estimación corresponde al plegado al aire, no al plegado a fondo ni al acuñado.',
    formulaNotesTitle: 'Notas de la fórmula',
    formulaNotes: [
      'Factor de calibración: 1.33.',
      'Factor de material del acero dulce: 1.00.',
      'Los demás materiales se calculan según su factor de material relativo.',
      'Esta fórmula se utiliza como valor de referencia para el plegado al aire.',
    ],
    factorsTitle: 'Factores que influyen en el tonelaje',
    factors: [
      ['Resistencia del material', 'Con la misma geometría, una chapa de mayor resistencia requiere más fuerza que el acero dulce.'],
      ['Espesor de chapa', 'La fuerza aumenta aproximadamente con el cuadrado del espesor; pequeños aumentos pueden ser significativos.'],
      ['Longitud de plegado', 'El tonelaje necesario aumenta de forma aproximadamente proporcional a la longitud plegada.'],
      ['Abertura V', 'Una abertura mayor reduce la fuerza, pero normalmente incrementa el radio interior natural.'],
    ],
    recommendationTitle: 'Recomendación de ingeniería',
    recommendationText:
      'En producción continua, evite trabajar durante largos periodos cerca del tonelaje máximo. Si la geometría de la pieza lo permite, aumentar la abertura de la matriz V o seleccionar una máquina mayor puede mejorar la estabilidad a largo plazo.',
    capacityTitle: 'Relación de carga de producción continua',
    capacityText:
      'El tonelaje nominal es la capacidad máxima de la máquina, no su punto preferido de trabajo continuo. En producción repetitiva, la fuerza calculada debe quedar dentro de una proporción práctica de carga continua.',
    capacityCards: [
      ['Máquinas de 30T a 50T', 'La selección para producción continua utiliza hasta el 85% del tonelaje nominal.'],
      ['Máquinas de 63T a 250T', 'La selección para producción continua utiliza hasta el 90% del tonelaje nominal.'],
      ['Máquinas de 300T a 600T', 'La selección para producción continua utiliza hasta el 92% del tonelaje nominal.'],
    ],
    chartTitle: 'Tabla de tonelaje',
    chartText:
      'La tabla muestra la fuerza disponible para operación continua por grupo de máquinas. La longitud útil y la aptitud del utillaje deben verificarse por separado.',
    chartHeaders: ['Tonelaje nominal', 'Relación de carga', 'Fuerza continua disponible'],
    chartRows: [
      ['30T / 40T / 50T', '85%', '25.5T / 34T / 42.5T'],
      ['63T / 80T / 100T / 125T / 135T / 160T / 200T / 250T', '90%', '56.7T a 225T'],
      ['300T / 400T / 500T / 600T', '92%', '276T / 368T / 460T / 552T'],
    ],
    faqTitle: 'Preguntas frecuentes',
    faq: [
      ['¿Qué significa el tonelaje de una plegadora?', 'Es la fuerza total de conformado requerida a lo largo de la longitud programada con el material y el utillaje seleccionados.'],
      ['¿Por qué se utiliza a veces una abertura V mayor?', 'Una abertura mayor reduce el tonelaje y la carga del utillaje, pero normalmente aumenta el radio interior natural y puede influir en la pestaña.'],
      ['¿Por qué la fuerza calculada no se iguala a la capacidad nominal?', 'La producción continua no debería trabajar habitualmente al máximo nominal; el margen reduce la carga sostenida sobre bastidor, hidráulica y utillaje.'],
    ],
    notesTitle: 'Notas de ingeniería',
    notes: [
      'Seleccione la máquina comprobando el tonelaje calculado junto con longitud de plegado, luz abierta, carrera, escote y límites del utillaje.',
      'Los certificados de material y las pruebas de plegado siguen siendo importantes para acero inoxidable, acero de alta resistencia, chapa recubierta y placa gruesa.',
      'Si la fuerza requerida se aproxima al límite continuo, aumentar la abertura V o elegir la siguiente capacidad suele ser la opción más estable.',
    ],
  },
  tr: {
    eyebrow: 'Mühendislik Kılavuzu',
    title: 'Abkant Pres Tonaj Kılavuzu',
    subtitle:
      'Havada bükme kuvvetini tahmin etmek ve kararlı üretim için makine kapasitesi seçmek üzere pratik referans.',
    introTitle: 'Giriş',
    intro:
      'Abkant pres tonajı, belirli bir büküm uzunluğu boyunca şekillendirme için gereken toplam kuvvettir. Sac malzemesi, kalınlık, büküm uzunluğu ve V kalıp açıklığı bu değeri etkiler. Hesaplanan değer seçim referansıdır; gerçek üretimde çekme dayanımı değişimi, takım durumu, zımba radyüsü, hadde yönü, sehim telafisi ve çalışma çevrimi de dikkate alınmalıdır.',
    formulaTitle: 'Tonaj Formülü',
    formulaLabel: 'Havada bükme hesap temeli',
    formula: 'Gerekli tonaj = (kalibrasyon katsayısı x kalınlık² x büküm uzunluğu x malzeme katsayısı) / V açıklığı / 20',
    formulaNote:
      'Hesaplayıcıda kalınlık, büküm uzunluğu ve V açıklığı milimetre olarak girilir. Yumuşak çelik temel malzemedir; diğer malzemeler bağıl düzeltme uygular. Bu tahmin havada bükme içindir, tabana basma veya coining için değildir.',
    formulaNotesTitle: 'Formül Notları',
    formulaNotes: [
      'Kalibrasyon katsayısı: 1.33.',
      'Yumuşak çelik malzeme katsayısı: 1.00.',
      'Diğer malzemeler kendi bağıl malzeme katsayılarına göre hesaplanır.',
      'Bu formül havada bükme için referans değer olarak kullanılır.',
    ],
    factorsTitle: 'Tonajı Etkileyen Faktörler',
    factors: [
      ['Malzeme dayanımı', 'Aynı geometride yüksek dayanımlı sac, yumuşak çeliğe göre daha fazla kuvvet gerektirir.'],
      ['Sac kalınlığı', 'Kuvvet yaklaşık olarak kalınlığın karesiyle artar; küçük bir artış bile önemli olabilir.'],
      ['Büküm uzunluğu', 'Gerekli makine tonajı, bükülen uzunlukla yaklaşık doğru orantılı olarak artar.'],
      ['V açıklığı', 'Daha geniş V açıklığı kuvveti düşürür, ancak genellikle doğal iç radyüsü büyütür.'],
    ],
    recommendationTitle: 'Mühendislik Önerisi',
    recommendationText:
      'Sürekli üretimde maksimum tonaja yakın uzun süreli çalışmadan kaçınılmalıdır. Parça geometrisi izin verdiğinde V kalıp açıklığını artırmak veya daha büyük bir makine seçmek, uzun dönem makine kararlılığını iyileştirebilir.',
    capacityTitle: 'Sürekli Üretim Yük Oranı',
    capacityText:
      'Nominal tonaj makinenin azami kapasitesidir, tercih edilen sürekli çalışma noktası değildir. Seri üretim seçiminde hesaplanan kuvvet, nominal kapasitenin pratik sürekli yük payı içinde kalmalıdır.',
    capacityCards: [
      ['30T-50T makineler', 'Sürekli üretim seçimi nominal tonajın en fazla %85 değerini kullanır.'],
      ['63T-250T makineler', 'Sürekli üretim seçimi nominal tonajın en fazla %90 değerini kullanır.'],
      ['300T-600T makineler', 'Sürekli üretim seçimi nominal tonajın en fazla %92 değerini kullanır.'],
    ],
    chartTitle: 'Tonaj Tablosu',
    chartText:
      'Aşağıdaki seçim zarfı, makine grubuna göre sürekli çalışma kuvvetini gösterir. Kullanılabilir büküm boyu ve takım uygunluğu ayrıca kontrol edilmelidir.',
    chartHeaders: ['Makine nominali', 'Yük oranı', 'Sürekli çalışma kuvveti'],
    chartRows: [
      ['30T / 40T / 50T', '%85', '25.5T / 34T / 42.5T'],
      ['63T / 80T / 100T / 125T / 135T / 160T / 200T / 250T', '%90', '56.7T-225T'],
      ['300T / 400T / 500T / 600T', '%92', '276T / 368T / 460T / 552T'],
    ],
    faqTitle: 'Sık Sorulan Sorular',
    faq: [
      ['Abkant pres tonajı ne anlama gelir?', 'Seçilen malzeme ve takım koşullarında programlanan büküm boyu boyunca gereken toplam şekillendirme kuvvetidir.'],
      ['Neden bazen daha büyük V açıklığı kullanılır?', 'Daha büyük açıklık gerekli tonajı ve takım yükünü düşürür; ancak genellikle doğal iç radyüsü büyütür ve flanş gereksinimini etkileyebilir.'],
      ['Hesaplanan kuvvet neden nominal kapasiteye doğrudan eşitlenmez?', 'Sürekli üretim normalde azami nominalde yürütülmemelidir; pay, gövde, hidrolik ve takım üzerindeki sürekli yükü azaltır.'],
    ],
    notesTitle: 'Mühendislik Notları',
    notes: [
      'Makine seçerken hesaplanan tonajı büküm boyu, açık yükseklik, strok, boğaz derinliği ve takım limitleriyle birlikte kontrol edin.',
      'Paslanmaz çelik, yüksek dayanımlı çelik, kaplamalı sac ve kalın plaka için malzeme sertifikaları ve deneme bükümleri önemini korur.',
      'Gerekli kuvvet sürekli yük sınırına yakınsa, V açıklığını artırmak veya bir üst kapasiteyi seçmek genellikle daha kararlı üretim sağlar.',
    ],
  },
  id: {
    eyebrow: 'Panduan Teknik',
    title: 'Panduan Tonase Press Brake',
    subtitle:
      'Referensi praktis untuk memperkirakan gaya air bending dan memilih kapasitas mesin bagi produksi yang stabil.',
    introTitle: 'Pendahuluan',
    intro:
      'Tonase press brake adalah gaya total yang diperlukan untuk membentuk tekukan pada panjang tertentu. Nilainya dipengaruhi material, ketebalan, panjang bending, dan bukaan V-die. Hasil perhitungan merupakan acuan pemilihan; produksi nyata juga perlu mempertimbangkan variasi kekuatan tarik, kondisi tooling, radius punch, arah serat, kompensasi defleksi, dan siklus beban.',
    formulaTitle: 'Formula Tonase',
    formulaLabel: 'Dasar perhitungan air bending',
    formula: 'Tonase diperlukan = (faktor kalibrasi x ketebalan² x panjang bending x faktor material) / bukaan V / 20',
    formulaNote:
      'Pada kalkulator, ketebalan, panjang bending, dan bukaan V dimasukkan dalam milimeter. Mild steel menjadi material acuan; material lain memakai koreksi relatif. Estimasi ini ditujukan untuk air bending, bukan bottoming atau coining.',
    formulaNotesTitle: 'Catatan Formula',
    formulaNotes: [
      'Faktor kalibrasi: 1.33.',
      'Faktor material mild steel: 1.00.',
      'Material lain dihitung berdasarkan faktor material relatif masing-masing.',
      'Formula ini digunakan sebagai nilai referensi untuk air bending.',
    ],
    factorsTitle: 'Faktor yang Mempengaruhi Tonase',
    factors: [
      ['Kekuatan material', 'Dengan geometri sama, lembaran berkekuatan tinggi memerlukan gaya lebih besar daripada mild steel.'],
      ['Ketebalan lembaran', 'Gaya meningkat kira-kira mengikuti kuadrat ketebalan; kenaikan kecil dapat menjadi signifikan.'],
      ['Panjang bending', 'Tonase yang dibutuhkan meningkat hampir sebanding dengan panjang yang ditekuk.'],
      ['Bukaan V', 'Bukaan V yang lebih lebar menurunkan gaya, tetapi biasanya memperbesar radius dalam alami.'],
    ],
    recommendationTitle: 'Rekomendasi Teknik',
    recommendationText:
      'Untuk produksi kontinu, hindari operasi jangka panjang mendekati tonase maksimum. Jika geometri komponen memungkinkan, memperbesar bukaan V-die atau memilih mesin yang lebih besar dapat meningkatkan stabilitas mesin dalam jangka panjang.',
    capacityTitle: 'Rasio Beban Produksi Kontinu',
    capacityText:
      'Tonase nominal adalah kapasitas maksimum mesin, bukan titik kerja kontinu yang disarankan. Untuk produksi berulang, gaya hasil perhitungan harus berada dalam porsi beban kontinu yang praktis dari kapasitas nominal.',
    capacityCards: [
      ['Mesin 30T hingga 50T', 'Pemilihan produksi kontinu menggunakan hingga 85% tonase nominal.'],
      ['Mesin 63T hingga 250T', 'Pemilihan produksi kontinu menggunakan hingga 90% tonase nominal.'],
      ['Mesin 300T hingga 600T', 'Pemilihan produksi kontinu menggunakan hingga 92% tonase nominal.'],
    ],
    chartTitle: 'Tabel Tonase',
    chartText:
      'Tabel berikut menunjukkan gaya operasi kontinu per kelompok mesin. Kapasitas panjang dan kesesuaian tooling tetap harus diperiksa terpisah.',
    chartHeaders: ['Rating mesin', 'Rasio beban', 'Gaya operasi kontinu'],
    chartRows: [
      ['30T / 40T / 50T', '85%', '25.5T / 34T / 42.5T'],
      ['63T / 80T / 100T / 125T / 135T / 160T / 200T / 250T', '90%', '56.7T hingga 225T'],
      ['300T / 400T / 500T / 600T', '92%', '276T / 368T / 460T / 552T'],
    ],
    faqTitle: 'Pertanyaan Umum',
    faq: [
      ['Apa arti tonase press brake?', 'Tonase adalah total gaya pembentukan sepanjang panjang bending yang diprogram untuk material dan tooling yang dipilih.'],
      ['Mengapa bukaan V yang lebih besar kadang digunakan?', 'Bukaan lebih besar menurunkan tonase dan beban tooling, tetapi biasanya memperbesar radius dalam alami dan dapat memengaruhi flange.'],
      ['Mengapa gaya terhitung tidak langsung disamakan dengan rating mesin?', 'Produksi kontinu sebaiknya tidak berjalan pada rating maksimum secara terus-menerus; margin mengurangi beban berkelanjutan pada rangka, hidrolik, dan tooling.'],
    ],
    notesTitle: 'Catatan Teknik',
    notes: [
      'Pilih mesin dengan memeriksa tonase terhitung bersama panjang bending, open height, stroke, throat depth, dan batas tooling.',
      'Sertifikat material serta trial bending tetap penting untuk stainless steel, baja berkekuatan tinggi, lembaran berlapis, dan pelat tebal.',
      'Jika gaya yang diperlukan mendekati batas beban kontinu, memperbesar bukaan V atau memilih kapasitas berikutnya biasanya lebih stabil untuk produksi.',
    ],
  },
}

const relatedTools = [
  {
    key: 'pressBrakeCalculator',
    href: '/engineering-tools/press-brake-calculator',
  },
  {
    key: 'materialDatabase',
    href: '/engineering-tools/material-database',
  },
  {
    key: 'vDieSelectionTool',
    href: '/engineering-tools/v-die-selection',
  },
  {
    key: 'insideRadiusGuide',
    href: '/engineering-tools/inside-radius-guide',
  },
  {
    key: 'springbackDatabase',
    href: '/engineering-tools/springback-database',
  },
  {
    key: 'springbackCompensationGuide',
    href: '/springback-compensation-guide',
  },
  {
    key: 'bendAllowanceCalculator',
    href: '/engineering-tools/bend-allowance-calculator',
  },
  {
    key: 'kFactorGuide',
    href: '/engineering/k-factor-guide',
  },
  {
    key: 'bendDeductionGuide',
    href: '/engineering/bend-deduction-guide',
  },
  {
    key: 'airBendingGuide',
    href: '/engineering-tools/air-bending-guide',
  },
  {
    key: 'pressBrakeTonnageGuide',
    href: '/engineering/press-brake-tonnage-guide',
  },
  {
    key: 'vDieOpeningGuide',
    href: '/engineering/how-to-choose-press-brake-v-die-opening',
  },
  {
    key: 'minimumFlangeLengthGuide',
    href: '/engineering/minimum-flange-length-guide',
  },
  {
    key: 'toolingSelectionGuide',
    href: '/engineering/press-brake-tooling-selection-guide',
  },
  {
    key: 'crowningGuide',
    href: '/engineering/press-brake-crowning-guide',
  },
  {
    key: 'stainlessSteelBendingGuide',
    href: '/engineering/stainless-steel-bending-guide',
  },
  {
    key: 'aluminumBendingGuide',
    href: '/engineering/aluminum-bending-guide',
  },
]

const seoDescription =
  'Explore the ZYCO press brake tonnage guide structure for bending force, load factors, recommended machine capacity, tonnage charts and practical calculation references.'

const createPageStructuredData = () => ({
  '@type': 'WebPage',
  name: englishContent.title,
  description: seoDescription,
  url: getSiteUrl(routePath),
  isPartOf: {
    '@type': 'WebSite',
    name: 'ZYCO Engineering Hub',
    url: getSiteUrl('/engineering-tools'),
  },
})

const createArticleStructuredData = () => ({
  '@type': 'TechArticle',
  headline: englishContent.title,
  description: seoDescription,
  author: {
    '@type': 'Organization',
    name: 'ZYCO',
  },
  publisher: {
    '@type': 'Organization',
    name: 'ZYCO',
    url: getSiteUrl('/'),
  },
  mainEntityOfPage: getSiteUrl(routePath),
})

const createFAQStructuredData = () => ({
  '@type': 'FAQPage',
  mainEntity: englishContent.faq.map(([question, answer]) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
})

const getPageContent = (language) => ({
  ...englishContent,
  ...(localizedContent[language] || {}),
})

export default function PressBrakeTonnageGuide({
  language = 'en',
  setLanguage = () => {},
}) {
  useEffect(() => {
    setPageSEO({
      title: 'Press Brake Tonnage Guide | ZYCO Engineering Hub',
      description: seoDescription,
      keywords:
        'press brake tonnage guide, press brake capacity, bending force formula, press brake tonnage chart, press brake machine selection',
      canonicalPath: routePath,
    })

    setStructuredData({
      id: 'press-brake-tonnage-guide-jsonld',
      data: {
        '@context': 'https://schema.org',
        '@graph': [
          createPageStructuredData(),
          createArticleStructuredData(),
          createFAQStructuredData(),
        ],
      },
    })
  }, [])

  const t = getEngineeringText(language)
  const page = getPageContent(language)
  const backToEngineeringToolsLabel =
    language === 'zh'
      ? '← 返回工程工具中心'
      : t.pages.air.backToEngineeringTools

  return (
    <>
      <style>
        {`
          .zyco-tonnage-guide {
            min-height: 100vh;
            box-sizing: border-box;
            padding: 52px 22px;
            background:
              radial-gradient(circle at 16% 12%, rgba(96, 165, 250, 0.34), transparent 30%),
              radial-gradient(circle at 84% 20%, rgba(14, 165, 233, 0.22), transparent 28%),
              linear-gradient(145deg, #071224 0%, #0b1f3f 42%, #12366e 74%, #1d4ed8 100%);
            color: #ffffff;
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            position: relative;
            overflow: hidden;
          }

          .zyco-tonnage-guide::before {
            content: "";
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(rgba(96, 165, 250, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(96, 165, 250, 0.08) 1px, transparent 1px);
            background-size: 42px 42px;
            mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent 78%);
            pointer-events: none;
          }

          .zyco-tonnage-guide__shell {
            width: min(1180px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          .zyco-tonnage-guide__hero {
            position: relative;
            padding: 38px 36px;
            margin-bottom: 22px;
            border: 1px solid rgba(191, 219, 254, 0.2);
            border-radius: 30px;
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.06));
            backdrop-filter: blur(16px);
            box-shadow: 0 28px 68px rgba(2, 8, 23, 0.2);
          }

          .zyco-tonnage-guide__back {
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
            transition:
              transform 0.22s ease,
              border-color 0.22s ease,
              color 0.22s ease,
              background 0.22s ease,
              box-shadow 0.22s ease;
          }

          .zyco-tonnage-guide__back:hover,
          .zyco-tonnage-guide__tool:hover {
            transform: translateY(-2px);
            border-color: rgba(191, 219, 254, 0.72);
            color: #ffffff;
          }

          .zyco-tonnage-guide__back:focus-visible,
          .zyco-tonnage-guide__tool:focus-visible {
            outline: 3px solid rgba(147, 197, 253, 0.46);
            outline-offset: 3px;
          }

          .zyco-tonnage-guide__eyebrow {
            color: #7dd3fc;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.2em;
            text-transform: uppercase;
          }

          .zyco-tonnage-guide__title {
            max-width: 820px;
            margin: 14px 0 18px;
            font-size: clamp(36px, 5vw, 56px);
            line-height: 1.08;
            letter-spacing: -0.055em;
          }

          .zyco-tonnage-guide__subtitle {
            max-width: 760px;
            margin: 0;
            color: #dbeafe;
            font-size: 18px;
            line-height: 1.72;
          }

          .zyco-tonnage-guide__panel {
            padding: 28px;
            margin-top: 18px;
            border: 1px solid rgba(191, 219, 254, 0.16);
            border-radius: 25px;
            background: rgba(10, 30, 61, 0.48);
            backdrop-filter: blur(12px);
          }

          .zyco-tonnage-guide__section-title {
            margin: 0 0 14px;
            color: #ffffff;
            font-size: 25px;
            letter-spacing: -0.035em;
          }

          .zyco-tonnage-guide__copy {
            margin: 0;
            color: #cbd5e1;
            font-size: 16px;
            line-height: 1.75;
          }

          .zyco-tonnage-guide__grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
          }

          .zyco-tonnage-guide__formula {
            padding: 22px;
            margin-top: 18px;
            border-radius: 18px;
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.25), rgba(14, 165, 233, 0.12));
            border: 1px solid rgba(125, 211, 252, 0.22);
          }

          .zyco-tonnage-guide__label {
            display: block;
            margin-bottom: 12px;
            color: #7dd3fc;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }

          .zyco-tonnage-guide__formula-subtitle {
            margin: -4px 0 12px;
            color: rgba(186, 230, 253, 0.78);
            font-size: 12px;
            line-height: 1.45;
            font-weight: 650;
            letter-spacing: 0.1em;
            text-transform: uppercase;
          }

          .zyco-tonnage-guide__equation {
            margin: 0;
            color: #ffffff;
            font-size: clamp(17px, 2vw, 21px);
            line-height: 1.6;
            font-weight: 650;
          }

          .zyco-tonnage-guide__formula-notes {
            margin-top: 14px;
            padding: 12px 14px;
            border: 1px solid rgba(125, 211, 252, 0.1);
            border-radius: 16px;
            background: rgba(15, 23, 42, 0.12);
          }

          .zyco-tonnage-guide__formula-notes-title {
            margin: 0 0 8px;
            color: rgba(125, 211, 252, 0.78);
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .zyco-tonnage-guide__formula-notes-list {
            display: grid;
            gap: 5px;
            margin: 0;
            padding-left: 16px;
            color: rgba(203, 213, 225, 0.86);
            font-size: 13px;
            line-height: 1.55;
          }

          .zyco-tonnage-guide__cards {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
            margin-top: 18px;
          }

          .zyco-tonnage-guide__card,
          .zyco-tonnage-guide__factor {
            padding: 18px;
            border-radius: 18px;
            background: rgba(30, 64, 112, 0.36);
            border: 1px solid rgba(191, 219, 254, 0.13);
          }

          .zyco-tonnage-guide__factor {
            transition:
              transform 0.22s ease,
              border-color 0.22s ease,
              box-shadow 0.22s ease;
          }

          .zyco-tonnage-guide__factor:hover {
            transform: translateY(-2px);
            border-color: rgba(191, 219, 254, 0.24);
            box-shadow:
              0 10px 22px rgba(30, 64, 175, 0.12),
              inset 0 1px 0 rgba(255, 255, 255, 0.06);
          }

          .zyco-tonnage-guide__card strong,
          .zyco-tonnage-guide__factor strong {
            display: block;
            margin-bottom: 8px;
            color: #eff6ff;
          }

          .zyco-tonnage-guide__card span,
          .zyco-tonnage-guide__factor span {
            color: #bfdbfe;
            font-size: 14px;
            line-height: 1.65;
          }

          .zyco-tonnage-guide__factors {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }

          .zyco-tonnage-guide__recommendation {
            grid-column: 1 / -1;
            background: rgba(30, 64, 112, 0.26);
            border-color: rgba(125, 211, 252, 0.17);
          }

          .zyco-tonnage-guide__table-wrap {
            margin-top: 18px;
            overflow-x: auto;
            border-radius: 18px;
            border: 1px solid rgba(191, 219, 254, 0.16);
          }

          .zyco-tonnage-guide__table {
            width: 100%;
            border-collapse: collapse;
            min-width: 480px;
          }

          .zyco-tonnage-guide__table th,
          .zyco-tonnage-guide__table td {
            padding: 14px 16px;
            border-bottom: 1px solid rgba(191, 219, 254, 0.1);
            text-align: left;
          }

          .zyco-tonnage-guide__table th {
            color: #bae6fd;
            background: rgba(30, 64, 112, 0.38);
            font-size: 13px;
          }

          .zyco-tonnage-guide__table td {
            color: #e2e8f0;
            font-size: 14px;
          }

          .zyco-tonnage-guide__faq {
            display: grid;
            gap: 12px;
          }

          .zyco-tonnage-guide__notes {
            display: grid;
            gap: 12px;
          }

          .zyco-tonnage-guide__faq-item {
            padding: 18px 20px;
            border-radius: 18px;
            background: rgba(30, 64, 112, 0.3);
            border: 1px solid rgba(191, 219, 254, 0.12);
          }

          .zyco-tonnage-guide__faq-item h3 {
            margin: 0 0 8px;
            font-size: 16px;
          }

          .zyco-tonnage-guide__tools {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 12px;
          }

          .zyco-tonnage-guide__tool {
            min-height: 46px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            padding: 0 18px;
            border: 1px solid rgba(96, 165, 250, 0.18);
            border-radius: 16px;
            background:
              linear-gradient(135deg, #1e3a8a 0%, #2563eb 48%, #60a5fa 100%);
            color: #ffffff;
            font-size: 15px;
            font-weight: 800;
            text-decoration: none;
            box-shadow: 0 12px 30px rgba(37, 99, 235, 0.34);
            flex: 0 1 auto;
            transition:
              transform 0.25s ease,
              box-shadow 0.25s ease,
              border-color 0.25s ease;
          }

          .zyco-tonnage-guide__tool:hover {
            box-shadow: 0 18px 38px rgba(37, 99, 235, 0.42);
          }

          @media (max-width: 760px) {
            .zyco-tonnage-guide {
              padding: 22px 14px;
            }

            .zyco-tonnage-guide__hero,
            .zyco-tonnage-guide__panel {
              padding: 22px;
              border-radius: 22px;
            }

            .zyco-tonnage-guide__grid,
            .zyco-tonnage-guide__factors,
            .zyco-tonnage-guide__cards {
              grid-template-columns: 1fr;
            }

          }

          @media (max-width: 640px) {
            .zyco-tonnage-guide__back,
            .zyco-tonnage-guide__tool {
              width: 100%;
            }
          }
        `}
      </style>

      <main className='zyco-tonnage-guide'>
        <div className='zyco-tonnage-guide__shell'>
          <header className='zyco-tonnage-guide__hero'>
            <a
              aria-label={backToEngineeringToolsLabel}
              className='zyco-tonnage-guide__back'
              href='/engineering-tools'
            >
              {backToEngineeringToolsLabel}
            </a>

            <LanguageSwitcher
              className='zyco-page-language-switcher'
              language={language}
              setLanguage={setLanguage}
            />

            <p className='zyco-tonnage-guide__eyebrow'>
              {page.eyebrow}
            </p>

            <h1 className='zyco-tonnage-guide__title'>
              {page.title}
            </h1>

            <p className='zyco-tonnage-guide__subtitle'>
              {page.subtitle}
            </p>
          </header>

          <section
            className='zyco-tonnage-guide__panel'
            aria-labelledby='tonnage-guide-intro'
          >
            <h2
              className='zyco-tonnage-guide__section-title'
              id='tonnage-guide-intro'
            >
              {page.introTitle}
            </h2>

            <p className='zyco-tonnage-guide__copy'>
              {page.intro}
            </p>
          </section>

          <div className='zyco-tonnage-guide__grid'>
            <section
              className='zyco-tonnage-guide__panel'
              aria-labelledby='tonnage-guide-formula'
            >
              <h2
                className='zyco-tonnage-guide__section-title'
                id='tonnage-guide-formula'
              >
                {page.formulaTitle}
              </h2>

              <div className='zyco-tonnage-guide__formula'>
                <span className='zyco-tonnage-guide__label'>
                  {page.formulaLabel}
                </span>
                <p className='zyco-tonnage-guide__formula-subtitle'>
                  Air Bending Reference Formula
                </p>
                <p className='zyco-tonnage-guide__equation'>
                  {page.formula}
                </p>
              </div>

              <p className='zyco-tonnage-guide__copy'>
                {page.formulaNote}
              </p>

              <aside className='zyco-tonnage-guide__formula-notes'>
                <h3 className='zyco-tonnage-guide__formula-notes-title'>
                  {page.formulaNotesTitle}
                </h3>

                <ul className='zyco-tonnage-guide__formula-notes-list'>
                  {page.formulaNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </aside>
            </section>

            <section
              className='zyco-tonnage-guide__panel'
              aria-labelledby='tonnage-guide-factors'
            >
              <h2
                className='zyco-tonnage-guide__section-title'
                id='tonnage-guide-factors'
              >
                {page.factorsTitle}
              </h2>

              <div className='zyco-tonnage-guide__factors'>
                {page.factors.map(([factor, explanation]) => (
                  <article
                    className='zyco-tonnage-guide__factor'
                    key={factor}
                  >
                    <strong>{factor}</strong>
                    <span>{explanation}</span>
                  </article>
                ))}
                <article className='zyco-tonnage-guide__factor zyco-tonnage-guide__recommendation'>
                  <strong>{page.recommendationTitle}</strong>
                  <span>{page.recommendationText}</span>
                </article>
              </div>
            </section>
          </div>

          <section
            className='zyco-tonnage-guide__panel'
            aria-labelledby='tonnage-guide-continuous-load'
          >
            <h2
              className='zyco-tonnage-guide__section-title'
              id='tonnage-guide-continuous-load'
            >
              {page.capacityTitle}
            </h2>

            <p className='zyco-tonnage-guide__copy'>
              {page.capacityText}
            </p>

            <div className='zyco-tonnage-guide__cards'>
              {page.capacityCards.map(([title, description]) => (
                <article
                  className='zyco-tonnage-guide__card'
                  key={title}
                >
                  <strong>{title}</strong>
                  <span>{description}</span>
                </article>
              ))}
            </div>
          </section>

          <section
            className='zyco-tonnage-guide__panel'
            aria-labelledby='tonnage-guide-chart'
          >
            <h2
              className='zyco-tonnage-guide__section-title'
              id='tonnage-guide-chart'
            >
              {page.chartTitle}
            </h2>

            <p className='zyco-tonnage-guide__copy'>
              {page.chartText}
            </p>

            <div className='zyco-tonnage-guide__table-wrap'>
              <table className='zyco-tonnage-guide__table'>
                <thead>
                  <tr>
                    {page.chartHeaders.map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {page.chartRows.map((row, index) => (
                    <tr key={`${row[0]}-${index}`}>
                      {row.map((cell) => (
                        <td key={cell}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section
            className='zyco-tonnage-guide__panel'
            aria-labelledby='tonnage-guide-faq'
          >
            <h2
              className='zyco-tonnage-guide__section-title'
              id='tonnage-guide-faq'
            >
              {page.faqTitle}
            </h2>

            <div className='zyco-tonnage-guide__faq'>
              {page.faq.map(([question, answer]) => (
                <article
                  className='zyco-tonnage-guide__faq-item'
                  key={question}
                >
                  <h3>{question}</h3>
                  <p className='zyco-tonnage-guide__copy'>{answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            className='zyco-tonnage-guide__panel'
            aria-labelledby='tonnage-guide-engineering-notes'
          >
            <h2
              className='zyco-tonnage-guide__section-title'
              id='tonnage-guide-engineering-notes'
            >
              {page.notesTitle}
            </h2>

            <div className='zyco-tonnage-guide__notes'>
              {page.notes.map((note) => (
                <article
                  className='zyco-tonnage-guide__faq-item'
                  key={note}
                >
                  <p className='zyco-tonnage-guide__copy'>{note}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            className='zyco-tonnage-guide__panel'
            aria-labelledby='tonnage-guide-related-tools'
          >
            <h2
              className='zyco-tonnage-guide__section-title'
              id='tonnage-guide-related-tools'
            >
              {t.common.relatedEngineeringTools}
            </h2>

            <nav
              className='zyco-tonnage-guide__tools'
              aria-label={t.common.relatedToolsAria}
            >
              {relatedTools.map((tool) => (
                <a
                  className='zyco-tonnage-guide__tool'
                  href={tool.href}
                  key={tool.key}
                >
                  {t.relatedTools[tool.key]}
                </a>
              ))}
            </nav>
          </section>
        </div>
      </main>
    </>
  )
}
