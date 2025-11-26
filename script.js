// Get all input elements
const vialSizeInput = document.getElementById('vialSize');
const reconstitutionVolumeInput = document.getElementById('reconstitutionVolume');
const desiredDosageInput = document.getElementById('desiredDosage');
const dosageUnitSelect = document.getElementById('dosageUnit');

// Get all result elements
const unitsToInjectEl = document.getElementById('unitsToInject');
const concentrationEl = document.getElementById('concentration');
const concentrationHelperEl = document.getElementById('concentrationHelper');
const volumeToInjectEl = document.getElementById('volumeToInject');
const dosageDisplayEl = document.getElementById('dosageDisplay');

// Helper function to format numbers
function formatNumber(num, decimals = 1) {
    // Remove trailing zeros
    return parseFloat(num.toFixed(decimals)).toString();
}

// Helper function to animate number changes
function animateValue(element, start, end, duration = 300) {
    const startTime = performance.now();
    const isNumber = !element.textContent.includes('mg/ml') && 
                     !element.textContent.includes('ml') && 
                     !element.textContent.includes('mcg') &&
                     !element.textContent.includes('mg');
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeOut;
        
        if (isNumber) {
            element.textContent = formatNumber(current, 1);
        } else {
            // For text elements, just update directly
            return;
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = formatNumber(end, 1);
        }
    }
    
    if (isNumber) {
        requestAnimationFrame(update);
    }
}

// Calculation function
function calculate() {
    // Get input values
    const vialSize = parseFloat(vialSizeInput.value) || 0;
    const reconstitutionVolume = parseFloat(reconstitutionVolumeInput.value) || 0;
    const desiredDosage = parseFloat(desiredDosageInput.value) || 0;
    const dosageUnit = dosageUnitSelect.value;

    // Validate inputs
    if (vialSize <= 0 || reconstitutionVolume <= 0 || desiredDosage <= 0) {
        // Reset results if invalid
        unitsToInjectEl.textContent = '0';
        concentrationEl.textContent = '0 mg/ml';
        concentrationHelperEl.textContent = '(0 mcg per unit)';
        volumeToInjectEl.textContent = '0 ml';
        dosageDisplayEl.textContent = '0 ' + dosageUnit;
        return;
    }

    // Convert desired dosage to mcg if needed
    const desiredDosageMcg = dosageUnit === 'mg' ? desiredDosage * 1000 : desiredDosage;

    // Calculate concentration in mg/ml
    const concentrationMgMl = vialSize / reconstitutionVolume;
    
    // Calculate concentration in mcg/ml
    const concentrationMcgMl = concentrationMgMl * 1000;

    // Calculate volume to inject in ml
    // Volume (ml) = Desired Dosage (mcg) / Concentration (mcg/ml)
    const volumeToInject = desiredDosageMcg / concentrationMcgMl;

    // Calculate units to inject
    // On insulin syringe: 1 unit = 0.01 ml
    // Units = Volume (ml) / 0.01
    const unitsToInject = volumeToInject / 0.01;

    // Calculate mcg per unit
    // mcg per unit = Concentration (mcg/ml) * 0.01 ml
    const mcgPerUnit = concentrationMcgMl * 0.01;

    // Get previous values for animation
    const prevUnits = parseFloat(unitsToInjectEl.textContent) || 0;
    
    // Update results with smooth transitions
    animateValue(unitsToInjectEl, prevUnits, unitsToInject);
    concentrationEl.textContent = formatNumber(concentrationMgMl, 2) + ' mg/ml';
    concentrationHelperEl.textContent = `(${formatNumber(mcgPerUnit, 1)} mcg per unit)`;
    volumeToInjectEl.textContent = formatNumber(volumeToInject, 3) + ' ml';
    dosageDisplayEl.textContent = formatNumber(desiredDosage, 1) + ' ' + dosageUnit;
    
    // Add visual feedback
    unitsToInjectEl.parentElement.style.transform = 'scale(1.02)';
    setTimeout(() => {
        unitsToInjectEl.parentElement.style.transform = '';
    }, 200);
}

// Add event listeners
vialSizeInput.addEventListener('input', calculate);
reconstitutionVolumeInput.addEventListener('input', calculate);
desiredDosageInput.addEventListener('input', calculate);
dosageUnitSelect.addEventListener('change', calculate);

// Initial calculation
calculate();

