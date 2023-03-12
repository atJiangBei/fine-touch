<p align="center"><img width="200" src="http://jiangbei.online/images/logo200.png"/></p>

<h2 align="center">fine-touch</h2>

<p align="center">
<img src="https://img.shields.io/github/stars/atJiangBei/fine-touch.svg"/>
<img src="https://img.shields.io/github/forks/atJiangBei/fine-touch.svg"/>
</p>

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
  root: document.getElementById('dom'),
  startCallback(arg: StartCallbackArguments) {},
  moveCallback: (arg: MoveCallbackArguments) => {
    onsole.log(arg);
  },
  endCallback: (arg: EndCallbackArguments) => {
    console.log(arg);
  },
});
```

[github](https://github.com/atJiangBei/fine-touch)
