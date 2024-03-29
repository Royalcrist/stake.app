module.exports = {
	contracts_build_directory: './app/src/contracts',

	networks: {
		development: {
			host: 'ganache',
			port: 8545,
			network_id: '*',
		},
	},

	mocha: {},

	compilers: {
		solc: {
			version: '0.8.14',
		},
	},
};
