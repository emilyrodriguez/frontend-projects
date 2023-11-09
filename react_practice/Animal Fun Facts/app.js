import { animals } from './animals';
import { React } from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById("app");

const root = createRoot(container);
const title = '';
const showBackground = true;
const background = showBackground && (
  <img
    className='background'
    alt='ocean'
    src='/images/ocean.jpg'
  />);

const images = [];
for (const animal in animals) {
  images.push(<img
    key={animal}
    className="animal"
    alt={animal}
    src={animals[animal].image}
    aria-label={animal}
    role="button"
    onClick = {displayFact}
  />)
};

const animalFacts = (
  <div>
    { background }
    <div className="animals">
    {images}
    </div>
    <h1>{title || "Click an animal for a fun fact"}</h1>
    <p id='fact'></p>
  </div>
);

function displayFact(e) {
  const selectedAnimal = animals[e.target.alt];
  const index = Math.floor(Math.random() * selectedAnimal.facts.length);
  const fact = selectedAnimal.facts[index];
  document.getElementById('fact').innerHTML = fact;
}

root.render(animalFacts);
