---
date: "1"

---


![](imgs/fleekcli.png)

## Fleek's API GraphQL Schema

We will be exposing a GraphQL Playground in the near future, but in the meantime, here is an excerpt of the schema and available queries and mutation:

```graphql
type Query {
	getSiteById(siteId: ID!): Site
  getSiteBySlug(slug: String!): Site

	""" Query paginated list of deploys performed on a site """
  getDeploysBySite(siteId: ID!, limit: Int, nextToken: String): DeployConnection

	""" Query a paginated list of sites in the team """
	getSitesByTeam(teamId: ID!, limit: Int, nextToken: String): SiteConnection

}

type Mutation {
  """
	Trigger a deploy on the site
	"""
  triggerDeploy(siteId: ID!, commit: String): Deploy
	"""
	Retry a previous deployment
	"""
  retryDeploy(siteId: ID!, deployId: ID!): Deploy
}

type SiteConnection {
  sites: [Site!]!
  nextToken: String
}

type Site {
  id: ID!
  createdBy: ID!
  createdAt: DateTime!
  updatedAt: DateTime

  teamId: ID!
  team: Team!
  name: String!
  description: String
  # same as name
  slug: String!
  platform: SitePlatform

  buildSettings: BuildSettings!
  deploySettings: DeploySettings!
  """ Last deploy that was/is currently published as the site """
  publishedDeploy: Deploy
  """ Last deployment trigger for the site """
  latestDeploy: Deploy
  dfinityCanisterId: String
}

enum RepositoryType {
  GITHUB
}

""" Platform a site is configured to be deployed to. """
enum SitePlatform {
  ipfs
  dfinity
}

type Repository {
  type: RepositoryType!
  url: String!
  branch: String!
}

type IpfsSource {
  cid: String
}

union SiteSource = Repository | IpfsSource

type DeploySettings {
  autoPublishing: Boolean!
  prDeployPreviews: Boolean!
  dfinityUseProxy: Boolean
  source: SiteSource!
}

type EnvironmentVariable {
  name: String!
  value: String
}

type BuildSettings {
  buildCommand: String
  baseDirectoryPath: String
  publishDirectoryPath: String
  dockerImage: String

  "Defaults to [] if empty"
  environmentVariables: [EnvironmentVariable!]!
}

type Team {
  id: ID!
  name: String!
}

type DeployRepository {
  commit: String
  branch: String
  owner: String
  name: String
  message: String
}

type DeployConnection {
  deploys: [Deploy!]!
  nextToken: String
}

type Deploy {
  id: ID!
  startedAt: DateTime
  completedAt: DateTime
  status: DeployStatus!
  ipfsHash: String
  """ url to preview image after a successful deploy """
  previewImage: String
  """ total duration all steps in ms """
  totalTime: Int
  log: String
  published: Boolean!
  """ copy of repository at the time of deploy """
  repository: DeployRepository!
  autoPublish: Boolean!
}

enum DeployStatus {
  IN_PROGRESS
  DEPLOYED
  FAILED
  CANCELLED
}
```