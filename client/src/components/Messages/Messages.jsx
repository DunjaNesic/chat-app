import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from '../Message/Message'
import { css } from '@emotion/css';

function Messages(props) {
  const ROOT_CSS = css({
    height: 300,
  });
  return (
    <ScrollToBottom className={ROOT_CSS}>
        {props.messages.map((message, i)=><div key={i}>
        <Message message={message} name={props.name}/>
        </div>)}
    </ScrollToBottom>
  )
}

export default Messages