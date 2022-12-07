import Portal from "./Portal";
import { HiOutlineInformationCircle } from "react-icons/hi";

const Backdrop = () => {
  return (
    <div className="fixed top-0 left-0 z-20 h-screen w-full bg-[#000000aa]" />
  );
};

const Modal = ({ onClick }) => {
  return (
    <>
      <Portal>
        <Backdrop />
      </Portal>
      <Portal>
        <div className="fixed top-0 left-0 z-30 flex h-screen w-full items-center justify-center font-balsamic">
          <div className="w-[340px] sm:w-[392px] md:w-[432px] sm:h-[432px] flex flex-col gap-6 rounded-lg bg-gray-900 text-gray-100 p-6">
            <h2 className="text-center text-3xl font-semibold flex items-center">
              <HiOutlineInformationCircle size="33" className="mr-1" />
              <span>Instruction</span>
            </h2>
            <ul className="list-disc list-inside">
              <li>
                The game is played on a grid that's 3 squares by 3 squares.
              </li>
              <li>
                You are X, your friend is O. Players take turns putting their
                marks in empty squares.
              </li>
              <li>
                The first player to get 3 of her marks in a row (up, down,
                across, or diagonally) is the winner.
              </li>
              <li>When all 9 squares are full, the game is over.</li>
            </ul>
            <div className="h-full flex items-end">
              <button
                className="w-full h-fit text-white bg-green-500 hover:bg-green-600 font-medium text-md rounded-md py-2.5 text-center"
                onClick={onClick}
              >
                I understand
              </button>
            </div>
          </div>
        </div>
      </Portal>
    </>
  );
};

export default Modal;
