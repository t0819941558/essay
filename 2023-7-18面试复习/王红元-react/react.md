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

6.