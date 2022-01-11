import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isSortingAscending = !searchParams.get("sort") || searchParams.get("sort") === "asc";

  const toggleSort = () => {
    const direction = isSortingAscending ? "desc":"asc";
    //history.push(`${location.pathname}?sort=${direction}`);
    history.push({
      pathname: location.pathname,
      search: `?sort=${direction}`
    })
  }
  let quotes = props.quotes.sort((a, b) => {
    return isSortingAscending ? a.text.toLowerCase() > b.text.toLowerCase() : b.text.toLowerCase() > a.text.toLowerCase();
  });

  return (
      <Fragment>
          <div className={classes.sorting}>
              <button onClick={toggleSort}>Sort {isSortingAscending?"Ascending":"Descending"}</button>
          </div>
          <ul className={classes.list}>
              {quotes.map((quote) => (
                  <QuoteItem key={quote.id} id={quote.id} author={quote.author} text={quote.text} />
              ))}
          </ul>
      </Fragment>
  );
};

export default QuoteList;
