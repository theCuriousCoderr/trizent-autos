import React, { useState, useEffect  } from 'react';

function AdminChatRoom({socket}) {
    const [message, setMessage] = useState("");
    const [ request, setRequest] = useState("");
    const [reply, setReply] = useState(false);

    useEffect(()=> {
        socket.on('request', (request) => {
            setRequest(request);
            setReply(true);
        })
    }, [request]);

    if (reply) {
        let chats = document.getElementById("chats");
        let div = document.createElement('div');
        let me = document.createElement('h2');
        div.appendChild(me);
        me.innerText = request;
        chats.append(div);
        setReply(false);
        setRequest('');
    };

    
    function sendMessage(e) {
        e.preventDefault();
        let chats = document.getElementById("chats");
        let div = document.createElement('div');
        let me = document.createElement('p');
        div.appendChild(me);
        me.innerText = message;
        chats.appendChild(div);
        socket.emit('fromAdmin', JSON.stringify({"response": message}));
        setMessage('');
    };

    return (
    <div className=''>
        <h1 className='font-bold text-xl text-center'>ADMIN CHAT ROOM</h1>
        <div className='border-2 border-black m-2'></div>
        <form onSubmit={sendMessage} className='fixed bottom-5 h-9 w-full bg-red-40 flex justify-between px-4' >
            <input type="text" autoFocus value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Message' className='w-[80%] px-3 rounded border-2 border-purple-500'/>
            <button type="submit" className='bg-purple-600 p-2 rounded-xl text-slate-100 font-semibold '>
                SEND
            </button>
        </form>
        <div id="chats" className="bg-red-5 flex flex-col space-y-2 "></div>
    </div>
    );
  
};

export default AdminChatRoom;