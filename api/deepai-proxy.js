export default async function handler(req, res) {
  const response = await fetch("https://api.deepai.org/api/text2img", {
    method: "POST",
    headers: {
      "api-key": "5e750f82-e4b6-41ee-a1e4-60161fdb07c5",
    },
    body: req,
  });

  const data = await response.json();
  res.status(200).json(data);
}