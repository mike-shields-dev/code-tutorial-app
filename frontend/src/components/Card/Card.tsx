import React, { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLElement> {}

const Card = ({ children, ...props }: CardProps) => {
  return <div {...props}>{children}</div>;
};

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {}
Card.Title = ({ children, ...props }: TitleProps) => (
  <h2 {...props}>{children}</h2>
);

interface DescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}
Card.Description = ({ children, ...props }: DescriptionProps) => (
  <p {...props}>{children}</p>
);

export default Card;
