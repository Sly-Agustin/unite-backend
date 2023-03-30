import express from "express";

const router = express.Router();

router.get('/health', async (req, res) => {
  res.status(200).json({
    message: 'health route succesfully access'
  })
})

export default router