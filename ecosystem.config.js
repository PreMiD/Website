module.exports = {
	apps: [
		{
			name: "Website-master",
			namespace: "PreMiD",
			script: "npm",
			args: "start",
			instances: 1,
			env: {
				NUXT_PORT: 3001,
				NUXT_HOST: "0.0.0.0"
			},
			cwd: "/home/Website/master",
			exec_interpreter: "none"
		},
		{
			name: "Website-stable",
			namespace: "PreMiD",
			script: "npm",
			args: "start",
			instances: 1,
			env: {
				NUXT_PORT: 3000,
				NUXT_HOST: "0.0.0.0"
			},
			cwd: "/home/Website/stable",
			exec_interpreter: "none"
		}
	]
};
