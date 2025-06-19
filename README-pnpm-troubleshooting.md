# PNPM Troubleshooting Guide

## Common Issues

### ERR_PNPM_MISSING_HOISTED_LOCATIONS

If you encounter an error like:

```
ERR_PNPM_MISSING_HOISTED_LOCATIONS  /@babel/helper-string-parser/7.27.1 is not found in hoistedLocations inside node_modules/.modules.yaml
```

This is due to inconsistencies in the pnpm module hoisting.

#### Solution 1: Run the fix-modules script

```bash
pnpm run fix-modules
```

This script patches the `.modules.yaml` file to include missing dependencies.

#### Solution 2: Clean and reinstall

```bash
pnpm run reset
```

This will clean all node_modules, lock files, and reinstall dependencies.

#### Solution 3: Manual fix

If the above solutions don't work:

1. Delete the node_modules folder and pnpm-lock.yaml
2. Update the .npmrc file with the settings in this project
3. Run `pnpm install --shamefully-hoist`

## Docker Build Issues

If you encounter hoisting issues during Docker builds:

1. Make sure the `.npmrc` file is correctly copied in the Dockerfile
2. Use the `--shamefully-hoist` flag in the Docker build

## Development Tips

- Use `pnpm --filter <package-name> <command>` to run commands for specific packages
- Use `pnpm run clean` to clean build artifacts without removing node_modules
- When adding new dependencies, use `pnpm add -w <package>` for workspace root or `pnpm add <package> --filter <app-name>` for specific apps
