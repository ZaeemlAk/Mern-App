const { ZodError } = require("zod");

const validate = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.parseAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(422).json({
        message: "Validation failed",
        extraDetails: err.issues[0].message,
      });
    }

    return res.status(500).json({
      message: "Internal Server Error",
      extraDetails: err.message,
    });
  }
};

module.exports = validate;
