import React from 'react'

const ReceivedMessage = ({ message }) => {
  const { text, file } = message;
  // console.log("Hi")
  return (
    <div className='py-1 px-2 my-1 rounded' style={{ background: "gray", color: "black", maxWidth: "70%", marginRight: "auto", overflow: "hidden", wordWrap: "break-word", whiteSpace: "normal" }}>
      {
        text && <div>{text}</div>
      }
      {
        file && <a href={file?.url} className='' target='_blank'>{file?.name}</a>
      }

    </div>
  )
}

export default ReceivedMessage