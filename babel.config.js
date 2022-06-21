module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      "import",
      {
        libraryName: "ant-design-vue",
        // libraryName: "Antd",
        libraryDirectory: "es",
        style: 'css'
      }
    ]
  ]
}
