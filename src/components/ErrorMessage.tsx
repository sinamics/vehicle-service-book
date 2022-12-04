import React from "react";

type Props = {
  error?: string;
};

const ErrorMessage: React.FC<Props> = ({ error }) => {
  return (
    <div className="mt-2 min-h-[16px] text-xs text-red-600 dark:text-red-500">
      {error}
    </div>
  );
};

export default ErrorMessage;
