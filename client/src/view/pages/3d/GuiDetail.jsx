import React from 'react';
import { Content, Desc, Title, ToggleContainer } from './style';

const GuiDetail = ({ ison, togglehandler }) => {
  return (
    <div>
      <Content>
        <Desc>
          <div className="OFF">OFF</div>
        </Desc>
        <ToggleContainer onClick={togglehandler}>
          <div
            className={`toggle-container ${ison ? 'toggle--checked' : null}`}
          />
          <div className={`toggle-circle ${ison ? 'toggle--checked' : null}`} />
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
