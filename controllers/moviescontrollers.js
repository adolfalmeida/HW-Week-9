import prisma from "../db/db.js";

class Movies {
  static async getAll(req, res) {
    try {
      const { page } = req.query;
      const limit = 10;
      const skip = (page - 1) * limit;

      const data = await prisma.movies.findMany({
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
      const { title, genres, year } = req.body;

      if (!title || !genres || !year)
        return res.status(400).json({
          message: "Invalid input",
        });

      const existingMovie = await prisma.movies.findFirst({
        where: {
          title: title,
        },
      });

      if (existingMovie)
        return res.status(400).json({
          message: "Movie already listed",
        });

      const registerMovie = await prisma.movies.create({
        data: {
          title: title,
          genres: genres,
          year: year,
        },
      });

      res.status(200).json({
        message: "Resgister berhasil",
        data: {
          registerMovie,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async put(req, res) {
    try {
      const { id } = req.params;
      const { title, genres, year } = req.body;

      if (!id)
        return res.status(404).json({
          message: "Data movie tidak ditemukan",
        });

      if (!title || !genres || !year)
        return res.status(400).json({
          message: "Invalid input",
        });

      const editMovie = await prisma.movies.update({
        where: {
          id: parseInt(id),
        },
        data: {
          title: title,
          genres: genres,
          year: year,
        },
      });

      res.status(200).json({
        message: "Berhasil update movie",
        data: editMovie,
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
          message: "Data movie tidak ditemukan",
        });

      const deleteMovie = await prisma.movies.delete({
        where: {
          id: parseInt(id),
        },
      });

      res.status(200).json({
        message: "Delete movie berhasil",
        deleteMovie,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

export default Movies;
