import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type CustomDialogProps = React.PropsWithChildren<{
  open: boolean;
  handleOpen: (open: boolean) => any;
  options: { title: string; handler: () => void }[];
}>;

const Dialog = ({ open, handleOpen, options }: CustomDialogProps) => {
  return (
    <div className="dialog position-relative">
      <div onClick={() => handleOpen(!open)} className="dots">
        <FontAwesomeIcon icon={faEllipsisH} />
      </div>

      <div
        className={`dialog-container p-2 position-absolute ${
          open ? "d-block" : "d-none"
        }`}
      >
        {options &&
          options.map(
            (option: { title: string; handler: () => void }, idx: number) => (
              <span onClick={option.handler} key={idx}>
                {option.title}
              </span>
            )
          )}
      </div>
    </div>
  );
};

export default Dialog;
