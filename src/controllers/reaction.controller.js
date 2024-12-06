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
    // Fetch all input chemicals from the database
    const chemicalDocs = await Chemical.find({
      name: { $in: chemicals.map((chem) => chem.name) },
    });

    if (chemicalDocs.length !== chemicals.length) {
      return res.json(
        new ApiResponse(404, {}, "One or more chemicals not found")
      );
    }

    // Check if a reaction exists for the given chemicals
    const reaction = await Reaction.findOne({
      reactants: { $all: chemicalDocs.map((chem) => chem.name) },
    });

    if (reaction) {
      return res.json(
        new ApiResponse(200, "Reaction occurred", {
          newColor: reaction.products[0]?.color || "unknown",
          products: reaction.products,
          equation: reaction.equation,
        })
      );
    } else {
      return res.json(new ApiResponse(200, {}, "No reaction occurred"));
    }
  } catch (error) {
    console.error("Error processing reaction:", error);
    throw new ApiError(500, error?.message || "Error processing reaction");
  }
});

export { reactionController }
