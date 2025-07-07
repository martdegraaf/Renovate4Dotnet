# Project Title

A brief description of what this project does and who it's for.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Resources](#resources)


## Installation

I'm assuming that you have a Azure DevOps account and you have the rights to create a new repository.

### Prerequisites
- An Azure DevOps account with permissions to create repositories and pipelines.
- A GitHub account (optional, only if you want to create a changelog).

### Enable Renovate in your current repositories
For each repository in Azure DevOps where you want to enable Renovate, follow these steps:
- Navigate to the repository in Azure DevOps.
- Upload the file `renovate.json`  of Dotnet6/7/8 folder to the root of your repository.
- Commit the changes to the repository.


### Create a place for Renovate in Azure DevOps
- Create a new Azure Devops repository *Renovate* .
    - Copy the contents of [GlobalRenovateRepo](GlobalRenovateRepo) to the repo *Renovate*
- Create a new Azure Devops Personal Access Token (PAT):
    - Navigate to your Azure DevOps organization settings.
    - Go to "Personal Access Tokens" under "User settings".
    - Create a new PAT with the required scopes. For Renovate, you'll typically need:
        - Agent Pools (read): Allows Renovate to read agent pools.
        - Build (read & execute): Allows Renovate to read build pipelines and execute them.
        - Code (read & write): Allows Renovate to read and write to repositories.
        - Packaging (read & write): Allows Renovate to read and write to package feeds (if using private NuGet or other package feeds).
        - Project & Team (read): Allows Renovate to read project and team information.
        - Release (read): Allows Renovate to read release pipelines.
    - Save the generated PAT securely. You'll need it for the next step.
- Optional: Create a new Github Personal Access Token to create a changelog in the repository.
    - Navigate to your Github account settings.
    - Go to "Developer settings" > "Personal access tokens".
    - Create a new token with the `repo` scope.
    - Save the generated PAT securely. You'll need it for the next step.
- Create a new pipeline in Azure DevOps.
    - Use the *Renovate* repository as source.
    - Use the [renovate-pipeline.yml](GlobalRenovateRepo/renovate-pipeline.yml) pipeline as template.
    - Create the following variables in the pipeline:
        - `AZURE_DEVOPS_PAT`: The PAT you created for Azure DevOps.
        - `GITHUB_TOKEN`: The PAT you created for Github (optional, only if you want to create a changelog).
- Run the pipeline and enjoy the automated dependency updates!

## Usage

## Contributing

## License
- Contact

## Resources:
- Documentation Renovate: https://docs.renovatebot.com/
- Documentation Renovate Azure DevOps: https://docs.renovatebot.com/modules/platform/azure/
- Documentation Renovate Full Config Presets: https://docs.renovatebot.com/presets-config/
- Documentation Group Presets: https://docs.renovatebot.com/presets-group/
- Session about Renovate: https://www.youtube.com/watch?v=vhdTByXWvd8
- Slides session about Renovate: https://github.com/eriklieben/presentations/blob/main/2024-12-27-dotnet-amsterdam-renovate-azdevops/renovate-azdevops-dep-update.pdf