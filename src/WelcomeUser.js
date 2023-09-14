import React, { useEffect, useState } from 'react';
import { useMsal } from "@azure/msal-react";
import { Client } from "@microsoft/microsoft-graph-client";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './slices/counterSlice';
import { update } from './slices/graphClientSlice';
import NavBar from './NavBar';
import FileTable from './FileTable';

function WelcomeUser() {
  const { accounts, instance } = useMsal();
  const username = accounts[0]?.name || '';
  const counter = useSelector((state) => state.counter);
  const navBarContent = useSelector((state) => state.navBar); 
  const graphClient = useSelector((state) => state.graphClient);
  const dispatch = useDispatch();
  
  const [files, setFiles] = useState([]);

  async function getFiles() {
    try {
      // const response = await instance.acquireTokenSilent({
      //   account: accounts[0],
      //   scopes: ["user.read", "files.read"]
      // });

      // const accessToken = response.accessToken;
      // const client = Client.init({
      //   authProvider: (done) => {
      //     done(null, accessToken);
      //   }
      // });
      if (graphClient){
        let url = "/me/drive/root/children";
        if (navBarContent.length > 1) {
            const id = navBarContent[navBarContent.length - 1].id;
            url = `/me/drive/items/${id}/children`; 
        }

        const graphResponse = await graphClient.api(url).get();
        const fetchedFiles = graphResponse.value;
        setFiles(fetchedFiles);
      }
    } catch (error) {
      console.log("Graph API error:", error);
    }
  }

  useEffect( () => {

    async function setupClient(){
      const response = await instance.acquireTokenSilent({
        account: accounts[0],
        scopes: ["user.read", "files.read"]
      });
  
      const accessToken = response.accessToken;
      const client = Client.init({
        authProvider: (done) => {
          done(null, accessToken);
        }
      });
      dispatch(update(client))
    }

    setupClient();
    
  }, [accounts, instance]);


  useEffect(() => {
    getFiles();
  }, [navBarContent,graphClient]);

  return (
    <div>
      <h1 style={{ margin: '15px'}} >Welcome, {username.toUpperCase()}</h1>
      <NavBar/>
      <FileTable dataSource={files} />
    </div>
  );
}

export default WelcomeUser;
