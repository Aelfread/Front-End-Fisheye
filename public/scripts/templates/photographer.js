export function photographerTemplate(data) {
  //const response = fetch("data/photographers.json");
  const { name, id, city, country, tagline, price, portrait } = data;
  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    img.setAttribute("aria-label", `Photographe: ${name}`);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const h3 = document.createElement("h3");
    h3.textContent = `${city}, ${country}`;
    const p = document.createElement("p");
    p.textContent = tagline;
    const p2 = document.createElement("p");
    p2.textContent = `${price}€/jour`;
    p2.setAttribute("class", "price");
    const a = document.createElement("a");
    a.setAttribute("href", `photographer.html?id=${id}`);
    a.appendChild(img);
    a.appendChild(h2);
    article.appendChild(a);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(p2);
    fetch(`http://localhost:5500/data/photographers.json/${name}`);
    return article;
  }
  return {
    name,
    id,
    city,
    country,
    tagline,
    price,
    picture,
    getUserCardDOM,
  };
}
