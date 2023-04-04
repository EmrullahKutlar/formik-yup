import "./App.css";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function App() {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [currentStep, setCurrentStep] = useState(0);
  const makeRequest = (data) => {
    console.log("Form submited", data);
  };

  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));

    if (final) {
      makeRequest(newData);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };
  const handlePrevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <StepOne next={handleNextStep} data={data} />,
    <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} />,
  ];

  console.log(data);

  return <div className="App">{steps[currentStep]}</div>;
}

export default App;

const stepOneValidationSchema = Yup.object({
  first_name: Yup.string().required("İsim zorunlu"),
  last_name: Yup.string().required("Soyisim zorunlu"),
});

const StepOne = ({ data, next }) => {
  const handleSubmit = (values) => {
    console.log(values);
    next(values);
  };
  return (
    <Formik
      validationSchema={stepOneValidationSchema}
      initialValues={data}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <p> First Name</p>
          <Field name="first_name" />
          <ErrorMessage name="first_name" />
          <br />
          <p> Last Name</p>
          <Field name="last_name" />
          <ErrorMessage name="last_name" />

          <br />
          <br />
          <button type="submit">Next</button>
        </Form>
      )}
    </Formik>
  );
};

const stepTwoValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email Zorunlu"),
  password: Yup.string().required("Şifre zorunlu"),
});

const StepTwo = ({ data, prev, next }) => {
  const handleSubmit = (values) => {
    console.log(values);
    next(values, true);
  };

  return (
    <Formik validationSchema={stepTwoValidationSchema} initialValues={data} onSubmit={handleSubmit}>
      {(formProps) => (
        <Form>
          <p> Email</p>
          <Field name="email" />
          <ErrorMessage name="email" />

          <br />
          <p> Passwword</p>
          <Field name="password" type="password"/>
          <ErrorMessage name="password" />
          <br />
          <br />
          <button
            type="button"
            style={{ marginRight: "2rem" }}
            onClick={() => {
              prev(formProps.values);
            }}
          >
            Back
          </button>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
