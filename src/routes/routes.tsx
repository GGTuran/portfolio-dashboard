import App from "@/App";
import BlogContainer from "@/components/ManageBlogs/BlogContainer";
import ExperienceContainer from "@/components/ManageExperience/ExperienceContainer";
import ProjectContainer from "@/components/ManageProjects/ProjectContainer";
import SkillContainer from "@/components/ManageSkills/SKillContainer";
import AboutUs from "@/pages/AboutUs";
import Contact from "@/pages/Contact";
import Error from "@/pages/Error";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router-dom";
// import ProductDetails from "@/pages/ProductDetails";
// import AllProducts from "@/pages/AllProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/projects",
        element: <ProjectContainer></ProjectContainer>,
      },
      {
        path: "/blogs",
        element: <BlogContainer></BlogContainer>,
      },
      {
        path: "/skills",
        element: <SkillContainer></SkillContainer>,
      },
      {
        path: "/experiences",
        element: <ExperienceContainer></ExperienceContainer>,
      },
      // {
      //   path: "/products/:productId",
      //   element: <ProductDetails></ProductDetails>,
      // },
    ],
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Register></Register>,
  },
]);

export default router;
