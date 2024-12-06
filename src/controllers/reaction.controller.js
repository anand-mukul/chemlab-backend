import { ApiError, ApiResponse, asyncHandler } from "../lib/utils.js";
import { Chemical } from "../models/chemical.model.js";
import { Reaction } from "../models/reaction.model.js";

// reactionController (POST /api/v1/reactions)
const reactionController = asyncHandler(async (req, res) => {
  const { chemicals } = req.body;

  if (!chemicals || !Array.isArray(chemicals)) {
    return res.status(400).json({ success: false, message: "Invalid input" });
  }

  try {
    const chemicalDocs = await Chemical.find({
      name: { $in: chemicals.map((chem) => chem.name) },
    });

    if (chemicalDocs.length !== chemicals.length) {
      return res.status(404).json({
        success: false,
        message: "One or more chemicals not found",
      });
    }

    // Match reaction by reactants and quantities
    const reaction = await Reaction.findOne({
      reactants: {
        $all: chemicals.map((chem) => ({
          $elemMatch: {
            name: chem.name,
            requiredQuantity: { $lte: chem.quantity },
          },
        })),
      },
    });

    if (reaction) {
      return res.json({
        success: true,
        message: "Reaction occurred",
        data: {
          products: reaction.products,
          equation: reaction.equation,
        },
      });
    }

    return res.json({
      success: false,
      message: "No reaction occurred",
      data: {},
    });
  } catch (error) {
    console.error("Error processing reaction:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

export { reactionController };
