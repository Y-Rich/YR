import React, { useState, useEffect, useRef } from 'react';
import { styled } from 'styled-components';

export const SideBarContainer = styled.aside`
  /* background-color: #e3ecf1; */
  background-color: #d9d9d9;
  /* border-left: 4px solid #202020; */
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  transition: 0.4s ease;
  color: #202020;
  height: 100%;
  z-index: 1;
`;

export const ArrowBtn = styled.button`
  position: relative;
  background-color: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  line-height: 10px;
  font-weight: 900;
  left: -25px;
  top: 50%;
  width: 50px;
  height: 40px;
  font-size: 20px;
  text-align: center;
  /* z-index: 99; */
  transition: 0.8s ease;
  /* border: 2px solid #202020; */
  border: none;
  border-radius: 40px;
  overflow: hidden;
  cursor: pointer;
  /* &open {
    width: 100%;
    height: 100%;
  } */
  &span {
    justify-content: center;
  }
`;

export const Content = styled.div`
  padding: 40px 40px 0 20px;
  position: relative;
  width: 100%;
`;

export const ControlContainer = styled.section`
  /* background-color: aliceblue; */
`;
export const ControlName = styled.div`
  background-color: aquamarine;
`;
export const ControlBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

// export const SideBar = ({ width = 280 }) => {
//   const [isOpen, setOpen] = useState(false);
//   const [xPosition, setX] = useState(-width);
//   const side = useRef();

//   const toggleMenu = () => {
//     if (xPosition < 0) {
//       setX(0);
//       setOpen(true);
//     } else {
//       setX(-width);
//       setOpen(false);
//     }
//   };

//   const handleClose = async (e) => {
//     let sideArea = side.current;
//     let sideCildren = side.current.contains(e.target);
//     if (isOpen && (!sideArea || !sideCildren)) {
//       await setX(-width);
//       await setOpen(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('click', handleClose);
//     return () => {
//       window.removeEventListener('click', handleClose);
//     };
//   });

//   return (
//     <SideBarContainer>
//       <SideBarBox
//         ref={side}
//         style={{
//           width: `${width}px`,
//           height: '100%',
//           transform: `translatex(${-xPosition}px)`,
//         }}
//       >
//         <ArrowBtn onClick={() => toggleMenu()}>
//           {isOpen ? <span>ⓧ</span> : '▶'}
//         </ArrowBtn>
//         <Content>
//           <StatusContainer>
//             <StatusName>1호기</StatusName>
//             <StatusBox>
//               <div>전원</div>
//               <div>상태</div>
//               <div>갯수</div>
//               <div>속도</div>
//               <div>수직</div>
//               <div>수평</div>
//             </StatusBox>
//           </StatusContainer>
//           <StatusContainer></StatusContainer>
//           <StatusContainer></StatusContainer>
//           <StatusContainer></StatusContainer>
//         </Content>
//       </SideBarBox>
//     </SideBarContainer>
//   );
// };

// export default SideBar;
