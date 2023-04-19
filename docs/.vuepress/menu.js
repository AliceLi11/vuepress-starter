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
            {text:'函数式编程',link:'/Function/juejin'}
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
            path: '/TypeScript/ConditionalTypes',
            collapsable: false, // 不折叠
            children: [
                { title: "条件类型", path: "" },
                { title: "泛型", path: "Generics" }
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
                {title:"理论",path:"/Function/theory"},
                {title:"实践",path:"/Function/behavior"}
            ]
        }
    ]
}

module.exports= {
    navList,
    sidebarList
}