// header右侧导航
const navList =[
    {text:"首页",link:'/'},
    { 
        text: '前端知识库', 
        items:[
            {text:'Typescript',link:'/TypeScript/ConditionalTypes' },
            {text:'Css',link:'/Css/base'},
            {text:'Git',link:'/Git/standard/commit'},
            {text:'UnitTest',link:'/UnitTest/standard/commit'},
            {text:'Node',link:'/Node/npm/command'},
            {text:'函数式编程',link:'/Function/theory'},
            {text:'日常开发问题记录',link:'/Problem/echarts'},
            {text:'Uniapp',link:'/Uniapp/start'},
            {text:'浏览器工作原理与实践',link:'/Browser/pages/performance'}
        ]
    },
    { 
        text: '向阳的 博客', 
        items: [
            { text: 'Github', link: 'https://github.com/AliceLi11' },
            { text: '语雀', link: 'https://www.yuque.com/dameizi-piaaa/zreris/qm8wrg' }
        ]
    }
]

// 左侧菜单导航
const sidebarList = {
    '/TypeScript/':[
        {
            title: "基础学习TS",
            // path: '',
            collapsable: false, // 不折叠
            children: [
                {title:"JS和TS相同的数据类型",path:"/TypeScript/NormalType"},
                {title:"TS特有的数据类型",path:"/TypeScript/specialType"},
                { title: "条件类型", path: "/TypeScript/ConditionalTypes" },
                { title: "函数类型", path: "/TypeScript/FunsTypes" },
                { title: "泛型", path: "/TypeScript/Generics" },
                {title:"枚举类型",path:"/TypeScript/Enum"}
            ]
        }
    ],
    '/Css/':[
        {
            title: "基础记录",
            path: "/Css/base",
        },
        {
            title: "常用记录",
            // path: "/Css/always",
            collapsable:false,// 不折叠
            children:[
                { title: "flex:1由哪几个属性组成", path: "/Css/always/flex1" },
            ]
        },
        {
            title:"扩展",
            path:'/Css/extend'
        },
    ],
    '/Git/':[
        {
            title: "Git入门",
            collapsable:false,// 不折叠
            children:[
                { title: "安装与配置", path: "/Git/base/baseUse" },
                { title: "基础操作", path: "/Git/base/baseOperate" },
                { title: "全局配置", path: "/Git/base/globalConfig" },
                { title: "分支操作", path: "/Git/base/branchOperate" },
                { title: "远程操作", path: "/Git/base/remoteOperate" },
                { title: "标签操作", path: "/Git/base/tag" },
            ]
        },
        {
            title: "git代码规范辅助工具",
            collapsable:false,// 不折叠
            children:[
                { title: "git commit规范", path: "/Git/standard/commit" },
                { title: "husky和git hooks的关系", path: "/Git/standard/huskyAndHooks" },
            ]
        },
        {
            title: "自定义git",
            collapsable:false,// 不折叠
            children:[
                { title: "git hooks", path: "/Git/custom/hooks" },
            ]
        },
        {
            title:"git init生成的.git下的文件",
            collapsable:false,// 不折叠
            children:[
                { title: "git底层命令", path: "/Git/gitInit/bottomCommand" },
                { title: "SHA-1校验和计算", path: "/Git/gitInit/getSHA-1" },
                { title: ".git目录下的文件", path: "/Git/gitInit/defaultFile" },
                { title: "解析unix中inode块", path: "/Git/gitInit/unix_inodes" },
            ]
        }
    ],
    '/UnitTest/':[
        {
            title: "基础",
            collapsable:false,// 不折叠
            // children:[
            //     { title: "git commit规范", path: "/Git/standard/commit" },
            // ]
        }
    ],
    '/Node':[
        {
            title: "node.js",
            collapsable:false,// 不折叠
            children:[
                { title: "nodejs初识", path: "/Node/nodejs/start" },
            ]
        },
        {
            title: "npm CLI",
            collapsable:false,// 不折叠
            children:[
                { title: "npm 常用指令", path: "/Node/npm/command" },
                { title: "npx 的使用", path: "/Node/npm/npx" },
                { title: "npm scripts的使用", path: "/Node/npm/scripts" },
            ]
        },
    ],
    '/Function':[
        {
            title:"函数式编程-修言掘金小册",
            collapsable:false,
            children:[
                {title:"开篇导读",path:"/Function/start"},
                {title:"纯函数与副作用",path:"/Function/effect"},
                {title:"函数是一等公民",path:"/Function/firstLevel"},
                {title:"函数纯度的安全帽:不可变数据",path:"/Function/notChangedData"},
                {title:"理论",path:"/Function/theory"},
                {title:"实践",path:"/Function/behavior"}
            ]
        }
    ],
    '/Uniapp':[
        {
            title:"Uniapp",
            collapsable:false,
            children:[
                {title:"开篇导读",path:"/Uniapp/start"},
                {title:"基础入门",path:"/Uniapp/baseEntry"},
                {title:"ToolUN",path:"/Uniapp/program/ToolUN"},
            ]
        }
    ],
    '/Problem':[
        {
            title:"日常开发问题记录",
            collapsable:false,
            children:[
                {title:"Echarts图表",path:'/Problem/echarts'},
                {title:"vue2js",path:'/Problem/vue2'},
                {title:"ElemenuUI",path:'/Problem/elemenetUi'},
                {title:"Css",path:'/Problem/css'}
            ]
        }
    ],
    '/Browser':[
        {
            title:"浏览器工作原理与实践",
            collapsable:false,
            children:[
                {title:"浏览器中的页面",children:[
                    {title:"利用网络面板做性能分析",path:'/Browser/pages/performance'}
                ]},
                {title:"vue2js",path:'/Problem/vue2'},
                {title:"Css",path:'/Problem/css'}
            ]
        }
    ]
}

module.exports= {
    navList,
    sidebarList
}