import React, { Component } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import FormControl from "@material-ui/core/FormControl";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import image from "assets/img/dollar-hd.jpg";
import LocationPicker from "react-location-picker";
import { Link } from "react-router-dom";
import axios from "axios";
const useStyles = makeStyles(styles);
import environment from "environments/environments.prod";

export default function SignupPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const [values, setValues] = React.useState({
    username: "",
    pass: "",
    name: "",
    surname: "",
    email: "",
    location: "",
    usertype: "Basic",
    iban: "",
    citizenshipno: 0
  });

  const handleChange = event => {
    event.persist();
    setValues(oldValues => ({
      ...oldValues,
      [event.target.id]: event.target.value
    }));
  };
  const [isLocationSelected, setIsLocationSelected] = React.useState({
    selected: false
  });
  const [isTraderUserSelected, setIsTraderUserSelected] = React.useState({
    selected: false
  });
  const [location, setLocation] = React.useState({
    address: "Istanbul, Turkey",
    position: {
      lat: 41.040578365183514,
      lng: 29.092968749999955
    }
  });
  const validateForm = () => {
    return true;
  }

  const handleSubmit = event => {
    console.log(values);
    // validate the inputs and then send the backend
    if (event.target.value === "Basic") {
      validateForm(values);
      axios.post(environment.api_url + "/user/registerbasic", values);
    }else{
      validateForm(values);

      axios.post(environment.api_url + "/user/registertrader", values);
    }


    event.preventDefault();
  };

  const handleChangeForm = event => {
    if (event.target.value === "Basic") {
      setIsTraderUserSelected({ selected: false });
      setValues(oldValues => ({
        ...oldValues,
        [event.target.name]: event.target.value,
        iban: "",
        citizenshipno: 0
      }));
    } else {
      setIsTraderUserSelected({ selected: true });
      setValues(oldValues => ({
        ...oldValues,
        [event.target.name]: event.target.value
      }));
    }
  };

  let MapOrForm;
  if (isLocationSelected.selected) {
    MapOrForm = (
      <LocationPickerMap
        location={location}
        setLocation={setLocation}
        setIsLocationSelected={setIsLocationSelected}
      />
    );
  } else if (!isTraderUserSelected.selected) {
    MapOrForm = (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={4}>
          <Card className={classes[cardAnimaton]}>
            <form className={classes.form}>
              <CardHeader color="primary" className={classes.cardHeader}>
                <h4>Create an Account</h4>
                <div className={classes.socialLine}>
                  <Button
                    justIcon
                    href="#pablo"
                    target="_blank"
                    color="transparent"
                    onClick={e => e.preventDefault()}
                  >
                    <i className={"fab fa-google-plus-g"} />
                  </Button>
                </div>
              </CardHeader>
              <p className={classes.divider}>Or Be Classical</p>
              <CardBody>
                <CustomInput
                  labelText="Username"
                  id="username"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "username",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputIconsColor}>
                          perm_identity
                        </Icon>
                      </InputAdornment>
                    )
                  }}
                  onChange={handleChange}
                />
                <CustomInput
                  labelText="Password"
                  id="pass"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "password",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputIconsColor}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    autoComplete: "off"
                  }}
                  onChange={handleChange}
                />
                <CustomInput
                  labelText="Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "email",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputIconsColor} />
                      </InputAdornment>
                    )
                  }}
                  onChange={handleChange}
                />
                <CustomInput
                  labelText="Name"
                  id="name"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "text",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputIconsColor}>
                          perm_identity
                        </Icon>
                      </InputAdornment>
                    )
                  }}
                  onChange={handleChange}
                />
                <CustomInput
                  labelText="Surname"
                  id="surname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "text",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputIconsColor}>
                          perm_identity
                        </Icon>
                      </InputAdornment>
                    )
                  }}
                  onChange={handleChange}
                />
                <CustomInput
                  labelText="Location"
                  id="location"
                  onClick={() => {
                    setIsLocationSelected({ selected: true });
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                  value={location.address}
                  inputProps={{
                    type: "location",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputIconsColor}>room</Icon>
                      </InputAdornment>
                    )
                  }}
                  onChange={handleChange}
                />
                <FormControl className={classes.formControl}>
                  <Select
                    value={values.usertype}
                    inputProps={{
                      name: "usertype"
                    }}
                    onChange={handleChangeForm}
                  >
                    <MenuItem value={"Basic"}>Basic</MenuItem>
                    <MenuItem value={"Trading"}>Trading</MenuItem>
                  </Select>
                  <FormHelperText>Select User Type</FormHelperText>
                </FormControl>
              </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button simple color="primary" size="lg" onClick={handleSubmit}>
                  Confirm
                </Button>
              </CardFooter>
              <CardFooter className={classes.cardFooter}>
                Already registered?
                <Link to="/login-page">Login here</Link>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    );
  } else {
    MapOrForm = (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={4}>
          <Card className={classes[cardAnimaton]}>
            <form className={classes.form}>
              <CardHeader color="primary" className={classes.cardHeader}>
                <h4>Create an Account</h4>
                <div className={classes.socialLine}>
                  <Button
                    justIcon
                    href="#pablo"
                    target="_blank"
                    color="transparent"
                    onClick={e => e.preventDefault()}
                  >
                    <i className={"fab fa-google-plus-g"} />
                  </Button>
                </div>
              </CardHeader>
              <p className={classes.divider}>Or Be Classical</p>
              <CardBody>
                <CustomInput
                  labelText="Username"
                  id="username"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "username",
                    endAdornment: (
                      <InputAdornment position="end">
                        perm_identity
                      </InputAdornment>
                    )
                  }}
                  onChange={handleChange}
                />
                <CustomInput
                  labelText="Password"
                  id="pass"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "password",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputIconsColor}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    autoComplete: "off"
                  }}
                  onChange={handleChange}
                />
                <CustomInput
                  labelText="Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "email",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputIconsColor} />
                      </InputAdornment>
                    )
                  }}
                  onChange={handleChange}
                />
                <CustomInput
                  labelText="Name"
                  id="name"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "text",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputIconsColor}>
                          perm_identity
                        </Icon>
                      </InputAdornment>
                    )
                  }}
                  onChange={handleChange}
                />
                <CustomInput
                  labelText="Surname"
                  id="surname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "text",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputIconsColor}>
                          perm_identity
                        </Icon>
                      </InputAdornment>
                    )
                  }}
                  onChange={handleChange}
                />
                <CustomInput
                  labelText="Location"
                  id="location"
                  onClick={() => {
                    setIsLocationSelected({ selected: true });
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                  value={location.address}
                  inputProps={{
                    type: "location",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputIconsColor}>room</Icon>
                      </InputAdornment>
                    )
                  }}
                  onChange={handleChange}
                />
                <FormControl className={classes.formControl}>
                  <Select
                    value={values.usertype}
                    inputProps={{
                      name: "usertype"
                    }}
                    onChange={handleChangeForm}
                  >
                    <MenuItem value={"Basic"}>Basic</MenuItem>
                    <MenuItem value={"Trading"}>Trading</MenuItem>
                  </Select>
                  <FormHelperText>Select User Type</FormHelperText>
                </FormControl>
                <CustomInput
                  labelText="IBAN Number"
                  id="iban"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "iban",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputIconsColor}>
                          perm_identity
                        </Icon>
                      </InputAdornment>
                    )
                  }}
                  onChange={handleChange}
                />
                <CustomInput
                  labelText="Citizenship No"
                  id="citizenshipno"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "citizenshipno",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputIconsColor}>
                          perm_identity
                        </Icon>
                      </InputAdornment>
                    )
                  }}
                  onChange={handleChange}
                />
              </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button simple color="primary" size="lg" onClick={handleSubmit}>
                  Confirm
                </Button>
              </CardFooter>
              <CardFooter className={classes.cardFooter}>
                Already registered?
                <Link to="/login-page">Login here</Link>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Khaji-it Traders Platform"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>{MapOrForm}</div>
        <Footer whiteFont />
      </div>
    </div>
  );
}

class LocationPickerMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: props.location.address,
      position: props.location.position
    };

    this.props = props;
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  handleLocationChange({ position, address, places }) {
    // Set new location
    this.props.setLocation({ position: position, address: address });
    // eslint-disable-next-line react/prop-types
    this.props.setIsLocationSelected({ selected: false });
  }

  render() {
    return (
      <div>
        <h1>{this.state.address}</h1>
        <div>
          <LocationPicker
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "500px" }} />}
            defaultPosition={this.state.position}
            onChange={this.handleLocationChange}
          />
        </div>
      </div>
    );
  }
}