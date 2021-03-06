const recordController = require("../../record")

module.exports = async function saveRecord({ args, context }) {
  const { model, ...record } = args.record

  const ctx = {
    params: {
      instanceId: context.instanceId,
      modelId: model._id,
    },
    request: {
      body: record,
    },
    user: { instanceId: context.instanceId },
  }

  await recordController.save(ctx)

  try {
    return {
      record: ctx.body,
    }
  } catch (err) {
    console.error(err)
    return {
      record: null,
      error: err.message,
    }
  }
}
