import { useEffect, useRef } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
    const commentTextRef = useRef();
    const { sendRequest, status, error } = useHttp(addComment);

    const submitFormHandler = (event) => {
        event.preventDefault();
        // optional: Could validate here
        if (commentTextRef.current.value.trim() !== "") {
            // send comment to server
            sendRequest({
                quoteId: props.quoteId,
                commentData: {
                    text: commentTextRef.current.value,
                },
            })
        }
    };

    const onCommentAdd = props.onCommentAdd;

    useEffect(() => {
        if (status === "completed" && !error) {
            onCommentAdd();
        }
    }, [status, error, onCommentAdd]);

    return (
        <>
            {status === "pending" && <LoadingSpinner />}
            {status !== "pending" && (
                <form className={classes.form} onSubmit={submitFormHandler}>
                    <div className={classes.control} onSubmit={submitFormHandler}>
                        <label htmlFor="comment">Your Comment</label>
                        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
                    </div>
                    <div className={classes.actions}>
                        <button className="btn" type="submit">
                            Add Comment
                        </button>
                    </div>
                </form>
            )}
        </>
    );
};

export default NewCommentForm;
