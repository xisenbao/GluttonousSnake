const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

// 网友笔记 https://www.jianshu.com/p/2bf12864a055
// 引入babel: tsconfig中配target可以将eg:es2020专程如es5等兼容性好的版本，但无法处理promise,箭头函数等新增的语法，要用到babel_corejs来进行处理

module.exports = {
    //没有指定mode的时候bundle.js空白？
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        environment: {
            // (()=>{"use strict";console.log(1),console.log("mmmm")})(); 打包出来bundle.js最外层默认就不是箭头函数包裹了
            //!function(){"use strict";console.log(1),console.log("mmmm")}();
            arrowFunction:false,
            const: false //兼容ie10-
        }
    },
    //指定webpack打包时要使用的模块
    module: {
        rules: [
            {
                // test指定的是对那些文件生效
                test:/\.ts$/, // 通过正则表达式匹配文件的名字
                use: [ // 加载器的执行顺序是从后往前，要先执行ts-loader，在执行babel
                    // babel 需要一些配置
                    {
                        // 指定加载器
                        loader: 'babel-loader',
                        // 设置babel
                        options: {
                            // 设置预定义环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets:{
                                            "chrome": "58",
                                            "ie": "11" // ie11不支持箭头函数

                                        },
                                        // 设置corejs的版本，下载的版本几写几
                                        "corejs":3,
                                        // 使用corejs的方式, "usage"为按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
            // {
            //     //指定加载规则生效的文件
            //     test: /\.ts$/,
            //     // loader: 'ts-loader',
            //     use: [
            //         {
            //             loader: "babel-loader",
            //             opstions: {
            //                 //设置预定义环境 preset-env
            //                 presets: [
            //                     [
            //                         //指定环境的插件
            //                         "@babel/preset-env",
            //                         //配置信息
            //                         {
            //                             //要兼容的浏览器及其版本
            //                             targets:{
            //                                 "chrome":"58",
            //                                 "ie":"11"
            //                             },
            //                             "corejs":3,
            //                             //使用corejs的方式  usage-按需加载
            //                             "useBuiltIns":"usage"
            //                         }
            //                     ]
            //                 ]

            //             }
            //         },
                    {
                        loader:'ts-loader'
                    }
                    
                    

                ],

                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    //引入postcss 兼容旧版浏览器语法,比较新的css语法加上浏览器兼容前缀eg.-ms-等，类似于js的babel
                    {
                        loader:"postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions' //兼容最新的两个版本
                                        }
                                    ]
                                ]
                            }
                        }

                    },

                    "less-loader"
                ]

            }
        ]

    },
    plugins: [
        //编译时清空dist目录
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title: 'hhh' 
            template: './src/index.html'

        })
    ],
    //用来设置引用模块 import {m} from './m' （m.ts也要被识别成模块）
    resolve: {
        extensions: ['.ts','.js']
    }
}