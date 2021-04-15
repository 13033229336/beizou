# CSS知识杂记

## 实现单行文本溢出
```css
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
```
## flex布局
### 容器属性
1. flex-direction: row/cloums横向、纵向
2. flex-wrap 是否换行
3. justify-content :主轴的对齐方式flex-start/flex-end/center/space-between/space-around
4. align-items 纵轴的对齐方式 flex-start/flex-end/center
### 项目上的属性
1. flex-grow 放大
2. flex-shrink  缩小
3. flex-basis 