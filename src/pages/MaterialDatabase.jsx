const materials = [
  {
    name: 'Mild Steel',
    materialKey: 'mildSteel',
    factor: '1.00',
    yieldStrength: '180–280 MPa',
    tensileStrength: '300–450 MPa',
    standardAutoVDie: 'Calculator-based 8T / 10T / 12T rule',
    springbackRange: '0.6°–1.3°',
    insideRadiusReference: '1T–1.5T',
    applicationNote:
      'Standard reference material for press brake tonnage calculation.',
  },
  {
    name: 'Galvanized Steel',
    materialKey: 'galvanizedSteel',
    factor: '1.05',
    yieldStrength: '200–300 MPa',
    tensileStrength: '320–460 MPa',
    standardAutoVDie: 'Calculator-based 8T / 10T / 12T rule',
    springbackRange: '0.8°–1.6°',
    insideRadiusReference: '1.2T–1.6T',
    applicationNote:
      'Similar to mild steel, coating condition may affect surface quality.',
  },
  {
    name: 'Stainless Steel 201',
    materialKey: 'stainless201',
    factor: '1.76',
    yieldStrength: '260–380 MPa',
    tensileStrength: '600–850 MPa',
    standardAutoVDie: 'Calculator-based 8T / 10T / 12T rule',
    springbackRange: '2.2°–3.8°',
    insideRadiusReference: '1.4T–2T',
    applicationNote:
      'Higher work hardening and springback than mild steel.',
  },
  {
    name: 'Stainless Steel 304',
    materialKey: 'stainless304',
    factor: '1.62',
    yieldStrength: '215–300 MPa',
    tensileStrength: '520–750 MPa',
    standardAutoVDie: 'Calculator-based 8T / 10T / 12T rule',
    springbackRange: '1.8°–3.0°',
    insideRadiusReference: '1.3T–1.8T',
    applicationNote:
      'Common stainless steel with strong springback and good corrosion resistance.',
  },
  {
    name: 'Aluminum',
    materialKey: 'aluminum',
    factor: '0.65',
    yieldStrength: '70–160 MPa',
    tensileStrength: '150–250 MPa',
    standardAutoVDie: 'Calculator-based 8T / 10T / 12T rule',
    springbackRange: '1.2°–2.8°',
    insideRadiusReference: '1T–2T',
    applicationNote:
      'Low bending force but higher springback due to lower elastic modulus.',
  },
  {
    name: 'Brass',
    materialKey: 'brass',
    factor: '0.60',
    yieldStrength: '100–250 MPa',
    tensileStrength: '250–500 MPa',
    standardAutoVDie: 'Calculator-based 8T / 10T / 12T rule',
    springbackRange: '0.4°–1.2°',
    insideRadiusReference: '1T–1.5T',
    applicationNote:
      'Good formability, but bending direction and hardness condition should be considered.',
  },
]

const fields = [
  ['Material Factor', 'factor'],
  ['Yield Strength', 'yieldStrength'],
  ['Tensile Strength', 'tensileStrength'],
  ['Standard Auto V Die', 'standardAutoVDie'],
  ['Inside Radius Reference', 'insideRadiusReference'],
  ['Typical Springback Range', 'springbackRange'],
]

const springbackReferenceCondition =
  '2 mm thickness / 90° air bending / V ≈ 8T'

const engineeringReferenceNotes = [
  'Standard Auto V Die follows the same recommendation logic used in the Press Brake Calculator:',
  'T < 8 mm \u2192 V = 8T',
  '8 mm \u2264 T < 25 mm \u2192 V = 10T',
  'T \u2265 25 mm \u2192 V = 12T',
  'Springback and inside radius values are typical engineering reference ranges. Actual results may vary depending on material batch, thickness, V-opening, punch radius, grain direction, tooling condition and machine setup.',
]

export default function MaterialDatabase() {
  return (
    <>
      <style>
        {`
          .zyco-materials {
            min-height: 100vh;
            box-sizing: border-box;
            padding: 52px 22px;
            background:
              radial-gradient(circle at 16% 12%, rgba(96, 165, 250, 0.34), transparent 30%),
              radial-gradient(circle at 84% 20%, rgba(14, 165, 233, 0.22), transparent 28%),
              linear-gradient(145deg, #071224 0%, #0b1f3f 42%, #12366e 74%, #1d4ed8 100%);
            color: #ffffff;
            font-family:
              Inter,
              ui-sans-serif,
              system-ui,
              -apple-system,
              BlinkMacSystemFont,
              "Segoe UI",
              sans-serif;
            overflow: hidden;
            position: relative;
          }

          .zyco-materials::before {
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

          .zyco-materials::after {
            content: "";
            position: absolute;
            left: -10%;
            right: -10%;
            top: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(147, 197, 253, 0.9), transparent);
            box-shadow: 0 0 34px rgba(96, 165, 250, 0.55);
            pointer-events: none;
          }

          .zyco-materials__shell {
            width: min(1180px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          .zyco-materials__header {
            margin-bottom: 34px;
            padding: 34px;
            border: 1px solid rgba(147, 197, 253, 0.2);
            border-radius: 28px;
            background:
              linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.05));
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
            backdrop-filter: blur(18px);
          }

          .zyco-materials__eyebrow {
            margin: 0 0 14px;
            color: #93c5fd;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 2.4px;
            text-transform: uppercase;
          }

          .zyco-materials__title {
            margin: 0;
            color: #ffffff;
            font-size: 46px;
            line-height: 1.08;
            font-weight: 900;
            letter-spacing: 0;
            text-shadow: 0 0 28px rgba(96, 165, 250, 0.35);
          }

          .zyco-materials__subtitle {
            max-width: 680px;
            margin: 16px 0 0;
            color: #bfdbfe;
            font-size: 18px;
            line-height: 1.7;
            font-weight: 600;
          }

          .zyco-materials__engineering-note {
            max-width: 940px;
            margin: 24px 0 0;
            padding: 18px 20px;
            border: 1px solid rgba(147, 197, 253, 0.22);
            border-radius: 20px;
            background: rgba(15, 23, 42, 0.24);
            color: #dbeafe;
            font-size: 14px;
            line-height: 1.7;
            font-weight: 650;
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
          }

          .zyco-materials__note-title {
            margin: 0 0 12px;
            color: #ffffff;
            font-size: 18px;
            line-height: 1.25;
            font-weight: 850;
            letter-spacing: 0;
          }

          .zyco-materials__note-text {
            margin: 0;
          }

          .zyco-materials__note-text + .zyco-materials__note-text {
            margin-top: 6px;
          }

          .zyco-materials__note-rule {
            margin: 4px 0 0;
            color: #ffffff;
            font-weight: 800;
          }

          .zyco-materials__grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 18px;
          }

          .zyco-material-card {
            min-height: 438px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 24px;
            border: 1px solid rgba(255, 255, 255, 0.14);
            border-radius: 24px;
            background:
              radial-gradient(circle at top left, rgba(96, 165, 250, 0.2), transparent 42%),
              linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.05));
            box-shadow: 0 12px 34px rgba(0, 0, 0, 0.22);
            backdrop-filter: blur(16px);
            transition:
              transform 0.25s ease,
              border-color 0.25s ease,
              box-shadow 0.25s ease,
              background 0.25s ease;
            position: relative;
            overflow: hidden;
          }

          .zyco-material-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #38bdf8, #2563eb, transparent);
            opacity: 0.75;
          }

          .zyco-material-card:hover {
            transform: translateY(-7px);
            border-color: rgba(147, 197, 253, 0.36);
            box-shadow: 0 22px 48px rgba(37, 99, 235, 0.26);
            background:
              radial-gradient(circle at top left, rgba(96, 165, 250, 0.3), transparent 45%),
              linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.07));
          }

          .zyco-material-card__title {
            margin: 0 0 18px;
            color: #ffffff;
            font-size: 22px;
            line-height: 1.25;
            font-weight: 850;
            letter-spacing: 0;
            overflow-wrap: anywhere;
          }

          .zyco-material-card__specs {
            display: grid;
            gap: 10px;
            margin: 0 0 18px;
          }

          .zyco-material-card__spec {
            display: flex;
            justify-content: space-between;
            gap: 14px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(191, 219, 254, 0.14);
          }

          .zyco-material-card__label {
            color: #93c5fd;
            font-size: 12px;
            line-height: 1.35;
            font-weight: 900;
            letter-spacing: 0.7px;
            text-transform: uppercase;
          }

          .zyco-material-card__value {
            color: #ffffff;
            font-size: 14px;
            line-height: 1.4;
            font-weight: 800;
            text-align: right;
            overflow-wrap: anywhere;
          }

          .zyco-material-card__reference {
            margin: 16px 0 18px;
            padding: 12px 14px;
            border: 1px solid rgba(147, 197, 253, 0.18);
            border-radius: 16px;
            background: rgba(15, 23, 42, 0.22);
          }

          .zyco-material-card__reference-label {
            margin: 0 0 5px;
            color: #93c5fd;
            font-size: 11px;
            line-height: 1.35;
            font-weight: 900;
            letter-spacing: 0.7px;
            text-transform: uppercase;
          }

          .zyco-material-card__reference-value {
            margin: 0;
            color: #dbeafe;
            font-size: 13px;
            line-height: 1.55;
            font-weight: 750;
          }

          .zyco-material-card__note-label {
            margin: 0 0 8px;
            color: #93c5fd;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 0.7px;
            text-transform: uppercase;
          }

          .zyco-material-card__note {
            margin: 0 0 24px;
            color: #cbd5e1;
            font-size: 14px;
            line-height: 1.65;
            font-weight: 600;
          }

          .zyco-material-card__calculator-note {
            max-width: 280px;
            margin: 0 0 12px;
            color: #bfdbfe;
            font-size: 13px;
            line-height: 1.55;
            font-weight: 650;
          }

          .zyco-material-card__action {
            min-height: 46px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            align-self: flex-start;
            box-sizing: border-box;
            padding: 0 18px;
            border-radius: 16px;
            background:
              linear-gradient(135deg, #1e3a8a 0%, #2563eb 48%, #60a5fa 100%);
            color: #ffffff;
            font-size: 15px;
            font-weight: 800;
            text-decoration: none;
            box-shadow: 0 12px 30px rgba(37, 99, 235, 0.34);
            transition:
              transform 0.25s ease,
              box-shadow 0.25s ease;
          }

          .zyco-material-card__action:hover {
            transform: translateY(-2px);
            box-shadow: 0 18px 38px rgba(37, 99, 235, 0.42);
          }

          @media (max-width: 980px) {
            .zyco-materials__grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .zyco-materials__title {
              font-size: 38px;
            }
          }

          @media (max-width: 640px) {
            .zyco-materials {
              padding: 28px 14px;
            }

            .zyco-materials__header {
              padding: 24px;
              border-radius: 24px;
            }

            .zyco-materials__title {
              font-size: 32px;
            }

            .zyco-materials__subtitle {
              font-size: 16px;
            }

            .zyco-materials__engineering-note {
              padding: 16px;
              font-size: 13px;
            }

            .zyco-materials__grid {
              grid-template-columns: 1fr;
              gap: 14px;
            }

            .zyco-material-card {
              min-height: 0;
              padding: 22px;
            }

            .zyco-material-card__spec {
              display: grid;
              gap: 4px;
            }

            .zyco-material-card__value {
              text-align: left;
              white-space: normal;
            }
          }
        `}
      </style>

      <main className='zyco-materials'>
        <section className='zyco-materials__shell'>
          <header className='zyco-materials__header'>
            <p className='zyco-materials__eyebrow'>
              Engineering Reference
            </p>

            <h1 className='zyco-materials__title'>
              Material Database
            </h1>

            <p className='zyco-materials__subtitle'>
              Engineering reference for sheet metal bending materials
            </p>

            <div className='zyco-materials__engineering-note'>
              <h2 className='zyco-materials__note-title'>
                Engineering Reference Notes
              </h2>

              <p className='zyco-materials__note-text'>
                {engineeringReferenceNotes[0]}
              </p>

              {engineeringReferenceNotes.slice(1, 4).map((note) => (
                <p
                  className='zyco-materials__note-rule'
                  key={note}
                >
                  {note}
                </p>
              ))}

              <p className='zyco-materials__note-text'>
                {engineeringReferenceNotes[4]}
              </p>
            </div>
          </header>

          <div className='zyco-materials__grid'>
            {materials.map((material) => (
              <article
                className='zyco-material-card'
                key={material.name}
              >
                <div>
                  <h2 className='zyco-material-card__title'>
                    {material.name}
                  </h2>

                  <dl className='zyco-material-card__specs'>
                    {fields.map(([label, key]) => (
                      <div key={label}>
                        <div className='zyco-material-card__spec'>
                          <dt className='zyco-material-card__label'>
                            {label}
                          </dt>

                          <dd className='zyco-material-card__value'>
                            {material[key]}
                          </dd>
                        </div>

                        {key === 'springbackRange' && (
                          <div className='zyco-material-card__reference'>
                            <p className='zyco-material-card__reference-label'>
                              Reference Condition
                            </p>

                            <p className='zyco-material-card__reference-value'>
                              {springbackReferenceCondition}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </dl>

                  <p className='zyco-material-card__note-label'>
                    Application Note
                  </p>

                  <p className='zyco-material-card__note'>
                    {material.applicationNote}
                  </p>
                </div>

                <div>
                  <p className='zyco-material-card__calculator-note'>
                    For thickness- and V-die-based estimation, use the Press Brake Calculator.
                  </p>

                  <a
                    className='zyco-material-card__action'
                    href={`/engineering-tools/press-brake-calculator?material=${material.materialKey}`}
                  >
                    Calculate Bending Force →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
