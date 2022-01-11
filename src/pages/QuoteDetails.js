import { useEffect } from "react";
import { Link, Redirect, Route } from "react-router-dom";
import { useParams, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

const QuoteDetails = () => {
    const params = useParams();
    const match = useRouteMatch();

    const { sendRequest, status, data: quote, error } = useHttp(getSingleQuote, true);

    useEffect(() => {
        sendRequest(params.quoteId);
    }, [sendRequest, params.quoteId]);

    if (status === "pending") {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }

    if (status === "error") {
        return <div className="centered focused">{error}</div>;
    }

    if (status === "completed" && quote.text) {
        <Redirect to="/notFound" />;
    }

    return (
        <>
            <HighlightedQuote text={quote.text} author={quote.author} />
            <Route path={`${match.path}`} exact>
                <div className="centered">
                    <Link className="btn--flat" to={`${match.url}/comments`}>
                        Load comments
                    </Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments quoteId={params.quoteId}></Comments>
            </Route>
        </>
    );
};

export default QuoteDetails;
