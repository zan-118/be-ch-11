const { PrismaClient } = require("@prisma/client");
const { verifyPassword } = require('../utils/passwordHandler');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const { validateLoginPayload } = require('../validator/login/index');
const ClientError = require("../exceptions/ClientError");

async function LoginUserHandler(req, res) {
  const { Username, Password } = req.body;
  try {
    validateLoginPayload(req.body);
    const loginUser = await prisma.user.findUnique({ where: { Username } });

    const isValidPassword = await verifyPassword(Password, loginUser.Passwordassword);
    console.log(isValidPassword)

    const token = jwt.sign({
      id: loginUser.id,
      Username: loginUser.Username,
      Password: loginUser.Password,
      Biodata: loginUser.Biodata,
    },
    process.env.TOKEN,
    {
      expiresIn: "7d",
    });

    return res.status(200).json({
      auth: true,
      status: "authorized",
      token, 
    });
  } catch (error) {
    if (error instanceof ClientError) {
      return res.status(error.statusCode).json({
        status: 'fail',
        message: error.message,
      });
    }

    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Maaf, terjadi kegagalan pada server kami.',
    });
  }
}

module.exports = LoginUserHandler;