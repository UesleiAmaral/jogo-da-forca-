const url = 'https://jogo-da-forca-gules-ten.vercel.app/db.json';

export const db = async () => {
  const endpoint = `${url}/db.json`;
  const data = await fetch(endpoint);
  const palavras = data.json();

  return palavras;

};
