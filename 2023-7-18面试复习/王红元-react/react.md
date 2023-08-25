# React A JavaScript library for building user interface

## 第一章

1.从cdn直接引用无法获取报错信息，通过 script crossorigin 属性改变

2.ReactComponent组件
```
    class App extends React.Component {
        constructor {
            super();
            this.state = {
                message: 'hello world'
            };
        }

        // render函数, 函数组件是return
        render() {
            return (
                <div>
                    <h2>{this.state.message}</h2>
                    <button onClick={this.btnClick.bind(this)}>
                        改变文本
                    </button>
                </div>
            )
        }

        btnClick() {
            // this.setState 1.继承自component 2.message值改掉 3.自动重新执行render函数
            // this.state.message = 'hello react'
            this.setState({
                message: 'hello react'
            })
        }
    }
```

## 第二章

3.extends 继承 implement 实现

4.react 比 vue的优势， 抽离函数即为组件，vue需要单独抽离文件组件

5.null、undefined、boolean 在JSX 中不展示

6.对象类型不能作为JSX子元素 <h2>{{aaa: '111'}}</h2> (not valid as a react child)

7.通过type='text/babel'表示为JSX

8.调用this.setState会触发render

9.PWA 在安卓端像app一样的展示应用程序(Progressive Web App) 通过 App Manifest,serviceWorker来完成安装和离线功能