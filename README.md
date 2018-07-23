# demba-ba-net
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Demba-Ba-Net is a CNN to check whether a given image contains the [ShangHai ShenHua FC](https://en.wikipedia.org/wiki/Shanghai_Greenland_Shenhua_F.C.) football star [Demba Ba](https://en.wikipedia.org/wiki/Demba_Ba), which is based on [MobileNet](https://arxiv.org/abs/1704.04861), using [transfer learning](https://machinelearningmastery.com/transfer-learning-for-deep-learning/).

## Some Examples

![example1.jpg](http://dn-cnode.qbox.me/Fgbjj6SXvOpuDQsiwHf5uQZklmrD)

```js
// output:
// { possibility: '97.33%' }
```

![example2.jpg](http://dn-cnode.qbox.me/FqqpQu3QmNkoUEfLaUI5btEDWmOW)

```js
// output:
// { possibility: '89.90%' }
```

![example3.jpg](http://dn-cnode.qbox.me/FuEAQvnez63k5s6sc3QFsbDQLWws)

```js
// output:
// { possibility: '0.37%' }
```

![example4.jpg](http://dn-cnode.qbox.me/FiFnOaCNKhWLadg3QAw9A9kKCDXF)

```js
// output:
// { possibility: '34.54%' }
```

## Installation

```sh
npm i -g demba-ba-net
```

## How To Use It

```js
demba-ba-net-js infer -i <InputImagePath> [--gpu]
```
