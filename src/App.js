
import './App.css';
import Draggable from 'react-draggable';
import { useEffect, useState } from 'react';
function App() {
  const [intervalState, setIntervalState] = useState(null);
  const [dragEndFlag, setDragEndFlag] = useState(false);
  const [pipeStyle, setPipeStyle] = useState({
    left: {
      bottom: 20
    },
    middle: {
      bottom: 20
    },
    right: {
      bottom: 20
    }
  });
  const [waterLevel, setWaterLevel] = useState({
    leftCupLevel: 90,
    rightCupLevel: 90
  });
  const getBottomPositionOfElement = (elementId) => {
    const cupElement = document.getElementById(elementId);
    const cupTransformStyle = cupElement.style.transform;
    const splitCupRightTransformStyleBySpace = cupTransformStyle.split(' ');
    const cupBottomPosition = splitCupRightTransformStyleBySpace[splitCupRightTransformStyleBySpace.length - 1].replace('px)', '');
    return Number(Math.abs(cupBottomPosition));
  }
  const onLeftCupDrag = (e) => {
    const cupLeftBottomPosition = getBottomPositionOfElement('cup-left');
    const cupRightBottomPosition = getBottomPositionOfElement('cup-right');
    setPipeStyle({
      left: {
        bottom: cupLeftBottomPosition + 20,
      },
      middle: {
        bottom: cupLeftBottomPosition > cupRightBottomPosition ? cupRightBottomPosition + 20 : cupLeftBottomPosition + 20,
        height: Math.abs(cupLeftBottomPosition - cupRightBottomPosition)
      },
      right: {
        bottom: pipeStyle.right.bottom
      }
    });
  }

  const onRightCupDrag = (e) => {
    const cupLeftBottomPosition = getBottomPositionOfElement('cup-left');
    const cupRightBottomPosition = getBottomPositionOfElement('cup-right');
    setPipeStyle({
      left: {
        bottom: pipeStyle.left.bottom
      },
      middle: {
        bottom: cupLeftBottomPosition > cupRightBottomPosition ? cupRightBottomPosition + 20 : cupLeftBottomPosition + 20,
        height: Math.abs(cupLeftBottomPosition - cupRightBottomPosition)
      },
      right: {
        bottom: cupRightBottomPosition + 20
      },
    })
  }

  const onLeftDragEnd = () => {
    setDragEndFlag(true);
  }

  const onRightDragEnd = () => {
    setDragEndFlag(true);
  }

  useEffect(() => {
    const cupLeftBottomPosition = getBottomPositionOfElement('cup-left');
    const cupRightBottomPosition = getBottomPositionOfElement('cup-right');
    const differenceInPosition = Math.abs(cupLeftBottomPosition - cupRightBottomPosition) / 2;
    if (dragEndFlag) {
      console.log(differenceInPosition, cupLeftBottomPosition > cupRightBottomPosition);
      if (cupLeftBottomPosition > cupRightBottomPosition) {
        let leftCupLevel = 90 - differenceInPosition;
        let rightCupLevel = 90 + differenceInPosition;
        console.log(leftCupLevel, rightCupLevel)
        if (leftCupLevel > 160) {
          leftCupLevel = 160;
        } else if (leftCupLevel < 20) {
          leftCupLevel = 20;
        }
        if (rightCupLevel > 160) {
          rightCupLevel = 160;
        } else if (rightCupLevel < 20) {
          rightCupLevel = 20;
        }
        console.log(leftCupLevel, rightCupLevel)
        setWaterLevel({
          leftCupLevel,
          rightCupLevel,
        })
      } else {
        let leftCupLevel = 90 + differenceInPosition;
        let rightCupLevel = 90 - differenceInPosition;
        if (leftCupLevel > 160) {
          leftCupLevel = 160;
        } else if (leftCupLevel < 20) {
          leftCupLevel = 20;
        }
        if (rightCupLevel > 160) {
          rightCupLevel = 160;
        } else if (rightCupLevel < 20) {
          rightCupLevel = 20;
        }
        setWaterLevel({
          leftCupLevel,
          rightCupLevel,
        });
      }
      setDragEndFlag(false);
    }
  }, [dragEndFlag])
  // console.log('intervalState', intervalState)
  return (
    <div className='main'>
      <div className='main-container'>
        <div className='cup-container'>
          <Draggable bounds="parent" onStop={() => onLeftDragEnd()} onDrag={(e) => onLeftCupDrag(e)}>
            <div id='cup-left' className='cup cup-left'>
              <div style={{
                height: waterLevel.leftCupLevel
              }} className='cup-inner cup-inner-left'></div>
            </div>
          </Draggable>
        </div>
        <div className='pipe-container'>
          <div style={{
            bottom: pipeStyle.left.bottom
          }} className="horizontal-line horizontal-line-left anim-6th w-50">
            <div className='fill-water'>

            </div>
          </div>
          <div style={{
            bottom: pipeStyle.middle.bottom,
            height: pipeStyle.middle.height
          }} className="horizontal-line horizontal-line-middle anim-6th w-20 flexible-pipe">
            <div className='fill-water'>

            </div>
          </div>
          <div style={{
            bottom: pipeStyle.right.bottom
          }} className="horizontal-line horizontal-line-right anim-6th w-50">
            <div className='fill-water'>

            </div>
          </div>
        </div>
        <div className='cup-container'>
          <Draggable bounds="parent" onStop={() => onRightDragEnd()} onDrag={(e) => onRightCupDrag(e)}>
            <div id='cup-right' className='cup cup-right'>
              <div style={{
                height: waterLevel.rightCupLevel
              }} className='cup-inner cup-inner-right'></div>
            </div>
          </Draggable>
        </div>
      </div>
    </div>
  );
}

export default App;
