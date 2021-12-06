import { Tabs } from 'antd';
import * as React from 'react';
import { getPositionStyles } from '../utils';
import './index.less';
const { TabPane } = Tabs;
export interface OperatorBarProps {
  placement: string;
  offset: number[];
  GI_CONTAINER: string[];
}

const SideTabs: React.FunctionComponent<OperatorBarProps> = props => {
  const [state, setState] = React.useState({
    toggle: false,
  });
  //@ts-ignore
  const { components, assets, placement, offset, width, height } = props;

  const sortedComponents = components
    .sort((a, b) => a.props?.GI_CONTAINER_INDEX - b.props?.GI_CONTAINER_INDEX)
    .filter((item: any) => item.props?.GIAC_CONTENT);

  const handleToggle = () => {
    setState(preState => {
      return {
        toggle: !preState.toggle,
      };
    });
  };

  const postionStyles = getPositionStyles(placement, offset);

  const baseStyle = {
    ...postionStyles,
    height,
    width,
    backgroundColor: '#fff',
    padding: '8px',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  };
  const styles = state.toggle ? { ...baseStyle, width: '0px' } : baseStyle;
  const handerBackStyles = {
    position: 'absolute',
    left: '100%',
    top: '50%',
    height: '80px',
    width: '38px',
    borderStyle: 'solid',
    borderWidth: '20px',
    borderColor: 'transparent transparent transparent #d9d9d9'
  }
  const handlerStyles: React.CSSProperties = {
    position: 'absolute',
    left: 'calc(100% - 1px)',
    top: '50%',
    height: '80px',
    width: '38px',
    cursor: 'pointer',
    borderStyle: 'solid',
    borderWidth: '20px',
    borderColor: 'transparent transparent transparent #fafafa'
  };
  const handlerTextStyles = {
    position: 'absolute',
    left: '-15px',
    top: '8px'
  }
  return (
    <div style={styles} className="gi-side-tabs">
      <div style={handerBackStyles as any}></div>
      <div onClick={handleToggle} style={handlerStyles as any}>
        <span style={handlerTextStyles as any}>||</span>
      </div>
      <div className="gi-side-tabs-content">
        <Tabs defaultActiveKey="1">
          {sortedComponents.map((item, index) => {
            if (!item) {
              return null;
            }
            const { props: itemProps, id: itemId } = item;
            const { component: Component } = assets[itemId];
            return (
              <TabPane key={index} tab={itemProps.GIAC_CONTENT.title}>
                <Component {...itemProps} />
              </TabPane>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

export default SideTabs;
