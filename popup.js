// On window load, populate the year and month dropdowns with defaults
window.onload = function () {
  const yearSelect = document.getElementById('year');
  const monthSelect = document.getElementById('month');
  const typeSelect = document.getElementById('type');

  populateYearDropdown(yearSelect);
  populateMonthDropdown(monthSelect);

  // Set default values
  yearSelect.value = '1990';
  monthSelect.value = '6';
  typeSelect.value = '1';
};

// Populate year dropdown (1950 to current year)
function populateYearDropdown(selectElement) {
  const startYear = 1950;
  const endYear = new Date().getFullYear();

  for (let i = endYear; i >= startYear; i--) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selectElement.appendChild(option);
  }
}

// Populate month dropdown (1 to 12)
function populateMonthDropdown(selectElement) {
  for (let i = 1; i <= 12; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selectElement.appendChild(option);
  }
}

// Calculate retirement when "计算" is clicked
document.getElementById('submit').addEventListener('click', function () {
  calculateRetirement();
});

// Reset form when "重置" is clicked
document.getElementById('reset').addEventListener('click', function () {
  resetForm();
});

// Main logic for calculating retirement age, retirement date, and delay months
function calculateRetirement() {
  const year = document.getElementById('year').value;
  const month = document.getElementById('month').value;
  const type = document.getElementById('type').value;

  if (!year || !month || !type) {
    alert('请选择所有字段');
    return;
  }

  let retirementAge, delayMonths;

  switch (type) {
    case '1': // 男职员
      retirementAge = year < 1965 ? 60 : 63;
      delayMonths = year > 1976 ? 36 : 0;
      break;
    case '2': // 女职员（55岁退休）
      retirementAge = year < 1970 ? 55 : 58;
      delayMonths = year > 1981 ? 36 : 0;
      break;
    case '3': // 女职员（50岁退休）
      retirementAge = year < 1975 ? 50 : 55;
      delayMonths = year > 1984 ? 60 : 0;
      break;
  }

  const retirementDate = calculateRetirementDate(year, month, retirementAge, delayMonths);

  // Update the DOM with calculated values
  document.getElementById('result').textContent = `${retirementAge} 岁`;
  document.getElementById('result_time').textContent = retirementDate;
  document.getElementById('result_month').textContent = `${delayMonths} 个月`;
}

// Calculate the exact retirement date based on the inputs
function calculateRetirementDate(year, month, retirementAge, delayMonths) {
  const date = new Date(year, month - 1); // Initialize date with year and month
  date.setFullYear(date.getFullYear() + retirementAge);
  date.setMonth(date.getMonth() + delayMonths);
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
}

// Reset form and results
function resetForm() {
  document.getElementById('year').value = '1990';
  document.getElementById('month').value = '6';
  document.getElementById('type').value = '1';
  document.getElementById('result').textContent = '---';
  document.getElementById('result_time').textContent = '---';
  document.getElementById('result_month').textContent = '---';
}