import { getProject } from '$utils/sanity.js'

export async function load({ params }) {
  const {handle} = params
  const project = await getProject({handle})

  if (project) {
    return {
      body: {
        project
      }
    }
  }
  return {
    status: 500,
    body: new Error("Internal Server Error")
  }
}