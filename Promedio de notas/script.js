document.addEventListener('DOMContentLoaded', function() {
    const agregarNotaBtn = document.getElementById('agregarNota');
    const calcularPromedioBtn = document.getElementById('calcularPromedio');
    const reiniciarCamposBtn = document.getElementById('reiniciarCampos');
    const notasContainer = document.getElementById('notasContainer');
    const resultadoDiv = document.getElementById('resultado');
  
    agregarNotaBtn.addEventListener('click', agregarCampoNota);
    calcularPromedioBtn.addEventListener('click', calcularNotaNecesaria);
    reiniciarCamposBtn.addEventListener('click', reiniciarCampos);
  
    function agregarCampoNota() {
      const index = document.querySelectorAll('.input-group').length;
      const newInputGroup = document.createElement('div');
      newInputGroup.className = 'input-group';
      newInputGroup.innerHTML = `
        <label for="nota-${index}">Nota:</label>
        <input type="number" id="nota-${index}" class="nota" step="0.01" required>
        <label for="porcentaje-${index}">Porcentaje:</label>
        <input type="number" id="porcentaje-${index}" class="porcentaje" step="0.01" required>
        <button type="button" class="eliminarNotaBtn">Eliminar</button>
      `;
      notasContainer.appendChild(newInputGroup);
      
      // Agregar evento de clic al botón de eliminar que acabamos de crear
      newInputGroup.querySelector('.eliminarNotaBtn').addEventListener('click', function() {
        newInputGroup.remove();
      });
    }
  
    function calcularNotaNecesaria() {
      const notas = document.querySelectorAll('.nota');
      const porcentajes = document.querySelectorAll('.porcentaje');
      let sumaNotasPorPorcentaje = 0;
      let sumaPorcentajes = 0;
  
      notas.forEach((nota, index) => {
        const valorNota = parseFloat(nota.value) || 0;
        const valorPorcentaje = parseFloat(porcentajes[index].value) || 0;
  
        sumaNotasPorPorcentaje += valorNota * valorPorcentaje;
        sumaPorcentajes += valorPorcentaje;
      });
  
      const promedioActual = sumaNotasPorPorcentaje / sumaPorcentajes;
      const porcentajeRestante = 100 - sumaPorcentajes;
      const notaNecesaria = (300 - sumaNotasPorPorcentaje) / porcentajeRestante;
  
      if (sumaPorcentajes < 100 && notaNecesaria <= 5 && notaNecesaria > 0) {
        resultadoDiv.textContent = `Tienes un ${promedioActual.toFixed(2)} en el ${sumaPorcentajes}%. Necesitas obtener ${notaNecesaria.toFixed(2)} en el ${porcentajeRestante.toFixed(2)}% restante para alcanzar un promedio minimo de 3`;
      } else if (sumaPorcentajes < 100 && notaNecesaria < 0) {
        resultadoDiv.textContent = 'Felicidades Coronaste la asignatura. Tu nota actual es: ' + promedioActual.toFixed(2);
      } else if (sumaPorcentajes < 100) {
        resultadoDiv.textContent = `Con el porcentaje actual, no es posible alcanzar un promedio minimo de 3. Toca pedir cacao (Cuadrar notas con el profe).`;
      } else if (sumaPorcentajes === 100 && promedioActual >= 3) {
        resultadoDiv.textContent = `¡Felicidades! Ya has alcanzado un promedio de ${promedioActual.toFixed(2)}.`;
      } else {
        resultadoDiv.textContent = 'Error: La suma de los porcentajes excede el 100%.';
      }
    }
  
    function reiniciarCampos() {
      notasContainer.innerHTML = '';
      resultadoDiv.textContent = '';
      agregarCampoNota(); // Agrega un conjunto inicial de campos de nota y porcentaje
    }
  
    agregarCampoNota(); // Inicializa el formulario con un conjunto de campos
  });
  