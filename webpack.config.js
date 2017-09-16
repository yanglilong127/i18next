const path=require('path');
const webpack=require('webpack');
//创建html文件
const HtmlWebpackPlugin=require('html-webpack-plugin');
//提取css文件
const ExtractTextPlugin=require('extract-text-webpack-plugin');
const ExtractCSS=new ExtractTextPlugin({filename:'css/[name].css'});

module.exports={
	entry:{
		jquery:path.join(__dirname,'js/jquery-3.2.1.min.js'),
		index:path.join(__dirname,'index.js')
	},
	output:{
		path:path.join(__dirname,'dist'),
		filename:'js/[name].js',
		publicPath:''
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				use:[{
					loader:'babel-loader',
					options:{presets:['es2015']}
				}]
			},
			{
				test:/\.html$/,
				loader:'html-loader'
			},
			{
				test:/\.css$/,
				exclude:/node_modules/,
				use:ExtractCSS.extract([
					'css-loader',									
					{
						loader:'postcss-loader',
						options: {
			                postcss: function(){
			                    return [
			                        require("autoprefixer")({
			                            browsers: ['ie>=8','>1% in CN']
			                        })
			                    ]
			                }
			            }
					}
				])
			}
		]
	},
	resolve:{
		alias:{
			jquery:path.join(__dirname,'js/jquery-3.2.1.min.js')
		}
	},
	plugins:[
		ExtractCSS,
		//xml主页
		new HtmlWebpackPlugin({
			filename:'index.html',
			template:path.join(__dirname,'index.html'),
			inject:true,
			chunks:['jquery','index'],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ['jquery','index'];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;  
			}
		}),
		//（删除重复依赖的文件）
    	new webpack.optimize.DedupePlugin(),
    	
		//压缩
		
		new webpack.optimize.UglifyJsPlugin({
			sourceMap:true,
			compress:{
				warnings:false
			}
		}),
		//自动加载模块，当$被当作未赋值的变量时
		new webpack.ProvidePlugin({
			$:'jquery',
			jQuery:'jquery',
			'window.jQuery':'jquery'
		}),

		//发布前清空发布目录
		/*****
		new CleanWebpackPlugin(['dist'], {
	        root: '', // An absolute path for the root  of webpack.config.js
	        verbose: true,// Write logs to console.
	        dry: false // Do not delete anything, good for testing.
	    }),
	    ****/
	    
	],
	devServer:{
		contentBase:__dirname+'/dist',
		//contentBase:__dirname+'/src',
	},
	watch:true,

}