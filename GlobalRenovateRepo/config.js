module.exports = {
  platform: "azure",
  endpoint: "$(System.CollectionUri)", //https://dev.azure.com/[Organization]/
  onboarding: true,
  onboardingConfig: {
    extends: ["config:best-practices"],
    azureWorkItemId: 47,
  },
  requireConfig: "optional",
  autodiscover: true,
  autodiscoverFilter: ["AutoDependencyUpdate/*"],
  token: process.env.AZURE_DEVOPS_PAT, // Personal Access Token for Azure DevOps
  extends: [
    "config:best-practices",
  ],
  hostRules: [
    {
        "hostType": "azure",
        "matchHost": "dev.azure.com",
        "token": process.env.AZURE_DEVOPS_PAT // Personal Access Token for Azure DevOps,
    },
    {
        "matchHost": "pkgs.dev.azure.com",
        "token": process.env.AZURE_DEVOPS_PAT // Personal Access Token for Azure DevOps,
    },
  ],
  timezone: "Europe/Amsterdam",
  packageRules: [
    {
      "groupName": "Azure SDK Libraries",
      "matchPackageNames": ["^Azure\\.", "^Microsoft\\.Azure\\."],
    },
    {
      "groupName": ".NET Core Libraries",
      "matchPackageNames": ["^System\\.", "^Microsoft\\.Extensions\\."],
    },
    {
      "groupName": "Testing Libraries",
      "matchPackageNames": ["xunit", "FluentAssertions", "Moq"],
    },
    {
      "groupName": "Azure Functions Libraries",
      "matchPackageNames": [
        "Microsoft.Azure.WebJobs",
        "Microsoft.NET.Sdk.Functions",
        "Microsoft.Azure.WebJobs.Extensions", 
      ],
    },
    {
      "matchPackageNames": ["Microsoft.Resources", "Microsoft.Storage"],
      "allowedVersions": ">=2025-01-01",
    },
  ],
};