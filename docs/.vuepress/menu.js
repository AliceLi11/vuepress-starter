// header右侧导航
const navList =[
    {text:"首页",link:'/'},
    { 
        text: '前端知识库', 
        items:[
            {text:'Typescript',link:'/TypeScript/ConditionalTypes' },
            {text:'Css',link:'/Css/base'},
            {text:'Git',link:'/Git/standard/commit'}
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
            title: "git代码规范辅助工具",
            collapsable:false,// 不折叠
            children:[
                { title: "git commit规范", path: "/Git/standard/commit" },
            ]
        }
    ]
}

module.exports= {
    navList,
    sidebarList
}