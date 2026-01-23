module.exports = {
  apps: [
    {
      name: "aka-home",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3001",
      exec_mode: "cluster",
      instances: "max",
      watch: false,
      autorestart: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      // Add log rotation and better restart strategy
      error_file: "/opt/webapps/aka-home/logs/error.log",
      out_file: "/opt/webapps/aka-home/logs/out.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm Z",
      // Graceful reload (no downtime)
      wait_ready: true,
      listen_timeout: 10000,
      kill_timeout: 5000,
    },
  ],
};
