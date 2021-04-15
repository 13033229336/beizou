# 水平垂直居中

## 定宽高

### 绝对定位加margin
```css
 div{
             width: 600px;
             height: 600px;
             position: relative;
             background-color: chartreuse;
         }
         .box{
            position: absolute;
            width: 300px;
            height: 300px;
            margin: auto;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-color: pink; 
         }
```

### 绝对定位+margin

```html
  .box{
            width: 200px;
            height: 200px;
            border: lime solid 1px;
            position: relative;
        }
   .children-box{
            position: absolute;
            width: 100px;
            height: 100px;
            left: 50%;
            top: 50%;
            margin: -50px 0 0 -50px;
            background-color: limegreen;
    }
```

### 绝对定位+transform

```css
 .box{
            width: 200px;
            height: 200px;
            border: lime solid 1px;
            position: relative;
        }
  .children-box{
            position: absolute;
            width: 100px;
            height: 100px;
            left: 50%;
            top: 50%;
            background-color: lime;
            transform: translate(-50px,-50px);
   }
```

### flex布局

```css
 .box{
            width: 200px;   
            height: 200px;
            border: lightseagreen solid 1px;
            display: flex;
            justify-content: center;
            align-items:center ;
        }
        .children-box{
            width: 100px;
            height: 100px;
            background-color: lime;
        }
```

### grid布局

```css
  .box{
            width: 200px;
            height: 200px;
            border: limegreen 1px solid;
            display: grid;
        }
   .children-box{
            width: 100px;
            height: 100px;
            background-color: magenta;
            margin: auto;

     }
```

## 不定宽高

### 绝对定位+transform

```css
  .box{
            width: 200px;
            height: 200px;
            border: darkorange 1px solid;
            position: relative;
        }
   .children-box{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            background-color: darksalmon;
        }
```

### flex布局

```css
.box {
            width: 200px;
            height: 200px;
            border: 1px solid red;
            display: flex;
            justify-content: center;
            align-items: center;
        }
 .children-box {
            background: yellow;
}
```

### flex布局二

```css
 .box {
            width: 200px;
            height: 200px;
            border: 1px solid red;
            display: flex;
        }
        .children-box {
            background: yellow;
            margin: auto;
        }
```

### grid-flex布局

```css
 .box{
            width: 200px;
            height: 200px;
            border: indigo 1px solid;
            display: grid;
        }
  .children-box{
        background-color: lawngreen;
        align-self: center;
        justify-self: center;
   }
```

### grid + margin 

```css
  .box{
            width: 200px;
            height: 200px;
            border: lawngreen solid 1px;
            display: grid;
        }
        .children-box{
            background-color: lightseagreen;
            margin: auto;
        }
```

### table 布局

```css
 .box{
            width: 200px;
            height: 200px;
            border: lawngreen 1px solid;
            display: table-cell;
            text-align: center;
            vertical-align: middle;
        }
.children-box{
            background-color: lawngreen;
            display: inline-block;
 }
```

```html
<div class="box">
        <div class="children-box">123</div>
    </div>
```

