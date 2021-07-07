import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HeaderMenu from "./components/HeaderMenu";
import background from "./images/background.jpg";

// login and authenticated route
import Authenticate from "./components/Authenticate";
import AuthRoute from "./components/AuthRoute";

// Main pages. Use below in items to include in header menu
import NewsGrid from "./components/NewsGrid";
import Survey from "./components/Survey";

// Change to add new components to the header
// The first item will be the opening page after login
const items = [
  { label: "News", path: "/newsgrid", Component: NewsGrid },
  { label: "Survey", path: "/survey", Component: Survey },
];

const App = () => {
  const createNavigation = (items) => {
    return items.map((item) => {
      return <AuthRoute key={item.path} path={item.path} Component={item.Component} />;
    });
  };

  return (
    <div
      style={{
        background: "#DBBC9B",
        backgroundImage: `url(${background})`,
        height: "100vh",
        backgroundSize: "100% 100%",
      }}
    >
      <BrowserRouter>
        <HeaderMenu items={items}>
          <Switch>
            <Route exact path={"/"} render={() => <Authenticate items={items} />} />
            {createNavigation(items)}
          </Switch>
        </HeaderMenu>
      </BrowserRouter>
    </div>
  );
};

export default App;
