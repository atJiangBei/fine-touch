<p align="center"><img width="200" src="http://jiangbei.online/images/logo200.png"/></p>

<h2 align="center">fine-touch</h2>

```ts
type Root = HTMLElement | Document;
//start
type StartCallbackArguments = {
  startX: number;
  startY: number;
  event: MouseEvent | TouchEvent;
};
type StartCallback = {
  (arg: StartCallbackArguments): void;
};
//moveing
export type MoveCallbackArguments = {
  movedX: number;
  movedY: number;
  stepX: number;
  stepY: number;
  event: MouseEvent | TouchEvent;
};
type MoveCallback = {
  (arg: MoveCallbackArguments): void;
};
//end
export type EndCallbackArguments = {
  movedX: number;
  movedY: number;
  speedX: number;
  speedY: number;
  event?: MouseEvent | TouchEvent;
};
type EndCallback = {
  (arg: EndCallbackArguments): void;
};
//option
type Option = {
  root: Root;
  startCallback?: StartCallback;
  moveCallback?: MoveCallback;
  endCallback?: EndCallback;
};


createTouch({
    root: document.getElementById("dom"),
    startCallback(arg:StartCallbackArguments) {},
    moveCallback: (arg:MoveCallbackArguments) => {
        onsole.log(arg)
    },
    endCallback: (arg:EndCallbackArguments) => {
        console.log(arg)
    },
});

```


[github 地址](https://github.com/atJiangBei/fine-touch)

[具体实现请看关联](https://atjiangbei.github.io/2019/04/04/%E6%89%8B%E5%8A%A8%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E6%BB%91%E5%8A%A8%E8%BD%AE%E6%92%AD%E5%9B%BE.html)

[关联](https://atjiangbei.github.io/)

[以此实现的 vue 组件](https://github.com/atJiangBei/solar-vue)


