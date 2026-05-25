const formedDimensionNotes = {
  'outside-dimension reference': ['Outside dimensions should be corrected', 'using BA / BD'],
  '外尺寸参考': ['外侧尺寸参考需结合 BA / BD 修正'],
  'база наружных размеров': ['Наружные размеры требуют', 'корректировки по BA / BD'],
  'referencia exterior': ['Las dimensiones exteriores deben', 'corregirse mediante BA / BD'],
  'dış ölçü referansı': ['Dış ölçüler BA / BD kullanılarak', 'düzeltilmelidir'],
  'referensi dimensi luar': ['Dimensi luar harus dikoreksi', 'menggunakan BA / BD'],
}

export default function BendDeductionDiagram({ labels }) {
  const formedDimensionNote =
    formedDimensionNotes[labels.formedCaption] ||
    formedDimensionNotes['outside-dimension reference']

  return (
    <section className='zyco-bd-diagram' aria-labelledby='bd-diagram-title'>
      <style>{`
        .zyco-bd-diagram { position:relative; margin-top:18px; padding:24px; overflow:hidden; border:1px solid rgba(180,220,255,.14); border-radius:26px; background:radial-gradient(circle at 74% 25%,rgba(56,189,248,.16),transparent 30%),linear-gradient(135deg,rgba(26,64,112,.72),rgba(8,28,56,.84)); box-shadow:0 18px 48px rgba(2,8,23,.2),inset 0 1px 0 rgba(255,255,255,.14); }
        .zyco-bd-diagram::before { content:""; position:absolute; inset:1px; border-radius:25px; background-image:linear-gradient(rgba(148,197,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(148,197,255,.04) 1px,transparent 1px); background-size:28px 28px; mask-image:radial-gradient(circle at 50% 44%,#000,transparent 78%); pointer-events:none; }
        .zyco-bd-diagram__header,.zyco-bd-diagram__stage { position:relative; z-index:1; }
        .zyco-bd-diagram__eyebrow { margin:0 0 7px; color:#93c5fd; font-size:12px; font-weight:850; letter-spacing:2px; text-transform:uppercase; }
        .zyco-bd-diagram__title { margin:0 0 18px; color:#fff; font-size:21px; line-height:1.35; font-weight:850; }
        .zyco-bd-diagram__stage { border:1px solid rgba(191,219,254,.2); border-radius:22px; background:linear-gradient(180deg,rgba(38,84,143,.34),rgba(18,49,93,.32)); overflow:hidden; }
        .zyco-bd-diagram__svg { display:block; width:100%; height:auto; }
        .zyco-bd-diagram__neutral { stroke-dasharray:8 8; animation:bd-axis 4s ease-in-out infinite; }
        .zyco-bd-diagram__focus { animation:bd-focus 4s ease-in-out infinite; }
        .zyco-bd-diagram__fine { vector-effect:non-scaling-stroke; }
        @keyframes bd-axis { 0%,100% { stroke-opacity:.62; } 50% { stroke-opacity:1; } }
        @keyframes bd-focus { 0%,100% { opacity:.72; } 50% { opacity:1; } }
        @media (prefers-reduced-motion:reduce) { .zyco-bd-diagram__neutral,.zyco-bd-diagram__focus { animation:none; } }
        @media (max-width:760px) { .zyco-bd-diagram { padding:18px; border-radius:22px; } .zyco-bd-diagram__title { font-size:18px; } }
      `}</style>
      <header className='zyco-bd-diagram__header'>
        <p className='zyco-bd-diagram__eyebrow'>{labels.eyebrow}</p>
        <h2 className='zyco-bd-diagram__title' id='bd-diagram-title'>{labels.title}</h2>
      </header>
      <div className='zyco-bd-diagram__stage'>
        <svg className='zyco-bd-diagram__svg' viewBox='0 0 1120 750' role='img' aria-labelledby='bd-svg-title bd-svg-desc'>
          <title id='bd-svg-title'>{labels.svgTitle}</title>
          <desc id='bd-svg-desc'>{labels.svgDescription}</desc>
          <defs>
            <linearGradient id='bdSheet' x1='0' y1='0' x2='1' y2='1'>
              <stop stopColor='#dbeafe'/>
              <stop offset='.48' stopColor='#ffffff'/>
              <stop offset='1' stopColor='#60a5fa'/>
            </linearGradient>
            <linearGradient id='bdFlat' x1='0' y1='0' x2='1' y2='0'>
              <stop stopColor='#cbd5e1'/>
              <stop offset='.35' stopColor='#ffffff'/>
              <stop offset='.7' stopColor='#eff6ff'/>
              <stop offset='1' stopColor='#93c5fd'/>
            </linearGradient>
            <linearGradient id='bdAllowance' x1='0' y1='0' x2='0' y2='1'>
              <stop stopColor='#67e8f9'/>
              <stop offset='1' stopColor='#2563eb'/>
            </linearGradient>
            <filter id='bdGlow'>
              <feGaussianBlur stdDeviation='5' result='g'/>
              <feMerge><feMergeNode in='g'/><feMergeNode in='SourceGraphic'/></feMerge>
            </filter>
            <marker id='bdArrow' markerWidth='8' markerHeight='8' refX='7' refY='4' orient='auto-start-reverse'>
              <path d='M8 0 L0 4 L8 8' fill='none' stroke='#93c5fd' strokeWidth='1.4'/>
            </marker>
            <marker id='bdCyanArrow' markerWidth='8' markerHeight='8' refX='7' refY='4' orient='auto-start-reverse'>
              <path d='M8 0 L0 4 L8 8' fill='none' stroke='#38bdf8' strokeWidth='1.4'/>
            </marker>
          </defs>

          <line x1='558' y1='34' x2='558' y2='625' stroke='#60a5fa' strokeOpacity='.22' strokeDasharray='8 14'/>

          <g transform='translate(27 26)'>
            <text x='252' y='30' textAnchor='middle' fill='#bae6fd' fontSize='18' fontWeight='800'>{labels.formed}</text>
            <rect x='0' y='51' width='505' height='563' rx='22' fill='rgba(10,30,61,.42)' stroke='rgba(191,219,254,.16)'/>

            <path
              d='M142 426 V210 A72 72 0 0 1 214 138 H426 V166 H214 A44 44 0 0 0 170 210 V426 Z'
              fill='url(#bdSheet)'
              stroke='#bfdbfe'
              strokeWidth='1.2'
            />
            <path className='zyco-bd-diagram__neutral' d='M156 426 V210 A58 58 0 0 1 214 152 H426' fill='none' stroke='#0ea5e9' strokeWidth='2.6'/>
            <path className='zyco-bd-diagram__focus' d='M170 210 A44 44 0 0 1 214 166' fill='none' stroke='#38bdf8' strokeWidth='3.5' filter='url(#bdGlow)'/>

            {/* Virtual outside corner and tangent points establish the setback. */}
            <path d='M142 138 H214 M142 138 V210' fill='none' stroke='#60a5fa' strokeOpacity='.52' strokeDasharray='5 6'/>
            <circle cx='142' cy='138' r='4' fill='#7dd3fc'/>
            <circle cx='214' cy='138' r='3.5' fill='#38bdf8'/>
            <circle cx='142' cy='210' r='3.5' fill='#38bdf8'/>

            {/* Outside flange A: external vertical dimension. */}
            <path className='zyco-bd-diagram__fine' d='M142 138 H85 M142 426 H85 M72 138 V426' fill='none' stroke='#93c5fd' strokeWidth='1.3'/>
            <path d='M72 138 V426' fill='none' stroke='#93c5fd' markerStart='url(#bdArrow)' markerEnd='url(#bdArrow)'/>
            <text x='43' y='282' transform='rotate(-90 43 282)' textAnchor='middle' fill='#dbeafe' fontSize='13' fontWeight='700'>{labels.outsideA}</text>

            {/* Outside flange B: external horizontal dimension. */}
            <path className='zyco-bd-diagram__fine' d='M142 138 V95 M426 138 V95 M142 83 H426' fill='none' stroke='#93c5fd' strokeWidth='1.3'/>
            <path d='M142 83 H426' fill='none' stroke='#93c5fd' markerStart='url(#bdArrow)' markerEnd='url(#bdArrow)'/>
            <text x='284' y='69' textAnchor='middle' fill='#dbeafe' fontSize='13' fontWeight='700'>{labels.outsideB}</text>

            {/* OSSB: theoretical sharp intersection to outer tangent. */}
            <path d='M142 118 H214' fill='none' stroke='#38bdf8' markerStart='url(#bdCyanArrow)' markerEnd='url(#bdCyanArrow)'/>
            <path d='M142 118 V138 M214 118 V138' stroke='#38bdf8' strokeWidth='1.2'/>
            <text x='178' y='108' textAnchor='middle' fill='#7dd3fc' fontSize='12' fontWeight='800'>{labels.ossb}</text>

            {/* Leaders land on the inside arc and the dashed neutral arc. */}
            <path d='M185 181 L272 236 H385' fill='none' stroke='#93c5fd' markerStart='url(#bdArrow)'/>
            <text x='391' y='240' fill='#dbeafe' fontSize='13' fontWeight='700'>{labels.insideRadius}</text>
            <path d='M163 189 L246 284 H385' fill='none' stroke='#38bdf8' markerStart='url(#bdCyanArrow)'/>
            <text x='391' y='288' fill='#7dd3fc' fontSize='13' fontWeight='700'>{labels.neutralAxis}</text>

            {/* Thickness is measured across the horizontal sheet cross-section. */}
            <path d='M347 138 V166' fill='none' stroke='#93c5fd' markerStart='url(#bdArrow)' markerEnd='url(#bdArrow)'/>
            <path d='M333 138 H359 M333 166 H359' stroke='#93c5fd' strokeWidth='1.2'/>
            <path d='M359 151 H390' stroke='#93c5fd' strokeWidth='1.2'/>
            <text x='395' y='155' fill='#dbeafe' fontSize='12' fontWeight='700'>{labels.thickness}</text>

            <rect x='57' y='505' width='391' height='58' rx='16' fill='rgba(37,99,235,.13)' stroke='rgba(125,211,252,.18)'/>
            <text x='252' y='534' textAnchor='middle' dominantBaseline='middle' fill='#93c5fd' fontSize='12' fontWeight='750'>
              {formedDimensionNote.length === 1 ? (
                <tspan x='252' dy='0'>{formedDimensionNote[0]}</tspan>
              ) : (
                <>
                  <tspan x='252' dy='-8'>{formedDimensionNote[0]}</tspan>
                  <tspan x='252' dy='16'>{formedDimensionNote[1]}</tspan>
                </>
              )}
            </text>
            <text x='252' y='551' textAnchor='middle' fill='#dbeafe' fontSize='14' fontWeight='800'>{''}</text>
          </g>

          <g transform='translate(586 26)'>
            <text x='252' y='30' textAnchor='middle' fill='#bae6fd' fontSize='18' fontWeight='800'>{labels.flat}</text>
            <rect x='0' y='51' width='505' height='563' rx='22' fill='rgba(10,30,61,.42)' stroke='rgba(191,219,254,.16)'/>

            {/* Complete flat length dimension above the developed blank. */}
            <path d='M48 156 V128 M457 156 V128 M48 116 H457' fill='none' stroke='#93c5fd' strokeWidth='1.25'/>
            <path d='M48 116 H457' fill='none' stroke='#93c5fd' markerStart='url(#bdArrow)' markerEnd='url(#bdArrow)'/>
            <text x='252' y='98' textAnchor='middle' fill='#dbeafe' fontSize='14' fontWeight='800'>{labels.flatLength}</text>

            {/* Developed strip with a highlighted neutral-axis bend allowance region. */}
            <rect x='48' y='156' width='409' height='58' rx='7' fill='url(#bdFlat)' stroke='#e0f2fe' strokeWidth='1.3'/>
            <rect className='zyco-bd-diagram__focus' x='211' y='156' width='78' height='58' fill='url(#bdAllowance)' opacity='.92' filter='url(#bdGlow)'/>
            <path d='M211 149 V221 M289 149 V221' stroke='#38bdf8' strokeWidth='1.5' strokeDasharray='4 4'/>
            <path className='zyco-bd-diagram__neutral' d='M48 185 H457' fill='none' stroke='#0ea5e9' strokeWidth='2'/>

            <text x='130' y='185' textAnchor='middle' dominantBaseline='central' fill='#0b2143' fontSize='18' fontWeight='900'>A</text>
            <text x='250' y='185' textAnchor='middle' dominantBaseline='central' fill='#ffffff' fontSize='15' fontWeight='900'>BA</text>
            <text x='373' y='185' textAnchor='middle' dominantBaseline='central' fill='#0b2143' fontSize='18' fontWeight='900'>B</text>
            <path d='M48 228 H211 M48 222 V234 M211 222 V234' stroke='#93c5fd' strokeWidth='1.2'/>
            <path d='M289 228 H457 M289 222 V234 M457 222 V234' stroke='#93c5fd' strokeWidth='1.2'/>
            <text x='130' y='251' textAnchor='middle' fill='#dbeafe' fontSize='13' fontWeight='800'>A</text>
            <text x='373' y='251' textAnchor='middle' fill='#dbeafe' fontSize='13' fontWeight='800'>B</text>

            <path d='M211 266 H289' fill='none' stroke='#38bdf8' markerStart='url(#bdCyanArrow)' markerEnd='url(#bdCyanArrow)'/>
            <text x='250' y='290' textAnchor='middle' fill='#7dd3fc' fontSize='13' fontWeight='800'>{labels.ba}</text>

            {/* Deduction is shown as subtraction from A + B, not as material in the blank. */}
            <rect x='47' y='336' width='411' height='116' rx='17' fill='rgba(15,38,76,.62)' stroke='rgba(147,197,253,.22)'/>
            <text x='252' y='361' textAnchor='middle' fill='#93c5fd' fontSize='12' fontWeight='800'>{labels.formedCaption}</text>
            <rect x='72' y='383' width='126' height='42' rx='10' fill='rgba(191,219,254,.1)' stroke='rgba(191,219,254,.2)'/>
            <text x='135' y='410' textAnchor='middle' fill='#eff6ff' fontSize='17' fontWeight='850'>A + B</text>
            <text x='215' y='410' textAnchor='middle' fill='#7dd3fc' fontSize='22' fontWeight='850'>−</text>
            <rect className='zyco-bd-diagram__focus' x='235' y='383' width='97' height='42' rx='10' fill='rgba(37,99,235,.28)' stroke='#38bdf8'/>
            <text x='283' y='410' textAnchor='middle' fill='#fff' fontSize='16' fontWeight='850'>BD</text>
            <text x='350' y='410' textAnchor='middle' fill='#7dd3fc' fontSize='22' fontWeight='850'>=</text>
            <text x='396' y='406' textAnchor='middle' fill='#eff6ff' fontSize='12' fontWeight='800'>{labels.flatLength}</text>
            <text x='283' y='441' textAnchor='middle' fill='#7dd3fc' fontSize='12' fontWeight='800'>{labels.bd}</text>
            <text x='252' y='480' textAnchor='middle' fill='#93c5fd' fontSize='14' fontWeight='750'>{labels.flatCaption}</text>
            <text x='252' y='509' textAnchor='middle' fill='#dbeafe' fontSize='16' fontWeight='850'>A + B − BD</text>
          </g>

          <g>
            <rect x='142' y='662' width='836' height='66' rx='18' fill='rgba(37,99,235,.18)' stroke='rgba(125,211,252,.27)'/>
            <path d='M560 674 V716' stroke='rgba(147,197,253,.25)'/>
            <text x='351' y='702' textAnchor='middle' fill='#eff6ff' fontSize='18' fontWeight='850'>BD = 2 × OSSB − BA</text>
            <text x='765' y='702' textAnchor='middle' fill='#eff6ff' fontSize='18' fontWeight='850'>{labels.flatLength} = A + B − BD</text>
          </g>
        </svg>
      </div>
    </section>
  )
}
