
import { FC } from "react";

export const Paragraph: FC<{ content: string }> = ({ content }) => {
  return (
    <div className="mt-8 text-gray-700">
        {content}
    </div>
  );
}
