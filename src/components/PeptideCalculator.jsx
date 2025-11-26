import React, { useState, useEffect } from 'react'
import '../PeptideCalculator.css'

const PeptideCalculator = () => {
  const [vialSize, setVialSize] = useState(20)
  const [reconstitutionVolume, setReconstitutionVolume] = useState(2)
  const [desiredDosage, setDesiredDosage] = useState(500)
  const [dosageUnit, setDosageUnit] = useState('mcg')

  // Calculate concentration in mg/ml
  const concentrationMgMl = vialSize / reconstitutionVolume

  // Calculate concentration in mcg per unit (assuming 100 units per ml for insulin syringe)
  const unitsPerMl = 100
  const concentrationMcgPerUnit = (concentrationMgMl * 1000) / unitsPerMl

  // Convert desired dosage to mcg
  const desiredDosageMcg = dosageUnit === 'mcg' ? desiredDosage : desiredDosage * 1000

  // Calculate units to inject
  const unitsToInject = desiredDosageMcg / concentrationMcgPerUnit

  // Calculate volume to inject in ml
  const volumeToInject = unitsToInject / unitsPerMl

  return (
    <div className="calculator-wrapper">
      <div className="logo-background"></div>
      <div className="calculator-container">
        <div className="calculator-header">
          <div className="header-decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
            <div className="decoration-circle circle-3"></div>
            <div className="decoration-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
          <div className="header-logo-container">
            <div className="logo-glow"></div>
            <div className="logo-ring"></div>
            <img src="/logo.jpg" alt="Mama Mica Logo" className="header-logo" />
            <div className="logo-particles">
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
            </div>
          </div>
          <h1 className="calculator-title">
            <span className="title-text">Peptide Dosage Calculator</span>
            <span className="title-underline"></span>
          </h1>
          <p className="calculator-subtitle">Calculate the exact units to inject for your desired peptide dosage</p>
        </div>

      <div className="calculator-content">
        <div className="input-section">
          <div className="section-header">
            <div className="section-icon-wrapper">
              <img src="/logo.jpg" alt="Logo" className="section-icon" />
            </div>
            <h2>Input Values</h2>
          </div>

          <div className="input-group">
            <label htmlFor="vialSize">
              <span className="label-icon">💧</span>
              Vial Size (mg)
            </label>
            <input
              id="vialSize"
              type="number"
              value={vialSize}
              onChange={(e) => setVialSize(parseFloat(e.target.value) || 0)}
              min="0"
              step="0.1"
            />
            <span className="helper-text">Amount of peptide in the vial</span>
          </div>

          <div className="input-group">
            <label htmlFor="reconstitutionVolume">
              <span className="label-icon">💧</span>
              Reconstitution Volume (ml)
            </label>
            <input
              id="reconstitutionVolume"
              type="number"
              value={reconstitutionVolume}
              onChange={(e) => setReconstitutionVolume(parseFloat(e.target.value) || 0)}
              min="0"
              step="0.1"
            />
            <span className="helper-text">Amount of BAC water to add</span>
          </div>

          <div className="input-group">
            <label htmlFor="desiredDosage">
              <span className="label-icon">💉</span>
              Desired Dosage
            </label>
            <div className="dosage-input-wrapper">
              <input
                id="desiredDosage"
                type="number"
                value={desiredDosage}
                onChange={(e) => setDesiredDosage(parseFloat(e.target.value) || 0)}
                min="0"
                step="0.1"
              />
              <select
                value={dosageUnit}
                onChange={(e) => setDosageUnit(e.target.value)}
                className="unit-select"
              >
                <option value="mcg">mcg</option>
                <option value="mg">mg</option>
              </select>
            </div>
            <span className="helper-text">Your target dosage per injection</span>
          </div>
        </div>

        <div className="results-section">
          <div className="section-header">
            <div className="section-icon-wrapper">
              <img src="/logo.jpg" alt="Logo" className="section-icon" />
            </div>
            <h2>Results</h2>
          </div>

          <div className="result-card main-result">
            <div className="result-value">{unitsToInject.toFixed(1)}</div>
            <div className="result-label">Units to Inject</div>
            <div className="result-helper">on your insulin syringe</div>
          </div>

          <div className="result-card">
            <div className="result-value-small">{concentrationMgMl.toFixed(1)} mg/ml</div>
            <div className="result-label">Concentration</div>
            <div className="result-helper">({concentrationMcgPerUnit.toFixed(1)} mcg per unit)</div>
          </div>

          <div className="result-card">
            <div className="result-value-small">{volumeToInject.toFixed(3)} ml</div>
            <div className="result-label">Volume to Inject</div>
          </div>

          <div className="result-card">
            <div className="result-value-small">{desiredDosage} {dosageUnit}</div>
            <div className="result-label">Dosage</div>
          </div>
        </div>
      </div>
      <div className="footer-logo">
        <img src="/logo.jpg" alt="Mama Mica Logo" className="footer-logo-img" />
      </div>
    </div>
    </div>
  )
}

export default PeptideCalculator

