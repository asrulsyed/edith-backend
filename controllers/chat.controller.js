const axios = require("axios");
const EDITH_API_URL = process.env.EDITH_API_URL;

exports.generate = async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(prompt)
    const data = {
      prompt: prompt
    }
    axios.post(`${EDITH_API_URL}/chat`, data, {
      headers: {
        'Content-Type': 'application/json' // Specify the content type
      }
    })
      .then((response) => {
        res.status(200).send(response.data.response);
      })
  }
  catch {
    res.sendStatus(501);
  }
}