module.exports = {
    title: '北走的博客',  
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],    
    ],
    themeConfig: {
      logo:'/logo.png',
        nav: [
            { text: '主页', link: '/' },
            { text: '博文',
              items: [
                { text: '个人学习', link: '/study/' },
           
              ] 
            },
            { text: '关于', link: '/about/' },
            { text: 'Github', link: 'https://github.com/13033229336' },
        ],
        sidebar: 'auto',     //侧边栏
        sidebarDepth: 2,
        lastUpdated: 'Last Updated', 
        sidebar: require("./sidebar.js")
    },
}