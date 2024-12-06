import { ApiError, ApiResponse, asyncHandler } from "../lib/utils.js";
import { Chemical } from "../models/chemical.model.js";
import { Instrument } from "../models/instrument.model.js";
import { Reaction } from "../models/reaction.model.js";

// Fetch all chemicals (GET /api/chemicals)
const fetchChemicals = asyncHandler(async (req, res) => {
  try {
    const chemicals = await Chemical.find();
    return res
      .status(200)
      .json(new ApiResponse(200, chemicals, "Chemicals fetched successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Error fetching chemicals");
  }
});

// Fetch all instruments (GET /api/instruments)
const fetchInstruments = asyncHandler(async (req, res) => {
  try {
    const instruments = await Instrument.find();
    return res
      .status(200)
      .json(
        new ApiResponse(200, instruments, "Instruments fetched successfully")
      );
  } catch (error) {
    throw new ApiError(500, error?.message || "Error fetching instruments");
  }
});

// Add chemical to instrument (POST /api/instruments/:id/add-chemical)
const addChemicalToInstrument = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { chemicalId } = req.body;
    const instrument = await Instrument.findById(id);
    if (!instrument) throw new ApiError(404, "Instrument not found");

    const chemical = await Chemical.findById(chemicalId);
    if (!chemical) throw new ApiError(404, "Chemical not found");

    instrument.chemicals.push(chemicalId);
    await instrument.save();
    res.json(
      new ApiResponse(
        200,
        instrument,
        "Chemical added to instrument successfully"
      )
    );
  } catch (error) {
    throw new ApiError(
      500,
      error?.message || "Error adding chemical to instrument"
    );
  }
});

// Simulate reaction (POST /api/reaction)
const simulateReaction = asyncHandler(async (req, res) => {
  try {
    const { reactants } = req.body; // Example: ['C2', 'H2']
    const reaction = await Reaction.findOne({ reactants });
    if (reaction) {
      res.json(
        new ApiResponse(200, "Reaction simulated successfully", {
          products: reaction.products,
        })
      );
    } else {
      res.json(new ApiResponse(400, {}, "Reaction not possible"));
    }
  } catch (error) {
    throw new ApiError(500, error?.message || "Error simulating reaction");
  }
});


// Save workspace (POST /api/save-workspace)
const saveWorkspace = asyncHandler(async (req, res) => {
  const { workspace } = req.body;
  // Simulate saving logic (e.g., save to database)
  setTimeout(() => {
    res.json(200, { message: "Workspace saved successfully!" });
  }, 1000);
})

export {
  fetchChemicals,
  fetchInstruments,
  addChemicalToInstrument,
  simulateReaction,
  saveWorkspace
};
