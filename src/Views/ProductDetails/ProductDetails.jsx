import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebaseconfig';
import { Button, Card, Form, Spinner, Alert, Container, Row, Col } from 'react-bootstrap';
import { ArrowLeft, Pencil, Trash, Check, X } from 'react-bootstrap-icons';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    productCategory: '',
    productPrice: '',
    productStock: '',
    productImage: ''
  });

  const fetchProductDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const productDocRef = doc(db, "tcs-products", id);
      const productDocSnapshot = await getDoc(productDocRef);
      
      if (productDocSnapshot.exists()) {
        const productData = productDocSnapshot.data();
        setProduct({ 
          id: productDocSnapshot.id,
          ...productData 
        });
        setFormData({
          productName: productData.productName || '',
          productDescription: productData.productDescription || '',
          productCategory: productData.productCategory || '',
          productPrice: productData.productPrice || '',
          productStock: productData.productStock || '',
          productImage: productData.productImage || ''
        });
      } else {
        setError("Product not found in TCS inventory");
      }
    } catch (error) {
      console.error("Error fetching TCS product details:", error);
      setError("Failed to load product details from TCS database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const handleDeleteProduct = async () => {
    if (!window.confirm("Are you sure you want to delete this TCS product?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'tcs-products', id));
      navigate('/tcs-products', { state: { message: 'TCS product deleted successfully' } });
    } catch (error) {
      console.error('Error deleting TCS product:', error);
      setError("Failed to delete TCS product from inventory");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const productDocRef = doc(db, 'tcs-products', id);
      await updateDoc(productDocRef, {
        ...formData,
        productPrice: parseFloat(formData.productPrice),
        productStock: parseInt(formData.productStock)
      });
      setIsEditing(false);
      fetchProductDetails();
    } catch (error) {
      console.error('Error updating TCS product:', error);
      setError('Failed to update TCS product in inventory');
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading TCS product...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
        <Button variant="outline-primary" onClick={() => navigate('/tcs-products')}>
          <ArrowLeft /> Back to TCS Products
        </Button>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <Alert variant="warning" className="mt-4">
          TCS Product not found in inventory
        </Alert>
        <Button variant="outline-primary" onClick={() => navigate('/tcs-products')}>
          <ArrowLeft /> Back to TCS Products
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Button variant="outline-primary" onClick={() => navigate('/tcs-products')} className="mb-3">
        <ArrowLeft /> Back to TCS Products
      </Button>

      {isEditing ? (
        <Card>
          <Card.Header as="h4">Update TCS Product</Card.Header>
          <Card.Body>
            <Form onSubmit={handleUpdateProduct}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      name="productCategory"
                      value={formData.productCategory}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleInputChange}
                  required
                  rows={3}
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Price (₹)</Form.Label>
                    <Form.Control
                      type="number"
                      name="productPrice"
                      value={formData.productPrice}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Stock Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      name="productStock"
                      value={formData.productStock}
                      onChange={handleInputChange}
                      required
                      min="0"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="url"
                  name="productImage"
                  value={formData.productImage}
                  onChange={handleInputChange}
                  placeholder="https://example.com/tcs-product.jpg"
                />
              </Form.Group>

              <div className="d-flex gap-2">
                <Button variant="primary" type="submit">
                  <Check /> Save Changes
                </Button>
                <Button variant="outline-secondary" onClick={() => setIsEditing(false)}>
                  <X /> Cancel
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">TCS Product Details</h4>
            <div>
              <Button variant="outline-warning" onClick={() => setIsEditing(true)} className="me-2">
                <Pencil /> Edit
              </Button>
              <Button variant="outline-danger" onClick={handleDeleteProduct}>
                <Trash /> Delete
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                {product.productImage && (
                  <div className="mb-4">
                    <img 
                      src={product.productImage} 
                      alt={product.productName} 
                      className="img-fluid rounded"
                      style={{ maxHeight: '300px' }}
                    />
                  </div>
                )}
              </Col>
              <Col md={6}>
                <h2>{product.productName}</h2>
                <p className="text-muted">{product.productCategory}</p>
                
                <div className="my-4">
                  <h5 className="text-primary">₹{parseFloat(product.productPrice).toFixed(2)}</h5>
                  <p className={product.productStock > 0 ? 'text-success' : 'text-danger'}>
                    {product.productStock > 0 ? 'In Stock' : 'Out of Stock'} ({product.productStock} units)
                  </p>
                </div>

                <Card className="mb-4">
                  <Card.Header>Product Description</Card.Header>
                  <Card.Body>
                    <p>{product.productDescription}</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default ProductDetails;