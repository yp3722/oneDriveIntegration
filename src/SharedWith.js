import React, { useState, useEffect } from 'react';
import { Popover } from 'antd';
import { useSelector } from 'react-redux';

const SharedWith = (props) => {
  const graphClient = useSelector((state) => state.graphClient);
  const [shareStatus, setShareStatus] = useState('');
  const [accessInfo, setAccessInfo] = useState([]);
  const [content, setContent] = useState('<ul><li>You - Owner</li></ul>');

  const fetchFileAccessInfo = async () => {
    if (graphClient) {
      try {
        const res = await graphClient.api(`/me/drive/items/${props.item.id}/permissions`).get();
        console.log('respo:', res);

        if (res.value.length === 0) {
          setShareStatus('Private');
        } else {
          setShareStatus('Shared');
          setAccessInfo(res);
        }
      } catch (error) {
        console.log("Error occurred while trying to display info for shared item:", error);
      }
    }
  };

  useEffect(() => {
    fetchFileAccessInfo();
  }, []);

  useEffect(() => {
    console.log('1',props.item.name);
    if (accessInfo.value && accessInfo.value.length > 0) {
      const userRoles = {};
      console.log('2')

      accessInfo.value.forEach((permission) => {
        if (permission.grantedToIdentities) {
          console.log('3')
          permission.grantedToIdentities.forEach((identity) => {
            const user = identity.user;
            const userName = user.displayName; // Get the user's display name
            const roles = permission.roles.join(', ');

            if (!userRoles[userName]) { // Use userName instead of userId
              userRoles[userName] = new Set();
            }
            userRoles[userName].add(roles);
          });
        }
      });

      const contentHTML = ['<ul><li>You - Owner</li>'];
      for (const userName in userRoles) { // Use userName instead of userId
        const roles = [...userRoles[userName]].join(', ');
        contentHTML.push(`<li>${userName} - ${roles}</li>`); // Display user's name
      }
      contentHTML.push('</ul>');

      setContent(contentHTML.join(''));
    }
  }, [accessInfo]);

  return (
    <div>
      <Popover content={<div dangerouslySetInnerHTML={{ __html: content }} />} title={'Access Information : '} trigger="hover">
        <>{shareStatus || 'Loading...'}</>
      </Popover>
    </div>
  );
};

export default SharedWith;
