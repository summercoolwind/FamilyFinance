import React, { forwardRef } from "react";
import { Helmet } from "react-helmet";

interface SimpleProps<T extends string> {
  title: T;
  className: T;
}

interface Props {
  children: React.ReactNode;
}
type CombinedProps = Props & SimpleProps<string>;
const Page = forwardRef<HTMLButtonElement, CombinedProps>(
  ({ children, title = "", ...rest }, ref) => {
    return (
      <div {...rest}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {children}
      </div>
    );
  }
);

export default Page;
