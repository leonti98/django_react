import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertDismissible({ message }) {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  return (
    <div className="mt-3">
      <Alert show={show} variant="success">
        <Alert.Heading>{message}</Alert.Heading>
        <hr />
        <div className="d-flex justify-content-start">
          <Button onClick={handleClose} variant="outline-success">
            Close me
          </Button>
        </div>
      </Alert>
    </div>
  );
}

export default AlertDismissible;
