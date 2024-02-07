import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import Rating from "../Components/Rating";
import axios from "axios";

const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch product. Status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(id, qty));
    navigate('/cart');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }


  return (
    <Row className="mt-5">
      <Col md={6}>
        <Image src={product.image} alt={product.name} fluid></Image>
      </Col>

      <Col md={4}>
        <ListGroup variant="flush">
          <ListGroup.Item className="mt-5 text-center">
            <h3><strong>{product.name}</strong></h3>
          </ListGroup.Item>

          <ListGroup.Item>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color={"#f8e825"}
            />
          </ListGroup.Item>

          <ListGroup.Item className="text-center">
            <Row>
              <Col>Price:</Col>
              <Col>
                <strong>${product.price}</strong>
              </Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item className="text-center">
            <Row>
              <Col>Quantity:</Col>
              <Col>
                <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item className="text-center">
            <Row>
              <Col>Description:</Col>
              <Col>{product.description}</Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item className="text-center">
            <Row>
              <Col>Availabiity:</Col>
              <Col>
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item className="items-center">
            <Row>
              <Button
                onClick={handleAddToCart}
                className="btn-block"
                type="button"
                disabled={product.countInStock === 0}
              >
                Add to Cart!
              </Button>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Col>

      <Link to="/" className="border border-black btn btn-light my-3 mt-5">
        Go Back
      </Link>
    </Row>
  );
};

export default ProductScreen;
