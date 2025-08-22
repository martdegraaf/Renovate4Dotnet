# Renovate4Dotnet

A quickstart guide to set up Renovate for automated dependency updates in Azure DevOps repositories.

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

### Start Locally

Set up your local environment to run Renovate. You can use Node.js to run Renovate locally.
```cli
$env:AZURE_DEVOPS_ORGANIZATION="htts://dev.azure.com/your-azure-devops-organization"
$env:AZURE_DEVOPS_PROJECT="your-azure-devops-project"
$env:AZURE_DEVOPS_PAT="token"
```

Get a token using az cli
```cli
$pat=$(az devops personal-access-token create --name "Renovate PAT" --organization $env:AZURE_DEVOPS_ORGANIZATION --scopes "vso.code_write vso.code_manage vso.build_execute vso.packaging_write vso.release_manage" --output tsv --query "patToken")
$env:AZURE_DEVOPS_PAT=$pat
```

Start a dry run of Renovate to see if everything is set up correctly. This will not make any changes to your repositories but will show you what Renovate would do.
```cli
npx renovate --dry-run
```

Trigger the log level using these environment variables:
```cli
$env:LOGLEVEL=debug
$env:LOGLEVEL=info
```


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
- [Session about Renovate on YouTube](https://www.youtube.com/watch?v=vhdTByXWvd8)
- Slides session about Renovate: https://github.com/eriklieben/presentations/blob/main/2024-12-27-dotnet-amsterdam-renovate-azdevops/renovate-azdevops-dep-update.pdf