# Position

- static(默认值)静态定位，对象遵循标准文档流，top,right,bottom,left无效

  ![](https://img-blog.csdn.net/20170704003006434?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvRkVfRmx5RmlzaA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)



- relative 相对定位 ：对象遵循标准文档流，依赖top,right,bottom,left等属性相对于该对象在标准文档流原位置进行偏移，同时通过Z-index定义层叠关系

![](https://img-blog.csdn.net/20170704003122697?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvRkVfRmx5RmlzaA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)





- absolute 绝对定位：脱离文档流，使用top,right,bottom,left等属性进行绝对定位（相对于static定位以外第一个父元素进行绝对定位）同时通过z-index定义层叠关系。

![](https://img-blog.csdn.net/20170704004113569?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvRkVfRmx5RmlzaA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)



- fixed 固定定位：脱离文档流，通过top,right ,bottom,left等属性进行绝对定位（相对于浏览器窗口进行绝对定位）同时可通过z-index定义层叠关系。

![](https://img-blog.csdn.net/20170704003411595?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvRkVfRmx5RmlzaA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)



- sticky 粘性布局：相对定位relative 和 固定定位fixed的结合。

​          在目标区域内，它的行为就像 position ：relative; 在滑动过程中，某个元素距离其父元素的距离达到sticky粘性定位的要求时（top ：100 px）；position : sticky这时的效果相当于固定布局fixed,固定到适当位置

![](https://user-gold-cdn.xitu.io/2020/3/11/170c9c195a0a9254?imageslim)

