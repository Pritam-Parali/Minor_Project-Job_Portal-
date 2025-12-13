import React, { useState } from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import Swal from "sweetalert2";
import { createJob } from "../api/jobService";


function FormExample() {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  // ✅ ALL FIELDS + FILE
  const [jobData, setJobData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    state: "",
    zip: "",
    domain: "",
    companyName: "",
    jobLocation: "",
    salary: "",
    jobType: "",
    experienceLevel: "",
    qualifications: "",
    skills: "",
    description: "",
    applicationDeadline: "",
    startDate: "",
    workHours: "",
    remoteOption: "",
    companyWebsite: "",
    contactNumber: "",
  });

  // text/select handler
  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  // file handler
  const handleFileChange = (e) => {
    setJobData({ ...jobData, jobFile: e.target.files[0] });
  };

  // submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(jobData).forEach((key) => {
        if (jobData[key] !== null) {
          formData.append(key, jobData[key]);
        }
      });

      await createJob(formData);

      Swal.fire({
        icon: "success",
        title: "Job Posted",
        text: "Job saved successfully",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/job"); 
      });

      setValidated(false);
    } catch (error) {
      Swal.fire("Error", "Job not saved", "error");
      console.error(error);
    }
  };

  return (
    <>
      <h6 className="heading">Job posting Details</h6>

      <div className="form-page">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {/* BASIC INFO */}
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                name="firstName"
                value={jobData.firstName}
                onChange={handleChange}
                placeholder="First name*"
              />
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Last name*</Form.Label>
              <Form.Control
                required
                name="lastName"
                value={jobData.lastName}
                onChange={handleChange}
                placeholder="Last name*"
              />
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Email id*</Form.Label>
              <InputGroup>
                <InputGroup.Text>@</InputGroup.Text>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  value={jobData.email}
                  onChange={handleChange}
                  placeholder="Email id"
                />
              </InputGroup>
            </Form.Group>
          </Row>

          {/* LOCATION */}
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>City</Form.Label>
              <Form.Control
                required
                name="city"
                value={jobData.city}
                onChange={handleChange}
                placeholder="City"
              />
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>State</Form.Label>
              <Form.Control
                required
                name="state"
                value={jobData.state}
                onChange={handleChange}
                placeholder="State"
              />
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                required
                name="zip"
                value={jobData.zip}
                onChange={handleChange}
                placeholder="Zip"
              />
            </Form.Group>
          </Row>

          {/* JOB DETAILS */}
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>Domain*</Form.Label>
              <Form.Control
                required
                name="domain"
                value={jobData.domain}
                onChange={handleChange}
                placeholder="Type Domain"
              />
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Company name*</Form.Label>
              <Form.Control
                required
                name="companyName"
                value={jobData.companyName}
                onChange={handleChange}
                placeholder="Type Company Name here"
              />
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Job Location*</Form.Label>
              <Form.Control
                required
                name="jobLocation"
                value={jobData.jobLocation}
                onChange={handleChange}
                placeholder="Location"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>Salary*</Form.Label>
              <Form.Control
                required
                type="number"
                name="salary"
                value={jobData.salary}
                onChange={handleChange}
                placeholder="Salary in LPA (e.g 10Lpa)"
              />
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Job Type</Form.Label>
              <Form.Select
                required
                name="jobType"
                value={jobData.jobType}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Internship</option>
                <option>Contract</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Experience Level</Form.Label>
              <Form.Select
                required
                name="experienceLevel"
                value={jobData.experienceLevel}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option>Entry-level</option>
                <option>Mid-level</option>
                <option>Senior</option>
              </Form.Select>
            </Form.Group>
          </Row>

          {/* EXTRA DETAILS */}
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>Required Qualifications</Form.Label>
              <Form.Control
                name="qualifications"
                value={jobData.qualifications}
                onChange={handleChange}
                placeholder="e.g., B.Tech, MCA, MBA"
              />
            </Form.Group>

            <Form.Group as={Col} md="6">
              <Form.Label>Skills Required</Form.Label>
              <Form.Control
                name="skills"
                value={jobData.skills}
                onChange={handleChange}
                placeholder="e.g., Python, Excel, Communication"
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Job Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={jobData.description}
              onChange={handleChange}
              placeholder="Brief overview of responsibilities"
            />
          </Form.Group>

          {/* DATES & OTHER */}
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>Application Deadline</Form.Label>
              <Form.Control
                type="date"
                name="applicationDeadline"
                value={jobData.applicationDeadline}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={jobData.startDate}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Work Hours</Form.Label>
              <Form.Control
                name="workHours"
                value={jobData.workHours}
                onChange={handleChange}
                placeholder="e.g., 9 AM – 6 PM"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>Remote Option</Form.Label>
              <Form.Select
                name="remoteOption"
                value={jobData.remoteOption}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option>Yes</option>
                <option>No</option>
                <option>Hybrid</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Company Website</Form.Label>
              <Form.Control
                type="url"
                name="companyWebsite"
                value={jobData.companyWebsite}
                onChange={handleChange}
                placeholder="https://google.com"
              />
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="tel"
                name="contactNumber"
                value={jobData.contactNumber}
                onChange={handleChange}
                placeholder="e.g., +91-98XXXXXX10"
              />
            </Form.Group>
          </Row>

          

          <Button type="submit">Submit form</Button>
        </Form>
      </div>
    </>
  );
}

export default FormExample;
