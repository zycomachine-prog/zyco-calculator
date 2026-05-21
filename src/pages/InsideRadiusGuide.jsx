const materials = [
  {
    name: 'Mild Steel',
    materialKey: 'mildSteel',
    recommendedInsideRadius: '\u2248 1T',
    minimumInsideRadius: '0.8T',
    crackRisk: 'Low',
    recommendedVDieRelation: 'V = 6T\u20138T',
    springbackSensitivity: 'Low',
    applicationNote: 'Standard forming material with good bendability.',
  },
  {
    name: 'Galvanized Steel',
    materialKey: 'galvanizedSteel',
    recommendedInsideRadius: '\u2248 1T',
    minimumInsideRadius: '1T',
    crackRisk: 'Medium',
    recommendedVDieRelation: 'V = 6T\u20138T',
    springbackSensitivity: 'Low',
    applicationNote:
      'Coating condition may affect edge cracking and surface quality.',
  },
  {
    name: 'Stainless Steel 201',
    materialKey: 'stainless201',
    recommendedInsideRadius: '1T\u20131.5T',
    minimumInsideRadius: '1T',
    crackRisk: 'High',
    recommendedVDieRelation: 'V = 8T\u201310T',
    springbackSensitivity: 'Very High',
    applicationNote:
      'Strong work hardening and higher crack risk in sharp bends.',
  },
  {
    name: 'Stainless Steel 304',
    materialKey: 'stainless304',
    recommendedInsideRadius: '1T\u20131.5T',
    minimumInsideRadius: '1T',
    crackRisk: 'Medium',
    recommendedVDieRelation: 'V = 8T\u201310T',
    springbackSensitivity: 'High',
    applicationNote:
      'Good corrosion resistance with significant springback.',
  },
  {
    name: 'Aluminum',
    materialKey: 'aluminum',
    recommendedInsideRadius: '1T\u20132T',
    minimumInsideRadius: '1T',
    crackRisk: 'Medium',
    recommendedVDieRelation: 'V = 6T\u20138T',
    springbackSensitivity: 'Medium',
    applicationNote:
      'Softer material with lower tonnage but sensitive to grain direction.',
  },
  {
    name: 'Brass',
    materialKey: 'brass',
    recommendedInsideRadius: '\u2248 1T',
    minimumInsideRadius: '0.8T',
    crackRisk: 'Low',
    recommendedVDieRelation: 'V = 6T\u20138T',
    springbackSensitivity: 'Low',
    applicationNote:
      'Excellent formability under proper hardness condition.',
  },
]

const fields = [
  ['Recommended Inside Radius', 'recommendedInsideRadius'],
  ['Minimum Inside Radius', 'minimumInsideRadius'],
  ['Crack Risk', 'crackRisk'],
  ['Recommended V Die Relation', 'recommendedVDieRelation'],
  ['Springback Sensitivity', 'springbackSensitivity'],
]

export default function InsideRadiusGuide() {
  return (
    <>
      <style>
        {`
          .zyco-radius {
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

          .zyco-radius::before {
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

          .zyco-radius::after {
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

          .zyco-radius__shell {
            width: min(1180px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          .zyco-radius__header {
            margin-bottom: 34px;
            padding: 34px;
            border: 1px solid rgba(147, 197, 253, 0.2);
            border-radius: 28px;
            background:
              linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.05));
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
            backdrop-filter: blur(18px);
          }

          .zyco-radius__eyebrow {
            margin: 0 0 14px;
            color: #93c5fd;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 2.4px;
            text-transform: uppercase;
          }

          .zyco-radius__title {
            margin: 0;
            color: #ffffff;
            font-size: 46px;
            line-height: 1.08;
            font-weight: 900;
            letter-spacing: 0;
            text-shadow: 0 0 28px rgba(96, 165, 250, 0.35);
          }

          .zyco-radius__subtitle {
            max-width: 680px;
            margin: 16px 0 0;
            color: #bfdbfe;
            font-size: 18px;
            line-height: 1.7;
            font-weight: 600;
          }

          .zyco-radius__grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 18px;
          }

          .zyco-radius-card {
            min-height: 474px;
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

          .zyco-radius-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #38bdf8, #2563eb, transparent);
            opacity: 0.75;
          }

          .zyco-radius-card:hover {
            transform: translateY(-7px);
            border-color: rgba(147, 197, 253, 0.36);
            box-shadow: 0 22px 48px rgba(37, 99, 235, 0.26);
            background:
              radial-gradient(circle at top left, rgba(96, 165, 250, 0.3), transparent 45%),
              linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.07));
          }

          .zyco-radius-card__title {
            margin: 0 0 18px;
            color: #ffffff;
            font-size: 22px;
            line-height: 1.25;
            font-weight: 850;
            letter-spacing: 0;
            overflow-wrap: anywhere;
          }

          .zyco-radius-card__specs {
            display: grid;
            gap: 10px;
            margin: 0 0 18px;
          }

          .zyco-radius-card__spec {
            display: flex;
            justify-content: space-between;
            gap: 14px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(191, 219, 254, 0.14);
          }

          .zyco-radius-card__label {
            color: #93c5fd;
            font-size: 12px;
            line-height: 1.35;
            font-weight: 900;
            letter-spacing: 0.7px;
            text-transform: uppercase;
          }

          .zyco-radius-card__value {
            color: #ffffff;
            font-size: 14px;
            line-height: 1.4;
            font-weight: 800;
            text-align: right;
            white-space: nowrap;
          }

          .zyco-radius-card__note-label {
            margin: 0 0 8px;
            color: #93c5fd;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 0.7px;
            text-transform: uppercase;
          }

          .zyco-radius-card__note {
            margin: 0 0 24px;
            color: #cbd5e1;
            font-size: 14px;
            line-height: 1.65;
            font-weight: 600;
          }

          .zyco-radius-card__action {
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

          .zyco-radius-card__action:hover {
            transform: translateY(-2px);
            box-shadow: 0 18px 38px rgba(37, 99, 235, 0.42);
          }

          @media (max-width: 980px) {
            .zyco-radius__grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .zyco-radius__title {
              font-size: 38px;
            }
          }

          @media (max-width: 640px) {
            .zyco-radius {
              padding: 28px 14px;
            }

            .zyco-radius__header {
              padding: 24px;
              border-radius: 24px;
            }

            .zyco-radius__title {
              font-size: 32px;
            }

            .zyco-radius__subtitle {
              font-size: 16px;
            }

            .zyco-radius__grid {
              grid-template-columns: 1fr;
              gap: 14px;
            }

            .zyco-radius-card {
              min-height: 0;
              padding: 22px;
            }

            .zyco-radius-card__spec {
              display: grid;
              gap: 4px;
            }

            .zyco-radius-card__value {
              text-align: left;
              white-space: normal;
            }
          }
        `}
      </style>

      <main className='zyco-radius'>
        <section className='zyco-radius__shell'>
          <header className='zyco-radius__header'>
            <p className='zyco-radius__eyebrow'>
              Engineering Reference
            </p>

            <h1 className='zyco-radius__title'>
              Inside Radius Guide
            </h1>

            <p className='zyco-radius__subtitle'>
              Industrial reference for inside bend radius selection
            </p>
          </header>

          <div className='zyco-radius__grid'>
            {materials.map((material) => (
              <article
                className='zyco-radius-card'
                key={material.name}
              >
                <div>
                  <h2 className='zyco-radius-card__title'>
                    {material.name}
                  </h2>

                  <dl className='zyco-radius-card__specs'>
                    {fields.map(([label, key]) => (
                      <div
                        className='zyco-radius-card__spec'
                        key={label}
                      >
                        <dt className='zyco-radius-card__label'>
                          {label}
                        </dt>

                        <dd className='zyco-radius-card__value'>
                          {material[key]}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <p className='zyco-radius-card__note-label'>
                    Application Note
                  </p>

                  <p className='zyco-radius-card__note'>
                    {material.applicationNote}
                  </p>
                </div>

                <a
                  className='zyco-radius-card__action'
                  href={`/engineering-tools/press-brake-calculator?material=${material.materialKey}`}
                >
                  Calculate Bending Force {'\u2192'}
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
