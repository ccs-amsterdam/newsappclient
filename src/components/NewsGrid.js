import React, { useState, useEffect, useRef } from "react";
import { Card, Container, Dimmer, Header, Ref, Segment } from "semantic-ui-react";
import { fakeNewsItems } from "../data/fakedata";
import useWindowSize from "../hooks/useWindowSize";

const NewsGrid = () => {
  const windowSize = useWindowSize();
  const ref = useRef(null);
  const [tooWide, setTooWide] = useState(false);
  const [tooHigh, setTooHigh] = useState(false);

  const nRows = 3;
  const nColumns = 3;
  const allowScroll = false;

  const containerStyle = {
    paddingTop: "4em",
    paddingBottom: "5em",
    margin: "0",
    align: "middle",
  };

  const cardGroupStyle = {
    overflowX: "auto",
    minWidth: `${nColumns * 350}px`,
  };

  const newsItems = (nRows, nColumns) => {
    const items = fakeNewsItems(nRows * nColumns);
    return items.map((item) => {
      return <NewsGridItem item={item} />;
    });
  };

  useEffect(() => {
    const hasScrollY = ref.current.scrollHeight > windowSize.height;
    const hasScrollX = ref.current.scrollWidth > windowSize.width;
    if (!allowScroll) {
      setTooWide(hasScrollX);
      setTooHigh(hasScrollY);
    }
  }, [windowSize, allowScroll]);

  const resizeMessage = (tooWide, tooHigh) => {
    const template = (what) => (
      <p>
        Please increase the window {what} (or zoom out)
        <br />
        so that all items are visible
      </p>
    );
    if (tooWide && !tooHigh) return template("width");
    if (tooHigh && !tooWide) return template("height");
    if (tooHigh && !tooWide) return template("width and height");
  };

  return (
    <Ref innerRef={ref}>
      <Container centered style={containerStyle}>
        <Dimmer active={tooWide || tooHigh}>
          <h1>{resizeMessage(tooWide, tooHigh)}</h1>
        </Dimmer>
        <Card.Group centered stackable={allowScroll} itemsPerRow={nColumns} style={cardGroupStyle}>
          {newsItems(nRows, nColumns)}
        </Card.Group>
      </Container>
    </Ref>
  );
};

const HEADERHEIGHT = 50;
const SNIPPETHEIGHT = 75;

const NewsGridItem = ({ item }) => {
  // first decide on all options that we need
  // might also include a dimmer that asks to widen screen (to enforce a certain view)

  const headerRef = useRef(null);
  const [headerSize, setHeaderSize] = useState(15);

  const snippetRef = useRef(null);
  const [snippetSize, setSnippetSize] = useState(12);

  useEffect(() => {
    setHeaderSize(15);
    setSnippetSize(13);
  }, [item, setHeaderSize, setSnippetSize]);

  useEffect(() => {
    if (headerRef.current.scrollHeight > HEADERHEIGHT)
      setHeaderSize((old) => (old > 1 ? old - 1 : null));
    if (snippetRef.current.scrollHeight > SNIPPETHEIGHT)
      setSnippetSize((old) => (old > 1 ? old - 1 : null));
  }, [headerSize, snippetSize, setHeaderSize, setSnippetSize]);

  const onClick = () => {
    alert("click!");
  };

  const cardStyle = {
    //width: `300px`,
    maxWidth: `300px`,
    //height: `400px`,
    align: "right",
  };
  const headerStyle = {
    height: `${HEADERHEIGHT}px`,
    fontSize: `${headerSize}px`,
    overflow: "hidden",
  };
  const metaStyle = {
    height: "9%",
    fontSize: 12,
    paddingTop: "1%",
  };
  const imageBoxStyle = {
    padding: "0",
    margin: "0",
    border: "none",
    boxShadow: "none",
  };
  const imageStyle = {
    width: "100%",
    maxHeight: "250px",
    objectFit: "scale-down",
    objectPosition: "50% 50%",
    border: "2px solid",
    borderColor: "black",
  };
  const snippetStyle = {
    height: `${SNIPPETHEIGHT}px`,
    fontSize: `${snippetSize}px`,
    padding: "0",
    margin: "0",
    color: "black",
  };

  return (
    <Card fluid style={cardStyle} onClick={onClick}>
      <div style={{ padding: "5px" }}>
        <Card.Header style={headerStyle}>
          <Ref innerRef={headerRef}>
            <Header>{item.title}</Header>
          </Ref>
        </Card.Header>
        <Card.Meta style={metaStyle}>{item.date.toISOString().substring(0, 10)}</Card.Meta>
        <Segment style={imageBoxStyle}>
          <img style={imageStyle} src={item.image} alt={"Cannot load"} />
        </Segment>
        <Card.Content style={snippetStyle}>
          <Ref innerRef={snippetRef}>
            <p>{textSnippet(item.text, 150)}</p>
          </Ref>
        </Card.Content>
      </div>
    </Card>
  );
};

const textSnippet = (text, n) => {
  console.log(text);
  if (text.length <= n) return text;

  let trunced = text.substring(0, n);
  const lastIndex = trunced.lastIndexOf(" ");
  return trunced.substring(0, lastIndex) + "...";
};

export default NewsGrid;
