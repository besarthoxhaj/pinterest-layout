## Pinterest Layout

Starting with the data X, transform it to set Y.
Than loop and display.

```js
const X = [
  { time: 250, height: 400, id: '01' },
  { time: 240, height: 200, id: '02' },
  { time: 230, height: 450, id: '03' },
  { time: 220, height: 400, id: '04' },
  { time: 210, height: 100, id: '05' },
  { time: 200, height: 300, id: '06' },
  { time: 190, height: 400, id: '07' },
  { time: 180, height: 600, id: '08' },
  { time: 170, height: 300, id: '09' },
  { time: 160, height: 200, id: '10' },
  { time: 150, height: 600, id: '11' },
];

const Y = [
  [
    { id: '01' },
    { id: '05' },
    { id: '07' },
    { id: '10' },
    // ...
  ],
  [
    { id: '02' },
    { id: '04' },
    { id: '08' },
    { id: '12' },
    // ...
  ],
  [
    { id: '03' },
    { id: '06' },
    { id: '09' },
    { id: '11' },
    // ...
  ]
];
```


![screenshot](/assets/screenshot.png)
