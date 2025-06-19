/**
 * PNPM hooks for package resolution
 */
function readPackage(pkg, context) {
  // Fix specific packages as needed
  if (pkg.dependencies && pkg.dependencies['@babel/helper-string-parser']) {
    // Force specific version to ensure hoisting works correctly
    pkg.dependencies['@babel/helper-string-parser'] = '^7.22.5';
  }

  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
