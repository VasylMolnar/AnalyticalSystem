let currentGroup = 0;
let currentK = 0;

const weights = {
  G1: [0.1, 0.2, 0.3, 0.4],
  G2: [0.2, 0.3, 0.1, 0.4],
  G3: [0.4, 0.1, 0.3, 0.2],
};

const addTr = () => {
  currentGroup++;
  currentK = currentK += 1;

  const table = document.getElementById('criteriaTable');
  const newRow = document.createElement('tr');

  newRow.innerHTML = `
        <td  class='rowSpan'>G${currentGroup}</td>
        <td>K${currentK}</td>
        <td><input type="number" name="G${currentGroup}_K${currentK}_C2"></td>
        <td><input type="number" name="G${currentGroup}_K${currentK}_C3"></td>
        <td><input type="number" name="G${currentGroup}_K${currentK}_C11"></td>
        <td><input type="number" name="G${currentGroup}_K${currentK}_C1209"></td>
    `;
  table.appendChild(newRow);
};

const addTd = () => {
  currentK++;

  const table = document.getElementById('criteriaTable');
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
          <td></td>
          <td>K${currentK}</td>
          <td><input type="number" name="G${currentGroup}_K${currentK}_C2"></td>
          <td><input type="number" name="G${currentGroup}_K${currentK}_C3"></td>
          <td><input type="number" name="G${currentGroup}_K${currentK}_C11"></td>
          <td><input type="number" name="G${currentGroup}_K${currentK}_C1209"></td>
      `;
  table.appendChild(newRow);
};

const getWeightsForGroup = group => {
  return weights[group] || [];
};

const calculateLambdaForGroup = (values, weights) => {
  let lambda = 0;

  for (let i = 0; i < values.length; i++) {
    lambda += values[i] * weights[i];
  }

  return lambda;
};

const calculateMuForGroup = (lambda, ci) => {
  if (lambda < 12) {
    return 1 / 2 + (1 / 2) * Math.cos(((lambda - 12) / 108) * Math.PI);
  } else if (lambda >= 12 && lambda <= 120) {
    return lambda;
  } else {
    return 0;
  }
};

const calculateMu2ForGroup = (lambda, ci) => {
  if (lambda < 12) {
    return 1 / 3 + (1 / 3) * Math.cos(((lambda - 12) / 108) * Math.PI);
  } else if (lambda >= 12 && lambda <= 120) {
    return lambda;
  } else {
    return 0;
  }
};

const calculateMu3ForGroup = (O31, ci) => {
  if (O31 <= 0) {
    return 0;
  } else if (O31 > 0 && O31 <= 15) {
    return Math.pow(O31, 2) / 450;
  } else if (O31 > 15 && O31 < 30) {
    return 1 - Math.pow(30 - O31, 2) / 450;
  } else {
    return 1;
  }
};

const calculateO31 = values => {
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
};

const createFuzzyTable = lambdas => {
  let u = 1;
  const table = document.getElementById('fuzzyTable');
  table.innerHTML = '';
  table.innerHTML = `
                    <tr>
                    <th>Група критеріїв</th>
                    <th>C2</th>
                    <th>C3</th>
                    <th>C11</th>
                    <th>C1209</th>
                    </tr>
        `;

  for (const group in lambdas) {
    const criteria = lambdas[group];

    for (const key in criteria) {
      const mu = criteria[key];
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
                              <td>${group}</td>
                              <td>${mu[0]}</td>
                              <td>${mu[1]}</td>
                              <td>${mu[2]}</td>
                              <td>${mu[3]}</td>
                            `;
      table.appendChild(newRow);
      u++;
    }
  }
};

const formHandler = e => {
  e.preventDefault();

  const groups = {};

  const formData = new FormData(e.target);
  const entries = formData.entries();

  for (const [key, value] of entries) {
    const [group, criterion] = key.split('_');

    if ((!group, !criterion)) return;

    if (!groups[group]) {
      groups[group] = {
        [criterion]: [value],
      };
    } else {
      if (!groups[group][criterion]) {
        groups[group] = {
          ...groups[group],
          [criterion]: [value],
        };
      } else {
        groups[group][criterion] = [...groups[group][criterion], value];
      }
    }
  }

  const lambdas = {};

  for (const group in groups) {
    if (groups.hasOwnProperty(group)) {
      const criteria = groups[group];
      lambdas[group] = {};

      for (const criterion in criteria) {
        if (criteria.hasOwnProperty(criterion)) {
          const values = criteria[criterion].map(Number);
          const weights = getWeightsForGroup(group);
          const lambda = calculateLambdaForGroup(values, weights);
          //   const mu = calculateMuForGroup(lambda, values.length);

          let mu1;
          let mu2;
          let mu3;
          let mu4;

          if (group === 'G2') {
            mu1 = calculateMu2ForGroup(lambda + 2, values.length + 11);
            mu2 = calculateMu2ForGroup(lambda + 3, values.length + 23);
            mu3 = calculateMu2ForGroup(lambda + 0.4, values.length + 3);
            mu4 = calculateMu2ForGroup(lambda + 3.2, values.length + 39);
          } else if (group === 'G3') {
            const O31 = calculateO31(values);
            mu1 = calculateMu3ForGroup(O31 + 1, values.length + 1);
            mu2 = calculateMu3ForGroup(O31 + 2, values.length + 41);
            mu3 = calculateMu3ForGroup(O31 + 3, values.length + 2);
            mu4 = calculateMu3ForGroup(O31 + 4, values.length + 24);
          } else {
            mu1 = calculateMuForGroup(lambda + 0.2, values.length + 12);
            mu2 = calculateMuForGroup(lambda + 3, values.length + 2);
            mu3 = calculateMuForGroup(lambda + 12, values.length + 3);
            mu4 = calculateMuForGroup(lambda + 2, values.length + 23);
          }

          lambdas[group][criterion] = [mu1, mu2, mu3, mu4];
        }
      }
    }
  }

  createFuzzyTable(lambdas);
};

export { addTr, addTd, formHandler };
