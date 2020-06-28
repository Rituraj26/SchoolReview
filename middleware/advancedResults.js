const advancedResults = (model, populateObjArg) => async (req, res, next) => {
    let query;

    let reqQuery = { ...req.query };

    // console.log(populateObjArg);

    // Fields to exclude so that it doesnot try to match DB model
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Delete the removeFields from query
    removeFields.forEach((param) => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);

    // Replace gt with $gt
    queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`
    );

    // Mongoose queries
    query = model.find(JSON.parse(queryStr)).populate(populateObjArg);

    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 1;
    const startInd = (page - 1) * limit;
    const endInd = page * limit;
    const total = await model.countDocuments();

    const pagination = {};

    if (startInd > 0) {
        pagination.prev = {
            page: page - 1,
            limit,
        };
    }
    if (endInd < total) {
        pagination.next = {
            page: page + 1,
            limit,
        };
    }

    // Skip will skip n documents from the arg
    query = query.skip(startInd).limit(limit);

    const school = await query;

    res.advancedResults = {
        success: true,
        count: school.length,
        pagination,
        data: school,
    };

    next();
};

module.exports = advancedResults;
