import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";
import products from "../components/Product";
import { useState, useEffect } from "react";
import { Row, Col, Button, Card, Image, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import axios from "axios";

function ProductDetails() {
  const { id: productId } = useParams();

  const [product, setProduct] = useState(null); // use null instead of []

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/${productId}`); // fixed typo: 'prodict' -> 'products'
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null); // explicitly set null if product not found or error
      }
    };
    fetchData();
  }, [productId]);

  if (!product) {
    return <h2>Product not found</h2>;
  }
  return (
    <>
      <Link className="btn btn-light my-4" to="/">
        Go Back
      </Link>

      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} Reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ₹{product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>₹{product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ProductDetails;
