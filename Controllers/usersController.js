const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { hashPassword } = require('../utils/passwordHandler');
const ClientError = require('../exceptions/ClientError');
const autoBind = require('auto-bind');
const { validateUserPayload } = require('../validator/users');

class UserController {
  constructor() {
    autoBind(this)
  }
  
  static async postUsersHandler(req, res) {
    const {
      Username, Password, Email, Total_score, Biodata, City
    } = req.body;
    try {
      validateUserPayload(req.body)
      const hashedPassword = await hashPassword(Password);
      console.log(hashedPassword);

      const newUser = await prisma.user.create({
        data: {
          Username,
          Password: hashedPassword,
          Email,
          Total_score,
          Biodata,
          City,
        }
      });

      return res.status(200).json({
        message: 'Success create data!',
        data: newUser,
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

  static async getAllUsersHandler(req, res) {
    const users = await prisma.user.findMany();

    return res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  }

  static async getUserByIdHandler(req, res) {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });

      return res.status(200).json({
        meesage: 'success',
        data: user,
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

  static async putUserHandler(req, res) {
    const { id } = req.params;
    const {
      Username, Password, Email, Total_score, Biodata, City,
    } = req.body;
    try {
      const updateUser = await prisma.user.update({
        where: { id },
        data: {
          Username,
          Password,
          Email,
          Total_score,
          Biodata,
          City,
        },
      });

      return res.status(200).json({
        status: 'success',
        data: {
          user: updateUser,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
    }
  }

  static async deleteUserHandler(req, res) {
    const { id } = req.params;
    await prisma.user.findByPk(id);
    try {
      await prisma.user.delete({
        where: { id },
      });

      return res.status(200).json({
        message: 'success',
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
}

module.exports = UserController;
