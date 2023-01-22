import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hellow from dalle" });
});

router.route("/").post(async (res, req) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      response_format: "b64_json",
      size: "1024x1024",
    });

    const image = aiResponse.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (err) {
    console.log(err);
    res.status(500).send(err?.response.data.err.message);
  }
});

export default router;
