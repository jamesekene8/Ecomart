import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Loading from "./components/Loading/Loading";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

const HomePage = React.lazy(() => import("./pages/Home"));
const Product = React.lazy(() => import("./pages/Product"));
const Category = React.lazy(() => import("./pages/Category"));
const Blog = React.lazy(() => import("./pages/Blog"));
const Post = React.lazy(() => import("./pages/Post"));

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route
            index
            element={
              <Loading>
                <HomePage />
              </Loading>
            }
          />
          <Route
            path="contact-us"
            element={
              <Loading>
                <Contact />
              </Loading>
            }
          />
          <Route
            path="register"
            element={
              <Loading>
                <Register />
              </Loading>
            }
          />
          <Route
            path="login"
            element={
              <Loading>
                <Login />
              </Loading>
            }
          />
          <Route
            path="cart"
            element={
              <Loading>
                <Cart />
              </Loading>
            }
          />
          <Route path="product">
            <Route
              path=":slug"
              element={
                <Loading>
                  <Product />
                </Loading>
              }
            />
          </Route>
          <Route path="blog">
            <Route
              index
              element={
                <Loading>
                  <Blog />
                </Loading>
              }
            />
            <Route
              path=":slug"
              element={
                <Loading>
                  <Post />
                </Loading>
              }
            />
          </Route>
          <Route path="category">
            <Route
              path=":type"
              element={
                <Loading>
                  <Category />
                </Loading>
              }
            />
          </Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
