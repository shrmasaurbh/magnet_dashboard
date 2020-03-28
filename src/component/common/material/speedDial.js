import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ProjectModel from "../../common/modal/projectModel";

const styles = theme => ({
  speedDial: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  }
});

class SpeedDialProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            hidden: false,
            addModalShow : false,
            updateModalShow : false
        };
    }

  handleClick = () => {
    this.setState(state => ({
      open: !state.open
    }));
  };

  handleSecondaryClick = () => {
    this.setState(state => ({
      open: !state.open
    }));
  };

  handleOpen = () => {
    if (!this.state.hidden) {
      this.setState({
        open: true
      });
    }
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleModal=(value)=>{
      this.setState({addModalShow : !this.state.addModalShow});
  }

  updateHandleModal=(value)=>{
      this.setState({updateModalShow : !this.state.updateModalShow});
  }

  render() {
    const { classes } = this.props;
    const { hidden, open } = this.state;

    return (
      <div className={classes.root}>
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          className={classes.speedDial}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onBlur={this.handleClose}
          onClick={this.handleClick}
          onClose={this.handleClose}
          onFocus={this.handleOpen}
          onMouseEnter={this.handleOpen}
          onMouseLeave={this.handleClose}
          open={open}
        >
            <SpeedDialAction
              key="Add"
              icon=<AddIcon />
              tooltipTitle="Add Project"
              onClick={this.handleModal}
            />
            <SpeedDialAction
              key="Edit"
              icon=<EditIcon />
              tooltipTitle="Update Project"
              onClick={this.updateHandleModal}
            />
        </SpeedDial>
        <ProjectModel show={this.state.addModalShow} fromType="addProject" changeModal={this.handleModal}/>
        <ProjectModel show={this.state.updateModalShow} fromType="updateProject" changeModal={this.updateHandleModal}/>

      </div>
    );
  }
}

SpeedDialProject.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SpeedDialProject);
