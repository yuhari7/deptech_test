import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        req.body
      );
      res.status(200).json(response.data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .json({ error: error.response?.data?.error || "Error logging in" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
