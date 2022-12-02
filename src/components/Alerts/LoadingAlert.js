import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PuffLoader from "react-spinners/PuffLoader";
import ColorPalette from "../../styles/ColorPalette";

const LoadingAlert = (text) => {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    width: "40%",
    title: (
      <div className={gstyles["alert-loader"]}>
        <PuffLoader color={ColorPalette.purple.primary} size="4vw" />
      </div>
    ),
    text: text,
    showConfirmButton: false,
    showCancelButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
  });
};

export default LoadingAlert;
