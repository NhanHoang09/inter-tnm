import { AiFillHome } from "react-icons/ai";
import { AiFillMail } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

function Navigation({ showNav, setShowNav }) {
  const rotate = {
    transform: "rotate(-90deg)",
    transition: "transform 0.4s ease-in",
  }
  return (
    <>
      <div className="circle-container">
        <div className="circle" style={showNav ? rotate : null}>
          <button className="close" onClick={() => setShowNav(!showNav)}>
            <FaTimes />
          </button>
          <button className="open" onClick={() => setShowNav(!showNav)}>
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
