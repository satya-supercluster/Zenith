import Junior from "../models/recruitment.model.js";

const recruitGetController = async (req, res) => {
  try {
    const junior = await Junior.find();

    return res.status(200).json({
      success: true,
      data: junior,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

export default recruitGetController;
