/**
 * Helper scripts for pnpm management
 */
module.exports = {
  scripts: {
    clean: {
      default: 'pnpm -r exec rm -rf node_modules dist .turbo .next',
      modules: 'rm -rf node_modules .pnpm-store',
      'lock-files': 'rm -f pnpm-lock.yaml',
      all: 'nps clean && nps clean.modules && nps clean.lock-files',
    },
    reset: 'nps clean.all && pnpm install',
  },
};
