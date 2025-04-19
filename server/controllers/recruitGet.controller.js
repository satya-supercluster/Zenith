import Junior from "../models/recruitment.model.js";

const recruitGetController = async (req, res) => {
  try {
    const {it} = req.query;
    if(it!==process.env.IT){
      return res.status(500).json({
        success: false,
        error: "Auth Error",
      });
    }
    const junior = await Junior.find();

    return res.status(200).json({
      success: true,
      data: junior,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

export default recruitGetController;
