const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const forgotPassword = async (req, res) => {
  // if user not registered , it cannot reset password
  const { email } = req.body;
  const findEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!findEmail) { return res.status(401).json({ message: 'email is not registered' }); }

  // if success send the reset link into email
  // the link in frontend , and
  // if email se d tokon in gmp
  //   send link undangan
};
