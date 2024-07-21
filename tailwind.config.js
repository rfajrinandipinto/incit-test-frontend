// frontend/tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      discordBg: '#36393f',
      discordText: '#ffffff',
      discordAccent: '#5865f2',
    },
    // Add more customizations here
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
