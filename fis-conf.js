//Step 1. 取消下面的注释开启simple插件，注意需要先进行插件安装 npm install -g fis-postpackager-simple
fis.config.set('modules.postpackager', 'simple');

//通过pack设置干预自动合并结果，将公用资源合并成一个文件，更加利于页面间的共用

//Step 2. 取消下面的注释开启pack人工干预
// fis.config.set('pack', {
//     'pkg/main.js': [
//         'js/**.js'
//     ]
// });

//Step 3. 取消下面的注释可以开启simple对零散资源的自动合并
// fis.config.set('settings.postpackager.simple.autoCombine', true);
//开启autoReflow使得在关闭autoCombine的情况下，依然会优化脚本与样式资源引用位置
fis.config.set('settings.postpackager.simple.autoReflow', true);
// fis.config.set('settings.postpackager.simple.output', 'src/pkg/main');


// fis.config.set('modules.postpackager', 'autoload');
// fis.config.set('settings.postpackager.autoload.type', 'requirejs');

// 设置成 amd 模式。
// fis.config.set('modules.postprocessor.html', 'amd');
// fis.config.set('modules.postprocessor.js', 'amd');

//另一种打包方案，在 pack 中命中的文件，其依赖也会自动命中。
// fis.config.set('modules.packager', 'depscombine');


// 后缀名的less的文件使用fis-parser-less编译
//modules.parser.less表示设置后缀名为less的文件的parser，第二个less表示使用fis-parser-less进行编译
fis.config.set('modules.parser.less', 'less');
//将less文件编译为css
fis.config.set('roadmap.ext.less', 'css');


fis.config.set('modules.spriter', 'csssprites');
fis.config.set('pack', {
    //对合并的aio.css进行处理
    'src/pkg/main.css': [
       'src/css/main.less'
    ],
    // 'src/pkg/ee.css': [
    //    'src/single/ee.css'
    // ],
    'src/pkg/main.js': [
       'src/js/main.js'
    ]
});
//为所有样式资源开启csssprites
fis.config.set('roadmap.path', [{
    reg: '**.css',
    useSprite: true
}]);
//设置csssprites的合并间距
fis.config.set('settings.spriter.csssprites', {
    //图之间的边距
    margin: 10,
    //使用矩阵排列方式，默认为线性`linear`
    layout: 'matrix'
});
// fis.config.set('modules.postprocessor.js', function (content, file, settings) {
//     // escapeShellCmd('start');
    
//     console.log(fis.project.getProjectPath());
//     return content;
// });
fis.config.set('modules.lint.js', 'jshint');
// fis.config.set('project.include', 'src/**');
// fis.config.set('project.exclude', ['bower_components/**.js','extend_lib/**.js','node_modules/**.js']);


fis.config.set('roadmap.path', [
    // {   
    //     reg: 'src/pkg/**.js',
    //     useCompile:true
    // },
    //打包的js,css 引入 根 目录
    {
        reg:/src\/pkg\/(.*\.js)/,
        release:'$1',
        url:'./$1',
        useCompile:false
    },
    {
        reg:/src\/pkg\/(.*\.css)/,
        release:'$1',
        url:'./$1',
    },
    //所有src/下的html引入 根 目录
    {
        reg: /src\/(.*\.html)/,
        release: '$1'
    },
    //所有templates下的html引入 templates 目录
    {
        reg: /src\/templates\/(.*\.html)/,
        release: 'templates/$1',
        url:'./templates/$1',
        isHtmlLike:true,
    },
    //处理.single(单独引用的js|css|less) 引入 根 目录
    {
        reg:/src\/(css|js)\/(.*\.single\.less|.*\.single\.css|.*\.single\.js)/,
        release:'$2',
        url:'./$2',
    },
    {
        reg:/src\/(single)\/(.*)\.(css|js)/,
        release:'$2.$1.$3',
        url:'./$2.$1.$3',
    },
    //所有src/css下的less引入 css目录
    {
        reg:/src\/css\/(.*\.less)/,
        release:'.src/css/$1',
    },
    
    // //js用browserify处理 这里不处理任何js
    // {
    //     reg: '**.js',
    //     // url: '.$&',
    //     useCompile:false,
    //     release : false
    // },
    
    //把其他所有js,css放到.src目录下 (留作备份 不调用)
    {
        reg:'**.css',
        release:'.src/css/$&',
        // url:'../src/js$&'
    },
    {
        reg:'**.less',
        release:'.src/css/$&',
        // url:'../src/js$&'
    },
    {
        reg:'**.js',
        release:'.src/js/$&',
        // url:'../src/js$&'
    },
    //图片处理 引入 img 目录
    {
        reg:/src\/img\/(.*)/,
        release:'img/$1',
        useHash:false,
        url:'./img/$1'
    },
    {
        reg:/(.*)\.(jpg|gif|png)/,
        release:'img/$1.$2',
        useHash:false,
        url:'./img$1.$2'
    },
    // {
    //     reg:'**.png',
    //     release:'img/$&',
    //     useHash:false,
    //     url:'../img$&'
    // },
    // {
    //     reg:'**.gif',
    //     release:'img/$&',
    //     useHash:false,
    //     url:'../img$&'
    // },
    // {
    //     reg:/(?:(.*?)\/)?(?:(.*?)\/)?(?:(.*?)\/)?.*\/(.*?)\.(jpg|gif|png)/,
    //     release:'img/$2__$3__$4.$5',
    //     useHash:false,
    //     url:'../img$1'
    // },
    //字体处理 引入 fonts目录
    {
        reg:'**.eot',
        release:'fonts/$&',
        useHash:false,
        url:'./fonts$&'
    },
    {
        reg:'**.svg',
        release:'fonts/$&',
        useHash:false,
        url:'./fonts$&'
    },
    {
        reg:'**.ttf',
        release:'fonts/$&',
        useHash:false,
        url:'./fonts$&'
    },
    {
        reg:'**.woff',
        release:'fonts/$&',
        useHash:false,
        url:'./fonts$&'
    },
    {
        reg:'**.woff2',
        release:'fonts/$&',
        useHash:false,
        url:'./fonts$&'
    },
    //前面规则未匹配到的其他文件
    {
        //前面规则未匹配到的其他文件
        reg : /.*/,
        //编译的时候不要产出了
        release : false
    }
]);
