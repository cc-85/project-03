import React from 'react';

const MessagesForm = ( {handleMessageSubmit, handleMessageChange, message } ) => {
  return (
    <form onSubmit={handleMessageSubmit}>

      <div className="field">
        <label className="label"> Message </label>
        <div className="control">
          <textarea
            className="textarea"
            name="content"
            placeholder="Message"
            onChange={handleMessageChange}
            value={ message.content || ''}
          />
        </div>
      </div>
      <button className="button is-primary"> Submit </button>

    </form>
  );
};

export default MessagesForm;
