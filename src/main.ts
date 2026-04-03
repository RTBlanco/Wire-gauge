
import { getAWG } from './awg'

const form = document.getElementById("wire-form") as HTMLFormElement


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

  checkIfAllFilled(formData)

  const results = document.getElementById("result-section")

  if (results?.classList.contains('hidden')) {
    results?.classList.toggle('hidden')
  }

  displayRecommendation(awg)
  document.querySelector('p')!.textContent = `Recommended AWG: ${awg}`;
  console.log(`Area: ${area_mm2.toFixed(4)} mm²`);
  console.log(`Recommended AWG: ${awg}`);
});

// make it show whem entered
function checkIfAllFilled(form: FormData) {
  const formObject = { ...Object.fromEntries(form.entries()) }

  console.log(formObject)
}

function displayRecommendation(awg: number) {
  (document.getElementById('awg-number') as HTMLElement).innerText = `${awg}`
}

// design it like its ment for steves. shop 
// make it something he can move around his site