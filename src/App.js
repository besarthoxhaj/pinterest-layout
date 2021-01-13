import React from 'react';
import styled from 'styled-components';


/**
 *
 *
 *
 */
const DATA = [
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
  { time: 150, height: 300, id: '12' },
];


/**
 *
 *
 */
export default function App() {

  const rows = React.useMemo(() => groupByRow(DATA), []);
  const cols = React.useMemo(() => groupByIdx(rows), []);

  return (
    <S.Container>
      {cols.map(getColumnElm)}
    </S.Container>
  );

  /**
   *
   *
   */
  function getColumnElm(rows) {

    return (
      <S.Column>
        {rows.map(getImageElm)}
      </S.Column>
    );
  }

  /**
   *
   *
   *
   */
  function getImageElm(elm) {

    const subProps = {
      key: elm.id,
      style: {height: elm.height},
    };

    return (
      <S.InnerImage {...subProps}>
        {elm.id}
      </S.InnerImage>
    );
  }

  /**
   *
   *
   *
   */
  function groupByRow(innerData) {

    return innerData.reduce((acc, elm, idx) => {

      /**
       *  initialize: first 3 elements will
       *  always be positioned at the top
       *
       */
      if (idx <= 2) {
        acc[0] = acc[0] ?? [];
        elm.acc = elm.height;
        acc[0].push(elm);
        return acc;
      }

      /**
       *  idx modulo 3 equal 0, means
       *  a new row is starting:

          [
            [400, 200, 500], <-- prevRow
            []               <-- we are here
          ]

       *  find the min value index in prevRow
       *  and place it in the same idx in currRow

          [
            [400, 200, 500], <-- it's 200 in idx 1
            [   , XXX,    ], <-- so in idx 1 put XXX
          ]
       */
      if (idx % 3 === 0) {

        const prevRow = acc[acc.length - 1];
        const currRow = [];

        const accHeights = prevRow.map(elm => elm.acc);
        const minAcc = Math.min(...accHeights);
        const currMinIdx = accHeights.indexOf(minAcc);

        elm.acc = elm.height + minAcc;
        currRow[currMinIdx] = elm;
        acc.push(currRow);
        return acc;
      }

      /**
       *  idx modulo 3 equal 1, means the
       *  same as comment above. The real
       *  only difference is find middle
       *  value idx and insert it there

          [
            [400, 200, 500], <-- it's 400 in idx 0
            [YYY, XXX,    ], <-- so in idx 1 put YYY
          ]
       */
      if (idx % 3 === 1) {

        const prevRow = acc[acc.length - 2];
        const currRow = acc[acc.length - 1];

        const accHeights = prevRow.map(elm => elm.acc);
        const midAcc = [...accHeights].sort((a, b) => a - b)[1];
        const currMidIdx = accHeights.indexOf(midAcc);

        elm.acc = elm.height + midAcc;
        currRow[currMidIdx] = elm;
        return acc;
      }

      /**
       *  finally, idx modulo 3 equal 2,
       *  means find max value idx and
       *  and insert curr element there

          [
            [400, 200, 500], <-- it's 500 in idx 0
            [YYY, XXX, YYY], <-- so in idx 2 put ZZZ
          ]
       */
      if (idx % 3 === 2) {

        const prevRow = acc[acc.length - 2];
        const currRow = acc[acc.length - 1];

        const accHeights = prevRow.map(elm => elm.acc);
        const maxAcc = Math.max(...accHeights);
        const currMaxIdx = accHeights.indexOf(maxAcc);

        elm.acc = elm.height + maxAcc;
        currRow[currMaxIdx] = elm;
        return acc;
      }

      return acc;
    }, []);
  }

  /**
   *  zip like function to transfrom,
   *  it's basically a matrix rotation.
   *  X => Y

      X = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ];

      Y = [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ];
   */
  function groupByIdx(innerRows) {

    const innerCols = [[], [], []];

    innerRows.forEach(row => {
      row.forEach((elm, idx) => {
        innerCols[idx].push(elm);
      });
    });

    return innerCols;
  }
}


/**
 *
 *
 */
const S = {};

S.Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 600px;
`;

S.Column = styled.div`
  flex: 1;
`;

S.InnerImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  border: 1px solid;
  width: 200px;
`;
