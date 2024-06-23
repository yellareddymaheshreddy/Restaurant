import { toast,Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

let toastdesign = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
}

const notifysuccess = (text,theme) => toast.success(`${text} !`, {...toastdesign,theme:theme});
const notifyfail = (text) => toast.error(`${text}!`, toastdesign);

export {notifyfail,notifysuccess}