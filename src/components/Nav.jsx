import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Modal } from "./reuse/Modal";
import { Button } from "./reuse/Button";
import Authenticate from "./Authenticate";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <nav className="bg-dark-100 relative text-white shadow-lg">
      <div className="container mx-auto px-2 h-16 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-white flex items-center gap-4"
        >
          <svg
            fill="#ffffff"
            height="36px"
            width="36px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 210.234 210.234"
            xmlSpace="preserve"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M105.117,0C47.155,0,0,47.155,0,105.117c0,57.962,47.155,105.117,105.117,105.117s105.117-47.155,105.117-105.117 C210.234,47.155,163.079,0,105.117,0z M105.117,202.3c-53.589,0-97.183-43.596-97.183-97.183 c0-53.587,43.594-97.184,97.183-97.184S202.3,51.53,202.3,105.117C202.3,158.704,158.706,202.3,105.117,202.3z"></path>{" "}
                    <path d="M172.67,81.995c-1.154-0.724-2.607-0.8-3.839-0.205l-25.097,12.212v-2.739c0-10.953-8.894-19.862-19.829-19.862H55.529 C44.594,71.4,35.7,80.31,35.7,91.262v35.642c0,10.953,8.894,19.862,19.829,19.862h68.375c10.935,0,19.829-8.91,19.829-19.862 v-0.24l25.097,12.212c1.232,0.599,2.681,0.521,3.839-0.205c1.159-0.724,1.864-1.995,1.864-3.363V85.357 C174.533,83.989,173.828,82.719,172.67,81.995z M166.6,128.967l-25.098-12.212c-1.228-0.599-2.685-0.521-3.839,0.205 c-1.158,0.724-1.863,1.995-1.863,3.363v6.581c0,6.578-5.338,11.929-11.896,11.929H55.529c-6.558,0-11.896-5.352-11.896-11.929 V91.262c0-6.578,5.338-11.929,11.896-11.929h68.375c6.558,0,11.896,5.351,11.896,11.929v9.08c0,1.367,0.705,2.638,1.863,3.363 c1.154,0.724,2.615,0.804,3.839,0.205L166.6,91.698V128.967z"></path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>
        </Link>

        <div className="hidden md:flex md:justify-between md:items-center space-x-6">
          <Link to="/movies" className="hover:text-white">
            Movies
          </Link>
          <Link to="/tvShows" className="hover:text-white">
            TVShows
          </Link>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-white py-2 px-3 text-dark-100 rounded-lg hover:bg-white"
            label={"Sign In"}
          />
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={24} />
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col items-center fixed top-16 w-full z-50 bg-dark-100 py-4 space-y-4">
          <Link
            to="/movies"
            className="hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Movies
          </Link>
          <Link
            to="/tv"
            className="hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            TV Shows
          </Link>
          <Button
            onClick={() => {
              setIsModalOpen(true);
              setIsOpen(false);
            }}
            className="bg-white px-4 py-2 rounded-lg hover:bg-white text-dark-100"
            label={"Sign In"}
          />
        </div>
      )}
      <Modal
        isModalOpen={isModalOpen}
        onModalClose={() => setIsModalOpen(false)}
        className="text-dark-100 mx-1.5"
      >
        <Authenticate isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
      </Modal>
    </nav>
  );
};
export default Nav;
