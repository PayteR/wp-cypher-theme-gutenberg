/**
 * Paths
 *
 * Project related paths.
 */

const path = require( 'path' );
const fs = require( 'fs' );

// Make sure any symlinks in the project folder are resolved:
const pluginDir = fs.realpathSync( process.cwd() );
const resolvePlugin = relativePath => path.resolve( pluginDir, relativePath );

// Config after eject: we're in ./config/
module.exports = {
	dotenv: resolvePlugin( '.env' ),
	pluginSrc: resolvePlugin( 'src' ), // Plugin src folder path.
	entry: {
		'./app/Gutenberg/Accordion/block.build': './app/Gutenberg/Accordion/block',
		'./app/Gutenberg/Button/block.build': './app/Gutenberg/Button/block',
		'./app/Gutenberg/Container/block.build': './app/Gutenberg/Container/block',
		'./app/Gutenberg/Columns/block.build': './app/Gutenberg/Columns/block',
		'./app/Gutenberg/Hero/block.build': './app/Gutenberg/Hero/block',
	},
	yarnLockFile: resolvePlugin( 'yarn.lock' ),
	pluginDist: resolvePlugin( '.' ), // We are in ./dist folder already so the path '.' resolves to ./dist/.
};
