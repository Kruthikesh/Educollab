import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import "./AddProject.css";

const AddProject = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  // Initial values for the form fields
  const initialValues = {
    title: '',
    description: '',
    status: 'ongoing', // Default status
    credits: '',
    tags: [''], // Start with one empty tag field
  };

  const handleSubmit = async (values) => {
    try {
      if(values.credits>(user.creditScore)/10){
        alert('Per head credits CANNOT be more than 10% of your credit score');
        return;
      }
      const response = await fetch(`http://localhost:5500/projects/add/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        // If the response is not OK, throw an error with the response's status text
        throw new Error(`Failed to add project: ${response.statusText}`);
      }

      // Assuming your API returns the created project including its ID
      const newProjectData = await response.json();

      alert('Project added successfully');

      // Optionally, here you can update userData in localStorage with the new project ID
      // Ensure to handle this safely in production code

      // Redirect to the dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error adding project:', error);
      alert(`Error adding project: ${error.message}`);
    }
  };

  return (
    <div className="add-project-container">
      <h2 className="add_project_heading">Add Project</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values }) => (
          <Form className="add-project-form">
            <div className="form-group">
              <label htmlFor="title" className="form-label">Title:</label>
              <Field id="title" name="title" type="text" className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">Description:</label>
              <Field id="description" name="description" as="textarea" className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="status" className="form-label">Status:</label>
              <Field as="select" name="status" className="form-control">
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </Field>
            </div>
            <div className="form-group">
              <label htmlFor="title" className="form-label">Github Link:</label>
              <Field id="gitlink" name="githubLink" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="title" className="form-label">Deployed Link:</label>
              <Field id="deplink" name="deployedLink" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="credits" className="form-label">Per Head Credits:</label>
              <Field id="credits" name="credits" type="number" className="form-control" />
            </div>

            <div className="form-group">
              <label className="form-label">Tags:</label>
              <FieldArray name="tags">
                {({ remove, push }) => (
                  <div>
                    {values.tags.map((tag, index) => (
                      <div key={index} className="tag-field-group">
                        <Field name={`tags[${index}]`} type="text" className="form-control" />
                        <ErrorMessage name={`tags[${index}]`} component="div" className="error-message" />
                        {values.tags.length > 1 && (
                          <button type="button" className="tag-remove-btn" onClick={() => remove(index)}>
                            Remove Tag
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" className="tag-add-btn" onClick={() => push('')}>
                      Add Tag
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            <button type="submit" className="submit-btn">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProject;
