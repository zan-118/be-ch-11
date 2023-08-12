const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const postHistory = async (req, res) => {
  const { user_id, result_game, recent_game, recent_score } = req.body;

  try {
    const create = await prisma.historyGame.create({
      data: {
        user_id,
        result_game,
        recent_game,
        recent_score,
      },
    });
    if (!create) {
      return res.status(400).json({
        meta: {
          code: "400_002",
          message: "failed create data",
        },
      });
    }
    return res.status(200).json({
      meta: {
        code: "200_002",
        message: "success create data",
      },
      data: create,
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        code: "500_002",
        message: error.message,
      },
    });
  }
};

const getHistory = async (req, res) => {
  const { user_id } = req.params;
  if (!user_id) {
    return res
      .status(200)
      .json({ message: "play the game to make history", data: [] });
  }
  try {
    const history = await prisma.historyGame.findMany({
      where: {
        user_id,
      },
    });
    if (!history || history.length === 0) {
      return res.status(404).json({
        meta: {
          code: "404_001",
          message: "user history not found",
        },
      });
    }
    return res.status(200).json({
      meta: {
        code: "200_003",
        message: "success get data history id",
      },
      data: history,
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        code: "500_002",
        message: error.message,
      },
    });
  }
};

module.exports = {
  postHistory,
  getHistory,
};
