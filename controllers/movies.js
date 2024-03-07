const { Movie } = require("../models/movie");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAllMovies = async (req, res) => {
  const { _id: owner } = req.user;

  console.log(owner);

  const result = await Movie.find(owner);
  res.json(result);
};

const addMovie = async (req, res) => {
  const { _id: owner } = req.user;

  console.log(owner);

  const result = await Movie.create({ ...req.body, owner });
  res.status(201).json(result);
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Movie.getById(id);

    if (!result) {
      throw HttpError(404, `Book with ${id} not found`);
      // res.status(404).json({ message: ` Book with ${id} not found` });
    }
    res.json(result);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await books.updateById(id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await books.deleteById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  // res.status(204).send()
  res.json({
    message: "Delete success",
  });
};

module.exports = {
  getAllMovies: ctrlWrapper(getAllMovies),
  getMovieById: ctrlWrapper(getMovieById),
  addMovie: ctrlWrapper(addMovie),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};

// _______________________________________

// const get = async (req, res) => {
//   const { user: { _id: userId } = {}, query } = req;

//   const {
//     page = 1,
//     limit = 12,
//     category,
//     title,
//     age,
//     own,
//     favorite,
//     ...filter
//   } = query;
//   const skip = (page - 1) * limit;

//   const isOwn = category === 'own' || own;
//   const isFavorite = category === 'favorite' || favorite;

//   if (isFavorite !== undefined) {
//     if (!userId) {
//       throw new HttpError(401);
//     }

//     filter.favorites = isFavorite ? userId : { $ne: userId };
//   }

//   if (isOwn !== undefined) {
//     if (!userId) {
//       throw new HttpError(401);
//     }

//     filter.owner = isOwn ? userId : { $ne: userId };
//   }

//   if (NOTICE_CATEGORIES_LIST.includes(category)) {
//     filter.category = category;
//   }

//   if (title) {
//     filter.title = { $regex: title, $options: 'i' };
//   }

//   if (age?.length > 0) {
//     const ageFilter = age.map(ageOption => {
//       const dateFrom = subDate(new Date(), { years: ageOption + 1 });
//       const dateUntil = subDate(new Date(), { years: ageOption });

//       return ageOption <= 1
//         ? { birthday: { $gte: dateFrom, $lt: dateUntil } }
//         : { birthday: { $lt: dateUntil } };
//     });

//     filter.$or = ageFilter;
//   }
// }

// _______________________________________
