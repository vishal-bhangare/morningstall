import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div>
      <h3>
        {isRouteErrorResponse(error)
          ? "This page does not exist."
          : "An unexpected error occurred."}
      </h3>
    </div>
  );
};

export default ErrorPage;
