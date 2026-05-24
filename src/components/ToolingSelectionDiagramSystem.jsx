function ToolShape({
  diagram,
  index,
}) {
  const punchId = `tooling-punch-${index}`
  const dieId = `tooling-die-${index}`
  const sheetId = `tooling-sheet-${index}`
  const edgeId = `tooling-edge-${index}`
  const shadowId = `tooling-shadow-${index}`
  const bendGlowId = `tooling-bend-glow-${index}`

  return (
    <svg
      className='zyco-tooling-diagrams__svg'
      viewBox='0 0 360 250'
      role='img'
      aria-label={diagram.aria}
    >
      <title>{diagram.title}</title>
      <desc>{diagram.description}</desc>
      <defs>
        <linearGradient
          id={punchId}
          x1='0'
          y1='0'
          x2='1'
          y2='0.78'
        >
          <stop
            offset='0%'
            stopColor='#93c5fd'
          />
          <stop
            offset='18%'
            stopColor='#2563eb'
          />
          <stop
            offset='54%'
            stopColor='#123b85'
          />
          <stop
            offset='100%'
            stopColor='#071936'
          />
        </linearGradient>
        <linearGradient
          id={dieId}
          x1='0'
          y1='0.08'
          x2='1'
          y2='0.9'
        >
          <stop
            offset='0%'
            stopColor='#3979db'
          />
          <stop
            offset='34%'
            stopColor='#103875'
          />
          <stop
            offset='100%'
            stopColor='#06152f'
          />
        </linearGradient>
        <linearGradient
          id={sheetId}
          x1='0'
          y1='0'
          x2='0'
          y2='1'
        >
          <stop
            offset='0%'
            stopColor='#ffffff'
          />
          <stop
            offset='36%'
            stopColor='#e2e8f0'
          />
          <stop
            offset='100%'
            stopColor='#93a9c2'
          />
        </linearGradient>
        <linearGradient
          id={edgeId}
          x1='0'
          y1='0'
          x2='1'
          y2='0'
        >
          <stop
            offset='0%'
            stopColor='#60a5fa'
            stopOpacity='0.3'
          />
          <stop
            offset='46%'
            stopColor='#dbeafe'
            stopOpacity='0.9'
          />
          <stop
            offset='100%'
            stopColor='#60a5fa'
            stopOpacity='0.28'
          />
        </linearGradient>
        <filter id={shadowId}>
          <feDropShadow
            dx='0'
            dy='8'
            stdDeviation='7'
            floodColor='#020617'
            floodOpacity='0.34'
          />
        </filter>
        <filter id={bendGlowId}>
          <feGaussianBlur stdDeviation='7' />
        </filter>
      </defs>

      <g opacity='0.29'>
        <path
          d='M20 215 H340'
          stroke='#60a5fa'
          strokeDasharray='7 12'
        />
        <path
          d='M180 14 V224'
          stroke='#60a5fa'
          strokeDasharray='6 10'
        />
      </g>
      <ellipse
        cx='180'
        cy='139'
        rx='48'
        ry='30'
        fill='#3b82f6'
        fillOpacity='0.16'
        filter={`url(#${bendGlowId})`}
      />

      <g filter={`url(#${shadowId})`}>
        {diagram.type === 'standard' && (
          <>
            <path
              d='M147 18 H213 V30 H204 V43 H211 V56 H199 L194 74 L186 102 Q180 113 174 102 L166 74 L161 56 H149 V43 H156 V30 H147 Z'
              fill={`url(#${punchId})`}
            />
            <path
              d='M156 30 H204 M161 56 H199 M174 102 Q180 109 186 102'
              fill='none'
              stroke={`url(#${edgeId})`}
              strokeWidth='2'
            />
            <path
              d='M48 218 V158 Q48 150 56 150 H137 L180 195 L223 150 H304 Q312 150 312 158 V218 Z'
              fill={`url(#${dieId})`}
            />
            <path
              d='M50 151 H137 L180 195 L223 151 H310 M62 209 H298'
              fill='none'
              stroke={`url(#${edgeId})`}
              strokeWidth='2'
            />
            <path
              d='M62 137 H136 L180 177 L224 137 H298'
              fill='none'
              stroke={`url(#${sheetId})`}
              strokeWidth='6'
              strokeLinejoin='round'
              strokeLinecap='round'
            />
          </>
        )}
        {diagram.type === 'gooseneck' && (
          <>
            <path
              d='M104 18 H242 V57 L205 83 Q190 94 193 110 L207 148 L180 174 L157 149 L143 120 L104 78 Z'
              fill={`url(#${punchId})`}
            />
            <path
              d='M106 20 H240 V56 L204 81 Q188 93 191 110 L205 147 L180 171 L159 147'
              fill='none'
              stroke={`url(#${edgeId})`}
              strokeWidth='2'
            />
            <path
              d='M44 224 V180 H145 L180 214 L215 180 H316 V224 Z'
              fill={`url(#${dieId})`}
            />
            <path
              d='M45 181 H145 L180 214 L215 181 H315 M58 216 H302'
              fill='none'
              stroke={`url(#${edgeId})`}
              strokeWidth='2'
            />
            <path
              d='M147 168 L180 201 L222 159 L250 131 L226 107'
              fill='none'
              stroke={`url(#${sheetId})`}
              strokeWidth='6'
              strokeLinejoin='round'
              strokeLinecap='round'
            />
          </>
        )}
        {diagram.type === 'acute' && (
          <>
            <path
              d='M148 18 H212 V31 H205 V48 L182 129 Q180 137 178 129 L155 48 V31 H148 Z'
              fill={`url(#${punchId})`}
            />
            <path
              d='M155 31 H205 M178 129 L180 135 L182 129'
              fill='none'
              stroke={`url(#${edgeId})`}
              strokeWidth='2'
            />
            <path
              d='M45 219 V167 Q45 157 55 157 H150 L180 211 L210 157 H305 Q315 157 315 167 V219 Z'
              fill={`url(#${dieId})`}
            />
            <path
              d='M47 158 H150 L180 211 L210 158 H313'
              fill='none'
              stroke={`url(#${edgeId})`}
              strokeWidth='2'
            />
            <path
              d='M70 144 H147 L180 198 L213 144 H290'
              fill='none'
              stroke={`url(#${sheetId})`}
              strokeWidth='6'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M169 172 A16 16 0 0 0 191 172'
              fill='none'
              stroke='#7dd3fc'
              strokeWidth='2'
            />
          </>
        )}
        {diagram.type === 'hemming' && (
          <>
            <path
              d='M34 20 H102 V62 L72 124 Q68 131 64 124 L34 62 Z'
              fill={`url(#${punchId})`}
            />
            <path
              d='M14 224 V175 H43 V132 H56 L68 171 L80 132 H93 V175 H126 V224 Z'
              fill={`url(#${dieId})`}
            />
            <path
              d='M35 21 H101 M35 62 L64 124 Q68 130 72 124 L101 62 M15 175 H43 V132 H56 L68 171 L80 132 H93 V175 H125'
              fill='none'
              stroke={`url(#${edgeId})`}
              strokeWidth='2'
            />
            <path
              d='M39 98 L62 151 Q68 164 74 151 L97 98'
              fill='none'
              stroke={`url(#${sheetId})`}
              strokeWidth='5'
              strokeLinejoin='round'
              strokeLinecap='square'
            />
            <path
              d='M178 22 H329 V74 H315 V91 H192 V74 H178 Z'
              fill={`url(#${punchId})`}
            />
            <path
              d='M171 224 V177 H185 V137 H322 V177 H337 V224 Z'
              fill={`url(#${dieId})`}
            />
            <path
              d='M179 23 H328 M192 91 H315 M172 177 H185 V137 H322 V177 H336'
              fill='none'
              stroke={`url(#${edgeId})`}
              strokeWidth='2'
            />
            <path
              d='M316 116 H207 Q198 116 198 123 Q198 130 207 130 H291'
              fill='none'
              stroke={`url(#${sheetId})`}
              strokeWidth='5'
              strokeLinejoin='round'
              strokeLinecap='square'
            />
            <path
              d='M140 127 H163 M156 122 L164 127 L156 132'
              fill='none'
              stroke='#93c5fd'
              strokeOpacity='0.8'
              strokeWidth='1.7'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M207 116 H315 M207 130 H290'
              fill='none'
              stroke='#38bdf8'
              strokeOpacity='0.24'
              strokeWidth='5'
              filter={`url(#${bendGlowId})`}
            />
          </>
        )}
        {diagram.type === 'offset' && (
          <>
            <path
              d='M34 25 H326 V39 H310 V104 H173 V126 H34 Z'
              fill={`url(#${punchId})`}
            />
            <path
              d='M34 224 V150 H173 V128 H326 V224 Z'
              fill={`url(#${dieId})`}
            />
            <path
              d='M35 39 H310 V104 H173 V126 H35 M35 150 H173 V128 H325'
              fill='none'
              stroke={`url(#${edgeId})`}
              strokeWidth='2'
            />
            <path
              d='M35 136 H163 Q170 136 170 129 V119 Q170 111 178 111 H326 V118 H181 Q177 118 177 122 V132 Q177 143 166 143 H35 Z'
              fill={`url(#${sheetId})`}
              stroke='#f8fafc'
              strokeOpacity='0.72'
              strokeWidth='1'
              strokeLinejoin='round'
            />
            <path
              d='M36 138 H163 Q173 138 173 129 V121 Q173 114 180 114 H325'
              fill='none'
              stroke='#ffffff'
              strokeOpacity='0.9'
              strokeWidth='1.2'
              strokeLinejoin='round'
            />
            <path
              d='M298 113 V141 M291 113 H305 M291 141 H305'
              fill='none'
              stroke='#7dd3fc'
              strokeWidth='2.1'
            />
            <path
              d='M288 113 H266 M288 141 H266'
              fill='none'
              stroke='#7dd3fc'
              strokeOpacity='0.64'
              strokeWidth='1.5'
            />
            <circle
              cx='298'
              cy='127'
              r='3'
              fill='#bae6fd'
            />
          </>
        )}
        {diagram.type === 'radius' && (
          <>
            <path
              d='M118 18 H242 V31 H234 V70 C234 99 210 120 180 120 C150 120 126 99 126 70 V31 H118 Z'
              fill={`url(#${punchId})`}
            />
            <path
              d='M126 31 H234 M127 70 C127 99 151 118 180 118 C209 118 233 99 233 70'
              fill='none'
              stroke={`url(#${edgeId})`}
              strokeWidth='2'
            />
            <path
              d='M43 218 V165 Q43 151 57 151 H122 Q129 151 135 159 C148 179 162 190 180 190 C198 190 212 179 225 159 Q231 151 238 151 H303 Q317 151 317 165 V218 Z'
              fill={`url(#${dieId})`}
            />
            <path
              d='M44 152 H122 Q130 152 136 160 C149 180 163 190 180 190 C197 190 211 180 224 160 Q230 152 238 152 H316'
              fill='none'
              stroke={`url(#${edgeId})`}
              strokeWidth='2'
            />
            <path
              d='M60 137 H118 Q128 137 135 146 C149 163 163 171 180 171 C197 171 211 163 225 146 Q232 137 242 137 H300'
              fill='none'
              stroke={`url(#${sheetId})`}
              strokeWidth='6'
              strokeLinecap='round'
            />
            <path
              d='M145 141 A44 44 0 0 0 215 141'
              fill='none'
              stroke='#7dd3fc'
              strokeWidth='2'
              strokeDasharray='4 4'
            />
          </>
        )}
      </g>
    </svg>
  )
}

export default function ToolingSelectionDiagramSystem({ labels }) {
  return (
    <section
      className='zyco-tooling-diagrams'
      aria-labelledby='tooling-diagrams-title'
    >
      <style>
        {`
          .zyco-tooling-diagrams {
            position: relative;
            box-sizing: border-box;
            margin-top: 18px;
            padding: 28px;
            overflow: hidden;
            border: 1px solid rgba(180, 220, 255, 0.12);
            border-radius: 26px;
            background:
              radial-gradient(circle at 46% 10%, rgba(191, 219, 254, 0.17), transparent 32%),
              linear-gradient(135deg, rgba(26, 64, 112, 0.72), rgba(8, 28, 56, 0.82));
            box-shadow:
              0 18px 48px rgba(2, 8, 23, 0.18),
              inset 0 1px 0 rgba(255, 255, 255, 0.16);
          }

          .zyco-tooling-diagrams::before {
            content: "";
            position: absolute;
            inset: 1px;
            border-radius: 25px;
            background-image:
              linear-gradient(rgba(148, 197, 255, 0.045) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148, 197, 255, 0.04) 1px, transparent 1px);
            background-size: 28px 28px;
            mask-image: radial-gradient(circle at 50% 32%, #000, transparent 82%);
            pointer-events: none;
          }

          .zyco-tooling-diagrams > * {
            position: relative;
            z-index: 1;
          }

          .zyco-tooling-diagrams__eyebrow {
            margin: 0 0 7px;
            color: #93c5fd;
            font-size: 12px;
            font-weight: 850;
            letter-spacing: 2px;
            text-transform: uppercase;
          }

          .zyco-tooling-diagrams__title {
            margin: 0 0 9px;
            color: #ffffff;
            font-size: 25px;
            line-height: 1.32;
            letter-spacing: -0.03em;
          }

          .zyco-tooling-diagrams__copy {
            max-width: 850px;
            margin: 0;
            color: #cbd5e1;
            font-size: 15px;
            line-height: 1.7;
          }

          .zyco-tooling-diagrams__reference {
            display: inline-flex;
            margin: 18px 0 20px;
            padding: 8px 12px;
            border: 1px solid rgba(125, 211, 252, 0.22);
            border-radius: 999px;
            background: rgba(30, 64, 112, 0.3);
            color: #bae6fd;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.08em;
          }

          .zyco-tooling-diagrams__grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
          }

          .zyco-tooling-diagrams__card {
            padding: 15px;
            border: 1px solid rgba(191, 219, 254, 0.14);
            border-radius: 20px;
            background: rgba(11, 35, 70, 0.52);
            transition:
              transform 0.22s ease,
              border-color 0.22s ease,
              box-shadow 0.22s ease;
          }

          .zyco-tooling-diagrams__card:hover {
            transform: translateY(-2px);
            border-color: rgba(191, 219, 254, 0.3);
            box-shadow:
              0 16px 28px rgba(2, 8, 23, 0.18),
              0 0 22px rgba(96, 165, 250, 0.09);
          }

          .zyco-tooling-diagrams__card h3 {
            min-height: 42px;
            margin: 0 0 8px;
            color: #f8fafc;
            font-size: 16px;
            line-height: 1.4;
          }

          .zyco-tooling-diagrams__stage {
            border: 1px solid rgba(147, 197, 253, 0.13);
            border-radius: 14px;
            background:
              radial-gradient(circle at 50% 48%, rgba(96, 165, 250, 0.17), transparent 48%),
              linear-gradient(180deg, rgba(14, 41, 78, 0.28), rgba(3, 12, 29, 0.34)),
              rgba(7, 20, 43, 0.42);
            overflow: hidden;
          }

          .zyco-tooling-diagrams__svg {
            display: block;
            width: 100%;
            height: auto;
          }

          .zyco-tooling-diagrams__tags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin: 12px 0 10px;
          }

          .zyco-tooling-diagrams__tag {
            padding: 5px 8px;
            border-radius: 999px;
            background: rgba(37, 99, 235, 0.16);
            color: #bae6fd;
            font-size: 11px;
            font-weight: 750;
          }

          .zyco-tooling-diagrams__card p {
            margin: 0;
            color: #cbd5e1;
            font-size: 13px;
            line-height: 1.6;
          }

          @media (max-width: 980px) {
            .zyco-tooling-diagrams__grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 680px) {
            .zyco-tooling-diagrams {
              padding: 20px;
              border-radius: 22px;
            }

            .zyco-tooling-diagrams__grid {
              grid-template-columns: 1fr;
            }

            .zyco-tooling-diagrams__card h3 {
              min-height: auto;
            }
          }
        `}
      </style>

      <header>
        <p className='zyco-tooling-diagrams__eyebrow'>{labels.eyebrow}</p>
        <h2
          className='zyco-tooling-diagrams__title'
          id='tooling-diagrams-title'
        >
          {labels.title}
        </h2>
        <p className='zyco-tooling-diagrams__copy'>{labels.intro}</p>
        <p className='zyco-tooling-diagrams__reference'>{labels.reference}</p>
      </header>

      <div className='zyco-tooling-diagrams__grid'>
        {labels.diagrams.map((diagram, index) => (
          <article
            className='zyco-tooling-diagrams__card'
            key={diagram.type}
          >
            <h3>{diagram.title}</h3>
            <div className='zyco-tooling-diagrams__stage'>
              <ToolShape
                diagram={diagram}
                index={index}
              />
            </div>
            <div className='zyco-tooling-diagrams__tags'>
              {diagram.tags.map((tag) => (
                <span
                  className='zyco-tooling-diagrams__tag'
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
            <p>{diagram.caption}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
