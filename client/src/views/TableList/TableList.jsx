import React, {Component} from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class TableList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    console.log("Making request to endpoint");
    fetch('http://localhost:8081/queryAllItems')
    .then(response => {
      return response.json();
    })
    .then(response => {
      const items = response.map(item => Object.values(item.Record));

      for (var i = 0; i < items.length; i++) { 
        var counter = 1;
        for (var j = i+1; j < items.length; j++) { 
          if (items[i][0] === items[j][0]) {
            counter++;
            items.splice(j,1);
          }
        }
        items[i][4] = counter;
      }
      console.log(items);
      this.setState({data: items});
    })
    .catch(err => console.log(err));
  }
  
  render() {
    const { classes } = this.props;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Base #1</h4>
            <p className={classes.cardCategoryWhite}>
              The items that are absent are marked red
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Name", "Status", "Type", "Quantity"]}
              tableData={this.state.data}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
                Base #2
            </h4>
            <p className={classes.cardCategoryWhite}>
                The items that are absent are marked red
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Name", "Country", "City", "Salary"]}
              tableData={[
                  ["1928479228","Heckler & Koch G36", "Gun", "30", "Available"],
                  ["1958673923", "Meal, Ready-to-Eat", "Food", "20", "Unavailable"],
                  ["1947563748", "M577 Armored Command Vehicle", "Vehicles", "1", "Available"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
  }
  
}

export default withStyles(styles)(TableList);
