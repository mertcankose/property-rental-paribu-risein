import { FC } from "react";
import "./spinner.css";

interface IMiniLoading {
  className?: string;
}

const MiniLoading: FC<IMiniLoading> = ({ className, ...props }) => {
  return (
    <div className={["spinner-container", className].join(" ")} {...props}>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default MiniLoading;
