const url = 'https://uesleiamaral.github.io/jogo-da-forca-/db.json';

export const db = async () => {
  const endpoint = `${url}/db.json`;
  const data = await fetch(endpoint);
  const palavras = data.json();

  return palavras;

};
