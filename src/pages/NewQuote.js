import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import QuoteForm from "../components/quotes/QuoteForm";
import { addQuote } from "../lib/api";
import useHttp from "../hooks/use-http";
import { useEffect } from "react";

const NewQuote = () => {
    const history = useHistory();
    const {sendRequest, status}= useHttp(addQuote);
    const addQuoteHandler = (newQuote) => {
        sendRequest(newQuote);
    }

    useEffect(() => {
        if (status === 'completed'){
            history.push("/quotes");
        }
    }, [status, history])

    return <QuoteForm onAddQuote={addQuoteHandler} isLoading={status === "pending"} />;
}

export default NewQuote;