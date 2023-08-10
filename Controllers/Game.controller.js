const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createRoom = async (req, res) => {
  const { Name, Description, thumbnail_url, Game_url, play_count } = req.body;

  try {
    const room = await prisma.game.create({
      data: {
        Name,
        Description,
        thumbnail_url,
        Game_url,
        play_count,
      },
    });

    if (!room) {
      return res.status(401).json({
        message: "cannot be empty",
      });
    }
    return res.status(202).json({
      message: "success create room ",
      data: room,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

async function getRooms(req, res, next) {
  try {
    const rooms = await prisma.game.findMany();
    if (!rooms) {
      return res.status(400).json({
        result: "error",
        message: "Tidak ada rooms",
      });
    }
    return res.status(200).json({
      result: "Success",
      rooms,
    });
  } catch (error) {
    return next(error);
  }
}
async function getRoomById(req, res, next) {
  const { id } = req.params;
  try {
    const games = await prisma.game.findUnique({
      where: { id },
    });
    if (!games) {
      return res.status(400).json({
        result: "room not found!",
      });
    }
    return res
      .status(200)
      .json({ message: "success get room by id", data: games });
  } catch (error) {
    return next(error);
  }
}

const updateScore = async (req, res) => {
  const { id } = req.params;
  try {
    const getData = await prisma.game.findUnique({
      where: {
        id,
      },
    });
    // eslint-disable-next-line no-plusplus
    const visitedRoom = ++getData.play_count;
    const data = await prisma.game.update({
      where: {
        id,
      },
      data: {
        play_count: visitedRoom,
      },
    });
    res
      .status(200)
      .json({ msg: "success update rooms !", data: data.play_count });
  } catch (error) {
    console.log(error.message);
  }
};

// const bulkCreateGames = () => {
//   try {
//   } catch (error) {}
// };

// const deleteAllGames = async (req, res) => {
//   try {
//     const deletAll = await prisma.game.deleteMany({});
//     res.status(200).json({ msg: "sucess delete all" });
//   } catch (error) {
//     console.log(error);
//   }
// };
// const bulkCreate = async (req, res) => {
//   try {
//     const create = await prisma.game.createMany({});
//     res.status(200).json({ msg: "data created 10" });
//   } catch (error) {
//     console.log(error);
//   }
// };
module.exports = {
  createRoom,
  getRooms,
  getRoomById,
  updateScore,
};
