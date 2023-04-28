/*
 * @Descripttion: 
 * @Author: suanmei
 * @Date: 2023-03-16 20:43:36
 * @LastEditors: suanmei
 * @LastEditTime: 2023-04-27 11:31:02
 */
const {navList,sidebarList} =require('./menu');
module.exports = {
    title:"前端js学习文档",
    description:"前端js学习文档",
    theme:'reco',
    base: '/frontend/',
    themeConfig:{
        nav:navList,
        sidebar:sidebarList,
        sidebarDepth:2,
        subSidebar:"auto"
    },
    locales:{
        '/':{
            //设置语言为中文
            lang:'zh-CN'
        }
    },
    plugins:[
        [
        '@vuepress-reco/vuepress-plugin-kan-ban-niang',
        // {
        //     theme: ['blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku', 'z16']
        // }
        {
            theme:['wanko'],
            clean:false,//是否开启clean模式(隐藏所有按钮)
            info:'https://www.npmjs.com/package/@vuepress-reco/vuepress-plugin-kan-ban-niang',
            messages:{ 
                welcome: '欢迎来到向阳的博客', 
                home: '心里的花，我想要带你回家1。', //回到博客主页
                theme: '好吧，希望你能喜欢我的其他小伙伴。',//更换模型主题	
                close: '你知道我喜欢吃什么吗？痴痴地望着你。',//关闭看板娘
            }
        }],
        ['dynamic-title', {//动态标题展示
            // showIcon: '/favicon.icon',
            showText: '欢迎回来~',
            // hideIcon: 'https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae',
            hideText: '不要走嘛~',
            recoverTime: 2000,
        }],
        ['demo-container']//一个基于 Vuepress 的插件，它可以帮助你在编写文档的时候增加 Vue 示例，它的诞生初衷是为了降低编写组件文档时增加一些相关示例的难度
    ]
}