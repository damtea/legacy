import React, { useEffect, useState } from "react";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import {
  Form,
  Button,
  Segment,
  Container,
  Message,
  Header,
  Divider
} from "semantic-ui-react";

const oe = [
  { id: "BIOTECH/2/OE/14", name: "Cancer disease and its prevention " },
  { id: "BIOTECH/2/OE/16", name: "Cancer Disease and its Prevention " },
  {
    id: "BIOTECH/3/OE/25",
    name: "Tissue Culture of Economically Important Plants "
  },
  {
    id: "BOT/2/OE/01",
    name: "Biodiversity Prospecting & Natural Plant Products "
  },
  { id: "BOT/2/OE/02", name: "Microbial Biogeochemistry " },
  { id: "BOT/3/OE/03", name: "Biofertilizer Technology " },
  { id: "BOT/3/OE/04", name: "Wasterwater Microbiology and Management " },

  { id: "CHEM/2/OE/01", name: "Chemistry in Life " },
  { id: "CHEM/2/OE/01(i)", name: "Chemistry in Life " },
  { id: "CHEM/2/OE/01(ii)", name: "Medicinal Chemistry " },
  { id: "CHEM/2/OE/01iii", name: "Trace Analysis " },
  { id: "CHEM/2/OE/02", name: "Medicinal Chemistry " },

  { id: "CHEM/3/OE/02(i)", name: "Science of Aging and Its Prevention " },
  {
    id: "CHEM/3/OE/02iii)",
    name: "Analytical Techniques in Chemical Analysis "
  },
  { id: "COM/2/OE/08(A)", name: "Management of NGOs " },
  { id: "COM/2/OE/08B", name: "Creativity & Innovation " },
  { id: "COM/3/OE/15A", name: "Fundamentals of Personal Finance " },
  { id: "COM/3/OE/15B", name: "Entrepreneurship for Women " },
  {
    id: "ECO/2/OE/01",
    name: "Statistical Techniques and Tools for Research "
  },
  { id: "ECO/3/OE/02", name: "Women and Development " },
  { id: "EDN/2/OE/14", name: "Human Rights Education " },
  { id: "EDN/3/OE/21", name: "Peace Education " },
  { id: "ENG/2/OE/13", name: "Literature in Society - I " },
  { id: "ENG/2/OE/13(F)", name: "History of English Language-I" },
  { id: "ENG/2/OE/13(G)", name: "Introduction to Fiction " },
  { id: "ENG/3/OE/21(B)", name: "Introduction to Postcolonial Literature " },
  { id: "ENG/3/OE/21(C)", name: "Creative Writing and Translation Course " },
  { id: "ENG/3/OE/21(F)", name: "Literature in Society-II " },
  { id: "ENG/3/OE/21C", name: "Creative Writing and Translation Course " },

  { id: "ERD/2/OE/02", name: "Community Participation Methods" },
  { id: "ERD/2/OE/15", name: "Community Participation Method " },
  { id: "ERD/3/OE/03", name: "NGO and Rural Development " },
  { id: "ERD/3/OE/04", name: "Village Development Planning " },
  { id: "ERD/3/OE/14", name: "Village Development Planning " },
  { id: "EVS/2/OE/16", name: "Environmental Awareness " },
  { id: "EVS/3/OE/05", name: "Global Warming and Climate Change " },
  { id: "EVS/3/OE/24", name: "Global Warming & Climate Change " },
  { id: "FOR/2/OE/13", name: "Global Environmental Change & Forests " },
  { id: "FOR/2/OE/14", name: "Bamboo & Cane Management " },
  { id: "FOR/2/OE/22", name: "People and Forest " },
  { id: "FOR/3/OE/23", name: "Energy Plantation " },
  { id: "GEOG/2/OE/14", name: "Geography of North-East India " },
  { id: "GEOG/3/OE/21", name: "Geography of Mizoram " },

  { id: "GEOL/2/OE/16", name: "Fundamentals of Geology " },
  { id: "GEOL/3/OE/23", name: "Geohazards " },
  {
    id: "HAMP/2/OE/13",
    name: "Propagation & Nursery Management of Fruit crops "
  },
  {
    id: "HAMP/2/OE/13B",
    name: "Instrumentation Technology for Medicinal & Aromatic Plants "
  },
  { id: "HAMP/3/OE/22A", name: "Cultivation and Processing of Mushrooms " },
  { id: "HAMP/3/OE/22B", name: "Organic & Protected Farming " },
  { id: "HIN/2/OE/14", name: "Bolchal Ki Hindi " },
  { id: "HIN/3/OE/20", name: "Hindi Mein Rachanatmak Lehkhan " },
  {
    id: "HIST/2/OE/14(A)",
    name: "Introduction to Global Environmental History"
  },
  { id: "HIST/2/OE/14B", name: "Gender in History " },
  {
    id: "HIST/3/OE/15",
    name: "History of Science, Technology and Medicine in British India "
  },
  {
    id: "HIST/3/OE/21(A)",
    name: "History of Science, Technology and Medicine in Colonial India "
  },
  { id: "HIST/3/OE/21B", name: "Mizo Heritage " },
  { id: "LIS/2/OE/14", name: "E-Resources " },
  { id: "LIS/2/OE/21", name: "Community Information Service " },
  { id: "MACS/2/OE/11(B) ", name: "Computer Programming " },
  { id: "MACS/2/OE/11Y ", name: "Open Elective I " },
  { id: "MACS/3/OE/17(a) ", name: "Graphy Theory " },
  { id: "MACS/3/OE/17B", name: "Software Application " },
  { id: "MACS/3/OE/17Y", name: "Open Elective II " },
  { id: "MACS/3/OE/19a", name: "Graph Theory " },
  { id: "MACS/3/OE/19b", name: "Matrix Computations " },
  { id: "MACS/3/OE/19c", name: "Probability Theory " },
  { id: "MACS/3/OE/19d", name: "Software Applications " },
  { id: "MBA/2/OE/01", name: "Social Entrepreneurship " },

  { id: "MBA/3/OE/02", name: "Carbon Finance " },
  { id: "MBA/3/OE/24", name: "Carbon Finance " },
  { id: "MIZ/2/OE/13", name: "Mizo Material Culture " },
  { id: "MIZ/3/OE/19", name: "Mizo Customary Law " },
  { id: "MJMC/2/OE/12", name: "Media Campaign Planning " },
  { id: "MJMC/2/OE/15", name: "Media Campaign Planning " },
  { id: "MJMC/3/OE/21", name: "Film Appreciation " },
  { id: "PHY/2/OE/12", name: "Basic Astronomy " },
  { id: "PHY/2/OE/12(E)", name: "Basic Astronomy " },
  { id: "PHY/2/OE/12A", name: "Fundamentals of Material Science " },
  { id: "PHY/2/OE/12B", name: "Electronic Devices " },
  { id: "PHY/2/OE/12C", name: "Basic Astronomy " },
  { id: "PHY/3/OE/20(a)", name: "Radiation Physics " },
  { id: "PHY/3/OE/20(b)", name: "Basics of Atmospheric Science " },
  { id: "PHY/3/OE/20(c)", name: "Communication Systems " },
  { id: "POL/2/OE/13", name: "Sixth Schedule to the Constitution of India " },
  { id: "POLS/3/OE/13", name: "Ethnicity and Identity in Mizoram" },
  { id: "POLS/3/OE/19", name: "Politics of Social Exclusion " },
  { id: "PSY/2/OE/14(B)", name: "Self and Personal Growth " },
  { id: "PSY/2/OE/14A", name: "Positive Psychology " },
  { id: "PSY/2/OE/14B", name: "Self and Personal Growth" },
  { id: "PSY/3/OE/20A", name: "Psychology of Emotion " },
  {
    id: "PSY/3/OE/20B",
    name: "Psychological Perspectives of Gender Differences "
  },
  { id: "PUB/2/OE/01(ii)", name: "Concept of Rural Development " },
  { id: "PUB/2/OE/09", name: "Rural Development and Administration " },
  { id: "PUB/2/OE/14", name: "Rural Development Administration in India " },
  { id: "PUB/3/OE/21", name: "Urban Development Administration in India " },
  { id: "PUB/3/OE/21A", name: "Public enterprise in India " },
  { id: "SOC/2/OE/14", name: "Environment and Sustainable Development " },
  { id: "SOC/3/OE/21", name: "Indian Diaspora " },
  { id: "SOC/3/OE/21(C)", name: "Gender and Society " },
  { id: "SOC/3/OE/21a", name: "Indian Diaspore " },
  { id: "SOC/3/OE/21B", name: "Gender and Society " },
  { id: "SW/2/OE/15", name: "Substance Abuse and HIV/AIDS " },
  { id: "SW/3/OE/20", name: "Disaster Management " },
  { id: "SW/3/OE/22", name: "Disaster Management " },
  { id: "ZOO/2/OE/11", name: "Endocrinology " },
  { id: "ZOO/2/OE/13", name: "Human Health Awareness" },
  { id: "ZOO/3/OE/21", name: "Poultry Farming " }
];

const CourseAllotment = props => {
  const [option2Active, setOption2Active] = useState(true);
  const [option3Active, setOption3Active] = useState(true);

  const renderOption1 = () => {
    return oe.map(o => {
      return (
        <option key={o.id} value={o.id}>
          {o.id + " - " + o.name}
        </option>
      );
    });
  };
  const renderOption2 = () => {
    return oe.map(o => {
      return (
        <option key={o.id} value={o.id}>
          {o.id + " - " + o.name}
        </option>
      );
    });
  };
  const renderOption3 = () => {
    return oe.map(o => {
      return (
        <option key={o.id} value={o.id}>
          {o.id + " - " + o.name}
        </option>
      );
    });
  };

  const onSubmit = formValues => {
    console.log(formValues);
  };
  const clear = () => {
    props.reset();
    setOption2Active(true);
    setOption3Active(true);
  };
  return (
    <React.Fragment>
      <Segment>
        <Container text>
          <Message>
            <Header textAlign="center" as="h3">
              Welcome
            </Header>
          </Message>

          <Divider />
          <Header as="h3">Course Allotment</Header>
          <Form size="tiny">
            <Form.Group inline>
              <Form.Field required>
                <label> OE option 1: </label>
                <Field
                  name="option1"
                  component="select"
                  onChange={e => {
                    if (e.target.value === "") {
                      setOption2Active(true);
                      setOption3Active(true);
                      props.reset();
                    } else {
                      setOption2Active(false);
                    }
                  }}
                >
                  <option value={""}>Select Option 1</option>
                  {renderOption1()}
                </Field>
              </Form.Field>
            </Form.Group>
            <Form.Group inline>
              <Form.Field required>
                <label> OE option 2: </label>
                <Field
                  disabled={option2Active}
                  name="option2"
                  component="select"
                  onChange={e => {
                    if (e.target.value === "") {
                      setOption3Active(true);
                    } else {
                      setOption3Active(false);
                    }
                  }}
                >
                  <option value={""}>Select Option 2</option>
                  {renderOption2()}
                </Field>
              </Form.Field>
            </Form.Group>
            <Form.Group inline>
              <Form.Field required>
                <label> OE option 3: </label>
                <Field
                  name="option3"
                  component="select"
                  disabled={option3Active}
                >
                  <option value={""}>Select Option 3</option>
                  {renderOption3()}
                </Field>
              </Form.Field>
            </Form.Group>
            <Form.Group inline>
              <Container fluid textAlign="right">
                <Button positive onClick={props.handleSubmit(onSubmit)}>
                  Save
                </Button>
                <Button basic onClick={clear}>
                  Clear
                </Button>
                <Button secondary> Lock </Button>
              </Container>
            </Form.Group>
          </Form>
        </Container>
      </Segment>
    </React.Fragment>
  );
};

export default reduxForm({ form: "searchStudent" })(
  withRouter(CourseAllotment)
);
