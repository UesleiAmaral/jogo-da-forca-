const url = 'http://127.0.0.1:5501';

export const db = async () => {
  const endpoint = `${url}/db.json`;
  const data = await fetch(endpoint);
  const palavras = data.json();

  return palavras;

};