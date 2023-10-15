import { helpers, v1 } from '@google-cloud/aiplatform'

export const aiPrompt = async (prompt: string) => {
  const aiParams = {
    projectId: process.env.GOOGLE_PROJECT_ID,
    key: process.env.GOOGLE_APP_KEY,
    apiEndpoint: process.env.GOOGLE_API_ENDPOINT,
    model: process.env.GOOGLE_MODEL,
    location: process.env.GOOGLE_LOCATION
  }

  const { projectId, key, apiEndpoint, model, location } = aiParams

  const { PredictionServiceClient } = v1

  const predictionServiceClient = new PredictionServiceClient({
    apiEndpoint,
    projectId,
    key
  })

  const endpoint = `projects/${projectId}/locations/${location}/publishers/google/models/${model}`

  const instanceValue = helpers.toValue({
    prompt
  })

  if (!instanceValue) return { status: false }

  const instances = [instanceValue]

  const parameter = {
    temperature: 0.2,
    maxOutputTokens: 256,
    topP: 0.95,
    topK: 40
  }
  const parameters = helpers.toValue(parameter)

  const response = await predictionServiceClient.predict({
    endpoint,
    instances,
    parameters
  })

  return response
}
