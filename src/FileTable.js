import React, { useState } from 'react';
import { Table, Popover, Modal } from 'antd';
import { push } from './slices/navBarSlice';
import { useDispatch } from 'react-redux';
import SharedWith from './SharedWith';
import { FolderOutlined } from '@ant-design/icons';

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const FileTable = ({ dataSource }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [downloadFile, setDownloadFile] = useState(null);
  const dispatch = useDispatch();


  const handleClick = (obj) => {
    if (obj.folder) {
      dispatch(push(obj));
    } else {
      setDownloadFile(obj);
      setModalVisible(true); // Open the modal
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Close the modal
    setDownloadFile(null);
  };

  const handleDownload = async () => {
    try {
      // Get the download URL from the item's downloadUrl property
      const downloadUrl = downloadFile["@microsoft.graph.downloadUrl"];
  
      // Fetch the file using the download URL
      const response = await fetch(downloadUrl);
  
      if (response.ok) {
        // Convert the response to a Blob
        const blob = await response.blob();
  
        // Create a temporary URL for the Blob
        const blobUrl = URL.createObjectURL(blob);
  
        // Create a link and initiate the download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.target = '_blank';
        link.download = downloadFile.name;
        link.click();
  
        // Clean up the temporary URL
        URL.revokeObjectURL(blobUrl);
      } else {
        console.error('Failed to download file:', response.statusText);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  
    setModalVisible(false); // Close the modal
    setDownloadFile(null); // Clear the file object
  };  
 
  const formatFileSize = (sizeInBytes) => {
  if (sizeInBytes === 0) {
    return '';
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let unitIndex = 0;
  let fileSize = sizeInBytes;

  while (fileSize >= 1000 && unitIndex < units.length - 1) {
    fileSize /= 1024;
    unitIndex++;
  }

  const formattedSize = fileSize.toFixed(1).padStart(5, '0'); // Ensures up to three digits with leading zeros
  return `${formattedSize} ${units[unitIndex]}`;
};

const formatLastModified = (dateTime) => {
  if (!dateTime) {
    return '';
  }

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  return new Date(dateTime).toLocaleString(undefined, options);
};
  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: (obj) => (
        <button onClick={() => handleClick(obj)} style={{ background: 'transparent', border: 'none' }}>
          {obj.folder && <FolderOutlined style={{ marginRight: '8px' }} />} {obj.name}
        </button>
      ),
    },
    {
      title: 'Last Modified',
      dataIndex: 'lastModifiedDateTime',
      key: 'lastModifiedDateTime',
      render: (dateTime) => formatLastModified(dateTime),
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'FileSize',
      render: (size) => formatFileSize(size),
    },
    {
      title: 'Sharing',
      key: 'SharedStatus',
      render: (obj) => {
        if (obj.id) { 
          return (
            <SharedWith item={obj}/>
          );
        }
  
        return null;
      },
    },
  ];

  return (
    <div style={{ margin: '0 15px' }}>
      <Table columns={columns} dataSource={dataSource} />
      <Modal
        title={`${downloadFile?.name}`}
        open={modalVisible} // Changed 'open' to 'visible'
        onCancel={handleCloseModal}
        onOk={handleDownload}
      >
        <p>Do you want to download this file?</p>
      </Modal>
    </div>
  );
};

export default FileTable;
