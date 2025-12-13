import React, { useState } from "react";
import Navbar from "./Navbar";
import './Form.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function FormExample() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
      <div>
        <h6 className="heading">Job posting Details</h6>
      </div>
      <div className="form-page">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control required type="text" placeholder="First name*" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Last name*</Form.Label>
              <Form.Control required type="text" placeholder="Last name*" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Email id*</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control type="email" placeholder="Email id" required />
                <Form.Control.Feedback type="invalid">
                  Please choose a valid email.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="City" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom04">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="State" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom05">
              <Form.Label>Zip</Form.Label>
              <Form.Control type="text" placeholder="Zip" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid zip.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom06">
              <Form.Label>Domain*</Form.Label>
              <Form.Control required type="text" placeholder="Type Domain" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom07">
              <Form.Label>Company name*</Form.Label>
              <Form.Control required type="text" placeholder="Type Company Name here" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom08">
              <Form.Label>Job Location*</Form.Label>
              <Form.Control required type="text" placeholder="Location" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom09">
              <Form.Label>Salary*</Form.Label>
              <Form.Control required type="number" placeholder="Salary" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom10">
              <Form.Label>Job Type</Form.Label>
              <Form.Select required>
                <option value="">Select...</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Internship</option>
                <option>Contract</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom11">
              <Form.Label>Experience Level</Form.Label>
              <Form.Select required>
                <option value="">Select...</option>
                <option>Entry-level</option>
                <option>Mid-level</option>
                <option>Senior</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom12">
              <Form.Label>Required Qualifications</Form.Label>
              <Form.Control type="text" placeholder="e.g., B.Tech, MCA, MBA" />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom13">
              <Form.Label>Skills Required</Form.Label>
              <Form.Control type="text" placeholder="e.g., Python, Excel, Communication" />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom14">
              <Form.Label>Job Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Brief overview of responsibilities" />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom15">
              <Form.Label>Application Deadline</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom16">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom17">
              <Form.Label>Work Hours</Form.Label>
              <Form.Control type="text" placeholder="e.g., 9 AM – 6 PM" />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom18">
              <Form.Label>Remote Option</Form.Label>
              <Form.Select>
                <option value="">Select...</option>
                <option>Yes</option>
                <option>No</option>
                <option>Hybrid</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom19">
              <Form.Label>Company Website</Form.Label>
              <Form.Control type="url" placeholder="https://google.com" />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom20">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control type="tel" placeholder="e.g., +91-98XXXXXX10" />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom21">
              <Form.Label>Upload Job Description File</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group>

          <Button type="submit">Submit form</Button>
        </Form>
      </div>
    </>
  );
}

export default FormExample;
