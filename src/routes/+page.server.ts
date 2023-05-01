import { getAllProjects } from '$utils/sanity'

export async function load() {
  const projects = await getAllProjects()

  if (projects) {
    return {
      body: {
        projects
      }
    }
  }
  return {
    status: 500,
    body: new Error("Internal Server Error")
  }
}