import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Breadcrumb } from 'antd';
import { multiPop } from './slices/navBarSlice';

const NavBar = () => {
  const navBarContent = useSelector((state) => state.navBar);
  const dispatch = useDispatch();

  const divStyle = {
    margin: '20px', // Adjust the value as needed
  };

  const handleBreadcrumbClick = (item) => {
    // Dispatch the multiPop action with the clicked item's id
    dispatch(multiPop(item));
  };

  return (
    <div style={divStyle}>
      <Breadcrumb items={navBarContent.map((item) => ({
        title: <a onClick={()=>{handleBreadcrumbClick(item)}} style={{ fontSize: '18px' }}>{item.name}</a>  
      }))}/>
    </div>
  );
};

export default NavBar;