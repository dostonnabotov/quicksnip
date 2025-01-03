import { createBrowserRouter } from "react-router-dom";

import Container from "@components/Container";
import SnippetList from "@components/SnippetList";

export const router = createBrowserRouter([
  {
    element: <Container />,
    children: [
      {
        path: "/",
        element: <SnippetList />,
      },
    ],
  },
]);
