
import { getAWG } from './awg'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <form id="form" action="">
    <label for="volts">Volts</label>
    <input type="text" name="volts" id="volts">

    <label for="volt-drop">Voltage drop</label>
    <input type="text" name="voltDrop" id="voltDrop">

    <label for="material">Material</label>
    <select name="material" id="material">
      <option value="1.68e-8">Copper</option>
      <option value="2.65e-8">Aluminim</option>
    </select>


    <label for="amps">Amps</label>
    <input type="text" name="amps" id="amps">

    <label for="length">Length</label>
    <input type="text" name="length" id="length">

    <button>Enter</button>
  </form>

  <p></p>
`
const form = document.getElementById("form") as HTMLFormElement


form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const formObject = { ...Object.fromEntries(formData.entries()) };

  const amps = parseFloat(formObject.amps as string);
  const length = parseFloat(formObject.length as string) * 0.3048;
  const volts = parseFloat(formObject.volts as string);
  const voltDrop = parseFloat(formObject.voltDrop as string) / 100;
  const resistivity = parseFloat(formObject.material as string);

  const voltageDrop = volts * voltDrop;
  const area_m2 = (2 * resistivity * length * amps) / voltageDrop;
  const area_mm2 = area_m2 * 1_000_000;
  const awg = getAWG(area_mm2);

  document.querySelector('p')!.textContent = `Recommended AWG: ${awg}`;
  console.log(`Area: ${area_mm2.toFixed(4)} mm²`);
  console.log(`Recommended AWG: ${awg}`);
});

