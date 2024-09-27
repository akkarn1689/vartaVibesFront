import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import DefaultDP from './DefaultDP';

//
import SentMessage from './SentMessage';
import ReceivedMessage from './ReceivedMessage';
import Attachment from '../images/attachment.png';

//

const Chat = () => {
  const [ws, setWs] = useState(null);
  const [userData, setUserData] = useState({});
  const [onlineUsers, setOnlineUsers] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [uniqueMessages, setUniqueMessages] = useState([]);

  const navigate = useNavigate();

  // 
  const checkOnline = async () => {
    try {
      const res = await fetch('https://vartavibesback.onrender.com/getdata', {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
      });

      const data = await res.json();

      setUserData(data);

      if (!res.ok) {
        throw new Error(data.message || 'Request failed');
      }
    } catch (err) {
      console.log(err);
      navigate('/login');
    }
  }

  //
  // const fetchMessages = async () => {
  //   try {
  //     const res = await fetch('http://localhost:8080/messages/' + selectedUserId, {
  //       method: 'GET',
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       credentials: "include",
  //     });

  //     const data = await res.json();
  //     // console.log(data);
  //     console.log(data);

  //     setMessages(data);
  //     // console.log(messages);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  //

  const connectToWs = () => {
    const webS = new WebSocket('ws://localhost:8080');
    setWs(webS);
    webS.addEventListener('message', handleMessage);
    webS.addEventListener('close', () => {
      setTimeout(() => {
        console.log('Disconnected. Trying to reconnect...');
        connectToWs();
      }, 1000)
    });
  }
  useEffect(() => {
    //
    checkOnline();
    connectToWs();

  }, []);

  // to fetch message
  useEffect(() => {
    if (selectedUserId) {
      // fetchMessages();
      fetch('https://vartavibesback.onrender.com/messages/' + selectedUserId, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
      }).then(async (res) => {
        const data = await res.json();
        // console.log(data);
        console.log(data);

        setMessages(data);
        console.log("during fetch " + messages);
      });
    }
  }, [selectedUserId]);

  //
  useEffect(() => {
    if (messages !== uniqueMessages) {
      console.log("message updated ");
      // console.log(messages);
      const unqMsg = messages?.filter((obj, index, self) =>
        index === self.findIndex((o) => o.time === obj.time)
      );
      setUniqueMessages(unqMsg);
      // console.log(uniqueMessages);
    }
  }, [messages]);

  //
  const showOnlineUsers = (usersList) => {
    const users = {};

    usersList.forEach(({ userId, username }) => {
      // if(username!==userData?.username){
      //   users[userId] = username;
      // }
      users[userId] = username;
    });
    // console.log(users);
    setOnlineUsers(users);
  }

  // 
  const handleMessage = (e) => {
    const messageData = JSON.parse(e.data);
    console.log(messageData);
    console.log(userData._id);
    if ('online' in messageData) {
      showOnlineUsers(messageData.online);
    } else if ('message' in messageData) {
      if (messageData.message.receiver === userData._id) {
        // if (!(messageData.message in messages)) {
        setMessages(prev => ([...prev, { ...messageData.message }]));
        // messages.push({...messageData.message});
        // setMessages([...messages, {...messageData.message}]);
        console.log(messages);
        // }
      }
    }
  }

  const sendNewMessage = (e, file = null) => {
    if (e) e.preventDefault();


    ws.send(JSON.stringify({
      receiver: selectedUserId,
      text: newMessage,
      time: new Date().toLocaleString(),
      file,
    }));
    setNewMessage("");
    if (selectedUserId) {
      // fetchMessages();
      fetch('https://vartavibesback.onrender.com/messages/' + selectedUserId, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
      }).then(async (res) => {
        const data = await res.json();
        // console.log(data);
        console.log(data);

        setMessages(data);
        console.log("during fetch " + messages);
      });
    }
    // if(!file) setMessages(prev => ([...prev, { text: newMessage, sender: userData._id, receiver: selectedUserId, time: new Date().toLocaleString() }]));
  };

  const sendFile = (e) => {
    // e.preventDefault();
    console.log(e.target.files);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = () => {
      sendNewMessage(null, {
        name: e.target.files[0].name,
        data: fileReader.result,
      })
    };
  }

  return (
    <div className='d-flex flex-row flex-wrap justify-content-center' style={{ height: "90vh" }}>
      <div className='d-flex flex-row px-4 py-3 rounded' style={{ width: "90vw" }}>
        <div className='bg-dark p-2 rounded' style={{ width: "30%" }}>
          <div className='d-flex bg-gradient p-2 fw-bold mb-4' style={{ width: "100%", fontSize: "150%" }}>
            Contacts
          </div>
          {
            Object.keys(onlineUsers).map(userId => (
              userId === "undefined" || userId === userData._id ? null :
                <div onClick={() => setSelectedUserId(userId)}
                  className={"d-flex p-1 border-bottom  rounded cursor-pointer " + (userId === selectedUserId ? "bg-gradient" : "")}
                  style={{ cursor: "pointer" }}
                  key={userId}>
                  <DefaultDP userId={userId} username={onlineUsers[userId]} />
                  <span>{onlineUsers[userId]}</span>
                </div>
            ))
          }
        </div>
        <div className='d-flex flex-column shadow-lg p-2 rounded' style={{ width: "70%" }}>
          <div className='flex-grow-1 overflow-auto p-2 my-2 shadow-lg rounded' style={{ height: "70vh", display: "flex", flexDirection: "column-reverse" }}>
            <div className=''>
              {
                !selectedUserId && (
                  <div className='d-flex flex-column h-100 flex-grow-1 align-items-center justify-content-center'>
                    <div className='mt-auto'> </div>
                    <div style={{ color: "gray" }}>&larr; Select a contact</div>
                    <div className='mt-auto mb-3' style={{ color: "gray" }}>Your personal messages will appear here</div>
                  </div>
                )
              }
              {
                selectedUserId && (
                  <div className='overflow-auto' style={{ display: "flex", flexDirection: "column" }}>
                    {
                      uniqueMessages?.map(message => (
                        selectedUserId === message.receiver ?
                          (message.sender === userData._id ? <SentMessage key={message.time} message={message} /> :
                            null) : (
                            userData._id === message.receiver ?
                              (selectedUserId === message.sender ? <ReceivedMessage key={message.time} message={message} /> : null)
                              : null
                          )
                      ))
                    }
                  </div>
                )
              }
            </div>
          </div>
          <div className='mb-1'>
            {
              selectedUserId && <form className='d-flex flex-row' onSubmit={sendNewMessage}>
                <div className='flex-grow-1' style={{ width: "80%", marginRight: "4px", marginLeft: "4px" }}>
                  <input type='text'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder='Type your message here...'
                    className='form-control text-light px-2 py-2 rounded'
                    style={{ background: "#282c34" }}
                  />
                </div>
                {/* <div> */}
                <label type='button' className='btn' style={{ background: "skyblue", color: "gray", margin: "2px" }}>
                  <input type='file' className='d-none' onChange={sendFile} />
                  <img src={Attachment} className='hidden' />
                </label>
                <button type='submit' className='btn btn-primary'>Send</button>
                {/* </div> */}
              </form>
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default Chat