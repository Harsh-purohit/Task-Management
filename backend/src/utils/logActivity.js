import ActivityLog from "../models/ActivityLog.js";

export const logActivity = async ({
  actorId,
  actorModel,
  role,
  action,
  entity,
  entityId,
  message,
  metadata = {},
}) => {
  try {
    await ActivityLog.create({
      actor: actorId,
      actorModel,
      role,
      action,
      entity,
      entityId,
      message,
      metadata,
    });
  } catch (err) {
    console.error("Log failed:", err);
  }
};
