import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type CustomDialogProps = React.PropsWithChildren<{
  open: boolean;
  handleOpen: (e: any) => any;
  options: { title: string; handler: () => void }[];
}>;

const Dialog = ({ open, handleOpen, options }: CustomDialogProps) => {
  return (
    <div className="dialog position-relative">
      <div onClick={() => handleOpen(!open)} className="dots">
        <FontAwesomeIcon icon={faEllipsisH} />
      </div>

      <div
        className={`dialog-container p-2 position-absolute flex-column ${
          open ? "d-flex" : "d-none"
        }`}
      >
        {options &&
          options.map(
            (option: { title: string; handler: () => void }, idx: number) => (
              <span
                onClick={() => {
                  option.handler();
                  handleOpen(false);
                }}
                key={idx}
              >
                {option.title}
              </span>
            )
          )}
      </div>
    </div>
  );
};

export default Dialog;
