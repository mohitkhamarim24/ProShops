import { useNavigate } from 'react-router-dom';
import {Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector,useDispatch} from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice';
import {logout} from '../slices/authSlice';
import logo from '../assets/logo.png'
const Header = () => {
const {cartItems} =useSelector((state) => state.cart);
const {userInfo} =useSelector((state) => state.auth);
const dispatch = useDispatch();
const navigate = useNavigate();

const [logoutApicall] = useLogoutMutation();

const logoutHandler = async()=> {
  try{
    await logoutApicall().unwrap();
    dispatch(logout());
    navigate('/login');
  }catch(err){
     console.log(err);
  }
}
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to ='/'>
          <Navbar.Brand>
            <img src={logo} alt="ProShop"/>
            ProShop
            </Navbar.Brand>
            </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            <LinkContainer to ='/cart'>
              <Nav.Link>
                <FaShoppingCart />Cart
                {
                
                cartItems.length > 0 && (
            <Badge pill bg='success' style={{marginleft: '5px'}}>
            {cartItems.reduce((a, c) => a+c.qty,0)}
            </Badge>
                )

                }
              </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                <NavDropdown.Item>
                  <LinkContainer to="/profile">
                    <span>Profile</span>
                  </LinkContainer>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
              
              ):(
                <LinkContainer to ='/login'>
                <Nav.Link>
                  <FaUser />Sign In
                </Nav.Link>
                </LinkContainer>
              )}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;

