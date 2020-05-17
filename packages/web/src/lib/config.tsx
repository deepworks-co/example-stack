let env: string

const hostname = window?.location?.hostname
if (hostname === "www.example.com") {
  env = "production"
} else {
  env = "development"
}

export const environment = env

export const production = env === "production"

export const apiUrl = production
  ? "https://api.example.com/graphql"
  : "http://localhost:5000/graphql"

export const webUrl = production
  ? "https://www.example.com"
  : "http://localhost:3000"
