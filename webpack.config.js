const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production'
  const isDev = !isProd

  const filename = (ext) => isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`
  const plugins = () => {
    const base = [new HtmlWebpackPlugin({
      template: './index.html'
    }), // Для копирования файлов из src в dist, к примеру favicon
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src', 'favicon.ico'), to: path.resolve(__dirname, 'dist')
      },],
    }), new MiniCssExtractPlugin({
      filename: filename('css')
    })]

    if (isDev) {
      base.push(new ESLintPlugin())
    }

    return base
  }

  return {
    target: 'web', // Рабочая директория
    context: path.resolve(__dirname, 'src'), // Точка входа
    entry: {
      main: ['@babel/polyfill', './index.js']
    }, // Выходные файлы
    output: {
      path: path.resolve(__dirname, 'dist'), filename: filename('js'), clean: true
    }, resolve: {
      // Позволяет не указывать в конце путей расширения файлов. При одинаковых именах приоритет определяется очередью
      extensions: ['.js'], // Позволяет делать перенаправления на конкретные места проекта
      alias: {
        '@': path.resolve(__dirname, 'src'), '@core': path.resolve(__dirname, 'src', 'core')
      }
    }, // Все используемые плагины
    // Настройки для сервера разработки
    devServer: {
      port: '3000', open: true, // Автовключение браузера при включении dev mode
      hot: true, // Hot reload
      watchFiles: './', // Какие изменения отслеживаем для Hot Reload
    }, plugins: plugins(), // Здесь описываются все лоадары (штуки, которые позволяют импортировать объекты и парсить их, чтобы взаимодействовать с ними)
    devtool: isDev ? 'source-map' : false, module: {
      rules: [{
        test: /\.s[ac]ss$/i, use: [// Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader, 'css-loader', // Compiles Sass to CSS
          'sass-loader',],
      }, {
        test: /\.m?js$/, exclude: /node_modules/, use: {
          loader: 'babel-loader', options: {
            presets: ['@babel/preset-env']
          }
        }
      }],
    },
  }
}
