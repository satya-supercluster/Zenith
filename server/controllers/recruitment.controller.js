import Junior from "../models/recruitment.model.js"

const recruitController = async (req, res) => {
  try {
    const { name, email, scholarNo } = req.body;

    if (!name || !email || !scholarNo) {
      return res.status(400).json({
        success: false,
        error: "Name, email and scholar number are required fields",
      });
    }

    const existingJunior = await Junior.findOne({ email });
    if (existingJunior) {
      return res.status(400).json({
        success: false,
        error: "An application with this email already exists",
      });
    }

    const junior = await Junior.create(req.body);

    return res.status(200).json({
      success: true,
      data: junior,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    }

    console.error(`Error creating junior: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

export default recruitController;

