import { ApiError, ApiResponse, asyncHandler } from "../lib/utils.js";
import { Workspace } from "../models/workspace.model.js";

const saveWorkspace = asyncHandler(async (req, res) => {
  const { workspace } = req.body;
  // Simulate saving logic (e.g., save to database)
  setTimeout(() => {
    res.json(200, { message: "Workspace saved successfully!" });
  }, 1000);
});

const workspaceName = asyncHandler(async (req, res) => {
  const { id, name } = req.body;

  try {
    const workspace = await Workspace.findOneAndUpdate(
      { id },
      { name },
      { upsert: true, new: true }
    );
    res.json(new ApiResponse(200, workspace, "Workspace name saved"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Error saving workspace name");
  }
});

const fetchWorkspaceName = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const workspace = await Workspace.findOne({ id });
    if (!workspace)
      return res.status(404).json({ error: "Workspace not found" });

    res.json(new ApiResponse(200, workspace, "Workspace name fetched"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Error fetching workspace name");
  }
});

export { saveWorkspace, workspaceName, fetchWorkspaceName };
