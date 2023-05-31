const url = 'https://jogo-da-forca-gules-ten.vercel.app';

export const db = async () => {
  const endpoint = `${url}/db.json`;
  const data = await fetch(endpoint, { mode: 'cors',
  headers: {
    'Access-Control-Allow-Origin':'*'
  }}
);
  const palavras = data.json();

  return palavras;

};
