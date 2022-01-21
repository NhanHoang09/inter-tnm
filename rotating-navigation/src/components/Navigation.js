import { AiFillHome } from "react-icons/ai";
import { AiFillMail } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

function Navigation({showNav, setShowNav}) {


  return (
    <>
      
        <div className="circle-container">
          <div className="circle">
            <button id="close" onClick={() => setShowNav(!showNav)}>
              <FaTimes />
            </button>
            <button id="open" onClick={() => setShowNav(!showNav)}>
              <FaBars />
            </button>
          </div>
        </div>
      
      <nav>
        <ul>
          <li>
            <AiFillHome /> Home
          </li>
          <li>
            <BsFillPeopleFill />
            About
          </li>
          <li>
            <AiFillMail /> Contact
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
