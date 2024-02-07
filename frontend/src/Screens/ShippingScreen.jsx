import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Card, Button, Form } from "react-bootstrap";
import Message from "../Components/Message";
import { saveShippingAddress } from "../actions/cartActions";

function ShippingScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const calculateTotal = () => {
    return cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (cart && cart.shippingAddress) {
      dispatch(saveShippingAddress({ address, city, postalCode, country }));
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify({ address, city, postalCode, country })
      );
      navigate("/payment");
    }
  };

  return (
    <Row className="mt-5 mb-5">
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item className="mb-3">
            <h2>Shipping</h2>
            <p>
              <strong>Shipping Details:</strong>{" "}
              {cart.shippingAddress ? (
                <>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.postalCode},{" "}
                  {cart.shippingAddress.country}
                </>
              ) : (
                "No shipping address provided"
              )}
            </p>
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message variant="info">Your cart is empty</Message>
            ) : (
              <ListGroup variant="flush">
                {cart.cartItems.map((item, index) => (
                  <ListGroup.Item key={index} className="my-2">
                    <Row className="align-items-center">
                      <Col md={3} className="text-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                          className="img-thumbnail"
                        />
                      </Col>

                      <Col as='h4'>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      
                      <Col md={4} as='h3'>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>

          <Col className="mt-3 text-center">
            <h3><strong>Total:</strong> ${calculateTotal()}</h3>
          </Col>
        </ListGroup>

      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush" className='mt-3 mb-3'>
            <ListGroup.Item>
              <h2>Information</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    className="mb-3"
                    type="text"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    className="mb-3"
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="postalCode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    className="mb-3"
                    type="text"
                    placeholder="Enter postal code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    className="mb-3"
                    type="text"
                    placeholder="Enter country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit" variant="primary">
                  Proceed
                </Button>
              </Form>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default ShippingScreen;
