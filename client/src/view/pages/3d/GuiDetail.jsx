import React from 'react';
import { Content, Desc, Title, ToggleContainer } from './style';

const GuiDetail = ({ isOn, toggleHandler }) => {
  return (
    <div>
      <Content>
        <Desc>
          <div className="OFF">OFF</div>
        </Desc>
        <ToggleContainer onClick={toggleHandler}>
          <div
            className={`toggle-container ${isOn ? 'toggle--checked' : null}`}
          />
          <div className={`toggle-circle ${isOn ? 'toggle--checked' : null}`} />
        </ToggleContainer>
        <Desc>
          <div className="ON"></div>ON
        </Desc>
        {/* x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)} */}
      </Content>
    </div>
  );
};

export default GuiDetail;
