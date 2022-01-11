import { useCallback, useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './Comments.module.css';
import CommentsList from './CommentsList';
import NewCommentForm from './NewCommentForm';

const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const {sendRequest, data:comments, status, error} = useHttp(getAllComments, true);
  const quoteId = props.quoteId;

  const commentAddHandler = useCallback(() => {
      sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };


  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId])

  if(status === "pending"){
    return <div className='centered'><LoadingSpinner /></div>
  }

  if(status === "error"){
    return <p className='centered focused'>{error}</p>
  }

  if(status === "completed" && (!comments || comments.length === 0)){
    return <NewCommentForm quoteId={props.quoteId} onCommentAdd={commentAddHandler} />;
  }

  return (
      <section className={classes.comments}>
          <h2>User Comments</h2>
          <CommentsList comments={comments} />
          {!isAddingComment && (
              <button className="btn" onClick={startAddCommentHandler}>
                  Add a Comment
              </button>
          )}
          {isAddingComment && <NewCommentForm quoteId={props.quoteId} onCommentAdd={commentAddHandler} />}
      </section>
  );
};

export default Comments;
