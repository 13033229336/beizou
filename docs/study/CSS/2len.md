# 两栏布局

## 1. BFC方法

左边float: left  右边overflow: hidden

```html
<style>
        .left{
            width: 300px;
            height: 100px;
            background-color: blue;
            float: left;
        }
        .right{
            height: 200px;
            background-color: brown;
            overflow: hidden;
        }
    </style>
</head>
<body>
    <div class="left">left</div>
    <div class="right">right</div>
</body>
```



## 2. flex方法

父容器设置display: flex;右边flex: 1

flex: 1 ===flex: 1 1 0%;

即flex-grow: 1,flex-shrink: 1,flex-basis: 0%

```html
    <style>
        .container{
            display: flex;
            border:brown solid 1px;
        }
        .left{
           /* flex: 0 0 200px; */
           width: 200px;
           height: 150px;
           background-color: cyan;
        }
        .right{
            flex: 1;
            height: 100px;
            background-color: darkblue;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
</body>
```

## 3. float+margin-left

左边float: left；右边margin-left：左边的宽度

```html
  <style>
        .left{
            width: 300px;
            height: 200px;
            background-color: yellow;
            float: left;
        }
        .right{
            height: 300px;
            margin-left: 300px;
            background-color: aqua;
        }
    </style>
</head>
<body>
    <div class="left">left</div>
    <div class="right">right</div>
</body>
```

## 4. 绝对定位+margin-left

父容器为相对定位；左边绝对定位；右边设置margin-left: 左边的宽度

```html
<style>
        .container{
            position: relative;
            border: darkcyan 1px solid;
        }
        .left{
            position: absolute;
            left: 0;
            top: 0;
            width: 200px;
            height: 100px;
            background-color: darkkhaki;
        }
        .right{
            margin-left: 200px;
            height: 100px;
            background-color: darkmagenta;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
</body>
```

## 5. table 方法

父容器display: table; width: 100%

左边和右边display: table-cell

```html
 <style>
        .container{
            display: table;
            width: 100%;
            border: darkred 1px solid;
        }
        .left{
            display: table-cell;
            width: 200px;
            height: 100px;
            background-color: darkturquoise;
        }
        .right{
            display: table-cell;
            height: 100px;
            background-color: darkviolet;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
</body>
```

