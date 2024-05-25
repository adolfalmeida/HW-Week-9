import prisma from "../db/db.js";
import bcrypt from "bcrypt";

class Users {
  static async getAll(req, res) {
    try {
      const { page } = req.query;
      const limit = 10;
      const skip = (page - 1) * limit;

      const data = await prisma.users.findMany({
        skip: skip,
        take: limit,
      });
      
      res.status(200).json({
        message: "Berhasil mengambil data",
        data: data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async register(req, res) {
    try {
      const { email, gender, password, role } = req.body;

      const hashPassword = bcrypt.hashSync(password, 10);

      if (!email || !gender || !password || !role)
        return res.status(400).json({
          message: "Invalid input",
        });

      const existingUser = await prisma.users.findFirst({
        where: {
          email: email,
        },
      });

      if (existingUser)
        return res.status(400).json({
          message: "Email is taken",
        });

      const registerUser = await prisma.users.create({
        data: {
          email: email,
          gender: gender,
          password: hashPassword,
          role: role,
        },
      });

      res.status(200).json({
        message: "Resgister berhasil",
        data: {
          registerUser,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    const data = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    if (!data || !bcrypt.compareSync(password, data.password))
      return res.status(400).json({
        message: "Invalid credentials",
      });

    res.status(200).json({
      message: "Login berhasil",
    });
  }

  static async put(req, res) {
    try {
      const { id } = req.params;
      const { email, gender, password, role } = req.body;

      if (!id)
        return res.status(404).json({
          message: "Data user tidak ditemukan",
        });

      if (!email || !gender || !password || !role) return res.status(400).json({
        message: "Invalid input"
      })

      const editUser = await prisma.users.update({
        where: {
          id: parseInt(id),
        },
        data: {
          email: email,
          gender: gender,
          password: password,
          role: role,
        },
      });

      res.status(200).json({
        message: "Berhasil update users",
        data: editUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id)
        return res.status(404).json({
          message: "Data user tidak ditemukan",
        });

      const deleteUser = await prisma.users.delete({
        where: {
          id: parseInt(id),
        },
      });

      res.status(200).json({
        message: "Delete user berhasil",
        deleteUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

export default Users;
